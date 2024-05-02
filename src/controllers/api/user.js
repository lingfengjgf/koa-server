const KoaRouter = require('@koa/router');
const jwt = require('jsonwebtoken');

const router = new KoaRouter({
  prefix: '/user'
});

router.get('/info', async (ctx) => {
  const user = ctx.session.user;
  // const userInfo = await User.findById(user.id).lean();
  const userInfo = user;
  ctx.body = {
    userInfo
  };
});

router.post('/login', async (ctx) => {
  const { account, password } = ctx.request.body;
  console.log(account, password);
  // const user = await User.findOne({ account, password }).lean();

  const user = { account, password };
  if (user) {
    const token = jwt.sign({
      _id: Date.now(),
      expirted: Date.now() + 60 * 60 * 24 * 7
    }, global.tokenScrect);
    ctx.body = {
      success: true,
      token
    };
    ctx.session.user = user;
  } else {
    ctx.body = {
      success: false,
    };

  }
});
module.exports = router;