angular.module('uicommons.filters').

    /**
     * This is a function that takes an ISO date string, blindly removes its timezone
     * suffix, and formats it in a way that is neither locale-specific nor is
     * correctly interpreted by the JavaScript `Date` constructor (the year comes
     * out negative in some browsers; e.g. `new Date("08-Sep-2021") === new Date(-2021, 8, 8)` in Firefox).
     *
     * Its intended use case is to format a Date for display with respect to the server's
     * time zone. This is better accomplished using a function like
     * [Date.prototype.toLocaleString](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleString).
     */
    filter('serverDate', ['$filter', function($filter) {
        return function(isoString, format) {
            //console.warn("Use of the `serverDate` filter is likely to cause problems. Please consider using the `toLocaleString`, `toLocaleDateString`, or `toLocaleTimeString` filter instead. See Date.prototype.toLocaleString: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleString");
            if (!isoString) {
                return null;
            }
            if (isoString.length > 23) {
                isoString = isoString.substring(0, 23);
            }
            return $filter('date')(isoString, format || "dd-MMM-yyyy H:mm");
        }
    }])

    /**
     * This is a function that does the same transformations as `serverDate`, but which renders a date
     * that is formatted according to the given locale.
     *
     * The `options` object is optional. If provided, it should have the format expected by `toLocaleString`; see
     * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleString#using_options.
     */
    .filter('serverDateLocalized', ['locale', function(locale) {
        return function(isoString, options) {
            //console.warn("Use of the `serverDate` and `serverDateLocalized` filters is likely to cause problems. Please consider using the `toLocaleString`, `toLocaleDateString`, or `toLocaleTimeString` filter instead. See Date.prototype.toLocaleString: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleString");
            if (!isoString) {
                return null;
            }
            options = options || { month: 'short' };
            if (isoString.length > 23) {
                isoString = isoString.substring(0, 23);
            }
            return new Date(isoString).toLocaleString(locale, options);
        }
    }])

    .filter('serverDateForRESTSubmit', ['$filter', function($filter) {
        return function(isoString) {
            return $filter('serverDate')(isoString, "YYYY-MM-DDTHH:mm:ss.SSS");
        }
    }])
