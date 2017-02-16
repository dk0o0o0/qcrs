package com.linkus.capital.util.enumtype.common;

/**
 *
 * <p>Title com.linkus.capital.util.enumtype.common.IsComparMode</p>
 * <p>Description </p>
 * <p>Company linkus </p>
 * <p>Copyright Copyright(c)2016</p>
 * @author tsj
 * @create time: 2016年7月7日 上午8:50:21
 * @version 1.0
 * 
 * @modified records:
 */
public  enum IsComparMode {

	BUSSCNTRCOMPAR("1"), // 资金业务系统和匹配表数据核对字段
    ISNULL("NULL");
	private String code;

	private IsComparMode(String code) {
		this.code = code;
	}

	public String getCode() {
		return code;
	}
}
