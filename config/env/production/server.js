module.exports = ({ env }) => ({
  url: env("URL"),
  admin: {
    auth: {
      secret: env("ADMIN_JWT_SECRET", "b79cb80a59bb288aca68cfaa805f9406"),
    },
  },
  cron: {
    enabled: env.bool("CRON_ENABLED", false),
  },
});
