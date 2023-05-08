import { EggAppConfig, PowerPartial } from "egg";

const mongoDB = {
  url: "mongodb://admin:QToETQaHJ7S@10.8.250.58:27099/intelligence?authSource=admin",
  options: {
    autoReconnect: true,
  },
};

export default () => {
  const config: PowerPartial<EggAppConfig> = {};

  config.mongoose = mongoDB;

  return config;
};
