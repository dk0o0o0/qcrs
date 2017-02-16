package com.linkus.capital.util.enumtype.common;

/**
 *	客户账分录枚举信息
 * <p>Title com.linkus.capital.common.account.tool.AcctEntryCustomerAcct</p>
 * <p>Description </p>
 * <p>Company linkus </p>
 * <p>Copyright Copyright(c)2016</p>
 * @author 
 * @create time: 2016年4月28日 下午3:41:38
 * @version 1.0
 * 
 * @modified records:
 */
public enum AcctEntryCustomerAcct {
	
	/** 账号打头类型定义 --客户账 **/
	CUST_ACCTNO_TYPE_0("800"),

	/** 客户账科目号科目号(贴现) **/
	CUST_ACCTNO_SUBJECTNO_0("30010702"),

	/** 模板名 **/
	CUST_ACCTNO_TEMPLATE_NAME("zq_summon.fr3");

	private String value;

	private AcctEntryCustomerAcct(String value) {
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
