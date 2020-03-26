import React, { useState } from "react";
import {
  Container,
  CountrySelectContainer,
  ChartContainer,
  Countries,
  Country,
  SearchCountry,
  LoadingContainer
} from "./style";
import { useEffect } from "react";
import { BarLoader } from "react-spinners";
import config from "../../config";
import CompareCountriesGraph from "../../components/CompareCountriesGraph";
import { format } from "date-fns";
import { pt } from "date-fns/locale";
import api from "../../config/api";

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
    if (isLoading) return;
    let existsCountryInState = selectedCountries.find(
      countryName => countryName === country
    );
    if (existsCountryInState) {
      setSelectedCountries(
        selectedCountries.filter(
          countryName => countryName !== existsCountryInState
        )
      );
      return;
    }

    setIsLoading(true);

    setSelectedCountries(selectedCountries.concat(country));

    setIsLoading(false);
  }
  // busca o nome dos países infectados.
  useEffect(() => {
    async function getData() {
      const response = await api.get(config.urls.affectedCountries);
      let { affected_countries: affectedCountries } = response.data;
      setAllCountries(affectedCountries);
      setCountries(affectedCountries);
    }
    setIsLoading(true);
    getData();
    setIsLoading(false);
  }, []);

  useEffect(() => {
    async function getSeletedCountriesHistory() {
      setIsLoading(true);
      function getCountryHistory(countryName) {
        return api.get(config.urls.historyByParticularCountry(countryName));
      }
      const getCountryHistouryAsAsync = async countryName => {
        return getCountryHistory(countryName);
      };

      const getData = async () => {
        return Promise.all(
          selectedCountries.map(countryName =>
            getCountryHistouryAsAsync(countryName)
          )
        );
      };

      let countryHistories = (await getData()).map(res =>
        res.data.stat_by_country.map(data => {
          return {
            Data: format(new Date(data.record_date), "dd 'de' MMMM '/' hh:mm", {
              locale: pt
            }),
            [data.country_name]: Number.parseInt(
              data.total_cases.replace(",", "")
            )
          };
        })
      );
      let firstCountryHistory = countryHistories[0];
      let countryName;

      // para cada história de um país encontrado, prepara os dados de maneira que a biblioteca de gráficos entenda.
      for (let i = 1; i < countryHistories.length; i++) {
        // para cada objeto de uma parte de uma história, adiciona o valor de "Total de casos" em um atributo com o nome do país.
        for (let j = 0; j < firstCountryHistory.length; j++) {
          // pega o nome do país do objeto atual.
          countryName = Object.keys(countryHistories[i][j])[1];
          firstCountryHistory[j] = {
            ...firstCountryHistory[j],
            [countryName]: countryHistories[i][j][countryName]
          };
        }
      }

      setCountryHistories(firstCountryHistory);
      setIsLoading(false);
    }
    if (selectedCountries.length) getSeletedCountriesHistory();
    else setCountryHistories([]);
  }, [selectedCountries]);

  return (
    <Container>
      {!countries ? (
        <LoadingContainer>
          <BarLoader />
        </LoadingContainer>
      ) : (
        <>
          <CountrySelectContainer>
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
                  active={selectedCountries.includes(country)}
                  onClick={() => addInSelectedCountries(country)}
                >
                  {country}
                </Country>
              ))}
            </Countries>
          </CountrySelectContainer>
          <ChartContainer>
            {!countryHistories.length ? (
              isLoading ? (
                <BarLoader />
              ) : (
                <h2>Selecione os países que deseja comparar</h2>
              )
            ) : isLoading ? (
              <BarLoader />
            ) : (
              <CompareCountriesGraph countries={countryHistories} />
            )}
          </ChartContainer>
        </>
      )}
    </Container>
  );
}
