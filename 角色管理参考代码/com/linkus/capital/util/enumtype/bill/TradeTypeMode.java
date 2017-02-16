package com.linkus.capital.util.enumtype.bill;

/**
 *
 * <p>Title com.linkus.capital.util.enumtype.bill.TradeTypeMode</p>
 * <p>Description 交易方向</p>
 * <p>Company linkus </p>
 * <p>Copyright Copyright(c)2016</p>
 * @author 李颖
 * @create time: 2016年4月26日 上午11:01:56
 * @version 1.0
 * 
 * @modified records:
 */
public enum TradeTypeMode {
	
	/**转贴买入:不需要待销账
	 */
	T30003("0"),
	/**转贴卖出:需要待销账
	 */
	T30004("1"),
	/**再贴卖出:需要待销账
	 */
	T30005("1"),
	/**再贴回购:需要待销账
	 */
	T30006("1"),
	/**央行卖票:不需要待销账
	 */
	T30007("0"),
	/**票据系內轉贴:不需要待销账
	 */
	T30008("0"),
	/**票据逆回购:不需要待销账
	 */
	T30009("0"),
	/**票据正回购:需要待销账
	 */
	T30010("1"),
	/**逆回购到期：不销账
	 */
	T30013("0"),
	/**再贴回购到期：不销账
	 */
	T30014("0"),
	/**正回购到期：不销账
	 */
	T30015("0"),
	/**代保管：不销账
	 */
	T30028("0");
	
	private String value;

	private TradeTypeMode(String value) {
		this.value = value;
	}

	public String getValue() {
		return value;
	}

	
	

}
