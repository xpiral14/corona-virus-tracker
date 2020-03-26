import React, { useEffect, useState } from "react";
import api from "../../config/api";
import config from "../../config";
import { Container, Information } from "./style";
import { BarLoader } from "react-spinners";

export default function Header() {
  const [isLoading, setIsLoading] = useState(false);
  const [worldState, setWorldState] = useState(true);
  useEffect(() => {
    async function getWorldData() {
      setIsLoading(true);
      let response = await api.get(config.urls.worldTotalState);

      setWorldState(response.data);
      setIsLoading(false);
    }
    getWorldData();
  }, []);

  return (
    <Container>
      {isLoading ? (
        <BarLoader />
      ) : (
        <>
          <Information>
            <h2>Casos</h2>
            <p>{worldState.total_cases}</p>
          </Information>
          <Information>
            <h2>Mortes</h2>
            <p>{worldState.total_deaths}</p>
          </Information>
          <Information>
            <h2>Curados</h2>
            <p>{worldState.total_recovered}</p>
          </Information>
          <Information>
            <h2>Casos recentes</h2>
            <p>+{worldState.new_cases}</p>
          </Information>
        </>
      )}
    </Container>
  );
}
