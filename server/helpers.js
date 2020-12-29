const isAdmin = (ctx) => {
  if (
    ctx?.state?.user?.role?.name !== "PageAdmin" &&
    ctx?.state?.user?.roles?.[0]?.name !== "Super Admin"
  ) {
    return false;
  }
  return true;
};

module.exports = {
  isAdmin,
};
