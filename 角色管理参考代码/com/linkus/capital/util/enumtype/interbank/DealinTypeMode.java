package com.linkus.capital.util.enumtype.interbank;

/**
 * <p>Title com.linkus.capital.util.enumtype.interbank.DealinTypeMode</p>
 * <p>Description </p>
 * <p>Company linkus </p>
 * <p>Copyright Copyright(c)2016</p>
 * @author 杨超文
 * @create time: 2016年8月22日下午3:59:18
 * @version 1.0
 * 
 * @modified records:
 */
public enum DealinTypeMode {
	
	IBO001("IBO001","1天以内"),
	
	IBO007("IBO007","7天以内"),
	
	IBO014("IBO014","14天以内"),
	
	IBO021("IBO021","21天以内"),
	
	IBO1M("IBO1M","30天以内"),
	
	IBO2M("IBO2M","60天以内"),
	
	IBO3M("IBO3M","90天以内"),
	
	IBO4M("IBO4M","120天以内"),
	
	IBO6M("IBO6M","180天以内"),
	
	IBO9M("IBO9M","270天以内"),
	
	IBO1Y("IBO1Y","1年以内");
	
	private String value;
	private String text;
	
	private DealinTypeMode(String value, String text){
		this.value = value;
	}
	
	public String getValue(){
		return this.value;
	}
	
	public String getText() {
		return this.text;
	}
}
