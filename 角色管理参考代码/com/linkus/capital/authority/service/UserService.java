/**
 * Project Name:cpms2.0
 * File Name:UserService.java
 * Package Name:com.linkus.capital.authority.service
 * Date:2016年10月24日上午10:53:57
 * Copyright (c) 2016, chenzhou1025@126.com All Rights Reserved.
 *
*/

package com.linkus.capital.authority.service;

import java.util.HashMap;
import java.util.Map;

import org.hibernate.criterion.DetachedCriteria;
import org.hibernate.criterion.Restrictions;
import org.ironrhino.core.service.BaseManagerImpl;
import org.ironrhino.security.model.User;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

/**
 * ClassName:UserService <br/>
 * Function: TODO ADD FUNCTION. <br/>
 * Reason:	 TODO ADD REASON. <br/>
 * Date:     2016年10月24日 上午10:53:57 <br/>
 * @author   ctx185
 * @version  
 * @since    JDK 1.6
 * @see 	 
 */
@Component
public class UserService extends BaseManagerImpl<User>{
	@Transactional
	public Map<String,String> checkUser(String userName,String passWord){
		User userTemp=getUserByUserName(userName);
		Map<String,String> returnMap=new HashMap<String,String>();
		if(userTemp==null){
			returnMap.put("msg", "用户不存在!");
		}else{
			String msg="";
			if("1".equals(userTemp.getLockStatus())){
				msg=msg+"用户被锁定请联系管理员解锁！";
			}
			if(!userTemp.isEnabled()){
				msg=msg+"用户未激活！请联系管理员启用！";
			}
			if("UC".equals(userTemp.getApprovalStatus())){
				msg=msg+"用户未审核！请联系管理员审核！";
			}
			returnMap.put("msg", msg);
			if(msg.equals("")){
				if(getUserByUserNameAndPwd(userName,passWord)==null){
					returnMap.put("msg", "密码错误!");
					userTemp.setErrorNumber((userTemp.getErrorNumber()+1));
					if(userTemp.getErrorNumber()>=3){
						userTemp.setLockStatus("1");
					}
					update(userTemp);
				}else{
					userTemp.setErrorNumber(0);
					update(userTemp);
				}
			}else{
				return returnMap;
			}
		}
		
		
		return returnMap;
		
	}
	
	public User getUserByUserName(String userName){
		DetachedCriteria dc = detachedCriteria();
		dc.add(Restrictions.eq("username", userName));
		return this.findByCriteria(dc);
	}
	
	private User getUserByUserNameAndPwd(String userName,String passWord){
		DetachedCriteria dc = detachedCriteria();
		dc.add(Restrictions.eq("username", userName));
		dc.add(Restrictions.eq("password", passWord));
		return this.findByCriteria(dc);
	}
}

