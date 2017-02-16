package com.linkus.capital.util.enumtype.common;

/**=====================================================
 * 付息方式类型
 *=======================================================
 */
public enum TemplateTypeMode{
	/**
	 * 贴现单位付息
	 */
	PARTY_PAY("0"),
	/**
	 * 第三方支付
	 */
	THIRDPARTY_PAY("1"),
	
	/**
	 * 协议付息
	 */
	PROTOCOL_PAY("2");
	
	
	
	private String Code;
	
	private  TemplateTypeMode(String Code){
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
