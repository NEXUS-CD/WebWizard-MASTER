export default class Validate {
  async triggerValidation(ctx, params) {
    try {
      await this.yub.validate(params);
      // 数据验证通过，执行下一步操作
    } catch (err: any) {
      // 数据验证失败，处理错误信息
      ctx.status = 403;
      ctx.body = {
        msg: err.errors.join("，"),
        code: 403,
      };
      return false;
    }
    return true;
  }
  constructor(public yub) {}
}
