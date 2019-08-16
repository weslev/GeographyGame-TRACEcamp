import React, { useState } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom'

// CountrySelect creates a random array of county codes.
function CountrySelect() {
    var x = 0;
    var codeList = [];
    // Randomly selected country codes
    var countries = ["1", "52", "53", "55", "54", "51", "58", "57", "212", "20", "27", "235", "244", "251", "218", "227",
                    "33", "49", "43", "44", "46", "47", "90", "380", "7", "48", "86", "82", "81", "66", "62", "91", "94",
                    "98", "966", "967", "92", "93", "994", "61"]
    var randomNum = 0;
    // Prevents list from having repeats
    while(x < 4) {
        randomNum = Math.floor(Math.random() * countries.length);
        var codeToAdd = countries[randomNum]
        if (codeList.includes(codeToAdd))
            continue
        codeList.push(codeToAdd)
        x++;
    }
    return codeList;
}


// Main FlagGame function
function FlagGame() {

    // States and variables
    const [codeList, setCodeList] = useState(CountrySelect());
    const [countries, setCountries] = useState([]);
    const [score, setScore] = useState(0);
    const [flag, setFlag] = useState("");
    const [fail, setFailure] = useState(false);
    
    // Handles in game clicks
    function handleClick(event) {
        event.preventDefault();
        // If player's answer is correct, their score increases
        if(flag === event.target.value) {
            setScore(score + 5);
        } else { // Otherwise the failure state is set to true
            setFailure(true);
        }
        setCodeList(CountrySelect())
        setCountries([])
    }


    // Sets the countries state to an list of country information
    React.useEffect(() => {
            // Sets code to the section of codeList in relation to the length of the countries state
            var code = codeList[countries.length];
            // Uses the REST Countries API to retrieve country information based on country codes
            axios.get(`https://restcountries.eu/rest/v2/callingcode/${code}`).then((res) => {
                // Add countries to the state as long as the length of it does not exceed 4
                // 4 is the required state size
                if(countries.length < 5){
                    setCountries([...countries, res.data[0]]);     
                }
            }).catch((res) => {
            console.error("ERROR");
        });
    }, [countries]);

    // Sets the flag state. Only activates if there is at minimum one country
    React.useEffect(() => {
        if(countries.length > 0) { 
            setFlag(countries[ Math.floor(Math.random() * countries.length)].flag) 
        }
    }, [countries])


    // User interface 
    // Will be displayed once the countries state is populated and the player has not lost
    if (countries.length === 4 && fail === false) {
        return (<div className="container">
                    <div style={{height: '125px'}}></div>
                    <div className="row justify-content-md-center">
                        <img src={flag} width="300" height="200" />
                    </div>
                    {countries.map((name) => {
                        return (<React.Fragment key={name.name}>
                            <div style={{height: '10px'}}></div>
                            <div className="row justify-content-md-center">
                                <button onClick={handleClick} value={name.flag} className="btn btn-dark btn-block">{name.name}</button>
                            </div>
                            </React.Fragment>)                       
                    })}
                    <h3 className="row justify-content-md-center">Score: {score}</h3>
                </div>
                );
    } else if (fail === true) { // Otherwise displays end game screen
        return(
            <div className="container">
                <h3 className="row justify-content-md-center">YOU LOSE! Final score: {score}</h3>
                <Link to="/flag/" className="row justify-content-md-center" onClick={() => {
                    setFailure(false);
                    setScore(0);
                }}>Try again</Link>  
            </div>
        );
    } else { // While loading the information, a loading screen will be displayed
        return <div className="row justify-content-md-center">Loading...</div>
    }
}


export default FlagGame;
