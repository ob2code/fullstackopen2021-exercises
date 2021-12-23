import React from 'react'
import { Weather } from './Weather'


const CountryDetail = ({ country }) => {

    if (country === undefined) {
        return null
    }
    //============================

    return (
        <div>
            <h1>{country.name.common}</h1>
            <div>capital {country.capital}</div>
            <div>population {country.population}</div>
            <h2>languages</h2>
            <ul>
                {Object.values(country.languages).map(lang =>
                    <li key={lang}>{lang}</li>
                )}
            </ul>
            <div>
                <img src={country.flags.png} width="128" alt="flag" />
            </div>
            <h2>show weather in {country.capital}</h2>
            <Weather city={country.capital} />
        </div >
    )
}

export { CountryDetail }  