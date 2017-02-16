package com.linkus.capital.util.datacal;

import java.math.BigDecimal;
import java.util.Map;

import javax.script.ScriptEngine;
import javax.script.ScriptEngineManager;
import javax.script.ScriptException;

import com.linkus.capital.common.exception.BusinessException;
import com.linkus.capital.common.exception.constant.BusinessExceptionConstant;

/**
 *	公式、表达式计算
 * <p>Title com.linkus.capital.common.calcul.FormualCalcul</p>
 * <p>Description </p>
 * <p>Company linkus </p>
 * <p>Copyright Copyright(c)2016</p>
 * @author 小道
 * @create time: 2016年4月7日 上午9:49:31
 * @version 1.0
 * 
 * @modified records:
 */
public class FormualCalcul {
	
	private static ScriptEngineManager factory = null;
	private static ScriptEngine engine = null;

	/** 初始化script脚本引擎 **/
	public static void init() {
		if (factory == null)
			factory = new ScriptEngineManager();
		if (engine == null)
			engine = factory.getEngineByName("JavaScript");
	}

	/**
	 * 获取表达式计算值
	 *
	 * @author 小道
	 * @description
	 * @param calculValueMap 计算值
	 * @param calculFormual  计算公式
	 * @return
	 * @throws ScriptException 
	 * @throws Exception
	 * @modified
	 */
	public static BigDecimal getFormualCalculValue(Map<String, Object> calculValueMap, String calculFormual) throws BusinessException {
		Object value = runFormualCalcul(calculFormual,calculFormualReplace(calculValueMap, calculFormual));
		return new BigDecimal(value.toString());
	}

	/**
	 * 获取表达式计算boolean值
	 *
	 * @author 小道
	 * @description
	 * @param calculValueMap
	 * @param calculFormual
	 * @return
	 * @throws Exception
	 * @modified
	 */
	public static boolean getFormualCalculBooleanValue(Map<String, Object> calculValueMap, String calculFormual) throws BusinessException {
		Object value = runFormualCalcul(calculFormual,calculFormualReplace(calculValueMap, calculFormual));
		if ("true".equals(value.toString())) {
			return true;
		} else
			return false;
	}

	/** 表达式替换 **/
	private static String calculFormualReplace(Map<String, Object> calculValueMap, String calculFormual) {
		for (Map.Entry<String, Object> calculValueEntry : calculValueMap.entrySet()) {
			Object value = calculValueEntry.getValue();
			if (value != null)
				calculFormual = calculFormual.replaceAll(calculValueEntry.getKey(), "("+value.toString()+")");
		}
		return calculFormual;
	}

	/** 计算运行 **/
	public static Object runFormualCalcul(String calculFormual, String replaceCalculFormual) throws BusinessException {
		FormualCalcul.init();
		Object value = null;
		try {
			value = engine.eval(replaceCalculFormual);
		} catch (ScriptException e) {
			throw new BusinessException(BusinessExceptionConstant.E12003, new Object[] { calculFormual, replaceCalculFormual });
		}
		return value;
	}
}



