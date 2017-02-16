package com.linkus.capital.util.enumtype.common;

/**
 *	持仓操作
 * <p>Title com.linkus.capital.util.enumtype.common.BookOperMode</p>
 * <p>Description </p>
 * <p>Company linkus </p>
 * <p>Copyright Copyright(c)2016</p>
 * @author 小道
 * @create time: 2016年4月20日 下午4:05:49
 * @version 1.0
 * 
 * @modified records:
 */
public enum BookOperMode {
	
	NEED_DELETE_IN_RDANDMD("需要删除持仓");
//	NEED_DELETE_IN_RDANDMD("按照合同删除"),
//	NEED_DELETE_IN_RDANDMD("按照明细删除持仓");


	private String CHName;

	private BookOperMode(String CHName) {
		this.CHName = CHName;
	}

	public String getCHName() {
		return CHName;
	}

	public void setCHName(String CHName) {
		this.CHName = CHName;
	}
}
