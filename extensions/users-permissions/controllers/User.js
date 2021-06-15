const { sanitizeEntity } = require('strapi-utils');
const sanitizeUser = user => sanitizeEntity(user, {
  model: strapi.query('user', 'users-permissions').model,
});

module.exports = {
    /**
  * Retrieve authenticated user and fetch its first related model (no deep models).
  * @return {Object|Array}
  */
async me(ctx) {
    const user = ctx.state.user;

    if (!user) {
      return ctx.badRequest(null, [{ messages: [{ id: 'No authorization header was found' }] }]);
    }

    let data = await strapi.plugins['users-permissions'].services.user.fetch({
      id: user.id,
    });

    if (data) {
      data = sanitizeUser(data);
    }

    ctx.send(data);
  },
}