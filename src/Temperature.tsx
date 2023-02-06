import * as React from 'react'

const APIKEY = "c0bd32b3ab26640600d6f7e7219aa84d"

interface TemperatureObject {
  cityName: string,
  imgSrc: string,
  temp: number,
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
        temp: 0,
        feelsLike: 0,
        tempMin: 0,
        tempMax: 0
    }
  };

  render() {
    return (
      <div id="temperatureContainer">
        <img src={this.state.imgSrc} alt="Image for weather illustration" id="weatherImg" />
        <p id="temperature">{this.state.temp}°C</p>
      </div>
    );
   }

  getLocation(): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        this.getTemperature(pos.coords.longitude, pos.coords.latitude)
      }, (err) => {
        console.error(err);
      });
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }
  
  getTemperature(lon: number,lat: number): void {
  fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIKEY}&units=metric`).then((res) => {
    res.json().then(json => {
      this.setTemperature(json)
    })
  })
  }

  setTemperature(jsonRes: any): void {
    console.log(jsonRes)
    this.setState({
        cityName: jsonRes.name,
        imgSrc: `https://openweathermap.org/img/wn/${jsonRes.weather[0].icon}@2x.png`,
        temp: Math.round(jsonRes.main.temp),
        feelsLike: jsonRes.main.feels_like,
        tempMin: jsonRes.main.temp_min,
        tempMax: jsonRes.main.temp_max
    })
  }

  componentDidMount(): void { 
    this.getLocation();
  }
  
  }

