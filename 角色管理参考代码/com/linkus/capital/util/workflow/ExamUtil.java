/**
 * Project Name:cpms2.0
 * File Name:ExamUtil.java
 * Package Name:com.linkus.capital.util.workflow
 * Date:2016年5月4日上午10:04:16
 * Copyright (c) 2016, chenzhou1025@126.com All Rights Reserved.
 *
*/

package com.linkus.capital.util.workflow;

import java.lang.reflect.Method;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.Vector;

import org.ironrhino.core.sequence.SimpleSequence;
import org.ironrhino.core.util.ApplicationContextUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.linkus.capital.common.db.CpmsBaseManager;
import com.linkus.capital.common.exception.BusinessException;
import com.linkus.capital.common.exception.constant.BusinessExceptionConstant;
import com.linkus.capital.util.enumtype.common.ApprovalResultMode;
import com.linkus.capital.util.enumtype.common.BusiTypeMode;
import com.linkus.gw.util.StringUtil;

/**
 * ClassName:ExamUtil <br/>
 * Function: TODO ADD FUNCTION. <br/>
 * Reason_#_REASON_#_REASON:	 TODO ADD REASON_#_REASON. <br/>
 * Date:     2016年5月4日 上午10:04:16 <br/>
 * @author   ctx185
 * @version  
 * @since    JDK 1.
 * @see 	 
 */
@Component
public class ExamUtil{
	@Autowired
	private CpmsBaseManager<?> cpmsBaseManager;
	//protected CpmsBaseManager<?> cpmsBaseManager = ApplicationContextUtils.getBean(CpmsBaseManagerImpl.class);

	private static final String ITEMFLAG = "item";
	private static final String CNTRFLAG = "cntr";
	private static final String PR_MONTH = "month";
	private static final String SUP_SQL_SPLIT = "_#_";
	private static final String EXTYPE_0 = "0";   // 普通类型
	private static final String EXTYPE_1 = "1";   // 聚合维度
	private static final String EXTYPE_2 = "2";   // 阀值维度
	
	public  List<Map<String, Object>> getCntrList(String contractNo,String cntrTab) throws BusinessException {
		String sql = "select * from "+cntrTab+"  where contractno= '"+contractNo+"'";
		return  transList(cpmsBaseManager.findMapList(sql));
	}
	
	public  List<Map<String, Object>> findExamPath(List cntrList ,
			String contractNo , String findDeptid ,String cntrTab , String itemTab,String busiType) throws BusinessException{
		
		StringBuffer searchExamPathSqls = new StringBuffer() ; 
		for( int i = 0 ; i< cntrList.size() ; i++){
			Map<String, Object> cntr = (Map<String, Object>)cntrList.get(i);
			Map<String, Object> ExamParamter = initExamParamter(busiType,findDeptid);
			
			String searchExamPathSql = getsearchExamPathSql((Map)ExamParamter.get("typeMap"),(Map)ExamParamter.get("paramterMap"),cntr,cntrTab,itemTab);
			searchExamPathSqls.append(searchExamPathSql);
			if(searchExamPathSql == null ||"".equals(searchExamPathSql)){
				return new ArrayList<Map<String,Object>>();
			}
			searchExamPathSqls.append(" union ");
		}
		if(searchExamPathSqls.length() > 0){
			searchExamPathSqls.setLength(searchExamPathSqls.length() - " union ".length());
		}
		List examInfoList = getExamInfo(searchExamPathSqls.toString());
		List examPathList = getExamPathList(findDeptid, examInfoList);
		addExamInfo(contractNo, searchExamPathSqls.toString(), examPathList);
		return examPathList;
	}
	
	public  Map<String, Object> initExamParamter(String busiType,String departmentCode) throws BusinessException{
		
		Map<String, Object> returnMap = new HashMap<String, Object>();
		List<Map<String, Object>> examTypeList = getExamType(busiType,departmentCode);
		Map<String, Object> typeMap = new HashMap<String, Object> ();
		for (int i = 0; i< examTypeList.size() ; i++){
			
			Map<String, Object> examType = (Map<String, Object>)examTypeList.get(i);
			String flowid = (String)examType.get("flowid");
			if(typeMap.containsKey(flowid)){
				throw new BusinessException("出错了，审批依据不唯一，审批ID="+flowid);
			}
			//Map<String, Object> examMap = new HashMap<String, Object>();
			typeMap.put(flowid, examType);
		}
		List<Map<String, Object>> paramterList = getExamParamter(busiType,departmentCode);
		Map<String, List<Map<String, Object>>> paramterMap = new HashMap<String, List<Map<String, Object>>> ();
		for (int i = 0; i< paramterList.size() ; i++){
			
			Map<String, Object> examParamterMap = (Map<String, Object>)paramterList.get(i);
			String flowid = (String)examParamterMap.get("flowid");
			List<Map<String, Object>>  examList = null;
			if(paramterMap.containsKey((flowid))){
				examList = paramterMap.get((flowid));
			}else {
				examList = new ArrayList<Map<String, Object>> ();
			}
			examList.add(examParamterMap);
			paramterMap.put(flowid, examList);
		}
		returnMap.put("typeMap", typeMap);
		returnMap.put("paramterMap", paramterMap);
		return returnMap;
	}
	
