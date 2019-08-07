var router = require('koa-router')();

router.get('/:id', function* (next) {
  console.log('====output==接收到客户端向获取product id==>>>', this.params.id);
  yield this.response.body = {
    name: '益达'
  }
});

module.exports = router;