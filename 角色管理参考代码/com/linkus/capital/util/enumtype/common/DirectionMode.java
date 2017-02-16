package com.linkus.capital.util.enumtype.common;

public enum DirectionMode {

	/** 加法*/
	ADD("加法"),
	
	/** 减法*/
	SUBTRACT("减法");
	
	private String Code;
	
	private  DirectionMode(String Code){
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
