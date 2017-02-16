package com.linkus.capital.util.enumtype.common;

/**=====================================================
 * 授信扣减方式规范
 *=======================================================
 */
public enum OccupyLimitType{
	
	/**
	 * 扣减对手方
	 */
	counterParty("0","对手方"),
	/**
	 * 扣减发行人
	 */
	acceptBank("1","发行人");
	
	
	private String Code;
	
	private String CHName;
	
	private  OccupyLimitType(String Code,String CHName){
		this.Code = Code;
		this.CHName = CHName;
	}
	
	@Override
	public String toString(){
		return name();
	}
	
	public String getCode(){
		return this.Code;
	}

	public String getCHName() {
		return CHName;
	}
	
	
}
