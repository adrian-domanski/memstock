module.exports = {
  query: `
    countMems(where: JSON): Int!
  `,
  resolver: {
    Query: {
      countMems: {
        description: "Return the count of mems",
        resolverOf: "application::mem.mem.count",
        resolver: async (obj, options, ctx) => {
          return await strapi.api.mem.services.mem.count(options.where || {});
        },
      },
    },
  },
};
