package com.linkus.capital.util.enumtype.interbank;

/**
*
* <p>Title com.linkus.capital.util.enumtype.interbank.SearchStatusMode</p>
* <p>Description 查询状态</p>
* <p>Company linkus </p>
* <p>Copyright Copyright(c)2016</p>
* @author: 任康
* @create time: 2016年12月7日10:36:54
* @version 1.0
* 
* @modified records:
*/
public enum SearchStatusMode {
	/**同业部未确认*/
	TODO_STATUS("toDo"),
	/**运营部已收息*/
	DONE_STATUS("Done"),
	/**同业部已确认运营部未收息*/
	DOING_STATUS("Doing");
	
	private String value;

	private SearchStatusMode(String value) {
		this.value = value;
	}

	public String getValue() {
		return value;
	}
	
}
