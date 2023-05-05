import { Context } from "egg";
import * as jwt from "jsonwebtoken";

export default () => async (ctx: Context, next) => {
  const whiteUrl = [
    "/api/regist",
    "/api/login",
    "/api/isLogining",
    "/swagger-ui.html",
    "/swagger-doc",
    "/swagger-ui.css",
    "/swagger-ui-bundle.js",
    "/swagger-ui-standalone-preset.js"
  ];
  if (!whiteUrl.includes(ctx.request.url)) {
    // 判断jwt
    const authorization: any = ctx.request.header.authorization;
    if (authorization) {
      try {
        jwt.verify(authorization, ctx.app.config.tokenConfig.secret);
      } catch (error) {
        ctx.status = 200;
        ctx.body = {
          code: 403,
          msg: "请先登录！",
          data: {},
        };
        return;
      }
    } else {
      ctx.status = 200;
      ctx.body = {
        code: 401,
        msg: "请先登录",
        data: {},
      };
      return;
    }
  }

  await next();
  return true;
};
