package com.linkus.capital.util.enumtype.bill;
/*****
 * 电票提示付款成功标记
 */
public enum EditStatusMode {
	/**对方未签收*/
	NO_RETURN("0"),
	/**对方已签收*/
	DID_RETURN("1");
	
	private String value;
	
	private EditStatusMode(String value){
		this.value = value;
	}
	
	public String getValue(){
		return this.value;
	}
}
