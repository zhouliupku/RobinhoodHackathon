import { Card, CardContent, FormControl, MenuItem, Select } from '@mui/material';
import React, { useEffect, useState } from 'react';
import './App.css';
import InfoBox from './components/InfoBox';
import Table from './components/Table';
import { sortData, prettyPrintStat } from './utils';

function App() {

  const [countryInfo, setCountryInfo] = useState({});
  const [countries, setCountries] = useState([]);
  const [country, setInputCountry] = useState("worldwide");
  const [tableData, setTableData] = useState([]);
  const [casesType, setCasesType] = useState("cases");
  

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

  const onCountryChange = async (e) => {
    const countryCode = e.target.value;

    const url =
      countryCode === "worldwide"
        ? "https://disease.sh/v3/covid-19/all"
        : `https://disease.sh/v3/covid-19/countries/${countryCode}`;
    await fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setInputCountry(countryCode);
        setCountryInfo(data);
      });
  };

  return (
    <div className="app">
      <div className="app__left">
        <div className="app__header">
          <h1>Today Covid-19</h1>
          <FormControl className="app__dropdown">
            <Select variant="outlined" value={country} onChange={onCountryChange}>
              <MenuItem value="worldwide">
                Worldwide
              </MenuItem>
              {countries.map((country) => (
                <MenuItem value={country.value}>{country.name}</MenuItem>
              ))}
            </Select>

          </FormControl>
        </div>

        <div className="app__stats">
          <InfoBox  
            onClick={(e) => setCasesType("cases")}
            title="Covid-19 Cases"
            active={casesType === "cases"}
            isRed
            cases = {prettyPrintStat(countryInfo.todayCases)}
            total = {countryInfo.cases}
            />
          <InfoBox  
            onClick={(e) => setCasesType("recovered")}
            title="Recoverd"
            active={casesType === "recovered"}
            isRed
            cases = {prettyPrintStat(countryInfo.todayRecovered)}
            total = {countryInfo.recovered}
            />
          <InfoBox  
            onClick={(e) => setCasesType("deaths")}
            title="Deaths"
            active={casesType === "deaths"}
            isRed
            cases = {prettyPrintStat(countryInfo.todayDeaths)}
            total = {countryInfo.deaths}
            />
          
        </div>
        

      </div>
      <Card className="app__right">
        <CardContent>
          <div className="app__information">
            <h3>Cases by Country</h3>
            <Table countries={tableData} />
            
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
