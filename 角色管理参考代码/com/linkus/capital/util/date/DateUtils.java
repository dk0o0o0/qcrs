package com.linkus.capital.util.date;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.Locale;

import org.apache.axis.utils.StringUtils;

import com.linkus.capital.common.exception.BusinessException;
import com.linkus.capital.util.SystemInfoUtil;

/**
 * 
 * 日期常量类
 * <p>Title com.linkus.capital.util.date.DateUtils</p>
 * <p>Description </p>
 * <p>Company linkus </p>
 * <p>Copyright Copyright(c)2016</p>
 * @author 小道
 * @create time: 2016年3月7日 下午3:07:46
 * @version 1.0
 * 
 * @modified records:
 */
public class DateUtils extends org.ironrhino.core.util.DateUtils{
	
	/**常用日期转换的格式     yyyy-MM-dd*/
	private static final SimpleDateFormat SDF_NORMAL_ = new SimpleDateFormat("yyyy-MM-dd");
	/**常用日期转换的格式     yyyy/MM/dd*/
	private static final SimpleDateFormat SDF_NORMAL_SLASH = new SimpleDateFormat("yyyy/MM/dd");
	/**常用日期转换的格式     yyyyMMdd*/
	private static final SimpleDateFormat SDF_NORMAL = new SimpleDateFormat("yyyyMMdd");
	/**常用日期转换的格式     yyyy年MM月dd日*/
	private static final SimpleDateFormat SDF_CN = new SimpleDateFormat("yyyy年MM月dd日");
	/**常用日期转换的格式     EEE MMM dd HH:mm:ss zzz yyyy*/
	private static final SimpleDateFormat SDF_US = new SimpleDateFormat("EEE MMM dd HH:mm:ss zzz yyyy",Locale.US);
	/**常用日期转换的格式     HH:mm:ss*/
	private static final SimpleDateFormat SDF_HMS = new SimpleDateFormat("HH:mm:ss");
	/**常用日期转换的格式    yyyy-MM-dd HH:mm:ss*/
	/**常用日期转换的格式 yyyy-MM-dd HH:mm:ss.sss*/
	private static final SimpleDateFormat SDF_TIME = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
	private static final SimpleDateFormat SDF_TIMEFORMSEC = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss.SSS");
	/**常用日期转换的格式 yyyyMMddHHmmsssss*/
	private static final SimpleDateFormat SDF_DATETIME = new SimpleDateFormat("yyyyMMddHHmmssSSS");
	/**常用日期转换的格式 yyyy-MM-dd HH:mm:ss*/
	private static final SimpleDateFormat SDFTIMEFORSEC = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
	/**常用日期转换的格式     HH:mm:ss.sss*/
	private static final SimpleDateFormat TIMEFORMSEC = new SimpleDateFormat("HH:mm:ss.SSS");
	/**常用日期转换的格式 yyyyMMdd-HH:mm:ss.sss*/
	private static final SimpleDateFormat SDFTIMEFORMSECNOT_ = new SimpleDateFormat("yyyyMMdd-HH:mm:ss.SSS");

	/**将yyyyMMdd-HH:mm:ss.sss格式的String解析为日期*/
	public static Date parseToTimeForMsecNot_(String srcDate) throws ParseException{
		if(StringUtils.isEmpty(srcDate)){
			return null;
		}
		return SDFTIMEFORMSECNOT_.parse(srcDate);
	}
	/**将yyyy-MM-dd格式的String解析为日期*/
	public static Date parseToNormal_(String srcDate) throws ParseException{
		if(StringUtils.isEmpty(srcDate)){
			return null;
		}
		return SDF_NORMAL_.parse(srcDate);
	}
	/**将yyyyMMdd格式的String解析为日期*/
	public static Date parseToNormal(String srcDate) throws ParseException{
		if(StringUtils.isEmpty(srcDate)){
			return null;
		}
		return SDF_NORMAL.parse(srcDate);
	}
	public static Date parseToTime(String srcDate) throws ParseException{
		if(StringUtils.isEmpty(srcDate)){
			return null;
		}
		return SDF_TIME.parse(srcDate);
	}
	
	
	/**
	 *
	 * @author 申铭
	 * @description		String类型的日期转Date	兼容2016-05-27 、20160527与 Fri May 27 10:20:03 CST 2016 三种格式   
	 * @param stringDate
	 * @return
	 * @throws ParseException
	 * @modified
	 */
	public static Date stringToDate(String stringDate) throws ParseException{
		if(StringUtils.isEmpty(stringDate)){
			return null;
		}
		return (stringDate.contains("-")?SDF_NORMAL_.parse(stringDate):stringDate.contains(":")?SDF_US.parse(stringDate):SDF_NORMAL.parse(stringDate));
	}
	
	
	
	
	/**
	 *
	 * @author 申铭
	 * @description	date的toString是英文格式  不方便使用
	 * @param date
	 * @return
	 * @modified
	 */
	public static String dateToString(Date date){
		return SDF_NORMAL_.format(date);
	}

