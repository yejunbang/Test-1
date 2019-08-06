const cron = require('cron')

function main(fn) {
  let once = true;
  new cron.CronJob('*/2 * * * * *', function () {
    if (once) {
      console.time('process')
      console.log('========================start========================');
      fn()
      console.log('======================process==time========================');
      console.timeEnd('process')
      console.log('========================end==========================');
      once = false;
    }
  }, null, 'Asia/Shanghai')
  if (!once) {
    cron.stop()
  }
}

module.exports = main