package com.linkus.capital.util.enumtype.common;

/**=====================================================
 * SQL条件模式
 *=====================================================
 */
public enum RestrictionMode{
	
	/**
	 * 条件中为空的条件
	 */
	ISNULL("需为空"),
	/**
	 * 条件中不为空的条件
	 */
	ISNOTNULL("不能为空"),
	/**
	 * 条件中为空或者为某值
	 */
	EQORISNULL("为空或者为某值"),
	/**
	 * 条件中为空的条件
	 */
	NOTEQ("不等于"),
	/**
	 * 排序规则
	 */
	GROUPBY("排序");
	
	private String CHName;
	
	private  RestrictionMode(String CHName){
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

