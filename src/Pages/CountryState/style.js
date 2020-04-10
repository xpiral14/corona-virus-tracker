import styled from "styled-components";
import { darken } from "polished";
import { textColor } from "../../globalStyle";

export const Container = styled.div`
  display: grid;
  grid-template-columns: 0.5fr 0.5fr;
  grid-row-gap: 20px;
  grid-column-gap: 20px;

  @media screen and (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const CountryChartContainer = styled.div`
  padding: 0 20px;
  margin-top: 20px;
`;

export const LoadingContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
export const TableContainer = styled.div`
  max-height: 100vh;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    width: 7px;
  }
  &::-webkit-scrollbar-thumb {
    background: ${textColor};
    border-radius: 5px;
  }
  flex: 1;
  margin-top: 20px;
  margin-left: 20px;
  @media screen and (max-width: 768px) {
    padding: 2rem;
    /* width: 100%; */
    max-width: 100vw;
    overflow-x: scroll;

    table {
      thead {
        td:nth-child(4),
        td:nth-child(5),
        td:nth-child(6) {
          display: none;
        }
      }
      tbody {
        td:nth-child(4),
        td:nth-child(5),
        td:nth-child(6) {
          display: none;
        }
      }
    }
  }
`;

export const ChartContainer = styled.div`
  margin-top: 20px;
  max-width: 300px;
  box-shadow: 0 7px 7px #0002;
  padding: 15px;
  border-radius: 5px;
  background-color: #fff;
  width: 100%;
  h2 {
    color: #212121;
    font-size: 16px;
  }
`;

export const FindCountry = styled.div`
  display: flex;
  align-items: center;
  padding: 0 0px 0 20px;
  margin-top: 20px;
  input,
  button {
    padding: 10px;
  }
  input {
    flex: 0.7;
    border: 1px solid #f4f7fc;
    border-radius: 5px 0 0 5px;
  }
  button {
    cursor: pointer;
    color: #2e3b52;
    background: #f4f7fc;
    border: none;
    font-weight: bold;
    border-radius: 0 5px 5px 0;
    flex: 0.3;
    transition: background 0.3s ease-in-out;
    &:hover {
      background: ${darken(0.1, "#F4F7FC")};
    }
  }
`;
export const ChartBox = styled.div`
  display: flex;
  flex: 1;
`;