	/**
	 *
	 * @author 申铭
	 * @description	date的toString是英文格式  不方便使用
	 * @param date
	 * @return
	 * @modified
	 */
	public static String dateToTime(Date date){
		return SDF_TIME.format(date);
	}
	
	/**
	 * Date日期转String类型
	 *
	 * @author 小道
	 * @description
	 * @param date
	 * @return
	 * @modified
	 */
	public static String dateToStringNot_(Date date) {
		return SDF_NORMAL.format(date);
	}
	
	/**
	 * Date日期转String类型
	 *
	 * @author 杨枭
	 * @description
	 * @param date
	 * @return
	 * @modified
	 */
	public static String dateToStringSlash(Date date) {
		return SDF_NORMAL_SLASH.format(date);
	}

	/**
	 *
	 * @author 申铭
	 * @description		将date1的年月日、date2的时分秒拼接为一个新的date
	 * @param date1		1970-01-01 **:**:** 
	 * @param date2		****-**-** 00:00:00
	 * @return	date	1970-01-01 00:00:00
	 * @throws ParseException
	 * @modified
	 */
	public static Date jointTwoDates(Date date1,Date date2){
		String stringDate1 = SDF_NORMAL_.format(date1);
		String stringDate2 = SDF_HMS.format(date2);
		String stringDate = stringDate1 + " " + stringDate2;
		Date date = null;
		try{
			date = SDF_TIME.parse(stringDate);
		}catch(ParseException e){
//			throw new BusinessException("拼接时间出错"+e.getMessage());
		}
		return date;
	}
	
	
	/**
	 *
	 * @author 刘佳
	 * @description		将date1的年月日、date2的时分秒毫秒拼接为一个新的date
	 * @param date1		1970-01-01 **:**:** 
	 * @param date2		****-**-** 00:00:00
	 * @return	date	1970-01-01 00:00:00
	 * @throws ParseException
	 * @modified
	 */
	public static Date jointTwoDateSec(Date date1,Date date2) throws BusinessException{
		//TIMEFORMSEC
		String stringDate1 = SDF_NORMAL_.format(date1);
		String stringDate2 = TIMEFORMSEC.format(date2);
		String stringDate = stringDate1 + " " + stringDate2;
		Date date;
		try{
			date =new Date (SDF_TIMEFORMSEC.parse(stringDate).getTime());
		}catch(ParseException e){
			throw new BusinessException("拼接时间出错"+e.getMessage());
		}
		return date;
	}
	/**
	 * 
	 *
	 * @author 
	 * @description 将传入的日期和月份相加，返回一个新的日期
	 * @param date		   日期   yyyyMMdd
	 * @param monthNum   月份值
	 * @return
	 * @throws ParseException 
	 * @modified
	 */
	public static String dateAddMonthNum(String date, int monthNum) throws  ParseException {
		return SDF_NORMAL_.format(dateAddMonthNum(SDF_NORMAL_.parse(date),monthNum));
	}
	
	public static Date dateAddMonthNum(Date date, int monthNum){
		Date tempdate = date;
		Calendar cal = Calendar.getInstance();
		cal.setTime(tempdate);
		cal.add(Calendar.MONTH, monthNum);
		tempdate = (Date) cal.getTime();
		cal = null;
		return tempdate;
	}
	
