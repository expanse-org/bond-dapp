var bondsContract = web3.exp.contract([{"constant":false,"inputs":[{"name":"bondId","type":"uint256"}],"name":"redeemBond","outputs":[{"name":"","type":"bool"}],"type":"function","payable":true},{"constant":false,"inputs":[{"name":"_limit","type":"uint256"}],"name":"increaseLimit","outputs":[],"type":"function","payable":true},{"constant":true,"inputs":[],"name":"maturity","outputs":[{"name":"","type":"uint256"}],"type":"function","payable":true},{"constant":false,"inputs":[],"name":"withdraw","outputs":[{"name":"","type":"bool"}],"type":"function","payable":true},{"constant":false,"inputs":[{"name":"_bid","type":"uint256"}],"name":"redeemCoupon","outputs":[{"name":"","type":"bool"},{"name":"","type":"bool"},{"name":"","type":"uint256"}],"type":"function","payable":true},{"constant":true,"inputs":[],"name":"coupon","outputs":[{"name":"","type":"uint256"}],"type":"function","payable":true},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"bonds","outputs":[{"name":"active","type":"bool"},{"name":"owner","type":"address"},{"name":"multiplier","type":"uint256"},{"name":"maturityBlock","type":"uint256"},{"name":"lastRedemption","type":"uint256"},{"name":"lastMultiplierChange","type":"uint256"}],"type":"function","payable":true},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"type":"function","payable":true},{"constant":true,"inputs":[],"name":"limitBonds","outputs":[{"name":"","type":"uint256"}],"type":"function","payable":true},{"constant":true,"inputs":[],"name":"price","outputs":[{"name":"","type":"uint256"}],"type":"function","payable":true},{"constant":false,"inputs":[{"name":"newOwner","type":"address"}],"name":"changeOwner","outputs":[],"type":"function","payable":true},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"users","outputs":[{"name":"exists","type":"bool"},{"name":"balance","type":"uint256"}],"type":"function","payable":true},{"constant":false,"inputs":[{"name":"_bid","type":"uint256"},{"name":"_to","type":"address"}],"name":"transfer","outputs":[{"name":"","type":"bool"}],"type":"function","payable":true},{"constant":true,"inputs":[],"name":"nBonds","outputs":[{"name":"","type":"uint256"}],"type":"function","payable":true},{"constant":false,"inputs":[],"name":"deposit","outputs":[],"type":"function","payable":true},{"constant":false,"inputs":[{"name":"_bid","type":"uint256"}],"name":"getBond","outputs":[{"name":"active","type":"bool"},{"name":"owner","type":"address"},{"name":"multiplier","type":"uint256"},{"name":"maturityBlock","type":"uint256"},{"name":"lastRedemption","type":"uint256"}],"type":"function","payable":true},{"constant":false,"inputs":[{"name":"_multiplier","type":"uint256"}],"name":"buy","outputs":[{"name":"multiplier","type":"uint256"},{"name":"remainder","type":"uint256"},{"name":"bondId","type":"uint256"}],"type":"function","payable":true},{"constant":true,"inputs":[],"name":"period","outputs":[{"name":"","type":"uint256"}],"type":"function","payable":true},{"constant":true,"inputs":[],"name":"totalBonds","outputs":[{"name":"","type":"uint256"}],"type":"function","payable":true},{"constant":false,"inputs":[],"name":"empty","outputs":[],"type":"function","payable":true},{"constant":false,"inputs":[{"name":"_user","type":"address"}],"name":"getBalance","outputs":[{"name":"balance","type":"uint256"}],"type":"function","payable":true},{"inputs":[],"type":"constructor","payable":true},{"anonymous":false,"inputs":[{"indexed":true,"name":"User","type":"address"},{"indexed":true,"name":"BondId","type":"uint256"},{"indexed":false,"name":"Multiplier","type":"uint256"},{"indexed":true,"name":"MaturityBlock","type":"uint256"}],"name":"Buys","type":"event","payable":true},{"anonymous":false,"inputs":[{"indexed":true,"name":"User","type":"address"},{"indexed":true,"name":"BondId","type":"uint256"},{"indexed":true,"name":"Amount","type":"uint256"}],"name":"Redemptions","type":"event","payable":true},{"anonymous":false,"inputs":[{"indexed":true,"name":"BondId","type":"uint256"},{"indexed":true,"name":"Amount","type":"uint256"},{"indexed":true,"name":"User","type":"address"}],"name":"Withdraws","type":"event","payable":true},{"anonymous":false,"inputs":[{"indexed":true,"name":"TransferFrom","type":"address"},{"indexed":true,"name":"TransferTo","type":"address"}],"name":"Transfers","type":"event","payable":true},{"anonymous":false,"inputs":[{"indexed":true,"name":"Sender","type":"address"},{"indexed":false,"name":"Amount","type":"uint256"}],"name":"Deposits","type":"event","payable":true},{"anonymous":false,"inputs":[{"indexed":true,"name":"Change","type":"bytes8"},{"indexed":true,"name":"BondId","type":"uint256"}],"name":"BondMultipliers","type":"event","payable":true},{"type":"fallback","payable":true}]);
var bonds = bondsContract.new(
   {
     from: web3.exp.accounts[0],
     data: '0x60606040525b33600060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908302179055506103e8600760005081905550600a6003600050819055506002600460005081905550670de0b6b3a7640000600260005081905550670de0b6b3a76400006001600050819055505b611492806100856000396000f360606040523615610119576000357c010000000000000000000000000000000000000000000000000000000090048063042a2077146101445780630aa2871414610172578063204f83f91461018a5780633ccfd60b146101ad5780634ffab34b146101d257806355c01345146102105780635f1c17c0146102335780638da5cb5b1461029a57806398ca03bd146102d3578063a035b1fe146102f6578063a6f9dae114610319578063a87430ba14610331578063b7760c8f14610366578063cd64d48b1461039d578063d0e30db0146103c0578063d8fe7642146103cf578063d96a094a1461042f578063ef78d4fd14610469578063f263c4701461048c578063f2a75fe4146104af578063f8b2cb4f146104be57610119565b6101425b670de0b6b3a764000034111561013a576101356104ea565b61013f565b610002565b5b565b005b61015a60048080359060200190919050506105e1565b60405180821515815260200191505060405180910390f35b61018860048080359060200190919050506107c1565b005b610197600480505061082e565b6040518082815260200191505060405180910390f35b6101ba6004805050610837565b60405180821515815260200191505060405180910390f35b6101e860048080359060200190919050506108f8565b6040518084151581526020018315158152602001828152602001935050505060405180910390f35b61021d6004805050610bdf565b6040518082815260200191505060405180910390f35b6102496004808035906020019091905050610be8565b6040518087151581526020018673ffffffffffffffffffffffffffffffffffffffff168152602001858152602001848152602001838152602001828152602001965050505050505060405180910390f35b6102a76004805050610c60565b604051808273ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b6102e06004805050610c86565b6040518082815260200191505060405180910390f35b6103036004805050610c8f565b6040518082815260200191505060405180910390f35b61032f6004808035906020019091905050610c98565b005b6103476004808035906020019091905050610d1e565b6040518083151581526020018281526020019250505060405180910390f35b6103856004808035906020019091908035906020019091905050610d55565b60405180821515815260200191505060405180910390f35b6103aa6004805050610ec6565b6040518082815260200191505060405180910390f35b6103cd60048050506104ea565b005b6103e56004808035906020019091905050610ecf565b6040518086151581526020018573ffffffffffffffffffffffffffffffffffffffff1681526020018481526020018381526020018281526020019550505050505060405180910390f35b6104456004808035906020019091905050610fbe565b60405180848152602001838152602001828152602001935050505060405180910390f35b61047660048050506113bf565b6040518082815260200191505060405180910390f35b61049960048050506113c8565b6040518082815260200191505060405180910390f35b6104bc60048050506113d1565b005b6104d46004808035906020019091905050611450565b6040518082815260200191505060405180910390f35b670de0b6b3a7640000341015156105d9576001600860005060003373ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060005060000160006101000a81548160ff0219169083021790555034600860005060003373ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000506001016000828282505401925050819055503373ffffffffffffffffffffffffffffffffffffffff167fa4bf806cbdeb44ec11a1cb638e7178b86e527296a2494ec8dc1de13447d96931346040518082815260200191505060405180910390a26105de565b610002565b5b565b60006000823373ffffffffffffffffffffffffffffffffffffffff166009600050600083815260200190815260200160002060005060000160019054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1614151561066057610002566107b9565b600115156009600050600086815260200190815260200160002060005060000160009054906101000a900460ff16151514156107af576009600050600085815260200190815260200160002060005060020160005054431015156107ae5760006009600050600086815260200190815260200160002060005060000160006101000a81548160ff02191690830217905550600960005060008581526020019081526020016000206000506001016000505460026000505402915081600860005060003373ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060005060010160008282825054019250508190555081843373ffffffffffffffffffffffffffffffffffffffff167f4a4dfd7e90eb5bd9b5c5394b077edba97c3fe0fe496b2f4411314b86b863cb9160405180905060405180910390a460019250506107bb565b5b60009250506107bb565b505b50919050565b3373ffffffffffffffffffffffffffffffffffffffff16600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16141561082a578060076000828282505401925050819055505b5b50565b60036000505481565b60006000600860005060003373ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000506001016000505490506000600860005060003373ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600050600101600050819055503373ffffffffffffffffffffffffffffffffffffffff16600082604051809050600060405180830381858888f1935050505015156108eb57610002565b600191506108f4565b5090565b60006000600060006000600060006000883373ffffffffffffffffffffffffffffffffffffffff166009600050600083815260200190815260200160002060005060000160019054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff161415156109835761000256610bd1565b60011515600960005060008c815260200190815260200160002060005060000160009054906101000a900460ff1615151415156109bf57610002565b600960005060008b815260200190815260200160002060005060030160005054430395506004600050548610156109f557610002565b6004600050548606945084860393506004600050548404925082600960005060008c8152602001908152602001600020600050600101600050546001600050540202915043600960005060008c815260200190815260200160002060005060030160005081905550600960005060008b81526020019081526020016000206000506005016000508054806001018281815481835581811511610ade57600202816002028360005260206000209182019101610add9190610ab0565b80821115610ad95760006000820160005060009055600182016000506000905550600201610ab0565b5090565b5b5050509190906000526020600020906002020160005b604060405190810160405280438152602001868152602001509091909150600082015181600001600050556020820151816001016000505550505081600860005060003373ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600050600101600082828250540192505081905550818a3373ffffffffffffffffffffffffffffffffffffffff167f4a4dfd7e90eb5bd9b5c5394b077edba97c3fe0fe496b2f4411314b86b863cb9160405180905060405180910390a46001610bc48b6105e1565b8398509850985050610bd3565b505b50505050509193909250565b60016000505481565b60096000506020528060005260406000206000915090508060000160009054906101000a900460ff16908060000160019054906101000a900473ffffffffffffffffffffffffffffffffffffffff16908060010160005054908060020160005054908060030160005054908060040160005054905086565b600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b60076000505481565b60026000505481565b3373ffffffffffffffffffffffffffffffffffffffff16600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff161415610d1a5780600060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908302179055505b5b50565b60086000506020528060005260406000206000915090508060000160009054906101000a900460ff16908060010160005054905082565b6000823373ffffffffffffffffffffffffffffffffffffffff166009600050600083815260200190815260200160002060005060000160019054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16141515610dd25761000256610ebe565b826009600050600086815260200190815260200160002060005060000160016101000a81548173ffffffffffffffffffffffffffffffffffffffff02191690830217905550600860005060008473ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000506002016000508054806001018281815481835581811511610e9957818360005260206000209182019101610e989190610e7a565b80821115610e945760008181506000905550600101610e7a565b5090565b5b5050509190906000526020600020900160005b86909190915055506001915050610ec0565b505b92915050565b60056000505481565b600060006000600060006009600050600087815260200190815260200160002060005060000160009054906101000a900460ff16945084506009600050600087815260200190815260200160002060005060000160019054906101000a900473ffffffffffffffffffffffffffffffffffffffff16935083506009600050600087815260200190815260200160002060005060010160005054925082506009600050600087815260200190815260200160002060005060020160005054915081506009600050600087815260200190815260200160002060005060030160005054905080505b91939590929450565b60006000600060006001851015610fd6576001945084505b836001026007600050541015610feb57610002565b8460026000505402905080600860005060003373ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060005060010160005054101561103757610002565b80600860005060003373ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060005060010160008282825054039250508190555060056000818150548092919060010191905055508460066000828282505401925050819055506005600050549150815060016009600050600084815260200190815260200160002060005060000160006101000a81548160ff02191690830217905550336009600050600084815260200190815260200160002060005060000160016101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908302179055508460096000506000848152602001908152602001600020600050600101600050819055506003600050544301600960005060008481526020019081526020016000206000506002016000508190555043600960005060008481526020019081526020016000206000506003016000508190555043600960005060008481526020019081526020016000206000506004016000508190555060096000506000838152602001908152602001600020600050600501600050805480600101828181548183558181151161123957600202816002028360005260206000209182019101611238919061120b565b80821115611234576000600082016000506000905560018201600050600090555060020161120b565b5090565b5b5050509190906000526020600020906002020160005b604060405190810160405280438152602001600081526020015090919091506000820151816000016000505560208201518160010160005055505050600860005060003373ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600050600201600050805480600101828181548183558181151161130d5781836000526020600020918201910161130c91906112ee565b8082111561130857600081815060009055506001016112ee565b5090565b5b5050509190906000526020600020900160005b84909190915055506009600050600083815260200190815260200160002060005060020160005054823373ffffffffffffffffffffffffffffffffffffffff167fe3c2d3ef9c8c158bae14314181bbd02778295b7bc1a0284cae6793127892e87860096000506000878152602001908152602001600020600050600101600050546040518082815260200191505060405180910390a45b509193909250565b60046000505481565b60066000505481565b60003073ffffffffffffffffffffffffffffffffffffffff16319050600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16600082604051809050600060405180830381858888f19350505050151561144c57610002565b5b50565b6000600860005060008373ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060005060010160005054905080505b91905056',
     gas: '4700000'
   }, function (e, contract){
    console.log(e, contract);
    if (typeof contract.address !== 'undefined') {
         console.log('Contract mined! address: ' + contract.address + ' transactionHash: ' + contract.transactionHash);
    }
 })
