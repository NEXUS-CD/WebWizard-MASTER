import { Service } from "egg";
import * as _ from "lodash";
/**
 * Test Service
 */
export default class Login extends Service {
  /**
   * 注册
   * @param user - 用户信息
   */
  async regist(user) {
    const res = await this.ctx.model.Users.create({ ...user });
    return res;
  }

  // 获取用户信息
  async findOne(params: any) {
    const res = await this.ctx.model.Users.find({ ...params });
    return res[0];
  }

  // 修改用户密码
  async update(user: {
    username: string;
    password: string;
    newPassword: string;
  }) {
    const res = await this.ctx.model.Users.updateOne(
      { username: user.username },
      { password: user.newPassword }
    );
    return res;
  }

  // 修改用户查询次数
  async updatQueried(user: any) {
    const res = await this.ctx.model.Users.updateOne(
      { _id: user._id },
      { queried: user.queried + 1 }
    );
    return res;
  }
}
