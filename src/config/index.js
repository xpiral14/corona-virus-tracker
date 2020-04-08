const config = {
  rapidApi: {
    apiKey: "6361f46cfbmsh9a37d3f8bde97a2p115d2ejsnfe349b24f61e",
    apiHost: "coronavirus-monitor.p.rapidapi.com"
  },
  urls: {
    affectedCountries:
      "/coronavirus/affected.php",
    historyByParticularCountry: country =>
      `/coronavirus/cases_by_particular_country.php?country=${country}`,
    casesByCountry: `/coronavirus/cases_by_country.php`,
    latestStateByCountry: country =>
      `/coronavirus/latest_stat_by_country.php?country=${country}`,
    worldTotalState:
      "/coronavirus/worldstat.php"
  }
};

export default config;
