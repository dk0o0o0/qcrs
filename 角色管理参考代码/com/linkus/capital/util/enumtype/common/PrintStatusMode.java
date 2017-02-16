package com.linkus.capital.util.enumtype.common;

public enum PrintStatusMode {

	/**
	 * 已打印
	 */
	 PRINTED_Y("Y"),
	 
	 /**
	 * 未打印
	 */
	 PRINTED_NO("N");
	
	private String code;
	
	private  PrintStatusMode(String code){
		this.code = code;
	}
	
	@Override
	public String toString(){
		return name();
	}
	
	public String getCode(){
		return this.code;
	}
}
