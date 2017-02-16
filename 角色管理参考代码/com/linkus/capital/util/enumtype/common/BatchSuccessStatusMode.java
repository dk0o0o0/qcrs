package com.linkus.capital.util.enumtype.common;

/**
 *
 * <p>Title com.linkus.capital.util.enumtype.common.BatchSuccessStatusMode</p>
 * <p>Description </p>
 * <p>Company linkus </p>
 * <p>Copyright Copyright(c)2016</p>
 * @author tsj
 * @create time: 2016年6月18日 下午3:45:48
 * @version 1.0
 * 
 * @modified records:
 */
public enum BatchSuccessStatusMode {
	/**
	 * 跑批成功
	 * @return 
	 */
	RUN_SUCC("跑批成功"),
	
	/**
	 *跑批未成功
	 */
	RUN_START("跑批未开始");

	private String value;

	private BatchSuccessStatusMode(String value) {
		this.value = value;
	}

	public String getValue() {
		return value;
	}
}
