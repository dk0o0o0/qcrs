package com.linkus.capital.util.xls;

import java.io.BufferedInputStream;
import java.io.File;
import java.io.FileInputStream;
import java.lang.reflect.Field;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.math.BigDecimal;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;

import org.apache.poi.hssf.usermodel.HSSFCell;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.hibernate.Query;
import org.hibernate.criterion.CriteriaSpecification;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.linkus.capital.bill.bussiness.manager.BillBookManager;
import com.linkus.capital.system.mode.SameBusiness;
import com.linkus.capital.system.service.HolidayManager;
import com.linkus.capital.system.service.SameBusinessManager;
import com.linkus.capital.util.SystemInfoUtil;
import com.linkus.capital.util.date.DateUtils;
@Component
public class ReadXLS {
	
	@Autowired
	private SameBusinessManager sameBusinessManager;
	@Autowired
	private HolidayManager holidayManager;
	@Autowired
	private BillBookManager billBookManager;
	private String busiType;
	 
	public Map<String,Map<Object, Object>> start(File file,String busiType) throws Exception{
		this.busiType=busiType;
		Map<String,Map<Object,Object>> list =new HashMap<String,Map<Object,Object>>();
		File f = new File(file.getPath());
		list = poixlsRead(f.getPath());
		return list;
	}
	/**
	 * 由于HSSFWorkbook会先获取整个excel，所以先设置内存大小
	 * 点击window---preference---java下的installed JREs，选择一个jar后
	 * 点击edit JRE 在 default VM Arguments中输入 -Xms256m  -Xmx512m 确认后就OK了
	 * @param path 要解析的excel的地址path
	 * 			并得到一个excel的每一个sheet表
	 * @throws Exception
	 */
	public Map<String,Map<Object, Object>> poixlsRead(String path) throws Exception {

		Map<String,Map<Object,Object>> list = new HashMap<String,Map<Object,Object>>();
		File file = new File(path);
		FileInputStream fs = new FileInputStream(file);
		BufferedInputStream bis = new BufferedInputStream(fs);
		String fileName= file.getName();
		String extendName=fileName.substring(fileName.lastIndexOf(".")+1);
		if(extendName.equals("xls")||extendName.equals("et")||extendName.equals("ett")){
			HSSFWorkbook wb = new HSSFWorkbook(fs,true);
			int pagelength = wb.getNumberOfSheets();
			for (int i = 0; i < pagelength; i++) {
				HSSFSheet sheet = wb.getSheetAt(0);
				//导出类票据不做验证判断
				if ("30004||30005||30006||30010".indexOf(this.busiType)==-1){
					compareImportData(sheet);
				}
				list =poiforXls(sheet);
			}
		}
		if(extendName.equals("xlsx")){
			XSSFWorkbook eb=new XSSFWorkbook(fs);
			int pagelength = eb.getNumberOfSheets();
			for (int i = 0; i < pagelength; i++) {
				XSSFSheet sheet = eb.getSheetAt(i);
				//导出类票据不做验证判断
				if ("30004||30005||30006||30010".indexOf(this.busiType)==-1){
					compareImportData(sheet);
				}
				list =poiforXlsx(sheet);
			}
		}

		
		bis.close();
		fs.close();
		return list;
	}
	
