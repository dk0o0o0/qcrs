package com.linkus.capital.util;

import java.lang.reflect.Field;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.math.BigDecimal;
import java.text.ParseException;
import java.util.Date;
import java.util.Enumeration;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import com.linkus.capital.common.exception.BusinessException;
import com.linkus.capital.util.date.DateUtils;
import com.linkus.capital.util.enumtype.bond.DeliveryTypeMode;

/**
 *
 * <p>Title com.linkus.capital.util.PackageModelUtil</p>
 * <p>Description 实体组装(当前只能组装String,Bigdecimal,Util.Date,Boolean四种类型的属性值)</p>
 * <p>Company linkus </p>
 * <p>Copyright Copyright(c)2016</p>
 * @create time: 2016年4月15日 上午10:37:51
 * @version 1.0
 * 
 * @modified records:
 */
public class PackageModelUtil {
    
	/**
	 * 
	 *
	 * @author 张春艳
	 * @throws InvocationTargetException 
	 * @throws IllegalAccessException 
	 * @throws IllegalArgumentException 
	 * @throws NoSuchMethodException 
	 * @throws NoSuchFieldException 
	 * @throws SecurityException 
	 * @throws ParseException 
	 * @description 获取request中的所有参数      组装model
	 * @modified
	 */
	public static void packageTheModel(Object obj,HttpServletRequest request) throws SecurityException, NoSuchFieldException, NoSuchMethodException, IllegalArgumentException, IllegalAccessException, InvocationTargetException, ParseException{
		Map<String,Object> map=new HashMap<String,Object>();
		Enumeration<String> paramNames =request.getParameterNames();
		while(paramNames.hasMoreElements()){
			String paramName=(String)paramNames.nextElement();
			String[] paramValues=request.getParameterValues(paramName);
		//	if(paramValues.length==1){
				String paramValue=paramValues[0];
				if(paramValue.length()!=0){
					map.put(paramName, paramValue);
					setValue(obj,paramName,paramValue);
				}
//			}else{
//				String paramValue=paramValues[0];
//				if(paramValue.length()!=0){
//					map.put(paramName, paramValue);
//					SetValue(obj,paramName,paramValue);
//				}
//			}
		}
		
	}

	/**
	 * 
	 *
	 * @author 张春艳
	 * @description 动态给对象属性赋值
	 * @param obj 实体对象
	 * @param fieldName 属性名
	 * @param value  属性值
	 * @throws SecurityException
	 * @throws NoSuchFieldException
	 * @throws NoSuchMethodException
	 * @throws IllegalArgumentException
	 * @throws IllegalAccessException
	 * @throws InvocationTargetException
	 * @throws ParseException 
	 * @modified
	 */
	public static void setValue(Object obj,String fieldName,String StringValue)throws SecurityException,NoSuchFieldException,NoSuchMethodException,IllegalArgumentException,IllegalAccessException,InvocationTargetException, ParseException{
		String firstLetter=fieldName.substring(0,1).toUpperCase();
	    Field[] fields=obj.getClass().getDeclaredFields();
	    for(int i=0;i<fields.length;i++){
	    	if(fields[i].getName().equals(fieldName)){//如果实体类包含这个属性的，则赋值
	    		String setMethodName="set"+firstLetter+fieldName.substring(1);
	    		Field field=obj.getClass().getDeclaredField(fieldName);
	    		Method setMethod =obj.getClass().getDeclaredMethod(setMethodName, field.getType());
	    		String type=field.getType().getName();
	    		Object objectValue = changeTheValueType(StringValue, type);
	    		setMethod.invoke(obj, objectValue);
	    		break;
	    	}
	    }
		
	}
	
	
	/****
	 * 动态给对象属性赋值
	 * @param obj 实体对象
	 * @param fieldName 字段
	 * @param StringValue 值
	 * @throws SecurityException
	 * @throws NoSuchFieldException
	 * @throws NoSuchMethodException
	 * @throws IllegalArgumentException
	 * @throws IllegalAccessException
	 * @throws InvocationTargetException
	 * @throws ParseException
	 */
	public static void setFieldValue(Object obj,String fieldName,String StringValue)throws SecurityException,NoSuchFieldException,NoSuchMethodException,IllegalArgumentException,IllegalAccessException,InvocationTargetException, ParseException{
		String firstLetter=fieldName.substring(0,1).toUpperCase();
	    Field[] fields=obj.getClass().getDeclaredFields();
	    for(int i=0;i<fields.length;i++){
	    	if(fields[i].getName().toLowerCase().equals(fieldName.toLowerCase())){//如果实体类包含这个属性的，则赋值
	    		String name=fields[i].getName();
	    		String setMethodName="set"+firstLetter+fields[i].getName().substring(1);
	    		Field field=obj.getClass().getDeclaredField(name);
	    		Method setMethod =obj.getClass().getDeclaredMethod(setMethodName, field.getType());
	    		String type=field.getType().getName();
	    		Object objectValue = changeTheValueType(StringValue, type);
	    		setMethod.invoke(obj, objectValue);
	    		break;
	    	}
	    }
		
	}
	