	public  List<Map<String, Object>> getExamType(String busiType,String departmentCode) throws BusinessException {
		String sql = "select typeset.approvalbasisid as approvalBasisId,typeset.busitype as busiType,"
				+ "typeset.getcntrfieldtomap as getCntrFieldToMap,typeset.approvedparachinaname as approvedparachinaname,"
				+ "typeset.contractonly as contractonly,typeset.retionaleid as retionaleId,type.flowid as flowid,"
				+ "type.departmentcode as departmentCode,type.examinepathname as examinePathName,"
				+ "type.contractbasistype as contractBasisType  from xt_exam_type type,xt_exam_type_set typeset  "
				+ "where type.approvalBasisId=typeset.approvalBasisId "
				+ "and  typeset.busiType = '"+busiType+"' and type.departmentCode = '"+departmentCode+"'";
		return  transList(cpmsBaseManager.findMapList(sql));
	}
	
	public  List<Map<String, Object>>  getExamParamter(String busiType,String departmentCode) throws BusinessException {
		String sql = "select paset.approvalid,paset.busitype as busiType,paset.dimensionname as dimensionname,"
				+ "paset.paratype as paraType,paset.papaid as papaid,pa.flowid as flowid,"
				+ "pa.approvalidparava as approvalidparava,pa.departmentcode as departmentCode,"
				+ "pasetcfg.approvaltype as  approvalType,pasetcfg.approvalcondition as approvalCondition,"
				+ "pasetcfg.approvedsql as approvedSql,pasetcfg.methodname as methodName,pasetcfg.classespath as classesPath"
				+ " from xt_exam_paramter pa,xt_exam_paramter_set paset,xt_exam_paramter_set_cfg pasetcfg "
				+ " where pa.departmentcode = '"+departmentCode+"' and pa.approvalid = pasetcfg.approvalid "
				+" and pasetcfg.approvalid= paset.approvalid and pa.approvalid=paset.approvalid "
				+" and flowid in(select type.flowid from xt_exam_type type,xt_exam_type_set typeset  "
				+" where type.approvalbasisid=typeset.approvalbasisid and  typeset.busitype = '"+busiType+"' and type.departmentcode = '"+departmentCode+"')  ";
		return  transList(cpmsBaseManager.findMapList(sql));
	}
	
	public  boolean hasSumParamter(String flowid) throws BusinessException {
		String findExamSumParamterSql = " select count(1) as totalsize from xt_exam_paramter pa,xt_exam_paramter_set_cfg pasetcfg where pa.approvalId=pasetcfg.approvalId and pasetcfg.approvalType = '1' and pa.flowid = '"+flowid+"'";
		List list=cpmsBaseManager.findMapList(findExamSumParamterSql);
		int count = Integer.parseInt(((Map)list.get(0)).get("totalsize").toString());
		return count > 0;
	}

	public  List getExamInfo(String sql) throws BusinessException {
		return  transList(cpmsBaseManager.findMapList(sql));
	}	
	/**
	 * 找寻适合的审批路线
	 * @param typeMap
	 * @param paramterMap
	 * @param cntr
	 * @param cntrTab
	 * @throws Exception 
	 */
	public  String getsearchExamPathSql(Map typeMap,Map paramterMap, Map cntr, String cntrTab,String itemTab) throws BusinessException{
		
		return getsearchExamPathSql(typeMap, paramterMap,  cntr,  cntrTab, itemTab , false); 
	}
	/**
	 * 找寻适合的审批路线
	 * @param typeMap
	 * @param paramterMap
	 * @param cntr
	 * @param cntrTab
	 * @param hasSumParamter 仅用于测试新建审批信息的SQL正确性
	 * @throws Exception 
	 */
	public   String getsearchExamPathSql(Map typeMap,Map paramterMap, Map cntr, String cntrTab,String itemTab,boolean hasSumParamter) throws BusinessException{
		

		Map findSqlMap = new HashMap();
		Map selectSqlsMap = new HashMap();
		Map whereSqlsMap = new HashMap();
		Map cntrWhereSqlsMap = new HashMap();
		Map judgeSqlsMqp = new HashMap();
		Set isSumTypesSet = new HashSet();
		
		Map	returnMap = getSumParamterSql(typeMap,cntrTab ,itemTab,hasSumParamter ); //获取聚合审批依据的SQL
		selectSqlsMap.putAll((Map)returnMap.get("selectSqlMap") );
		isSumTypesSet.addAll((Set) returnMap.get("isSumTypeSet")); // 将聚合审批依据的审批参数标记出来
		selectSqlsMap.putAll(getTypeSql(typeMap, isSumTypesSet,cntrTab ,itemTab)); //取非聚合审批依据的SQL
		
		Map returnWhereMap = getParamterSql(typeMap,paramterMap, cntr,isSumTypesSet);
		whereSqlsMap.putAll((Map)returnWhereMap.get("whereSqlMap")); // 获取维度的SQL
		cntrWhereSqlsMap.putAll((Map)returnWhereMap.get("cntrWhereSqlMap")); // 获取维度的SQL
		judgeSqlsMqp.putAll((Map)returnWhereMap.get("judgeSqlMqp")); // 获取维度的SQL
		StringBuffer searchExamPathSql = getSql((String)cntr.get("contractno"),selectSqlsMap, whereSqlsMap,cntrWhereSqlsMap,judgeSqlsMqp,cntrTab);
		//RsTemplate.getLogger().info("TC.X	查询审批路径，合同号：["+cntr.get("contractNo")+"],SQL："+searchExamPathSql.toString());
		if(searchExamPathSql == null ||"".equals(searchExamPathSql)){
			throw new BusinessException("ERROR:\t审批流参数配置可能出现错误，请联系管理员。审批流动态SQL为空。");
		}
		return searchExamPathSql.toString();
	}
	
