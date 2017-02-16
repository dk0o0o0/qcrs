package com.linkus.capital.util.enumtype.common;

/**
 *
 * <p>Title com.linkus.capital.util.enumtype.common.BatchStatusMode</p>
 * <p>系统跑批状态表 </p>
 * <p>Company linkus </p>
 * <p>Copyright Copyright(c)2016</p>
 * @author tsj
 * @create time: 2016年6月18日 下午3:29:25
 * @version 1.0
 * 
 * @modified records:
 */
public enum BatchStatusMode {
	/**
	 * 跑批成功
	 * @return 
	 */
	AUTOMATIC("自动"),
	
	/**
	 *跑批未成功
	 */
	MANUALLY("手动");

	private String value;

	private BatchStatusMode(String value) {
		this.value = value;
	}

	public String getValue() {
		return value;
	}
}
