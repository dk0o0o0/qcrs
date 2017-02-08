package com.linkus.core.util;

import java.beans.BeanInfo;
import java.beans.Introspector;
import java.beans.PropertyDescriptor;
import java.lang.reflect.Method;
import java.util.HashMap;
import java.util.Map;

import org.ironrhino.core.model.BaseEntity;

public class ModelUtil {

	public static Map<String, Object> modelToMap(BaseEntity entity) {
		Map<String, Object> map = new HashMap<String, Object>();
		try {
			if(entity != null) {
				BeanInfo bean = Introspector.getBeanInfo(entity.getClass());
				PropertyDescriptor[] propertyDescriptors = bean.getPropertyDescriptors();
				for(PropertyDescriptor property : propertyDescriptors) {
					String key = property.getName();
					if(!"class".equals(key)) {
						Method getter = property.getReadMethod();
						Object value = getter.invoke(entity);
						map.put(key, value);
					}
				}
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return map;
	}
}
