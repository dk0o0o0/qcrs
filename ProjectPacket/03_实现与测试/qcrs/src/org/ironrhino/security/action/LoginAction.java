package org.ironrhino.security.action;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang3.StringUtils;
import org.apache.struts2.ServletActionContext;
import org.ironrhino.core.event.EventPublisher;
import org.ironrhino.core.metadata.AutoConfig;
import org.ironrhino.core.metadata.Captcha;
import org.ironrhino.core.metadata.Redirect;
import org.ironrhino.core.metadata.Scope;
import org.ironrhino.core.model.Persistable;
import org.ironrhino.core.spring.security.DefaultAuthenticationSuccessHandler;
import org.ironrhino.core.spring.security.DefaultUsernamePasswordAuthenticationFilter;
import org.ironrhino.core.struts.BaseAction;
import org.ironrhino.core.util.ExceptionUtils;
import org.ironrhino.core.util.RequestUtils;
import org.ironrhino.security.event.LoginEvent;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AccountExpiredException;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.CredentialsExpiredException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.InternalAuthenticationServiceException;
import org.springframework.security.authentication.LockedException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import com.opensymphony.xwork2.interceptor.annotations.InputConfig;

@AutoConfig(namespace = "/")
public class LoginAction extends BaseAction {

	public final static String COOKIE_NAME_LOGIN_USER = "U";

	private static final long serialVersionUID = 2783386542815083811L;

	protected static Logger log = LoggerFactory.getLogger(LoginAction.class);

	protected String password;

	protected String username;

	@Autowired
	protected transient UserDetailsService userDetailsService;

	@Autowired
	protected transient DefaultUsernamePasswordAuthenticationFilter usernamePasswordAuthenticationFilter;

	@Autowired
	protected transient EventPublisher eventPublisher;

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	@Override
	@Redirect
	@InputConfig(methodName = INPUT)
	@Captcha(threshold = 3)
	public String execute() {
		HttpServletRequest request = ServletActionContext.getRequest();
		HttpServletResponse response = ServletActionContext.getResponse();
		Authentication authResult = null;
		try {
			authResult = usernamePasswordAuthenticationFilter
					.attemptAuthentication(request, response);
		} catch (UsernameNotFoundException | DisabledException
				| LockedException | AccountExpiredException failed) {
			addFieldError("username", getText(failed.getClass().getName()));
		} catch (AuthenticationException failed) {
			if (failed instanceof InternalAuthenticationServiceException) {
				log.error(failed.getMessage(), failed);
				addActionError(ExceptionUtils.getRootMessage(failed));
				return INPUT;
			} else if (failed instanceof BadCredentialsException) {
				addFieldError("password", getText(failed.getClass().getName()));
				captchaManager.addCaptachaThreshold(request);
			} else if (failed instanceof CredentialsExpiredException) {
				UserDetails ud = userDetailsService.loadUserByUsername(username);
				if (ud instanceof Persistable) {
					addActionMessage(getText(failed.getClass().getName()));
					authResult = new UsernamePasswordAuthenticationToken(ud,ud.getPassword(), ud.getAuthorities());
				} else {
					addFieldError("password", getText(failed.getClass().getName()));
				}
			}
			try {
				usernamePasswordAuthenticationFilter.unsuccess(request,response, failed);
			} catch (Exception e) {
				log.error(e.getMessage(), e);
			}
		}
		if (authResult != null)
			try {
				usernamePasswordAuthenticationFilter.success(request, response,
						authResult);
				Object principal = authResult.getPrincipal();
				if (principal instanceof UserDetails){
					eventPublisher.publish(new LoginEvent(
							((UserDetails) principal).getUsername(),
							RequestUtils.getRemoteAddr(request)), Scope.LOCAL);
				}
			} catch (Exception e) {
				log.error(e.getMessage(), e);
			}
		this.targetUrl="/frame";
		return REDIRECT;
	}

	@Override
	public String input() {
		HttpServletRequest request = ServletActionContext.getRequest();
		if (StringUtils.isBlank(targetUrl))
			targetUrl = "/";
		username = RequestUtils.getCookieValue(request,
				DefaultAuthenticationSuccessHandler.COOKIE_NAME_LOGIN_USER);
		return SUCCESS;
	}

}
