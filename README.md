# hackernews-async-ts

[Hacker News](https://news.ycombinator.com/) showcase using typescript && egg

## QuickStart

### Development

```bash
$ yarn i
$ yarn un dev
$ open http://localhost:7001/
```

Don't tsc compile at development mode, if you had run `tsc` then you need to `npm run clean` before `npm run dev`.

### Deploy

```bash
$ npm run tsc
$ npm start
```

### Npm Scripts

- Use `npm run lint` to check code style
- Use `npm test` to run unit test
- se `npm run clean` to clean compiled js at development mode once

### Requirement

- Node.js 8.x
- Typescript 2.8+


项目目录结构：

```
├── app                         # 存放应用程序源代码
│   ├── contract               # 存放接口层的数据格式定义
│   │   └── login.ts           # 登录接口数据格式定义
│   ├── controller             # 存放控制层代码
│   │   ├── login.ts           # 登录控制器
│   │   └── search.ts          # 搜索控制器
│   ├── extend                 # 存放全局类型扩展定义
│   │   ├── context.ts         # Koa2 Context 类型扩展定义
│   │   └── helper.ts          # 其他类型扩展定义
│   ├── middleware             # 存放中间件代码
│   │   └── auth.ts            # 授权中间件
│   ├── model                  # 存放数据模型代码
│   │   ├── auditLogs.ts       # 审计日志数据模型
│   │   └── users.ts           # 用户数据模型
│   ├── service                # 存放业务逻辑层代码
│   │   ├── auditLogs.ts       # 审计日志业务逻辑
│   │   ├── login.ts           # 登录业务逻辑
│   │   └── search.ts          # 搜索业务逻辑
│   └── validators             # 存放参数校验定义
│       ├── index.ts           # 参数校验入口文件
│       └── user.ts            # 用户参数校验定义
├── config                      # 存放配置文件
│   ├── config.default.ts      # 默认配置文件
│   ├── config.local.ts        # 本地配置文件
│   ├── config.prod.ts         # 生产环境配置文件
│   ├── migrate-mongo-config.js# MongoDB 数据库迁移配置
│   ├── plugin.ts              # Egg.js 插件配置
│   └── ...
├── migrations                 # 存放 MongoDB 数据库迁移脚本
│   └── 00001-init.js          # 数据库初始化脚本
├── scripts                    # 存放脚本文件
│   ├── deploy.sh              # 部署脚本
│   └── uglify.sh              # 代码压缩脚本
├── Dockerfile                 # 应用程序Docker文件
├── Dockerfile.base            # 基础Docker文件
├── .autod.conf.js             # autod的配置文件
├── .editorconfig              # 编辑器配置
├── .eslintignore              # ESLint忽略配置
├── .eslintrc.js               # ESLint配置
├── package-lock.json          # 锁定依赖版本的配置文件
├── package.json               # 依赖配置文件
├── README.md                  # 项目说明文件
├── tsconfig.json              # TypeScript配置文件
└── yarn.lock                  # 锁定依赖版本的配置文件
```