package com.linkus.capital.util.math;

public class MathUtil {

	 /**
     * 得到金额的大写表示字符串
     * @param val double
     * @return String
     */
    public static String numToStrRMB(double val) {

        String strHanDigi[] = new String[] {"零", "壹", "贰", "叁", "肆", "伍", "陆", "柒", "捌", "玖"};

        String strSign = "";
        String strTail = "";
        long lFraction, lInteger;
        int iJiao, iFen;

        if(val < 0) {
            val = -val;
            strSign = "负";
        }
        if(val > 99999999999999.999 || val < -99999999999999.999) {
            return "数值位数过大!";
        }
        // 四舍五入到分
        long lTemp = Math.round(val * 100);
        lInteger = lTemp / 100;
        lFraction = lTemp % 100;
        iJiao = (int)lFraction / 10;
        iFen = (int)lFraction % 10;
        if(iJiao == 0 && iFen == 0) {
            strTail = "整";
        } else {
            strTail = strHanDigi[iJiao];
            if(iJiao != 0) {
                strTail += "角";
            }
            if(lInteger == 0 && iJiao == 0) { // 零元后不写零几分
                strTail = "";
            }
            if(iFen != 0) {
                strTail += strHanDigi[iFen] + "分";
            }
        }
        return strSign + positiveIntegerToHanStr(String.valueOf(lInteger)) + "元" + strTail;
    }
    
    
    /**
     * 得到金额的大写表示字符串,处理整数部分
     * @param strNumber String
     * @return String
     */
    private static String positiveIntegerToHanStr(String strNumber) 
    { // 输入字符串必须正整数，只允许前导空格(必须右对齐)，不宜有前导零

        String strHanDigi[] = new String[] {"零", "壹", "贰", "叁", "肆", "伍", "陆", "柒", "捌", "玖"};

        String strHanDivi[] = new String[] {"", "拾", "佰", "仟", "万", "拾", "佰", "仟", "亿",
                              "拾", "佰", "仟", "万", "拾", "佰", "仟", "亿",
                              "拾", "佰", "仟", "万", "拾", "佰", "仟"};

        String strRMB = "";
        boolean bLastzero = false;
        boolean bHasvalue = false; // 亿、万进位前有数值标记
        int iLength, iNum;
        iLength = strNumber.length();
        if(iLength > 15) {
            return "数值过大!";
        }
        for(int i = iLength - 1; i >= 0; i--) {
            if(strNumber.charAt(iLength - i - 1) == ' ') {
                continue;
            }
            iNum = strNumber.charAt(iLength - i - 1) - '0';
            if(iNum < 0 || iNum > 9) {
                return "输入含非数字字符!";
            }

            if(iNum != 0) {
                if(bLastzero) {
                    strRMB += strHanDigi[0]; // 若干零后若跟非零值，只显示一个零
                    // 除了亿万前的零不带到后面
                    //if( !( iNum==1 && (i%4)==1 && (bLastzero || i==iLength-1) ) )    // 如十进位前有零也不发壹音用此行
                }
                //if(!(iNum == 1 && (i % 4) == 1 && i == iLength - 1)) { // 十进位处于第一位不发壹音
                //    strRMB += strHanDigi[iNum];
                //}
                strRMB += strHanDigi[iNum];
                strRMB += strHanDivi[i]; // 非零值后加进位，个位为空
                bHasvalue = true; // 置万进位前有值标记

            } else {
                if((i % 8) == 0 || ((i % 8) == 4 && bHasvalue)) { // 亿万之间必须有非零值方显示万
                    strRMB += strHanDivi[i]; // “亿”或“万”
                }
            }
            if(i % 8 == 0) {
                bHasvalue = false; // 万进位前有值标记逢亿复位
            }
            bLastzero = (iNum == 0) && (i % 4 != 0);
        }

        if(strRMB.length() == 0) {
            return strHanDigi[0]; // 输入空字符或"0"，返回"零"
        }
        return strRMB;
    }
}
