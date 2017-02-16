package org.ironrhino.security.action;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.apache.commons.lang3.StringUtils;
import org.apache.struts2.ServletActionContext;
import org.hibernate.criterion.DetachedCriteria;
import org.hibernate.criterion.Restrictions;
import org.ironrhino.core.hibernate.CriteriaState;
import org.ironrhino.core.hibernate.CriterionUtils;
import org.ironrhino.core.metadata.CurrentPassword;
import org.ironrhino.core.metadata.JsonConfig;
import org.ironrhino.core.model.LabelValue;
import org.ironrhino.core.security.role.UserRoleManager;
import org.ironrhino.core.struts.EntityAction;
import org.ironrhino.core.util.AuthzUtils;
import org.ironrhino.core.util.BeanUtils;
import org.ironrhino.security.model.User;
import org.ironrhino.security.service.UserManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import com.linkus.capital.authority.mode.PaRole;
import com.linkus.capital.authority.service.PaRoleManager;
import com.opensymphony.xwork2.interceptor.annotations.InputConfig;
import com.opensymphony.xwork2.validator.annotations.EmailValidator;
import com.opensymphony.xwork2.validator.annotations.ExpressionValidator;
import com.opensymphony.xwork2.validator.annotations.FieldExpressionValidator;
import com.opensymphony.xwork2.validator.annotations.RegexFieldValidator;
import com.opensymphony.xwork2.validator.annotations.RequiredStringValidator;
import com.opensymphony.xwork2.validator.annotations.Validations;
import com.opensymphony.xwork2.validator.annotations.ValidatorType;


public class UserAction extends EntityAction<User> {

	private static final long serialVersionUID = -79191921685741502L;
	private String toFields;
	private String setRoleListFlag;
	private List<PaRole> roleList; 
	private User user;

	private List<LabelValue> roles;

	private Set<String> hiddenRoles;

	private String password;

	private String confirmPassword;

	@Value("${user.profile.readonly:false}")
	private boolean userProfileReadonly;

	@Value("${user.password.readonly:false}")
	private boolean userPasswordReadonly;
	private Map<String,Object> jsonStr=new HashMap<String, Object>();
	@Autowired
	private transient UserManager userManager;
	@Autowired
	private PaRoleManager paRoleManager;

	@Autowired
	private transient UserRoleManager userRoleManager;
	@Autowired
	List<User> userList;

	public List<LabelValue> getRoles() {
		return roles;
	}

	public Set<String> getHiddenRoles() {
		return hiddenRoles;
	}

	public String getConfirmPassword() {
		return confirmPassword;
	}

