package com.linkus.capital.util.enumtype.msg;

/**
 * 直联接口环境状态
 * <p>Title com.linkus.capital.msg.util.enumtype.CsbsInterfaceType</p>
 * <p>Description </p>
 * <p>Company linkus </p>
 * <p>Copyright Copyright(c)2016</p>
 * @author 杨枭
 * @create time: 2016年7月6日 上午11:22:01
 * @version 1.0
 * 
 * @modified records:
 */
public enum MsgPlatStatusMode {
	/**
	 * 中债网络情况标识，正常
	 */
	CSBS_NETWORK_Y("Y"),
	
	/**
	 * 网络通讯非正常
	 */
	CSBS_NETWORK_NO("N");
	
	private String values;
	
	private MsgPlatStatusMode(String values){
		this.values = values;
	}
	
	public String getValues(){
		return this.values;
	}
}
