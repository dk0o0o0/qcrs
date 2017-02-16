package com.linkus.capital.util.enumtype.interbank;

/**
*
* <p>Title com.linkus.capital.util.enumtype.interbank.QuarterMode</p>
* <p>Description 季度</p>
* <p>Company linkus </p>
* <p>Copyright Copyright(c)2016</p>
* @author: 任康
* @create time: 2016年12月6日11:34:05
* @version 1.0
* 
* @modified records:
*/
public enum QuarterMode {
	/**第一季度*/
	FIRST_QUARTER("1"),
	/**第二季度*/
	SECOND_QUARTER("2"),
	/**第三季度*/
	THIRD_QUARTER("3"),
	/**第四季度*/
	FOURTH_QUARTER("4");
	
	private String code;

	private QuarterMode(String code) {
		this.code = code;
	}

	public String getCode() {
		return code;
	}
}
