module.exports = {
  configureWebpack: {
    externals: {
    serialport: 'SerialPort'
}
  },

  pluginOptions: {
    i18n: {
      locale: 'en',
      fallbackLocale: 'en',
      localeDir: 'locales',
      enableInSFC: false
    }
  }
}
