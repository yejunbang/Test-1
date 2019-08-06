var router = require('koa-router')();
// 默认内置的对象

const fn1 = function () {
  // __dirname 表示当前执行脚本所在的目录。
  console.log('====output====>>>', __dirname);
}

const fn2 = function () {
  // __filename 表示当前正在执行的脚本的文件名, 绝对路径
  console.log('====output====>>>', __filename);
}

const fn3 = function () {
  const t = setTimeout(function () {
    console.log('====output====');
  }, 1000)
  clearTimeout(t)

  let i = 0;
  const interval = setInterval(function () {
    console.log('====output==i==>>>', i);
    if (i === 3) {
      clearInterval(interval)
    }
    i++
  }, 1000)
}

const fn4 = function () {
  // process 是一个全局变量，即 global 对象的属性
  // 它用于描述当前Node.js 进程状态的对象，提供了一个与操作系统的简单接口。
  // 通常在你写本地命令行程序的时候，少不了要 和它打交道。下面将会介绍 process 对象的一些最常用的成员方法。
  process.on('exit', function (code) {
    // 程序抛出exception，在进程退出时，打印退出状态码
    console.log('====output====>>>', code);
  })
  throw new TypeError('test')
}

const fn5 = function () {
  process.stdout.write('Hello World')
  console.log('====output====>>>', process.memoryUsage);
}

// Runner(fn5)

module.exports = router;