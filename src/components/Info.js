import React, { useState } from 'react';
import axios from 'axios';


function Info() {
    // Randomly selected country codes
    var countries = ["1", "52", "53", "55", "54", "51", "58", "57", "212", "20", "27", "235", "244", "251", "218", "227",
                    "33", "49", "43", "44", "46", "47", "90", "380", "7", "48", "86", "82", "81", "66", "62", "91", "94",
                    "98", "966", "967", "92", "93", "994", "61"]

    const [infoList, setInfoList] = useState([]);

    // Gets countries
    React.useEffect(() => {
        var code = countries[infoList.length];
        axios.get(`https://restcountries.eu/rest/v2/callingcode/${code}`).then((res) => {
            if(infoList.length < countries.length){
                setInfoList([...infoList, res.data[0]]); 
            }
        }).catch(() => {
            console.error("ERROR");
        });
    }, [infoList]);

    console.log(infoList)
      
    // Displays list
    return (
        <div class="container">
            {infoList.map((country) => {
                {console.log(country)}
                return ( 
                    <div>
                    <img src={country.flag} alt="countryflag" width="200" height="100"/>
                    <h2>{country.name}</h2> 
                    <h3>{country.capital}</h3> 
                    </div>
                ); 
            })}
        </div>
    );
}

export default Info;
