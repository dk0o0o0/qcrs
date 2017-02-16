package com.linkus.capital.util.enumtype.bill;

public enum DistrictTypeMode {

	/**
	 * 辖内
	 */
	IN_AREA("1"),
	/**
	 * 非辖内
	 */
	OUT_AREA("0");
	
	private String Code;
	
	private  DistrictTypeMode(String Code){
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
