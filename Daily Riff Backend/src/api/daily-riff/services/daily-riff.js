'use strict';

/**
 * daily-riff service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::daily-riff.daily-riff');
