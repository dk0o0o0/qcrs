package com.linkus.capital.util.config;

import java.util.Properties;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.linkus.capital.common.tools.service.Configer;


/**
 *	资金交易系统配置信息
 * <p>Title com.linkus.capital.csbs.util.CSBSConfigUtil</p>
 * <p>Description </p>
 * <p>Company linkus </p>
 * <p>Copyright Copyright(c)2016</p>
 * @author 陶述杰
 * @create time: 2016年6月15日 上午9:50:46
 * @version 1.0
 * 
 * @modified records:
 */
public class SystemConfigUtil {
	private static Logger logger = LoggerFactory.getLogger(SystemConfigUtil.class);

	private static Properties properties = null;

	static {
		if (properties == null) {
			properties = Configer.getProperties();
			logger.info("读取资金交易系统配置对象...");
		}
	}

	/**
	 * 资金需要提醒的业务类型
	 */
	public static String getSystemPretreatment() {
		return properties.getProperty("SYSTEM_PRETREATMENT");
	}

	/**
	 * 资金需要跑批计提的资产类型
	 */
	public static String getSystemRunbatch() {
		return properties.getProperty("SYSTEM_RUNBATCH");
	}
	
	/**
	 * 资金交易系统自动跑批开关
	 */
	public static String getCoreinter() {
		return properties.getProperty("COREINTER");
	}
	
	
	/**
	 *核心接口开关
	 */
	public static String getCoreCloseFalg() {
		return properties.getProperty("CORE_CLOSE_FALG");
	}
	
	/**
	 *核心通信柜员号
	 */
	public static String getCoreTeller() {
		return properties.getProperty("CORETELLER");
	}
	
	
	/**
	 * 资金交易系统短信平台开关
	 */
	public static String getTrans() {
		return properties.getProperty("TRANS_CLOSE_FLAG");
	}
	/**
	 * 资金交易系统短信平台短信编号
	 */
	public static String gettranSMSNo() {
		return properties.getProperty("TRANSMSNO");
	}
	/**
	 * 资金交易系统短信平台失败重试次数
	 */
	public static String gettranSendNum() {
		return properties.getProperty("TRANSENDNUM");
	}
	
	/**
	 * 资金交易系统短信平台提醒跑批状态手机号码
	 */
	public static String gettranPersonsTel() {
		return properties.getProperty("TRANPERSONSTEL");
	}
	
	/**
	 * 资金交易系统短信平台提醒日终状态
	 */
	public static String gettranFinancialTel() {
		return properties.getProperty("TRANFINANCIALTEL");
	}
	
	/**
	 *中债开关
	 */
	public static String getCSBSCloseFalg() {
		return properties.getProperty("CSCB_CLOSE_FALG");
	}
	
	/**
	 *交易中心下行开关
	 */
	public static String getCFETSCloseFalg() {
		return properties.getProperty("CFETS_CLOSE_FALG");
	}
	
	
	/**
	 *报文重复处理次数
	 */
	public static String getCsbsRedoNum() {
		return properties.getProperty("CSBS_REDO_NUM");
	}
	
	/**
	 *WebService服务调用地址
	 */
	public static String getWebserviceUrl() {
		return properties.getProperty("WEBSERVICE");
	}
	
	/**
	 *WebService服务调用地址
	 */
	public static String getWebserviceCSBSUrl() {
		return properties.getProperty("WEBSERVICE_CSBS");
	}
	
	/**
	 *电票轮询开关
	 */
	public static String getECDSCloseFlag() {
		return properties.getProperty("ECDS_CLOSE_FLAG");
	}
	
	/**
	 * 获取渠道号
	 */
	public static String getChannelId(){
		return properties.getProperty("CHANNELID");
	}
	
	/**
	 * 二代接口支付序号需要识别的账户
	 */
	public static String getTransAbsbphAcctno() {
		return properties.getProperty("TRANSABSBPH_ACCTNO");
	}
	
	/**
	 * 持平日清单处理类型
	 */
	public static String getSystemBalancedaylist() {
		return properties.getProperty("SYSTEM_BALANCEDAYLIST");
	}
	
	/**
	 * 二代接口支付序号需要识别的账户
	 */
	public static String getUbankNo() {
		return properties.getProperty("UBANKNO");
	}
	/**
	 * 二代接口支付序号需要识别的账户
	 */
	public static String getSysDebug() {
		return properties.getProperty("SYS_DEBUG");
	}
	
	/**
	 *自动记账轮询开关
	 */
	public static String getAutoAcctingCloseFalg() {
		return properties.getProperty("AUTOACCTING_CLOSE_FALG");
	}
	
	/**
	 *Wind万得开关
	 */
	public static String getWindCloseFalg() {
		return properties.getProperty("WIND_CLOSE_FLAG");
	}
	

	/**
	 *SYSTEM_转帖卖出贴现商票到期恢复授信  
	 */ 
	public static String getCMISReroverCloseFalg() {
		return properties.getProperty("CMISRECOVER_CLOSE_FLAG");
	}
	
	/**
	 *获取大数据报表链接头
	 */
	public static String getReportLinkHead(){
		return properties.getProperty("REPORT_LINK_HEAD");
	}
	
	/**
	 *获取大数据报表用户
	 */
	public static String getReportUserName(){
		return properties.getProperty("REPORT_USERNAME");
	}
	/**
	 *获取大数据报表密码
	 */
	public static String getReportPassword(){
		return properties.getProperty("REPORT_PASSWORD");
	}
	
	/**
	 *获取大数据报表密码
	 */
	public static String getReportSysNo(){
		return properties.getProperty("REPORT_SYS_NO");
	}
	
	/**
	 *获取大数据报表密码
	 */
	public static String getRequestOutTime(){
		return properties.getProperty("REQUEST_OUTTIME");
	}
	
	/**
	 *获取大数据报表密码
	 */
	public static String getCmisDebug(){
		return properties.getProperty("CMIS_DEBUG");
	}
	
	
}
