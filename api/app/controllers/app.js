'use strict';
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
     * Get all apps that belongs only to me
     *
     * @returns {Array}
     */

      async find(ctx) {
        let entities;
        if (ctx.query._q) {
          entities = await strapi.services.app.search(ctx.query);
        } else {
          entities = await strapi.services.app.find(ctx.query);
        }

        return entities.map(entity => sanitizeEntity(entity,{model: strapi.models.app}))
                       .filter(app => app.owner.id == ctx.state.user.id);
      },

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
    },

    /**
     * Update a record only if you are the owner
     *
     * @returns {Object}
     */

    async update(ctx){
        const {id} = ctx.params;

        let entity;

        const[app] = await strapi.services.app.find({
            id : ctx.params.id,
            'owner.id': ctx.state.user.id
        });

        if (!app){
            return ctx.unauthorized(`No puedes actualizar un objeto que no haya sido creado por ti`);
        }

        entity = await strapi.services.app.update({id}, ctx.request.body);

        return sanitizeEntity(entity,{model: strapi.models.app});
    },

    async delete(ctx){
        const{id} = ctx.params;

        let entity;

        const[app] = await strapi.services.app.find({
            id: ctx.params.id,
            'owner.id': ctx.state.user.id
        });

        if (!app){
            return ctx.unauthorized(`No puedes eliminar un objeto que no haya sido creado por ti`);
        }

        entity = await strapi.services.app.delete({id});

        return sanitizeEntity(entity,{model: strapi.models.app});
    }
};
