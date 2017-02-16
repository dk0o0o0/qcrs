package com.linkus.capital.util.enumtype.bond;

/**
 * 债券持有资产类型
 * <p>Title com.linkus.capital.util.enumtype.bond.AssetsTypeMode</p>
 * <p>Description </p>
 * <p>Company linkus </p>
 * <p>Copyright Copyright(c)2016</p>
 * @author tsj
 * @create time: 2016年4月14日 下午3:22:55
 * @version 1.0
 * 
 * @modified records:
 */
public enum InvestTypeMode {
	/**
	 *  债券买入资产类型
	 */
	BUYING("0"),

	/**
	 *  债券借入资产类型
	 */
    BORROW("1");

	
    private String Code;

	private  InvestTypeMode(String Code){
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
