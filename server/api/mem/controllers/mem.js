"use strict";
const { sanitizeEntity, parseMultipartData } = require("strapi-utils");
const { isAdmin, addRankToUser } = require("../../../helpers");

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

    // Add 25 rank for creating a mem
    addRankToUser(ctx, 25);

    return sanitizeEntity(entity, { model: strapi.models.mem });
  },

  // Update - available for everyone
  async update(ctx) {
    const { id } = ctx.params;
    const user = ctx.state.user;

    let entity;

    // Validation, security
    if (ctx.request.body.isPublic === true && (!user || !isAdmin(ctx))) {
      return ctx.throw(401, "Access denied");
    } else if (!user || !isAdmin(ctx)) {
      const allowedProperties = ["likes", "dislikes", "isReported"];
      for (let prop in ctx.request.body) {
        if (!allowedProperties.includes(prop)) {
          return ctx.throw(401, "Access denied");
        }
      }
    } else if (ctx.is("multipart") && (!user || !isAdmin(ctx))) {
      return ctx.throw(401, "Access denied");
    }

    // Make an update
    if (ctx.is("multipart")) {
      const { data, files } = parseMultipartData(ctx);
      entity = await strapi.services.mem.update({ id }, data, {
        files,
      });
    } else {
      entity = await strapi.services.mem.update({ id }, ctx.request.body);
    }

    // Add 100 rank to the owner of the mem - if updates to public
    if (ctx?.request?.body?.isPublic) {
      if (user) {
        addRankToUser(ctx, 100, { updateUserId: entity.user.id });
      }
    }

    return sanitizeEntity(entity, { model: strapi.models.mem });
  },

  // Delete mem
  async delete(ctx) {
    const { id } = ctx.params;

    let entity;

    const [mem] = await strapi.services.mem.find({
      id,
    });

    if (mem.user.id !== ctx.state.user.id && !isAdmin(ctx)) {
      return ctx.throw(401, "Access denied");
    }

    // Delete comments
    await strapi.services.comment.delete({ "mem.id": id });

    // Delete image
    const file = await strapi.plugins["upload"].services.upload.fetch({
      id: mem.image.id,
    });
    await strapi.plugins["upload"].services.upload.remove(file);

    // Delete mem
    entity = await strapi.services.mem.delete({ id }, ctx.request.body);

    return sanitizeEntity(entity, { model: strapi.models.mem });
  },
};
