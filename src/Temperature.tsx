import * as React from 'react'

const APIKEY: string = "c0bd32b3ab26640600d6f7e7219aa84d"
const YELLOW: string = "#fcff82"
const BLUE: string = "#afc5ff"


interface TemperatureObject {
  cityName: string,
  imgSrc: string,
  temp: number | null,
  feelsLike: number,
  tempMin: number,
  tempMax: number,
  description: string
}

const toTitleCase = (str: string): string => {
  return str.replace(
    /\w\S*/g,
    (txt) => {
      return txt.charAt(0).toUpperCase() + txt.substring(1).toLowerCase();
    }
  );
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
        tempMax: 0,
        description: ""
    }
  };

  render() {
    let content: JSX.Element = (
      <div id="temperatureContainer" className="loading">Loading...</div>
    );
    if (this.state.temp !== null) {
      content = (
        <div id="temperatureContainer">
        <h1 id="cityName">{this.state.cityName}</h1>
        <div id="temperatureDiv">
          <img src={this.state.imgSrc} alt="Image describing the weather" id="weatherImg" />
          <p id='temperature'>{Math.round(this.state.temp)}°C</p>
        </div>
        <p id="description">{this.state.description}</p>
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

  setStyle(): void {
    document.querySelector("body")?.setAttribute("style",`background: ${BLUE}`);
  }

  // Takes in JSON Response from API call and updates the temperature info
  setTemperature(jsonRes: any): void {
    this.setStyle()
    this.setState({
        cityName: jsonRes.name,
        imgSrc: `https://openweathermap.org/img/wn/${jsonRes.weather[0].icon}@2x.png`,
        temp: jsonRes.main.temp,
        feelsLike: jsonRes.main.feels_like,
        tempMin: jsonRes.main.temp_min,
        tempMax: jsonRes.main.temp_max,
        description: toTitleCase(jsonRes.weather[0].description)
    })
  }

  componentDidMount(): void { 
    this.getLocation();
  }
  }

