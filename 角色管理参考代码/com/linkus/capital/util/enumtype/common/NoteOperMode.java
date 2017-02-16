package com.linkus.capital.util.enumtype.common;

/**
 * 票据基础信息操作模式
 *
 * <p>Title com.linkus.capital.util.enumtype.common.NoteOperMode</p>
 * <p>Description </p>
 * <p>Company linkus </p>
 * <p>Copyright Copyright(c)2016</p>
 * @author storm.li
 * @create time: 2016年4月20日 下午7:59:32
 * @version 1.0
 * 
 * @modified records:
 */
public enum NoteOperMode {

	/** 在更正时，删除票据基础信息 */
	DELETE_OPER_MD("在更正时，删除票据基础信息"),
	/** 在终止业务时，将票据基础信息设置为失效 */
	MODIFY_OPER_RD("在终止业务时，将票据基础信息设置为失效");

	private String CHName;

	private NoteOperMode(String CHName) {
		this.CHName = CHName;
	}

	public String getCHName() {
		return CHName;
	}

	public void setCHName(String CHName) {
		this.CHName = CHName;
	}
}
