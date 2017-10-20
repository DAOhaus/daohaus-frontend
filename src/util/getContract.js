const truffleContract = require("truffle-contract");

export default truffleJson => {
  const contract = truffleContract(truffleJson)
  contract.setProvider(window.web3.currentProvider)
  return contract
}
