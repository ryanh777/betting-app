import './App.css';
import { useEffect, useState } from "react";
import Bet from './Bet';

function App() {
    const { ethereum } = window
    const [accounts, setAccounts] = useState([])
    const [currentGames, setCurrentGames] = useState([])

    useEffect(() => {
        fetch("https://api.the-odds-api.com/v4/sports/basketball_nba/odds/?regions=us&oddsFormat=american&apiKey=193987230a67a854137fc1ce94335ee4")
        .then((response) => response.json())
        .then((data) => setCurrentGames(data));
    }, [])

    const enable = async () => {
        const acc = await ethereum.request({ method: 'eth_requestAccounts'})
        setAccounts(acc)
    }

    return (
        <div className="App">
            {window.ethereum === undefined ? 
                <div>install metamask</div> :
                <>
                    { !accounts[0] &&
                        <button className="text-xl border-2 border-black" onClick={enable}>enable metamask</button>
                    }
                    {currentGames.map((item, i) => (
                        <Bet
                            key={i}
                            accounts={accounts}
                            team1={item.bookmakers[0].markets[0].outcomes[0].name} 
                            team1ML={item.bookmakers[0].markets[0].outcomes[0].price}
                            team2={item.bookmakers[0].markets[0].outcomes[1].name}
                            team2ML={item.bookmakers[0].markets[0].outcomes[1].price}>
                        </Bet>
                    ))}
                </>                
            }
        </div>
    );
}

export default App;
