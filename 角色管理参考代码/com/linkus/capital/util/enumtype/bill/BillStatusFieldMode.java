package com.linkus.capital.util.enumtype.bill;

public enum BillStatusFieldMode {

	INVALID_STATUS("invalidStatus",""),
	BILL_LOCK_STATUS("billLockStatus",""), 
	BILL_STATUS("billStatus",""),
	INPUT_USER_ID("inputUserId",""),
	STOCK_DATE("stockDate",""),
	IN_STOCK_OPER_USER_ID("inStockOperUserId","入库人ＩＤ"),
	OUT_STOCK_OPER_USER_ID("outStockOperUserId","出库人ＩＤ"),
	COLLECT_STATUS("collectStatus","托收状态"),  
	TRANS_DATE("transDate","记账日期"),
	ACCT_USER_ID("acctUserId","记账人员ＩＤ"),
	OUT_STOCK_DATE("outStockDate","出库日期"),
	MATURITY_DATE("maturityDate","到期日");
	
	private String CHName;
	private String fieldName;
	private  BillStatusFieldMode(String fieldName , String CHName){
		this.fieldName = fieldName;
		this.CHName = CHName;
	}
	
	@Override
	public String toString(){
		return name();
	}
	public String getFieldName(){
		return this.fieldName;
	}
	
	public String getCHName(){
		return this.CHName;
	}
}
