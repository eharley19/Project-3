const axios = require("axios");
// const db = require("../models");

module.exports = {
  findAll: function (req, res) {
    const params = {
      where: req.query.where,
      what: req.query.what,
    };
    const adzunaURL = `https://api.adzuna.com/v1/api/jobs/us/search/1?app_id=54a82cb9&app_key=f7f63d6d48e6d7266572736fb858dc10&results_per_page=5`;

    axios
      .get(adzunaURL, {
        params,
      })
      // .then((response) => {
      //   response.data.results.filter(
      //     (result) => result.id
      // result.contract_time &&
      // result.company.display_name &&
      // result.description &&
      // result.title &&
      // result.location.display_name;
      //   );
      // })
      .then((response) => res.json(response.data.results))
      .catch((err) => res.status(422).json(err));
  },
};
