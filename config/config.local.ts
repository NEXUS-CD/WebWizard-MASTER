import { EggAppConfig, PowerPartial } from "egg";

const mongoDB = {
  url: "mongodb://127.0.0.1:27017/WebWizard",
  option: {
    useNewUrlParser: true,
  },
};
export default () => {
  const config: PowerPartial<EggAppConfig> = {};

  config.mongoose = mongoDB;

  return config;
};
