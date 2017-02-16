/***************************************************************************
 * Project Name:cpms2.0
 * File Name:PaRoleHonour.java
 * Package Name:com.linkus.capital.authority.mode
 * Creater:陶述杰
 * Description:角色表实体
 * Date:2016年6月15日下午5:35:52
 ***************************************************************************/

package com.linkus.capital.authority.mode;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;
import org.ironrhino.core.metadata.AutoConfig;
import org.ironrhino.core.metadata.Richtable;
import org.ironrhino.core.model.BaseEntity;


@Entity
@AutoConfig
@Richtable(celleditable=false)
@Table(name = "pa_rolehonour")
public class PaRoleHonour extends  BaseEntity{

	private static final long serialVersionUID = 5157588004102644215L;
	@Column(name = "departmenttype",length = 10 ,nullable=false)
	private String departmentType;//角色级别
	
	@Column(name = "rolename",length = 100 ,nullable=false)
	private String roleName;//角色名称
	
	@Column(name = "reportrolename",length = 60)
	private String reportRoleName;//审批角色报表模板名

	@Column(name = "rolefuncno",length = 10 ,nullable=false)
	private String roleFuncNo;//角色功能归类代号

	/**
	 *
	 * @return the departmentType
	 */
	public String getDepartmentType() {
		return departmentType;
	}

	/**
	 *
	 * @param departmentType the departmentType to set
	 */
	public void setDepartmentType(String departmentType) {
		this.departmentType = departmentType;
	}

	/**
	 *
	 * @return the roleName
	 */
	public String getRoleName() {
		return roleName;
	}

	/**
	 *
	 * @param roleName the roleName to set
	 */
	public void setRoleName(String roleName) {
		this.roleName = roleName;
	}

	/**
	 *
	 * @return the reportRoleName
	 */
	public String getReportRoleName() {
		return reportRoleName;
	}

	/**
	 *
	 * @param reportRoleName the reportRoleName to set
	 */
	public void setReportRoleName(String reportRoleName) {
		this.reportRoleName = reportRoleName;
	}

	/**
	 *
	 * @return the roleFuncNo
	 */
	public String getRoleFuncNo() {
		return roleFuncNo;
	}

	/**
	 *
	 * @param roleFuncNo the roleFuncNo to set
	 */
	public void setRoleFuncNo(String roleFuncNo) {
		this.roleFuncNo = roleFuncNo;
	}

}

