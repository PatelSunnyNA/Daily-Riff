'use strict';

/**
 * daily-song service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::daily-song.daily-song');
