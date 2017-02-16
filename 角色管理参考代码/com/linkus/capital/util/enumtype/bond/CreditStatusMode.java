package com.linkus.capital.util.enumtype.bond;

/**
 * 是否授信
 * <p>Title com.linkus.capital.util.enumtype.bond.CreditStatusMode</p>
 * <p>Description </p>
 * <p>Company linkus </p>
 * <p>Copyright Copyright(c)2016</p>
 * @author 任康
 * @create time: 2016年9月2日 上午9:52:30
 * @version 1.0
 * 
 * @modified records:
 */
public enum CreditStatusMode {
	
	/**不授信**/
	NOT_NEED_CREDIT("0"),
	/**增加授信**/
	NEED_CREDIT("1");
	
	private String value;

	private CreditStatusMode(String value){
		this.value = value ;
	}
	
	public String getValue(){
		return this.value;
	}
	
	
}
