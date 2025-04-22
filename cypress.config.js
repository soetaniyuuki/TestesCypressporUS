const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      on('before:browser:launch', (browser = {}, launchOptions) => {
        if (browser.name === 'chrome' || browser.name === 'edge') {
          launchOptions.args.push('--user-agent=server-tmb');
        } else if (browser.name === 'firefox') {
          launchOptions.preferences['general.useragent.override'] = 'server-tmb';
        }
        return launchOptions;
      });

      config.env.userAgent = 'server-tmb';

      return config;
    },
  },
});
