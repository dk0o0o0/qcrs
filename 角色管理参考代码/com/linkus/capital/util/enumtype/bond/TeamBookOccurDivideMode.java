package com.linkus.capital.util.enumtype.bond;

/**=====================================================
 * 投组持仓发生额切分规则模式
 *=======================================================
 */
public enum TeamBookOccurDivideMode{
	
	/**
	 * 业务无合同信息，按照持仓和投组持仓进行切分，债券 收息、到期、估值使用
	 */
	NO_TEAMBOOKITEM("业务无合同信息，按照持仓和投组持仓进行切分"),
	
	NO_TEAMBOOK("业务无投组持仓");

	private String CHName;
	
	private  TeamBookOccurDivideMode(String CHName){
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
