package com.linkus.capital.util.enumtype.bill;

public enum InpawnStatusMode {

	/**
	 * 非质押类型
	 */
	NOT_INPAWN("0"),
	/**
	 * 质押类型
	 */
	INPAWN("1"),
	/**
	 * 代保管
	 */
	TAPE_STORAGE("2");
	
	private String Code;
	
	private  InpawnStatusMode(String Code){
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
