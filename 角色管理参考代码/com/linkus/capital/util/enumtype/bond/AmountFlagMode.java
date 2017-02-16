package com.linkus.capital.util.enumtype.bond;

/**
 *
 * <p>Title com.linkus.capital.util.enumtype.bond.AmountFlagMode</p>
 * <p>Description 债券持仓搜索的限制条件    </p>
 * <p>Company linkus </p>
 * <p>Copyright Copyright(c)2016</p>
 * @author 申铭
 * @create time: 2016年4月18日 上午11:42:17
 * @version 1.0
 * 
 * @modified records:
 */
public enum AmountFlagMode {
	/**本日余额*/
	BONDAM,
	/**上日余额*/
	lastDayAmount,
	/**债券借贷融入债券余额*/
	borrowingBalance;
}
