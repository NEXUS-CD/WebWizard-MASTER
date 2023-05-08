// import { Application } from "egg";

export default (app) => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const auditLogsSchema = new Schema(
    {
      visitorIp: String,
      visitUrl: String,
      username: String,
      userId: String,
      logType: String,
      descible: String,
      searchCon: String,
    },
    {
      usePushEach: true,
      timestamps: { createdAt: "createTime", updatedAt: "updateTime" },
    }
  );
  return mongoose.model("auditLog", auditLogsSchema);
};
