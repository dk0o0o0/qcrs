package com.linkus.capital.util.telnet;


import java.io.StringReader;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.dom4j.Document;
import org.dom4j.DocumentException;
import org.dom4j.DocumentHelper;
import org.dom4j.Element;
import org.dom4j.io.OutputFormat;
import org.dom4j.io.SAXReader;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.linkus.capital.msg.sndsmg.mode.response.SNDSMGRespBody;
import com.linkus.capital.msg.sndsmg.service.impl.SNDSMGServiceImpl;
import com.linkus.capital.util.config.SystemConfigUtil;

/**
 *
 * <p>Title com.linkus.capital.util.SendMessageUtil</p>
 * <p>Description </p>
 * <p>Company linkus </p>
 * <p>Copyright Copyright(c)2016</p>
 * @author tsj
 * @create time: 2016年6月16日 下午2:52:47
 * @version 1.0
 * 
 * @modified records:
 */
public class SendMessageUtil {
	private static Logger logger = LoggerFactory.getLogger(SendMessageUtil.class);
	

	/**
	 * 发送跑批业务相关的短信（往科技部发送跑批信息）
	 * @param phoneNO
	 * @param seqNo
	 * @param content
	 * @return
	 * @throws Exception
	 */
	public static boolean sendMessage(String SMSContent) throws Exception {
		String phoneNOS=SystemConfigUtil.gettranPersonsTel();
		sendMessageOneByOne(SMSContent, phoneNOS);
		return true;
	}
	/**
	 * 逐条发送短信
	 * @author 倪鑫
	 * @param SMSContent
	 * @param phoneNOS
	 * @return
	 */
	private static void sendMessageOneByOne(String SMSContent, String phoneNOS) {
		SNDSMGServiceImpl impl = new SNDSMGServiceImpl(); //短信接口
		Map<String, Object> map = new HashMap<String, Object>();
		if(phoneNOS.length()<12){
		map.put("phoneNO", phoneNOS); //电话号码
		map.put("smsContent", SMSContent); //短信内容
			try {
				String returnXml=impl.sendMsg(map);
				} catch (Exception e) {
					e.printStackTrace();
				}
		}else{
			String[] strNo=phoneNOS.split(",");
			for (int i = 0; i < strNo.length; i++) {
				map.put("phoneNO", strNo[i]); //电话号码
				map.put("smsContent", SMSContent); //短信内容
					try {
						//发送短信返回的XML
						String returnXml=impl.sendMsg(map);
						//发送是否成功的标志
						String flag=returnXml.substring(returnXml.indexOf("<ReturnCode>")+12,returnXml.indexOf("</ReturnCode>"));
						int count=0;
						while(!"00000000".equals(flag)){
							returnXml=impl.sendMsg(map);
							flag=returnXml.substring(returnXml.indexOf("<ReturnCode>")+12,returnXml.indexOf("</ReturnCode>"));
							count++;
							//失败重复次数
							if(count==Integer.parseInt(SystemConfigUtil.gettranSendNum()))break;
						}
					} catch (Exception e) {
							e.printStackTrace();
						}	
			}
		}
	}
    
	/**
	 * 发送日终业务相关的短信（往金融市场部发送）
	 * 
	 * @param phoneNO
	 * @param seqNo
	 * @param content
	 * @return
	 * @throws Exception
	 */
	public static boolean sendMessageFinancial (String SMSContent) throws Exception {
		String phoneNOS=SystemConfigUtil.gettranFinancialTel();
		sendMessageOneByOne(SMSContent, phoneNOS);
		return true;
	}
	
	/**
	 * 获取 短信报文
	 * 
	 * @param content
	 * @param cfg
	 * @return
	 * @throws Exception
	 */
	private static Map getTranMap(String transCode, String channelNo,
			String phoneNO, String midSeqNo, String SMSContent, String SMSNo)
			throws Exception {

		Map tranmap = new HashMap();
		tranmap.put("TransCode", transCode); // 交易代码
		tranmap.put("ChannelNo", channelNo); // 渠道号
		tranmap.put("MidTransDate", new SimpleDateFormat("yyyyMMdd").format(new Date())); // 渠道号
		tranmap.put("MidTransTime", new SimpleDateFormat("HHmmss").format(new Date())); // 渠道号
		tranmap.put("MidSeqNo", midSeqNo); // 流水号
		tranmap.put("SMSNo", SMSNo); // 短信编号
		tranmap.put("PhoneNO", phoneNO); // 手机号码
		tranmap.put("SMSContent", SMSContent); // 短信内容
		tranmap.put("VoucherNo", "11111111111111"); // 流水号
		tranmap.put("SMSType", "M"); // 短信编号
		tranmap.put("SMSPriority", "C"); // 手机号码
		tranmap.put("IsBatch", "F"); // 短信内容
		tranmap.put("SendTime", ""); // 短信内容
		return tranmap;
	}