	public static Date dateAddDayNum(Date date,int dayNum){
		  Calendar c = Calendar.getInstance();
	      c.setTime(date);
	      c.add(Calendar.DAY_OF_MONTH, dayNum);
	      return c.getTime();
	}
	
	/**
	 * 
	 *
	 * @author 
	 * @description 将传入的日期和月份相加，返回一个新的日期
	 * @param date		   日期   yyyyMMdd
	 * @param dayhNum   天数
	 * @return
	 * @throws ParseException 
	 * @modified
	 */
	public static Date dateAddDayNum(String date, int dayNum){
	    Date tempdate = null;           
	    try {
	        tempdate = SDF_NORMAL_.parse(date);
	    } catch (java.text.ParseException e) {
	        e.printStackTrace();
	    }        
	    if (tempdate==null) return null;
	    Calendar cal=Calendar.getInstance();
	    cal.setTime(tempdate);           
	    cal.add(Calendar.DAY_OF_MONTH,dayNum);
	    tempdate=(Date)cal.getTime();
	    cal=null;
	    return tempdate;
	}
	/**
	 *
	 * @author 张春艳
	 * @description  输入两个日期，计算时间间隔天数
	 * @param startDate
	 * @param maturityDate
	 * @return
	 * @throws ParseException 
	 * @throws Exception
	 * @modified
	 */
	public static int calculateIntervalDays(String startDate, String endDate) throws ParseException{
		Date date1,date2;
		date1 = stringToDate(startDate);
		date2 = stringToDate(endDate);
		return calculateIntervalDays(date1, date2);
	}
	
	/**
	 *
	 * @author 杨枭
	 * @description  输入两个日期，传入一个顺延天数,计算时间间隔天数
	 * @param startDate
	 * @param maturityDate
	 * @return
	 * @throws ParseException 
	 * @throws Exception
	 * @modified
	 */
	public static int calculateIntervalDays(String startDate, String endDate, int days) throws ParseException{
		Date date1,date2;
		date1 = stringToDate(startDate);
		date2 = stringToDate(endDate);
		return calculateIntervalDays(date1, date2) + days;
	}
	
	/** * @description  输入两个日期，计算时间间隔天数        Date*/
	public static int calculateIntervalDays(Date startDate, Date endDate){
		Calendar cal1 = Calendar.getInstance();
		cal1.setTime(startDate);
		Calendar cal2 = Calendar.getInstance();
		cal2.setTime(endDate);
		Long l = cal2.getTimeInMillis() - cal1.getTimeInMillis();
		int days = new Long(l / (1000 * 60 * 60 * 24)).intValue();
		return days;
	}
	
	
	/**
	 * 
	 *
	 * @author 申铭
	 * @description   取得两个日期的月份差
	 * @param startDate	 例:20160101
	 * @param endDate	 例:20160301
	 * @return
	 * @throws ParseException 
	 * @modified
	 */
	public static int monthBetween(String startDate, String endDate) throws Exception {
			return monthBetween(SDF_NORMAL_.parse(startDate), SDF_NORMAL_.parse(endDate));
	}
	
	/**
	 *
	 * @author 申铭
	 * @description   取得两个日期的月份差
	 * @param startDate   Date
	 * @param endDate	  Date
	 * @return
	 * @throws ParseException
	 * @modified
	 */
	public static int monthBetween(Date startDate, Date endDate){
		Calendar cal1 = Calendar.getInstance();
		Calendar cal2 = Calendar.getInstance();
		cal1.setTime(startDate);
		cal2.setTime(endDate);
		int years = cal2.get(Calendar.YEAR) - cal1.get(Calendar.YEAR);
		int months = cal2.get(Calendar.MONTH) - cal1.get(Calendar.MONTH);
		int actualMoths = years * 12 + months;
		if(cal1.get(Calendar.DAY_OF_MONTH)<cal2.get(Calendar.DAY_OF_MONTH)){
			actualMoths++;
		}
		cal1 = cal2 = null;
		return actualMoths;
	}
	
	/**
	 * 
	 *
	 * @author 任康
	 * @description 当前日期加一个星期
	 * @param date
	 * @return
	 * @modified
	 */
	public static Date todayNextWeek(Date date) {
		Calendar calendar = Calendar.getInstance();
		calendar.setTime(date);
		calendar.add(Calendar.WEEK_OF_MONTH, 1);
		return calendar.getTime();
	}
	
