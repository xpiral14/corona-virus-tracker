const config = {
  rapidApi: {
    apiKey: "6361f46cfbmsh9a37d3f8bde97a2p115d2ejsnfe349b24f61e",
    apiHost: "coronavirus-monitor.p.rapidapi.com"
  },
  urls: {
    affectedCountries:
      "https://coronavirus-monitor.p.rapidapi.com/coronavirus/affected.php",
    historyByParticularCountry: country =>
      `https://coronavirus-monitor.p.rapidapi.com/coronavirus/cases_by_particular_country.php?country=${country}`,
    casesByCountry: `https://coronavirus-monitor.p.rapidapi.com/coronavirus/cases_by_country.php`,
    latestStateByCountry: country =>
      `https://coronavirus-monitor.p.rapidapi.com/coronavirus/latest_stat_by_country.php?country=${country}`,
    worldTotalState:
      "https://coronavirus-monitor.p.rapidapi.com/coronavirus/worldstat.php"
  }
};

export default config;
