package com.linkus.capital.authority.action;

import java.io.OutputStream;
import java.io.PrintWriter;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.struts2.ServletActionContext;
import org.ironrhino.core.metadata.AutoConfig;
import org.ironrhino.core.metadata.Captcha;
import org.ironrhino.core.metadata.JsonConfig;
import org.ironrhino.core.metadata.Redirect;
import org.ironrhino.core.spring.configuration.ResourcePresentConditional;
import org.ironrhino.core.util.AuthzUtils;
import org.ironrhino.security.model.User;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.linkus.capital.authority.service.UserService;
import com.linkus.capital.common.finger.FingerVerify;
import com.opensymphony.xwork2.interceptor.annotations.InputConfig;

@Order(Ordered.HIGHEST_PRECEDENCE)
@AutoConfig(namespace = "/")
@ResourcePresentConditional("classpath*:resources/spring/applicationContext-security*.xml")
public class LoginAction extends org.ironrhino.core.security.action.LoginAction {

	private static final long serialVersionUID = 3810311175999993850L;
	private Map<String, Object> jsonResult = new HashMap<String, Object>();
	@Autowired
	private transient AuthenticationManager authenticationManager;
	private String finger;
	@Autowired
	private PasswordEncoder passwordEnCode ;
	@Autowired
	private UserService userService;
	@Override
	public String input() {
		return super.input();
	}
	
	@Override
	@Redirect
	@InputConfig(methodName = INPUT)
	@Captcha(threshold = 3)
	public String execute() throws Exception {
		//int xixi=ServletActionContext.getRequest().getSession().getId().hashCode();
		if(password!=null){
			super.execute();
			this.targetUrl="/frame";
			return REDIRECT;
		}else{
		
			//截获用户
			User user =userService.getUserByUserName(username);
			if(user!=null){
			//校验 是
			return super.input();
			}else{
				HttpServletResponse response=ServletActionContext.getResponse();
				response.setContentType("text/html;charset=UTF-8");
				//校验否
				PrintWriter out = response.getWriter();
				out.write("<script>alert('对不起,当前用户没有权限访问此系统!');window.close();</script>");
				out.close();
				return NONE;
			}
			
		}
		
		//
	}
	@JsonConfig(root="jsonResult")
	public String checkLogin(){
		CharSequence chars=password;
		Map<String,String> map=userService.checkUser(username, passwordEnCode.encode(chars));
		if(map.get("msg")!=null&&!"".equals(map.get("msg"))){
			jsonResult.put("tip", map.get("msg"));
			jsonResult.put("success", "false");
		}else{
			jsonResult.put("tip", "校验成功");
			jsonResult.put("success", "true");
		}
		return JSON;
	}
	@JsonConfig(root="jsonResult")
	public String checkIsLogin(){
		String loginUserName=ServletActionContext.getRequest().getParameter("loginUserName");
		if(!AuthzUtils.getUsername().equals(loginUserName)){
			jsonResult.put("isLogin", "false");
		}
		return JSON;
	}	
	
	@JsonConfig(root="jsonResult")
	public String checkFingerprint(){
		int result=FingerVerify.verifyFinger("162.16.4.165", 7000, "00001", "5910", "01", finger);
		if(result==0){
			jsonResult.put("tip", "比对成功");
			jsonResult.put("success", "true");
		}else if(result==1){
			jsonResult.put("tip", "指纹不匹配");
			jsonResult.put("success", "false");
		}else if(result==2){
			jsonResult.put("tip", "柜员不存在");
			jsonResult.put("success", "false");
		}else if(result==3){
			jsonResult.put("tip", "指纹未复核");
			jsonResult.put("success", "false");
		}else{
			jsonResult.put("tip", "其他错误");
			jsonResult.put("success", "false");
		}
		return JSON;
	}
	
	private String listAsStr(List<String> list, String split) {
		String ret = "";
		StringBuilder b = new StringBuilder();
		for (String str : list) {
			b.append(str);
		}
		ret = b.toString();
		if(!"".equals(ret)) {
			ret = ret.substring(0, ret.length() - 1);
		}
		return ret;
	}

	public Map<String, Object> getJsonResult() {
		return jsonResult;
	}

	public void setJsonResult(Map<String, Object> jsonResult) {
		this.jsonResult = jsonResult;
	}

	public String getFinger() {
		return finger;
	}

	public void setFinger(String finger) {
		this.finger = finger;
	}
	
}
