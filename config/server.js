module.exports = ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
  admin: {
    auth: {
      secret: env('ADMIN_JWT_SECRET', 'b79cb80a59bb288aca68cfaa805f9406'),
    },
  },
  cron: {
    enabled: env.bool('CRON_ENABLED', false),
  },
});
