package com.linkus.capital.util.enumtype.bond;

/**
 *
 * <p>Title com.linkus.capital.util.enumtype.bond.TenderType</p>
 * <p>Description 招标方式</p>
 * <p>Company linkus </p>
 * <p>Copyright Copyright(c)2016</p>
 * @author 申铭
 * @create time: 2016年4月14日 上午11:48:25
 * @version 1.0
 * 
 * @modified records:
 */
public enum TenderTypeMode {
	/**利率招标 */
	INTERESTRATE_BIDDING("1"),
	/**利差招标*/
	SPREAD_BIDDING("2"),
	/**价格招标 */
	PRICE_BIDDING("3"),
	/**数量招标*/
	QUANTITY_BIDDING("4");
	
	private String value;
	
	private TenderTypeMode(String value){
		this.value = value;
	}
	
	public String getValue(){
		return this.value;
	}
}
