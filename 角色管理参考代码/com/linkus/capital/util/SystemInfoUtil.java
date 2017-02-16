package com.linkus.capital.util;

import java.util.Date;

import org.ironrhino.core.util.ApplicationContextUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.linkus.capital.common.exception.BusinessException;
import com.linkus.capital.system.mode.SystemInfo;
import com.linkus.capital.system.service.SystemInfoManager;
import com.linkus.capital.util.date.DateUtils;

/**
 *	系统信息
 * <p>Title com.linkus.capital.util.date.SystemInfoUtil</p>
 * <p>Description </p>
 * <p>Company linkus </p>
 * <p>Copyright Copyright(c)2016</p>
 * @author 
 * @create time: 2016年4月11日 下午3:50:48
 * @version 1.0
 * 
 * @modified records:
 */
public class SystemInfoUtil {
	private static Logger logger = LoggerFactory.getLogger(SystemInfoUtil.class);
	private static SystemInfoManager systemInfoManager = ApplicationContextUtils.getBean(SystemInfoManager.class);
	private static String SYSTEM_PATH = null;
	 

	public static Date getSystemDate() {
		SystemInfo systemInfo = systemInfoManager.getSystemInfo();
		return systemInfo.getSystemDate();
	}
	
	public static Date getSystemTime(){
		return DateUtils.jointTwoDates(getSystemDate(), new Date());
	}
	
	public static String getSystemStatus() {
		SystemInfo systemInfo = systemInfoManager.getSystemInfo();
		return systemInfo.getSystemStatus();
	}
	
	public static Date getCoreDate(){
		SystemInfo systemInfo = systemInfoManager.getSystemInfo();
		return systemInfo.getCoreDate();
	}
	
	public static void setSystemPath(String systemPath) {
		SYSTEM_PATH = systemPath;
	}

	public static String getSystemPath() throws BusinessException {
		if (SYSTEM_PATH == null) {
			throw new BusinessException("系统路径未空");
		}
		logger.info("加载系统根路径： " + SYSTEM_PATH);
		return SYSTEM_PATH;
	}
}
