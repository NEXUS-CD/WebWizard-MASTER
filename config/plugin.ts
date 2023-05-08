import { EggPlugin } from "egg";

const plugin: EggPlugin = {
  cors: {
    enable: true,
    package: "egg-cors",
  },
  mongoose: {
    enable: true,
    package: "egg-mongoose",
  },
  swaggerdoc: {
    enable: true, // 启用 swagger-ui 默认启用
    package: "egg-swagger-doc", // 指定 第三方插件 包名称
  },
};

export default plugin;
