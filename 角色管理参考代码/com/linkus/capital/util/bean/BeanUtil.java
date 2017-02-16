package com.linkus.capital.util.bean;

import java.beans.PropertyDescriptor;
import java.lang.reflect.Field;
import java.lang.reflect.Modifier;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import javax.persistence.Column;
import javax.persistence.Table;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.BeanWrapperImpl;

import com.linkus.capital.common.exception.BusinessException;
import com.linkus.capital.common.exception.constant.BusinessExceptionConstant;

/**
 * BeanUtil常量类
 *
 * <p>Title com.linkus.capital.util.bean.BeanUtil</p>
 * <p>Description </p>
 * <p>Company linkus </p>
 * <p>Copyright Copyright(c)2016</p>
 * @author 小道
 * @create time: 2016年3月3日 上午11:08:57
 * @version 1.0
 * 
 * @modified records:
 */
public class BeanUtil {

	/**
	 * 获取Bean对象属性名称与非空值(不包括静态类型属性)
	 * 
	 * @author 小道
	 * @description
	 * @param bean
	 * @return
	 * @throws ClassNotFoundException 
	 * @throws IllegalAccessException 
	 * @throws IllegalArgumentException 
	 * @throws Exception
	 * @modified
	 */
	public static Map<String, Object> getBeanFieldAndValue(Object bean) throws ClassNotFoundException, IllegalArgumentException, IllegalAccessException{
		return getBeanFieldAndValue(bean, false);
	}
	
	public static Map<String, Object> getBeanFieldAndValue(Object bean, boolean lower) throws ClassNotFoundException, IllegalArgumentException, IllegalAccessException{
		Map<String, Object> beanMap = new HashMap<String, Object>();
		
		Class<?> beanClass = Class.forName(bean.getClass().getName());
		Field[] fields = beanClass.getDeclaredFields();
		for (Field field : fields) {
			field.setAccessible(true);
			boolean fieldType = Modifier.isStatic(field.getModifiers());
			if (!fieldType) {// 非静态类型
				Object value = field.get(bean);
				if (value != null)
					beanMap.put(lower ? field.getName().toLowerCase() : field.getName(), value);
			}
		}
		return beanMap;
	}
	
	
	public static List<Map<String,Object>> objectListToMapList(List<?> objList) throws ClassNotFoundException, IllegalArgumentException, IllegalAccessException{
		return objectListToMapList(objList, false);
	}
	
	public static List<Map<String,Object>> objectListToMapList(List<?> objList, boolean lower) throws ClassNotFoundException, IllegalArgumentException, IllegalAccessException{
		List<Map<String,Object>> mapList = new ArrayList<Map<String,Object>>();
		Map<String, Object> beanMap = null;
		for(Object obj:objList){
			beanMap = getBeanFieldAndValue(obj, lower);
			mapList.add(beanMap);
		}
		return mapList;
	}
	
	
	
	/**
	 * 获取Bean对象Column属性字段名称(统一小写)与值(包括空值)
	 * 
	 * @author 小道
	 * @description
	 * @param bean
	 * @return
	 * @throws ClassNotFoundException 
	 * @throws IllegalAccessException 
	 * @throws IllegalArgumentException 
	 * @throws Exception
	 * @modified
	 */
	public static Map<String, Object> getBeanColumnNameAndValue(Object bean) throws ClassNotFoundException, IllegalArgumentException, IllegalAccessException {
		Map<String, Object> beanMap = new HashMap<String, Object>();
		Class<?> beanClass = Class.forName(bean.getClass().getName());
		Field[] fields = beanClass.getDeclaredFields();
		for (Field field : fields) {
			field.setAccessible(true);
			Column column = field.getAnnotation(Column.class);
			if (column != null) {
				Object value = field.get(bean);
				beanMap.put(column.name().toLowerCase(), value);
			}
		}
		return beanMap;
	}

	/**
	 * 获取Bean对象属性名称与非空值(不包括静态类型属性)
	 * 将sourceBean对象与targetBean相互存在的属性值赋给targetBean
	 * @author 小道
	 * @description
	 * @param bean
	 * @return
	 * @throws Exception
	 * @modified
	 */
	public static Map<String, Object> getBeanFieldAndValue(Object sourceBean,Object targetBean) throws Exception{
		BeanUtils.copyProperties(sourceBean, targetBean);
		Map<String,Object> targetBeanMap = BeanUtil.getBeanFieldAndValue(targetBean);
		return targetBeanMap;
	}
	
	/**
	 * 获取Bean对象属性名称(不包括静态类型属性)
	 *
	 * @author 小道
	 * @description
	 * @param bean
	 * @return
	 * @throws ClassNotFoundException
	 * @throws IllegalArgumentException
	 * @throws IllegalAccessException
	 * @modified
	 */
	public static List<String> getBeanField(Object bean) throws ClassNotFoundException, IllegalArgumentException {
		Class<?> beanClass = Class.forName(bean.getClass().getName());
		return getBeanField(beanClass);
	}
	
