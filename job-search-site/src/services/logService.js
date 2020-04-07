
import * as Sentry from "@sentry/browser";

function init() {
  Sentry.init({
  
    dsn: "https://c8015a80e8484e1297f1e6c601ea56b3@sentry.io/5188826"
  });
}

function log(error) {
  Sentry.captureException(error);
  console.log(error);
}

// Interface of logService has two methods -- init and log
export default {
  init,
  log
};