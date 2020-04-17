import React from "react";
import GlobalStyle from "./globalStyle";
import CountryState from "./Pages/CountryState";
import Title from "./components/Title";
import Menu from "./components/Menu";
import { Router, Switch, Route } from "react-router-dom";
import CountryComparation from "./Pages/CountryComparation";
import history from "./config/history";
import CountryInfo from "./Pages/CountryInfo";

function App() {
  return (
    <Router history={history}>
      <GlobalStyle />
      <Title />
      <Menu />
      <Switch>
        <Route path="/" exact component={CountryState} />
        <Route path="/info/:country" exact component={CountryInfo} />
        <Route path="/comparacao" component={CountryComparation} />
      </Switch>
    </Router>
  );
}

export default App;
