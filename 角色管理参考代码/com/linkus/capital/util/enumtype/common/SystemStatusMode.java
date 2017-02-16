package com.linkus.capital.util.enumtype.common;

/**=====================================================
 * 系统状态
 *=====================================================
 */
public enum SystemStatusMode{
	
	/**
	 * 运营
	 */
	OPERATE("运营"),
	/**
	 * 日终
	 */
	ENDDAY("日终"),
	/**
	 * 日始
	 */
	STARTDAY("日始"),
	/**
	 * 跑批中
	 */
	RUNBATCHIN("跑批中"),
	/**
	 * 跑批失败
	 */
	RUNBATCHERROR("跑批失败");
	private String CHName;
	
	private  SystemStatusMode(String CHName){
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
