package com.linkus.capital.util.enumtype.bill;

public enum BillNoteType {
	
	AC01_1007001("AC01", "1007001", "银行承兑汇票"),
	
	AC02_1007002("AC02", "1007002", "商业承兑汇票");
	
	private String ecdsCode;
	
	private String cpmsCode;
	
	private String desc;
	
	private BillNoteType(String ecdsCode, String cpmsCode, String desc) {
		this.ecdsCode = ecdsCode;
		this.cpmsCode = cpmsCode;
		this.desc = desc;
	}

	public String getEcdsCode() {
		return ecdsCode;
	}

	public void setEcdsCode(String ecdsCode) {
		this.ecdsCode = ecdsCode;
	}

	public String getCpmsCode() {
		return cpmsCode;
	}

	public void setCpmsCode(String cpmsCode) {
		this.cpmsCode = cpmsCode;
	}

	public String getDesc() {
		return desc;
	}

	public void setDesc(String desc) {
		this.desc = desc;
	}
	
}