	/***
	 * 短信平台xml报文
	 */
	private static String makeNodeXml(Map map) {
		Document document = DocumentHelper.createDocument();
		document.setXMLEncoding("GB2312");

		Element xmlRoot = document.addElement("root");
		Element xmlhead = xmlRoot.addElement("head");
		Element xmlbody = xmlRoot.addElement("body");
		
		Element hxmlCde = xmlhead.addElement("TransCode");
		hxmlCde.setText((String) map.get("TransCode"));

		Element hxmlCno = xmlhead.addElement("ChannelNo");
		hxmlCno.setText((String) map.get("ChannelNo"));

		Element hxmlSno = xmlhead.addElement("MidSeqNo");
		hxmlSno.setText((String) map.get("MidSeqNo"));
		
		Element hxmlDate = xmlhead.addElement("MidTransDate");
		hxmlDate.setText((String) map.get("MidTransDate"));
		
		Element hxmlTime = xmlhead.addElement("MidTransTime");
		hxmlTime.setText((String) map.get("MidTransTime"));

		Element bxmlSsn = xmlbody.addElement("SMSNo");
		bxmlSsn.setText((String) map.get("SMSNo"));

		Element bxmlPho = xmlbody.addElement("PhoneNO");
		bxmlPho.setText((String) map.get("PhoneNO"));

		Element bxmlCon = xmlbody.addElement("SMSContent");
		bxmlCon.setText((String) map.get("SMSContent"));
		
		Element bxmlNo = xmlbody.addElement("VoucherNo");
		bxmlNo.setText((String) map.get("VoucherNo"));
		
		Element bxmlTpe = xmlbody.addElement("SMSType");
		bxmlTpe.setText((String) map.get("SMSType"));
		
		Element bxmlPri = xmlbody.addElement("SMSPriority");
		bxmlPri.setText((String) map.get("SMSPriority"));
		
		Element bxmlBat = xmlbody.addElement("IsBatch");
		bxmlBat.setText((String) map.get("IsBatch"));
		
		Element bxmlStime = xmlbody.addElement("SendTime");
		bxmlStime.setText((String) map.get("SendTime"));
		
		String length = String.valueOf(getChineseLen(document.asXML().toString().trim()));
		while (length.length() < 6) {
			length = "0" + length;
		}
		return length + document.asXML().toString().trim();
	}

	// xml - to - Map
	private static Map<String, Object> xml2Map(String xml)
			throws DocumentException {
		SAXReader reader = new SAXReader();
		StringReader sr = new StringReader(xml);
		Document document = reader.read(sr);
		OutputFormat format = OutputFormat.createPrettyPrint();
		format.setEncoding("GB2312");
		Element root = document.getRootElement();

		return dom2Map(root);
	}