	public void setConfirmPassword(String confirmPassword) {
		this.confirmPassword = confirmPassword;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public boolean isUserProfileReadonly() {
		return userProfileReadonly;
	}

	public boolean isUserPasswordReadonly() {
		return userPasswordReadonly;
	}

	@Override
	protected void prepare(DetachedCriteria dc, CriteriaState criteriaState) {
		String role = ServletActionContext.getRequest().getParameter("role");
		String departmentCode=ServletActionContext.getRequest().getParameter("departmentCode");
		if (StringUtils.isNotBlank(role))
			dc.add(CriterionUtils.matchTag("roles", role));
		if (StringUtils.isNotBlank(departmentCode))
			dc.add(Restrictions.eq("departmentCode", departmentCode));
	}
	/**
	 * @author 倪鑫
	 * 审核用户
	 * @return JSON
	 */
	@JsonConfig(root="jsonStr")
	public String approve(){
		String uid=ServletActionContext.getRequest().getParameter("uid");
		try{
			user=userManager.get(uid);
			String createUserName=user.getCreateUser();
			//获取当前用户名和ID
			User curUser = AuthzUtils.getUserDetails(User.class);
			String curUserName=curUser.getUsername();
			if(!createUserName.equals(curUserName)){
				user.setApprovalStatus("C");
				userManager.save(user);
				jsonStr.put("msg", "审核成功！");
			}else{
				jsonStr.put("msg", "审核失败，不能审核自己添加的用户!");
			}	
			
		}catch(Exception e){
			jsonStr.put("msg", "审核失败！");
		}
		return JSON;
	}
	/**
	 * @author 倪鑫
	 * 解锁用户
	 * @return JSON
	 */
	@JsonConfig(root="jsonStr")
	public String unlockUserStatus(){
		String uid=ServletActionContext.getRequest().getParameter("uid");
		try{
			user=userManager.get(uid);
			user.setLockStatus("0");
			user.setErrorNumber(0);
			userManager.save(user);
			jsonStr.put("msg","解锁成功！");	
		}catch(Exception e){
			jsonStr.put("msg","解锁失败！");
		}
		return JSON;
	}
	
	
	public String getUserList() throws Exception{
		//super.execute();
		String departmentCode=ServletActionContext.getRequest().getParameter("departmentCode");
		String reportRoleType=ServletActionContext.getRequest().getParameter("reportRoleType");
		if(departmentCode!=null&&!"".equals(departmentCode)){
			if("all".equals(reportRoleType)){
				DetachedCriteria dc=detachedCriteria();
				dc.add(Restrictions.eq("departmentCode", departmentCode));
				dc.add(Restrictions.eq("enabled",true ));
				userList=userManager.findListByCriteria(dc);
			}else{
				userList=paRoleManager.getDeputyUserList(departmentCode,reportRoleType);
			}
		}
		resultPage.setTotalResults(userList.size());
		resultPage.setPageNo(1);
		resultPage.setPageSize(userList.size());
		resultPage.setResult(userList);
		return "query_list";
	}
	
	public String showRoleList(){
		User user =userManager.get(this.getUid());
		roleList=paRoleManager.getRoleListByUserId(user.getUsername());
		return "rolelist";
	}
	
	@Override
	public String input() {
		Map<String, String> map = userRoleManager.getAllRoles(true);
		roles = new ArrayList<LabelValue>(map.size());
		for (Map.Entry<String, String> entry : map.entrySet())
			roles.add(new LabelValue(
					StringUtils.isNotBlank(entry.getValue()) ? entry.getValue()
							: getText(entry.getKey()), entry.getKey()));
		String id = getUid();
		if (StringUtils.isNotBlank(id)) {
			user = userManager.get(id);
			if (user == null)
				user = userManager.findByNaturalId(id);
		}
		if (user == null) {
			user = new User();
		} else {
			Set<String> userRoles = user.getRoles();
			for (String r : userRoles) {
				if (!map.containsKey(r)) {
					if (hiddenRoles == null)
						hiddenRoles = new LinkedHashSet<String>();
					hiddenRoles.add(r);
				}
			}
		}
		return INPUT;
	}

	@Override
	@Validations(requiredStrings = {
			@RequiredStringValidator(type = ValidatorType.FIELD, fieldName = "user.username", trim = true, key = "validation.required"),
			@RequiredStringValidator(type = ValidatorType.FIELD, fieldName = "user.name", trim = true, key = "validation.required") }, emails = { @EmailValidator(fieldName = "user.email", key = "validation.invalid") }, regexFields = { @RegexFieldValidator(type = ValidatorType.FIELD, fieldName = "user.username", regex = User.USERNAME_REGEX, key = "validation.invalid") }, fieldExpressions = { @FieldExpressionValidator(expression = "password == confirmPassword", fieldName = "confirmPassword", key = "validation.repeat.not.matched") })
	public String save() {
		if (!makeEntityValid())
			return INPUT;
		//如果是普通用户 去掉客户经理比例
		if("0".equals(user.getUserType()))
			user.setCustomerManagerRate(null);
		userManager.save(user);
		addActionMessage(getText("save.success"));
		return SUCCESS;
	}

	@Override
	@Validations(regexFields = { @RegexFieldValidator(type = ValidatorType.FIELD, fieldName = "user.username", regex = User.USERNAME_REGEX, key = "validation.invalid") })
	public String checkavailable() {
		return makeEntityValid() ? NONE : INPUT;
	}

	@Override
	protected boolean makeEntityValid() {
		if (user == null) {
			addActionError(getText("access.denied"));
			return false;
		}
		if (user.isNew()) {
			if (StringUtils.isNotBlank(user.getUsername())) {
				user.setUsername(user.getUsername().toLowerCase());
				if (userManager.findByNaturalId(user.getUsername()) != null) {
					addFieldError("user.username",
							getText("validation.already.exists"));
					return false;
				}
			}
			if (StringUtils.isNotBlank(user.getEmail())
					&& userManager.findOne("email", user.getEmail()) != null) {
				addFieldError("user.email",
						getText("validation.already.exists"));
				return false;
			}
			user.setLegiblePassword(password);
		} else {
			User temp = user;
			if (temp.getId() != null) {
				user = userManager.get(temp.getId());
			}
			if (temp.getUsername() != null) {
				user = userManager.findByNaturalId(temp.getUsername());
			}
			if (StringUtils.isNotBlank(temp.getEmail())
					&& !temp.getEmail().equals(user.getEmail())
					&& userManager.findOne("email", temp.getEmail()) != null) {
				addFieldError("user.email",
						getText("validation.already.exists"));
				return false;
			}
			BeanUtils.copyProperties(temp, user);
			if (StringUtils.isNotBlank(password))
				user.setLegiblePassword(password);
			userManager.evict(user);
		}
		try {
			userRoleManager.checkMutex(user.getRoles());
		} catch (Exception e) {
			addFieldError("user.roles", e.getLocalizedMessage());
			return false;
		}
		return true;
	}

	@Override
	public String delete() {
		String[] id = getId();
		if (id != null) {
			userManager.delete((Serializable[]) id);
			addActionMessage(getText("delete.success"));
		}
		return SUCCESS;
	}

	@InputConfig(resultName = "password")
	@CurrentPassword
	@Validations(requiredStrings = { @RequiredStringValidator(type = ValidatorType.FIELD, trim = true, fieldName = "password", key = "validation.required") }, expressions = { @ExpressionValidator(expression = "password == confirmPassword", key = "validation.repeat.not.matched") })
	public String password() {
		if (userPasswordReadonly) {
			addActionError(getText("access.denied"));
			return ACCESSDENIED;
		}
		User user = AuthzUtils.getUserDetails();
		if (user != null) {
			user.setLegiblePassword(password);
			userManager.save(user);
			addActionMessage(getText("save.success"));
		}
		return "password";
	}

	@InputConfig(methodName = "inputprofile")
	@Validations(requiredStrings = { @RequiredStringValidator(type = ValidatorType.FIELD, fieldName = "user.name", trim = true, key = "validation.required") }, emails = { @EmailValidator(fieldName = "user.email", key = "validation.invalid") })
	public String profile() {
		if (userProfileReadonly) {
			addActionError(getText("access.denied"));
			return ACCESSDENIED;
		}
		user.setId(AuthzUtils.<User> getUserDetails().getId());
		if (!makeEntityValid())
			return INPUT;
		User userInSession = AuthzUtils.getUserDetails();
		if (userInSession == null || user == null) {
			return "profile";
		}
		userInSession.setName(user.getName());
		userInSession.setEmail(user.getEmail());
		userInSession.setPhone(user.getPhone());
		userManager.save(userInSession);
		addActionMessage(getText("save.success"));
		return "profile";
	}

	public String inputprofile() {
		user = AuthzUtils.getUserDetails();
		return "profile";
	}

	@JsonConfig(root = "user")
	public String self() {
		user = AuthzUtils.getUserDetails();
		return JSON;
	}

	@JsonConfig(root = "roles")
	public String roles() {
		Map<String, String> map = userRoleManager
				.getAllRoles(ServletActionContext.getRequest().getParameter(
						"excludeBuiltin") != null);
		roles = new ArrayList<LabelValue>(map.size());
		for (Map.Entry<String, String> entry : map.entrySet())
			roles.add(new LabelValue(
					StringUtils.isNotBlank(entry.getValue()) ? entry.getValue()
							: getText(entry.getKey()), entry.getKey()));
		return JSON;
	}

	@Override
	public String pick() throws Exception {
		return super.pick();
	}

	public void setUserList(List<User> userList) {
		this.userList = userList;
	}



	public String getToFields() {
		return toFields;
	}

	public void setToFields(String toFields) {
		this.toFields = toFields;
	}

	public String getSetRoleListFlag() {
		return setRoleListFlag;
	}

	public void setSetRoleListFlag(String setRoleListFlag) {
		this.setRoleListFlag = setRoleListFlag;
	}

	public List<PaRole> getRoleList() {
		return roleList;
	}

	public void setRoleList(List<PaRole> roleList) {
		this.roleList = roleList;
	}

	public Map<String, Object> getJsonStr() {
		return jsonStr;
	}

	public void setJsonStr(Map<String, Object> jsonStr) {
		this.jsonStr = jsonStr;
	}

}
