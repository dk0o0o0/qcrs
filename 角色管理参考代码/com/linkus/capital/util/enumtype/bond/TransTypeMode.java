package com.linkus.capital.util.enumtype.bond;

/**
 *
 * <p>Title com.linkus.capital.util.enumtype.bond.TransType</p>
 * <p>Description 交易方式</p>
 * <p>Company linkus </p>
 * <p>Copyright Copyright(c)2016</p>
 * @author 申铭
 * @create time: 2016年4月14日 上午11:15:11
 * @version 1.0
 * 
 * @modified records:
 */
public enum TransTypeMode {
	/**询价*/
	ASKPRICE("0"),
	/**匿名点击提交*/
	ANONYMITYSUBMIT("1");
	
	private String value;
	
	private TransTypeMode(String value){
		this.value = value;
	}
	
	public String getValue(){
		return this.value;
	}
}
