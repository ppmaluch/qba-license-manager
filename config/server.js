module.exports = ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
  admin: {
    auth: {
      secret: env('ADMIN_JWT_SECRET', 'c7e607b7831ac74a7a9fb8045f566085'),
    },
  },
  cron: {
    enabled: env.bool('CRON_ENABLED', false),
  },
});
