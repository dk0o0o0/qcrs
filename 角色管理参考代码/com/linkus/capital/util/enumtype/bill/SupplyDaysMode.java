package com.linkus.capital.util.enumtype.bill;


/**=====================================================
 * 补充天数
 *=======================================================
 */
public enum SupplyDaysMode {
	/**
	 * 加补充天数
	 */
	ADD_SUPPLYDAYS("1"),
	/**
	 * 不加补充天数
	 */
	NOTADD_SUPPLYDAYS("0");
	
	
	private String Code;
	
	private  SupplyDaysMode(String Code){
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
