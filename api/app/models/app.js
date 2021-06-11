'use strict';
const slugify = require('slugify');
const replaceString = require('replace-string');

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#lifecycle-hooks)
 * to customize this model
 */

module.exports = {

    /**
     * Trigger before data creation
     */

    lifecycles: {
        async beforeCreate(data){
            if (data.app_id){
                let cleanAppId = replaceString(data.app_id, '.',' ');
                data.url = slugify(cleanAppId, {lower:true});
            }
        },

        async beforeUpdate(params, data){
            if (data.app_id){
                let cleanAppId = replaceString(data.app_id, '.',' ');
                data.url = slugify(cleanAppId, {lower:true});
            }
        },
    }
};
