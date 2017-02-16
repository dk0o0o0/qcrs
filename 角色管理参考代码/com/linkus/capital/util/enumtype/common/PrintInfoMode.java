package com.linkus.capital.util.enumtype.common;

public enum PrintInfoMode {
    
	/**
	 * 审批意见同意
	 */
	APPROVAL_MESSALL("同意"),
	
	/**
	 * 普通审批单审核意见
	 */
	APPROVAL_MESS("符合交易规定，同意成交。"),
	
	/**
	 * 经办人审批单意见
	 */
	APPROVAL_INPTUS_MESS("已核对相关交易要素同意交易本人对上述行为负责"),
	/**
	 * 债券投标审核意见
	 */
	APPROVAL_MESS_20007("同意投标。"),
	
	/**
	 * 本期同业存单审核意见
	 */
	APPROVAL_MESS_50034("符合规定，同意发行本期同业存单。"),
	
	/**
	 * 同业存放和存放同业存入审批意见 同业业务中台审批意见
	 */
	APPROVAL_MESS_50008_50010("已审核交易，同意交易。本人对上述行为负责。"),
	
	/**
	 * 审批单备注
	 */
	APPROVAL_REMARK("已复核相关要素，同意交易。本人对上述行为负责。"),
	
	/**
	 * 到期审批单审批意见
	 */
	DUE_APPROVAL_MESS("符合交易规定，同意成交。"),
	
	/**
	 * 到期审批单再贴回购
	 */
	DUE_APPROVAL_MESS_30014("票据真实，合规，资料合格，完整，已验证对手方身份，同意《再贴回购清单》所列再贴回购。本人对上述行为负责。"),
	
	/**
	 * 审批单再贴卖出
	 */
	DUE_APPROVAL_MESS_30005("票据真实，合规，资料合格，完整，已验证对手方身份，同意《再贴现清单》所列再贴回购。本人对上述行为负责。"),
	/**
	 * 转贴买入
	 */
	DUE_APPROVAL_MESS_30003("票据真实、合规，资料合格、完整，已验证对手方身份，同意《转贴现清单》所列票据转贴现。本人对上述行为负责。"),
	/**
	 * 再贴买入
	 */
	DUE_APPROVAL_MESS_30007("票据真实、合规，资料合格、完整，已验证对手方身份，同意《再贴买入清单》所列票据转贴现。本人对上述行为负责。"),
	/**
	 * 逆回购
	 */
	DUE_APPROVAL_MESS_30009("票据真实、合规，资料合格、完整，已验证对手方身份，同意《逆回购清单》所列票据转贴现。本人对上述行为负责。"),
	/**
	 * 正回购
	 */
	DUE_APPROVAL_MESS_30010("票据真实、合规，资料合格、完整，已验证对手方身份，同意《正回购清单》所列票据转贴现。本人对上述行为负责。"),
	
	/**
	 * 贴现审票意见
	 */
	APPROVAL_REVIEW_BILL_MESS("已审验通过"),
	/**
	 * 质押审票意见
	 */
	APPROVAL_REVIEW_BILL_MESS_30026("同意《质押清单》所列票据入库。本人对上述行为负责。"),
	
	/**
	 * 到期审批单复核人意见
	 */
	DUE_APPROVAL_REVIEW_INFO_MESS("已复审回购资料和票据，复核合同，回购要素，同意《回购到期清单》所列票据逆回购。本人对上述行为负责。"),
	/**
	 * 转贴审批单复核人意见
	 */
	TRA_APPROVAL_REVIEW_INFO_MESS("已复审转贴现资料和票据，复核合同，转贴现要素，同意《转贴现清单》所列票据转贴现。本人对上述行为负责。"),
	/**
	 * 再贴审批单复核人意见
	 */
	AGI_APPROVAL_REVIEW_INFO_MESS("已复审再贴现资料和票据，复核合同，再贴现要素，同意《再贴现清单》所列票据再贴现。本人对上述行为负责。"),
	/**
	 * 再贴审批单复核人意见
	 */
	AGH_APPROVAL_REVIEW_INFO_MESS("已复审再贴现资料和票据，复核合同，再贴现要素，同意《再贴回购清单》所列票据再贴现。本人对上述行为负责。");

	private String CHName;
	
	private  PrintInfoMode(String CHName){
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
