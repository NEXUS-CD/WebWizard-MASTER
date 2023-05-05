import { Controller } from "egg";
import * as utility from "utility";
import * as moment from "moment";
import * as _ from "lodash";
import * as jwt from "jsonwebtoken";
import { userSchema } from "../validators/user";
/**
 * @controller HomeController
 */
export default class HomeController extends Controller {
  async regist() {
    const user = this.ctx.request.body;
    // 密码加密
    user.password = utility.md5(user.password, "base64");
    // 判断当前用户名是否存在
    const findUser = await this.ctx.model.Users.find({
      username: user.username,
    });
    if (findUser.length) {
      this.ctx.failure({ code: 10003 });
    } else {
      await this.service.login.regist(user);
      this.ctx.success({ msg: "注册成功" });
    }
  }

  /**
   * @router post /api/login 路径
   * @summary 登录
   * @description 使用用户名和密码进行登录
   * @request body string username 用户名
   * @request body string password 密码
   * @response 200 loginJsonBody
   */
  async login() {
    const { ctx, app } = this;
    const user = ctx.request.body;
    // 校验参数
    if (! await userSchema.triggerValidation(ctx, user)) return
    // 密码加密
    user.password = utility.md5(user.password, "base64");

    const userMsg = await this.service.login.findOne({
      username: user.username,
    });
    if (userMsg) {
      // 判断用户账号 永久有效 或者在有效期内
      if (
        userMsg.expire === -1 ||
        moment(userMsg.createTime).valueOf() +
          userMsg.expire * 24 * 60 * 60 * 1000 >
          moment(new Date()).valueOf()
      ) {
        // 用户存在 且密码正确 登陆成功
        if (userMsg.password === user.password) {
          // 生成token
          const authorization = jwt.sign(
            {
              username: user.username,
              password: user.password,
            },
            app.config.tokenConfig.secret,
            {
              expiresIn: 60 * 60 * 2,
            }
          );
          ctx.success({
            msg: "登陆成功",
            data: {
              userMsg: _.omit(userMsg.toObject(), "password"),
              authorization,
            },
          });
          return;
        }
      } else {
        ctx.success({ code: 10008 });
        return;
      }
    }
    ctx.failure({ code: 10001 });
  }

  // 判断用户当前是否登录
  async isLogin() {
    const authorization: any = this.ctx.header.authorization;
    // 判断用户当前是否登录
    if (authorization) {
      this.ctx.status = 200;
      try {
        const user: any = jwt.verify(
          authorization,
          this.ctx.app.config.tokenConfig.secret
        );
        const userMsg = await this.service.login.findOne({
          username: user.username,
        });
        if (userMsg) {
          if (
            userMsg.expire === -1 ||
            moment(userMsg.createTime).valueOf() +
              userMsg.expire * 24 * 60 * 60 * 1000 >
              moment(new Date()).valueOf()
          ) {
            this.ctx.success({
              msg: "登陆中",
              data: { isLogining: "logining", _id: userMsg._id },
            });
            return;
          } else {
            this.ctx.success({ data: { isLogining: "AccountOverDue" } });
            return;
          }
        } else {
          this.ctx.success({ data: { isLogining: "userNotExist" } });
          return;
        }
      } catch (error) {
        this.ctx.success({ data: { isLogining: "jwtOverDue" } });
        return;
      }
    }
    this.ctx.success({ data: { isLogining: "nothingness" } });
  }

  // 获取一个用户信息
  async getUser() {
    const params = this.ctx.request.query;
    const res = await this.service.login.findOne(params);
    if (res) {
      this.ctx.success({
        msg: "查找成功",
        data: _.omit(res.toObject(), "password"),
      });
      return;
    }
    this.ctx.failure({ code: 10002 });
  }

  // 修改用户密码
  async updateUserPwd() {
    const user = this.ctx.request.body;
    user.password = utility.md5(user.password, "base64");
    user.newPassword = utility.md5(user.newPassword, "base64");

    const userOne: any = await this.service.login.findOne({
      username: user.username,
    });
    if (userOne) {
      if (userOne.password === user.password) {
        const res = await this.service.login.update(user);
        if (res.ok) {
          this.ctx.success({
            msg: "修改密码成功！",
            data: {},
          });
        }
      } else {
        this.ctx.failure({ code: 10001 });
      }
    } else {
      this.ctx.failure({ code: 10001 });
    }
  }
}