	/**
	 * 获取聚合审批依据的SQL
	 * @param typeMap
	 * @param sumParamterMap
	 * @param cntr
	 * @param cntrTab
	 * @return
	 * @throws Exception 
	 */
	
		
	private  Map getSumParamterSql(Map typeMap, String cntrTab, String itemTab,boolean hasSumParamter) throws BusinessException {
		Iterator typeIt = typeMap.keySet().iterator();
		Map selectSqlMap = new HashMap();
		Set isSumTypeSet = new HashSet();
		while(typeIt.hasNext()){
			
			Map typeExamMap = (Map)(typeMap.get((String)(typeIt.next())));
			String flowid = (String)typeExamMap.get("flowid");
			String getCntrFieldToMap = (String)typeExamMap.get("getcntrfieldtomap");
			String contractBasisType = (String)typeExamMap.get("contractbasistype");
			if(hasSumParamter(flowid) || hasSumParamter){
				StringBuffer selectSql = new StringBuffer();
				selectSql.append(" select '").append(flowid).append("' flowid , sum(").append(getCntrFieldToMap).append(") value from ").append(getTabNa(cntrTab, itemTab, contractBasisType));
				selectSqlMap.put(flowid, selectSql);
				isSumTypeSet.add(flowid);
			}
		}
		Map returnMap = new HashMap();
		returnMap.put("selectSqlMap",selectSqlMap);
		returnMap.put("isSumTypeSet",isSumTypeSet);
		return returnMap;
	}
	
	private static String getTabNa(String cntrTab, String itemTab, String contractBasisType) throws BusinessException {
		String tabNa = null;
		if("1".equals(contractBasisType)){
			tabNa = cntrTab+" cntr ";
		}else{
			if(StringUtil.isEmpty(itemTab)){
				throw new BusinessException(BusinessExceptionConstant.E13002);
			}
			tabNa = itemTab+" item ";
		}
		return tabNa;
	}
	
	/**
	 * 取非聚合审批依据的SQL
	 * @param typeMap
	 * @param cntrTab
	 * @param isSumTypesSet
	 * @return
	 * @throws BusinessException 
	 */
	private static Map getTypeSql(Map typeMap,Set isSumTypesSet,String cntrTab,String itemTab) throws BusinessException {
		
		Iterator typeIt = typeMap.keySet().iterator();
		Map selectSqlMap = new HashMap();
		while(typeIt.hasNext()){
			
			Map typeExamMap = (Map)(typeMap.get((String)(typeIt.next())));
			String flowid = (String)typeExamMap.get("flowid");
			String getCntrFieldToMap = (String)typeExamMap.get("getcntrfieldtomap");
			String contractBasisType = (String)typeExamMap.get("contractbasistype");
			if(!isSumTypesSet.contains(flowid)){
				
				StringBuffer selectSql = new StringBuffer();
				selectSql.append(" select '").append(flowid).append("' flowid ,").append(getCntrFieldToMap).append(" value  from ").append(getTabNa(cntrTab, itemTab, contractBasisType));
				selectSqlMap.put(flowid, selectSql);
			}
		}
		return selectSqlMap;
	}
	
	/**
	 * 获取维度的SQL
	 * @param paramterMap
	 * @param cntr
	 * @param whereSqlsMap
	 * @param isSumTypesSet
	 * @return
	 * @throws Exception 
	 */
	private  Map getParamterSql(Map typeMap , Map paramterMap, Map cntr,Set isSumTypesSet) throws BusinessException {
		
		Map returnWhereMap = new HashMap();
		Map returnMap = new HashMap();
		Map whereSqlMap = new HashMap();
		Map cntrWhereSqlMap = new HashMap();
		Map judgeSqlMqp = new HashMap();
		Iterator paramterIt = paramterMap.keySet().iterator();
		while(paramterIt.hasNext()){
			
			List examList = (List)(paramterMap.get((String)(paramterIt.next())));
			for(int i =0 ; examList.size() > i ;i++){
				Map paramterExamMap = (Map)examList.get(i);
				String flowid = (String)paramterExamMap.get("flowid");
				String approvalCondition = (String)paramterExamMap.get("approvalcondition");
				String paraType = (String)paramterExamMap.get("paratype");
				String approvalType = (String)paramterExamMap.get("approvaltype");
				String methodName = (String)paramterExamMap.get("methodname");
				String classesPath = (String)paramterExamMap.get("classespath");
				String approvedSql = (String)paramterExamMap.get("approvedsql");
				
				StringBuffer whereValue = getWhereValue(cntr, paramterExamMap,flowid, approvalCondition, approvalType);
				String remakeSupsql = replace(approvedSql,SUP_SQL_SPLIT,cntr); // 将approvedSql进行加工
				returnMap = getWhereSqlMap(typeMap, cntr, isSumTypesSet,whereSqlMap,cntrWhereSqlMap,judgeSqlMqp, flowid, approvalCondition,methodName,classesPath, paraType, whereValue.toString(),approvalType,remakeSupsql);
				whereSqlMap.putAll((Map)returnMap.get("whereSqlMap"));
				cntrWhereSqlMap.putAll((Map)returnMap.get("cntrWhereSqlMap"));
				judgeSqlMqp.putAll((Map)returnMap.get("judgeSqlMqp"));
			}
		}
		returnWhereMap.put("whereSqlMap", whereSqlMap);
		returnWhereMap.put("cntrWhereSqlMap", cntrWhereSqlMap);
		returnWhereMap.put("judgeSqlMqp", judgeSqlMqp);
		return returnWhereMap;
	}
	
