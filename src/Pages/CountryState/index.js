import React, { useState, useEffect } from "react";
import Table from "../../components/Table";
import config from "../../config";
import {
  Container,
  TableContainer,
  CountryChartContainer,
  FindCountry,
  LoadingContainer
} from "./style";
import { BarLoader } from "react-spinners";
import Charts from "./components/Charts";
import api from "../../config/api";
import Header from "../../components/Header";
export default function CountryState() {
  const [columnNames, setColumnNames] = useState(null);
  const [allColumnData, setAllColumnData] = useState(null);
  const [columnData, setColumnData] = useState(null);
  const [currentCountry, setCurrentCountry] = useState(null);
  const [searchedCountry, setSearchedCountry] = useState(null);

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
      let response = await api.get(config.urls.casesByCountry);
      let { data } = response;
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
      setColumnData(foundedCountry);
    } else {
      setColumnData(allColumnData);
    }
  }
  return (
    <>
      <Header />
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
            {!currentCountry ? (
              <h2 style={{ marginTop: "20px" }}>
                Selecione um país para ver o monitoramento.
              </h2>
            ) : (
              <CountryChartContainer>
                <Charts countryName={currentCountry} />
              </CountryChartContainer>
            )}
          </>
        )}
      </Container>
    </>
  );
}
