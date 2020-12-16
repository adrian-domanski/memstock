const withPWA = require("next-pwa");
const isDev = process.env.NODE_ENV === "development";

module.exports = withPWA({
  pwa: {
    dest: "public",
    disable: isDev,
  },
  env: {
    isDev,
    SERVER_URL: isDev ? "http://localhost:5010" : "https://api.memstock.pl",
    CLIENT_URL: isDev ? "http://localhost:3000" : "https://memstock.pl",
  },
});
