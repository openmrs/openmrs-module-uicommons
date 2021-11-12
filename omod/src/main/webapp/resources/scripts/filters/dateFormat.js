angular.module('uicommons.filters').
    filter('toLocaleString', ['locale', function(locale) {
        return function(date, options) {
            return new Date(date).toLocaleString(locale, options);
        }
    }])

    .filter('toLocaleDateString', ['locale', function(locale) {
        return function(date, options) {
            return new Date(date).toLocaleDateString(locale, options);
        }
    }])

    .filter('toLocaleTimeString', ['locale', function(locale) {
        return function(date, options) {
            return new Date(date).toLocaleTimeString(locale, options);
        }
    }])