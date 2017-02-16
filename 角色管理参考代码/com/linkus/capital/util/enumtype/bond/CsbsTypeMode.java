package com.linkus.capital.util.enumtype.bond;

/**
 *
 * <p>Title com.linkus.capital.util.enumtype.bond.CsbsTypeMode</p>
 * <p>Description 中债登直联类型</p>
 * <p>Company linkus </p>
 * <p>Copyright Copyright(c)2016</p>
 * @author 申铭
 * @create time: 2016年4月26日 下午4:00:00
 * @version 1.0
 * 
 * @modified records:
 */
public enum CsbsTypeMode {
	/**直连*/
	DIRECT("T"),
	/**非直连*/
	NON_DIRECT("F");
	
	private String value;
	
	private CsbsTypeMode(String value){
		this.value = value;
	}
	
	public String getValue(){
		return this.value;
	}
}
