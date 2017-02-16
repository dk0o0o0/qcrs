package com.linkus.capital.util.datacal;

import java.math.BigDecimal;

import org.apache.commons.lang3.StringUtils;

/**
 * 数据计算工具类
 *
 * <p>Title com.linkus.capital.util.datacal.DataCalUtil</p>
 * <p>Description </p>
 * <p>Company linkus </p>
 * <p>Copyright Copyright(c)2016</p>
 * @author 小道
 * @create time: 2016年3月3日 下午4:52:30
 * @version 1.0
 * 
 * @modified records:
 */
public class DataCalUtil {
	
	private static final int DEF_DIV_SCALE = 2;		//默认除法运算精度   
	
	/**
	 * 提供精确的加法运算
	 *
	 * @author 小道
	 * @description
	 * @param v1 被加数
	 * @param v2 加数 
	 * @return 两个参数的和
	 * @modified
	 */
	public static double add(double v1, double v2) {
		BigDecimal b1 = new BigDecimal(Double.toString(v1));
		BigDecimal b2 = new BigDecimal(Double.toString(v2));
		return b1.add(b2).doubleValue();
	}
	
	/**
	 * 提供精确的加法运算
	 *
	 * @author 小道
	 * @description
	 * @param v1 被加数
	 * @param v2 加数 
	 * @return 两个参数的和
	 * @modified
	 */
	public static BigDecimal add(BigDecimal b1, double v2) {
		BigDecimal b2 = new BigDecimal(Double.toString(v2));
		return b1.add(b2);
	}
	
	/**
	 * 提供精确的减法运算
	 *
	 * @author 小道
	 * @description
	 * @param v1 v1 被减数  
	 * @param v2 v2 减数  
	 * @return 两个参数的差
	 * @modified
	 */
	public static double sub(double v1, double v2) {
		BigDecimal b1 = new BigDecimal(Double.toString(v1));
		BigDecimal b2 = new BigDecimal(Double.toString(v2));
		return b1.subtract(b2).doubleValue();
	}
	
	
	/**
	 * 提供精确的乘法运算
	 *
	 * @author 小道
	 * @description
	 * @param  v1 被乘数
	 * @param  v2 乘数  
	 * @return 两个参数的积  
	 * @modified
	 */
	public static double mul(double v1, double v2) {
		BigDecimal b1 = new BigDecimal(Double.toString(v1));
		BigDecimal b2 = new BigDecimal(Double.toString(v2));
		return b1.multiply(b2).doubleValue();
	}
	
	
	/***
	 * 提供（相对）精确的除法运算，当发生除不尽的情况时，
	 * 精确到 小数点以后10位，以后的数字四舍五入
	 *
	 * @author 小道
	 * @description
	 * @param  v1 v1 被除数
	 * @param  v2 v2 除数  
	 * @return 两个参数的商  
	 * @modified
	 */
	public static double div(double v1, double v2) {
		return div(v1, v2, DEF_DIV_SCALE);
	}
	
	
	/**
	 * 提供（相对）精确的除法运算。当发生除不尽的情况时，
	 * 由scale参数指 定精度，以后的数字四舍五入
	 *
	 * @author 小道
	 * @description
	 * @param  v1 被除数  
	 * @param  v2 除数   
	 * @param  scale 表示表示需要精确到小数点以后几位
	 * @return 两个参数的商  
	 * @modified
	 */
	public static double div(double v1, double v2, int scale) {
		if (scale < 0) {
			throw new IllegalArgumentException("The scale must be a positive integer or zero");
		}
		BigDecimal b1 = new BigDecimal(Double.toString(v1));
		BigDecimal b2 = new BigDecimal(Double.toString(v2));
		return b1.divide(b2, scale, BigDecimal.ROUND_HALF_UP).doubleValue();
	}
	
	/**
	 * 提供（相对）精确的除法运算。当发生除不尽的情况时，
	 * 由scale参数指 定精度，以后的数字四舍五入
	 *
	 * @author 小道
	 * @description
	 * @param  v1 被除数  
	 * @param  v2 除数   
	 * @param  scale 表示表示需要精确到小数点以后几位
	 * @return 两个参数的商  
	 * @modified
	 */
	public static BigDecimal div(BigDecimal v1, double v2, int scale) {
		if (scale < 0) {
			throw new IllegalArgumentException("The scale must be a positive integer or zero");
		}
		BigDecimal b2 = new BigDecimal(Double.toString(v2));
		return v1.divide(b2, scale, BigDecimal.ROUND_HALF_UP);
	}
	 

	/**
	 * 提供精确的小数位四舍五入处理
	 *
	 * @author 小道
	 * @description
	 * @param  v 需要四舍五入的数字
	 * @param  scale 小数点后保留几位  
	 * @return 四舍五入后的结果
	 * @modified
	 */
	public static double round(double v, int scale) {
		if (scale < 0) {
			throw new IllegalArgumentException("The scale must be a positive integer or zero");
		}
		BigDecimal b = new BigDecimal(Double.toString(v));
		BigDecimal one = new BigDecimal("1");
		return b.divide(one, scale, BigDecimal.ROUND_HALF_UP).doubleValue();
	}
	
	/**
	 * 提供精确的小数位四舍五入处理
	 *
	 * @author 小道
	 * @description
	 * @param  v 需要四舍五入的数字
	 * @param  scale 小数点后保留几位  
	 * @return 四舍五入后的结果
	 * @modified
	 */
	public static BigDecimal round(BigDecimal b, int scale) {
		if (scale < 0) {
			throw new IllegalArgumentException("The scale must be a positive integer or zero");
		}
		BigDecimal one = new BigDecimal("1");
		return b.divide(one, scale, BigDecimal.ROUND_HALF_UP);
	}
	
	/**
	 * 字符串转成bigdecimal
	 * @author 杨枭
	 * @description
	 * @param bigDecimalNum
	 * @return
	 * @modified
	 */
	public static BigDecimal stringToBigDecimal(String bigDecimalNum){
		if(StringUtils.isNotBlank(bigDecimalNum)){
			return new BigDecimal(bigDecimalNum);
		}
		return null;
		
	}
	
	/**
	 * bigdecimal转换成字符串
	 * @author 杨枭
	 * @description
	 * @param bigDecimalNum
	 * @return
	 * @modified
	 */
	public static String bigDecimalToString(BigDecimal bigDecimal) {
		if (bigDecimal != null)
			return bigDecimal.toString();
		return null;
	}
}
