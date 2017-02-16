package com.linkus.capital.util.enumtype.bill;

/**
 * 是否长沙本部标记
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
public enum IsHeadquatersFlagMode {
	/**
	 * 非长沙本部
	 */
	NOTHEADQUATERS("0"),
	/**
	 * 是长沙本部
	 */
	ISHEADQUATERS("1");
	
	private String Code;
	
	private  IsHeadquatersFlagMode(String Code){
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
