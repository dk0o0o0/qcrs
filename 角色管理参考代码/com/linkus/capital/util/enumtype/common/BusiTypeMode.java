package com.linkus.capital.util.enumtype.common;

import java.util.EnumSet;
import java.util.HashMap;
import java.util.Map;

/**
 * 资金交易系统业务类型信息表
 * 其中包括业务号、业务名称、业务大类、业务合同类型、业务买卖方向（非必输项）
 *
 * <p>Title com.linkus.capital.util.enumtype.common.BusiTypeMode</p>
 * <p>Description </p>
 * <p>Company linkus </p>
 * <p>Copyright Copyright(c)2016</p>
 * @author storm.li
 * @create time: 2016年7月12日 下午4:08:00
 * @version 1.0
 * 
 * @modified records:
 */
public enum BusiTypeMode {
	
	/**
	 * 债券买入
	 */
	BUSI_TYPE_CODE_20001("20001","债券买入",MajorTypeMode.BOND_MAJORTYPE.getCode(),CntrNameMode.bondCntr),
	
	/**
	 * 债券卖出
	 */
	BUSI_TYPE_CODE_20002("20002","债券卖出",MajorTypeMode.BOND_MAJORTYPE.getCode(),CntrNameMode.bondCntr,"SELLTYPE"),

