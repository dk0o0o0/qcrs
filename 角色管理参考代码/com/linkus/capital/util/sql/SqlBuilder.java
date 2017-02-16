package com.linkus.capital.util.sql;

import java.io.IOException;
import java.io.StringWriter;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Set;

import org.apache.commons.lang3.Validate;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.beans.factory.xml.DefaultDocumentLoader;
import org.springframework.beans.factory.xml.DocumentLoader;
import org.springframework.context.ResourceLoaderAware;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.core.io.support.ResourcePatternResolver;
import org.springframework.stereotype.Component;
import org.springframework.util.xml.DomUtils;
import org.springframework.util.xml.XmlValidationModeDetector;
import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.xml.sax.InputSource;

import freemarker.cache.StringTemplateLoader;
import freemarker.template.Configuration;

/**
 * 
 * 通过FreeMarker模板读XML文件动态获得SQL 
 * date: 2016年3月12日 下午6:03:04
 * @author 5920
 * @version 1.0
 * @since JDK 1.6
 */
@Component
public class SqlBuilder implements InitializingBean, ResourceLoaderAware {  
    private static final Logger LOGGER = LoggerFactory.getLogger(SqlBuilder.class);  
    private Map<String, String> namedSQLQueries;  
    private ResourceLoader resourceLoader;  
	private DocumentLoader documentLoader = new DefaultDocumentLoader();
	
    /** 
     * 查询语句名称缓存，不允许重复 
     */  
    private Set<String> nameCache = new HashSet<String>();  
    
    private Configuration cfg = new Configuration(Configuration.VERSION_2_3_22);
	
    public Map<String, String> getNamedSQLQueries() {  
        return namedSQLQueries;  
    }  
    
	@Override
	public void afterPropertiesSet() throws Exception {
		init();
		cfg.setNumberFormat("#.########");  
	    StringTemplateLoader stringLoader = new StringTemplateLoader();  
        for(Entry<String, String> entry : namedSQLQueries.entrySet()){  
            stringLoader.putTemplate(entry.getKey(), entry.getValue());  
        }  
	    cfg.setTemplateLoader(stringLoader);  
		
	}  
    
    public void init() throws IOException {  
        namedSQLQueries = new HashMap<String, String>();  
        String fileNames = "classpath*:resources/sql/**/*.xml";
        boolean flag = this.resourceLoader instanceof ResourcePatternResolver;  
        if (flag) {  
            Resource[] resources = ((ResourcePatternResolver) this.resourceLoader).getResources(fileNames);  
            buildMap(resources);  
        } else {  
            Resource resource = resourceLoader.getResource(fileNames);  
            buildMap(resource);  
        }  
        //clear name cache  
        nameCache.clear();  
    }  
  
    @Override  
    public void setResourceLoader(ResourceLoader resourceLoader) {  
        this.resourceLoader = resourceLoader;  
    }  
  
    private void buildMap(Resource[] resources) throws IOException {  
        if (resources == null) {  
            return;  
        }  
        for (Resource resource : resources) {  
            buildMap(resource);  
        }  
    }  
  
    private void buildMap(Resource resource) {  
        InputSource inputSource = null;  
        try {  
            inputSource = new InputSource(resource.getInputStream());  
        	Document doc = this.documentLoader.loadDocument(inputSource, null, null, XmlValidationModeDetector.VALIDATION_NONE, false);
    		Element root = doc.getDocumentElement();
    		List<Element> querys = DomUtils.getChildElements(root);
    		for(Element element : querys) {
    			  final String elementName = element.getTagName();
                  if ("sql-query".equals(elementName)) {  
                      putStatementToCacheMap(resource, element, namedSQLQueries);  
                  } 
    		}
        } catch (Exception e) {  
            LOGGER.error(e.toString());  
            e.printStackTrace();
        } finally {  
            if (inputSource != null && inputSource.getByteStream() != null) {  
                try {  
                    inputSource.getByteStream().close();  
                } catch (IOException e) {  
                    LOGGER.error(e.toString());  
                    e.printStackTrace();
                }  
            }  
        }  
  
    }  
  
    private void putStatementToCacheMap(Resource resource, final Element element, Map<String, String> statementMap)  
            throws IOException {  
        String sqlQueryName = element.getAttribute("name");  
        Validate.notEmpty(sqlQueryName);  
        if (nameCache.contains(sqlQueryName)) {  
            throw new RuntimeException("重复的sql-query语句定义在文件:" + resource.getURI() + "中，必须保证name的唯一.");  
        }  
        nameCache.add(sqlQueryName);  
        String queryText = DomUtils.getTextValue(element);  
        statementMap.put(sqlQueryName, queryText);  
    }  
    
    
    public String getSqlByName(String key, Map<String, ?> params) {
		StringWriter sw = new StringWriter();
		try {
			cfg.getTemplate(key).process(params, sw);
		} catch(Exception e) {
			e.printStackTrace();
		}
		return sw.toString();
	}
	
	public String getSqlByName(String key) {
		return getSqlByName(key, null);
	}
}  