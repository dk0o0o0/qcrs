package com.linkus.capital.authority.service;

import org.ironrhino.core.service.BaseManager;

import com.linkus.capital.authority.mode.PaBustyperefer;

/**
 *
 * <p>Title com.linkus.capital.authority.service.PaBustypereferManager</p>
 * <p>Description </p>
 * <p>Company linkus </p>
 * <p>Copyright Copyright(c)2016</p>
 * @author 杨超文
 * @create time: 2016年7月13日下午3:44:12
 * @version 1.0
 * 
 * @modified records:
 */
public interface PaBustypereferManager extends BaseManager<PaBustyperefer> {
	
	/**
	 * @author 杨超文
	 * @description
	 * @throws Exception
	 * @modified
	 */
	public PaBustyperefer findByBusitype(String busiType, String subBusiType);
	
	/**
	 * @author 杨超文
	 * @description
	 * @throws Exception
	 * @modified
	 */
	public PaBustyperefer findByRecCode(String recCode);
	
	/**
	 * @author 杨超文
	 * @description
	 * @throws Exception
	 * @modified
	 */
	public PaBustyperefer findBySendCode(String sendCode);
}