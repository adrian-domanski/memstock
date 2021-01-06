"use strict";

/**
 * User.js controller
 *
 * @description: A set of functions called "actions" for managing `User`.
 */

const { sanitizeEntity } = require("strapi-utils");
const { isAdmin } = require("../../../helpers");

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

    const extendedUser = {
      ...user,
      mems: myUser.mems,
    };

    ctx.body = sanitizeUser(extendedUser);
  },

  // Update
  async update(ctx) {
    const { id } = ctx.params;
    const possibleUpdates = ["username", "avatar"];

    if (!isAdmin(ctx)) {
      for (const prop in ctx.request.body) {
        if (!possibleUpdates.includes(prop)) {
          return ctx.throw(
            401,
            "Access denied - can't update these properties"
          );
        }
      }
    }

    if (ctx.state.user.id !== id && !isAdmin(ctx)) {
      return ctx.throw(401, "Access denied - can't access someone else's data");
    }

    const updatedUser = await strapi
      .query("user", "users-permissions")
      .update({ id }, ctx.request.body);

    // Remove old avatar if update occured
    if (ctx.request.body.avatar && ctx.state.user.avatar) {
      const file = await strapi.plugins["upload"].services.upload.fetch({
        id: ctx.state.user.avatar.id,
      });
      await strapi.plugins["upload"].services.upload.remove(file);
    }

    ctx.body = sanitizeUser(updatedUser);
  },
};
