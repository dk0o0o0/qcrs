package com.linkus.capital.util.enumtype.common;

/**
 * 消息锁定状态
 *
 * <p>Title com.linkus.capital.util.MsgLockStatus</p>
 * <p>Description </p>
 * <p>Company linkus </p>
 * <p>Copyright Copyright(c)2016</p>
 * @author 小道
 * @create time: 2016年6月30日 上午11:21:19
 * @version 1.0
 * 
 * @modified records:
 */
public enum LockStatus {

	LOCK("1", "锁定"), // 锁定状态
	UNLOCK("0", "解锁"), // 解锁状态
	EXPLOCK("2", "异常锁定");// 异常锁定

	private String status;
	private String statusDesc;

	private LockStatus(String status, String statusDesc) {
		this.status = status;
		this.statusDesc = statusDesc;
	}

	public String getStatus() {
		return status;
	}

	public String getStatusDesc() {
		return statusDesc;
	}
}
