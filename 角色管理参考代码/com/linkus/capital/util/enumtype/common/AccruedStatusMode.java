package com.linkus.capital.util.enumtype.common;


/**=====================================================
 * 计提类型
 *=======================================================
 */
public enum AccruedStatusMode {
	/**
	 * 计提
	 */
	ACCRUE("0"),
	/**
	 * 不计提
	 */
	
	NOT_ACCRUE("2");
	
	private String Code;
	
	private  AccruedStatusMode(String Code){
		this.Code = Code;
	}
	
	@Override
	public String toString(){
		return name();
	}
	
	public String getCode(){
		return this.Code;
	}
	

}
