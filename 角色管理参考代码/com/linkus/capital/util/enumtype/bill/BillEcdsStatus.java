package com.linkus.capital.util.enumtype.bill;

/**
 * <p>Title com.linkus.capital.msg.ecds.util.BillEcdsStatus</p>
 * <p>Description </p>
 * <p>Company linkus </p>
 * <p>Copyright Copyright(c)2016</p>
 * @author 杨超文
 * @create time: 2016年7月19日上午11:01:59
 * @version 1.0
 * 
 * @modified records:
 */
public enum BillEcdsStatus {
	/**
	 * 待处理
	 */
	TODO("TODO","待处理"),
	
	/**
	 * 处理中
	 */
	DOING("DOING","处理中"),
	
	/**
	 * 待回复
	 */
	RESPON("RESPON","待回复"),
	
	/**
	 * 拒绝签收
	 */
	REFUSE("REFUSE","拒绝签收"),
	
	/**
	 * 作废
	 */
	CANCEL("CANCEL","作废"),
	
	/**
	 * 处理失败
	 */
	DOFAIL("DOFAIL","处理失败"),
	
	/**
	 * 清分失败
	 */
	CLEARFAIL("CLEARFAIL","清分失败"),
	
	/**
	 * 处理成功
	 */
	SUCCESS("SUCCESS","处理成功"),
	
	/**
	 * 撤回状态
	 */
	REVOKE("REVOKE","撤销成功");

	private String code;
	
	private String desc;

	private BillEcdsStatus(String code, String desc) {
		this.code = code;
		this.desc = desc;
	}

	public String getCode() {
		return code;
	}
	
	public String getDesc() {
		return desc;
	}
}
