package com.linkus.capital.util.enumtype.bond;

/**
 * 债券中债报文是否人工处理Mode
 *
 * <p>Title com.linkus.capital.util.enumtype.bond.AmountFlagMode</p>
 * <p>Description </p>
 * <p>Company linkus </p>
 * <p>Copyright Copyright(c)2016</p>
 * @author storm.li
 * @create time: 2016年7月7日 上午11:53:48
 * @version 1.0
 * 
 * @modified records:
 */
public enum ManualHandleFlagMode {
	
	/**本日余额*/
	MANUAL_HANDLE("人工处理"),
	/**上日余额*/
	AUTOMATE("系统自动处理");
	
	private String CHName;
	
	private  ManualHandleFlagMode(String CHName){
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
