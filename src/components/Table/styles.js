import styled from "styled-components";
import { darken } from "polished";

export const Table = styled.table`
  border-collapse: collapse;
  border-radius: 5px;
  font-family: Arial, Helvetica, sans-serif;
  width: ${props => props.width};
  background: #fff;
  tr:nth-child(even){
  background: #F4F7FC;
  }
`;

export const TableHeader = styled.tr`
background-color: #F4F7FC;
`;

export const TableHeaderColumn = styled.td`
  width: 16.6%;
  color: #606F89;
  text-transform: uppercase;
  font-size: 13px;
  font-weight: bold;
  padding: 15px 25px 5px 25px;
  cursor: pointer;
  transition: background 0.3s;
  &:hover {
    background: ${darken(0.1, "#F4F7FC")};
  }
`;
export const Row = styled.tr`
  color: #2E3B52;
`;

export const Column = styled.td`
  text-align: center;
  padding: 20px 5px;
`;
