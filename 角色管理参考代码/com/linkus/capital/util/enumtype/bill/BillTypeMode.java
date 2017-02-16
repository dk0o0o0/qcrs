package com.linkus.capital.util.enumtype.bill;

public enum BillTypeMode {

	/**
	 * 电子汇票
	 */
	ELECTRONIC_BILL("1"),
	
	/**
	 * 纸票
	 */
	PAPERY_BILL("0");
	
	
	private String Code;
	
	private  BillTypeMode(String Code){
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
