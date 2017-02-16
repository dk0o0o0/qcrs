package com.linkus.capital.util.enumtype.bill;

public enum BillNoteIOModifyMode {
	/** 业务出入库后，设置基础表需要同步的字段信息*/
	MODIFY("需要修改");
	
	private String CHName;
	
	private  BillNoteIOModifyMode(String CHName){
		this.CHName = CHName;
	}
	
	@Override
	public String toString(){
		return name();
	}
	
	public String getCHName(){
		return this.CHName;
	}
}
