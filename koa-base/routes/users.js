var router = require('koa-router')();

router.prefix('/users');

router.get('/', function* (next) {
  this.body = 'this is a users response!';
});

router.get('/bar/:name', function* (ctx, next, r, a, b, c) {
  console.log('====output=ctx===>>>', this.params);
  this.body = 'this is a users/bar response!';
});

module.exports = router;