	/**
	 * 将结果集拼接成一条SQL语句
	 * @param cntr
	 * @param selectSqlsMap
	 * @param whereSqlsMap
	 * @param groupSqlsMap
	 * @return
	 */
	private static StringBuffer getSql(String  contractNo,
			Map selectSqlsMap, Map whereSqlsMap,Map cntrWhereSqlsMap,Map judgeSqlsMqp, String cntrTab) {
		
		StringBuffer searchExamPathSql = new StringBuffer();
		Iterator selectSqlIt = selectSqlsMap.keySet().iterator();
		while(selectSqlIt.hasNext()){
			
			String flowid = (String)selectSqlIt.next();
			StringBuffer selectSql = (StringBuffer)(selectSqlsMap.get((flowid)));
			searchExamPathSql.append(selectSql);   // 1. 拼接select语句
			if(!whereSqlsMap.containsKey(flowid)){ // 2. 拼接where语句，支持没有设置维度的情况，直接用合同号进行匹配
				
				searchExamPathSql.append(" where ").append(" contractNo ='").append(contractNo).append("' ");
			}else{
				StringBuffer whereSql = (StringBuffer)(whereSqlsMap.get((flowid)));
				searchExamPathSql.append(whereSql);
			}
			if(cntrWhereSqlsMap.containsKey(flowid)){ // 3. 拼接where语句，当审批依据取值表为明细表，但维度信息在合同表中时，用下列方式拼接
				
				StringBuffer whereSql = (StringBuffer)(cntrWhereSqlsMap.get((flowid)));
				searchExamPathSql.append(" and contractNo in ( select contractNo from ").append(cntrTab).append(" cntr ").append(whereSql).append(")");
			}
			if(judgeSqlsMqp.containsKey(flowid)){ // 4. 拼接阀值语句
				
				StringBuffer whereSql = (StringBuffer)(judgeSqlsMqp.get((flowid)));
				searchExamPathSql.append(whereSql);
			}
			searchExamPathSql.append(" union ");
		}
		if(searchExamPathSql.length() >0){
			searchExamPathSql.setLength(searchExamPathSql.length() - " union ".length());
		}
		return searchExamPathSql;
	}
	
	
	/**
	 * 获取where条件=后的值
	 * @param cntr
	 * @param paramterExamMap
	 * @param flowid
	 * @param approvalCondition
	 * @param issums
	 * @return
	 * @throws Exception
	 */
	private static StringBuffer getWhereValue(Map cntr, Map paramterExamMap,
			String flowid, String approvalCondition, String approvalType) throws BusinessException {
		StringBuffer whereValue = new StringBuffer();  // 
		if(EXTYPE_1.equals(approvalType)){  // 如果为聚合维度，则where值不从参数表中取，而应该动态从合同中取
			
			String[] approvalConditions = split(approvalCondition,"|");
			for(int j = 0 ;j <approvalConditions.length ;j ++){
				String realFid = null;
				if(approvalConditions[j].indexOf(".")!=-1){
					realFid = approvalConditions[j].substring(approvalConditions[j].indexOf(".") + 1); // 将字段中的cntr 去除
				}else{
					realFid = approvalConditions[j];
				}
				if(cntr.get((realFid.toLowerCase())) == null ){
					throw new BusinessException("审批流ID="+flowid+"\t出错了，维度"+approvalConditions[j]+"取值失败！");
				}
				whereValue.append(cntr.get((realFid.toLowerCase()))).append("|");
			}
			if(whereValue != null){
				whereValue.setLength(whereValue.length() - "|".length());
			}
		}else {
			whereValue.append((String)paramterExamMap.get("approvalidparava"));
		}
		return whereValue;
	}
	
	private static String replace(String src,String delim,Map valueMap){
		
		if (src == null || delim == null || valueMap == null) {
			return null;
		}
		String returnValue = src;
		if(src.indexOf(delim) != -1){
			
			int idx1 = src.indexOf(delim) + delim.length();
			int idx2 = 0;
			List supList = new ArrayList();
			while ((idx2 = src.indexOf(delim, idx1)) != -1) {
				supList.add(src.substring(idx1, idx2));
				if(src.indexOf(delim, idx2 + delim.length()) != -1){
					idx1 = src.indexOf(delim, idx2 + delim.length()) + delim.length();
				}else{
					break;
				}
			}
			for(int i = 0 ; supList.size() > i ;i++){
				String value = (String)supList.get(i);
				returnValue = returnValue.replace((delim+value+delim), valueMap.get((value.toLowerCase()))+"");
			}
		}
		return returnValue;
	}
	
	/**
	 * 解决了split方法的Bug, 当src="1234567890_1234567890_#_1234567890"时,用split方法返回的是3个值 1234567890,1234567890,1234567890
	 * 而用下面的方法是返回的是 1234567890_1234567890,1234567890
	 * @param src 变量值
	 * @param delim 分隔符
	 * @return
	 */
	public static String[] split(String src, String delim) {

		if (src == null || delim == null) {
			return null;
		}
		Vector vct = new Vector();
		int idx1 = 0;
		int idx2 = 0;

		while ((idx2 = src.indexOf(delim, idx1)) != -1) {
			vct.add(src.substring(idx1, idx2));
			idx1 = idx2 + delim.length();
		}
		vct.add(src.substring(idx1));
		Object[] tks = vct.toArray();
		String rt[] = new String[vct.size()];
		System.arraycopy(tks, 0, rt, 0, vct.size());
		return rt;
	}
	
