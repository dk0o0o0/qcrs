package com.linkus.capital.util.enumtype.bond;

/**
 *
 * <p>Title com.linkus.capital.util.enumtype.bond.BondSettleType</p>
 * <p>Description 债券核算类型</p>
 * <p>Company linkus </p>
 * <p>Copyright Copyright(c)2016</p>
 * @author 申铭
 * @create time: 2016年4月14日 下午2:46:06
 * @version 1.0
 * 
 * @modified records:
 */
public enum SettleTypeMode {
	/**国家债券*/
	NATIONAL_BONDS("100"),
	/**央行票据*/
	CENTRAL_BANK_BONDS("101"),
	/**企业债券*/
	CORPORATE_BONDS("102"),
	/**政策性银行债券*/
	POLICY_BANK_BONDS("103"),
	/**非银行金融机构债券*/
	NONBANKING_FINANCIAL_INSTITUTIONS_BONDS("104"),
	/**凭证式国债*/
	PROOF_NATIONAL_BONDS("105"),
	/**商业银行债券*/
	COMMERCIAL_BANK_BONDS("106"),
	/**其他债券*/
	OTHER_BONDS("107"),
	/**其他*/
	OTHERS("108");
	
	private String value;
	
	private SettleTypeMode(String value){
		this.value = value;
	}
	
	public String getValue(){
		return this.value;
	}
}
