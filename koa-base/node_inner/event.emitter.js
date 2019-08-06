var router = require('koa-router')();
const event = require('events')

const fn1 = function () {
  const emitter = new event.EventEmitter();
  const listener = function (arg1) {
    console.log('====output====>>>', arg1);
  }
  emitter.on('customer_fn', listener)
  emitter.emit('customer_fn', 'I am arguments')
  emitter.removeListener('customer_fn', listener)
}

const fn2 = function () {
  const emitter = new event.EventEmitter();
  const listener = function (arg1) {
    console.log('====output====>>>', arg1);
  }
  emitter.on('test_fn', listener)
  emitter.addListener('test_fn', listener)
  emitter.emit('test_fn', 'I am arguments1.....')
  console.log('====output==listener count==>>>', emitter.listenerCount('test_fn', listener));
  emitter.removeListener('test_fn', listener)
  console.log('====output==listener count==>>>', emitter.listenerCount('test_fn', listener));
}

// Runner(fn2)

module.exports = router;