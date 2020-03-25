import React, { useState, useEffect } from "react";
import {
  OverView,
  Container,
  PercentBox,
  Percent,
  PercentText,
  Presentation,
  GraphContainer
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
          percent: percent(totalCasesInCountry, totalCasesInWorld)
        },
        {
          legend: "dos Curados",
          percent: percent(totalRecoveredInCountry, totalRecoveredInWorld)
        },
        {
          legend: "dos casos fatais",
          percent: percent(totalFatalInCountry, totalFatalInWorld)
        }
      ];

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
      console.log(history.data.stat_by_country);
      setCountryHistory(history.data.stat_by_country);
    }
    getCountryHistory();
  }, [countryName]);

  const formatedPropData = useMemo(() => {
    function formatHistoryData() {
      let formatedData = countryHistory.map((d, i) => ({
        Nome: d.country_name,
        "Total de casos": toNumber(d.total_cases),
        "Novos casos": toNumber(d.new_cases),
        "Ainda infectados": toNumber(d.active_cases),
        Mortes: toNumber(d.total_deaths),
        "Novas mortes": toNumber(d.new_deaths),
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
            <h4>Uma visão geral sobre o mundo</h4>
          </Presentation>

          <OverView>
            {overviewInfo.map(overview => (
              <PercentBox key={overview.legend}>
                <Percent>{overview.percent}%</Percent>
                <PercentText>{overview.legend}</PercentText>
              </PercentBox>
            ))}
          </OverView>
          <GraphContainer>
            <CountryGraphic
              data={formatedPropData}
              dataKey="Total de casos"
              lineColor="blue"
            />
          </GraphContainer>
        </>
      )}
    </Container>
  );
}
