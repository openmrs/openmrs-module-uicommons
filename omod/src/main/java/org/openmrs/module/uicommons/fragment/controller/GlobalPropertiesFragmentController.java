package org.openmrs.module.uicommons.fragment.controller;

import org.openmrs.GlobalProperty;
import org.openmrs.api.AdministrationService;
import org.openmrs.ui.framework.SimpleObject;
import org.openmrs.ui.framework.annotation.SpringBean;
import org.springframework.web.bind.annotation.RequestParam;

/**
 * Support for making an AJAX call to get global property values
 */
public class GlobalPropertiesFragmentController {

    public SimpleObject get(@RequestParam("properties") String properties,
                            @SpringBean("adminService") AdministrationService administrationService) {
        SimpleObject ret = new SimpleObject();
        String[] propertyNames = properties.split(",");
        for (String propertyName : propertyNames) {
            GlobalProperty gp = administrationService.getGlobalPropertyObject(propertyName);
            if (gp == null) {
                ret.put(propertyName, null);
            } else {
                ret.put(propertyName, gp.getPropertyValue());
                // TODO make this module depend on webservices.rest and also return a REST representation of the typed value
            }
        }
        return ret;
    }
}
