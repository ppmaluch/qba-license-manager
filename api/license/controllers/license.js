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
          entities = await strapi.services.license.search(ctx.query);
        } else {
          entities = await strapi.services.license.find(ctx.query);
        }

        console.log(ctx.state.user.id);

        return entities.map(entity => sanitizeEntity(entity,{model: strapi.models.license}))
                       .filter(license => license.app.owner == ctx.state.user.id);
      },

    /**
     * Create a record if the user if owner of the licensed app
     *
     * @returns {Object}
     */

     async create(ctx){
        let app_id = ctx.request.body.app;
        let entity;

        const[app] = await strapi.services.app.find({
            id : app_id,
            'owner.id': ctx.state.user.id
        });

        if (!app){
            return ctx.unauthorized(`No puedes crear una licencia de una app que no fue creada por ti`);
        }

        entity = await strapi.services.license.create(ctx.request.body);


        return sanitizeEntity(entity,{model: strapi.models.license});
    },

    /**
     * Update a record only if you are the owner
     *
     * @returns {Object}
     */

     async update(ctx){
        const {id} = ctx.params;

        let entity;

        const[license] = await strapi.services.license.find({
            id : ctx.params.id,
            'app.owner': ctx.state.user.id
        });

        if (!license){
            return ctx.unauthorized(`No puedes actualizar una licencia de una app que no fue creada por ti`);
        }

        entity = await strapi.services.license.update({id}, ctx.request.body);

        return sanitizeEntity(entity,{model: strapi.models.license});
    },

    async delete(ctx){
        const{id} = ctx.params;

        let entity;

        const[license] = await strapi.services.license.find({
            id : ctx.params.id,
            'app.owner': ctx.state.user.id
        });

        if (!license){
            return ctx.unauthorized(`No puedes eliminar una licencia de una app que no fue creada por ti`);
        }

        entity = await strapi.services.license.delete({id});

        return sanitizeEntity(entity,{model: strapi.models.license});
    }


};
