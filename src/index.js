const Koa = require('koa');
const bodyPaser = require('koa-bodyparser');
const koaSession = require('koa-session');

const app = new Koa();

// token、session两者取其一
app.keys = ['sessionsecret'];

const CONFIG = {
  key: 'koasession', /** (string) cookie key (default is koa.sess) */
  /** (number || 'session') maxAge in ms (default is 1 days) */
  /** 'session' will result in a cookie that expires when session/browser is closed */
  /** Warning: If a session cookie is stolen, this cookie will never expire */
  maxAge: 86400000,
  // autoCommit: true, /** (boolean) automatically commit headers (default true) */
  // overwrite: true, /** (boolean) can overwrite or not (default true) */
  // httpOnly: true, /** (boolean) httpOnly or not (default true) */
  // signed: true, /** (boolean) signed or not (default true) */
  // rolling: false, /** (boolean) Force a session identifier cookie to be set on every response. The expiration is reset to the original maxAge, resetting the expiration countdown. (default is false) */
  // renew: false, /** (boolean) renew session when session is nearly expired, so we can always keep user logged in. (default is false)*/
  // secure: true, /** (boolean) secure cookie*/
  // sameSite: null, /** (string) session cookie sameSite options (default null, don't set it) */
};

app.use(koaSession(CONFIG, app));

global.tokenScrect = 'testjwt';

app.use(bodyPaser({
  enableTypes: ['json', 'form', 'text'],
  formLimit: '10mb',
  textLimit: '10mb',
  jsonLimit: '10mb',
  multipart: true,
  onerror: (err, ctx) => {
    ctx.throw('body parse error', 422);
  }
}));

const router = require('./controllers/index');
app.use(router.routes(), router.allowedMethods());

app.listen(8800);