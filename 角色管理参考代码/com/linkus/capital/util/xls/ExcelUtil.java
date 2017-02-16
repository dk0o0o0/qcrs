package com.linkus.capital.util.xls;

import java.io.File;
import java.io.IOException;

import org.springframework.core.io.Resource;
import org.springframework.core.io.support.PathMatchingResourcePatternResolver;
import org.springframework.core.io.support.ResourcePatternResolver;


/**
 *
 * <p>Title com.linkus.capital.util.xls.ExcelUtil</p>
 * <p>Description </p>
 * <p>Company linkus </p>
 * <p>Copyright Copyright(c)2016</p>
 * @author
 * @create time: 2016年8月3日 下午4:37:53
 * @version 1.0
 * 
 * @modified records:
 */
public class ExcelUtil{
	
	private final static String EXCEL_PROPERTIES_PATH = "classpath*:resources/excel/imp/*.xml";
	
	

	public static File getExceImpCfgFile(String excelFileName) throws IOException {
		ResourcePatternResolver resolver = new PathMatchingResourcePatternResolver();
		Resource[] resources = resolver.getResources(EXCEL_PROPERTIES_PATH);
		for (Resource resource : resources) {
			if (resource.getFilename().equals(excelFileName)) {
				return resource.getFile();
			}
		}
		return null;
	}
	

	public static File getExceExpCfgFile(String excelFileName) throws IOException {
		ResourcePatternResolver resolver = new PathMatchingResourcePatternResolver();
		Resource[] resources = resolver.getResources(EXCEL_PROPERTIES_PATH);
		for (Resource resource : resources) {
			if (resource.getFilename().equals(excelFileName)) {
				return resource.getFile();
			}
		}
		return null;
	}

}
