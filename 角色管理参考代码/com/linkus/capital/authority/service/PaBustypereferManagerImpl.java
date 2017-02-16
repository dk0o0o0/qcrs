package com.linkus.capital.authority.service;

import java.util.List;

import org.apache.commons.lang3.StringUtils;
import org.hibernate.criterion.DetachedCriteria;
import org.hibernate.criterion.Restrictions;
import org.ironrhino.core.service.BaseManagerImpl;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import com.linkus.capital.authority.mode.PaBustyperefer;

/**
 *
 * <p>Title com.linkus.capital.authority.service.PaBustypereferManagerImpl</p>
 * <p>Description </p>
 * <p>Company linkus </p>
 * <p>Copyright Copyright(c)2016</p>
 * @author 杨超文
 * @create time: 2016年7月13日下午3:45:33
 * @version 1.0
 * 
 * @modified records:
 */
@Component
public class PaBustypereferManagerImpl extends BaseManagerImpl<PaBustyperefer>
		implements PaBustypereferManager {

	@Override
	@Transactional(readOnly=true)
	public PaBustyperefer findByBusitype(String busiType, String subBusiType) {
		DetachedCriteria dc = detachedCriteria();
		dc.add(Restrictions.eq("busiType", busiType));
		if(StringUtils.isNotBlank(subBusiType)) {
			dc.add(Restrictions.eq("reciteBusiType", busiType));	
		}
		List<PaBustyperefer> listAll = findListByCriteria(dc);
		if (listAll != null && !listAll.isEmpty()) {
			return listAll.get(0);
		}
		return null;
	}

	@Override
	@Transactional(readOnly=true)
	public PaBustyperefer findByRecCode(String recCode) {
		DetachedCriteria dc = detachedCriteria();
		dc.add(Restrictions.eq("ecdsReceCode", recCode));
		List<PaBustyperefer> listAll = findListByCriteria(dc);
		if (listAll != null && !listAll.isEmpty()) {
			return listAll.get(0);
		}
		return null;
	}

	@Override
	@Transactional(readOnly=true)
	public PaBustyperefer findBySendCode(String sendCode) {
		DetachedCriteria dc = detachedCriteria();
		dc.add(Restrictions.eq("ecdsSendCode", sendCode));
		List<PaBustyperefer> listAll = findListByCriteria(dc);
		if (listAll != null && !listAll.isEmpty()) {
			return listAll.get(0);
		}
		return null;
	}

}
