import styled from "styled-components";
import { primary, textColor } from "../../globalStyle";
import { Link } from "react-router-dom";

export const Container = styled.div`
  margin-top: 20px;
  padding: 0 20px;
`;
export const MenuContainer = styled.div`
`;

export const MenuItem = styled(Link)`
  text-decoration: none;
  margin-right: 20px;
  padding: 10px;
  color: ${textColor};
  border-radius: 5px;
  background: ${primary};
`;
