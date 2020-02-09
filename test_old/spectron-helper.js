var Application = require('spectron').Application
const path = require('path')

// initialises spectron for e2e test
function initialiseSpectron () {
  let electronPath = path.join(__dirname, '..', 'node_modules', '.bin', 'electron')
  const appPath = path.join(__dirname, '..')
  if (process.platform === 'win32') {
    electronPath += '.cmd'
  }

  return new Application({
    path: electronPath,
    args: [appPath],
    env: {
      ELECTRON_ENABLE_LOGGING: true,
      ELECTRON_ENABLE_STACK_DUMPING: true,
      NODE_ENV: 'test'
    },
    startTimeout: 20000,
    chromeDriverLogPath: '../chromedriverlog.txt',
    requireName: 'electronRequire'
  })
}

module.exports = initialiseSpectron
