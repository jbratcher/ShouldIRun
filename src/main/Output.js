import React, { Component } from 'react';
import ClothesData from './ClothesData';
import ScoreData from './ScoreData';
import MapContainer from './MapContainer';

class Output extends Component {

  constructor(props) {
    super(props);

    this.state = {
      currentTempIndex: ""

    };
  }

  getCurrentTempIndex = () => {

    const { currentTemp } = this.props;

    currentTemp >= 85
      ? this.setState({
          currentTempIndex: "hot"
        })
      : currentTemp < 85 && currentTemp >= 75
      ? this.setState({
          currentTempIndex: "warm"
        })
      : currentTemp < 75  && currentTemp >= 65
      ? this.setState({
          currentTempIndex: "neutral"
        })
      : currentTemp < 55 && currentTemp >=45
      ? this.setState({
          currentTempIndex: "chilly"
        })
      : currentTemp < 45
      ? this.setState({
          currentTempIndex: "cold"
        })
      : this.setState({
          currentTempIndex: ""
        });
      
  }

  getUserWarmthPrefernce = () => {

    const { userWarmthPreference } = this.props;
    

    userWarmthPreference === "maxCool"
      ? this.setState({
        currentTempIndex: "hot"
      })
      : userWarmthPreference === "modCool"
      ? this.setState({
        currentTempIndex: "warm"
      })
      : userWarmthPreference === "neutral"
      ? this.setState({
        currentTempIndex: "neutral"
      })
      : userWarmthPreference === "modWarmth"
      ? this.setState({
        currentTempIndex: "chilly"
      })
      : userWarmthPreference === "maxWarmth"
      ? this.setStae({
        currentTempIndex: "cold"
      })
      : this.setState({
        currentTempIndex: this.state.currentTempIndex
      });


  }

  componentDidMount() {

    this.getCurrentTempIndex();
    
    this.getUserWarmthPrefernce();

  }



  render() {

    const {
      airQuality,
      currentHumidity,
      currentLat,
      currentLng,
      currentTemp,
      currentUV,
      currentWeatherIcon,
      currentWeatherSummary,
      data,
      dataRequested,
      mainPollutant,
      userTempScale,
      weatherScore
    } = this.props;

    const { currentTempIndex } = this.state;

    return(

      <section id="outputContainer">

        <section id="dataOutput">
          
          {dataRequested ?
          
            <ClothesData
              
              currentTempIndex={currentTempIndex}
              
            />


          :null
          }

          {dataRequested ?

          
            <ScoreData
            
              airQuality={airQuality}
              currentHumidity={currentHumidity}
              currentTemp={currentTemp}
              currentUV={currentUV}
              currentWeatherIcon={currentWeatherIcon}
              currentWeatherSummary={currentWeatherSummary}
              data={data}
              mainPollutant={mainPollutant}
              userTempScale={userTempScale}
              weatherScore={weatherScore}
            
            />
          
          
          :null}
          
        </section>

        {dataRequested ?
        
        <MapContainer

          currentLat={currentLat}
          currentLng={currentLng}

        />
        
        :null}

      </section>

    );

  }

}

  export default Output;
