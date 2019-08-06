var router = require('koa-router')();
const fs = require('fs')
const path = require('path')

router.get('/read', function* (next) {
  // this.type = 'application/octet-stream'
  const file = path.resolve(__dirname, '..', 'files', 'computer.txt')
  const computerPath = path.join(__dirname, '..', 'files', '001.pdf');
  const copy_computerPath = path.join(__dirname, '..', 'files', '001_1.pdf');
  const stream = fs.createReadStream(computerPath)
  const streamDest = fs.createWriteStream(copy_computerPath)
  console.log('====output====>>>', stream);
  stream.pipe(streamDest)
});

router.get('/copy-big-file', function* (next) {
  const computerPath = path.join(__dirname, '..', 'files', 'vue_practice.pdf');
  const copy_computerPath = path.join(__dirname, '..', 'files', 'vue_practice_1.pdf');
  const stream = fs.createReadStream(computerPath)
  const streamDest = fs.createWriteStream(copy_computerPath)
  stream.pipe(streamDest)
});

module.exports = router;