	/**
	 * 1.传入element，以标签名为键，标签体为值。 2.同名称的节点会被装进List，无限层嵌套。 3.如上面的例子，将根节点传到下面的方法中。
	 * 若根节点下无其他标签节点，则以根节点名称为map的key，内容为value。
	 * 若根节点下有其他标签节点，则以其他标签节点的名称为key，内容为value。
	 * 若根节点下有其他标签节点，并且节点名称相同，则以此相同的标签名称为key，内容形式是list为value。
	 */
	private static Map dom2Map(Element e) {
		Map map = new HashMap();
		List list = e.elements();
		if (list.size() > 0) {
			for (int i = 0; i < list.size(); i++) {
				Element iter = (Element) list.get(i);
				List mapList = new ArrayList();

				if (iter.elements().size() > 0) {
					Map m = dom2Map(iter);
					if (map.get(iter.getName()) != null) {
						Object obj = map.get(iter.getName());
						if (!obj.getClass().getName().equals(
								"java.util.ArrayList")) {
							mapList = new ArrayList();
							mapList.add(obj);
							mapList.add(m);
						}
						if (obj.getClass().getName().equals(
								"java.util.ArrayList")) {
							mapList = (List) obj;
							mapList.add(m);
						}
						map.put(iter.getName(), mapList);
					} else
						map.put(iter.getName(), m);
				} else {
					if (map.get(iter.getName()) != null) {
						Object obj = map.get(iter.getName());
						if (!obj.getClass().getName().equals(
								"java.util.ArrayList")) {
							mapList = new ArrayList();
							mapList.add(obj);
							mapList.add(iter.getText());
						}
						if (obj.getClass().getName().equals(
								"java.util.ArrayList")) {
							mapList = (List) obj;
							mapList.add(iter.getText());
						}
						map.put(iter.getName(), mapList);
					} else
						map.put(iter.getName(), iter.getText());
				}
			}
		} else
			map.put(e.getName(), e.getText());
		return map;
	}
		
	// xml - to - Map 
	 public static Map<String, Object> Xml2Map(String xml)  
	          throws DocumentException {
		 
	    SAXReader reader = new SAXReader();  
	    StringReader sr = new StringReader(xml);  
	    Document document = reader.read(sr);  
	    OutputFormat format = OutputFormat.createPrettyPrint();  
	    format.setEncoding("GB2312");  
	    Element root = document.getRootElement();  
	    
	    return Dom2Map(root);  
	  } 
	 
	 public static int getChineseLen(String FromStr){
			if (FromStr == null){
				return 0;
			}
			int FromLen = FromStr.length();
			int ChineseLen = 0;
			for (int i = 0; i < FromLen; i++)
			{
				if (gbValue(FromStr.charAt(i)) > 0) {
					ChineseLen = ChineseLen + 2;
				} else {
					ChineseLen++;
				}
			}
			return ChineseLen;
		}

		/*******
		 * **********************************************
		 * <p>
		 * 过程名称：gbValue(返回GBK的编码)
		 * </p>
		 * @param ch
		 * @return
		 ********************************************** 
		 */

		public static int gbValue(char ch){

			String str = ch+"";
			try{
				byte[] bytes = str.getBytes("GBK");
				if (bytes.length < 2){
					return 0;
				}
				return (bytes[0] << 8 & 0xff00) + (bytes[1] & 0xff);
			}
			catch (Exception e){
				return 0;
			}
		}
	 
	 private static Map Dom2Map(Element e) {  
	     Map map = new HashMap();   
	     List list = e.elements();  
	     if (list.size() > 0) {  
	         for (int i = 0; i < list.size(); i++) {  
	             Element iter = (Element) list.get(i);  
	             List mapList = new ArrayList();  
	   
	             if (iter.elements().size() > 0) {  
	                 Map m = Dom2Map(iter);  
	                 if (map.get(iter.getName()) != null) {  
	                     Object obj = map.get(iter.getName());  
	                     if (!obj.getClass().getName().equals(  
	                             "java.util.ArrayList")) {  
	                         mapList = new ArrayList();  
	                         mapList.add(obj);  
	                         mapList.add(m);  
	                     }  
	                     if (obj.getClass().getName().equals(  
	                             "java.util.ArrayList")) {  
	                         mapList = (List) obj;  
	                         mapList.add(m);  
	                     }  
	                     map.put(iter.getName(), mapList);  
	                 } else  
	                     map.put(iter.getName(), m);  
	             } else {  
	                 if (map.get(iter.getName()) != null) {  
	                     Object obj = map.get(iter.getName());  
	                     if (!obj.getClass().getName().equals(  
	                             "java.util.ArrayList")) {  
	                         mapList = new ArrayList();  
	                         mapList.add(obj);  
	                         mapList.add(iter.getText());  
	                     }  
	                     if (obj.getClass().getName().equals(  
	                             "java.util.ArrayList")) {  
	                         mapList = (List) obj;  
	                         mapList.add(iter.getText());  
	                     }  
	                     map.put(iter.getName(), mapList);  
	                 } else  
	                     map.put(iter.getName(), iter.getText());  
	             }  
	         }  
	     } else  
	         map.put(e.getName(), e.getText());  
	     return map;  
	 }   
}
