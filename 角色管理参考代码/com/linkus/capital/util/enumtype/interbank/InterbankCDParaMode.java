package com.linkus.capital.util.enumtype.interbank;

/**
 *
 * <p>Title com.linkus.capital.util.enumtype.interbank.InterbankCDParaMode</p>
 * <p>Description </p>
 * <p>Company linkus </p>
 * <p>Copyright Copyright(c)2016</p>
 * @author 任康
 * @create time: 2016年10月16日 上午11:10:27
 * @version 1.0
 * 
 * @modified records:
 */
public enum InterbankCDParaMode {
	YFAMNT("yfamnt"),
	INADAM("inadam");
	
	private String field;
	
	private  InterbankCDParaMode(String field){
		this.field = field;
	}
	
	@Override
	public String toString(){
		return name();
	}
	
	public String getField(){
		return this.field;
	}
}
