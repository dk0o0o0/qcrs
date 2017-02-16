package com.linkus.capital.util.enumtype.common;

/**
 *
 * <p>Title com.linkus.capital.util.enumtype.common.SettleDateType</p>
 * <p>Description 清算速度</p>
 * <p>Company linkus </p>
 * <p>Copyright Copyright(c)2016</p>
 * @author 申铭
 * @create time: 2016年4月14日 上午10:50:22
 * @version 1.0
 * 
 * @modified records:
 */
public enum SettleDateTypeMode {
	/**T+0*/
	T0("0"),
	/**T+1*/
	T1("1");
	
	private String value;
	
	private SettleDateTypeMode(String value){
		this.value = value;
	}
	
	public String getValue(){
		return this.value;
	}
}
