package com.linkus.capital.util.enumtype.bond;

/**
 *
 * <p>Title com.linkus.capital.util.enumtype.bond.TransMode</p>
 * <p>Description 交易形式</p>
 * <p>Company linkus </p>
 * <p>Copyright Copyright(c)2016</p>
 * @author 申铭
 * @create time: 2016年4月14日 上午10:54:12
 * @version 1.0
 * 
 * @modified records:
 */
public enum TransMode {
	/**封闭式*/
	OBTURATE("0"),
	/**开放式*/
	OPENING("1"),
	/**买断式**/
	BUYOUT("2");
	
	private String value;
	
	private TransMode(String value){
		this.value = value;
	}
	
	public String getValue(){
		return this.value;
	}
}
