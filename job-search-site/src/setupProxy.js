const proxy = require("http-proxy-middleware");

module.exports = function(app) {
  app.use(
    proxy(["/api", , "/otherApi"], { target: "https://job-search-hei.herokuapp.com" ,   router: {
        'localhost:3000': 'http://localhost:6000'
        }})
  );


};