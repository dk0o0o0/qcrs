package com.linkus.capital.util.enumtype.bond;

/**
 *
 * <p>Title com.linkus.capital.util.enumtype.bond.DeliveryType</p>
 * <p>Description 交割方式</p>
 * <p>Company linkus </p>
 * <p>Copyright Copyright(c)2016</p>
 * @author 申铭
 * @create time: 2016年4月14日 上午10:38:54
 * @version 1.0
 * 
 * @modified records:
 */
public enum DeliveryTypeMode {
	/**其他*/
	OTHERS("0","其他",""),
	/**见券付款*/
	PAD("1","见券付款","ST01"),
	/**见款付券*/
	DAP("2","见款付券","ST02"),
	/**券款对付*/
	DVP("3","券款对付","ST03"),
	/**纯券过户*/
	FOP("4","纯券过户","ST00"),
	/**券券对付*/
	DVD("6","券券对付","ST04"),
	/**券费对付*/
	BLDVP("9","券费对付","ST06");
	
	private String value;
	private String CHName;
	private String csbsName;
	public String getCHName() {
		return CHName;
	}
	private DeliveryTypeMode(String value,String CHName,String csbsName){
		this.value = value;
		this.CHName = CHName;
		this.csbsName = csbsName;
	}
	public String getValue(){
		return this.value;
	}
	public String getCsbsName(){
		return this.csbsName;
	}
}
