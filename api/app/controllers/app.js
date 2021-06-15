'use strict';
const {sanitizeEntity} = require("strapi-utils");

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {


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
     * Get an app only if it belongs to me
     *
     * @returns {Array}
     */

    async findOne(ctx){
        const {url} = ctx.params;
        const entity = await strapi.services.app.findOne({url});
        if (entity != null && (entity.owner.id != ctx.state.user.id)){
            return ctx.unauthorized(`Solo se pueden solicitar apps creadas por ti`);
        }
        return sanitizeEntity(entity, {model: strapi.models.app})
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

        let entity;

        const[app] = await strapi.services.app.find({
            'url' : ctx.params.id,
            'owner.id': ctx.state.user.id
        });

        if (!app){
            return ctx.unauthorized(`No puedes actualizar un objeto que no haya sido creado por ti`);
        }

        entity = await strapi.services.app.update({'id': app.id}, ctx.request.body);

        return sanitizeEntity(entity,{model: strapi.models.app});
    },

    /**
     * Delete a record only if you are the owner
     *
     * @returns {Object}
     */

    async delete(ctx){


        let entity;

        const[app] = await strapi.services.app.find({
            'url': ctx.params.id,
            'owner.id': ctx.state.user.id
        });

        if (!app){
            return ctx.unauthorized(`No puedes eliminar un objeto que no haya sido creado por ti`);
        }

        entity = await strapi.services.app.delete({'id': app.id});

        return sanitizeEntity(entity,{model: strapi.models.app});
    }
};
