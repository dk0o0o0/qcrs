package com.linkus.capital.util.enumtype.bill;

/**
 * 是否剔除标志
 * <p>Title com.linkus.capital.util.enumtype.bill.AdjustFlagMode</p>
 * <p>Description </p>
 * <p>Company linkus </p>
 * <p>Copyright Copyright(c)2016</p>
 * @author 张春艳
 * @create time: 2016年8月11日 下午4:41:10
 * @version 1.0
 * 
 * @modified records:
 */
public enum WipedOutFlagMode {
	/**
	 * 赎回提前
	 */
	WIPEDOUT("1"),
	/**
	 * 强制计提
	 */
	NOT_WIPEDOUT("0");
	
	private String Code;
	
	private  WipedOutFlagMode(String Code){
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
