package org.openmrs.module.uiCommonsLibrary.page.controller;

import org.openmrs.ui.framework.page.PageModel;

public class TestPageController {
    public void get(PageModel pageModel) {
        pageModel.addAttribute("key", "value2");
    }
}
