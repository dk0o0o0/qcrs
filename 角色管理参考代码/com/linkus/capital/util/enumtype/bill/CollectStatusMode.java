package com.linkus.capital.util.enumtype.bill;

/**
	 * 票据持仓托收状态
	 *
	 */
	public enum CollectStatusMode{
		
		/**
		 * 未托收
		 */
		NON_COLLECT("0"),
		
		/**
		 * 已托收
		 */
		COLLECTED("1"),
		
		/**
		 * 托收已打印
		 */
		COLLECTANDPRINT("2"),
		
		/**
		 * 已划回
		 */
		BILL_RETURN("3"),
		
		/**
		 * 转逾期
		 */
		OVERDUE("4");
		
		private String Code;
		
		private  CollectStatusMode(String Code){
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