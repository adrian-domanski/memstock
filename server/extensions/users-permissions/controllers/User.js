"use strict";

/**
 * User.js controller
 *
 * @description: A set of functions called "actions" for managing `User`.
 */

const { sanitizeEntity } = require("strapi-utils");

const sanitizeUser = (user) =>
  sanitizeEntity(user, {
    model: strapi.query("user", "users-permissions").model,
  });

module.exports = {
  /**
   * Retrieve authenticated user.
   * @return {Object|Array}
   */
  async me(ctx) {
    const user = ctx.state.user;

    if (!user) {
      return ctx.badRequest(null, [
        { messages: [{ id: "No authorization header was found" }] },
      ]);
    }

    const myUser = await strapi
      .query("user", "users-permissions")
      .findOne({ _id: user.id });

    const extendedUser = { ...user, mems: myUser.mems };

    ctx.body = sanitizeUser(extendedUser);
  },

  // Update
  async update(ctx) {
    const { id } = ctx.params;

    if (ctx.state.user.id !== id) {
      return ctx.throw(401, "Access denied");
    }

    const updatedUser = await strapi
      .query("user", "users-permissions")
      .update({ id }, ctx.request.body);

    // Remove old avatar if update occured
    if (ctx.request.body.avatar && user.avatar) {
      const file = await strapi.plugins["upload"].services.upload.fetch({
        id: user.avatar.id,
      });
      await strapi.plugins["upload"].services.upload.remove(file);
    }

    ctx.body = sanitizeUser(updatedUser);
  },
};
