const Sentry = require("@sentry/node");
const varenaBot = require("./varena-bot");
const vpgameBot = require("./vpgame-bot");

Sentry.init({
  dsn: "https://8e6edbc0786740d89edb7ab0b5be7e6b@sentry.io/1416869"
});
