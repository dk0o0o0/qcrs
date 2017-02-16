package com.linkus.capital.util.enumtype.bill;
/***
 * 提示付款类型
 * @author ctx04
 *
 */

public enum PayTypeMode {

	/**
	 * 提示付款
	 */
	NORMAL_PAY("01"),
	
	/**
	 * 逾期提示付款
	 */
	OVERDUE_PAY("02");
	
	
	private String Code;
	
	private  PayTypeMode(String Code){
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
