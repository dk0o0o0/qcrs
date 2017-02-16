package com.linkus.capital.util.enumtype.msg;

/**
 *
 * <p>Title com.linkus.capital.msg.util.enumtype.CompResult</p>
 * <p>Description  匹配结果的枚举  用该枚举的code属性来当Map的key 防止传值时key写错</p>
 * <p>Company linkus </p>
 * <p>Copyright Copyright(c)2016</p>
 * @author 申铭
 * @create time: 2016年6月3日 下午4:48:49
 * @version 1.0
 * 
 * @modified records:
 */
public enum CompResult {
	/**是否完全匹配的标志*/
	WHOLE_COMP_FLAG("wholeComparison"),
	/**资金端的字段集合*/
	CPMS2("cpms2"),
	/**中债登解析的数据字段集合*/
	MSG("msg"),
	/**每组数据是否匹配的集合*/
	IF_EQUELS("ifEquels");
	
	private String code;
	
	private CompResult(String code){
		this.code = code;
	}
	
	public String getCode(){
		return this.code;
	}
}
