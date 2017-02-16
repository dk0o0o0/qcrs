package com.linkus.capital.util.enumtype.common;

/**=====================================================
 * 数据校验类型
 *=======================================================
 */
public enum DataCheckMode{
	/** 经办时合同与明细总分金额校验*/
	RG_CNTR_ITEM_AMOUNT("经办时合同与明细总分金额校验"),
	/** 仅债券使用，经办时明细与投组持仓明细（按持仓号合并）条数校验*/
	RG_ITEM_TEAMBOOKITEM_COUNT("经办时明细与投组持仓明细（按持仓号合并）条数校验"),
	/** 仅债券使用，经办时明细与投组持仓明细金额校验*/
	RG_ITEM_TEAMBOOKITEM_AMOUNT("经办时明细与投组持仓明细金额校验"),
	/** 仅债券使用，记账时持仓与投组持仓金额校验,以及持仓金额判断*/
	AK_BOOK_TEAMBOOK_AMOUNT("记账时持仓与投组持仓金额校验,以及持仓金额判断"),
	/** 记账时判断持仓金额、条数  BONDOL BONDAM COSTAMOUNT TRANSAMOUNT ITEMSUM*/
	AK_BOOK_AMOUNT_ITEMSUM_CHECK("记账时判断持仓金额、条数"),
	/** 记账时判断投组持仓金额*/
	AK_TEAMBOOK_AMOUNT_CHECK("记账时判断投组持仓金额");

	private String CHName;

	private  DataCheckMode(String CHName){
		this.CHName = CHName;
	}
	
	@Override
	public String toString(){
		return name();
	}
	
	public String getCHName(){
		return this.CHName;
	}
	
}
