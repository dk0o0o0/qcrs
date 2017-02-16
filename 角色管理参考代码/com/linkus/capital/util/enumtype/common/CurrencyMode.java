package com.linkus.capital.util.enumtype.common;

/**=====================================================
 * 币种类型
 *=======================================================
 */
public enum CurrencyMode{
	
	/**
	 * 人民币
	 */
	RMB("01","RMB","人民币");
	
	private String Code;
	private String ecdsCode;
	private String CHName;
	
	private  CurrencyMode(String Code, String ecdsCode,String CHName){
		this.Code = Code;
		this.ecdsCode = ecdsCode;
		this.CHName = CHName;
	}
	
	public String getCHName() {
		return CHName;
	}

	@Override
	public String toString(){
		return name();
	}
	
	public String getCode(){
		return this.Code;
	}
	
	public String getEcdsCode() {
		return this.ecdsCode;
	}
}
