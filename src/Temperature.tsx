import * as React from 'react'

const APIKEY = "c0bd32b3ab26640600d6f7e7219aa84d"

interface TemperatureObject {
  cityName: string,
  imgSrc: string,
  temp: number | null,
  feelsLike: number,
  tempMin: number,
  tempMax: number
}

export default class Temperature extends React.Component <{}, TemperatureObject> {
  constructor(props: {}) {
    super(props);
    this.state = {
        cityName: "",
        imgSrc: "",
        temp: null,
        feelsLike: 0,
        tempMin: 0,
        tempMax: 0
    }
  };

  render() {
    let content: JSX.Element = (
      <div id="temperatureContainer">Loading...</div>
    );
    if (this.state.temp !== null) {
      content = (
        <div id="temperatureContainer">
        <h1 id="cityName">{this.state.cityName}</h1>
        <img src={this.state.imgSrc} alt="Image describing the weather" id="weatherImg" />
        <p id="temperature">{Math.round(this.state.temp)}°C</p>
        <p id="feelsLike">Feels Like {Math.round(this.state.feelsLike)}°C</p>
      </div>
      )
    }
    return (
      content
    );
   }

  // Gets the users location and passes that to the getTemparature() function
  getLocation(): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        this.getTemperature(pos.coords.longitude, pos.coords.latitude);
      }, (err) => {
        console.error(err);
      });
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }
  

  // Takes in the users latitude and longitude, makes an API call to fetch weather info for that location and passes that to setTemperature()
  getTemperature(lon: number,lat: number): void {
  fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIKEY}&units=metric`).then((res) => {
    res.json().then(json => {
      this.setTemperature(json)
    })
  })
  }

  // Takes in JSON Response from API call and updates the temperature info
  setTemperature(jsonRes: any): void {
    // console.log(jsonRes)
    this.setState({
        cityName: jsonRes.name,
        imgSrc: `https://openweathermap.org/img/wn/${jsonRes.weather[0].icon}@2x.png`,
        temp: jsonRes.main.temp,
        feelsLike: jsonRes.main.feels_like,
        tempMin: jsonRes.main.temp_min,
        tempMax: jsonRes.main.temp_max
    })
  }

  componentDidMount(): void { 
    this.getLocation();
  }
  
  }

