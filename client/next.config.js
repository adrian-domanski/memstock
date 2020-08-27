const withPWA = require("next-pwa");
const isDev = process.env.NODE_ENV === "development";

module.exports = withPWA({
  pwa: {
    dest: "public",
    disable: isDev,
  },
  env: {
    SERVER_URL: isDev ? "http://localhost:1337" : "https://api.memstock.pl",
    CLIENT_URL: isDev ? "http://localhost:3000" : "https://memstock.pl",
  },
});
