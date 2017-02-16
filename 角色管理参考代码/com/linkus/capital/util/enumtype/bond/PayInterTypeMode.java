package com.linkus.capital.util.enumtype.bond;

/**
 *
 * <p>Title com.linkus.capital.common.calcul.bond.service.impl.BondPayInterType</p>
 * <p>Description 债券付息方式</p>
 * <p>Company linkus </p>
 * <p>Copyright Copyright(c)2016</p>
 * @author 申铭
 * @create time: 2016年3月22日 下午5:33:15
 * @version 1.0
 * 
 * @modified records:
 */
public enum PayInterTypeMode {
	/** 到期还本付息 **/
	MATURITY_CAPITAL_PAYINTER(0),

	/** 固定利率 **/
	FIXED_INTEREST_RATE(1),

	/** 浮动利率 **/
	FLOTING_INTEREST_RATE(2),

	/** 贴现式 **/
	DISCOUNT_INTEREST_RATE(3),

	/** 零息式 **/
	ZERO_INTEREST_RATE(4);

	private int value;

	private PayInterTypeMode(int value) {
		this.value = value;
	}

	public int getValue() {
		return value;
	}
	
	public String getTheValue(){
		return value+"";
	}
}