	/**
	 * 拼接where后的语句
	 * @param typeMap
	 * @param cntr
	 * @param isSumTypesSet
	 * @param flowid
	 * @param approvalCondition
	 * @param paraType
	 * @param whereValue
	 * @return
	 * @throws Exception
	 */
	
	private  Map getWhereSqlMap(Map typeMap, Map cntr,
			Set isSumTypesSet,Map whereSqlTempMap,Map cntrWhereSqlTempMap,Map judgeSqlTempMqp, String flowid, String approvalCondition,String methodName,String classesPath, String paraType, String whereValue , String approvalType,String approvedSql )
			throws BusinessException {
		
		Map whereSqlMap = whereSqlTempMap;
		Map cntrWhereSqlMap = cntrWhereSqlTempMap;
		Map typeExamMap = (Map)typeMap.get((flowid));
		Map judgeSqlMqp = judgeSqlTempMqp;
		Map returnMap = new HashMap();
		String retionaleId = (String)typeExamMap.get("retionaleid");
		if(EXTYPE_2.equals(approvalType)){  // 阀值维度，即不满足该条件时，此条审批流会有一个用于排除的不等式
			setJudgeSqlMap(cntr, flowid, methodName, classesPath, judgeSqlMqp,whereValue);
		}else if(EXTYPE_0.equals(approvalType)||EXTYPE_1.equals(approvalType)){
		
			if(approvalCondition.indexOf(getWhereFlag(typeExamMap))!= -1){ // 当维度取值表与审批依据一致时，做下列操作  合同与合同  明细与明细
				setWhereSqlMap(cntr, isSumTypesSet, flowid, approvalCondition, paraType,whereValue, approvedSql, whereSqlMap, typeExamMap);
			}else if(approvalCondition.indexOf(CNTRFLAG) != -1){  // 当审批依据以明细为最小单位时，维度存在合同维度时，做下列操作 合同与明细
				setCntrWhereSqlMap(cntr,flowid, approvalCondition, paraType, whereValue, approvedSql,cntrWhereSqlMap,retionaleId);
			}else{ // 当审批依据为合同取值，但是维度又从明细中取时，报错。。。 或者未知类型时
				throw new BusinessException("审批流设置出问题了，审批流ID="+flowid+" \t审批依据取值表="+getWhereFlag(typeExamMap)+"\t 当前维度字段为"+approvalCondition);
			}
		}else{
			throw new BusinessException("审批流设置出问题了，审批流ID="+flowid+" \t审批依据取值表="+getWhereFlag(typeExamMap)+"\t 当前维度字段为空");
		}
		returnMap.put("whereSqlMap", whereSqlMap);
		returnMap.put("cntrWhereSqlMap", cntrWhereSqlMap);
		returnMap.put("judgeSqlMqp", judgeSqlMqp);
		return returnMap;
	}
	
	/**
	 * 
	 * @param cntr
	 * @param flowid
	 * @param methodName method(String,String) 格式
	 * @param classesPath
	 * @param judgeSqlMqp
	 * @param whereValue
	 * @throws Exception 
	 */
	private  void setJudgeSqlMap(Map cntr, String flowid, String methodName,
			String classesPath, Map judgeSqlMqp,String whereValue) throws BusinessException {
		
		if(methodName == null || classesPath== null){
			
			throw new BusinessException("审批流设置出问题了，审批流ID="+flowid);
		}
		String method = methodName;
		Map methodMap = new HashMap();
		methodMap.put("whereValue",whereValue);
		if(methodName.indexOf("(") != -1 && methodName.indexOf(")") != -1){
			method = methodName.substring(0, methodName.indexOf("(") );
			String methodParm = methodName.substring(methodName.indexOf("(")+"(".length(), methodName.indexOf(")"));
			String[] methodParms = split(methodParm,",");
			methodMap.put("methodParms",methodParms);
		}
		Class clazz = null;
		Method m  =null;
		String result = null;
		try{
			clazz=Class.forName(classesPath);
			Object obj=this;
			m=clazz.getMethod(method, Map.class,Map.class);
			result=(String) m.invoke(obj, cntr,methodMap);
		}catch(Exception ex){
			throw new BusinessException("工作流反射方法出错，请检查配置="+flowid);
		}
		if(judgeSqlMqp.containsKey(flowid)){
			StringBuffer whereSql = (StringBuffer)judgeSqlMqp.get((flowid));
			whereSql.append(result);
			judgeSqlMqp.put(flowid, whereSql);
		}else{
			StringBuffer whereSql = new StringBuffer();
			whereSql.append(result);
			judgeSqlMqp.put(flowid, whereSql);
		}
	}
	
	private static String getWhereFlag(Map typeExamMap) {
		String contractBasisType = (String)typeExamMap.get("contractbasistype");
		String whereFlag = null;
		if("1".equals(contractBasisType)){
			whereFlag = CNTRFLAG;
		}else{
			whereFlag = ITEMFLAG;
		}
		return whereFlag;
	}
	
