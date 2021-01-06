module.exports = {
  definition: `
    extend type UsersPermissionsMe {
      rank: String
      mems: [Mem]
      avatar: UploadFile
      provider: String
    }
  `,

  query: `
    countUsers(where: JSON): Int!
  `,
  resolver: {
    Query: {
      countUsers: {
        description: "Return the count of users",
        resolverOf: "plugins::users-permissions.user.count",
        resolver: async (obj, options, ctx) => {
          return await strapi
            .query("user", "users-permissions")
            .count(options.where || {});
        },
      },
    },
  },
};
