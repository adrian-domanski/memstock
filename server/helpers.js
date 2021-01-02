const isAdmin = (ctx) => {
  if (
    ctx?.state?.user?.role?.name !== "PageAdmin" &&
    ctx?.state?.user?.roles?.[0]?.name !== "Super Admin"
  ) {
    return false;
  }
  return true;
};

const addRankToUser = async (ctx, amountOfRankToAdd, options) => {
  if (!ctx?.state?.user) {
    return ctx.throw(401, "Access denied - can't access user from ctx");
  }

  const userId = options?.updateUserId ?? ctx.state.user.id;

  const userToUpdateRank = await strapi
    .query("user", "users-permissions")
    .findOne({ id: userId });

  await strapi
    .query("user", "users-permissions")
    .update(
      { id: userId },
      { rank: userToUpdateRank.rank + amountOfRankToAdd }
    );
};

module.exports = {
  isAdmin,
  addRankToUser,
};
