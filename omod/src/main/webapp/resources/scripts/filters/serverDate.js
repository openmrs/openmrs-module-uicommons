angular.module('uicommons.filters').

    /*
     * This is a function that takes an ISO date string, blindly removes its timezone
     * suffix, and formats it in a way that is neither locale-specific nor can be
     * correctly interpreted by the JavaScript `Date` constructor (the year comes
     * out negative; e.g. `new Date("08-Sep-2021") === new Date(-2021, 8, 8)`).
     */
    filter('serverDate', ['$filter', function($filter) {
        return function(isoString, format) {
            console.warn("Use of the `serverDate` filter is likely to cause problems. Please consider using Date.prototype.toLocaleString instead: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleString");
            if (!isoString) {
                return null;
            }
            if (isoString.length > 23) {
                isoString = isoString.substring(0, 23);
            }
            return $filter('date')(isoString, format || "dd-MMM-yyyy H:mm");
        }
    }])

    .filter('serverDateForRESTSubmit', ['$filter', function($filter) {
        return function(isoString) {
            return $filter('serverDate')(isoString, "YYYY-MM-DDTHH:mm:ss.SSS");
        }
    }])