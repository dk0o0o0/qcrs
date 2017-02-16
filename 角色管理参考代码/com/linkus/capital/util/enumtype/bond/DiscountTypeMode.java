package com.linkus.capital.util.enumtype.bond;

/**
 * 
 * <p>Title com.linkus.capital.util.enumtype.bond.AssetsTypeMode</p>
 * <p>债券贴息类型 </p>
 * <p>Company linkus </p>
 * <p>Copyright Copyright(c)2016</p>
 * @author tsj
 * @create time: 2016年4月14日 下午3:22:55
 * @version 1.0
 * 
 * @modified records:
 */
public enum DiscountTypeMode {
	/**
	 *  贴息式
	 */
	YES("Y"),

	/**
	 *  非贴息式
	 */
	NO("N");

	

	private String Code;

	private  DiscountTypeMode(String Code){
		this.Code = Code;
	}

	@Override
	public String toString(){
		return name();
	}

	public String getCode(){
		return this.Code;
	}
}
