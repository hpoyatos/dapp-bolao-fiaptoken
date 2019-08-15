var Migrations = artifacts.require("./Migrations.sol");
//const address = '0xd80f2A97C6c486B13649c70e1D67DC7FeFC5E4E1';

module.exports = function(deployer) {
  deployer.deploy(Migrations);

  //async function getCertifiedStudentsCount() {
  //  var fiapTokenInstance = await contract.at(FiapTokenAddress);
  //  await fiapTokenInstance.addWhitelistAdmin(address);
  //  await fiapTokenInstance.addController(address);
  //}
  //getCertifiedStudentsCount();
};
