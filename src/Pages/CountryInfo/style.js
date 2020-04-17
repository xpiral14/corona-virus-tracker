import styled from "styled-components";
import { textColor } from "../../globalStyle";
export const Container = styled.div`
  /* display: flex;
  flex-direction: column; */
  padding: 20px;
`;

export const OverView = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  padding: 5px 5px 20px 5px;
  border-bottom: 1px solid ${textColor}40;
  overflow-y: scroll;
  max-height: 600px;
  &::-webkit-scrollbar-thumb {
    background-color: ${textColor};
    border-radius: 7px;
  }
  &::-webkit-scrollbar {
    width: 7px;
  }
  @media screen and (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;
export const Presentation = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  h2 {
    font-weight: bold;
    font-size: 50px;
  }
  h4 {
    font-weight: 200;
    margin-top: 10px;
  }
  a {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border: 1px solid black;
    padding: 5px;
    color: ${textColor};
    transition: 0.3s;
    border-radius: 5px;

    :hover {
      box-shadow: 0 5px 7px #00000020;
      background: ${textColor};
      color: white;
    }
  }
`;
export const PercentBox = styled.div`
  margin-top: 20px;
  padding: 10px;
  width: 120px;
  span {
    font-size: 50px;
    color: ${(p) => p.bg};
  }
  p {
    color: ${textColor};
  }
  display: flex;
  flex-direction: column;
  text-align: center;
`;

export const Percent = styled.span`
  width: 100%;
  font-weight: bold;
  color: ${textColor};
  font-size: 20px;
`;

export const PercentText = styled.p``;

export const GraphContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);

  grid-gap: 30px;
  @media screen and (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const GraphBox = styled.div`
  display: flex;
  position: relative;
  flex-direction: column-reverse;
  height: 200px;
  box-shadow: 0 5px 7px #21212110;
  @media screen and (max-width: 768px) {
    height: 200px;

    width: 100%;
  }
`;

export const Title = styled.div`
  z-index: 99;
  width: 100%;
  position: absolute;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  top: 20px;
  h4 {
    font-size: 14px;
  }
  span {
    font-size: 16px;
  }
`;
