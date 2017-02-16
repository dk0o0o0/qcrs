package com.linkus.capital.util.enumtype.msg;

/**
 *
 * <p>Title cfetsQuote.TalkType</p>
 * <p>Description 报文动作</p>
 * <p>Company linkus </p>
 * <p>Copyright Copyright(c)2016</p>
 * @author 申铭
 * @create time: 2016年8月2日 下午4:25:55
 * @version 1.0
 * 
 * @modified records:
 */
public enum TalkType {
	/**新报价*/
	NEW("N","新报价"),
	/**修改*/
	REVAMP("R","修改"),
	/**撤销*/
	REPEAL("C","撤销"),
	/**也是撤销*/
	REVOCATION("2","撤销")
	;
	
	private String code;
	
	private String CHName;
	
	private TalkType(String code,String  CHName){
		this.code = code;
		this.CHName = CHName;
	}

	
	public String getCode() {
		return code;
	}

	public String getCHName() {
		return CHName;
	}
	
}
