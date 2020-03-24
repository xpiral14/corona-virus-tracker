import React, { useState, useMemo } from "react";
import {
  Container,
  CountrySelectContainer,
  ChartContainer,
  Countries,
  Country,
  SearchCountry
} from "./style";
import { useEffect } from "react";
import axios from "axios";
import { BarLoader } from "react-spinners";
import config from "../../config";
import CompareCountriesGraph from "../../components/CompareCountriesGraph";
import { format } from "date-fns";
import { pt } from "date-fns/locale";

function formatDataToGraph(countries, countryToInsert) {
  let finalObjectArray = [];
  for (let i = 0; i < countries.length; i++) {
    let countryName = Object.keys(countryToInsert[i])[1];
    finalObjectArray = [
      ...finalObjectArray,
      {
        ...countries[i],
        [countryName]: countryToInsert[i][countryName]
      }
    ];
  }
  return finalObjectArray;
}

  export default function CountryComparation() {
  const [allCountries, setAllCountries] = useState(null);
  const [countries, setCountries] = useState(null);
  const [selectedCountries, setSelectedCountries] = useState([]);
  const [countryHistories, setCountryHistories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  function searchCountry(countryName) {
    let countrySearched = allCountries.filter(country =>
      new RegExp(countryName, "ig").test(country)
    );

    setCountries(countrySearched);
  }
  async function addInSelectedCountries(country) {
    let existsCountryInState = selectedCountries.find(countryName => countryName === country);
    if (existsCountryInState) {
      setSelectedCountries(selectedCountries.filter(countryName => countryName !== existsCountryInState))
      return
    };

    if(selectedCountries.length > 4) {
      alert("Você já selecionou 5 países!")
      return;
    }
    
    setSelectedCountries(selectedCountries.concat(country));
    await getSeletedCountriesHistory(country);
  }

  useEffect(() => {
    async function getData() {
      const response = await axios.get(config.urls.affectedCountries, {
        headers: {
          "X-RapidAPI-Host": config.rapidApi.apiHost,
          "X-RapidAPI-Key": config.rapidApi.apiKey
        }
      });

      setAllCountries(response.data.affected_countries);
      setCountries(response.data.affected_countries);
    }
    getData();
  }, []);

  async function getSeletedCountriesHistory(country) {
    let response = await axios.get(
      config.urls.historyByParticularCountry(country),
      {
        headers: {
          "X-RapidAPI-Host": config.rapidApi.apiHost,
          "X-RapidAPI-Key": config.rapidApi.apiKey
        }
      }
    );
    let importantData = response.data.stat_by_country.map(data => {
      return {
        Data: format(new Date(data.record_date), "dd 'de' MMMM '/' hh:mm", {
          locale: pt
        }),
        [country]: Number.parseInt(data.total_cases.replace(",", ""))
      };
    });
    let countriesFormated = !!countryHistories.length
      ? formatDataToGraph(countryHistories, importantData)
      : importantData;
    setCountryHistories([...countriesFormated]);
  }
  return (
    <Container>
      <CountrySelectContainer>
        {!countries ? (
          <BarLoader />
        ) : (
          <>
            <SearchCountry>
              <input
                placeholder="Digite o nome do país"
                onChange={e => searchCountry(e.target.value)}
              />
            </SearchCountry>
            <Countries>
              {countries.map(country => (
                <Country
                  key={country}
                  active = {selectedCountries.includes(country)}
                  onClick={() => addInSelectedCountries(country)}
                >
                  {country}
                </Country>
              ))}
            </Countries>
          </>
        )}
      </CountrySelectContainer>
      <ChartContainer>
        {!countryHistories.length ? (
          <h2>Selecione os países que deseja comparar</h2>
        ) : (
          <>
          <h2>Selecione até 5 países</h2>
          <CompareCountriesGraph countries={countryHistories} />
          </>
        )}
      </ChartContainer>
    </Container>
  );
}
