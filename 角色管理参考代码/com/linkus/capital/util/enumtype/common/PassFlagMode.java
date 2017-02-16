package com.linkus.capital.util.enumtype.common;

/**
 *
 * <p>Title com.linkus.capital.util.enumtype.common.ExamineStartOpinion</p>
 * <p>Description 审批意见</p>
 * <p>Company linkus </p>
 * <p>Copyright Copyright(c)2016</p>
 * @author 申铭
 * @create time: 2016年6月13日 下午5:27:25
 * @version 1.0
 * 
 * @modified records:
 */
public enum PassFlagMode{
	PASS("同意"),
	FAIL("不同意"),
	TERMINATE("终止")
	;
	
	private String CHName;
	
	private PassFlagMode(String CHName){
		this.CHName = CHName;
	}
	
	public String getCHName(){
		return this.CHName;
	}
}
