import React, { useEffect, useState } from 'react';
import './App.css';
import InfoBox from './components/InfoBox';

function App() {

  const [countryInfo, setCountryInfo] = useState({});

  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all")
    .then((response) => response.json())
    .then((data) => {
      setCountryInfo(data);
    });
  }, []);

  return (
    <div className="app">
      <div className="app__left">
        <div className="app__header">
          <h1>COVID-19 Tracker</h1>
        </div>

        <div className="app__stats">
          <InfoBox  title="Cases"
            cases = {countryInfo.todayCases}
            total = {countryInfo.cases}
            />
          <InfoBox  title="Recoverd"
            cases = {countryInfo.todayRecovered}
            total = {countryInfo.recovered}
            />
          <InfoBox  title="Deaths"
            cases = {countryInfo.todayDeaths}
            total = {countryInfo.deaths}
            />
          
        </div>

      </div>
    </div>
  );
}

export default App;
