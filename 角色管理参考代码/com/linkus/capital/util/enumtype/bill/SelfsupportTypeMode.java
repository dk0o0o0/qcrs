package com.linkus.capital.util.enumtype.bill;

/**
 *
 * <p>Title com.linkus.capital.util.enumtype.bill.SelfsupportTypeMode</p>
 * <p>Description </p>
 * <p>Company linkus </p>
 * <p>Copyright Copyright(c)2016</p>
 * @author 李颖
 * @create time: 2016年5月26日 下午3:54:17
 * @version 1.0
 * 
 * @modified records:
 */
public enum SelfsupportTypeMode {
	/**自营**/
	SELFSUPPORT("1"),
	/**代保管**/
	NOT_SELFSUPPORT("0");
	private String code;
	/**
	 *
	 * @author 李颖
	 * @description
	 * @param code
	 * @modified
	 */
	private SelfsupportTypeMode(String code) {
		this.code = code;
	}

	public String getCode() {
		return code;
	}

}
