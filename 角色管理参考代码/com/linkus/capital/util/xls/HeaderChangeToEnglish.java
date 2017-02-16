package com.linkus.capital.util.xls;

import org.apache.axis.utils.StringUtils;

import com.linkus.capital.util.enumtype.common.DataFieldMode;


public class HeaderChangeToEnglish {
	/**
	 * 设置表名
	 * @param name 汉字表名
	 * @return 返回英文表名
	 */
	public String compareNameInfo(String name){
		if(StringUtils.isEmpty(name)){
			return "";
		}
		if("票据号码".equals(name)){
			name="billNo";
			return name;
		}
		
		if("出票人全称".equals(name)){
			name="drawerUnitName";
			return name;
		}
		if("票据类型".equals(name)){
			name="noteType";
			return name;
		}
		if("序号".equals(name)){
			name="xh";
			return name;
		}
		if("承兑人".equals(name)){
			name="acceptBankName";
			return name;
		}
		if("汇票属地".equals(name)){
			name="region";
			return name;
		}
		if("回购利率(%)".equals(name)){
			name="redeemRate";
			return name;
		}
		if("付款行全称".equals(name)){
			name="acceptBankNo";
			return name;
		}
		if("票面金额(元)".equals(name)){
			name=DataFieldMode.FACE_AMOUNT.getFieldName();
			return name;
		}  
		if("出票日".equals(name)){
			name="makerDate";
			return name;
		}
		if("到期日".equals(name)){
			name="matureDate";
			return name;
		}
		if("补充天数(天)".equals(name)){
			name="supplyDays";
			return name;
		}
		if("大额支付行号".equals(name)){
			name="payBankNo";
			return name;
		}  
		
		//同业本行投资第三方授信信息
		if("金额（元）".equals(name)){//交易金额
			name="transAmount";
			return name;
		}
		if("第三方".equals(name)){
			name="acceptBankNo";
			return name;
		}
		if("第三方ID".equals(name)){
			name="acceptBankCode";
			return name;
		}
		if("收款人".equals(name)){
			name="payeeName";
			return name;
		}if("债券代码".equals(name)){
			name="bondCode";
			return name;
		}if(name.contains("净价单价")){//
			name="netUnitPrice";
			return name;
		}if(name.contains("全价单价")){
			name="fullUnitPrice";
			return name;
		}if("背书次数".equals(name)){
			name="reciteNumber";
			return name;
		}if ("收款人账号".equals(name)){
			name="payeeAcctNo";
			return name;
		}if ("收款人开户行".equals(name)){
			name="payeeOpBkAcctNa";
			return name;
		}if("出票人账号".equals(name)){
			name="drawerUnitAcctNo";
			return name;
		}
		if("利率（%）".equals(name)){
			name="billRate";
			return name;
		}
		
		return null;
	}
}
