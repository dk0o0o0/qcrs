package com.linkus.capital.util;

import java.lang.reflect.Method;
import java.util.HashMap;
import java.util.Map;

import com.linkus.capital.common.exception.BusinessException;
import com.linkus.capital.msg.ecds.util.EcdsStatus;
import com.linkus.capital.util.enumtype.bill.BillNoteType;

/** 
 * 枚举转换为Map工具类
 * <p>Title com.linkus.capital.Enum2MapUtil</p>
 * <p>Description </p>
 * <p>Company linkus </p>
 * <p>Copyright Copyright(c)2016</p>
 * @author 杨超文
 * @create time: 2016年7月27日下午5:05:47
 * @version 1.0
 * 
 * @modified records:
 */
public class Enum2MapUtil {
	public static void main(String[] args) {
		try{ 
			Map<String,String> map = Enum2MapUtil.parseEnum(EcdsStatus.class,"code", "desc");
			Map<String,String> map1 = Enum2MapUtil.parseEnum(BillNoteType.class,"ecdsCode", "desc");
		} catch (BusinessException e) {
			e.printStackTrace();
		}
	}
	
	public static <T>Map<String,String> parseEnum(Class<T> ref,String key,String value) throws BusinessException {
		Map<String,String> map = new HashMap<String,String>();
		try {
			if(ref.isEnum()) {
				T[] ts = ref.getEnumConstants();
				for (T t : ts) {
					String code = getInvokeValue(t,key);
					String text = getInvokeValue(t,value);
					map.put(code, text);
				}
			}
		} catch (Exception e) {
			throw new BusinessException("将枚举类："+ref.getClass()+" 转换为Map时发生错误！"+ e.getMessage());
		}
		return map;
	}
	
	private static <T> String getInvokeValue(T t, String fileName) throws Exception {
		String getSrcMenthod  = "get"+fileName.substring(0,1).toUpperCase()+fileName.substring(1);
		Method getMethod = t.getClass().getDeclaredMethod(getSrcMenthod);
		Object getValue = getMethod.invoke(t);
		if(getValue!=null){
			return getValue.toString();
		}
		return null;
	}
}
