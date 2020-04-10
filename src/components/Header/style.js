import styled from "styled-components";
import { textColor } from "../../globalStyle";
import media from "styled-media-query";

export const Container = styled.div`
  margin: 50px 0;
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-evenly;
  ${media.lessThan("medium")`
    flex-direction: column;
  `};
`;

export const Information = styled.div`
  text-align: center;

  h2 {
    text-transform: uppercase;
    color: ${textColor};
    font-weight: bold;
  }
  p {
    font-size: 30px;
  }

  @media screen and (max-width: 768px) {
    margin-bottom: 2rem;
    h2 {
      font-size: 2rem;
    }
  }
`;
