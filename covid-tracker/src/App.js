import { Card, CardContent, FormControl, MenuItem, Select } from '@mui/material';
import React, { useEffect, useState } from 'react';
import './App.css';
import InfoBox from './components/InfoBox';
import Table from './components/Table';
import { sortData } from './utils';

function App() {

  const [countryInfo, setCountryInfo] = useState({});
  const [countries, setCountries] = useState([]);
  const [country, setInputCountry] = useState("worldwide");
  const [tableData, setTableData] = useState([]);

  // get world level stats
  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all")
    .then((response) => response.json())
    .then((data) => {
      setCountryInfo(data);
    });
  }, []);

  useEffect(() => {
    const getCountriesData = async () => {
      fetch("https://disease.sh/v3/covid-19/countries")
      .then((response) => response.json())
      .then((data) => {
        const countries = data.map((country) => ({
          name: country.country,
          value: country.countryInfo.iso2,
        }))
        let sortedData = sortData(data);
        setCountries(countries);
        setTableData(sortedData);
      })
    }
    getCountriesData();
  }, [])

  return (
    <div className="app">
      <div className="app__left">
        <div className="app__header">
          <h1>COVID-19 Tracker</h1>
          <FormControl className="app__dropdown">
            <Select variant="outlined" value={country}>
              <MenuItem value="wordwide">
                Worldwide
              </MenuItem>
              {countries.map((country) => (
                <MenuItem value={country.value}>{country.name}</MenuItem>
              ))}
            </Select>

          </FormControl>
        </div>

        <div className="app__stats">
          <InfoBox  title="Covid-19 Cases"
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
      <Card className="app__right">
        <CardContent>
          <div className="app__information">
            <h3>Live Cases by Country</h3>
            <Table countries={tableData} />
              
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
