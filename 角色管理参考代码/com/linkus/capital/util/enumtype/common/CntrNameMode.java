package com.linkus.capital.util.enumtype.common;

/**
 *
 * <p>Title com.linkus.capital.util.enumtype.CntrNameMode</p>
 * <p>Description 合同实体名称/全类名</p>
 * <p>Company linkus </p>
 * <p>Copyright Copyright(c)2016</p>
 * @author 申铭
 * @create time: 2016年4月21日 下午9:22:03
 * @version 1.0
 * 
 * @modified records:
 */
public enum CntrNameMode {

//*************************债券**********************************//
	/**债券合同*/
	bondCntr("com.linkus.capital.bond.bussiness.mode.BondCntr"),
	/**债券投标合同*/
	bondBidCntr("com.linkus.capital.bond.bussiness.mode.BondBidCntr"),
	/**债券承销合同*/
	bondCiCntr("com.linkus.capital.bond.bussiness.mode.BondCiCntr"),
	
//*************************票据**********************************//
	/**票据合同*/
	billCntr("com.linkus.capital.bill.bussiness.mode.BillCntr"),
	
//*************************同业**********************************//
	/**同业机构理财产品本行投资*/
	interbankIvcntr("com.linkus.capital.interbank.bussiness.mode.InterbankIvcntr"),
	/**同业存单合同*/
	interbankKpcntr("com.linkus.capital.interbank.bussiness.mode.InterbankKpcntr"),
	/**同业(拆借/存放)*/
	interbankLendcntr("com.linkus.capital.interbank.bussiness.mode.InterbankLendcntr");
	
	private String fullClassName;
	private CntrNameMode(String fullClassName){
		this.fullClassName = fullClassName;
	}
	public String getFullClassName(){
		return this.fullClassName;
	}
}
