import styled from "styled-components";

export const Container = styled.div`
  display: grid;
  grid-template-columns: 0.4fr 0.6fr;
  grid-row-gap: 20px;
  grid-column-gap: 20px;
`;

export const CountryChartContainer = styled.div`
  & > div {
    display: flex;
    justify-content: space-around;
  }
`;

export const TableContainer = styled.div`
  max-height: 100vh;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
  flex: 1;
  margin-top: 20px;
  margin-left: 20px;
`;

export const ChartContainer = styled.div`
  box-shadow: 0 7px 7px #0002;
  padding: 15px;
  border-radius: 5px;
  h2 {
    color: #212121;
    font-size: 16px;
  }
`;
