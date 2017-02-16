package com.linkus.capital.util.enumtype.bond;

/**
 *
 * <p>Title com.linkus.capital.util.enumtype.bond.StatexMode</p>
 * <p>Description </p>
 * <p>Company linkus </p>
 * <p>Copyright Copyright(c)2016</p>
 * @author 申铭
 * @create time: 2016年8月3日 下午2:55:09
 * @version 1.0
 * 
 * @modified records:
 */
public enum StatexMode {
	
	/**未复核*/
	NO_INSPECT("0","未复核"),
	/**已复核*/
	HAD_INSPECT("1","已复核");
	
	private String code;
	
	private String CHName;
	
	private StatexMode(String code,String CHName){
		this.code = code;
		this.CHName = CHName;
	}

	public String getCode() {
		return code;
	}

	public String getCHName() {
		return CHName;
	}
	
}
