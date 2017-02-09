package com.linkus.sys.auth.model;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import org.ironrhino.core.metadata.AutoConfig;
import org.ironrhino.core.metadata.Readonly;
import org.ironrhino.core.metadata.UiConfig;
import org.ironrhino.core.model.BaseEntity;

@AutoConfig
@Entity
@Table(name="PRO_BASIC_USER")
public class ProBasicUser extends BaseEntity{

	@Id
	private int us_id;            //人员编号
	
	private String us_name;       //人员姓名
	
	private int dept_id;          //部门id
	
	private int au_code;          //角色id
	
	private String us_type;       //用户类型（备用）
	
	private Date start_date;      //开始时间
	
	private Date end_date;          //结束时间
	
	
	private String password;        //密码
	
	private String branch_code;     //所属机构
	
	private String is_active;       //是否启用
	
	private String sub_branch_code; //父节点号
	
	@UiConfig(readonly = @Readonly(expression = "value"))
	private boolean flag;
	
	

	public int getUs_id() {
		return us_id;
	}

	public void setUs_id(int us_id) {
		this.us_id = us_id;
	}

	public String getUs_name() {
		return us_name;
	}

	public void setUs_name(String us_name) {
		this.us_name = us_name;
	}

	public int getDept_id() {
		return dept_id;
	}

	public void setDept_id(int dept_id) {
		this.dept_id = dept_id;
	}

	public int getAu_code() {
		return au_code;
	}

	public void setAu_code(int au_code) {
		this.au_code = au_code;
	}

	public String getUs_type() {
		return us_type;
	}

	public void setUs_type(String us_type) {
		this.us_type = us_type;
	}

	public Date getStart_date() {
		return start_date;
	}

	public void setStart_date(Date start_date) {
		this.start_date = start_date;
	}

	public Date getEnd_date() {
		return end_date;
	}

	public void setEnd_date(Date end_date) {
		this.end_date = end_date;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getBranch_code() {
		return branch_code;
	}

	public void setBranch_code(String branch_code) {
		this.branch_code = branch_code;
	}

	public String getIs_active() {
		return is_active;
	}

	public void setIs_active(String is_active) {
		this.is_active = is_active;
	}

	public String getSub_branch_code() {
		return sub_branch_code;
	}

	public void setSub_branch_code(String sub_branch_code) {
		this.sub_branch_code = sub_branch_code;
	}
}
