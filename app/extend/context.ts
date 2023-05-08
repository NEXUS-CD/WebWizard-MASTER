import { Stream } from "stream";

export interface Response {
  status?: number;
  code?: number;
  msg?: string;
  data?: object;
}

module.exports = {
  success({
    status = 200,
    code = 2000,
    msg = "",
    data = {},
  }: Response = {}): void {
    this.body = {
      code,
      msg: msg || this.helper.errorMsg(code),
      data,
    };
    this.status = status;
  },

  badRequest({
    status = 400,
    code = 20001,
    msg = "",
    data = {},
  }: Response = {}): void {
    this.body = {
      code,
      msg: msg || this.helper.errorMsg(code),
      data,
    };
    this.status = status;
  },

  unauthorized({
    status = 401,
    code = 10004,
    msg = "",
    data = {},
  }: Response = {}): void {
    this.body = {
      code,
      msg: msg || this.helper.errorMsg(code),
      data,
    };
    this.status = status;
  },

  forbidden({
    status = 403,
    code = 20003,
    msg = "",
    data = {},
  }: Response = {}): void {
    this.body = {
      code,
      msg: msg || this.helper.errorMsg(code),
      data,
    };
    this.status = status;
  },

  notFound({ status = 404, code, msg = "", data = {} }: Response = {}): void {
    this.body = {
      code,
      msg: msg || this.helper.errorMsg(code),
      data,
    };
    this.status = status;
  },

  alreadExist({
    status = 409,
    code,
    msg = "",
    data = {},
  }: Response = {}): void {
    this.body = {
      code,
      msg: msg || this.helper.errorMsg(code),
      data,
    };
    this.status = status;
  },

  licenseUnauthorized({
    status = 498,
    code = 30002,
    msg = "",
    data = {},
  }: Response = {}): void {
    this.body = {
      code,
      msg: msg || this.helper.errorMsg(code),
      data,
    };
    this.status = status;
  },

  failure({
    status = 200,
    code = 20002,
    msg = "",
    data = {},
  }: Response = {}): void {
    this.body = {
      code,
      msg: msg || this.helper.errorMsg(code),
      data,
    };
    this.status = status;
  },

  file(filename: string, length = 0, content: string | Stream | Buffer): void {
    this.set("Content-Disposition", `attachment; filename="${filename}"`);
    this.set("Content-Length", `${length}`);
    this.set("Content-Type", "application/octet-stream");
    this.body = content;
  },
};
