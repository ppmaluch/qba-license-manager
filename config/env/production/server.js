module.exports = ({ env }) => ({
  url: env("URL"),
  admin: {
    auth: {
      secret: env("ADMIN_JWT_SECRET"),
    },
  },
  cron: {
    enabled: env.bool("CRON_ENABLED", false),
  },
});
