import { Controller } from 'egg';
import * as jwt from "jsonwebtoken";

export default class HomeController extends Controller {
  async searchMsg() {
    const searchCon = this.ctx.query.searchCon;
    const authorization: any = this.ctx.header.authorization;
    const url = this.ctx.routerPath;
    const user: any = jwt.verify(authorization, this.ctx.app.config.tokenConfig.secret);
    const userMsg = await this.service.login.findOne({ username: user.username });
    // 更新用户查询次数
    if (userMsg.queried < userMsg.queries) {
      this.ctx.service.login.updatQueried(userMsg);
    } else {
      this.ctx.failure({ code: 10007 });
      return;
    }

    // 获取用户ip 写入查询日志
    let ip: any = '';
    const forwardedIpsStr: any = this.ctx.request.headers['x-forwarded-for'];//判断是否有反向代理头信息

    if (forwardedIpsStr) {//如果有，则将头信息中第一个地址拿出，该地址就是真实的客户端IP；
      var forwardedIps = forwardedIpsStr.split(',');
      ip = forwardedIps[0];
    }
    if (!ip) {//如果没有直接获取IP；
      ip = this.ctx.req.connection.remoteAddress;
    }

    this.service.auditLogs.createLogs({
      userId: userMsg._id,
      username: userMsg.username,
      logType: 'searchLog',
      descible: '查询情报数据',
      visitorIp: ip,
      visitUrl: url,
      searchCon,
    })

    const res = await this.service.search.searchMsg(searchCon);
    if (res.status_code === '2000') {
      this.ctx.success({
        data: res.data,
        msg: res.message,
      });
      return;
    }
    this.ctx.failure({
      data: res.data,
      msg: res.msg,
    });
  }

  async searchMore() {
    const res = await this.service.search.searchMore();
    this.ctx.success({
      data: res,
      msg: '查询成功',
    });
  }
}
