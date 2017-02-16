package com.linkus.capital.util.enumtype.common;

/**=====================================================
 * 待处理金额类型模式
 *=======================================================
 */
public enum PretreatedMode{
	
	/**
	 * 需要进行代购入 或者待回购操作类型
	 */
	NEEDPRETREAT("进行代购入或者待回购操作");
	
	private String CHName;
	
	private  PretreatedMode(String CHName){
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
