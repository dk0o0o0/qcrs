package com.linkus.sys.auth.model;



import org.ironrhino.core.metadata.AutoConfig;

import com.linkus.core.model.MapEntity;

/**
 * 部门
 * @author dlp
 */
@AutoConfig
public class ProBasicDept extends MapEntity {
	private static final long serialVersionUID = 1L;
	
	/*** 机构状态 *****/
	public static final int STATUS_ALL = -1;// 全部
	public static final int STATUS_UN_USE = 0;// 停用
	public static final int STATUS_USE = 1;// 启用

	private String dept_id; // 机构编号
	
	private String dept_name; //机构名称
	
	private String dept_type; //机构类型
	
	private String par_dept_id;//所属机构

	private String dept_function;//部门职能
	
	private String flw_type;//流程类型

	private String contact_person;//联系人

	private String contact_tel;//联系方式

	private Integer dept_sort;//部门排序

	private String tshort_name;//简称

	private String sub_branch_code;//父机构号

	public String getDept_id() {
		return dept_id;
	}

	public void setDept_id(String dept_id) {
		this.dept_id = dept_id;
	}

	public String getDept_name() {
		return dept_name;
	}

	public void setDept_name(String dept_name) {
		this.dept_name = dept_name;
	}

	public String getDept_type() {
		return dept_type;
	}

	public void setDept_type(String dept_type) {
		this.dept_type = dept_type;
	}

	public String getPar_dept_id() {
		return par_dept_id;
	}

	public void setPar_dept_id(String par_dept_id) {
		this.par_dept_id = par_dept_id;
	}

	public String getDept_function() {
		return dept_function;
	}

	public void setDept_function(String dept_function) {
		this.dept_function = dept_function;
	}

	public String getFlw_type() {
		return flw_type;
	}

	public void setFlw_type(String flw_type) {
		this.flw_type = flw_type;
	}

	public String getContact_person() {
		return contact_person;
	}

	public void setContact_person(String contact_person) {
		this.contact_person = contact_person;
	}

	public String getContact_tel() {
		return contact_tel;
	}

	public void setContact_tel(String contact_tel) {
		this.contact_tel = contact_tel;
	}

	public Integer getDept_sort() {
		return dept_sort;
	}

	public void setDept_sort(Integer dept_sort) {
		this.dept_sort = dept_sort;
	}


	public String getTshort_name() {
		return tshort_name;
	}

	public void setTshort_name(String tshort_name) {
		this.tshort_name = tshort_name;
	}

	public String getSub_branch_code() {
		return sub_branch_code;
	}

	public void setSub_branch_code(String sub_branch_code) {
		this.sub_branch_code = sub_branch_code;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}


}




































































