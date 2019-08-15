const FiapToken = artifacts.require("FiapToken");
const FiapTokenBolao = artifacts.require("FiapTokenBolao");
const FiapTokenAddress = '0x1d900fcb6375a9ceceba0eee09332d042548d997';
//const WalletAddress = '0xd80f2A97C6c486B13649c70e1D67DC7FeFC5E4E1';

module.exports = function(deployer) {
  //var fiapTokenInstance = await contract.at(FiapTokenAddress);

  //deployer.deploy(FiapToken).then(function() {
    //return
      deployer.deploy(FiapTokenBolao, FiapTokenAddress).then(async () => {
      //var fiapTokenInstance = await FiapToken.deployed();
      var fiapTokenInstance = await FiapToken.at(FiapTokenAddress);
      await fiapTokenInstance.addWhitelistAdmin(FiapTokenBolao.address);
      //await fiapTokenInstance.addWhitelistAdmin(WalletAddress);
      console.log("adicionou whitelist "+FiapTokenBolao.address);
      //console.log("adicionou whitelist "+WalletAddress);
      await fiapTokenInstance.addController(FiapTokenBolao.address);
      //await fiapTokenInstance.addController(WalletAddress);
      console.log("adicionou addcontroller "+FiapTokenBolao.address);
      //console.log("adicionou addcontroller "+WalletAddress);
    });
  //});
};
