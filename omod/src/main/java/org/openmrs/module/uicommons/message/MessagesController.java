package org.openmrs.module.uicommons.message;

import org.openmrs.api.AdministrationService;
import org.openmrs.messagesource.MessageSourceService;
import org.openmrs.messagesource.PresentationMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.context.request.WebRequest;

import java.util.HashMap;
import java.util.HashSet;
import java.util.Locale;
import java.util.Map;
import java.util.Set;

/**
 * Integrates with Angular Translate, simply initialize as follows:
 * $translateProvider.useUrlLoader('/' + OPENMRS_CONTEXT_PATH + '/module/uicommons/messages/messages.json')
 */
@Controller
public class MessagesController {

    @Autowired
    private MessageSourceService messageSourceService;

    @Qualifier("adminService")
    @Autowired
    private AdministrationService adminService;

    private Map<String, Map<String,String>> messages;

    private Set<String> codes;

    private Map<String, Integer> eTags;

    private boolean initialized = false;

    private Object lock = new Object();

    @RequestMapping(value = "/module/uicommons/messages/messages.json", method = RequestMethod.GET)
    @ResponseBody
    public ResponseEntity<Map<String,String>> getMessages(@RequestParam("localeKey") Locale localeKey, WebRequest webRequest) {

        // TODO zip to compress?

        // I tried to handle this in a @PostConstruct method but ran into issues--it seems like some of the resources required weren't actually available yet?
        synchronized (lock) {
            if (!initialized) {
                initializeKeySet();
                initializeLocales();

                // we were running into some odd, tranistory cases where the messages weren't being initialized;
                // so we only flag as initialized if something has been populated, see RA-1463
                if (codes != null && codes.size() > 0 && messages != null && messages.size() > 0) {
                    initialized = true;
                }
            }
        }

        // currently only supporting referencing the language component of a locale
        String locale = localeKey.getLanguage();

        String eTagFromClient = webRequest.getHeader("If-None-Match");

        if (!messages.containsKey(locale)) {
            return new ResponseEntity<Map<String, String>>(new HashMap<String, String>(), HttpStatus.BAD_REQUEST);
        }
        // see if this client already has the right version cached, if so send back not modified
        else if (eTagFromClient != null && eTagFromClient.contains(eTags.get(locale).toString())) {
            return new ResponseEntity<Map<String, String>>(new HashMap<String, String>(), HttpStatus.NOT_MODIFIED);
        }
        // otherwise set eTag and return the codes requested
        else {
            HttpHeaders headers = new HttpHeaders();
            headers.setETag("\"" + eTags.get(locale).toString() + "\"");
            return new ResponseEntity<Map<String, String>>(messages.get(locale), headers, HttpStatus.OK);
        }

    }

    private void initializeKeySet() {
        codes = new HashSet<String>();
        for (PresentationMessage message : messageSourceService.getPresentations()) {
            codes.add(message.getCode());
        }
    }

    private void initializeLocales() {
        messages = new HashMap<String, Map<String,String>>();
        eTags = new HashMap<String, Integer>();
        for (Locale locale : adminService.getAllowedLocales()) {
            generateMessagesForLocale(locale);
        }
    }

    private void  generateMessagesForLocale(Locale locale) {
        // currently only supporting referencing the language component of a locale
        Map<String, String> messagesForLanguage = messages.get(locale.getLanguage());
        if (messagesForLanguage == null) {
            messagesForLanguage = new HashMap<String, String>();
            messages.put(locale.getLanguage(), messagesForLanguage);
        }

        for (String code : codes) {
            messagesForLanguage.put(code, messageSourceService.getMessage(code, null, locale));
        }

        eTags.put(locale.getLanguage(), messagesForLanguage.hashCode());
    }

}
