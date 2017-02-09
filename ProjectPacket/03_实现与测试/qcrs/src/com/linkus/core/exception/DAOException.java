package com.linkus.core.exception;

public class DAOException extends CMException{
	/**
	 * 
	 */
	private static final long serialVersionUID = -4388495022484539485L;

	public DAOException() {
		super("数据库访问操作错误，请重试或联系系统管理员！");
	}

	public DAOException(String msg) {
		super(msg);
	}

	public DAOException(Exception msg) {
		super(msg);
	}
}
