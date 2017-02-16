package com.linkus.capital.util.enumtype.common;


public enum MajorTypeMode {

	/**
	 * 债券类型
	 */
	BOND_MAJORTYPE("BOND"),
	
	/**
	 * 票据类型
	 */
	BILL_MAJORTYPE("BILL"),

	/**
	 * 同业类型
	 */
	INTERBANK_MAJORTYPE("INTERBANK");
	
	private String code ;
	
	private  MajorTypeMode(String code){
		
		this.code = code;
	}
	
	public String getCode(){
		return this.code;
	} 
}
