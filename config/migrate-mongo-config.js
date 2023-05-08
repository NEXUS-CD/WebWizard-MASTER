const { execSync } = require("child_process");
const path = require("path");
const fs = require("fs");
const parse = require("mongodb-uri").parse;
const os = require("os");

/**
 * 根据不同的环境变量，读取 ts 文件中的 mongodb 配置信息
 */
function mongoConf() {
  const env = process.env.MIGRATION_ENV || "local";
  const cfgPath = path.join(__dirname, `/config.${env}`);
  let config;
  let jsExists = false;
  // 判断配置文件的 js 版本是否存在
  if (fs.existsSync(`${cfgPath}.js`)) {
    jsExists = true;
  }
  if (fs.existsSync(`${cfgPath}.ts`)) {
    if (!jsExists) {
      // 使用 tsc 编译 配置文件中的 ts 文件
      os.type() === "Windows_NT"
        ? execSync(
            path.join(__dirname, `../node_modules/.bin/tsc ${cfgPath}.ts`)
          )
        : execSync(`./node_modules/.bin/tsc ${cfgPath}.ts`);
    }
  }
  // 嵌入 js 模块
  const configModule = require(`${cfgPath}.js`);

  // 如果原来不存在 js 版本，则删除生成的 js 文件
  if (!jsExists) {
    fs.unlinkSync(`${cfgPath}.js`);
  }

  if (configModule.__esModule) {
    config = configModule.default({ name: "intelligence-api" });
  } else {
    config = configModule();
  }
  return config.mongoose;
}

const { url, options = {} } = mongoConf();
module.exports = {
  mongodb: {
    url,
    databaseName: options.dbName || parse(url).database || "intelligence",

    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
  },
  migrationsDir: "migrations",
  changelogCollectionName: "changelog",
};
