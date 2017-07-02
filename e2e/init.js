require('babel-polyfill');
const detox = require('detox');
const config = require('../package.json').detox;

before(async () => {
  await detox.init(config);
  await device.relaunchApp({url: 'detox://deleteUser/myuser@iamondemand.com/123456'});
});

after(async () => {
  await detox.cleanup();
});