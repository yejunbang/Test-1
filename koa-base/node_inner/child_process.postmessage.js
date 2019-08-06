var router = require('koa-router')();
const child_process = require('child_process')
// 进程间通信
// 原理：父进程在创建子进程前，先创建IPC通道并监听它，子进程创建时根据一个标识符会连接这个IPC通道，从而完成父子进程间的连接

const fn1 = function () {
  // fork特点：与spawn类似，但fork只需传入要执行的模块
  const worker = child_process.fork('./node_inner/child_worker/child.worker.1.js')

  worker.on('message', function (m) {
    console.log('====output==parent get==>>>', m);
  })
  worker.send({
    hello: 'world'
  })
  worker.on('close', function (code) {
    console.log('====output==exit code==>>>', code);
  })
}

Runner(fn1)

module.exports = router;