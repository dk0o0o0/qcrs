package com.linkus.capital.util.enumtype.msg;

/**
 * 服务编号
 * <p>Title com.linkus.capital.util.enumtype.msg.ServiceCodeType</p>
 * <p>Description </p>
 * <p>Company linkus </p>
 * <p>Copyright Copyright(c)2016</p>
 * @author 杨枭
 * @create time: 2016年7月28日 下午6:22:16
 * @version 1.0
 * 
 * @modified records:
 */
public enum ServiceCodeType {
	/**
	 * 二代支付行名行号查询
	 */
	APS_BPH_0003("APS_BPH_0003"),
	
	/**
	 * 销二代支付序号
	 */
	APS_BPH_0011("APS_BPH_0011"),
	
	/**
	 * 查询二代支付序号
	 */
	APS_BPH_0014("APS_BPH_0014"),
	
	/**
	 * 逾期转垫款发送垫款指令
	 */
	CMIS1001("CMIS1001"),
	
	
	/**
	 * 申请流水号查询授信信息
	 */
	CRMS0012("CRMS0012"),
	
	/**
	 * 扣减恢复授信
	 */
	CRMS0013("CRMS0013"),
	
	/**
	 * 外围系统查询贴现客户接口
	 */
	CRMS0201("CRMS0201"),
	
	/**
	 * 查询某机构某交易码某天的核心扎账单/对账查询接口服务实现类
	 */
	CMQROC("cmqroc"),
	
	/**
	 * 国结客户信息查询接口服务实现类
	 */
	MDITXX("mditxx"),
	
	/**
	 * 行内转账接口/及时记账接口服务实现类
	 */
	MDMXSH("mdmxsh"),
	
	/**
	 * 获取Wind债券信息数据接口
	 */
	WIND01("wind01"),
	
	/**
	 * 短信接口
	 */
	SNDSMG("SNDSMG");
	
	private String ServiceCode;

	private ServiceCodeType(String serviceCode) {
		ServiceCode = serviceCode;
	}
	
	public String getServiceCode() {
		return ServiceCode;
	}
}
