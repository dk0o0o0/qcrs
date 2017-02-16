package com.linkus.capital.util.enumtype.common;

	
public enum BookCreateMode {
	CREATE_BY_CNTR("按照合同来建仓");

	private String CHName;

	private BookCreateMode(String CHName) {
		this.CHName = CHName;
	}

	public String getCHName() {
		return CHName;
	}

	public void setCHName(String CHName) {
		this.CHName = CHName;
	}
}