	private static void setWhereSqlMap(Map cntr, Set isSumTypesSet,
			String flowid, String approvalCondition, String paraType, String whereValue,
			String approvedSql, Map whereSqlMap, Map typeExamMap) {
		if(whereSqlMap.containsKey(flowid)){
			
			StringBuffer whereSql = (StringBuffer)whereSqlMap.get((flowid)); 
			if(approvedSql != null && approvedSql.indexOf(getWhereFlag(typeExamMap))!= -1){ // 添加维度控制条件
				whereSql.append(" and ").append(approvedSql).append(" ");
			}
			whereSql.append(getPaWhereSql(approvalCondition, paraType, whereValue));
			whereSqlMap.put(flowid, whereSql);
		}else{
			
			StringBuffer whereSql = new StringBuffer();
			if(!isSumTypesSet.contains(flowid)){
				whereSql.append(" where ").append(" contractNo ='").append(cntr.get("contractno")).append("' ");
			}else{
				whereSql.append(" where ").append(" 1=1 ");
			}
			if(approvedSql != null && approvedSql.indexOf(getWhereFlag(typeExamMap))!= -1){ // 添加维度控制条件
				whereSql.append(" and ").append(approvedSql).append(" ");
			}
			String retionaleId = (String)typeExamMap.get("retionaleid");
			if(retionaleId != null && !"".equals(retionaleId)){
				whereSql.append(" and ").append(retionaleId).append(" ='").append(cntr.get((retionaleId.toLowerCase()))).append("'");
			}
			whereSql.append(getPaWhereSql(approvalCondition, paraType, whereValue));
			whereSqlMap.put(flowid, whereSql);
		}
	}
	
	private static StringBuffer getPaWhereSql(String approvalCondition, String paraType,
			String expart) {
		StringBuffer paWhereSql = new StringBuffer(); 
		if(PR_MONTH.equals(paraType)){
			if(expart.indexOf("|")!= -1 && approvalCondition.indexOf("|")!= -1){
				String startMonths = split(expart,"|")[0];
				String endMonths = split(expart,"|")[1];
				String startMonthFid = split(approvalCondition,"|")[0];
				String endMonthFid = split(approvalCondition,"|")[1];
				StringBuffer monthSql = new StringBuffer();
				monthSql.append(" and   TIMESTAMPDIFF(MONTH,")
					.append(startMonthFid)
					.append(",")
					.append(endMonthFid)
					.append(")");
				paWhereSql.append(monthSql)
					.append(" > ")
					.append(startMonths);
				if(!"-1".equals(endMonths)){
				paWhereSql.append(monthSql)
					.append(" <= ")
					.append(endMonths);
				}
			}
		}else{
			String[] approvalConditions = split(approvalCondition,"|");
			String[] exparts = split(expart,"|");
			for(int i = 0 ;i <approvalConditions.length ; i++){
				if(approvalConditions[i].toString().equals("cntr.tradtp")){
					String args[]=approvalConditions;
				}
				paWhereSql.append(" and ").append(approvalConditions[i]).append(" = '").append(exparts[i]).append("'");
			}
		}
		return paWhereSql;
	}
	
	private static void setCntrWhereSqlMap(Map cntr,String flowid, String approvalCondition,
			String paraType, String whereValue, String approvedSql, Map cntrWhereSqlMap,String retionaleId) {
		if(cntrWhereSqlMap.containsKey(flowid)){
			
			StringBuffer whereSql = (StringBuffer)cntrWhereSqlMap.get((flowid));
			if(approvedSql != null && approvedSql.indexOf(CNTRFLAG) != -1){
				whereSql.append(" and ").append(approvedSql).append(" ");
			}
			whereSql.append(getPaWhereSql(approvalCondition, paraType, whereValue));
			cntrWhereSqlMap.put(flowid, whereSql);
		}else{
			
			StringBuffer whereSql = new StringBuffer();
			whereSql.append(" where ").append(" 1=1 ");
			if(approvedSql != null && approvedSql.indexOf(CNTRFLAG) != -1){
				whereSql.append(" and ").append(approvedSql).append(" ");
			}
			if(retionaleId != null && !"".equals(retionaleId)){
				whereSql.append(" and ").append(retionaleId).append(" ='").append(cntr.get((retionaleId.toLowerCase()))+"").append("'");
			}
			whereSql.append(getPaWhereSql(approvalCondition, paraType, whereValue));
			cntrWhereSqlMap.put(flowid, whereSql);
		}
	}
	
	private  List getExamPathList(String departmentCode, List examInfoList)
			throws BusinessException {
		List returnList = new ArrayList();
		for(int i = 0 ; i < examInfoList.size() ; i ++){ 
			
			Map examInfoMap = (Map)examInfoList.get(i);
			String flowid = (String)examInfoMap.get("flowid");
			String value = examInfoMap.get("value")+"";
			if("-".equals(value.substring(0, 1))){
				value = String.valueOf(Math.abs(new BigDecimal(value).doubleValue()));
			}
			List examPathList = getExamPath(flowid,value,departmentCode);
			if(examPathList.size() > returnList.size()){
				returnList = examPathList;
			}
		}
		return returnList;
	}
	