	/**
	 * 获取Bean对象属性名称(不包括静态类型属性)
	 *
	 * @author 小道
	 * @description
	 * @param bean
	 * @return
	 * @throws ClassNotFoundException
	 * @throws IllegalArgumentException
	 * @throws IllegalAccessException
	 * @modified
	 */
	public static List<String> getBeanField(Class<?> beanClass) throws ClassNotFoundException, IllegalArgumentException {
		List<String> fieldList = new ArrayList<String>();
		Field[] fields = beanClass.getDeclaredFields();
		for (Field field : fields) {
			field.setAccessible(true);
			boolean fieldType = Modifier.isStatic(field.getModifiers());
			if (!fieldType) {// 非静态类型
				fieldList.add(field.getName());
			}
		}
		return fieldList;
	}

	/**
	 * 通过字段名字获取bean字段值
	 *
	 * @author 小道
	 * @description
	 * @param bean
	 * @param fieldName
	 * @return
	 * @throws BusinessException 
	 * @throws NoSuchFieldException
	 * @throws SecurityException
	 * @throws ClassNotFoundException
	 * @throws IllegalArgumentException
	 * @throws IllegalAccessException
	 * @modified
	 */
	public static Object getBeanFieldValueByFieldName(Object bean, String fieldName) throws BusinessException  {
		Object value = null;
		try{
			Class<?> beanClass = Class.forName(bean.getClass().getName());
			Field field = beanClass.getDeclaredField(fieldName);
			field.setAccessible(true);
			value = field.get(bean);
		}catch(Exception e){
			throw new BusinessException(BusinessExceptionConstant.E11008,new String[]{bean.getClass().getName(),fieldName});		
		}
		return value;
	}

	/**
	 * 获取bean对象注解表名
	 *
	 * @author 小道
	 * @description
	 * @param entityClass
	 * @return
	 * @modified
	 */
	@SuppressWarnings({ "unchecked", "rawtypes" })
	public static String getBeanAnnotationTableName(Class entityClass) {
		Table annotationTable = (Table) entityClass.getAnnotation(Table.class);
		return annotationTable.name();
	}
	
	
	/**
	 *  复制source中的非空属性值到target中
	 *
	 * @author other
	 * @description
	 * @param source
	 * @param target
	 * @modified
	 */
	public static void copyPropertiesIfNotNull(Object source, Object target) {
		BeanWrapperImpl bws = new BeanWrapperImpl(source);
		BeanWrapperImpl bwt = new BeanWrapperImpl(target);
		for (PropertyDescriptor pd : bws.getPropertyDescriptors()) {
			Object value = null;
			try{
				value = bws.getPropertyValue(pd.getName());
			}catch (Exception e){
				continue;
			}
			if (value != null && (value instanceof String || value instanceof Integer || value instanceof Float || value instanceof Double || value instanceof BigDecimal)
					&& bwt.isReadableProperty(pd.getName()))
				bwt.setPropertyValue(pd.getName(), value);
		}
	}
	
	/**
	 * 计算及合并Bean对象BigDecimal数据类型
	 *
	 * @author 
	 * @description
	 * @param sourceBean
	 * @param targetBean
	 * @modified
	 */
	public static void mergeCalculBigDecimalBean(Object sourceBean, Object targetBean) {
		BeanWrapperImpl bws = new BeanWrapperImpl(sourceBean);
		BeanWrapperImpl bwt = new BeanWrapperImpl(targetBean);
		for (PropertyDescriptor pd : bws.getPropertyDescriptors()) {
			Object bwsValue = bws.getPropertyValue(pd.getName());
			if (bwsValue != null) {
				if (bwsValue instanceof BigDecimal && bwt.isReadableProperty(pd.getName())) {
					BigDecimal bwsAmount = (BigDecimal) bwsValue;
					Object bwtValue = bwt.getPropertyValue(pd.getName());
					if (bwtValue == null) {
						bwt.setPropertyValue(pd.getName(), BigDecimal.ZERO.add(bwsAmount));
					} else {
						BigDecimal bwtAmount = (BigDecimal) bwtValue;
						bwt.setPropertyValue(pd.getName(), bwtAmount.add(bwsAmount));
					}
				}
			}
		}
	}

	/**
	 * 复制sourceMap中的非空属性值到Bean对象中
	 *
	 * @author 小道
	 * @description
	 * @param sourceMap
	 * @param target
	 * @throws ClassNotFoundException 
	 * @modified
	 */
	public static void copyBeanPropertiesByMap(Map<String, Object> sourceMap, Object bean) throws Exception {
		Class<?> beanClass = Class.forName(bean.getClass().getName());
		Field[] fields = beanClass.getDeclaredFields();
		for (Field field : fields) {
			field.setAccessible(true);
			Object value = sourceMap.get(field.getName());
			if (value != null) {
				field.set(bean, value);
			}
		}
	}
	
	@SuppressWarnings("rawtypes")
	public static List<Map<String,Object>> transList(List<Map<String,Object>> list){
		List<Map<String,Object>> returnList=new ArrayList<Map<String,Object>>();
		for(int i=0;i<list.size();i++){
			Map<String,Object> hashMap=new HashMap<String,Object>();
			Map<String,Object> tempMap=list.get(i);
			Iterator<?> it =tempMap.entrySet().iterator();
			while(it.hasNext()){
				Map.Entry pairs=(Map.Entry)it.next();
				hashMap.put(pairs.getKey().toString().toLowerCase(), tempMap.get(pairs.getKey()));
			}
			returnList.add(hashMap);
		}
		return returnList;
	}
}
