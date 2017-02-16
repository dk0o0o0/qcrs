package com.linkus.capital.util.enumtype.bill;

/**=====================================================
 * 回购类型
 *=======================================================
 */
public enum RepoTypeMode{
	
	/**
	 * 非回购类型
	 */
	NOT_REPO("N"),
	/**
	 * 回购类型
	 */
	REPO("Y");
	
	private String Code;
	
	private  RepoTypeMode(String Code){
		this.Code = Code;
	}
	
	@Override
	public String toString(){
		return name();
	}
	
	public String getCode(){
		return this.Code;
	}
	
}
