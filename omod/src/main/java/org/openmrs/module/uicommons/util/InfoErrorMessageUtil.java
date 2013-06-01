package org.openmrs.module.uicommons.util;

import org.openmrs.module.uicommons.UiCommonsConstants;

import javax.servlet.http.HttpSession;

/**
 *
 */
public class InfoErrorMessageUtil {

    public static void flashInfoMessage(HttpSession session, String message) {
        session.setAttribute(UiCommonsConstants.SESSION_ATTRIBUTE_INFO_MESSAGE, message);
        session.setAttribute(UiCommonsConstants.SESSION_ATTRIBUTE_TOAST_MESSAGE, "true");
    }

    public static void flashErrorMessage(HttpSession session, String message) {
        session.setAttribute(UiCommonsConstants.SESSION_ATTRIBUTE_ERROR_MESSAGE, message);
        session.setAttribute(UiCommonsConstants.SESSION_ATTRIBUTE_TOAST_MESSAGE, "true");
    }

}
