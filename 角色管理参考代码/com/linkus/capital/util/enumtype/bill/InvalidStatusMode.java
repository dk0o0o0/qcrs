package com.linkus.capital.util.enumtype.bill;

public enum InvalidStatusMode {

	/**
	 * 失效类型
	 */
	NOT_USE("1"),
	/**
	 * 未失效类型
	 */
	IN_USE("0");
	
	private String Code;
	
	private  InvalidStatusMode(String Code){
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
