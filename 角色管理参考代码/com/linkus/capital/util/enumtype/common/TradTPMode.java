package com.linkus.capital.util.enumtype.common;

/**
 *
 * <p>Title com.linkus.capital.util.enumtype.bond.TRADTPMode</p>
 * <p>Description 交易方向/类型</p>
 * <p>Company linkus </p>
 * <p>Copyright Copyright(c)2016</p>
 * @author 申铭
 * @create time: 2016年4月26日 下午4:34:12
 * @version 1.0
 * 
 * @modified records:
 */
public enum TradTPMode {
	/**正回购/质押式（封闭式）*/
	PoRepos("0"),
	/**逆回购/类质押式（开放式）*/
	ReRepos("1");
	
	private String code;
	
	private TradTPMode(String code){
		this.code = code;
	}
	
	public String getCode(){
		return this.code;
	}
}
