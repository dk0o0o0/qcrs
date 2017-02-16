package com.linkus.capital.util.enumtype.bill;

/**=====================================================
 * 票据贴现账号状态
 *=======================================================
 */
public enum BillDiscountAcctNoSataus{
	
	// 贴现账号状态（D:注销，UD：未注销）

	ACCTNO_CANCELE("D"), 
	ACCTNO_NOT_CANCELE("UD");
	
	private String Code;
	
	private  BillDiscountAcctNoSataus(String Code){
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
