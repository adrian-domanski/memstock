module.exports = ({ env }) => ({
  host: env("HOST", "0.0.0.0"),
  port: env.int("PORT", 1337),
  url: env("SERVER_URL"),
  admin: {
    auth: {
      secret: env("ADMIN_JWT_SECRET", "1927111215d8d32a7e861282ec163b77"),
    },
  },
});
