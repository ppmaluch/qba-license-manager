'use strict';
const { default: createStrapi } = require("strapi");
const {sanitizeEntity} = require("strapi-utils");

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {
    // async findOneUrl(ctx){
    //     const {url} = ctx.params;
    //     const entity = await strapi.services.app.findOne({url});
    //     return sanitizeEntity(entity, {model: strapi.models.app});
    // },

    /**
     * Create a record with authenticated user id by default
     *
     * @returns {Object}
     */

    async create(ctx){
        let entity;
        ctx.request.body.owner = ctx.state.user.id;
        entity = await strapi.services.app.create(ctx.request.body);

        return sanitizeEntity(entity, {model: strapi.models.app});
    }


};
