package com.linkus.capital.util.enumtype.bill;

/**
 *转让方式
 * <p>Title com.linkus.capital.util.enumtype.bill.EcdsConveyTypeMode</p>
 * <p>Description </p>
 * <p>Company linkus </p>
 * <p>Copyright Copyright(c)2016</p>
 * @author 李颖
 * @create time: 2016年8月16日 下午5:55:28
 * @version 1.0
 * 
 * @modified records:
 */
public enum EcdsConveyTypeMode {
	/**转让*/
	EM00("EM00"),
	/**不转让*/
	EM01("EM01");
	
	private String value;
	
	private EcdsConveyTypeMode(String value){
		this.value = value;
	}
	
	public String getValue(){
		return this.value;
	}

}
