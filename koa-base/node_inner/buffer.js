var router = require('koa-router')();

const fn = function () {
  const buf = Buffer.alloc(1024)
  const len = buf.write('www.pogba.com')
  console.log('====output====len>>>', len);
  console.log('====output====>>>', buf.toString('utf8'));
  const json = JSON.stringify(buf)
  console.log('====output==json==>>>', json);

  // 获取buffer的长度
  const buf2 = Buffer.from('test length')
  console.log('====output==buf2=length=>>>', Buffer.byteLength(buf2));
  console.log('====output==buf2=length=>>>', buf2.length);
}

const fn1 = function () {
  const buf = Buffer.alloc(1024)
  const len = buf.write('www.pogba.com')
  const buf2 = Buffer.from('oh, yesh')
  const buf3 = Buffer.from('finished')
  const newBuf = Buffer.concat([buf, buf2, buf3])
  console.log('====output====>>>', newBuf.toString());
}

const fn2 = function () {
  const buf2 = Buffer.from('oh, yesh')
  const buf3 = Buffer.from('finished')
  const result = buf2.compare(buf3)
  console.log('====output==result==>>>', result); // buf2在buf3之后
}

const fn3 = function () {
  const buf2 = Buffer.from('oh, yesh')
  const buf3 = Buffer.from('finished44545')
  buf2.copy(buf3, 2, 2, 3)
  // targetBuffer - 要拷贝的 Buffer 对象。
  // targetStart - 数字, 可选, 默认: 0
  // sourceStart - 数字, 可选, 默认: 0
  // sourceEnd - 数字, 可选, 默认: buffer.length
  console.log('====output==buf2==>>>', buf2.toString());
  console.log('====output==buf2==>>>', buf3.toString());
  console.log('====output==buf2==>>>', buf3.length);
}

const fn4 = function () {
  const buf2 = Buffer.from('oh, yesh')
  const buf3 = buf2.slice(0, 2)
  // 返回一个新的缓冲区，它和旧缓冲区指向同一块内存，但是从索引 start 到 end 的位置剪切。
  console.log('====output====>>>', buf3.toString());
}

// Runner(fn4)

module.exports = router;