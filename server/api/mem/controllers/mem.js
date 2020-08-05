"use strict";
const { sanitizeEntity, parseMultipartData } = require("strapi-utils");

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  // Create
  async create(ctx) {
    let entity;
    if (ctx.is("multipart")) {
      const { data, files } = parseMultipartData(ctx);
      data.user = ctx.state.user.id;
      entity = await strapi.services.mem.create(data, { files });
    } else {
      ctx.request.body.user = ctx.state.user.id;
      entity = await strapi.services.mem.create(ctx.request.body);
    }
    return sanitizeEntity(entity, { model: strapi.models.mem });
  },

  // Update
  async update(ctx) {
    const { id } = ctx.params;

    let entity;

    const [mem] = await strapi.services.mem.find({
      id: ctx.params.id,
    });

    if (
      ctx.request.body.isPublic === true &&
      ctx.state.user.role.name !== "PageAdmin"
    ) {
      return ctx.throw(401, "Access denied");
    } else if (
      mem.user.id !== ctx.state.user.id &&
      ctx.state.user.role.name !== "PageAdmin"
    ) {
      return ctx.throw(401, "Access denied");
    }

    if (ctx.is("multipart")) {
      const { data, files } = parseMultipartData(ctx);
      entity = await strapi.services.mem.update({ id }, data, {
        files,
      });
    } else {
      entity = await strapi.services.mem.update({ id }, ctx.request.body);
    }

    return sanitizeEntity(entity, { model: strapi.models.mem });
  },

  // Delete
  async delete(ctx) {
    const { id } = ctx.params;

    let entity;

    const [mem] = await strapi.services.mem.find({
      id: ctx.params.id,
    });

    if (
      mem.user.id !== ctx.state.user.id &&
      ctx.state.user.role.name !== "PageAdmin"
    ) {
      return ctx.throw(401, "Access denied");
    }

    // Delete mem
    entity = await strapi.services.mem.delete({ id }, ctx.request.body);

    // Delete image
    const file = await strapi.plugins["upload"].services.upload.fetch({
      id: mem.image.id,
    });
    await strapi.plugins["upload"].services.upload.remove(file);

    return sanitizeEntity(entity, { model: strapi.models.mem });
  },
};
