package com.linkus.capital.util.enumtype.bill;

/**
 *  交易类型
 * <p>Title com.linkus.capital.util.enumtype.bill.TransType</p>
 * <p>Description </p>
 * <p>Company linkus </p>
 * <p>Copyright Copyright(c)2016</p>
 * @author 李颖
 * @create time: 2016年8月16日 下午5:57:43
 * @version 1.0
 * 
 * @modified records:
 */
public enum TransTypeMode {
	/**买断式*/
	RM00("RM00"),
	/**回购式*/
	RM01("RM01");
	
	private String value;
	
	private TransTypeMode(String value){
		this.value = value;
	}
	
	public String getValue(){
		return this.value;
	}

}