	public  List getExamPath(String flowid, String value,String departmentCode) throws BusinessException {
		
		StringBuffer findExamPathSql = new StringBuffer("select exuuId, flowid ,approvalSeqNo,departmentCode,taskdepartmentCode,"
				+ "roleId,axaminemax,approvalType,busiType,axaminemin,statex,operuserid,checkuserid,"
				+ "examinePathName,roleName from (select ex.exuuid as exuuId,ex.flowid as flowid,"
				+ "ex.approvalseqno as approvalSeqNo,ex.departmentcode as departmentCode,ex.roleid as roleId,"
				+ "ex.axaminemax as axaminemax,ex.approvaltype as approvalType,ex.busitype as busiType,"
				+ "ex.axaminemin as axaminemin,ex.statex as statex,ex.operuserid as operuserid,"
				+ "ex.checkuserid as checkuserid,type.examinePathName as examinePathName, ex.taskdepartmentcode as taskdepartmentCode,"
				+ "role.roleName as roleName from xt_examinepurview ex,xt_exam_type type,"
				+ "xt_exam_type_set typeset,pa_role role ");
		findExamPathSql.append(" where ex.flowid=type.flowid ");
		findExamPathSql.append(" and typeset.approvalBasisId = type.approvalBasisId ");
		findExamPathSql.append(" and ex.roleId = role.roleId ");
		findExamPathSql.append(" and ex.STATEX = '1' ");
		findExamPathSql.append(" and ex.flowid = '").append(flowid).append("'");
		findExamPathSql.append(" and ex.departmentCode = '").append(departmentCode).append("'");
		findExamPathSql.append(" and type.departmentCode = '").append(departmentCode).append("'");
		if(value==null||"".equals(value)||"null".equals(value)){
			value="0";
		}
		if(0.0==Double.parseDouble(value)){ //偏离度所用
			findExamPathSql.append(" and  ex.axamineMin <= ").append(new BigDecimal( value)).append(")");
		}else {
		    findExamPathSql.append(" and  ex.axamineMin < ").append(new BigDecimal( value)).append(")");
		}
		findExamPathSql.append("  as result order by approvalSeqNo");

		return  transList(cpmsBaseManager.findMapList(findExamPathSql.toString()));
	}
	
	/**
	 * 将整个流程匹配信息保存到数据库
	 * @param cntr
	 * @param searchExamPathSql
	 * @param examPathList
	 * @throws Exception
	 */
	private  void addExamInfo(String contractNo, String searchExamPathSql,
			List examPathList) throws BusinessException {
		
		if(!examPathList.isEmpty()){
			StringBuffer examInfo = new StringBuffer();
			String flowid = null;
			for(int i = 0 ;i< examPathList.size() ; i++){
				Map examPathMap = (Map)examPathList.get(i);
				if(i == 0 ){
					examInfo.append ("当前业务匹配的审批流为：").append (examPathMap.get("examinepathname")).append(",所经过的审批人为：");
					flowid = (String)examPathMap.get("flowid");
				}
				examInfo.append (examPathMap.get("rolename")).append("->");
			}
			if(examInfo.length()>0){
				examInfo.setLength(examInfo.length() - "->".length());
				String searchExamPathSqlTep = searchExamPathSql.replace( "'", "''");
				deleteExamInfo(contractNo);
				addExamInfo(contractNo,flowid, examInfo.toString(), searchExamPathSqlTep);
			}
		}
	}
	
	public  void deleteExamInfo(String contractNo) throws BusinessException {
		
		String deleteSql = "delete from  xt_examineinfo where contractNo ='"+contractNo+"'";
		cpmsBaseManager.executeUpdate(deleteSql);
	}
	
	public  void addExamInfo(String contractNo,String flowid ,String examInfo , String searchExamPathSql) throws BusinessException {
		
		String insertSql = "insert into xt_examineinfo(contractNo,flowid,flowname,approvalSql,id) values ('"+contractNo+"','"+flowid+"','"+examInfo+"','"+searchExamPathSql+"','"+contractNo+"')";
		//StringBuffer selectsql = new StringBuffer();
		//selectsql.append("select * from xt_examineinfo where contractNo = '"+ contractNo + "' for update ");
		//RsTemplate.clobInsert(searchExamPathSql, insertSql.toString(), selectsql.toString(), "approvalSql");
		cpmsBaseManager.executeUpdate(insertSql);
	}
	
	// 插入到轨迹表 cntrid合同号，busiType 业务类型，examList 审批详细轨迹
	public  List addExamineTrack(String contractNo, String busiType,
			List examList) throws BusinessException {
		String approvalResult = ApprovalResultMode.READY_FOR_APPROVAL.getCode();
		String sql = "insert into xt_examinetrack (id,trailNo,exuuId,contractNo,busiType,departmentCode,taskdepartmentCode,roleId,"
				+ "approvalSeqNo,isleave,approvalResult) ";

		List newexamList = new ArrayList();
		Map tempMap = null;
		for (int i = 0; i < examList.size(); i++) {
			tempMap = (Map) examList.get(i);
			if (i == 0){
				approvalResult = ApprovalResultMode.READY_FOR_APPROVAL.getCode();
			}else{
				approvalResult = ApprovalResultMode.WAIT_FOR_APPROVAL.getCode();
			}
			sql += makeExamtrackSql(contractNo, busiType, approvalResult, tempMap,i);// 拼sql

		}
		sql = sql.substring(0, sql.length() - 6);
		cpmsBaseManager.executeUpdate(sql);
		return newexamList;
	}
	
	private  String makeExamtrackSql(String contraceNo, String busiType,
			String approvalResult, Map examMap,int approvalseqno) throws BusinessException {
		String trailNo=makeTrackid(busiType);
		String sql = "select '";
		sql += trailNo+ contraceNo+ "','";
		sql += trailNo + "','";
		sql += examMap.get("exuuid") + "','";
		sql += contraceNo + "','";
		sql += busiType + "','";
		sql += examMap.get("departmentcode") + "','";
		sql += examMap.get("taskdepartmentcode") + "','";
		sql += examMap.get("roleid") + "','";
		if(BusiTypeMode.BUSI_TYPE_CODE_30008.getCode().equals(busiType)){//系统内转贴现(上级行审批轨迹)
			sql += approvalseqno + "','";
		}else{
			sql += examMap.get("approvalseqno") + "','";
		}
		if(examMap.get("isleave")!=null){
			sql += examMap.get("isleave") + "','";
		}else{
			sql += "" + "','";
		}
		sql += approvalResult + "'";
		sql += "   union ";
		return sql;

	}
	
