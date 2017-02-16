package com.linkus.capital.util.enumtype.common;

/**=====================================================
 * 授权分支行类型
 *=======================================================
 */
public enum AuthorizeTypeMode{
	
	/**
	 * 授权分支行
	 */
	AUTHORIZE("1"),
	
	/**
	 * 非授权分支行
	 */
	NOT_AUTHORIZE("0");
	
	private String Code;
	
	private  AuthorizeTypeMode(String Code){
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
