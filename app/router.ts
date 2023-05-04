import { Application } from 'egg';

export default (app: Application) => {
  const { router, controller, middleware } = app;
  const auth = middleware.auth();

  // 注册
  router.post('/api/regist', controller.login.regist);

  // 登录
  router.post('/api/login', controller.login.login);

  // 判断用户是否登录
  router.get('/api/isLogining', controller.login.isLogin);

  // 查找用户
  router.get('/api/users/findOne', auth, controller.login.getUser);

  // 修改用户密码
  router.put('/api/users/update', auth, controller.login.updateUserPwd);

  // 搜索
  router.get('/api/search', auth, controller.search.searchMsg);

  // 批量搜索
  router.get('/api/searchMore', auth, controller.search.searchMore);
};