	private  String makeTrackid(String busiType) throws BusinessException {
		String sql = "select CONCAT('"+busiType+"',DATE_FORMAT(CURDATE(),'%Y%m%d')) as trailno "
				+ "   from xt_systeminfo  sy where sy.systemId ='00001'";
		Map map = cpmsBaseManager.findMapList(sql).get(0);
		SimpleSequence examtrack = ApplicationContextUtils.getBean("examtrack");
		String trailNo= ((String) map.get("trailno"))+examtrack.nextStringValue();
        return trailNo;
	}
	
	private List transList(List list){
		List returnList=new ArrayList();
		for(int i=0;i<list.size();i++){
			Map hashMap=new HashMap();
			Map tempMap=(Map)list.get(i);
			Iterator it =tempMap.entrySet().iterator();
			while(it.hasNext()){
				Map.Entry pairs=(Map.Entry)it.next();
				hashMap.put(pairs.getKey().toString().toLowerCase(), tempMap.get(pairs.getKey()));
			}
			returnList.add(hashMap);
		}
		return returnList;
	}
	
	public  String oneDayOneBrchno(Map valueMap,Map nullMap) throws BusinessException{
		
		String counterpartyno = (String)valueMap.get("counterpartyno");
		String inputdate =  valueMap.get("inputdate")+"";
		String inputagencyid = (String)valueMap.get("inputagencyid");
		String contractno = (String)valueMap.get("contractno");
		String busitype=(String)valueMap.get("busitype");
		double a = Double.parseDouble(getAgency(inputagencyid).get("limtam")==null?"0":getAgency(inputagencyid).get("limtam").toString());
		double b = Double.parseDouble((getSumValue(inputdate,inputagencyid,counterpartyno,contractno,busitype).get("havamo").toString()));	 
		return b > a ?  " and '提示信息：' != '单日单户限制已越界， 已用值=【"+b+"】 > 上限值=【"+a+"】，本条审批流将采用'" 
				: " and '提示信息：' = '单日单户限制未越界，上限值=【"+a+"】> 已用值=【"+b+"】，本条审批流不采用'";
	}
	
	
	public  Map getAgency(String belongAgencyId) throws BusinessException {
		
		String sql = "select * from pa_agency where departmentCode = '" + belongAgencyId + "'";
        List list=transList(cpmsBaseManager.findMapList(sql));
        if(list.size()>0){
        	return (Map)list.get(0);
        }else{
        	return null;
        }
		
		//return agencyMap;
	}
	
	public  Map getSumValue(String inputdate,String inputagencyid,String counterpartyno,String contractno,String busiType) throws BusinessException {
		
		String sumSql = "select ifnull(sum(pj.faceamount),0) as havamo from bill_cntr pj,xt_task task where pj.busiType ='"+busiType+"' and " +
			" pj.contractNo = task.contractNo and (task.taskStartDate not in('RD','MD') or task.contractNo ='"+contractno+"') and "+
			" pj.startInterDate='" + inputdate + "' and pj.inputAgencyId = '" + inputagencyid + "' and pj.counterpartyNo = '" + counterpartyno + "'";;

			List list=transList(cpmsBaseManager.findMapList(sumSql));
	        if(list.size()>0){
	        	return (Map)list.get(0);
	        }else{
	        	return null;
	        }

	}
	/**
	 * 机构信息
	 * @param valueMap
	 * @param whereValue
	 * @return
	 * @throws Exception
	 */
	public  String deptidType(Map valueMap,Map methodMap) throws BusinessException{
		
		String whereValue = (String)methodMap.get("whereValue");
		String[] methodParms = (String [])methodMap.get("methodParms");
		String deptidTypeFid = methodParms[0];
		String deptidTypeNa = methodParms[1];
		if(whereValue == null){
			return " and '提示错误信息：' = '查询"+deptidTypeNa+"信息出错，请检查业务类型="+valueMap.get("busitype")+"的维度配置信息'";
		}
		String counterpartyno = (String)valueMap.get("counterpartyno");
		String bktrsq = (String)valueMap.get("contractno");
		Map samebusinessMap = getSambusiness(counterpartyno);
		String deptidType = (String)samebusinessMap.get(deptidTypeFid.toLowerCase());
		return whereValue.equals(deptidType) ?  " and '提示信息：' != '机构名："+samebusinessMap.get("agencysimpname")+"机构ID："+samebusinessMap.get("id")+"的"+deptidTypeNa+"一致，合同中="+deptidType+"，审批流维度属性="+whereValue+",本条审批流将采用'"
				: " and '提示信息：' = '机构名："+samebusinessMap.get("agencysimpname")+"机构ID："+samebusinessMap.get("id")+"的"+deptidTypeNa+"不一致，合同中="+deptidType+"，审批流维度属性="+whereValue+",本条审批流不采用'";
	}
	
	public  Map getSambusiness(String agenid) throws BusinessException {
		
		String sql = "select * from pa_samebusiness where id = '" + agenid + "'";
		List list=transList(cpmsBaseManager.findMapList(sql));
        if(list.size()>0){
        	return (Map)list.get(0);
        }else{
        	return null;
        }
	}
	public  void deleteExamineTrack( String contractNo)
			throws BusinessException  {

		String sql = "delete from xt_examinetrack where "+
				 "  contractno = '" + contractNo + "'";
		cpmsBaseManager.executeUpdate(sql);

	}
}


