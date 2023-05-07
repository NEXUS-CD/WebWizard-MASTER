# hackernews-async-ts

[Hacker News](https://news.ycombinator.com/) showcase using typescript && egg

## QuickStart



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


# 项目目录结构：

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
# 启动方式

```bash
$ yarn i
$ yarn  dev
$ open http://localhost:7001/
```
# 代码开发2选一，如下
# 代码开发流程1
1.router书写路由调用controller层
2.controller书写代码，
2.1记得书写swagger注释。如果swagger注释类型是对象类型，请在contract书写，其他swagger问题请github搜索egg-swagger查看官网demo
2.2当前是否需要校验参数
2.3如果需要校验参数请在validators下书写校验方法
3.contract写入  if (! await userSchema.triggerValidation(ctx, user)) return 即可完成校验。调用service层
4.service 中书写代码 调用model进行数据库操作
5.如果没有对应model文件，再去创建model文件
# 代码开发流程2 使用工具
1.npm i -g nexus-easy-mvc
2.输入mvc，根据交互输入对应的信息即可，注意支持的项目路径如下 （请在根目录使用,之后会使用配置时设置）
  1.router:app/router.ts
  2.controller:app/controller
  3.service:app/service
  4.model:app/model
3.根据所需条件进行增删代码

# 代码开发规范
1.常量全大写
2.注释
3.命名小驼峰
4.不能有any
# 分支名规范
前缀描述-WW-分支号，列：feat-WW-1
1.前缀描述:
  1.1 新功能：feat
  1.2 缺陷/bug：fix
  1.3 优化：perf
  1.4 样式优化：style
  1.5 文档完善：doc
# commit规范
git commit -m "前缀: ww-1@github名 任务描述xxxxx"
# 推送代码流程
https://www.yuque.com/yuqueyonghubka1if/piw85r/vbxdn16pnka5sf3l

