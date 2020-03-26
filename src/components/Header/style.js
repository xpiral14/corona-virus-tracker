import styled from "styled-components";
import { textColor } from "../../globalStyle";

export const Container = styled.div`
  margin: 50px 0;
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-evenly;

`;

export const Information = styled.div`
  text-align: center;
  
  h2 {
    text-transform: uppercase;
    color: ${textColor};
  }
  p {
    font-size: 30px;
  }
`;
