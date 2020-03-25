import styled from "styled-components";
import { primary, textColor } from "../../../../globalStyle";
export const Container = styled.div``;

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
`;
export const Presentation = styled.div`
  h2 {
    font-weight: bold;
    font-size: 35px;
    width: 80%;
    border-bottom: 2px solid ${textColor};
  }
  h4 {
    font-weight: 200;
    margin-top: 10px;
  }
`;
export const PercentBox = styled.div`
  margin-top: 20px;
  padding: 10px;
  width: 120px;
  height: 120px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  border: 4px solid ${primary};
  text-align: center;
`;

export const Percent = styled.span`
  width: 100%;
  font-weight: bold;
  color: ${textColor};
  font-size: 20px;
`;

export const PercentText = styled.p``;

export const GraphContainer = styled.div``;

export const GraphBox = styled.div``
