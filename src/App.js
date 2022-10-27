import './App.css';
// import { ethers } from 'ethers'
// import house from './artifacts/contracts/BettingApp.sol/House.json'

// const { API_KEY, PRIVATE_KEY, HOUSE_CONTRACT_ADDRESS } = process.env;
// // const { ethers } = require("hardhat");
// // const contract = require("./artifacts/contracts/BettingApp.sol/House.json");
// const alchemyProvider = new ethers.providers.AlchemyProvider("goerli", API_KEY);
// const signer = new ethers.Wallet(PRIVATE_KEY, alchemyProvider)
// const houseContract = new ethers.Contract(HOUSE_CONTRACT_ADDRESS, house.abi, signer)

function App() {

  // const test = () => {
  //   houseContract.getBalance()
  // }

  return (
    <div className="App">
      {/* <div id='test'>words</div>
      <button onClick={test}>TEST</button> */}


      {/* <form>
        <label>
          Test:
          <input type="text" name="test"/>
        </label>
        <input type="submit" value="Submit"/>
      </form> */}
    </div>
  );
}

export default App;
