import styled from "styled-components";
import { textColor } from "../../globalStyle";
export const CountrySelectContainer = styled.div``;

export const ChartContainer = styled.div``;

export const Container = styled.div`
  margin-top: 20px;
  padding: 0 20px;

  display: grid;

  grid-template-columns: 0.2fr 0.8fr;
  grid-column-gap: 20px;
`;

export const SearchCountry = styled.div`
  input {
    width: 100%;
    margin-bottom: 20px;
    padding: 5px;
    border-radius: 5px;
    border: none;
  }
`;

export const Countries = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    width: 7px;
  }
  &::-webkit-scrollbar-thumb {
    background: ${textColor};
    border-radius: 5px;
  }
  max-height: 100vh;
`;

export const Country = styled.button`
  flex: 1;
  border: 1px solid ${textColor};
  background: none;
  cursor: pointer;
  background: ${({ active }) => (active ? textColor : "none")};
  color: ${({ active }) => (active ? "#fff" : textColor)};
  margin-bottom: 10px;
  padding: 5px;
  font-weight: bold;
  border-radius: 5px;
`;

export const LoadingContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;