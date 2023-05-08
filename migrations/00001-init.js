module.exports = {
  async up(db) {
    const now = new Date();
    await db.collection("users").insertMany([
      {
        username: "admin",
        password: "YsitChXZ0co41d7nYqFuAQ==",
        expire: -1,
        group: ["user"],
        createTime: now,
        updateTime: now,
      },
    ]);
  },

  async down(db) {
    await db.collection("users").deleteMany({ username: "admin" });
  },
};
