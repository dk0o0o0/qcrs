package com.linkus.capital.util.enumtype.common;

public class BusinessNoDefConext {

	/**=====================================================
	 * 生成编号开头模式规范
	 *=====================================================
	 */
	public enum NoStartCodeMode{
		
		/**
		 * 票据持仓编号开头
		 */
		BILLBOOK_STARTCODE("p"),
		/**
		 * 债券持仓编号开头
		 */
		BONDBOOK_STARTCODE("z"),
		/**
		 * 同业持仓编号开头
		 */
		INTERBANKBOOK_STARTCODE("t"),
		
		/**
		 * 投组序号开始标志
		 */
		TEAM_STARTCODE("TM"),
		
		/**
		 * 投组序号开始标志
		 */
		COLLECTION_STARTCODE("ts");
		
		private String name;
		
		private  NoStartCodeMode(String name){
			this.name = name;
		}
		
		@Override
		public String toString(){
			return name();
		}
		
		public String getName(){
			return this.name;
		}
		
		
	}
	
	/**=====================================================
	 * 生成序列号代码模式规范
	 *=====================================================
	 */
	public enum NoDefCodeMode{
		
		/**
		 * 生成序列号代码模式规范
		 */
		BOOK_NOCODE("bookid"),
		
		/**
		 * 生成序列号代码模式规范
		 */
		NOTE_NOCODE("noteid"),
		/**
		 * 投组序列号代码模式规范
		 */
		TEAM_NOCDE("examsq"),
		
		COLLECTION_NOCDE("ts"),
		
		PRINT_NOCDE("pt_printtask");
		
		private String name;
		
		private  NoDefCodeMode(String name){
			this.name = name;
		}
		
		@Override
		public String toString(){
			return name();
		}
		
		public String getName(){
			return this.name;
		}
		
		
	}

	
	
	
}
