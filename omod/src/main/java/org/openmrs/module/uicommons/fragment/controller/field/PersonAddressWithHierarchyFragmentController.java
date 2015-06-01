package org.openmrs.module.uicommons.fragment.controller.field;

import org.apache.commons.beanutils.PropertyUtils;
import org.openmrs.PersonAddress;
import org.openmrs.api.context.Context;
import org.openmrs.layout.web.address.AddressSupport;
import org.openmrs.layout.web.address.AddressTemplate;
import org.openmrs.module.addresshierarchy.AddressHierarchyLevel;
import org.openmrs.module.addresshierarchy.service.AddressHierarchyService;
import org.openmrs.ui.framework.SimpleObject;
import org.openmrs.ui.framework.annotation.FragmentParam;
import org.openmrs.ui.framework.fragment.FragmentModel;

import java.util.Arrays;
import java.util.List;

public class PersonAddressWithHierarchyFragmentController {

    public void controller(FragmentModel model,
                           @FragmentParam(required = false, value = "initialValue") PersonAddress initialValue) throws Exception {
        // there is no accessible spring bean for this, so we fetch it in the old hacky way
        AddressHierarchyService addressHierarchyService = Context.getService(AddressHierarchyService.class);

        List<AddressHierarchyLevel> levels = addressHierarchyService.getOrderedAddressHierarchyLevels();
        model.put("levels", levels);

        AddressTemplate addressTemplate = AddressSupport.getInstance().getDefaultLayoutTemplate();
        model.put("addressTemplate", addressTemplate);

        SimpleObject initial = null;
        if (initialValue != null) {
            initial = new SimpleObject();
            for (String prop : Arrays.asList("address1", "address2", "address3", "address4", "address5", "address6",
                    "cityVillage", "countyDistrict", "stateProvince", "country", "postalCode", "latitude", "longitude")) {
                String val = (String) PropertyUtils.getProperty(initialValue, prop);
                if (val != null) {
                    initial.put(prop, val);
                }
            }
        }
        model.put("initialValue", initial);
    }

}
