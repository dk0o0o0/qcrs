package com.linkus.capital.util.telnet;

import org.apache.cxf.endpoint.Client;
import org.apache.cxf.jaxws.endpoint.dynamic.JaxWsDynamicClientFactory;
import org.apache.cxf.transport.http.HTTPConduit;
import org.apache.cxf.transports.http.configuration.HTTPClientPolicy;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * <p>Title com.linkus.capital.util.WebServiceClientUtil</p>
 * <p>Description </p>
 * <p>Company linkus </p>
 * <p>Copyright Copyright(c)2016</p>
 * @author 小道
 * @create time: 2016年7月21日 下午3:30:27
 * @version 1.0
 * 
 * @modified records:
 */
public class WebServiceClientUtil {
	private static Logger logger = LoggerFactory.getLogger(WebServiceClientUtil.class);
	// 默认超时时间（秒）
	private static final Integer defaultTimeOut = 80;

	public static Object[] webServiceClient(String wsUrl, String method, String requestXml, Integer timeout) throws Exception {
		return webServiceClient(wsUrl, method, new Object[] { requestXml }, timeout);
	}
	
	/**
	 * @author 小道
	 * @description
	 * @param wsUrl
	 * @param method
	 * @param methodParam
	 * @param timeout 超时时间(单位/秒)
	 * @return
	 * @throws Exception
	 * @modified
	 */
	public static Object[] webServiceClient(String wsUrl, String method, Object[] methodParam, Integer timeout) throws Exception {
		try {
			JaxWsDynamicClientFactory dcf = JaxWsDynamicClientFactory.newInstance();
			Client client = dcf.createClient(wsUrl);

			HTTPConduit http = (HTTPConduit) client.getConduit();
			HTTPClientPolicy httpClientPolicy = new HTTPClientPolicy();
			if (timeout == null) {
				httpClientPolicy.setConnectionTimeout(defaultTimeOut * 1000);// 连接超时时间
				httpClientPolicy.setReceiveTimeout(defaultTimeOut * 1000);// 响应超时
			} else {
				httpClientPolicy.setConnectionTimeout(timeout * 1000);// 连接超时时间
				httpClientPolicy.setReceiveTimeout(timeout * 1000);// 响应超时
			}
			httpClientPolicy.setAllowChunking(false);// 取消块编码
			http.setClient(httpClientPolicy);
			if (methodParam.length > 1)
				return client.invoke(method, methodParam);
			else
				return client.invoke(method, methodParam[0]);
		} catch (Exception ex) {
			logger.info("---调用WebService【" + wsUrl + "】服务失败..." + ex);
			throw new Exception("调用WebService【" + wsUrl + "】服务失败..." + ex.getMessage());
		}
	}
	
	public static Object[] webServiceClient(String wsUrl, String method, String requestXml) throws Exception {
		return webServiceClient(wsUrl, method, requestXml, null);
	}

	/**
	 *
	 * @description
	 * @param wsUrl 
	 * @param method
	 * @param requestXml
	 * @param timeout 超时时间(单位/秒)
	 * @return
	 * @throws Exception
	 * @modified
	 */
	public static String webServiceClientToString(String wsUrl, String method, String requestXml, Integer timeout) throws Exception {
		Object[] object = webServiceClient(wsUrl, method, requestXml, timeout);
		if (object.length > 0)
			return (String) object[0];
		else
			return null;
	}

	public static String webServiceClientToString(String wsUrl, String method, String requestXml) throws Exception {
		Object[] object = webServiceClient(wsUrl, method, requestXml);
		if (object.length > 0)
			return (String) object[0];
		else
			return null;
	}

}
