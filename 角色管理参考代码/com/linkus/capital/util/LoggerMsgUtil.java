package com.linkus.capital.util;

import java.lang.reflect.Field;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.lang.reflect.Modifier;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.linkus.capital.business.constructor.base.Constructor;
import com.linkus.capital.util.enumtype.common.BusiTypeMode;
import com.linkus.capital.util.enumtype.common.ConstantConfigMode;
import com.linkus.capital.util.enumtype.common.DataCheckMode;
import com.linkus.capital.util.enumtype.common.DataFieldMode;
import com.linkus.capital.util.enumtype.common.MajorTypeMode;

/**
 * 日志输出加工类
 *
 * <p>Title com.linkus.capital.util.LoggerMsgUtil</p>
 * <p>Description </p>
 * <p>Company linkus </p>
 * <p>Copyright Copyright(c)2016</p>
 * @author storm.li
 * @create time: 2016年9月18日 上午9:25:08
 * @version 1.0
 * 
 * @modified records:
 */
public class LoggerMsgUtil {

	public static String getBusinessBeginMsg(Constructor constructor) throws Exception{
		
		StringBuffer beginMsg = new StringBuffer();
		String busiType = constructor.getBusiType();
		beginMsg.append("\nCPMS.start 服务开始，[").append(BusiTypeMode.getBusiTypeCHName(busiType)).append("]")
			.append("进入").append(constructor.getStep().name()).append("操作，")
			.append("业务合同号=").append(constructor.getContractNo()).append(",")
			.append("业务类型=").append(busiType).append(",")
			.append("持仓表信息=").append(constructor.getBookClass()).append("\n");
		beginMsg.append("CPMS.业务增强后信息输出:\n");
		beginMsg.append(getMsgInfoByBeans("合同信息",constructor.getContract()));
		beginMsg.append(getMsgInfoByBeans("传票信息",constructor.getAcctVoucherParamList()));
		beginMsg.append(getMsgInfoByBeans("服务配置信息",constructor.getConstantConfigMode()));
		beginMsg.append(getMsgInfoByBeans("持仓信息",constructor.getBookies()));
		beginMsg.append(getMsgInfoByBeans("数据校验配置信息",constructor.getDataCheckInfos()));
		beginMsg.append(getMsgInfoByBeans("授信信息",constructor.getGrantCreditRecordes()));
		beginMsg.append(getMsgInfoByBeans("授权信息",constructor.getGrantPowerRecordes()));
		beginMsg.append(getMsgInfoByBeans("打印信息",constructor.getReportMap()));
		beginMsg.append(getMsgInfoByBeans("审批信息",constructor.getWorkflowProcessInfo()));
		if(MajorTypeMode.BILL_MAJORTYPE.getCode().equals(BusiTypeMode.getBusiTypeMajorType(busiType))){
		
			beginMsg.append(getMsgInfoByBeans("票据状态待调整信息",constructor.getBillFlowStatusMap()));
			beginMsg.append(getMsgInfoByBeans("票据基本信息",constructor.getBillNotes()));
		}
		if(MajorTypeMode.BOND_MAJORTYPE.getCode().equals(BusiTypeMode.getBusiTypeMajorType(busiType))){
			
			beginMsg.append(getMsgInfoByBeans("投组持仓代购入待回购金额流水信息",constructor.getBondTeamBookPretreatItems()));
			beginMsg.append(getMsgInfoByBeans("投组持仓信息",constructor.getBondTeamBooks()));
			beginMsg.append(getMsgInfoByBeans("投组限额信息",constructor.getBondTeamLimitItemList()));
		}
		return beginMsg.toString();
	}
	
	/**
	 * 展现对象中所有信息
	 *
	 * @author storm.li
	 * @description
	 * @param msgTitle
	 * @param beans
	 * @return
	 * @throws Exception
	 * @modified
	 */
	public static String getMsgInfoByBeans(String msgTitle,Object beans) throws Exception{
		
		StringBuffer msg = new StringBuffer();
		if(isNeedCheck(beans)){
			msg.append("\t["+msgTitle+"]");
			if((beans instanceof List)){
				for(Object bean:(List)beans){
					msg.append(bean.toString()).append("\n");
				}
			}else if(beans instanceof Map){
				for(Object key:((Map)beans).keySet()){
					Object value = ((Map)beans).get(key);
					if(value instanceof Object[]){
						
						msg.append(key+"=[");
						for(Object newBean:(Object[])value){
							msg.append(newBean).append("\t");
						}
						if(msg.length() >0){
							msg.setLength(msg.length()-"\t".length());
						}
						msg.append("]");
					}else{
						msg.append(key).append("[").append(value).append("]");
					}
				}
				msg.append("\n");
			}else if(beans instanceof ConstantConfigMode){
				msg.append(getModeBeanMsg(beans));
			}else{
				msg.append(beans.toString()).append("\n");
			}
		}
		return msg.toString();
	}
	
