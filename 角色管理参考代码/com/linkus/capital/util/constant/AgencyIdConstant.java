package com.linkus.capital.util.constant;

/**
 *	机构ID常量定义类
 * <p>Title com.linkus.capital.util.constant.AgencyIdConstant</p>
 * <p>Description </p>
 * <p>Company linkus </p>
 * <p>Copyright Copyright(c)2016</p>
 * @author 小道
 * @create time: 2016年9月22日 上午10:13:57
 * @version 1.0
 * 
 * @modified records:
 */
public class AgencyIdConstant {
	// 核心机构ID,记账、结算机构
	public final static String LTTS_AGENCYID_990101 = "990101";

	// 核心机构ID,金融市场部
	public final static String LTTS_AGENCYID_990401 = "990401";

	// 核心机构ID,金融同业部长沙本部
	public final static String LTTS_AGENCYID_922001 = "922001";
	
	// 核心机构ID,金融同业部长沙本部
	public final static String LTTS_AGENCYID_922000 = "922000";
	
	// 核心机构ID,金融同业部广州分部
    public final static String LTTS_AGENCYID_922101= "922101";
   // 核心机构ID,金融同业部广州分行运营管理部
   public final static String LTTS_AGENCYID_0401011= "040101";
		
	// 根据990101机构ID获取990401
	public static String getCoreAgencyId990401ByAgencyId990101(String lttsAgencyId) {
		if (AgencyIdConstant.LTTS_AGENCYID_990101.equals(lttsAgencyId)) {
			lttsAgencyId = AgencyIdConstant.LTTS_AGENCYID_990401;
		}
		return lttsAgencyId;
	}
}
