package com.linkus.capital.util.enumtype.bond;

/**
 *
 * <p>Title com.linkus.capital.util.enumtype.common.EscrowAcctInfo</p>
 * <p>Description 债券账户托管信息</p>
 * <p>Company linkus </p>
 * <p>Copyright Copyright(c)2016</p>
 * @author 申铭
 * @create time: 2016年4月14日 上午11:33:11
 * @version 1.0
 * 
 * @modified records:
 */
public enum EscrowAcctInfoMode {
	/**账户名称*/
	GIVENAME("长沙银行"),
	/**账户账号*/
	GIVEACCTNO("A0029000001");
	
	private String value;
	
	private EscrowAcctInfoMode(String value){
		this.value = value ;
	}
	
	public String getValue(){
		return this.value;
	}
}