	/***
	 * 比对导入数据，验证出票日、到期日等信息
	 *
	 * @author 李颖
	 * @description
	 * @param fildName
	 * @throws Exception
	 * @modified
	 */
	public void compareImportData(Sheet sheet) throws Exception{
		Row row = sheet.getRow(0);
		int rows = row.getLastCellNum();
		int cols = sheet.getLastRowNum();
		List headTable=new ArrayList();
		for (int i = 0; i < rows; i++) {// 列
			headTable.add(sheet.getRow(0).getCell(i).toString());
		}
		int stIndex=headTable.indexOf("出票日");
		int edIndex=headTable.indexOf("到期日");
		for (int i = 1; i <=cols; i++) {
				if (stIndex != -1 && edIndex != -1) {
					String stDate = sheet.getRow(i).getCell(stIndex).toString();
					String enDate = sheet.getRow(i).getCell(edIndex).toString();

					dateDiff(stDate, enDate);

				}
				if (headTable.indexOf("票据号码") != -1) {
					String billNo = sheet.getRow(i).getCell(headTable.indexOf("票据号码")).toString();
					if (null==billNo||"".equals(billNo)) {
						throw new Exception("第" + (i) + "张票据的票据号码有误!");
					}

				}
				if (headTable.indexOf("属地") != -1) {
					String region = sheet.getRow(i).getCell(headTable.indexOf("属地")).toString();
					if (!region.equals("同城") && !region.equals("异地")) {
						throw new Exception("第" + (i) + "张票据的属地有误!");
					}

				}
				if (headTable.indexOf("票面金额(元)") != -1) {
					String faceAmount = sheet.getRow(i).getCell(headTable.indexOf("票面金额(元)")).toString();
					try{
						Double faceAmounts = Double.parseDouble(faceAmount);
						if (faceAmounts<=0){
							throw new Exception("第" + (i) + "张票据金额有误!");	
						}
					}catch(Exception e){
						throw new Exception("第" + (i) + "张票据金额有误!");
				}

				}
				if (headTable.indexOf("背书次数") != -1) {
					String reciteNumber = sheet.getRow(i).getCell(headTable.indexOf("背书次数")).toString();
					Double reciteNum = Double.parseDouble(reciteNumber);
					if (reciteNum < 1) {
						throw new Exception("第" + (i) + "张票据的背书次数有误!");
					}

				}
		 }
		}
	/****
	 * 出票日与起息日及到期日判断
	 *
	 * @author 李颖
	 * @description
	 * @param startTime
	 * @param endTime
	 * @modified
	 */
	public void dateDiff(String startTime,String endTime) throws Exception{
			Date stdate = DateUtils.parseToNormal_(startTime);
			Date endate = DateUtils.parseToNormal_(endTime);
			if (DateUtils.calculateIntervalDays(stdate,endate)<=0){
				throw new Exception("到期日必须大于出票日");
			}
			
			if (DateUtils.calculateIntervalDays(stdate, SystemInfoUtil.getSystemDate())<0){
				throw new Exception("出票日必须小于等于当前系统时间");
				
			}
	}

	
	
	
	public Map<String, Map<Object, Object>> sheetImport(Sheet sheet) throws Exception{

		String name = sheet.getSheetName();
		Map sheetMap = new HashMap();
		if (name == null) {
			return null;
		}
		Row row = sheet.getRow(1);
		if(row == null){
			return null;
		}
		int rows = row.getLastCellNum();
		int cols = sheet.getLastRowNum();
		String value=null;
		for (int j = 1; j <= cols; j++) {// 行
			Map<Object, Object> map = new HashMap<Object, Object>();
			//PjDiscount pjDiscount =new PjDiscount();
			for (int i = 0; i < rows; i++) {// 列
				String key = sheet.getRow(0).getCell(i)+"";
				HeaderChangeToEnglish change=new HeaderChangeToEnglish();
				key = change.compareNameInfo(key);// 把汉字翻译为英文
				if(key!=null){
				if(!"".equals(key) && sheet.getRow(j).getCell(i) !=null){
					
					sheet.getRow(j).getCell(i).setCellType(HSSFCell.CELL_TYPE_STRING);//把所以的value都设置为String型
				    value = sheet.getRow(j).getCell(i).toString(); //xls 的日期列，要设置成 文本的数字格式，不能是自定义，否则读取出来的是自定义代号
				
						map.put(key, value);
						if (key.equals("matureDate")){
							map.put("supplyDays",holidayManager.getSupplyDays(value));
						}
						
						if(key.equals("acceptBankName")){//如果有承兑人，则需查询出该承兑行id ，且加到map 中
							SameBusiness business =new SameBusiness() ;
							if(sameBusinessManager!=null){
								if (null==value||"".equals(value)){
									throw new Exception("第"+(j)+"行数据承兑人名称有误！请确认模板数据！");
									
								}
								business = sameBusinessManager.findSameBusinessByAgencyName(value);
							}
							if(business!=null ){
						    	String acceptBankId =String.valueOf(business.getId());
						    	map.put("acceptBankId", acceptBankId);
						    	String acceptBankType =String.valueOf(business.getAcceptBankType());
						        map.put("acceptBankType", acceptBankType);
							}
						}
						//同业本行投资第三方授信信息，如果有交易机构，则需查询出该机构id ，且加到map 中
						if(key.equals("acceptBankNo")){
							SameBusiness business =new SameBusiness() ;
							if(sameBusinessManager!=null){
								business = sameBusinessManager.findOne("name",value);
								if (null==business){
									map.put("acceptBankCode", "");
								}else{
									String  acceptBankCode= business.getId().toString();
									map.put("acceptBankCode", acceptBankCode);
						    	}
							}
						}
						if(key.equals("region")){
							if(value.equals("异地")){
								map.put("regionAddDay", 3);
							}else{
								map.put("regionAddDay", 0);
							}
							
						}
					}
				}
			}
			sheetMap.put(j+"", map);
		}
		//******卖出型业务导入票据匹配数据库持仓数据
		
		if ("30004||30005||30006||30010".indexOf(this.busiType)!=-1){
			verifyBillRepeated(sheetMap);
			findBillsByimportDatas(sheetMap);
			
		}
		return sheetMap;

	}
	
	
	public  Map<Object, Map<Object, Object>> findBillsByimportDatas(Map map) throws Exception{
		Map<Object,Map<Object,Object>> resultMap=new HashMap();
		String repoStatus="";
		//回购类票据标识
		 if ("30028".equals(busiType)){
			repoStatus="DBG";
		}else{
			repoStatus="";
		}
		for(Object key:map.keySet()){
			Map mapItem=(Map) map.get(key);
			String billno = (String) mapItem.get("billNo");
			String endate = (String) mapItem.get("matureDate");
			List list=billBookManager.findBillsByImportDatas(mapItem,repoStatus);
			if (null==list||list.size()<1){
				   throw new Exception("导入模板数据中票号为" + billno
						+ "的数据在持仓数据中没有匹配上，请检查数据准确性!");	
			}
			Map detailItem=(Map) list.get(0);
			mapItem.put("noteType", detailItem.get("notetype")); // 票据类型
			mapItem.put("acceptBankNo", detailItem.get("acceptbankno")); // 付款行全称
			mapItem.put("reciteNumber", detailItem.get("recitenumber")); // 背书次数
			mapItem.put("drawerUnitName", detailItem.get("drawerunitname")); // 出票人全称
			mapItem.put("payeeName", detailItem.get("payeename")); // 收款人
			mapItem.put("region", detailItem.get("region")); // 是否同城异地
			mapItem.put("payBankNo", detailItem.get("paybankno")); // 大额支付行号
			mapItem.put("drawerUnitAcctNo", detailItem.get("drawerunitacctno")); // 承兑账号
			mapItem.put("acceptBankCode", detailItem.get("acceptbankcode")); // 承兑人ID
			mapItem.put("acceptBankName", detailItem.get("acceptbankname")); // 承兑人
			mapItem.put("bookid", detailItem.get("bookid")); // 持仓号
			mapItem.put("oldBookId", detailItem.get("oldbookid")); // 原持仓号
			mapItem.put("noteid", detailItem.get("noteid")); // 票据流水号
			mapItem.put("assetsType", detailItem.get("assetstype")); // 计提依据种类
			mapItem.put("subjectMappingCode", detailItem.get("subjectmappingcode")); // 主业务代号
		}
		return map;
	}
	public void verifyBillRepeated(Map map) throws Exception{
		 HashSet billnoSet = new HashSet();
		for (Object key:map.keySet()){
			Map itemMap=(Map) map.get(key);
			String billno = itemMap.get("billNo").toString();
			if(billnoSet.contains(billno)) {
		    	   throw new Exception("获取票号【"+billno+"】信息出现重复,请检查票号信息！");	
			}else{
				billnoSet.add(billno);
			}
		}
		
	}
	private Map<String, Map<Object, Object>> poiforXlsx(XSSFSheet sheet) throws Exception {
		return this.sheetImport(sheet);
	}
	/**
	 * 对每excel中的sheet表进行解析 ，并把sheet中的第一行作为map的key值其他的作为其value值
	 * 并且把key翻译成英文代码，把sheet的名字name译为英文作为数据库中的表
	 * @param sheet 给定的sheet表
	 *            
	 * @throws Exception
	 */
	public Map<String,Map<Object, Object>> poiforXls(HSSFSheet sheet) throws Exception {
		return this.sheetImport(sheet);

	}

	public void SetValue(Object obj,String fieldName,String value)throws SecurityException,NoSuchFieldException,NoSuchMethodException,IllegalArgumentException,IllegalAccessException,InvocationTargetException{
		//动态给对象属性赋值
		String firstLetter=fieldName.substring(0,1).toUpperCase();
		Object fvalue =new Object();
		String setMethodName="set"+firstLetter+fieldName.substring(1);
		Field field=obj.getClass().getDeclaredField(fieldName);
		Method setMethod =obj.getClass().getDeclaredMethod(setMethodName, field.getType());
		String type=field.getType().getName();
		if("java.lang.String".equals(type)){
			fvalue=value;
		}else if("java.math.BigDecimal".equals(type)){
			if(value.length()>0){
				fvalue=new BigDecimal(value);
			}
		}
		setMethod.invoke(obj, fvalue);
		
	}

	
}

