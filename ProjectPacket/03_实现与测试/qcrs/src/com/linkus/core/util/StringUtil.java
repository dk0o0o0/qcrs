package com.linkus.core.util;

import java.io.BufferedReader;
import java.io.DataInputStream;
import java.io.DataOutputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.lang.reflect.Method;
import java.math.BigDecimal;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.net.URLConnection;
import java.text.DecimalFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
import java.util.Set;
import java.util.UUID;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import net.sourceforge.pinyin4j.PinyinHelper;
import net.sourceforge.pinyin4j.format.HanyuPinyinCaseType;
import net.sourceforge.pinyin4j.format.HanyuPinyinOutputFormat;
import net.sourceforge.pinyin4j.format.HanyuPinyinToneType;
import net.sourceforge.pinyin4j.format.HanyuPinyinVCharType;
import net.sourceforge.pinyin4j.format.exception.BadHanyuPinyinOutputFormatCombination;
import ognl.Ognl;
import ognl.OgnlException;

/**
 * 字符串处理类
 * @author 
 * @date 
 * @comment 
 */
public class StringUtil {
	
	private static final DecimalFormat FMT_AMOUNT = new DecimalFormat("################0.00");

	public static final String COMMA = ",";
	public static final String DIV = "、";
	public static final String BLANK = " ";
	public static String reverse(String str){
		StringBuffer sb=new StringBuffer();
		for (int i = str.length() - 1; i > -1; i--) {
			sb.append(str.charAt(i));
		}
		return sb.toString();
	}
	
	/**
	 * 如果字符串为null，则返回空。不为空，则trim。
	 * @param str
	 * @author guliangliang
	 * @return
	 */
	public static String trim(String str){
		if(str==null)return "";
		return str.trim();
	}
	
	/**
	 * 判断字符串是否为空（NULL 或者 空字符串s）
	 * @param obj
	 * @return
	 * @author huangshiqiang
	 * @date Dec 4, 2007
	 * @comment 
	 */
	public static boolean isStringEmpty(String obj){
		if (obj == null) {
			return true;
		} else {
			if (obj.trim().length()==0) {
				return true;
			}
		}
		return false;
	}
	public static String dealExceptionStr(Exception e){
		String tmp= e.toString();
		tmp=tmp.replaceAll("java.lang.Exception:","");
		return tmp;
	}
	/**
	 * 功能：在一个字符串中查找是否包含另外一个字符串。
	 * @author chenzhigang
	 * @param String sourceStr 被查找的原字符串。
	 * @param String matchedSubStr 这个表示需要在sourceStr中查找的子字符串。
	 * @return 找到包含的字串，就返回true, 否则false
	 */
	public static boolean TwoStrMatch(String sourceStr,String matchedSubStr){			
		Pattern p=Pattern.compile(matchedSubStr);
		Matcher m=p.matcher(sourceStr);
		boolean rs=m.find(); 
		return rs;
	}
	/**
	 * 将字符串 按照 给定的分割符 分隔成list 对象返回
	 * @param sourceStr
	 * @param spliterStr
	 * @return
	 */
	public static List splitList(String sourceStr,String spliterStr){
		List list=null; 
		if(sourceStr!=null && !sourceStr.trim().equalsIgnoreCase("")){
			String[] tmp= sourceStr.split(spliterStr);
			if(tmp.length>0){
				list=new ArrayList();
				for(int i=0;i<tmp.length;i++){
					list.add(tmp[i]);
				}
			}
		}
		return list;
	}
	/**
	 *  * 将字符串 按照 给定的分割符 分隔成 String 类型的数组返回
	 * @param sourceStr
	 * @param spliterStr
	 * @return
	 */
	public static String[] splitArray(String sourceStr,String spliterStr){
		String[] tmp=null;
		if(sourceStr!=null && !sourceStr.trim().equalsIgnoreCase("")){
			 tmp= sourceStr.split(spliterStr); 
		}
		return tmp;
	}
	
