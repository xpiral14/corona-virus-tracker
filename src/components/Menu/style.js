import styled from "styled-components";
import { primary, textColor } from "../../globalStyle";
import { Link } from "react-router-dom";
import media from "styled-media-query";

export const Container = styled.div`
  margin-top: 20px;
  padding: 0 20px;
`;
export const MenuContainer = styled.div`
  display: flex;

  ${media.lessThan("medium")`
    flex-direction: column;
  `}
`;

export const MenuItem = styled(Link)`
  text-decoration: none;
  margin-right: 20px;
  padding: 10px;
  color: ${textColor};
  border-radius: 5px;
  background: ${primary};

  ${media.lessThan("medium")`
    margin-bottom: 2rem;
  `}
`;
