package com.linkus.core.exception;

public class CMException extends Exception{
	/**
	 * 
	 */
	private static final long serialVersionUID = 2567014667019240020L;
	public CMException() {
		super("   --:: 系统异常 ::--   ");
	}
	
	public CMException(String msg) {
		super("   --:: 系统异常 ::--   "+msg);
	}
	public CMException(Exception msg) {
		super(msg);
	}
}
