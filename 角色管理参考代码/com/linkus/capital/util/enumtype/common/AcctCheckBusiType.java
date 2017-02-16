package com.linkus.capital.util.enumtype.common;

import java.util.EnumSet;
import java.util.HashMap;
import java.util.Map;

/**
 *	对账业务类型
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
public enum AcctCheckBusiType {
	
	/** 债券 **/
	BUSI_BOND("BOND","债券"),

	/** 票据 **/
	BUSI_BILL("BILL","票据"),

	/** 同业 **/
	BUSI_INTERBANK("INTERBANK","同业");

	private String value;
	private String desc;
	public static Map<String, String> acctCheckBusiTypeMap = new HashMap<String, String>();

	static {
		for (AcctCheckBusiType acctCheckBusiType : EnumSet.allOf(AcctCheckBusiType.class)) {
			acctCheckBusiTypeMap.put(acctCheckBusiType.getValue(), acctCheckBusiType.getDesc());
		}
	}

	private AcctCheckBusiType(String value,String desc) {
		this.value = value;
		this.desc = desc;
	}

	public String getValue() {
		return value;
	}

	public String getDesc() {
		return desc;
	}

	@Override
	public String toString() {
		return name();
	}
	
}