	/**
	 *
	 * @author 申铭
	 * @description		比对来自两个对象的两个属性值是否equals
	 * @param obj1
	 * @param fieldName1
	 * @param obj2
	 * @param fieldName2
	 * @return
	 * @modified
	 */
	public static String comparisonBetweenTwoFieldFromTwoObject(Object obj1,String fieldName1,Object obj2,String fieldName2,String filedCName) throws BusinessException{
		try{
			String getMethodName1 = "get"+fieldName1.substring(0,1).toUpperCase()+fieldName1.substring(1);
			String getMethodName2 = "get"+fieldName2.substring(0,1).toUpperCase()+fieldName2.substring(1);
			Method getMethod1 = obj1.getClass().getDeclaredMethod(getMethodName1);
			Method getMethod2 = obj2.getClass().getDeclaredMethod(getMethodName2);
			Object getValue1 = getMethod1.invoke(obj1);
			Object getValue2 = getMethod2.invoke(obj2);
			Object value1 = changeTypeToValue(getValue1,obj1.getClass().getDeclaredField(fieldName1).getType().getName());
			Object value2 = changeTypeToValue(getValue2,obj2.getClass().getDeclaredField(fieldName2).getType().getName());;
			String returnMsg=null;
			if(fieldName1.equals("maturityDeliveryType") || fieldName1.equals("deliveryType")){
				if(value1.equals(DeliveryTypeMode.DVP.getValue())){
					value1 = DeliveryTypeMode.DVP.getCsbsName();
				}
			}
			if(!value1.equals(value2)){
				returnMsg=filedCName+"不一致，资金业务系统中为:"+value1+",中债登为:"+value2+";";
			}
			return returnMsg;
		}catch(Exception e){
			throw new BusinessException("将对象1属性："+fieldName1+" 的值与对象2的属性："+fieldName2+" 的值做对比时发生错误！"+ e.getMessage());
		}
	}

	
	
	/***
	 *
	 * @author 申铭
	 * @description	从源对象(srcObj)中取所有属性的值赋给目标对象(destObj)
	 * @param srcObj
	 * @param destObj
	 * @throws BusinessException
	 * @modified
	 */
	public static void setValueToDestObjFromSrcObj(Object srcObj,Object destObj) throws BusinessException{
		Field[] files = srcObj.getClass().getDeclaredFields();
		String fieldName;
		for(int i=0;i<files.length;i++){
			fieldName = files[i].getName();
			if("serialVersionUID".equals(fieldName)){
				continue;
			}
			setValueToDestObjFromSrcObj(srcObj, fieldName, destObj, fieldName);
		}
	}
	
	
	
	
	
