package com.linkus.sys.auth.model;
//用户信息表
import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.Table;

import org.ironrhino.core.metadata.AutoConfig;
import org.ironrhino.core.model.BaseEntity;

@AutoConfig
@Entity
@Table(name="PRO_BASIC_USER")
public class ProBasicUser extends BaseEntity{
	private int user_id;            //人员编号
	
	private String user_name;       //人员姓名
	
	private int dept_id;            //部门id
	
	private Date start_date;        //开始时间
	
	private Date end_date;          //结束时间
	
	private String password;        //密码
	
	private String par_dept_id;     //所属机构
	
	private String 	is_online;      //是否在线
	
	private String is_active;       //是否启用
	
	private String sub_branch_code; //父节点号

	public int getUser_id() {
		return user_id;
	}

	public void setUser_id(int user_id) {
		this.user_id = user_id;
	}

	public String getUser_name() {
		return user_name;
	}

	public void setUser_name(String user_name) {
		this.user_name = user_name;
	}

	public int getDept_id() {
		return dept_id;
	}

	public void setDept_id(int dept_id) {
		this.dept_id = dept_id;
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


	public String getPar_dept_id() {
		return par_dept_id;
	}

	public void setPar_dept_id(String par_dept_id) {
		this.par_dept_id = par_dept_id;
	}

	public String getIs_online() {
		return is_online;
	}

	public void setIs_online(String is_online) {
		this.is_online = is_online;
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
