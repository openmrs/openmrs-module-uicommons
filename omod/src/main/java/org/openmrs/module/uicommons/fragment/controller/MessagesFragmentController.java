package org.openmrs.module.uicommons.fragment.controller;

import org.openmrs.ui.framework.SimpleObject;
import org.openmrs.ui.framework.UiUtils;
import org.springframework.web.bind.annotation.RequestParam;

/**
 * Support for making an AJAX call to get i18nized versions of messages
 */
public class MessagesFragmentController {

    public SimpleObject get(@RequestParam("codes") String codes, UiUtils uiUtils) {
        String[] codeArray = codes.split(",");
        SimpleObject ret = new SimpleObject();
        for (String code : codeArray) {
            ret.put(code, uiUtils.message(code));
        }
        return ret;
    }

}