	/**
	 * 将字符串数组按照给定的分割符组成字符串返回
	 * @param array
	 * @param spliter
	 * @return
	 */
	public static String arrayToString(String[] array,String spliter){
		StringBuffer sb = new StringBuffer();
		for (int i = 0; i < array.length; i++) {
			if(array[i].trim().length()>0){
				sb.append(array[i]);
				if(i<array.length-1)
					sb.append(spliter);
			}
		}
		return sb.toString();
	}
	/**
	 * 格式化字符串为固定长度，左补0（无中文和字符的区别）
	 * @param filed
	 * @param strLen
	 * @return
	 */
	public static String getLMsgFieldWithZero(String field,int strLen)
	{
		String msgField = field;
		byte[] tmpStr = field.getBytes();
		int i = 0;
		if(tmpStr.length < strLen)
		{
			for( i = tmpStr.length;i<strLen;i++)
			{
				msgField = "0" + msgField;
			}
		}
		return msgField;
	}
	/*
	 * @param Object tmpObj    对象实例
	 * @param String fldName   属性名称
	 * @author chenzhigang
	 * @comment   从一个domain对象中获取其属性的值,对于date(现不包含数字型)属性,从
	 *           get+属性名+Str中获取
	 */
	public static Object getPropertyFromObj(Object tmpObj,String fldName){
		try{ 
			Object property; //返回属性值
			Class ownerClass=tmpObj.getClass(); 
			String firstStr=fldName.substring(0, 1);
			String newfirstStr=firstStr.toUpperCase();
			fldName=fldName.replaceFirst(firstStr, newfirstStr);
			Method method=ownerClass.getMethod("get"+fldName, null);
			property=method.invoke(tmpObj, null); 
			//如果是日期型或者数字型属性时,就调用起格式化方法.
			String tmpType=property.getClass().toString();
			if(tmpType.equalsIgnoreCase("class java.util.Date")||
			  tmpType.equalsIgnoreCase("class java.sql.Timestamp")||
			  tmpType.equalsIgnoreCase("class java.sql.Date")){ 
				method=ownerClass.getMethod("get"+fldName+"Str", null);
				property=method.invoke(tmpObj, null);
			}
			return property;
		}catch(Exception e){
			return null;
		}
	}
	
	
	/**
	 * @author liujin
	 * @date 2008,10,6 把用户输入的数以小数点为界分割开来，并调用 numFormat() 方法 进行相应的中文金额大写形式的转换
	 *       注：传入的这个数应该是经过 roundString() 方法进行了四舍五入操作的
	 * @param s
	 *            String
	 * @return 转换好的中文金额大写形式的字符串
	 */
	public static String splitNum(String s) {
		// 如果传入的是空串则继续返回空串
		if ("".equals(s)) {
			return "";
		}
		// 以小数点为界分割这个字符串
		int index = s.indexOf(".");
		// 截取并转换这个数的整数部分
		String intOnly = s.substring(0, index);
		String part1 = numFormat(1, intOnly);
		// 截取并转换这个数的小数部分
		String smallOnly = s.substring(index + 1);
		String part2 = numFormat(2, smallOnly);
		// 把转换好了的整数部分和小数部分重新拼凑一个新的字符串
		String newS = part1 + part2;
		if (newS.equals(null) || newS.equals(""))
			return cleanZero("零元整");
		else
			newS += "整";
		return cleanZero(newS);
	}

	/**
	 * @author liujin
	 * @date 2008,10,6 把传入的数转换为中文金额大写形式
	 * @param flag
	 *            int 标志位，1 表示转换整数部分，0 表示转换小数部分
	 * @param s
	 *            String 要转换的字符串
	 * @return 转换好的带单位的中文金额大写形式
	 */
	private static String numFormat(int flag, String s) {
		int sLength = s.length();
		// 货币大写形式
		String bigLetter[] = { "零", "壹", "贰", "叁", "肆", "伍", "陆", "柒", "捌", "玖" };
		// 货币单位
		String unit[] = { "元", "拾", "佰", "仟", "万",
		// 拾万位到仟万位
				"拾", "佰", "仟",
				// 亿位到万亿位
				"亿", "拾", "佰", "仟", "万" };
		String small[] = { "分", "角" };
		// 用来存放转换后的新字符串
		String newS = "";
		// 逐位替换为中文大写形式
		for (int i = 0; i < sLength; i++) {
			if (flag == 1) {
				// 转换整数部分为中文大写形式（带单位）
				newS = newS + bigLetter[s.charAt(i) - 48]
						+ unit[sLength - i - 1];
			} else if (flag == 2) {
				// 转换小数部分（带单位）
				newS = newS + bigLetter[s.charAt(i) - 48]
						+ small[sLength - i - 1];
			}
		}
		return newS;
	}

