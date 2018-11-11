import React, { Component } from 'react';
import { darkskyApiKey } from './secrets';
import ScoreData from './main/ScoreData';
import Header from './header';
import Footer from './Footer';

class Forcast extends Component {

  constructor(props) {
    super(props);

    this.d = new Date();

    this.days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
    ];

    this.medianTemp = 55;
    this.stdDevTemp = 5;
    this.tempScale = 10;
    this.uvScale = 10;
    this.rainScale = 10;

    this.state = {
      currentDayName: this.days[this.d.getDay()],
      currentDayIndex: this.d.getDay(),
      currentLat: 38.2527,
      currentLng: -85.7585,
      forcastAveragedTemp: [],
      forcastDayNames: [],
      forcastHumidity: [],
      forcastPrecipProbability: [],
      forcastTempHigh: [],
      forcastTempLow: [],
      forcastTime: [],
      forcastUV: [],
      forcastWeatherIcons: [],
      forcastWeatherScores: [],
      forcastWeatherSummary: [],
      isDataReceived: false,
      isDataRequested: false,
      userTempScale: 'f'

    };
  }

  // Calculate each day's weather score and push to array then find the best day to run

  calcuateWeatherScoresByDay = () => {

    const {
      forcastHumidity,
      forcastTempHigh,
      forcastTempLow,
      forcastUV,
      forcastPrecipProbability
    } = this.state;

    const scoresArray = [];
    
    const averagedTempArray = [];

    for(let i = 0; i <= 7; i++) {

      let humidityScore = forcastHumidity[i] * 10;
      let averagedTemp = (forcastTempHigh[i] + forcastTempLow[i]) / 2;
      let tempScore = this.tempScale - ((Math.abs(this.medianTemp - averagedTemp)) / this.stdDevTemp);
      let uvScore = (this.uvScale - forcastUV[i]);
      let rainScore = (this.rainScale - (forcastPrecipProbability[i] * 10));

      let totalScore = ((tempScore + uvScore + humidityScore + rainScore) / 4);

      averagedTempArray.push(averagedTemp);

      scoresArray.push(totalScore);

    }

    this.setState({
        forcastWeatherScores: scoresArray,
        forcastAveragedTemp: averagedTempArray,
    });
    
    this.setState({
      isDataReceived: true,
      isDataRequested: false
    });
    
  }

  // Fetch forcast data, set day names array, and calculate weather scores

  fetchForcast = () => {

    const {currentLat, currentLng} = this.state;

    fetch(`https://calm-refuge-25215.herokuapp.com/https://api.darksky.net/forecast/${darkskyApiKey}/${currentLat},${currentLng}`)
      .then(res => res.json())
      .then(parsedJSON => {
        console.log(parsedJSON);
        this.setState({
          forcastHumidity: parsedJSON.daily.data.map(d => d.humidity),
          forcastPrecipProbability: parsedJSON.daily.data.map(d => d.precipProbability),
          forcastTempHigh: parsedJSON.daily.data.map(d => d.apparentTemperatureHigh),
          forcastTempLow: parsedJSON.daily.data.map(d => d.apparentTemperatureLow),
          forcastUV: parsedJSON.daily.data.map(d => d.uvIndex),
          forcastIsRaning: parsedJSON.daily.data.map(d => d.precipProbability),
          forcastTime: parsedJSON.daily.data.map(d => d.sunriseTime),
          forcastWeatherIcons: parsedJSON.daily.data.map(d => d.icon),
          forcastWeatherSummary: parsedJSON.daily.data.map(d => d.summary),
          isDataRequested: true
        });
        this.getForcastDayNames();
        this.calcuateWeatherScoresByDay();
      })
      .catch(error => console.log(`fetchForcast error in Scheduler: ${error}`));

  }
  
  // Create array of day names starting with the current day of the week
  
  getForcastDayNames = () => {
    
    const { forcastDayNames } = this.state;
    
    for(let i = 0; i < 7 ; i++) {
      forcastDayNames[i] = this.days[(this.d.getDay() + i)];
    }
    
  }
  
  componentWillMount() {
    
    this.fetchForcast();

  }

  render() {
    
    const {
      forcastAveragedTemp,
      forcastDayNames,
      forcastHumidity,
      forcastWeatherIcons,
      forcastWeatherScores,
      forcastWeatherSummary,
      forcastUV,
      isDataRequested,
      isDataReceived,
      userTempScale
    } = this.state;

    return(

        <section id="forcastSection">

            <Header/>

            <section id="sevenDayForcast" className="column">

                <h2>7 Day Forcast</h2>
                
                {/* Render ul once data is received */}

                { isDataRequested ?
                
                  <h3>Loading...</h3>
                
                : isDataReceived ?

                <ul>

                  <ScoreData

                    currentHumidity={forcastHumidity[0]}
                    currentTemp={forcastAveragedTemp[0]}
                    currentUV={forcastUV[0]}
                    currentWeatherIcon={forcastWeatherIcons[0]}
                    currentWeatherSummary={forcastWeatherSummary[0]}
                    forcastDayName={forcastDayNames[0]}
                    userTempScale={userTempScale}
                    weatherScore={forcastWeatherScores[0]}

                  />
                  
                  <ScoreData

                    currentHumidity={forcastHumidity[1]}
                    currentTemp={forcastAveragedTemp[1]}
                    currentUV={forcastUV[1]}
                    currentWeatherIcon={forcastWeatherIcons[1]}
                    currentWeatherSummary={forcastWeatherSummary[1]}
                    forcastDayName={forcastDayNames[1]}
                    userTempScale={userTempScale}
                    weatherScore={forcastWeatherScores[1]}

                  />
                  
                  <ScoreData

                    currentHumidity={forcastHumidity[2]}
                    currentTemp={forcastAveragedTemp[2]}
                    currentUV={forcastUV[2]}
                    currentWeatherIcon={forcastWeatherIcons[2]}
                    currentWeatherSummary={forcastWeatherSummary[2]}
                    forcastDayName={forcastDayNames[2]}
                    userTempScale={userTempScale}
                    weatherScore={forcastWeatherScores[2]}

                  />
                  
                  <ScoreData

                    currentHumidity={forcastHumidity[3]}
                    currentTemp={forcastAveragedTemp[3]}
                    currentUV={forcastUV[3]}
                    currentWeatherIcon={forcastWeatherIcons[3]}
                    currentWeatherSummary={forcastWeatherSummary[3]}
                    forcastDayName={forcastDayNames[3]}
                    userTempScale={userTempScale}
                    weatherScore={forcastWeatherScores[3]}

                  />
                  
                  <ScoreData

                    currentHumidity={forcastHumidity[4]}
                    currentTemp={forcastAveragedTemp[4]}
                    currentUV={forcastUV[4]}
                    currentWeatherIcon={forcastWeatherIcons[4]}
                    currentWeatherSummary={forcastWeatherSummary[4]}
                    forcastDayName={forcastDayNames[4]}
                    userTempScale={userTempScale}
                    weatherScore={forcastWeatherScores[4]}

                  />
                  
                  <ScoreData

                    currentHumidity={forcastHumidity[5]}
                    currentTemp={forcastAveragedTemp[5]}
                    currentUV={forcastUV[5]}
                    currentWeatherIcon={forcastWeatherIcons[5]}
                    currentWeatherSummary={forcastWeatherSummary[5]}
                    forcastDayName={forcastDayNames[5]}
                    userTempScale={userTempScale}
                    weatherScore={forcastWeatherScores[5]}

                  />
                  
                  <ScoreData

                    currentHumidity={forcastHumidity[6]}
                    currentTemp={forcastAveragedTemp[6]}
                    currentUV={forcastUV[6]}
                    currentWeatherIcon={forcastWeatherIcons[6]}
                    currentWeatherSummary={forcastWeatherSummary[6]}
                    forcastDayName={forcastDayNames[6]}
                    userTempScale={userTempScale}
                    weatherScore={forcastWeatherScores[6]}

                  />

                </ul>

                : null }

            </section>

            <Footer / >

        </section>

    );

  }

}

  export default Forcast;
