package com.linkus.capital.util.enumtype.common;

/**=====================================================
 * 自营类型
 *=======================================================
 */
public enum SelfsupportTypeMode{
	
	
	SELFSUPPORT("1"),
	
	NOT_SELFSUPPORT("0");
	
	private String Code;
	
	private  SelfsupportTypeMode(String Code){
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