	/**
	 * @author liujin
	 * @date 2008,10,6 把已经转换好的中文金额大写形式加以改进，清理这个字 符串里面多余的零，让这个字符串变得更加可观
	 *       注：传入的这个数应该是经过 splitNum() 方法进行处理，这个字 符串应该已经是用中文金额大写形式表示的
	 * @param s
	 *            String 已经转换好的字符串
	 * @return 改进后的字符串
	 */
	private static String cleanZero(String s) {
		// 如果传入的是空串则继续返回空串
		if ("".equals(s)) {
			return "";
		}
		// 如果用户开始输入了很多 0 去掉字符串前面多余的'零'，使其看上去更符合习惯
		while (s.charAt(0) == '零') {
			// 将字符串中的 "零" 和它对应的单位去掉
			s = s.substring(2);
			// 如果用户当初输入的时候只输入了 0，则只返回一个 "零"
			if (s.length() == 0) {
				return "零";
			}
		}
		// 字符串中存在多个'零'在一起的时候只读出一个'零'，并省略多余的单位
		/* 由于本人对算法的研究太菜了，只能用4个正则表达式去转换了，各位大虾别介意哈... */
		String regex1[] = { "零仟", "零佰", "零拾" };
		String regex2[] = { "零亿", "零万", "零元" };
		String regex3[] = { "亿", "万", "元" };
		String regex4[] = { "零角", "零分" };
		// 第一轮转换把 "零仟", 零佰","零拾"等字符串替换成一个"零"
		for (int i = 0; i < 3; i++) {
			s = s.replaceAll(regex1[i], "零");
		}
		// 第二轮转换考虑 "零亿","零万","零元"等情况
		// "亿","万","元"这些单位有些情况是不能省的，需要保留下来
		for (int i = 0; i < 3; i++) {
			// 当第一轮转换过后有可能有很多个零叠在一起
			// 要把很多个重复的零变成一个零
			s = s.replaceAll("零零零", "零");
			s = s.replaceAll("零零", "零");
			s = s.replaceAll(regex2[i], regex3[i]);
		}
		// 第三轮转换把"零角","零分"字符串省略
		for (int i = 0; i < 2; i++) {
			s = s.replaceAll(regex4[i], "");
		}
		// 当"万"到"亿"之间全部是"零"的时候，忽略"亿万"单位，只保留一个"亿"
		s = s.replaceAll("亿万", "亿");
		return s;
	}

	/**
	 * 功能：文件下载到本地 作者：刘金 时间：2008-10-08
	 * 通过两种方法来实现
	 */
	public static boolean saveUrlAs(String photoUrl, String fileName) {
		// 此方法只能用于HTTP协议
		try {
			URL url = new URL(photoUrl);
			HttpURLConnection connection = (HttpURLConnection) url
					.openConnection();
			DataInputStream in = new DataInputStream(connection
					.getInputStream());
			DataOutputStream out = new DataOutputStream(new FileOutputStream(
					fileName));
			byte[] buffer = new byte[4096];
			int count = 0;
			while ((count = in.read(buffer)) > 0) {
				out.write(buffer, 0, count);
			}
			out.close();
			in.close();
			return true;
		} catch (Exception e) {
			return false;
		}
	}
	//第二种方法
	public static String getDocumentAt(String urlString) {
		// 此方法兼容HTTP和FTP协议
		StringBuffer document = new StringBuffer();
		try {
			URL url = new URL(urlString);
			URLConnection conn = url.openConnection();
			BufferedReader reader = new BufferedReader(new InputStreamReader(
					conn.getInputStream()));
			String line = null;
			while ((line = reader.readLine()) != null) {
				document.append(line + "\n");
			}
			reader.close();
		} catch (MalformedURLException e) {
			System.out.println("Unable to connect to URL: " + urlString);
		} catch (IOException e) {
			System.out.println("IOException when connecting to URL: "
					+ urlString);
		}		
		return document.toString();
	}


	/**
	 * 判断字符串是否为空（NULL 或者 空字符串s）也不能为字符串"null"
	 * @param obj
	 * @return
	 * @author zhangyongchao
	 * @date Dec 4, 2007
	 * @comment 
	 */
	public static boolean isStringEmptyOrNull(String obj){
		if (obj == null) {
			return true;
		} else {
			if (obj.trim().length()==0 || obj.trim().equals("null")) {
				return true;
			}
		}
		return false;
	}



	
    
