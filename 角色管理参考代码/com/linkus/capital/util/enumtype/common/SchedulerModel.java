package com.linkus.capital.util.enumtype.common;

/**	
 *	定时任务枚举类
 * <p>Title com.linkus.capital.util.enumtype.SchedulerModel</p>
 * <p>Description </p>
 * <p>Company linkus </p>
 * <p>Copyright Copyright(c)2016</p>
 * @author 
 * @create time: 2016年6月6日 上午11:01:26
 * @version 1.0
 * 
 * @modified records:
 */
public enum SchedulerModel {
	/**
	 * 关闭
	 */
	DISPATC_TYPE_0("0"),
	
	/**
	 * 开启
	 */
	DISPATC_TYPE_1("1");

	private String value;

	private SchedulerModel(String value) {
		this.value = value;
	}

	public String getValue() {
		return value;
	}

}
