package com.linkus.capital.util.enumtype.bill;

/**
 * 赎回类型
 * <p>Title com.linkus.capital.util.enumtype.bill.AdjustFlagMode</p>
 * <p>Description </p>
 * <p>Company linkus </p>
 * <p>Copyright Copyright(c)2016</p>
 * @author 李颖
 * @create time: 2016年8月11日 下午4:41:10
 * @version 1.0
 * 
 * @modified records:
 */
public enum AdjustFlagMode {
	/**
	 * 赎回提前
	 */
	NORMAL("0"),
	/**
	 * 强制计提
	 */
	FORWARD("1");
	
	private String Code;
	
	private  AdjustFlagMode(String Code){
		this.Code = Code;
	}
	
	@Override
	public String toString(){
		return name();
	}
	
	public String getCode(){
		return this.Code;
	}
	

}
