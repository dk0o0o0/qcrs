/**
 * Project Name:cpms2.0
 * File Name:PaCopackManagerImpl.java
 * Package Name:com.linkus.capital.authority.service
 * Date:2016年9月8日下午8:07:38
 * Copyright (c) 2016, chenzhou1025@126.com All Rights Reserved.
 *
*/

package com.linkus.capital.authority.service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;

import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.criterion.CriteriaSpecification;
import org.hibernate.transform.Transformers;
import org.ironrhino.core.service.BaseManagerImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import com.linkus.capital.authority.mode.PaCopack;
import com.linkus.capital.bill.bussiness.manager.BillCollectionManager;


/**
 * ClassName:PaCopackManagerImpl <br/>
 * Function: TODO ADD FUNCTION. <br/>
 * Reason:	 TODO ADD REASON. <br/>
 * Date:     2016年9月8日 下午8:07:38 <br/>
 * @author   ctx185
 * @version  
 * @since    JDK 1.6
 * @see 	 
 */
@Component
public class PaCopackManagerImpl  extends BaseManagerImpl<PaCopack>implements PaCopackManager{
	@Autowired
	private BillCollectionManager billCollectionManager; 
	
	@Override
	@Transactional
	public void insertBatch(List<Map<String, Object>> list) {
		for(int i=0;i<list.size();i++){
			if(list.get(i)!=null){
				PaCopack temp=(PaCopack)list.get(i).get("pacoPack");
				save(temp);
				List<String> fullBillNoList=(ArrayList<String>)list.get(i).get("fullBillNoList");
				List<String> fullContractNoList=(ArrayList<String>)list.get(i).get("fullContractNoList");
				billCollectionManager.updateCollectionList(temp.getPackId(),fullBillNoList,fullContractNoList);		
			}

		}
		
		// TODO Auto-generated method stub
		
	}

	@Override
	public List<PaCopack> getCopackList(String sql) {
		Session session = sessionFactory.getCurrentSession();
		Query query = session.createSQLQuery(sql);
		query.setResultTransformer(Transformers.aliasToBean(PaCopack.class));
		// TODO Auto-generated method stub
		return query.list();
	}




	
}

