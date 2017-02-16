package com.linkus.capital.util.enumtype.bond;

/**
 *
 * <p>Title com.linkus.capital.util.enumtype.bond.ExercisedTypeMode</p>
 * <p>Description 选择权类别</p>
 * <p>Company linkus </p>
 * <p>Copyright Copyright(c)2016</p>
 * @author 申铭
 * @create time: 2016年12月13日 下午4:50:18
 * @version 1.0
 * 
 * @modified records:
 */
public enum ExercisedTypeMode {
	/**投资人选择权*/
	INVESTORS("01","投资人选择权"),
	/**发行人选择权*/
	ISSUER("02","发行人选择权");
	
	private String value;
	
	private String CHName;
	
	private ExercisedTypeMode(String value,String CHName){
		this.value = value;
		this.CHName = CHName;
	}
	
	public String getValue(){
		return this.value;
	}

	public String getCHName() {
		return CHName;
	}
	
}
