package com.linkus.capital.util.interBank;

/**
 *
 * <p>Title com.linkus.capital.util.interBank.productRateStandardMode</p>
 * <p>Description </p>
 * <p>Company linkus </p>
 * <p>Copyright Copyright(c)2016</p>
 * @author 李颖
 * @create time: 2016年5月24日 上午9:56:42
 * @version 1.0
 * 
 * @modified records:
 */
public enum ProductRateStandardMode {
	/**计提基准 360**/
	standard_360("360"),
	/**计提基准 365**/
	standard_365("365");
	private String Code;
	private  ProductRateStandardMode(String Code){
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
