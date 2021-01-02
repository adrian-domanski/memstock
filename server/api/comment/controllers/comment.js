const { sanitizeEntity } = require("strapi-utils");
const { isAdmin, addRankToUser } = require("../../../helpers");

module.exports = {
  /**
   * Delete a comment.
   *
   * @return {Object}
   */

  async delete(ctx) {
    const { id } = ctx.params;

    const [comment] = await strapi.services.comment.find({
      id,
    });

    if (comment.user.id !== ctx.state.user.id && !isAdmin(ctx)) {
      return ctx.throw(401, "Access denied");
    }

    const entity = await strapi.services.comment.delete({ id });
    return sanitizeEntity(entity, { model: strapi.models.comment });
  },

  /**
   * Create a comment
   *
   * @return {Object}
   */

  async create(ctx) {
    let entity;
    if (ctx.is("multipart")) {
      const { data, files } = parseMultipartData(ctx);
      entity = await strapi.services.comment.create(data, { files });
    } else {
      entity = await strapi.services.comment.create(ctx.request.body);
    }

    // Add 10 points to rank
    addRankToUser(ctx, 10);

    return sanitizeEntity(entity, { model: strapi.models.comment });
  },
};
