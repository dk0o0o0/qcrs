package com.linkus.capital.util.enumtype.bond;

/**
 *
 * <p>Title com.linkus.capital.util.enumtype.bond.OptionTypeMode</p>
 * <p>Description 选择权类别</p>
 * <p>Company linkus </p>
 * <p>Copyright Copyright(c)2016</p>
 * @author 申铭
 * @create time: 2016年4月14日 下午3:45:30
 * @version 1.0
 * 
 * @modified records:
 */
public enum OptionTypeMode {
	/**投资人*/
	INVESTER("0"),
	/**发行人*/
	ISSUANCER("1");
	
	private String value;
	
	private OptionTypeMode(String value){
		this.value = value;
	}
	
	public String getValue(){
		return this.value;
	}
}
