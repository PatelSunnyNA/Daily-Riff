'use strict';

/**
 * daily-exercise service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::daily-exercise.daily-exercise');
