package com.linkus.capital.util.enumtype.bond;

import com.linkus.capital.common.exception.BusinessException;

/**
 * 债券四分类
 * <p>Title com.linkus.capital.util.enumtype.bond.AssetsTypeMode</p>
 * <p>Description </p>
 * <p>Company linkus </p>
 * <p>Copyright Copyright(c)2016</p>
 * @author tsj
 * @create time: 2016年4月14日 下午3:22:55
 * @version 1.0
 * 
 * @modified records:
 */
public enum AssetsTypeMode {
	/**
	 *  交易性金融资产
	 */
	TRADING("T","交易性金融资产"),

	/**
	 *  应收类款类金融资产
	 */
	RECEIVABLE("D","应收类款类金融资产"),

	/**
	 *  持有至到期金融资产
	 */
	HOLDMATURITY("H","持有至到期金融资产"),

	/**
	 *  可供出售金融资产
	 */
	AVAILABLESALE("A","可供出售金融资产"); 

	private String Code;

	private String CHName;
	
	private  AssetsTypeMode(String Code,String CHName){
		this.Code = Code;
		this.CHName=CHName;
	}

	@Override
	public String toString(){
		return this.CHName;
	}

	public String getCode(){
		return this.Code;
	}
	
	public String getCHName(){
		return this.CHName;
	}
	
	public static String getCHNameByCode(String code) throws BusinessException{
		for(AssetsTypeMode a:AssetsTypeMode.values()){
			if(a.getCode().equals(code)){
				return a.getCHName();
			}
		}
		throw new BusinessException("找不到 "+code+"对应的分类！");
	}
}
