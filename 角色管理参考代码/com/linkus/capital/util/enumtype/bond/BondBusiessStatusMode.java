package com.linkus.capital.util.enumtype.bond;

/**
 *
 * <p>Title com.linkus.capital.util.enumtype.bond.BondBusiessStatus</p>
 * <p>Description 是否债券融入</p>
 * <p>Company linkus </p>
 * <p>Copyright Copyright(c)2016</p>
 * @author 申铭
 * @create time: 2016年4月14日 上午11:08:19
 * @version 1.0
 * 
 * @modified records:
 */
public enum BondBusiessStatusMode {
	/**自营资产*/
	AUTOTROPHY_ASSETS("0"),
	/**债券借贷资产*/
	CREDIT_ASSETS("1");
	
	private String value;
	
	private BondBusiessStatusMode(String value){
		this.value = value ;
	}
	
	public String getValue(){
		return this.value;
	}
}
