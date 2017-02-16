package com.linkus.capital.util.enumtype.common;

/**
 *
 * <p>Title com.linkus.capital.util.enumtype.common.DetailStatusMode</p>
 * <p>Description 是否明细</p>
 * <p>Company linkus </p>
 * <p>Copyright Copyright(c)2016</p>
 * @author 申铭
 * @create time: 2016年8月4日 上午11:10:57
 * @version 1.0
 * 
 * @modified records:
 */
public enum DetailStatusMode {
	
	CNTR("N"),
	ITEM("Y");
	
	
	private String code;
	
	private DetailStatusMode(String code){
		this.code= code;
	}

	public String getCode() {
		return code;
	}
}
