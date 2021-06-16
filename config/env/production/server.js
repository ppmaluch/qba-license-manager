module.exports = ({ env }) => ({
  url: env('URL'),
  admin: {
    auth: {
      secret: env('ADMIN_JWT_SECRET'),
    },
  },
});