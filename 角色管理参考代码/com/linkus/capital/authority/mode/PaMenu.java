/***************************************************************************
 * Project Name:cpms2.0
 * File Name:PaMenu.java
 * Package Name:com.linkus.capital.authority.mode
 * Creater:刘佳
 * Description:菜单表实体
 * Date:2016年2月20日下午5:35:52
 * Copyright (c) 2016, liujia198584@163.com All Rights Reserved.
 ***************************************************************************/

package com.linkus.capital.authority.mode;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

import org.ironrhino.core.metadata.AutoConfig;
import org.ironrhino.core.metadata.Richtable;
import org.ironrhino.core.metadata.UiConfig;
import org.ironrhino.core.model.BaseTreeableEntity;


@Entity
@AutoConfig
@Richtable(celleditable=false,downloadable=false)
@Table(name = "pa_menu")
public class PaMenu extends  BaseTreeableEntity<PaMenu>{

	private static final long serialVersionUID = 2824530136419607229L;

	@Column(name = "menuurl",length = 200 )
	private String menuUrl;//菜单url
	
	@Column(name = "menuparameter",length = 200 )
	private String menuParameter;//菜单参数
	
	@Column(name = "functioncode",length = 100,nullable=false )
	private String functionCode;//功能编码
	
	@Column(name = "target",length = 50 )
	private String target;//目标
	
	@Column(name = "image",length = 100 )
	@UiConfig(hidden=true)
	private String image;//菜单图片
	
	@Column(name = "openimage",length = 100 )
	@UiConfig(hidden=true)
	private String openImage;//菜单打开时图片
	
	@Column(name = "closeimage",length = 100 )
	@UiConfig(hidden=true)
	private String closeImage;//菜单关闭时图片
	
	@Column(name = "validstatus",length = 1,nullable=false )
	private String validStatus;//是否有效
	

	
	@Column(name = "flag",length = 10 )
	@UiConfig(hidden=true)
	private String flag;//预留标志位

	public String getMenuUrl() {
		return menuUrl;
	}

	public void setMenuUrl(String menuUrl) {
		this.menuUrl = menuUrl;
	}

	public String getMenuParameter() {
		return menuParameter;
	}

	public void setMenuParameter(String menuParameter) {
		this.menuParameter = menuParameter;
	}

	public String getFunctionCode() {
		return functionCode;
	}

	public void setFunctionCode(String functionCode) {
		this.functionCode = functionCode;
	}

	public String getTarget() {
		return target;
	}

	public void setTarget(String target) {
		this.target = target;
	}

	public String getImage() {
		return image;
	}

	public void setImage(String image) {
		this.image = image;
	}

	public String getOpenImage() {
		return openImage;
	}

	public void setOpenImage(String openImage) {
		this.openImage = openImage;
	}

	public String getCloseImage() {
		return closeImage;
	}

	public void setCloseImage(String closeImage) {
		this.closeImage = closeImage;
	}

	public String getValidStatus() {
		return validStatus;
	}

	public void setValidStatus(String validStatus) {
		this.validStatus = validStatus;
	}



	public String getFlag() {
		return flag;
	}

	public void setFlag(String flag) {
		this.flag = flag;
	}
	
	
	//URL, TARGET,IMAGE, IMAGEEXPAND, IMAGECOLLAPSE,VALIDSTATUS,parmFLAG,TASKCODE,EXCEPTRISKCODE, EXCEPTRISKCLASS
	//EXCEPTRISKCODE, EXCEPTRISKCLASS
}