	/**
	 *
	 * @author 申铭
	 * @description	从源对象(srcObj)中取某属性(srcFieldName)值赋给目标对象(destObj)的某属性(destFieldName)
	 * @param srcObj			源对象
	 * @param srcFieldName		源对象的属性名(务必与对象的属性名大小写完全一致)
	 * @param destObj			目标对象
	 * @param destFieldName		目标对象的属性名(务必与对象的属性名大小写完全一致)
	 * @throws BusinessException
	 * @modified
	 */
	public static void setValueToDestObjFromSrcObj(Object srcObj,String srcFieldName,Object destObj,String destFieldName) throws BusinessException{
		try{
			String getSrcMenthod  = "get"+srcFieldName.substring(0,1).toUpperCase()+srcFieldName.substring(1);
			String setDestMenthod = "set"+destFieldName.substring(0,1).toUpperCase()+destFieldName.substring(1);
			Field srcField  = null;
			Field destField = null;
			try{
				srcField = srcObj.getClass().getDeclaredField(srcFieldName);
				destField = destObj.getClass().getDeclaredField(destFieldName);
			}catch(Exception e){
				return;
			}
			if(srcField==null||destField==null){
				return;
			}
			Method getMethod = srcObj.getClass().getDeclaredMethod(getSrcMenthod);
			Method setMethod = destObj.getClass().getDeclaredMethod(setDestMenthod, destField.getType());
			String type = destField.getType().getName();
			Object getValue = getMethod.invoke(srcObj);
			Object objectValue = null;
			if(getValue!=null){
				objectValue = changeTheValueType(getValue.toString(), type);
			}
			setMethod.invoke(destObj, objectValue);
		}catch(Exception e){
			throw new BusinessException("将源对象属性："+srcFieldName+" 的值赋给目标对象的属性："+destFieldName+"时发生错误！"+ e.getMessage());
		}
	}
	
	/**
	 * 匹配交易中心基础数据
	 * @author 杨枭
	 * @description
	 * @param comparisonMap
	 * @param msgField
	 * @return
	 * @throws Exception 
	 * @modified
	 */
	public static boolean comparsionBetweenObjAndMap(Map<String, Object> comparisonMap, String cpms2Field, Object object, String quoteField) throws Exception {
		String getSrcMenthod = "get" + quoteField.substring(0, 1).toUpperCase() + quoteField.substring(1);
		Field srcField = object.getClass().getDeclaredField(quoteField);
		Method getMethod = object.getClass().getDeclaredMethod(getSrcMenthod);
		Object getValue = getMethod.invoke(object);
		String type = srcField.getType().getName();
		Object objectValue = changeTypeToValue(getValue, type);
		Object cpmsValue = comparisonMap.get(cpms2Field.trim());
		if ("java.util.Date".equals(type)) {
			cpmsValue = new Date(new Long(cpmsValue.toString()));
		}
		if ("java.math.BigDecimal".equals(type)) {
			cpmsValue = new BigDecimal(cpmsValue.toString()).stripTrailingZeros().toPlainString();
		}
		return cpmsValue.equals(objectValue);
	}
	
	private static Object changeTypeToValue(Object objValue,String type) throws ParseException{
		if (objValue == null) {
			return null;
		}
		String stringValue = objValue.toString();
		Object objectValue = new Object();
		if ("java.lang.String".equals(type)) {
			objectValue = stringValue;
		} else if ("java.math.BigDecimal".equals(type)) {
			if (stringValue.length() > 0) {
				objectValue = new BigDecimal(stringValue).stripTrailingZeros().toPlainString();
			}
		} else if ("java.util.Date".equals(type)) {
			objectValue = DateUtils.stringToDate(stringValue);
		} else if ("boolean".equals(type)) {
			objectValue = "true".equals(stringValue.toString());
		}
		return objectValue;
	}
	
	/**
	 *
	 * @author 申铭
	 * @description		将string类型的值转换为合适的类型
	 * @param StringValue
	 * @param type
	 * @return
	 * @throws ParseException
	 * @modified
	 */
	public static Object changeTheValueType(String stringValue,String type) throws ParseException{
		if(stringValue==null){
			return null;
		}
		Object objectValue =new Object();
		if("java.lang.String".equals(type)){
			objectValue=stringValue;
		}else if("java.math.BigDecimal".equals(type)){
			if(stringValue.length()>0){
				objectValue=new BigDecimal(stringValue);
			}
		}else if("java.util.Date".equals(type)){
			objectValue = DateUtils.stringToDate(stringValue);
		}else if("boolean".equals(type)){
			objectValue = "true".equals(stringValue.toString());
		}
//		else{
//			//抛异常   提醒有奇怪的类混进来了
//		}
		return objectValue;
	}
	
}
