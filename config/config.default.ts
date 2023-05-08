import { EggAppConfig, EggAppInfo, PowerPartial } from "egg";

export default (appInfo: EggAppInfo) => {
  const config = {} as PowerPartial<EggAppConfig>;

  // override config from framework / plugin
  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + "_1672743312757_5789";

  // add your egg config in here
  config.middleware = [];

  config.cluster = {
    listen: {
      path: "",
      port: 7001,
      hostname: "0.0.0.0",
    },
  };

  config.cors = {
    origin: "*",
    allowMethods: "GET,HEAD,PUT,POST,DELETE,PATCH",
  };

  // config.jwt = {
  //   secret: '1qaz@WSX3edc',
  //   enable: true,
  //   match: /[\s\S]*(login | regist)$/,
  //   sign: { expiresIn: 60 * 120 }
  // };

  config.tokenConfig = {
    secret: "1qaz@WSX3edc",
  };

  config.middleware = ["auth"];

  config.security = {
    csrf: {
      enable: false,
    },
  };

  config.swaggerdoc = {
    dirscanner: "./app/controller", // 配置自动扫描的控制器路径
    apiInfo: {
      title: "接口文档", // 接口文档的标题
      description: "swagger 测试接口文档", // 接口文档描述
      version: "1.0.0", // 接口文档版本
      // termsOfService: "http://swagger.io/terms/", // 服务条件
      // contact: {
      //   email: "fanghui@outlook.com", // 联系方式
      // },
      // license: {
      //   name: "Apache 2.0",
      //   url: "http://www.apache.org/licenses/LICENSE-2.0.html",
      // },
    },
    basePath: "/", // 配置基础路径
    schemes: ["http", "https"], // 配置支持的协议
    consumes: ["application/json"], // 指定处理请求的提交内容类型 (Content-Type)，如 application/json、text/html
    produces: ["application/json"], // 指定返回的内容类型，仅当 request 请求头中的(Accept)类型中包含该指定类型才返回
    securityDeFinitions: {}, // 配置接口安全授权方式
    enableSecurity: false, // 是否启用授权，默认 false
    // enableValidate: true, // 是否启用参数校验，默认 true
    routerMap: false, // 是否启用自动生成路由(实验功能)，默认 true
    enable: true, // 默认 true
  };
  // add your special config in here
  const bizConfig = {
    sourceUrl: `https://github.com/eggjs/examples/tree/master/${appInfo.name}`,
  };

  config.proxy = true;

  // the return config will combines to EggAppConfig
  return {
    ...config,
    ...bizConfig,
  };
};
