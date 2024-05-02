const KoaRouter = require('@koa/router');
const jwt = require('jsonwebtoken');

const router = new KoaRouter({
  prefix: '/api'
});

const userRouter = require('./api/user');

router.use(async (ctx, next) => {
  const white_list = ['/api/user/login', '/api/user/register'];
  if (!white_list.includes(ctx.url)) {
    const { token } = ctx.request.header;
    if (!token) {
      ctx.body = {
        code: 405,
        msg: 'token不存在'
      }
      return;
    }
    const user = jwt.verify(token, global.tokenScrect);
  
    if (!user || Date.now() > user?.expirted) {
      ctx.body = {
        code: 405,
        msg: 'token过期'
      }
      return;
    }
  }

  await next();
})

router.use(userRouter.routes(), router.allowedMethods());

module.exports = router;