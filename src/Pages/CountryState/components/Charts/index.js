import React, { useState, useEffect } from "react";
import {
  OverView,
  Container,
  PercentBox,
  Percent,
  PercentText,
  Presentation,
  GraphContainer,
  GraphBox,
  Title
} from "./style";
import api from "../../../../config/api";
import config from "../../../../config";
import { BarLoader } from "react-spinners";
import toNumber from "../../../../utils/toNumber";
import percent from "../../../../utils/percent";
import { format } from "date-fns/esm";
import { useMemo } from "react";
import { pt } from "date-fns/esm/locale";
import CountryGraphic from "../../../../components/CountryGraphic";

export default function Charts({ countryName }) {
  const [isLoading, setIsLoading] = useState(true);
  const [overviewInfo, setOverviewInfo] = useState(null);
  const [countryHistory, setCountryHistory] = useState(null);
  const [countryLatestState, setCountryLatestState] = useState(null);

  useEffect(() => {
    async function getLastestState() {
      setIsLoading(true);
      let {
        data: { latest_stat_by_country: latestStateByCountry }
      } = await api.get(config.urls.latestStateByCountry(countryName));

      latestStateByCountry = latestStateByCountry[0];
      let { data: worldLatestState } = await api.get(
        config.urls.worldTotalState
      );

      let totalCasesInCountry = parseInt(
        latestStateByCountry.total_cases.replace(",", "")
      );
      let totalCasesInWorld = parseInt(
        worldLatestState.total_cases.replace(",", "")
      );
      let totalRecoveredInCountry = parseInt(
        latestStateByCountry.total_recovered.replace(",", "")
      );
      let totalRecoveredInWorld = parseInt(
        worldLatestState.total_recovered.replace(",", "")
      );
      let totalFatalInCountry = parseInt(
        latestStateByCountry.total_deaths.replace(",", "")
      );
      let totalFatalInWorld = parseInt(
        worldLatestState.total_deaths.replace(",", "")
      );
      let overviewInfos = [
        {
          legend: "dos Infectados",
          percent: percent(totalCasesInCountry, totalCasesInWorld),
          bg: "#FF6961"
        },
        {
          legend: "dos casos fatais",
          percent: percent(totalFatalInCountry, totalFatalInWorld),
          bg: "#FF6961"
        },
        {
          legend: "dos Curados",
          percent: percent(totalRecoveredInCountry, totalRecoveredInWorld),
          bg: "#77DD77"
        },
      ];
      setCountryLatestState(latestStateByCountry);
      setOverviewInfo(overviewInfos);
      setIsLoading(false);
    }

    getLastestState();
  }, [countryName]);

  useEffect(() => {
    async function getCountryHistory() {
      let history = await api.get(
        config.urls.historyByParticularCountry(countryName)
      );
      setCountryHistory(history.data.stat_by_country);
    }
    getCountryHistory();
  }, [countryName]);

  const formatedPropData = useMemo(() => {
    function formatHistoryData() {
      let formatedData = countryHistory.map((d, i) => ({
        Nome: d.country_name,
        "Total de casos": toNumber(d.total_cases),
        "Casos recentes": toNumber(d.new_cases),
        "Ainda infectados": toNumber(d.active_cases),
        Mortes: toNumber(d.total_deaths),
        "Mortes recentes": toNumber(d.new_deaths),
        "Em UTI": toNumber(d.serious_critical),
        "Total recuperados": toNumber(d.total_recovered),
        "Casos confirmados": toNumber(d.new_cases),
        Data: format(new Date(d.record_date), "dd 'de' MMMM 'ás' hh:mm", {
          locale: pt
        })
      }));
      return formatedData;
    }
    return !countryHistory ? null : formatHistoryData();
  }, [countryHistory]);
  return (
    <Container>
      {isLoading ? (
        <BarLoader />
      ) : (
        <>
          <Presentation>
            <h2>{countryName.toUpperCase()}</h2>
            <h4>Visão geral no mundo</h4>
          </Presentation>

          <OverView>
            {overviewInfo.map(overview => (
              <PercentBox key={overview.legend} bg = {overview.bg}>
                <Percent>{overview.percent}%</Percent>
                <PercentText>{overview.legend}</PercentText>
              </PercentBox>
            ))}
          </OverView>
          <GraphContainer>
            <GraphBox>
              <Title>
                <h4>Mortes recentes</h4>
                <span>+ {countryLatestState.new_deaths}</span>
              </Title>
              <CountryGraphic
                data={formatedPropData}
                dataKey="Mortes recentes"
                width="100%"
                height="70%"
                lineColor="#FF6961"
              />
            </GraphBox>
            <GraphBox>
              <Title>
                <h4>Novos Infectados</h4>
                <span>+ {countryLatestState.new_cases}</span>
              </Title>
              <CountryGraphic
                data={formatedPropData}
                dataKey="Casos recentes"
                width="100%"
                height="70%"
                lineColor="#FF6961"
              />
            </GraphBox>
            <GraphBox>
              <Title>
                <h4>Em UTI</h4>
                <span>{countryLatestState.serious_critical}</span>
              </Title>
              <CountryGraphic
                data={formatedPropData}
                dataKey="Em UTI"
                width="100%"
                height="70%"
                lineColor="#FF6961"
              />
            </GraphBox>
            <GraphBox>
              <Title>
                <h4>Total Recuperados</h4>
                <span>{countryLatestState.total_recovered}</span>
              </Title>
              <CountryGraphic
                data={formatedPropData}
                dataKey="Total recuperados"
                width="100%"
                height="70%"
                lineColor="#77DD77"
              />
            </GraphBox>
          </GraphContainer>
        </>
      )}
    </Container>
  );
}