	/**
	 * 债券收息
	 */
	BUSI_TYPE_CODE_20003("20003","债券收息",MajorTypeMode.BOND_MAJORTYPE.getCode(),CntrNameMode.bondCntr),
	/**
	 *债券估值 
	 */
	BUSI_TYPE_CODE_20004("20004","债券估值",MajorTypeMode.BOND_MAJORTYPE.getCode(),CntrNameMode.bondCntr),
	/**
	 *债券正回购
	 */
	BUSI_TYPE_CODE_20005("20005","债券正回购",MajorTypeMode.BOND_MAJORTYPE.getCode(),CntrNameMode.bondCntr,"SELLTYPE"),
	/**
	 *债券分销买入
	 */
	BUSI_TYPE_CODE_20006("20006","债券分销买入",MajorTypeMode.BOND_MAJORTYPE.getCode(),CntrNameMode.bondCntr),
	/**
	 *债券投标
	 */
	BUSI_TYPE_CODE_20007("20007","债券投标",MajorTypeMode.BOND_MAJORTYPE.getCode(),CntrNameMode.bondBidCntr),
	/**
	 *债券承销
	 */
	BUSI_TYPE_CODE_20008("20008","债券承销",MajorTypeMode.BOND_MAJORTYPE.getCode(),CntrNameMode.bondCiCntr),
	/**
	 *债券分销卖出
	 */
	BUSI_TYPE_CODE_20009("20009","债券分销卖出",MajorTypeMode.BOND_MAJORTYPE.getCode(),CntrNameMode.bondCntr,"SELLTYPE"),
	/**
	 *债券正回购到期
	 */
	BUSI_TYPE_CODE_20010("20010","债券正回购到期",MajorTypeMode.BOND_MAJORTYPE.getCode(),CntrNameMode.bondCntr),
	/**
	 *债券到期
	 */
	BUSI_TYPE_CODE_20011("20011","债券到期",MajorTypeMode.BOND_MAJORTYPE.getCode(),CntrNameMode.bondCntr,"SELLTYPE"),
	/**
	 *债券逆回购
	 */
	BUSI_TYPE_CODE_20012("20012","债券逆回购",MajorTypeMode.BOND_MAJORTYPE.getCode(),CntrNameMode.bondCntr),
	/**
	 *债券逆回购到期
	 */
	BUSI_TYPE_CODE_20013("20013","债券逆回购到期",MajorTypeMode.BOND_MAJORTYPE.getCode(),CntrNameMode.bondCntr,"SELLTYPE"),
	/**
	 *提前还本
	 */
	BUSI_TYPE_CODE_20017("20017","提前还本",MajorTypeMode.BOND_MAJORTYPE.getCode(),CntrNameMode.bondCntr),
	/**
	 *债券代码调换
	 */
	BUSI_TYPE_CODE_20022("20022","债券代码调换",MajorTypeMode.BOND_MAJORTYPE.getCode(),CntrNameMode.bondCntr),
	/**
	 *国库现金管理商业银行定期存款首期
	 */
	BUSI_TYPE_CODE_20024("20024","国库现金管理商业银行定期存款首期",MajorTypeMode.BOND_MAJORTYPE.getCode(),CntrNameMode.bondCntr),
	/**
	 *国库现金管理商业银行定期存款到期
	 */
	BUSI_TYPE_CODE_20025("20025","国库现金管理商业银行定期存款到期",MajorTypeMode.BOND_MAJORTYPE.getCode(),CntrNameMode.bondCntr),
	/**
	 *债券借贷融入
	 */
	BUSI_TYPE_CODE_20052("20052","债券借贷融入",MajorTypeMode.BOND_MAJORTYPE.getCode(),CntrNameMode.bondCntr),
	/**
	 *债券借贷融入到期
	 */
	BUSI_TYPE_CODE_20053("20053","债券借贷融入到期",MajorTypeMode.BOND_MAJORTYPE.getCode(),CntrNameMode.bondCntr),
	/**
	 *债券借贷融出
	 */
	BUSI_TYPE_CODE_20054("20054","债券借贷融出",MajorTypeMode.BOND_MAJORTYPE.getCode(),CntrNameMode.bondCntr),
	/**
	 *债券借贷融出到期
	 */
	BUSI_TYPE_CODE_20055("20055","债券借贷融出到期",MajorTypeMode.BOND_MAJORTYPE.getCode(),CntrNameMode.bondCntr),
	/**
	 * 债券借贷划息
	 */
	BUSI_TYPE_CODE_20057("20057","债券借贷划息",MajorTypeMode.BOND_MAJORTYPE.getCode(),CntrNameMode.bondCntr),
	/**
	 *SHIBOR场外报价
	 */
	BUSI_TYPE_CODE_20060("20060","SHIBOR场外报价",MajorTypeMode.BOND_MAJORTYPE.getCode(),CntrNameMode.bondCntr),
	/**
	 *贴现买入
	 */
	BUSI_TYPE_CODE_30001("30001","贴现买入",MajorTypeMode.BILL_MAJORTYPE.getCode(),CntrNameMode.billCntr),
	/**
	 *票据转贴现
	 */
	BUSI_TYPE_CODE_30003("30003","票据转贴现",MajorTypeMode.BILL_MAJORTYPE.getCode(),CntrNameMode.billCntr),
	/**
	 *转贴现卖出
	 */
	BUSI_TYPE_CODE_30004("30004","转贴现卖出",MajorTypeMode.BILL_MAJORTYPE.getCode(),CntrNameMode.billCntr,"SELLTYPE"),
	/**
	 *再贴现卖出
	 */
	BUSI_TYPE_CODE_30005("30005","再贴现卖出",MajorTypeMode.BILL_MAJORTYPE.getCode(),CntrNameMode.billCntr,"SELLTYPE"),
	/**
	 *再贴回购
	 */
	BUSI_TYPE_CODE_30006("30006","再贴回购",MajorTypeMode.BILL_MAJORTYPE.getCode(),CntrNameMode.billCntr,"SELLTYPE"),
	/**
	 *央行卖票
	 */
	BUSI_TYPE_CODE_30007("30007","央行卖票",MajorTypeMode.BILL_MAJORTYPE.getCode(),CntrNameMode.billCntr),
	/**
	 *系内转贴现
	 */
	BUSI_TYPE_CODE_30008("30008","系内转贴现",MajorTypeMode.BILL_MAJORTYPE.getCode(),CntrNameMode.billCntr),
	/**
	 *票据逆回购
	 */
	BUSI_TYPE_CODE_30009("30009","票据逆回购",MajorTypeMode.BILL_MAJORTYPE.getCode(),CntrNameMode.billCntr),
	/**
	 *票据正回购
	 */
	BUSI_TYPE_CODE_30010("30010","票据正回购",MajorTypeMode.BILL_MAJORTYPE.getCode(),CntrNameMode.billCntr,"SELLTYPE"),
	/**
	 *正回购赎回
	 */
	BUSI_TYPE_CODE_30011("30011","正回购赎回",MajorTypeMode.BILL_MAJORTYPE.getCode(),CntrNameMode.billCntr),
	
