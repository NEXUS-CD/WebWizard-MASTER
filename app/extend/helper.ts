import * as crypto from 'crypto';

const CRYPTO_ALGORITHM = 'aes-256-ctr';
const CRYPTO_IV_PREFIX = 'IV;';

const errorCode = {
  10001: '用户名或密码错误',
  10002: '用户不存在',
  10003: '用户名已存在',
  10004: '未登录',
  10005: '该密码与原始密码相同',
  10007: '您的查询次数已达上限，请联系管理员',
  10008: '当前账号已过期，请联系管理员',

  // 20001: '请求参数错误',
  // 20002: '服务器错误',
  // 20003: '客户端权限不足',
  // 20004: '未启用开放登录',
  // 20005: '远程校验地址尚未配置',
  // 20006: '远程校验失败',
  // 20007: '开放登录回调函数未设置',
  // 20008: '账号不存在，请联系管理员创建。',
  // 20009: '登录失败',
  // 20010: '不要重复设置维护状态',
  // 20011: '未找到维护记录',
  // 20012: '非法调用初始化接口',

  // 50001: '周期性任务不允许重复添加！',
  // 50002: '该任务未运行或不存在',
  // 50003: '任务已存在',
  // 50004: '该任务为基类，不允许添加任务类型',
  // 50005: '运行任务失败，请重试',
  // 50006: '删除任务失败',
  // 50007: '已有相同任务已被添加',
  // 50008: '该任务不可删除',
  // 50009: '该任务类型不存在',
  // 50010: '重启任务失败',

  // 60001: '邮箱配置不正确，验证失败！',
  // 60002: '手机配置不正确，验证失败！',

  // 80000: '消息通知获取失败',
  // 80001: '消息通知标记已读失败',
  // 80002: '获取消息统计数据失败',
  // 80003: '删除消息失败',
};

const errorMsg = (code = 0): string => {
  return code === 0 ? '' : errorCode[code] || errorCode[20002];
};

const encrypt = (text: string, secret: string): string => {
  const key = crypto
    .createHash('sha256')
    .update(secret)
    .digest();
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv(CRYPTO_ALGORITHM, key, iv);
  let crypted = cipher.update(text, 'utf8', 'hex');
  crypted += cipher.final('hex');
  return CRYPTO_IV_PREFIX + iv.toString('hex') + crypted;
};

const decrypt = (text: string, secret: string): string => {
  const key = crypto
    .createHash('sha256')
    .update(secret)
    .digest();
  const ivDataBuffer = Buffer.from(text.slice(CRYPTO_IV_PREFIX.length), 'hex');
  const iv = ivDataBuffer.slice(0, 16);
  const decipher = crypto.createDecipheriv(CRYPTO_ALGORITHM, key, iv);
  let dec = decipher.update(ivDataBuffer.slice(16), 'hex', 'utf8');
  dec += decipher.final('utf8');
  return dec;
};

const md5 = (text: string): string => {
  return crypto
    .createHash('md5')
    .update(text)
    .digest('hex');
};

function aesEncrypt(data: string, key: string) {
  const cipher = crypto.createCipher('aes192', key);
  let crypted = cipher.update(data, 'utf8', 'hex');
  crypted += cipher.final('hex');
  return crypted;
}

function aesDecrypt(encrypted: string, key: string) {
  const decipher = crypto.createDecipher('aes192', key);
  let decrypted = decipher.update(encrypted, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
}

export default {
  errorMsg,
  errorCode,
  encrypt,
  decrypt,
  md5,
  aesEncrypt,
  aesDecrypt,
};
