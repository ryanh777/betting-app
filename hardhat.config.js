/** @type import('hardhat/config').HardhatUserConfig */
require('dotenv').config();
require("@nomiclabs/hardhat-ethers")
require("@nomiclabs/hardhat-etherscan");

const { REACT_APP_API_URL, REACT_APP_PRIVATE_KEY } = process.env;

module.exports = {
  solidity: "0.8.17",
  defaultNetwork: "goerli", 
  paths: {
    artifacts: "./src/artifacts"
  },
  networks: {
    hardhat: {},
    goerli: {
      url: REACT_APP_API_URL,
      accounts: [REACT_APP_PRIVATE_KEY]
    }
  },
  etherscan: {
    apiKey: "8DPDXEWJ6DR7BJ4243XM6JQ39SNAF3ZYH8"
  }
};
