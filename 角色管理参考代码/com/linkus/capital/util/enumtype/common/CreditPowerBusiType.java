package com.linkus.capital.util.enumtype.common;

/**
 * 授信授权业务类型
 *
 * <p>Title com.linkus.capital.util.enumtype.common.CreditPowerBusiType</p>
 * <p>Description </p>
 * <p>Company linkus </p>
 * <p>Copyright Copyright(c)2016</p>
 * @author 小道
 * @create time: 2016年4月13日 下午10:08:39
 * @version 1.0
 * 
 * @modified records:
 */
public enum CreditPowerBusiType {
	BUSI_TYPE_1("1"), 	  // 总额度业务类型
	BUSI_TYPE_200("200"), // 债券
	BUSI_TYPE_300("300"), // 票据
	BUSI_TYPE_500("500"); // 同业

	private String value;

	private CreditPowerBusiType(String value) {
		this.value = value;
	}

	public String getValue() {
		return value;
	}

	@Override
	public String toString() {
		return name();
	}
}
