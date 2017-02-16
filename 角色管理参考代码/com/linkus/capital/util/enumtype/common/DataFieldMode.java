package com.linkus.capital.util.enumtype.common;

public enum DataFieldMode {
	
	FACE_AMOUNT("faceAmount","XX"),
	TRANS_AMOUNT("transAmount","XX"),
	COST_AMOUNT("costAmount","XX"),
	RETURN_INTERESTAMOUNT("returnInterestAmount","xx"),
	BONDAM("BONDAM","XX"),
	INTEREST_ADJUST("interestAdjust","XX"),
	NET_PRICE_AMOUNT("netPriceAmount","XX"),
	RECE_ACCRUED_INTEREST("receAccruedInterest","XX"),
	BRCHNO("brchno","当前单位"),
	TEAMID("teamid","投组持仓ID");
	
	private String CHName;
	private String fieldName;
	private  DataFieldMode(String fieldName ,String CHName){
		this.fieldName = fieldName;
		this.CHName = CHName;
	}
	
	public String getFieldName() {
		return fieldName;
	}

	@Override
	public String toString(){
		return name();
	}
	
	public String getCHName(){
		return this.CHName;
	}
}
