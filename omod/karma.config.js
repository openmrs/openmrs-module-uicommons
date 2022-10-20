process.env.CHROME_BIN = require('puppeteer').executablePath()

module.exports = function(config) {
    var karmaConfig = {
        browsers: ['ChromeHeadless'],
        customLaunchers: {
            ChromeHeadlessDocker: {
                base: 'ChromeHeadless',
                flags: [
                    "--disable-gpu",
                    "--disable-dev-shm-usage",
                    "--disable-setuid-sandbox",
                    "--no-sandbox",
                ]
            }
        },
        files: [
            { pattern: 'src/main/webapp/resources/scripts/jquery-1.12.4.min.js'},
            { pattern: 'src/main/webapp/resources/scripts/angular.min.js'},
            { pattern: 'src/main/webapp/resources/scripts/angular-common.js'},
            { pattern: 'src/main/webapp/resources/scripts/angular-mocks.js'},
            { pattern: 'src/main/webapp/resources/scripts/angular-resource.min.js'},
            { pattern: 'src/main/webapp/resources/scripts/angular-ui/calendar.js'},
            { pattern: 'src/main/webapp/resources/scripts/angular-ui/ui-bootstrap-tpls-0.13.0.js'},
            { pattern: 'src/main/webapp/resources/scripts/knockout-2.2.1.js'},
            { pattern: 'src/main/webapp/resources/scripts/underscore-min.js'},
            { pattern: 'src/main/webapp/resources/scripts/jquery.toastmessage.js'},
            { pattern: 'src/main/webapp/resources/scripts/handlebars/handlebars.js'},
            { pattern: 'src/main/webapp/resources/scripts/datetimepicker/bootstrap-datetimepicker.min.js'},
            { pattern: 'src/main/webapp/resources/scripts/datetimepicker/locales/*.js'},
            { pattern: 'src/main/webapp/resources/scripts/angular-app.js'},
            { pattern: 'src/main/webapp/resources/scripts/emr.js'},
            { pattern: 'src/main/webapp/resources/scripts/directives/*.js'},
            { pattern: 'src/main/webapp/resources/scripts/filters/*.js'},
            { pattern: 'src/main/webapp/resources/scripts/navigator/*.js'},
            { pattern: 'src/main/webapp/resources/scripts/rest/*.js'},
            { pattern: 'src/main/webapp/resources/scripts/services/*.js'},
            { pattern: 'src/test/webapp/resources/scripts/**/*.js'}

        ],
        frameworks: ['jasmine'],
        reporters: ['progress'],
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: true,
        concurrency: Infinity,
        singleRun: true
    };

    config.set(karmaConfig);
};
