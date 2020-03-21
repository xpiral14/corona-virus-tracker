import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  *{
    box-sizing: border-box;
    padding: 0;
    margin: 0;
  }
  body {
   background: #e3e3e3;
   overflow-y: hidden;
  }
  h2{
   font-family: "Nunito", Arial

  }
  .recharts-cartesian-axis-tick {    
    font-size: 12px;
    font-family: "Nunito", sans-serif;
}
`

export const primary = "#3C506F"
export const textColor = "#e3e3e3"

export default GlobalStyle