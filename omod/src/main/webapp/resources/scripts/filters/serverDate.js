angular.module('uicommons.filters').

    /*
     * This is a function that takes an ISO date string, blindly removes its timezone
     * suffix, and formats it in a way that is neither locale-specific nor is
     * correctly interpreted by the JavaScript `Date` constructor (the year comes
     * out negative in some browsers; e.g. `new Date("08-Sep-2021") === new Date(-2021, 8, 8)` in Firefox).
     *
     * Its intended use case is to format a Date for display with respect to the server's
     * time zone. This is better accomplished using a function like
     * [Date.prototype.toLocaleString](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleString).
     */
    filter('serverDate', ['$filter', 'locale', function($filter) {
        return function(isoString, format) {
            console.warn("Use of the `serverDate` filter is likely to cause problems. Please consider using the `toLocaleString` or `toLocaleDateString` filter instead. See Date.prototype.toLocaleString: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleString");
            if (!isoString) {
                return null;
            }
            if (isoString.length > 23) {
                isoString = isoString.substring(0, 23);
            }
            return $filter('date')(isoString, format || "dd-MMMM-yyyy H:mm");
        }
    }])

    .filter('toLocaleString', ['locale', function(locale) {
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

    .filter('serverDateForRESTSubmit', ['$filter', function($filter) {
        return function(isoString) {
            return $filter('serverDate')(isoString, "YYYY-MM-DDTHH:mm:ss.SSS");
        }
    }])