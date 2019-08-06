var router = require('koa-router')();
const child_process = require('child_process')
// 多进程

const fn1 = function () {
  // exec特点：有一个回调函数获知子进程的状态

  for (let i = 0; i < 4; i++) {
    const worker = child_process.exec('node ./node_inner/child_worker/child.worker.js ' + i, function (err, stdout, stderr) {
      console.log('====output===parent=>>>', stdout);
    })
    worker.on('exit', function (code) {
      console.log('====output===worker=exit>>>', code);
    })
  }
}

const fn2 = function () {
  // spawn特点：使用指定的命令行参数创建新进程

  for (let i = 0; i < 4; i++) {
    const worker = child_process.spawn('node', ['./node_inner/child_worker/child.worker.js', i])
    worker.stdout.on('data', function (data) {
      console.log('====output==parent==>>>', data.toString());
    })
    worker.on('close', function (code) {
      console.log('====output==exit code==>>>', code);
    })
  }
}

const fn3 = function () {
  // fork特点：与spawn类似，但fork只需传入要执行的模块

  for (let i = 0; i < 4; i++) {
    const worker = child_process.fork('./node_inner/child_worker/child.worker.js', [i])
    // worker.stdout.on('data', function (data) {
    //   console.log('====output==parent==>>>', data.toString());
    // })
    worker.on('close', function (code) {
      console.log('====output==exit code==>>>', code);
    })
  }
}

// Runner(fn3)

module.exports = router;