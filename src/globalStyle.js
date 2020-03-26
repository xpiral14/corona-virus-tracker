import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  *{
    box-sizing: border-box;
    padding: 0;
    margin: 0;
    font-family: "Nunito";
    outline: 0;
  }
  body {
   background: #fff;
  }
  h2{
   font-family: "Nunito", Arial

  }
  .recharts-cartesian-axis-tick {    
    font-size: 12px;
    font-family: "Nunito", sans-serif;
}
`

export const primary = "#F4F7FC"
export const textColor = "#2E3B52"

export default GlobalStyle