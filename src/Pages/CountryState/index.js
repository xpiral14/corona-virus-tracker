import React, { useState, useEffect } from "react";
import Table from "../../components/Table";
import axios from "axios";
import config from "../../config";
import {
  Container,
  TableContainer,
  ChartContainer,
  CountryChartContainer,
  Title,
  FindCountry,
  LoadingContainer
} from "./style";
import CountryGraphic from "../../components/CountryGraphic";
import { format, set } from "date-fns";
import { pt } from "date-fns/locale";
import { BarLoader } from "react-spinners";
export default function CountryState() {
  const [columnNames, setColumnNames] = useState(null);
  const [allColumnData, setAllColumnData] = useState(null);
  const [columnData, setColumnData] = useState(null);
  const [totalInfected, setTotalInfected] = useState(null);
  const [totalHealed, setTotalHealed] = useState(null);
  const [currentCountry, setCurrentCountry] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [searchedCountry, setSearchedCountry] = useState(null);
  useEffect(() => {
    async function getCountryHistory(country) {
      setIsLoading(true);
      let response = await axios.get(
        config.urls.historyByParticularCountry(country),
        {
          headers: {
            "X-RapidAPI-Host": config.rapidApi.apiHost,
            "X-RapidAPI-Key": config.rapidApi.apiKey
          }
        }
      );
      let { stat_by_country: stateByCountry } = response.data;
      let totalInfected = stateByCountry.map(data => ({
        Infectados: Number.parseFloat(data.total_cases.replace(",", "")) || 0,
        Data: format(new Date(data.record_date), "dd 'de' MMMM", { locale: pt })
      }));

      let totalHealed = stateByCountry.map(data => ({
        Curados: Number.parseFloat(data.total_recovered.replace(",", "")) || 0,
        Data: format(new Date(data.record_date), "dd 'de' MMMM", { locale: pt })
      }));
      currentCountry && setTotalInfected(totalInfected);
      currentCountry && setTotalHealed(totalHealed);
      setIsLoading(false);
    }

    getCountryHistory(currentCountry);
  }, [currentCountry]);

  useEffect(() => {
    let ignoresColumns = [3, 5, 6, 9];
    async function getData() {
      let columnNames = {
        country_name: "Nome do país",
        cases: "Casos",
        deaths: "Mortes",
        total_recovered: "Curados",
        serious_critical: "Estado crítico",
        active_cases: "Casos ativos"
      };
      let response = await axios.get(config.urls.casesByCountry, {
        headers: {
          "X-RapidAPI-Host": config.rapidApi.apiHost,
          "X-RapidAPI-Key": config.rapidApi.apiKey
        }
      });
      let { data } = response;
      // obtem o nome das colunas
      setColumnNames(
        Object.keys(data.countries_stat[0])
          .filter((columName, index) => !ignoresColumns.includes(index))
          .map(column => columnNames[column])
      );
      let importantColumns = data.countries_stat.map(eachColumn =>
        Object.values(eachColumn).filter(
          (column, index) => !ignoresColumns.includes(index)
        )
      );
      setAllColumnData(importantColumns);
      setColumnData(importantColumns);
    }
    getData();
  }, []);
  function orderBy(column) {
    let columnIndex = columnNames.findIndex(a => a === column);
    let valuesOrdered = columnData.sort((a, b) => {
      if (isNaN(Number.parseFloat(a[columnIndex].replace(",", "")))) {
        if (a[columnIndex] < b[columnIndex]) return -1;
        if (a[columnIndex] > b[columnIndex]) return 1;

        return 0;
      } else {
        console.log(a[columnIndex]);
        return (
          +Number.parseFloat(a[columnIndex].replace(",", "")) -
          +b[columnIndex].replace(",", "")
        );
      }
    });
    setAllColumnData([...valuesOrdered]);
  }

  function searchCountry() {
    if (searchedCountry) {
      let foundedCountry = allColumnData.filter(country =>
        new RegExp(`${searchedCountry}`, "gi").test(country[0])
      );
      console.log(foundedCountry);
      setColumnData(foundedCountry);
    } else {
      setColumnData(allColumnData);
    }
  }
  return (
    <>
      <Container>
        {!columnData ? (
          <LoadingContainer>
            <BarLoader />
          </LoadingContainer>
        ) : (
          <>
            <div>
              <FindCountry>
                <input
                  onChange={e => setSearchedCountry(e.target.value)}
                  placeholder="Digite o nome do país"
                  onKeyPress={e => {
                    if (e.charCode === 13) searchCountry(e.target.value);
                  }}
                ></input>
                <button onClick={() => searchCountry(searchedCountry)}>
                  Pesquisar País
                </button>
              </FindCountry>
              <TableContainer>
                <Table
                  header={columnNames}
                  rows={columnData}
                  setCurrentCountry={setCurrentCountry}
                  orderedBy={orderBy}
                  totalPerPage={10}
                  width="100%"
                />
              </TableContainer>
            </div>
            {!totalInfected ? (
              !currentCountry ? (
                <h2 style={{ marginTop: "20px" }}>
                  Selecione um país para ver o monitoramento.
                </h2>
              ) : (
                isLoading &&
                currentCountry && (
                  <span style={{ marginTop: "20px" }}>
                    <BarLoader />
                  </span>
                )
              )
            ) : (
              <CountryChartContainer>
                <h2>Histórico {currentCountry}</h2>

                <div>
                  <ChartContainer area="infect">
                    <h2>Total de infectados</h2>

                    <CountryGraphic
                      data={totalInfected}
                      lineColor="#CCDAF1"
                      dataKey="Infectados"
                      dataKeyX="Data"
                    />
                  </ChartContainer>
                  <ChartContainer area="healed">
                    <h2>Total de curados</h2>
                    <CountryGraphic
                      data={totalHealed}
                      lineColor="yellow"
                      dataKey="Curados"
                      dataKeyX="Data"
                    />
                  </ChartContainer>
                </div>
              </CountryChartContainer>
            )}
          </>
        )}
      </Container>
    </>
  );
}
