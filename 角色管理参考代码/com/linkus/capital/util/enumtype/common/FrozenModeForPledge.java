package com.linkus.capital.util.enumtype.common;

/**
 * 债券融入冻结处理
 *
 * <p>Title com.linkus.capital.util.enumtype.common.FrozenModeForPledge</p>
 * <p>Description </p>
 * <p>Company linkus </p>
 * <p>Copyright Copyright(c)2016</p>
 * @author storm.li
 * @create time: 2016年5月3日 上午11:05:55
 * @version 1.0
 * 
 * @modified records:
 */
public enum FrozenModeForPledge {

	/**
	 * 冻结
	 */
	FROZEN("冻结"),
	/**
	 * 冻结恢复
	 */
	FROZEN_RECOVER("冻结恢复");
	
	
	private String CHName;
	
	private  FrozenModeForPledge(String CHName){
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
