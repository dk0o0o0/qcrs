package com.linkus.capital.util.enumtype.bill;



/**
 * 将票据业务 在业务处理过程中 每一步变更的状态值逐一做配置。
 *
 * <p>Title com.linkus.capital.util.enumtype.bill.BillFlowStatusMode</p>
 * <p>Description </p>
 * <p>Company linkus </p>
 * <p>Copyright Copyright(c)2016</p>
 * @author storm.li
 * @create time: 2016年4月21日 下午6:43:45
 * @version 1.0
 * 
 * @modified records:
 */
public enum BillFlowStatusMode {
	
	/**	经办时新持仓更新字段模式 */
	NEWBOOKSTATUS("经办时新持仓更新字段模式"),
	/**	 经办时原始持仓更新字段模式 */
	OLDBOOKSTATUS("经办时原始持仓更新字段模式"),
	/** 出入库时新票据基础信息更新字段模式 */
	NEWNOTESTATUS("出入库时新票据基础信息更新字段模式"),
	/** 出入库时合同信息更新字段模式 */
	NEWCNTRSTATUS("出入库时合同信息更新字段模式");
	
	private String CHName;

	private BillFlowStatusMode(String CHName) {
		this.CHName = CHName;
	}

	public String getCHName() {
		return CHName;
	}

	public void setCHName(String CHName) {
		this.CHName = CHName;
	}
}
