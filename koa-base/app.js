var app = require('koa')(),
  logger = require('koa-logger'),
  json = require('koa-json'),
  views = require('koa-views'),
  onerror = require('koa-onerror'),
  cors = require('koa-cors');
const runner = require('./runner/runner')
global.Runner = runner

const router = require('koa-router')();
var index = require('./routes/index');
var users = require('./routes/users');
var product = require('./routes/product');
var fs = require('./node_inner/fs');
var stream = require('./node_inner/stream');

// ================自运行===start===================
var buffer = require('./node_inner/buffer');
require('./node_inner/event.emitter');
require('./node_inner/inner.object');
require('./node_inner/child_process');
require('./node_inner/child_process.postmessage');
// ================自运行===end===================

// error handler
onerror(app);

// global middlewares
app.use(views('views', {
  root: __dirname + '/views',
  default: 'jade'
}));
app.use(require('koa-bodyparser')());
app.use(json());
app.use(logger());
app.use(cors());

app.use(function* (next) {
  var start = new Date;
  yield next;
  var ms = new Date - start;
  console.log('%s %s - %s', this.method, this.url, ms);
});

app.use(require('koa-static')(__dirname + '/public'));

// routes definition
app.use(index.routes(), index.allowedMethods());
app.use(users.routes(), users.allowedMethods());
router.use('/fs', fs.routes(), fs.allowedMethods())
router.use('/stream', stream.routes(), stream.allowedMethods())
router.use('/buffer', buffer.routes(), buffer.allowedMethods())
router.use('/api/product', product.routes(), product.allowedMethods())
app.use(router.routes(), router.allowedMethods());

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app;