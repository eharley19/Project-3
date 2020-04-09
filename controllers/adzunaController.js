const axios = require("axios");
require("dotenv").config();
const keys = require("../keys");
module.exports = {
  findAll: function (req, res) {
    const params = {
      where: req.query.where,
      what: req.query.what,
    };
    const adzunaURL = `https://api.adzuna.com/v1/api/jobs/us/search/1?app_id=${keys.adzunaId}&app_key=${keys.adzunaKey}&results_per_page=5`;
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
