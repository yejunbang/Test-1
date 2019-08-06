var router = require('koa-router')();
const fs = require('fs')
const path = require('path')

router.get('/read', function* (next) {
  const computerPath = path.join(__dirname, '..', 'files', 'computer.txt');
  fs.readFile(computerPath, 'utf-8', function (err, data) {
    console.log('====output====>>>', data);
  })
});

router.get('/copy-file-1', function* (next) {
  const computerPath = path.join(__dirname, '..', 'files', 'computer.txt');
  fs.readFile(computerPath, 'utf-8', function (err, data) {
    const copyComputerPath = path.join(__dirname, '..', 'files', 'computer_copy.txt');
    console.log('====output==4=data=>>>', data);
    fs.writeFileSync(copyComputerPath, data, {
      flag: 'a'
    })
  })
});

router.get('/copy-file-2', function* (next) {
  const computerPath = path.join(__dirname, '..', 'files', 'computer.txt');
  const copyComputerPath = path.join(__dirname, '..', 'files', 'computer_copy_2.txt');
  fs.copyFile(computerPath, copyComputerPath, function () {})
});

router.get('/delete/:fileName', function* (next) {
  const params = this.params
  const computerPath = path.join(__dirname, '..', 'files', `${params.fileName}.txt`);
  fs.unlink(computerPath, function () {})
});

// read 方法与 readFile 不同，一般针对于文件太大，
// 无法一次性读取全部内容到缓存中或文件大小未知的情况，
// 都是多次读取到 Buffer 中。 想了解 Buffer 可以看 NodeJS —— Buffer 解读。
// 或者用下面的方法，虽然性能不太好
router.get('/copy-big-file', function* (next) {
  const size = 1024 * 1024
  let buf = Buffer.alloc(size);
  const vuePracticePath = path.join(__dirname, '..', 'files', 'vue_practice.pdf');
  const copyVuePracticePath = path.join(__dirname, '..', 'files', 'vue_practice_copy.pdf');
  fs.open(vuePracticePath, 'r', function (err, readFd) {
    fs.open(copyVuePracticePath, 'w', function (err, writeFd) {
      let read = 0;
      let write = 0;
      (function next() {
        fs.read(readFd, buf, 0, size, read, function (err, byte) {
          read += byte
          if (!byte) {
            fs.close(readFd, function () {})
          }
          fs.write(writeFd, buf, 0, byte, write, function (err, writeByte) {
            write += writeByte
            if (!writeByte) {
              fs.close(writeFd, function () {})
            }
            next();
          })
        })
      })()
    })
  })
});

module.exports = router;