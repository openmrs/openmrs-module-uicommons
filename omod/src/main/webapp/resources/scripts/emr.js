var emr = (function($) {

    var toQueryString = function(options) {
        var ret = "?";
        if (options) {
            for (key in options) {
                ret += key + '=' + options[key] + '&';
            }
        }
        return ret;
    };

    var requireOptions = function() {
        var opts = arguments[0];
        for (var i = 1; i < arguments.length; ++i) {
            if (!opts[arguments[i]]) {
                throw "Missing option: " + arguments[i];
            }
        }
    };

    var jqObject = $();

    return {

        // just used in testing so we can replace the instance with a mock or spy as needed
        setJqObject: function(jqueryInstanceToSet)  {
            jqObject = jqueryInstanceToSet;
        },

        navigateTo: function(opts) {
            var url = opts.url;
            if (opts.applicationUrl) {
                url = '/' + OPENMRS_CONTEXT_PATH + '/' + opts.applicationUrl;
            }
            if (opts.page) {
                var provider = opts.provider;
                if (provider == null) {
                    provider = "emr"
                }
                url = this.pageLink(provider, opts.page, opts.query);
            }
            location.href = url;
        },

        pageLink: function(providerName, pageName, options) {
            var ret = '/' + OPENMRS_CONTEXT_PATH + '/' + providerName + '/' + pageName + '.page';
            return ret + toQueryString(options);
        },

        resourceLink: function(providerName, resourceName) {
            if (providerName == null)
                providerName = '*';
            return '/' + OPENMRS_CONTEXT_PATH + '/ms/uiframework/resource/' + providerName + '/' + resourceName;
        },

        fragmentActionLink: function(providerName, fragmentName, actionName, options) {
            var ret = '/' + OPENMRS_CONTEXT_PATH + '/' + providerName + '/' + fragmentName + '/' + actionName + '.action';
            return ret += toQueryString(options);
        },

        getFragmentActionWithCallback: function(providerName, fragmentName, actionName, options, callback, errorCallback) {
            if (!errorCallback) {
                errorCallback = function(xhr) {
                    emr.handleError(xhr);
                };
            }
            var url = this.fragmentActionLink(providerName, fragmentName, actionName, options);
            $.getJSON(url).success(callback).error(errorCallback);
        },

        /*
         * opts should contain:
         *   provider (defaults to 'emr')
         *   fragment
         *   action
         *   query, e.g. { q: "bob", checkedInAt: 5 }
         *   resultTarget e.g. '#search-results'
         *   resultTemplate (should be an underscore template)
         */
        ajaxSearch: function(opts) {
            var provider = opts.provider;
            if (!provider) {
                provider = 'emr';
            }
            var url = this.fragmentActionLink(provider, opts.fragment, opts.action);
            var target = $(opts.resultTarget);
            $.getJSON(url, opts.query)
                .success(function(data) {
                    target.html('');
                    jq.each(data, function(i, result) {
                        jq(opts.resultTemplate(result)).appendTo(target);
                    });
                })
                .error(function(err) {
                    emr.errorMessage(err);
                });
        },

        successMessage: function(message) {
            jqObject.toastmessage( 'showToast', { type: 'success',
                                              position: 'top-right',
                                              text:  message } );
        },

        errorMessage: function(message) {
            jqObject.toastmessage( 'showToast', { type: 'error',
                                              position: 'top-right',
                                              text:  message } );
        },

        alertMessage: function(message) {
            jqObject.toastmessage( 'showToast', { type: 'alert',
                                              position: 'top-right',
                                              text:  message } );
        },

        successAlert: function(message, options) {
            jqObject.toastmessage( 'showToast', { type: 'success',
                position: 'top-right',
                text:  message,
                stayTime: 8000,
                close: options && options.close ? options.close : null } );
        },

        errorAlert: function(message, options) {
            jqObject.toastmessage( 'showToast', { type: 'error',
                position: 'top-right',
                text:  message,
                stayTime: 8000,
                close: options && options.close ? options.close : null } )
        },

        handleError: function(xhr) {
            if (!emr.redirectOnAuthenticationFailure(xhr)) {
                emr.errorAlert(jq.parseJSON(xhr.responseText).globalErrors[0]);
            }
        },

        redirectOnAuthenticationFailure: function (xhr) {
            if (xhr.status == 403) {
                window.location = '/' + OPENMRS_CONTEXT_PATH;
                return true;
            }
            return false;
        },

        updateBreadcrumbs: function(extraBreadcrumbs) {
//            if (typeof breadcrumbs == 'undefined') {
//                return;
//            }
//            var toUse = breadcrumbs;
//            if (extraBreadcrumbs) {
//                toUse = _.clone(breadcrumbs);
//                if (extraBreadcrumbs == null || extraBreadcrumbs.length == 0) {
//                    var index = toUse.length - 1;
//                    var modified = _.clone(toUse[index]);
//                    if(modified.link !=null){
//                        modified.link = null;
//                    }
//                    toUse[index] = modified;
//                }
//                _.each(extraBreadcrumbs, function(item) {
//                    toUse.push(item);
//                })
//            }
//            $('#breadcrumbs').html(this.generateBreadcrumbHtml(toUse));
        },

        generateBreadcrumbHtml: function(breadcrumbs) {
            var breadcrumbTemplate = _.template($('#breadcrumb-template').html());
            var html = "";

            _.each(breadcrumbs, function(item, index) {
                html += breadcrumbTemplate({ breadcrumb: item, first: index == 0, last: index == breadcrumbs.length-1 });
            });
            return html;
        },

        // opts requires 'encounterId' and 'targetSelector'
        showEncounterWithHtmlForm: function(opts) {
            getFragmentActionWithCallback('emr', 'htmlform/viewEncounterWithHtmlForm', 'getAsHtml', { encounterId: opts.encounterId }, function(data) {
                jq(opts.targetSelector).html(data.html);
            });
        },

        /*
         * returns an object with show() and close() functions
         */
        setupConfirmationDialog: function(opts) {
            requireOptions(opts, 'selector');
            var element = $(opts.selector);
            element.hide();
            if (opts.actions) {
                if (opts.actions.confirm) {
                    element.find(".confirm").unbind('click');
                    element.find(".confirm").click(opts.actions.confirm);
                }
                if (opts.actions.cancel) {
                    element.find(".cancel").unbind('click');
                    element.find(".cancel").click(opts.actions.cancel);
                }
            }

            var dialogApi = {};
            dialogApi.show = function() {
                $(opts.selector).modal({
                    overlayClose: true,
                    overlayId: "modal-overlay",
                    opacity: 80,
                    persist: true,
                    closeClass: "cancel"
                });
            };
            dialogApi.close = function() {
                $.modal.close();
            };

           return dialogApi;
        }

    };

})(jQuery);

var jq = jQuery;
_.templateSettings = {
    interpolate : /{{=(.+?)}}/g ,
    escape : /{{-(.+?)}}/g ,
    evaluate : /{{(.+?)}}/g
};
