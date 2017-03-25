exports.abi = '[{"constant":false,"inputs":[{"name":"bondId","type":"uint256"}],"name":"redeemBond","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_limit","type":"uint256"}],"name":"increaseLimit","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"maturity","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[],"name":"withdraw","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"nUserUpdateProgress","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"nUBP","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_bid","type":"uint256"},{"name":"_index","type":"uint256"}],"name":"getBondHistory","outputs":[{"name":"block","type":"uint256"},{"name":"amount","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_bid","type":"uint256"}],"name":"redeemCoupon","outputs":[{"name":"","type":"bool"},{"name":"","type":"bool"},{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_nSteps","type":"uint256"}],"name":"upgradeBonds","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"coupon","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"aBonds","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"bonds","outputs":[{"name":"active","type":"bool"},{"name":"owner","type":"address"},{"name":"multiplier","type":"uint256"},{"name":"maturityBlock","type":"uint256"},{"name":"lastRedemption","type":"uint256"},{"name":"lastMultiplierChange","type":"uint256"},{"name":"couponsRemaining","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_bid","type":"uint256"}],"name":"getBondHistoryLength","outputs":[{"name":"length","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_addr","type":"address"}],"name":"getUser","outputs":[{"name":"exists","type":"bool"},{"name":"balance","type":"uint256"},{"name":"bonds","type":"uint256[]"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"limitBonds","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"price","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"newOwner","type":"address"}],"name":"changeOwner","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"users","outputs":[{"name":"exists","type":"bool"},{"name":"balance","type":"uint256"},{"name":"upgraded","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"lastContract","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":false,"inputs":[],"name":"upgradeUser","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_bid","type":"uint256"},{"name":"_to","type":"address"}],"name":"transfer","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"nBonds","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"maxCoupons","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[],"name":"deposit","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_bid","type":"uint256"}],"name":"getBond","outputs":[{"name":"active","type":"bool"},{"name":"owner","type":"address"},{"name":"multiplier","type":"uint256"},{"name":"maturityBlock","type":"uint256"},{"name":"lastRedemption","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_multiplier","type":"uint256"}],"name":"buy","outputs":[{"name":"multiplier","type":"uint256"},{"name":"remainder","type":"uint256"},{"name":"bondId","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"period","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"totalBonds","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[],"name":"empty","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_user","type":"address"}],"name":"getBalance","outputs":[{"name":"balance","type":"uint256"}],"payable":false,"type":"function"},{"inputs":[{"name":"_lastContract","type":"address"}],"payable":false,"type":"constructor"},{"payable":false,"type":"fallback"},{"anonymous":false,"inputs":[{"indexed":true,"name":"User","type":"address"},{"indexed":true,"name":"BondId","type":"uint256"},{"indexed":false,"name":"Multiplier","type":"uint256"},{"indexed":true,"name":"MaturityBlock","type":"uint256"}],"name":"Buys","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"User","type":"address"},{"indexed":true,"name":"BondId","type":"uint256"},{"indexed":true,"name":"Amount","type":"uint256"}],"name":"Redemptions","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"Amount","type":"uint256"},{"indexed":true,"name":"User","type":"address"}],"name":"Withdraws","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"TransferFrom","type":"address"},{"indexed":true,"name":"TransferTo","type":"address"}],"name":"Transfers","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"Sender","type":"address"},{"indexed":false,"name":"Amount","type":"uint256"}],"name":"Deposits","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"Change","type":"bytes8"},{"indexed":true,"name":"BondId","type":"uint256"}],"name":"BondMultipliers","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"User","type":"address"},{"indexed":true,"name":"OldContract","type":"address"},{"indexed":true,"name":"NewContract","type":"address"},{"indexed":false,"name":"Success","type":"bool"}],"name":"UserUpgrade","type":"event"}]';
