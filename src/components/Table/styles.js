import styled from "styled-components";
import { darken } from "polished";

export const Table = styled.table`
  border-collapse: collapse;

  font-family: Arial, Helvetica, sans-serif;
  width: ${props => props.width};
  background: #fff;
  tr:nth-child(even) {
    background: #f4f7fc;
  }
  tbody tr td:nth-child(1) {
    background: ${darken(0.01, "#F4F7FC")};
    cursor: pointer;
    &:hover {
      background: ${darken(0.03, "#F4F7FC")};
    }
  }
`;

export const TableHeader = styled.tr`
  background-color: #f4f7fc;
`;

export const TableHeaderColumn = styled.td`
  
  width: 16.6%;
  color: #606f89;
  text-transform: uppercase;
  font-size: 13px;
  font-weight: bold;
  padding: 15px 25px 5px 25px;
  cursor: pointer;
  transition: background 0.3s;
  &:first-child{
    border-radius: 5px 0 0 0;
  }
  &:last-child {
    border-radius: 0 5px 0 0;

  }
  &:hover {
    background: ${darken(0.1, "#F4F7FC")};
  }
`;
export const Row = styled.tr`
  color: #2e3b52;
`;

export const Column = styled.td`
  text-align: center;
  padding: 20px 5px;
`;
