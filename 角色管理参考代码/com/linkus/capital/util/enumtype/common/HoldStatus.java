package com.linkus.capital.util.enumtype.common;

/**
 * 消息锁定状态
 *
 * <p>Title com.linkus.capital.util.MsgLockStatus</p>
 * <p>Description </p>
 * <p>Company linkus </p>
 * <p>Copyright Copyright(c)2016</p>
 * @author yangk
 * @create time: 2016年11月03日 上午11:21:19
 * @version 1.0
 * 
 * @modified records:
 */
public enum HoldStatus {

	HOLD("1"), // 把持状态
	RELEASE("0");// 释放状态 

	private String status;

	private HoldStatus(String status) {
		this.status = status;
	}

	public String getStatus() {
		return status;
	}
}
