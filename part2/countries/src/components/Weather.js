import React, { useState, useEffect } from 'react'
import axios from 'axios'

const tempConverter = valNum => parseFloat(valNum) - 273.15

const Weather = (props) => {
    const [temperature, setTemperature] = useState('')
    const [wind, setWind] = useState('')
    const [currentweather, setCurrentWeather] = useState('')
    const weatherAPI_KEY = process.env.REACT_APP_API_KEY
    const weatherAPI_URL = `https://api.openweathermap.org/data/2.5/weather?q=${props.city[0]}&appid=${weatherAPI_KEY}`


    useEffect(() => {
        axios
            .get(weatherAPI_URL)
            .then(response => {
                setTemperature(response.data.main.temp)
                setWind(response.data.wind.speed)
                setCurrentWeather(response.data.weather[0].icon)
            })
    }, [weatherAPI_URL])

    return (
        <div>
            <div><strong>temperature</strong> {Math.round(tempConverter(temperature))} Celcius</div>
            <div>
                <img src={`http://openweathermap.org/img/wn/${currentweather}@2x.png`} alt="Current Weather" />
            </div>
            <div><strong>wind</strong> {wind} meter/sec</div>

        </div>
    )
}

export { Weather }