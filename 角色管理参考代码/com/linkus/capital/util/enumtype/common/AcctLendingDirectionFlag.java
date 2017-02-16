package com.linkus.capital.util.enumtype.common;

/**
 *	借贷标识
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
public enum AcctLendingDirectionFlag {
	 
	/** 记账方向标识 枚举类型定义
	 * 
	 * C:贷方
	 * D:借方
	 * P:表外增加
	 * R:表外减少
	 * A:系统内部
	 * S:
	 * **/
	
	C("贷方"),
	
	D("借方"),
	
	P("表外增加"),
	
	R("表外减少"),
	
	A("系统内部"),
	
	S("");
	

	private String value;

	private AcctLendingDirectionFlag(String value) {
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