	/**
	 *票据逆回购到期
	 */
	BUSI_TYPE_CODE_30013("30013","票据逆回购到期",MajorTypeMode.BILL_MAJORTYPE.getCode(),CntrNameMode.billCntr),
	/**
	 *再贴回购到期
	 */
	BUSI_TYPE_CODE_30014("30014","再贴回购到期",MajorTypeMode.BILL_MAJORTYPE.getCode(),CntrNameMode.billCntr),
	/**
	 *正回购到期
	 */
	BUSI_TYPE_CODE_30015("30015","正回购到期",MajorTypeMode.BILL_MAJORTYPE.getCode(),CntrNameMode.billCntr),

	/**
	 * 票据资产托收
	 */
	BUSI_TYPE_CODE_30020("30020","票据资产托收",MajorTypeMode.BILL_MAJORTYPE.getCode(),CntrNameMode.billCntr),
	/**
	 *票据质押
	 */
	BUSI_TYPE_CODE_30026("30026","票据质押",MajorTypeMode.BILL_MAJORTYPE.getCode(),CntrNameMode.billCntr),
	/**
	 *票据质押到期
	 */
	BUSI_TYPE_CODE_30027("30027","票据质押到期",MajorTypeMode.BILL_MAJORTYPE.getCode(),CntrNameMode.billCntr),
	/**
	 *代保管票据
	 */
	BUSI_TYPE_CODE_30028("30028","代保管票据",MajorTypeMode.BILL_MAJORTYPE.getCode(),CntrNameMode.billCntr),
	/**
	 *证券化票据质押
	 */
	BUSI_TYPE_CODE_30029("30029","证券化票据质押",MajorTypeMode.BILL_MAJORTYPE.getCode(),CntrNameMode.billCntr),
	/**
	 *票据质押到期
	 */
	BUSI_TYPE_CODE_30030("30030","票据质押到期",MajorTypeMode.BILL_MAJORTYPE.getCode(),CntrNameMode.billCntr),
	/**
	 *逆回购赎回
	 */
	BUSI_TYPE_CODE_30032("30032","逆回购赎回",MajorTypeMode.BILL_MAJORTYPE.getCode(),CntrNameMode.billCntr),
	/**
	 *再贴回购赎回
	 */
	BUSI_TYPE_CODE_30033("30033","再贴回购赎回",MajorTypeMode.BILL_MAJORTYPE.getCode(),CntrNameMode.billCntr),
	/**
	/**
	 *同业拆入
	 */
	BUSI_TYPE_CODE_50006("50006","同业拆入",MajorTypeMode.INTERBANK_MAJORTYPE.getCode(),CntrNameMode.interbankLendcntr,"SELLTYPE"),
	/**
	 *同业拆出
	 */
	BUSI_TYPE_CODE_50007("50007","同业拆出",MajorTypeMode.INTERBANK_MAJORTYPE.getCode(),CntrNameMode.interbankLendcntr),
	/**
	 *存放同业存入
	 */
	BUSI_TYPE_CODE_50008("50008","存放同业存入",MajorTypeMode.INTERBANK_MAJORTYPE.getCode(),CntrNameMode.interbankLendcntr),
	/**
	 *存放同业支取
	 */
	BUSI_TYPE_CODE_50009("50009","存放同业支取",MajorTypeMode.INTERBANK_MAJORTYPE.getCode(),CntrNameMode.interbankLendcntr),
	/**
	 *同业存放存入
	 */
	BUSI_TYPE_CODE_50010("50010","同业存放存入",MajorTypeMode.INTERBANK_MAJORTYPE.getCode(),CntrNameMode.interbankLendcntr),
	/**
	 *存放同业支取
	 */
	BUSI_TYPE_CODE_50011("50011","同业存放支取",MajorTypeMode.INTERBANK_MAJORTYPE.getCode(),CntrNameMode.interbankLendcntr),
	/**
	 *同业机构理财本行投资
	 */
	BUSI_TYPE_CODE_50012("50012","同业机构理财本行投资",MajorTypeMode.INTERBANK_MAJORTYPE.getCode(),CntrNameMode.interbankIvcntr),
	/**
	 *同业理财产品本行投资收息
	 */
	BUSI_TYPE_CODE_50013("50013","同业理财产品本行投资收息",MajorTypeMode.INTERBANK_MAJORTYPE.getCode(),CntrNameMode.interbankIvcntr,"SELLTYPE"),
	/**
	 *同业理财产品本行投资到期
	 */
	BUSI_TYPE_CODE_50014("50014","同业理财产品本行投资到期",MajorTypeMode.INTERBANK_MAJORTYPE.getCode(),CntrNameMode.interbankIvcntr,"SELLTYPE"),
	/**
	 *同业理财产品本行投资提前中止
	 */
	BUSI_TYPE_CODE_50015("50015","同业理财产品本行投资提前中止",MajorTypeMode.INTERBANK_MAJORTYPE.getCode(),CntrNameMode.interbankIvcntr,"SELLTYPE"),
	/**
	 *同业拆入到期还款
	 */
	BUSI_TYPE_CODE_50016("50016","同业拆入到期还款",MajorTypeMode.INTERBANK_MAJORTYPE.getCode(),CntrNameMode.interbankLendcntr),
	/**
	 *同业拆出到期
	 */
	BUSI_TYPE_CODE_50017("50017","同业拆出到期",MajorTypeMode.INTERBANK_MAJORTYPE.getCode(),CntrNameMode.interbankLendcntr,"SELLTYPE"),
	/**
	 *同业理财产品卖出
	 */
	BUSI_TYPE_CODE_50018("50018","同业理财产品卖出",MajorTypeMode.INTERBANK_MAJORTYPE.getCode(),CntrNameMode.interbankIvcntr,"SELLTYPE"),
	/**
	 *同业本行投资批量收息
	 */
	BUSI_TYPE_CODE_50019("50019","同业本行投资批量收息",MajorTypeMode.INTERBANK_MAJORTYPE.getCode(),CntrNameMode.interbankIvcntr,"SELLTYPE"),
	/**
	 *存放同业存入收息
	 */
	BUSI_TYPE_CODE_50027("50027","存放同业存入收息",MajorTypeMode.INTERBANK_MAJORTYPE.getCode(),CntrNameMode.interbankLendcntr),
	/**
	 *存放同业存入到期
	 */
	BUSI_TYPE_CODE_50028("50028","存放同业存入到期",MajorTypeMode.INTERBANK_MAJORTYPE.getCode(),CntrNameMode.interbankLendcntr),
	/**
	 *同业存放存入收息
	 */
	BUSI_TYPE_CODE_50029("50029","同业存放存入收息",MajorTypeMode.INTERBANK_MAJORTYPE.getCode(),CntrNameMode.interbankLendcntr),
	/**
	 *同业存放存入到期
	 */
	BUSI_TYPE_CODE_50030("50030","同业存放存入到期",MajorTypeMode.INTERBANK_MAJORTYPE.getCode(),CntrNameMode.interbankLendcntr),
	/**
	 *同业存单
	 */
	BUSI_TYPE_CODE_50031("50031","同业存单",MajorTypeMode.INTERBANK_MAJORTYPE.getCode(),CntrNameMode.interbankKpcntr),
	/**
	 *同业存单付息
	 */
	BUSI_TYPE_CODE_50032("50032","同业存单付息",MajorTypeMode.INTERBANK_MAJORTYPE.getCode(),CntrNameMode.interbankKpcntr),
	/**
	 *同业存单到期
	 */
	BUSI_TYPE_CODE_50033("50033","同业存单到期",MajorTypeMode.INTERBANK_MAJORTYPE.getCode(),CntrNameMode.interbankKpcntr),
	/**
	 *同业存单发行
	 */
	BUSI_TYPE_CODE_50034("50034","同业存单发行",MajorTypeMode.INTERBANK_MAJORTYPE.getCode(),CntrNameMode.interbankKpcntr),
	/**
	 *人民币同业存放账户开户
	 */
	BUSI_TYPE_CODE_50035("50035","人民币同业存放账户开户",MajorTypeMode.INTERBANK_MAJORTYPE.getCode(),CntrNameMode.interbankLendcntr),
	/**
	 *人民币存放同业账户开户
	 */
	BUSI_TYPE_CODE_50036("50036","人民币存放同业账户开户",MajorTypeMode.INTERBANK_MAJORTYPE.getCode(),CntrNameMode.interbankLendcntr),

