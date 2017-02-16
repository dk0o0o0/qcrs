package com.linkus.capital.util.enumtype.bill;

/**
 *清算方式
 * <p>Title com.linkus.capital.util.enumtype.bill.EcdsClearTypeMode</p>
 * <p>Description </p>
 * <p>Company linkus </p>
 * <p>Copyright Copyright(c)2016</p>
 * @author 李颖
 * @create time: 2016年8月16日 下午5:53:59
 * @version 1.0
 * 
 * @modified records:
 */
public enum EcdsClearTypeMode {
	
	SM00("SM00","1", "线上清算"),
	
	SM01("SM01","0", "线下清算");
	
	private String value;
	private String oldValue;
	private String CHName;
	
	private EcdsClearTypeMode(String value,String oldValue,String CHName){
		this.value = value;
		this.oldValue = oldValue;
		this.CHName = CHName;
	}
	
	public String getValue(){
		return this.value;
	}

	public String getOldValue() {
		return oldValue;
	}

	public String getCHName() {
		return CHName;
	}
}