    /**
     * 将Object对象转换为字符串形式，如果对象为null则返回空<br>
     * 如果不为null则返回toString的表示形式；
     * @param o
     * @param defaultValue 如果object为null时，函数的返回值
     * @return
     */
    public static String toString(Object o,String defaultValue){
    	String ret = "";
    	if(o != null){
    		ret = String.valueOf(o);
    	}else{
    		if(defaultValue != null){
    			ret = defaultValue;
    		}
    	}
    	return ret;
    }
    /**
     * 生成32位的全球唯一的UUID
    * <p>方法名称: getUUIDString|描述: </p>
    * @return
     */
    public static String getUUIDString(){
    	return UUID.randomUUID().toString().replaceAll("-", "");
    }
    
    
    /**
     * <p>方法名称: getNumbersFromString|描述: 从字符串中提取一串数字</p>
     * @param s
     * @return
      */
 	public static String getNumbersFromString(String s){
 		StringBuffer sb = new StringBuffer();
 		if(s != null){
 			String[] x = s.split("\\D+");
 			for(int i = 0; i < x.length; i++){
 				sb.append(x[i].trim());
 			}
 		}
 		return sb.toString();
 		
 	}
	//把字段名中所有的下杠去除
    public static  String replaceUnderline(String alias){
		 return alias.replaceAll("_", "");
	}
  //把字段名中所有的下杠去除并将此 String 中的所有字符都转换为小写。
    public static  String replaceUnderlineToLowerCase(String alias){
		 return alias.replaceAll("_", "").toLowerCase();
	}
    
    
	public static String[] getArrayFromString(String str, String order) {
		String[] temp = null;
		if (str != null) {
			temp = str.split(order);
		}
		return temp;
	}
	
	
    /**
     * 
    * <p>方法名称: getDecimalFormat|描述: 将字符串格式化为金额</p>
    * @param str
    * @return
     */
	public static String getDecimalFormat(String str) {
		if(str == null || str.trim().equals("")) {
			return "0.00";
		}
		String outStr = null;
		double d;
		try {
			d = Double.parseDouble(str);
			outStr = FMT_AMOUNT.format(d);
		} catch (Exception e) {
		}
		return outStr;
	}
	
	
	
    /**
     * 按照分隔符“,”把字符串转换到列表
     * @param str 要转换的字符串
     * @return List
     */
    public static List str2List(String str) {
        return str2List(str, COMMA);
    }
    

    /**
     * 按照制定分隔符把字符串转换到列表
     * @param str 要转换的字符串
     * @param token 分隔符
     * @return List
     */
    public static List str2List(String str, String token) {
        return Arrays.asList(str.split(token));
    }

	@SuppressWarnings("unchecked")
	public static List removeDuplicateObj(List list){ 
        Set someSet = new HashSet(list); 
        //将Set中的集合，放到一个临时的链表中(tempList)
        Iterator iterator = someSet.iterator(); 
        List tempList = new ArrayList(); 
        int i = 0; 
        while(iterator.hasNext()){ 
        	tempList.add(iterator.next()); 
            i++; 
        } 
        return tempList; 
    } 
	
	public static String getSqlInProperty(Object source,String property) throws OgnlException{
		
		String value = (String)Ognl.getValue(property, source);
		return value;
	}
	public static String getSqlInString(List list,String property)throws OgnlException{
		if(null == list||list.isEmpty()){
			return null;
		}
		StringBuffer sb = new StringBuffer();
		for(Object obj : list){
			sb.append("'").append(getSqlInProperty(obj,property)).append("',");
		}
		String ins = sb.toString();
		return ins.length()>0?ins.substring(0,ins.length()-1):"";
	}
	
	/**
	 * 将Object转化成文字
	 * @param o
	 * @return
	 */
	public static String getNumber(Object o){
		String num = "0";
		if(o instanceof Integer){
			num = String.valueOf((Integer)o);
		}else if(o instanceof BigDecimal){
			num = String.valueOf((BigDecimal)o);
		}
		
		return num;
	}
	public static String getSqlString(String sourceString){
		StringBuffer sb=new StringBuffer();
		if(!StringUtil.isStringEmptyOrNull(sourceString)&&!"all".equalsIgnoreCase(sourceString)){
			String []str=sourceString.split(",");
			for(int i=0;i<str.length;i++){
				sb.append("'").append(str[i]).append("'").append(",");
			}
			if(sb.length()==0) sb.append(",");
			String re=sb.toString();
			return re.substring(0, re.length()-1);
		}
		else{
			return "all";
		}
	}
	public static String pinyin(String hanyu) {
		StringBuilder sb = new StringBuilder();
		char[] chars = hanyu.toCharArray();
		for (char c : chars)
			sb.append(_pinyin(c)[0]);
		return sb.toString();
	}
	public static String pinyinAbbr(String hanyu) {
		StringBuilder sb = new StringBuilder();
		char[] chars = hanyu.toCharArray();
		for (char c : chars)
			sb.append(_pinyin(c)[0].charAt(0));
		return sb.toString();
	}
	private static String[] _pinyin(char c) {
		HanyuPinyinOutputFormat f = new HanyuPinyinOutputFormat();
		f.setToneType(HanyuPinyinToneType.WITHOUT_TONE);
		f.setVCharType(HanyuPinyinVCharType.WITH_V);
		f.setCaseType(HanyuPinyinCaseType.LOWERCASE);
		String[] array = null;
		try {
			array = PinyinHelper.toHanyuPinyinStringArray(c, f);
		} catch (BadHanyuPinyinOutputFormatCombination e) {
			e.printStackTrace();
		}
		if (array == null)// not chinese
			array = new String[] { String.valueOf(c) };
		return array;
	}
}