	/**
	 * 对mode对象做特殊处理，将内容展现
	 * 
	 * @author storm.li
	 * @description
	 * @param beans
	 * @return
	 * @throws IllegalAccessException
	 * @throws NoSuchMethodException
	 * @throws InvocationTargetException
	 * @modified
	 */
	private static StringBuffer getModeBeanMsg(Object beans) throws IllegalAccessException, NoSuchMethodException, InvocationTargetException {
		Class<?> beanClass = beans.getClass();
		Field[] fields = beanClass.getDeclaredFields();
		StringBuffer modeBeanMsg = new StringBuffer();
		for (Field field : fields) {
			field.setAccessible(true);
			boolean fieldType = Modifier.isStatic(field.getModifiers());
			if (!fieldType) {// 非静态类型
				Object modeBean = field.get(beans);
				if(modeBean != null){
					modeBeanMsg.append(modeBean.getClass().getName()).append(":");
					if(modeBean instanceof Object[]){
						for(Object bean:(Object[])modeBean){
							modeBeanMsg.append(getModeBeanMethodMsg(bean)).append("\t");
						}
					}else{
						modeBeanMsg.append(getModeBeanMethodMsg(modeBean));
					}
					modeBeanMsg.append("\n\t\t");
				}
			}
		}
		if(modeBeanMsg.length()>0){
			modeBeanMsg.setLength(modeBeanMsg.length()-"\t\t".length());
		}
		return modeBeanMsg;
	}

	/**
	 * 输出mode中的中文和code信息
	 *
	 * @author storm.li
	 * @description
	 * @param modeBean
	 * @return
	 * @throws NoSuchMethodException
	 * @throws IllegalAccessException
	 * @throws InvocationTargetException
	 * @modified
	 */
	private static String getModeBeanMethodMsg(Object modeBean) throws NoSuchMethodException,
			IllegalAccessException, InvocationTargetException {
		
		StringBuffer msg = new StringBuffer();
		Class<?> modeBeanClass = modeBean.getClass();
		Method getModeBeanNameMethod = modeBeanClass.getMethod("name", null);
		Method getModeBeanCHNameMethod = modeBeanClass.getMethod("getCHName", null);
		msg.append(getModeBeanNameMethod.invoke(modeBean,null)).append(":")
			.append(getModeBeanCHNameMethod.invoke(modeBean,null));
		return msg.toString();
	}
	
	/**
	 * 判断是否为空，如果为空则跳出
	 *
	 * @author storm.li
	 * @description
	 * @param msg
	 * @return
	 * @modified
	 */
	public static boolean isNeedCheck(Object msg){
		
		if(msg == null){
			return false;
		}else if(msg instanceof List){
			if(((List) msg).isEmpty()){
				return false;
			}
		}else if(msg instanceof Map){
			if(((Map) msg).isEmpty()){
				return false;
			}
		}
		return true;
	}
	
	public static String getStringsMsg(String [] strings){
		
		if(strings == null){
			return null;
		}
		StringBuffer msg = new StringBuffer();
		for(String value:strings){
			msg.append("["+value+"]");
		}
		return msg.toString();
	}
	
	public static void main(String []args){
		
		Map dataCheckInfo = new HashMap();
		dataCheckInfo.put(DataCheckMode.RG_CNTR_ITEM_AMOUNT, new String[]{DataFieldMode.FACE_AMOUNT.getFieldName(),DataFieldMode.TRANS_AMOUNT.getFieldName()});
		dataCheckInfo.put(DataCheckMode.AK_BOOK_AMOUNT_ITEMSUM_CHECK, new String[]{DataFieldMode.COST_AMOUNT.getFieldName()+" != 0"});
		
		StringBuffer msg = new StringBuffer();
		for(Object key:dataCheckInfo.keySet()){
			Object value = dataCheckInfo.get(key);
			if(value instanceof Object[]){
				msg.append(key+"=[");
				for(Object newBean:(Object[])value){
					msg.append(newBean).append("\t");
				}
				if(msg.length() >0){
					msg.setLength(msg.length()-"\t".length());
				}
				msg.append("]");
			}else{
				msg.append(key).append("[").append(value).append("]");
			}
		}
		msg.append("\n");
	}
}
