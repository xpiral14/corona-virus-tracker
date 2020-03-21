import styled from "styled-components";
import { darken } from "polished";

let tdWidth;
export const Table = styled.table`
  border-collapse: collapse;
  background: #353738;
  border-radius: 5px;
  font-family: Arial, Helvetica, sans-serif;
  width: ${props => props.width};
`;

export const TableHeader = styled.tr``;

export const TableHeaderColumn = styled.td`
  max-width: 80px;
  width: 100%;
  color: #cecece;
  text-transform: uppercase;
  font-size: 13px;
  font-weight: bold;
  padding: 15px 25px 5px 25px;
  border-bottom: 1px solid #212121;
  cursor: pointer;
  transition: background 0.3s;
  &:hover {
    background: ${darken(0.1, "#353738")};
  }
`;
export const Row = styled.tr`
  color: #e3e3e3;
`;

export const Column = styled.td`
  text-align: center;
  padding: 20px 5px;
  border-bottom: 1px solid #21212170;
`;
