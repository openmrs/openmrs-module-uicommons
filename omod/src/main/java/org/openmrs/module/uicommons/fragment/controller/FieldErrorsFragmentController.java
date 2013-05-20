/*
 * The contents of this file are subject to the OpenMRS Public License
 * Version 1.0 (the "License"); you may not use this file except in
 * compliance with the License. You may obtain a copy of the License at
 * http://license.openmrs.org
 *
 * Software distributed under the License is distributed on an "AS IS"
 * basis, WITHOUT WARRANTY OF ANY KIND, either express or implied. See the
 * License for the specific language governing rights and limitations
 * under the License.
 *
 * Copyright (C) OpenMRS, LLC.  All Rights Reserved.
 */

package org.openmrs.module.uicommons.fragment.controller;

import org.openmrs.api.context.Context;
import org.openmrs.messagesource.MessageSourceService;
import org.openmrs.ui.framework.annotation.FragmentParam;
import org.openmrs.ui.framework.annotation.SpringBean;
import org.openmrs.ui.framework.fragment.FragmentModel;
import org.openmrs.ui.framework.page.PageModel;
import org.springframework.validation.Errors;
import org.springframework.validation.FieldError;

public class FieldErrorsFragmentController {
	
	public void controller(PageModel pageModel, @FragmentParam("fieldName") String fieldName, FragmentModel model,
	                       @SpringBean("messageSourceService") MessageSourceService mss) {
		
		String errorMessage = null;
		if (pageModel.getAttribute("errors") != null) {
			Errors errors = (Errors) pageModel.getAttribute("errors");
			FieldError error = errors.getFieldError(fieldName);
			if (error != null) {
				errorMessage = mss.getMessage(error, Context.getLocale());
			}
		}
		model.addAttribute("errorMessage", errorMessage);
	}
	
}
