package com.linkus.capital.util.enumtype.bond;

/**
 *
 * <p>Title com.linkus.capital.util.enumtype.common.CreditRatingMode</p>
 * <p>Description 信用评级</p>
 * <p>Company linkus </p>
 * <p>Copyright Copyright(c)2016</p>
 * @author 申铭
 * @create time: 2016年4月14日 下午3:50:11
 * @version 1.0
 * 
 * @modified records:
 */
public enum CreditRatingMode {
	/**A-*/
	A_MINUS("A-"),
	/**A*/
	A("A"),
	/**A+*/
	A_PLUS("A+"),
	/**AA-*/
	AA_MINUS("AA-"),
	/**AA*/
	AA("AA"),
	/**AA+*/
	AA_PLUS("AA+"),
	/**AAA*/
	AAA("AAA"),
	/**BBB*/
	BBB("BBB");
	
	private String value;
	
	private CreditRatingMode(String value){
		this.value = value;
	}
	
	public String getValue(){
		return this.value;
	}
}