	BUSI_TYPE_CODE_INTERBANK_DEPOSIT_IN( "INTERBANK_DEPOSIT_IN","同业存放计提",MajorTypeMode.INTERBANK_MAJORTYPE.getCode(),CntrNameMode.interbankLendcntr),
	
	BUSI_TYPE_CODE_INTERBANK_DEPOSIT_OUT("TINTERBANK_DEPOSIT_OUT","存放同业计提",MajorTypeMode.INTERBANK_MAJORTYPE.getCode(),CntrNameMode.interbankLendcntr);
	
	private String CHName;
	private String code;
	private String majorType;
	private CntrNameMode cntrNameMode;
	private String direction;
	private static Map<String, String> busiTypeCHNameMap = new HashMap<String, String>();
	private static Map<String, String> busiTypeMajorTypeMap = new HashMap<String, String>();
	private static Map<String, CntrNameMode> busiTypePathMap = new HashMap<String, CntrNameMode>();
	private static Map<String, String> busiTypeDirectionMap = new HashMap<String, String>();

	
	static {
		for (BusiTypeMode busiType: EnumSet.allOf(BusiTypeMode.class)) {
			busiTypeCHNameMap.put(busiType.getCode(), busiType.getCHName());
			busiTypeMajorTypeMap.put(busiType.getCode(), busiType.getMajorType());
			busiTypePathMap.put(busiType.getCode(), busiType.getCntrNameMode());
			busiTypeDirectionMap.put(busiType.getCode(), busiType.getDirection());
		}
	}

