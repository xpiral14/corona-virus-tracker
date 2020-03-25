import React from "react";
import GlobalStyle from "./globalStyle";
import CountryState from "./Pages/CountryState";
import Title from "./components/Title";
import Menu from "./components/Menu";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import CountryComparation from "./Pages/CountryComparation";

function App() {
  return (
      <Router>
        <GlobalStyle />
        <Title />
        <Menu />
        <Switch>
          <Route path="/" exact>
            <CountryState />
          </Route>
          <Route path="/comparacao">
            <CountryComparation />
          </Route>
        </Switch>
      </Router>
  );
}

export default App;
