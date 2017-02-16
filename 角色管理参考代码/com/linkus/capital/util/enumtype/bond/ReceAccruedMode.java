package com.linkus.capital.util.enumtype.bond;

/**
 *  
 * <p>Title com.linkus.capital.util.enumtype.bond.ReceAccruedMode</p>
 * <p>应收应计标识 </p>
 * <p>Company linkus </p>
 * <p>Copyright Copyright(c)2016</p>
 * @author tsj
 * @create time: 2016年4月14日 下午4:09:26
 * @version 1.0
 * 
 * @modified records:
 */
public enum ReceAccruedMode {
	
	/**
	 * 应收类型
	 */
	RECE("0"),
	/**
	 * 应计类型
	 */
	ACCRUED("1");
	
	private String Code;

	private  ReceAccruedMode(String Code){
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