	private  BusiTypeMode(String code,String CHName,String majorType,CntrNameMode cntrNameMode){
		
		this(code, CHName, majorType, cntrNameMode,"NUKOWNTYPE");
	}
	
	private  BusiTypeMode(String code,String CHName,String majorType,CntrNameMode cntrNameMode,String direction){
		
		this.code = code;
		this.CHName = CHName;
		this.majorType = majorType;
		this.cntrNameMode = cntrNameMode;
		this.direction = direction;
	}
	
	@Override
	public String toString(){
		return name();
	}
	
	protected String getCHName(){
		return this.CHName;
	}
	
	public String getCode(){
		return this.code;
	}
	
	public String getMajorType() {
		return this.majorType;
	}

	public String getDirection(){
		return this.direction;
	}
	
	public CntrNameMode getCntrNameMode() {
		return cntrNameMode;
	}
	
	public static String getBusiTypeCHName(String busiType) {
		return busiTypeCHNameMap.get(busiType);
	}
	
	public static String getBusiTypeMajorType(String busiType) {
		return busiTypeMajorTypeMap.get(busiType);
	}
	
	public static CntrNameMode getBusiCntrNameMode(String busiType) {
		return busiTypePathMap.get(busiType);
	}
	
	public static String getBusiTypeDirection(String busiType) {
		return busiTypeDirectionMap.get(busiType);
	}
	
}
