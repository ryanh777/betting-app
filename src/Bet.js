import { useState } from "react";
import { ethers } from 'ethers'
import house from './artifacts/contracts/BettingApp.sol/House.json'
import BN from 'bn.js'

const Bet = (props) => {
    const { 
        REACT_APP_HOUSE_CONTRACT_ADDRESS,
        REACT_APP_API_KEY,
        REACT_APP_PRIVATE_KEY
    } = process.env;
    const { ethereum } = window
    const alchemyProvider = new ethers.providers.AlchemyProvider("goerli", REACT_APP_API_KEY);
    const signer = new ethers.Wallet(REACT_APP_PRIVATE_KEY, alchemyProvider)
    const houseContract = new ethers.Contract(REACT_APP_HOUSE_CONTRACT_ADDRESS, house.abi, signer)

    const [stake, setStake] = useState(0);
    const [team1Active, setTeam1Active] = useState(true)
    const accounts = props.accounts;

    const placeBet = async () => {
        var a = new BN(stake.toString(10), 16);
        const txHash = await ethereum.request({
            method: 'eth_sendTransaction',
            params: [{
                from: accounts[0],
                to: REACT_APP_HOUSE_CONTRACT_ADDRESS,
                value: a.toString(16)
            }],
        })
        .then((txHash) => console.log(txHash))
        .catch((error) => console.error);

        console.log("transaction hash " + txHash)

        const calcPayout = (moneyline) => {
            if (moneyline < 0) {
                return stake * 100 / moneyline * -1
            } else {
                return stake * moneyline / 100
            }
        }

        const payout = `${team1Active ? calcPayout(props.team1ML) : calcPayout(props.team2ML)}`
        console.log("payout: " + payout)

        const bet = await houseContract.createBet(accounts[0], payout)
        console.log('bet: ' + bet)
    }

    return (
        <div className="border-2">
            <div>{props.team1}</div>
            <div>{props.team1ML}</div>
            <div>vs</div>
            <div>{props.team2}</div>
            <div>{props.team2ML}</div>
             
            <button onClick={e => setTeam1Active(true)} className={`border border-black mr-6 ${team1Active ? 'bg-red-500' : ''}`}>{props.team1}</button>
            <button onClick={e => setTeam1Active(false)} className={`border border-black ${team1Active ? '' : 'bg-red-500'}`}>{props.team2}</button>
            
            <input type="text" onChange={e => setStake(e.target.value)}/>
            <button onClick={placeBet}>Submit</button>
        </div>
    )
}

export default Bet;