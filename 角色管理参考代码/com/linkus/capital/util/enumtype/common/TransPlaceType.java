package com.linkus.capital.util.enumtype.common;

/**
 *
 * <p>Title com.linkus.capital.util.enumtype.common.TransPlaceType</p>
 * <p>Description 交易场所类型</p>
 * <p>Company linkus </p>
 * <p>Copyright Copyright(c)2016</p>
 * @author 申铭
 * @create time: 2016年4月14日 上午11:36:56
 * @version 1.0
 * 
 * @modified records:
 */
public enum TransPlaceType {
	/**其他*/
	OTHERS("5","其他"),
	/**中央结算公司*/
	CENTRAL_CLEARING_COMPANY("1","中央结算公司"),
	/**上海清算所*/
	SHANGHAI_CLEARING_HOUSE("2","上海清算所"),
	/**上海证券交易所*/
	SHANGHAI_STOCK_EXCHANGE("3","上海证券交易所"),
	/**深圳证券交易所*/
	SHENZHEN_STOCK_EXCHANGE("4","深圳证券交易所");
	
	private String value;
	
	private String chName;
	
	private TransPlaceType(String value,String chName){
		this.value = value;
		this.chName = chName;
	}
	
	public String getValue(){
		return this.value;
	}

	public String getChName() {
		return chName;
	}
	
}
