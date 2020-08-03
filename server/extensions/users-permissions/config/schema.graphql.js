module.exports = {
  definition: `
    extend type UsersPermissionsMe {
      rank: String
      mems: [Mem]
      avatar: UploadFile
    }
  `,
};
