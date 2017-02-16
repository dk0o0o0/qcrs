package com.linkus.capital.util.enumtype.interbank;

/**
 *
 * <p>Title com.linkus.capital.util.enumtype.bond.PaymentInterCycleMode</p>
 * <p>Description 付息频率/周期</p>
 * <p>Company linkus </p>
 * <p>Copyright Copyright(c)2016</p>
 * @author 陶述杰
 * @create time: 2016年4月14日 下午4:16:33
 * @version 1.0
 * 
 * @modified records:
 */
public enum PaymentInterCycleMode {
	/**到期还本付息*/
	MATURITY_CAPITAL_PAYINTER("0"),
	/**一个月*/
	A_MONTH("1"),
	/**三个月*/
	THREE_MONTHS("3"),
	/**半年*/
	HALF_A_YEAR("6"),
	/**一年*/
	A_YEAR("12");
	
	private String value;
	
	private PaymentInterCycleMode(String value){
		this.value = value;
	}
	
	public String getValue(){
		return this.value;
	}
}
