package com.linkus.capital.authority.service;

import java.io.IOException;
import java.util.Date;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.ironrhino.core.session.HttpSessionFilterHook;
import org.ironrhino.core.util.AuthzUtils;
import org.ironrhino.core.util.RequestUtils;
import org.ironrhino.security.model.User;
import org.springframework.stereotype.Component;

import com.linkus.capital.util.config.SystemConfigUtil;

@Component
public class SecurityCheckHttpSessionFilterHook implements HttpSessionFilterHook {
	
	public static final String EXCLUDE_URL = "/login/checkIsLogin,/remindlist,/tasklist";
	@Override
	public boolean beforeFilterChain(HttpServletRequest request, HttpServletResponse response) {
		User user = AuthzUtils.getUserDetails(User.class);
		String requestUri = RequestUtils.getRequestUri(request);
		if (!isProtected(requestUri) || user != null && hasPermission(user, requestUri)) {
			if(user!=null){
				long nowTime = new Date().getTime(); 
				long lastTime = nowTime;
				if(request != null && request.getSession() != null && request.getSession().getAttribute("LAST_REQUEST_TIME") != null){
					lastTime = (long) request.getSession().getAttribute("LAST_REQUEST_TIME");
				}
				if (nowTime - ((long) lastTime) >= Long.parseLong(SystemConfigUtil.getRequestOutTime())) {
					request.getSession().invalidate();
					return false;
				} 
				if(EXCLUDE_URL.indexOf(requestUri) < 0){
					request.getSession().setAttribute("LAST_REQUEST_TIME",nowTime);
				}				
			}
			return false;
		} else {
			try {
				response.sendRedirect("/errorpage");
			} catch (IOException e) {
				e.printStackTrace();
			}
			return true;
		}
	}

	@Override
	public void afterFilterChain(HttpServletRequest request, HttpServletResponse response) {

	}

	protected boolean isProtected(String requestUri) {
		return requestUri.startsWith("/security/");
	}

	protected boolean hasPermission(User user, String requestUri) {
		// TODO inject bean and check permission
		return true;
	}
	

}
