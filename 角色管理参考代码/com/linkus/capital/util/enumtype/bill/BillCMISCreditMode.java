package com.linkus.capital.util.enumtype.bill;

/**=====================================================
 * 授信模式规范
 *=====================================================
 */
public enum BillCMISCreditMode{
	
	/**
	 * 授信扣减
	 */
	REDUCE("1","授权扣减"),
	/**
	 * 授信恢复
	 */
	RECOVER("2","授权恢复");
	
	private String code;
	
	private String CHName;
	
	private  BillCMISCreditMode(String code ,String CHName){
		this.CHName = CHName;
		this.code = code;
	}
	
	@Override
	public String toString(){
		return name();
	}
	
	public String getCHName(){
		return this.CHName;
	}

	public String getCode() {
		return code;
	}
}
