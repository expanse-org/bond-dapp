pragma solidity ^0.4.9;
//fixed bugs, optimized gas use, sol 0.4.9, multisig support
//TODO: add asset guard and or mutex, test/implementmultisig support, add mutlisig admins

contract blockTime {
    function getBlockTime(uint _block) public returns(uint);
}


contract Bond {
  function getUser(address _addr) returns(bool exists, uint balance, uint[] bonds);
  function getBond(uint _bid) returns(bool active, address owner, uint multiplier, uint maturityBlock, uint lastRedemption);
  function getBondHistoryLength(uint _bid) returns(uint length);
  function getBondHistory(uint _bid, uint _index) returns(uint block, uint amount);
}


contract Bonds {
  address public owner;                     // contract admin address
  uint public constant price = 100;	    	// 100 Expanse
  uint public constant maturity = 15768000;	// 6mo in seconds
  uint public constant period = 2628000;    // 1mo in seconds 
  uint public constant maxCoupons = maturity/period;
  uint public nBonds;           // bond index (number of total bonds)
  uint public activeBonds;      // active bond index
  uint public totalBonds;       // this number calculates total bonds * multipliers
  uint public limitBonds;       // max amount of bonds to be issued
  uint public nUBP;             // upgraded bond index
  
  event Buys(address indexed User, uint indexed BondId, uint Multiplier, uint MaturityTime);
  event Deposits(address indexed Sender, uint Amount);
  event RedeemCoupons(address indexed User, uint indexed BondId, uint Coupons, uint Amount);
  event RedeemBonds(address indexed User, uint indexed BondId, uint Amount);
  event Transfers(address indexed TransferFrom, address indexed TransferTo);
  event UserUpgrade(address indexed User);
  event Withdraws(uint Amount, address indexed User);
  
  struct sBond {
    bool active; 				// is bond active or redeemed
    address owner;				// address of bond owner
    uint multiplier;			// if someone spends 10k they would get a bond with a 100x multiplier
    uint maturityTime;			// timestamp that allows wd of full amount of this bond
    uint lastRedemption;		// block number of last redemption
    uint nextRedemption;		// timestamp of next avail redemption
	uint created;				// block number of when bond was created
    uint couponsRemaining;		// amount of coupons unredeemed
    sHistory[] redemptionHistory;// a History (blockHeight, amount) of each redemption
  }

  struct sUser {
      bool exists;
      uint balance;
      uint[] bonds;
      bool upgraded;
  }

  struct sHistory {
    uint block;
    uint amount;
    uint timestamp;
  }

  mapping(address=>sUser) public users;
  mapping(uint=>sBond) public bonds;

  modifier mustOwnBond(uint bondId){
      if(bonds[bondId].owner != msg.sender) throw;
      _;
  }
  
  modifier mustBeOwner(){
      if(owner != msg.sender) throw;
      _;
  }
   
  function Bonds(uint _limitBonds){
    owner = msg.sender;
    limitBonds = _limitBonds;
  }

  function() payable {
    if(msg.value < 1 ether) throw;
    deposit();
  }

  /* Bond Management Functions */

  function deposit() payable {
    if(msg.value < 1 ether) throw;
    users[msg.sender].exists = true;
    users[msg.sender].balance+=msg.value;
    Deposits(msg.sender, msg.value);
  }
  
  function withdraw() returns(bool){
    uint bal = users[msg.sender].balance;
    if(this.balance < bal) throw;
    users[msg.sender].balance = 0;
    if(!msg.sender.send(bal)) throw;
    Withdraws(bal, msg.sender);
    return true;
  }
  
  function transfer(uint _bid, address _to) mustOwnBond(_bid) returns(bool){
    bonds[_bid].owner = _to;
    delete users[msg.sender].bonds[_bid];
    users[_to].bonds.push(_bid);
    Transfers(msg.sender, _to);
    return true;
  }
  
  function buy(uint _multiplier) returns(uint bondId){
    if(_multiplier < 1) _multiplier = 1;
    if(_multiplier > limitBonds-totalBonds) throw;
    uint cost = price * _multiplier;
    if(users[msg.sender].balance < cost) throw;
    users[msg.sender].balance -= cost;

    nBonds++;
    bondId = nBonds;
    totalBonds+=_multiplier;
    activeBonds+=_multiplier;

    bonds[bondId].active = true;
    bonds[bondId].owner = msg.sender;
    bonds[bondId].multiplier = _multiplier;
    bonds[bondId].maturityTime = block.timestamp + maturity;
	bonds[bondId].created = block.number;
    bonds[bondId].lastRedemption = block.number;
    bonds[bondId].nextRedemption = block.timestamp + period;
    bonds[bondId].couponsRemaining = maxCoupons;

    users[msg.sender].bonds.push(bondId);
    Buys(msg.sender, bondId, bonds[bondId].multiplier, bonds[bondId].maturityTime);
  }
  
  function redeemCoupon(uint _bid) mustOwnBond(_bid) returns(bool, uint, uint){
    if(bonds[_bid].couponsRemaining < 1) throw;
    if(bonds[_bid].nextRedemption > block.timestamp) throw;
    uint timePassed = block.timestamp - bonds[_bid].nextRedemption - period;
    uint matureCoupons = timePassed / period;
    if(bonds[_bid].couponsRemaining < matureCoupons) matureCoupons=bonds[_bid].couponsRemaining;
    if(matureCoupons<1) throw;
    
    uint amt = bonds[_bid].multiplier * matureCoupons;
    bonds[_bid].couponsRemaining -= matureCoupons;
    bonds[_bid].lastRedemption = block.number;
    bonds[_bid].redemptionHistory.push(sHistory(block.number, amt, block.timestamp));

    users[msg.sender].balance += amt;
    RedeemCoupons(msg.sender, _bid, matureCoupons, amt);
    return (true, matureCoupons, amt);
  }

  function redeemBond(uint _bid) mustOwnBond(_bid) returns(bool){
    if(bonds[_bid].active != true) throw;
    if(block.timestamp < bonds[_bid].maturityTime) throw;
    bonds[_bid].active = false;
    uint _amount = price * bonds[_bid].multiplier;
    users[msg.sender].balance += _amount;
    activeBonds -= bonds[_bid].multiplier;
    RedeemBonds(msg.sender, _bid, _amount);
    return true;
  }

  /* Constant Functions */

  function getBalance(address _user) constant returns(uint){ return users[_user].balance; }

  function getBond(uint _bid) constant returns(bool active, address owner, uint multiplier, uint maturityTime, uint lastRedemption, uint nextRedemption, uint created, uint couponsRemaining){
    active = bonds[_bid].active;
    owner = bonds[_bid].owner;
    multiplier = bonds[_bid].multiplier;
    maturityTime = bonds[_bid].maturityTime;
    lastRedemption = bonds[_bid].lastRedemption;
    nextRedemption = bonds[_bid].nextRedemption;
    created = bonds[_bid].created;
    couponsRemaining = bonds[_bid].couponsRemaining;
  }
  
  function getUser(address _addr) constant returns(bool exists, uint balance, uint[] bonds){
    exists = users[_addr].exists;
    balance = users[_addr].balance;
    bonds = users[_addr].bonds;
  }

  function getBondHistoryLength(uint _bid) constant returns(uint){ return bonds[_bid].redemptionHistory.length; }

  function getBondHistory(uint _bid, uint _index) constant returns(uint block, uint amount){
    block = bonds[_bid].redemptionHistory[_index].block;
    amount = bonds[_bid].redemptionHistory[_index].amount;
  }
  
  /* Administration Functions */
   
  function empty() mustBeOwner { if(!owner.send(this.balance)) throw; }

  function kill() mustBeOwner { selfdestruct(owner); }

  function changeOwner(address _newOwner) mustBeOwner { owner = _newOwner; }

  function increaseLimit(uint _limit) mustBeOwner { limitBonds+=_limit; }

  function upgradeUser(address _addr) mustBeOwner returns(bool){
    var(_exsists, _balance, _bonds) = Bond(0x88ACBc37b80Ea9f7692BaF3eb2390c8a34F02457).getUser(msg.sender);
    users[msg.sender].exists = _exsists;
    users[msg.sender].balance = _balance;
    users[msg.sender].upgraded = true;
    UserUpgrade(msg.sender);
    return true;
  }

  function upgradeBonds(uint _nSteps) mustBeOwner returns(bool){
	blockTime bT = blockTime(0x0f079dBC5DA4C5f5cb3F2b8F66C74AB2866aba2f);
	Bond ebs0 = Bond(0x88ACBc37b80Ea9f7692BaF3eb2390c8a34F02457);
	uint nStop = nUBP + _nSteps;
	while(nUBP < nStop){
        var(_active,_owner,_multiplier,_maturityTime,_lastRedemption) = ebs0.getBond(nUBP);
        var(_created,_value) = ebs0.getBondHistory(nUBP, 0);
		var bondHistoryLen=ebs0.getBondHistoryLength(nUBP);
        bonds[nUBP].active = _active;
        bonds[nUBP].owner = _owner;
        bonds[nUBP].multiplier = _multiplier;
        bonds[nUBP].created  = _created;
        bonds[nUBP].maturityTime = bT.getBlockTime(_created) + maturity; 
        if(_lastRedemption!=_created) bonds[nUBP].lastRedemption = _lastRedemption;
        bonds[nUBP].couponsRemaining = maxCoupons-bondHistoryLen+1;
        for (uint i = 1; i < bondHistoryLen; i++) {
            var(_block,_amount)= ebs0.getBondHistory(nUBP, i);
            //var btt=bT.getBlockTime(_block);
            bonds[nUBP].redemptionHistory.push(sHistory(_block,_amount,4));
        }
        bonds[nUBP].nextRedemption = bT.getBlockTime(_created) + period*bondHistoryLen;
        users[owner].bonds.push(nUBP);
        nUBP++;
    }
    return true;
  }
}