module.exports = {
  configureWebpack: {
    externals: {
    serialport: 'serialPort'
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
