//https://eth-ropsten.alchemyapi.io/v2/9isHLFnKr6reflq7BrzRkE7e7sJ91oCi

require("@nomiclabs/hardhat-waffle")

module.exports = {
  solidity: '0.8.0', 
  networks: {
    ropsten: {
      url: "https://eth-ropsten.alchemyapi.io/v2/9isHLFnKr6reflq7BrzRkE7e7sJ91oCi",
      accounts: ["012ea632cb0fcc51b31c5bfd5965851d77a3d0c71c73403a031eff00fa4cf251"]
    }
  }
}