	/**
	 * 将日期改成中文形式
	 *
	 * @author storm.li
	 * @description
	 * @param systtm
	 * @return
	 * @modified
	 */
	public static String getDateFromCN(String systtm) {
		 String stdate = "";
		 try {
				Date cDate = stringToDate(systtm);
				stdate = getDateFromCN(cDate);
			 } catch (ParseException e) {
				e.printStackTrace();
			 }
		 return stdate;
	}
	
	public static String getDateFromCN(Date date) {
		 return SDF_CN.format(date);
	}
	
	
	public static String getYearFromDate(Date systtm) {
		String systtmStr = DateUtils.dateToStringNot_(systtm);
		return getYearFromDate(systtmStr);
	}
	public static String getYearFromDate(String date){
		String systtmStr = date.replaceAll("-", "");
		return systtmStr.substring(0,4);
	}

	public static String getMonthFromDate(Date systtm) {
		String systtmStr = DateUtils.dateToStringNot_(systtm);
		return getMonthFromDate(systtmStr);
	}
	
	public static String getMonthFromDate(String date){
		String systtmStr = date.replaceAll("-", "");
		return systtmStr.substring(4,6);
	}
	
	public static String getDayFromDate(Date systtm) {
		String systtmStr = DateUtils.dateToStringNot_(systtm);
		return getDayFromDate(systtmStr);
	}
	
	public static String getDayFromDate(String date){
		String systtmStr = date.replaceAll("-", "");
		return systtmStr.substring(6,8);
	}
	
	
	
	
	
	
	/**
	 * 
	 * 转换yyyy-MM-dd HH:mm:ss.sss格式的日期类型
	 * @author 杨枭
	 * @description
	 * @param dateTime
	 * @return
	 * @throws ParseException 
	 * @modified
	 */
	public static Date dateFormatDateTime(Date date) throws ParseException{
		return SDF_TIMEFORMSEC.parse(SDF_TIMEFORMSEC.format(date));
	}
	
	/**
	 * 获取年月日时分秒毫秒
	 * @author 杨枭
	 * @description
	 * @return
	 * @modified
	 */
	public static String getDateTime(){
		return SDF_DATETIME.format(new Date());
	}
	
	/**
	 * 获取当前系统日期
	 * @author 杨枭
	 * @description
	 * @return
	 * @throws ParseException
	 * @modified
	 */
	public static Date getCurrentTime() {
		try {
			Date date = SDFTIMEFORSEC.parse(SDFTIMEFORSEC.format(new Date()));
			return date;
		} catch (ParseException e) {
			e.printStackTrace();
		}
		return null;
	}
	
	/**
	 * 将DateTime日期格式转换成String类型
	 * @author 杨枭
	 * @description
	 * @param dateTime
	 * @return
	 * @modified
	 */
	public static String dateTimeToString (Date dateTime){
		String date = SDF_NORMAL_.format(dateTime);
		String time = TIMEFORMSEC.format(dateTime);
		return date + "T" + time;
	}
	
	/**
	 * 8位数字符串日期转换为10位数字符串日期
	 * 例如：20161013转换2016-10-13
	 * @author 杨枭
	 * @description
	 * @param Date
	 * @return
	 * @throws ParseException 
	 * @modified
	 */
	public static String strDateToStrDateAd_(String Date) throws ParseException{
		Date = Date.replace("-", "");//如果有"-"，就先将"-"替换成""
		return SDF_NORMAL_.format(SDF_NORMAL.parse(Date));
	}

	/**
	 * 获取当前系统日期属于哪个季度
	 * @author 任康
	 * @description
	 * @return
	 * @throws ParseException
	 * @modified
	 */
	public static String getCurrentQuarter(){
		Calendar cal = Calendar.getInstance();
		cal.setTime(SystemInfoUtil.getSystemDate());
		int month = cal.get(Calendar.MONTH)+1;
		if(month==1||month==2||month==3){
			return "1";
		}else if(month==4||month==5||month==6){
			return "2";
		}else if(month==7||month==8||month==9){
			return "3";
		}else if(month==10||month==11||month==12){
			return "4";
		}
		return null;
	}
}
