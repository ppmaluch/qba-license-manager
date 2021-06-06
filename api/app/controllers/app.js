'use strict';
const {sanitizeEntity} = require("strapi-utils");

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {
    async findOneUrl(ctx){
        const {url} = ctx.params;
        const entity = await strapi.services.app.findOne({url});
        return sanitizeEntity(entity, {model: strapi.models.app});
    }
};
