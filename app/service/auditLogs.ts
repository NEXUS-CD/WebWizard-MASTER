import { Service } from "egg";

interface InterLogMsg {
  visitorIp: String;
  visitUrl: String;
  username: String;
  userId: String;
  logType: String;
  descible: String;
  searchCon: String;
}

export default class AuditLogs extends Service {
  /**
   * 注册
   * @param user - 用户信息
   */
  async createLogs(logMsg: InterLogMsg) {
    const res = await this.ctx.model.AuditLogs.create(logMsg);
    return res;
  }
}
