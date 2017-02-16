$(document).ready(function() {
	$(document).on("click", "#list_form table tr", function() {
 		$(this).find("input:radio").attr("checked","checked");
	});
});


var LODOP; //声明为全局变量   
function PrintCommon(type) {	
		var radio =  $("input:radio[name=check]:checked");
		if(radio == undefined){
			doTheAlert("提示","请先选择打印的数据！");		
			return;
		}else{
			if(radio.length>0){
				var templatename = $(radio).parents("tr").children("td").eq(6).text();
				var printcontent = $(radio).parents("tr").children("td").eq(7).text();
				//var reg = new RegExp("=[{","g");
				//把原来字符串转化为JSON格式，新系统要求在插入时就保存为JSON格式，这样就不用转化，提高响应速度
				printcontent = printcontent.replace(/\=\[{/g,':[{');

				printcontent = printcontent.replace(/\=/g,':"');

				printcontent = printcontent.replace(/\,/g,'",');

				printcontent = printcontent.replace(/\}",/g,'"},');

				printcontent = printcontent.replace(/\}]"/g,'"}]');
				
				printcontent = printcontent.replace(/\}]}/g,'"}]}');
				
				printcontent = printcontent.replace('dblist:"','dblist:[{}]');
				
				var printcontentJson = eval('('+printcontent+')');

//				var aaaJSON = JSON.parse(printcontent);
//				
//				alert(aaaJSON);
//				
//				var printcontent1 = $.parseJSON(printcontent);
//				
//				alert(printcontent1);
//				alert(printcontentJson.dblist);
				
				//JSON字符串
//				var aaa = "{\"number\":\"壹张\",\"notetp\":\"商承\",\"acbkna\":\"67868\",\"cstant\":\"长沙银行\",\"agname\":\"1111\"}"
//				
//				var aaa1 = '{"number":"壹张","notetp":"商承","acbkna":"67868","cstant":"长沙银行","agname":"1111"}';
//				
//				var aaa2 = '{number:"壹张",notetp:"商承",acbkna:67868,cstant:"长沙银行",agname:1111}';
// 
//                //JSON字符串转化为对象
//                var aaaJS = eval('('+aaa2+')');
//                alert(aaaJS.number);
//                var aaaJSON = JSON.parse(aaa1);
//                alert(acbkna.number);
//                var aaaJQUERY= $.parseJSON(aaa1);
//                alert(aaaJQUERY.notetp);
                
				//JSON对象
//                var bbb = {people:{name:'aaaaa',sex:'1111'}};
//				alert(bbb.people.name);
				//var printData = $.parseJSON(printcontent);
				
				var template = templatename.split("^");
				var flag = false;
				
				if(type == "PREVIEW" || type == "PREVIEW1"){
					if(template == ""){
					//如果没配模板则默认用一套模板
					}else{
						if(template[0] == "pj_30001_lower_note.fr3" && type == "PREVIEW"){
								CreatePrintPage__pj_30001_lower_note(printcontentJson.report[0]);
								flag = true;
							}
						if(template[1] == "pj_30001_list.fr3" && type == "PREVIEW1"){
								CreatePrintPage_pj_30001_list(printcontentJson.report[0],printcontentJson.dblist);
								flag = true;
							}
						if(!flag){
								doTheAlert("提示","报表模板："+template[0]+" 不存在！");
								return;
							}
					}
				}else{
					if(template == ""){
						//如果没配模板则默认用一套模板
					}else{
						for(i=0;i<template.length;i++){
						if(template[i] == "pj_30001_lower_note.fr3"){
							CreatePrintPage__pj_30001_lower_note(printcontentJson.report[0]);
							flag = true;
						}

						if(template[i] == "pj_30001_list.fr3"){
							CreatePrintPage_pj_30001_list(printcontentJson.report[0],printcontentJson.dblist);
							flag = true;
						}
						if(!flag){
							doTheAlert("提示","报表模板："+template[i]+" 不存在！");
							return;
						}
						
					}
					
						 if(type == "PRINT_SETUP"){
							LODOP.PRINT_SETUP();	
						}else if(type == "PRINTA"){
								if (LODOP.PRINTA()) 
								   doTheAlert("提示","已发出实际打印命令！"); 
								else 
								   doTheAlert("提示","放弃打印！"); 
						}else{
							LODOP.PRINT_DESIGN();
						}
				}
			}
				
//				Preview_pj_30001_lower_note(printcontentJson.report[0])
//				Preview_pj_30001_list(printcontentJson.dblist);
				
				//LODOP.PREVIEW();	
			}else{
				doTheAlert("提示","请先选择打印的数据！");		
				return;
			}
		}
	
};

	function Preview() {
		var type = "PREVIEW";
		PrintCommon(type);
	  	LODOP.PREVIEW();		
	};
	function Preview1() {
		var type = "PREVIEW1";
		PrintCommon(type);
	  	LODOP.PREVIEW();		
	};
	function Design() {		
		var type = "PRINT_DESIGN";
		PrintCommon(type);
		//LODOP.PRINT_DESIGN();		
	};
	function Setup() {		
		var type = "PRINT_SETUP";
		PrintCommon(type);
		//LODOP.PRINT_SETUP();		
	};
	function Print() {		
		var type = "PRINTA";
		PrintCommon(type);
//		if (LODOP.PRINTA()) 
//		   alert("已发出实际打印命令！"); 
//		else 
//		   alert("放弃打印！"); 
	};
	
//--------------------------------------票据贴现审批单--------------------------------
	
	function CreatePrintPage__pj_30001_lower_note(objReportJson) { 
		LODOP=getLodop(); 		
		LODOP.PRINT_INITA(0,7,800,1197,"");
		LODOP.ADD_PRINT_RECT(98,21,693,816,0,1);
		LODOP.ADD_PRINT_TEXT(21,169,439,44,"长 沙 银 行 票 据 贴 现 业 务 审 批 单");
		LODOP.SET_PRINT_STYLEA(0,"FontSize",16);
		LODOP.SET_PRINT_STYLEA(0,"Alignment",2);
		LODOP.SET_PRINT_STYLEA(0,"Bold",1);
		LODOP.ADD_PRINT_TEXT(72,220,53,25,"日期：");
		LODOP.SET_PRINT_STYLEA(0,"FontSize",10);
		LODOP.ADD_PRINT_TEXT(72,272,146,25,objReportJson.inpday);
		LODOP.SET_PRINT_STYLEA(0,"FontSize",10);
		LODOP.ADD_PRINT_TEXT(72,515,197,25,objReportJson.bktrsq);
		LODOP.ADD_PRINT_LINE(132,23,133,714,0,1);
		LODOP.ADD_PRINT_LINE(164,22,164,713,0,1);
		LODOP.ADD_PRINT_LINE(202,22,203,713,0,1);
		LODOP.ADD_PRINT_LINE(239,21,240,714,0,1);
		LODOP.ADD_PRINT_LINE(277,25,278,713,0,1);
		LODOP.ADD_PRINT_LINE(314,21,313,714,0,1);
		LODOP.ADD_PRINT_LINE(341,21,340,714,0,1);
		LODOP.ADD_PRINT_LINE(416,21,415,714,0,1);
		LODOP.ADD_PRINT_LINE(492,21,491,714,0,1);
		LODOP.ADD_PRINT_LINE(567,21,566,714,0,1);
		LODOP.ADD_PRINT_LINE(662,21,661,714,0,1);
		LODOP.ADD_PRINT_LINE(757,21,756,714,0,1);
		LODOP.ADD_PRINT_LINE(832,21,831,714,0,1);
		LODOP.ADD_PRINT_LINE(313,112,98,113,0,1);
		LODOP.ADD_PRINT_LINE(313,316,98,317,0,1);
		LODOP.ADD_PRINT_LINE(98,433,313,434,0,1);
		LODOP.ADD_PRINT_LINE(913,115,339,116,0,1);
		LODOP.ADD_PRINT_LINE(340,455,914,456,0,1);
		LODOP.ADD_PRINT_LINE(914,364,568,365,0,1);
		LODOP.ADD_PRINT_RECT(943,21,693,45,0,1);
		LODOP.ADD_PRINT_TEXT(959,549,150,25,"");
		LODOP.ADD_PRINT_TEXT(106,26,78,25,"贴现申请人");
		LODOP.ADD_PRINT_TEXT(138,26,78,25,"汇票票号");
		LODOP.ADD_PRINT_TEXT(173,26,78,25,"汇票张数");
		LODOP.ADD_PRINT_TEXT(208,26,78,25,"附件张数");
		LODOP.ADD_PRINT_TEXT(245,26,78,25,"所属支行");
		LODOP.ADD_PRINT_TEXT(285,26,78,25,"客户经理");
		LODOP.ADD_PRINT_TEXT(363,40,71,25,"经办人员");
		LODOP.ADD_PRINT_TEXT(442,40,71,25,"复核人员");
		LODOP.ADD_PRINT_TEXT(518,40,71,25,"审票人员");
		LODOP.ADD_PRINT_TEXT(592,40,66,45,"公司业务部负责人");
		LODOP.ADD_PRINT_TEXT(685,39,67,45,"分管\n副总经理");
		LODOP.ADD_PRINT_TEXT(784,40,70,25,"主管行长");
		LODOP.ADD_PRINT_TEXT(859,40,69,25,"董事长");
		LODOP.ADD_PRINT_TEXT(960,25,287,25,"长 沙 银 行 票 据 贴 现 业 务 审 批 单");
		LODOP.SET_PRINT_STYLEA(0,"FontSize",10);
		LODOP.ADD_PRINT_TEXT(106,115,195,25,objReportJson.partna);
		LODOP.ADD_PRINT_TEXT(138,115,195,25,"见清单");
		LODOP.ADD_PRINT_TEXT(173,115,195,25,objReportJson.itemnm);
		LODOP.ADD_PRINT_TEXT(247,115,192,25,objReportJson.bebrna);
		LODOP.ADD_PRINT_TEXT(284,116,195,25,objReportJson.manaid);
		LODOP.ADD_PRINT_TEXT(362,121,328,25,objReportJson.inptusmess);
		LODOP.ADD_PRINT_TEXT(443,123,323,25,objReportJson.ckptsstyle);
		LODOP.ADD_PRINT_TEXT(519,124,325,25,objReportJson.cnptxstyle);
		LODOP.ADD_PRINT_TEXT(578,123,234,25,objReportJson.suppranmess);
		LODOP.ADD_PRINT_TEXT(606,252,110,25,objReportJson.suppran);
		LODOP.ADD_PRINT_TEXT(634,253,110,25,objReportJson.supday);
		LODOP.ADD_PRINT_TEXT(674,124,239,25,objReportJson.vpresidemess);
		LODOP.ADD_PRINT_TEXT(703,250,110,25,objReportJson.vpreside);
		LODOP.ADD_PRINT_TEXT(730,251,110,25,objReportJson.vprday);
		LODOP.ADD_PRINT_TEXT(758,120,239,25,objReportJson.hmanagermess);
		LODOP.ADD_PRINT_TEXT(782,254,100,25,objReportJson.hmanager);
		LODOP.ADD_PRINT_TEXT(806,254,100,25,objReportJson.hmaday);
		LODOP.ADD_PRINT_TEXT(833,121,236,25,objReportJson.presidemess);
		LODOP.ADD_PRINT_TEXT(862,256,100,25,objReportJson.preside);
		LODOP.ADD_PRINT_TEXT(888,257,100,25,objReportJson.preday);
		LODOP.ADD_PRINT_TEXT(105,319,100,25,"贴现金额（元）");
		LODOP.ADD_PRINT_TEXT(137,319,100,25,"贴现利率（%）");
		LODOP.ADD_PRINT_TEXT(172,318,111,25,"资金成本利率（%）");
		LODOP.ADD_PRINT_TEXT(207,319,100,25,"贴现利息（元）");
		LODOP.ADD_PRINT_TEXT(246,319,100,25,"实付金额（元）");
		LODOP.ADD_PRINT_TEXT(285,318,100,25,"支行收益（元）");
		LODOP.ADD_PRINT_TEXT(317,270,168,20,"审批人意见");
		LODOP.ADD_PRINT_TEXT(106,437,265,25,objReportJson.amount);
		LODOP.ADD_PRINT_TEXT(137,438,192,25,"见清单");
		LODOP.ADD_PRINT_TEXT(172,438,243,25,objReportJson.bsinrt);
		LODOP.ADD_PRINT_TEXT(209,438,266,25,objReportJson.cntrin);
		LODOP.ADD_PRINT_TEXT(247,437,266,25,objReportJson.tranam);
		LODOP.ADD_PRINT_TEXT(285,438,271,25,objReportJson.bhincm);
		LODOP.ADD_PRINT_TEXT(343,458,133,40,objReportJson.examsg);
		LODOP.ADD_PRINT_TEXT(358,599,111,25,objReportJson.inptus);
		LODOP.ADD_PRINT_TEXT(386,599,110,25,objReportJson.inpday);
		LODOP.ADD_PRINT_TEXT(419,461,133,25,objReportJson.ckptsmess);
		LODOP.ADD_PRINT_TEXT(439,598,110,25,objReportJson.ckpts);
		LODOP.ADD_PRINT_TEXT(465,599,111,25,objReportJson.ckptsday);
		LODOP.ADD_PRINT_TEXT(495,460,136,25,objReportJson.cnptxmess);
		LODOP.ADD_PRINT_TEXT(515,598,110,25,objReportJson.cnptx);
		LODOP.ADD_PRINT_TEXT(541,599,110,25,objReportJson.cnptxday);
		LODOP.ADD_PRINT_TEXT(573,458,243,25,objReportJson.subbranmess);
		LODOP.ADD_PRINT_TEXT(602,606,100,25,objReportJson.subbran);
		LODOP.ADD_PRINT_TEXT(630,606,100,25,objReportJson.subday);
		LODOP.ADD_PRINT_TEXT(589,370,82,46,"分行\n行长");
		LODOP.SET_PRINT_STYLEA(0,"Alignment",2);
		LODOP.ADD_PRINT_TEXT(713,377,62,25,"总经理");
		LODOP.ADD_PRINT_TEXT(672,462,244,25,objReportJson.headmanamess);
		LODOP.ADD_PRINT_TEXT(703,607,100,25,objReportJson.headmana);
		LODOP.ADD_PRINT_TEXT(730,608,100,25,objReportJson.headay);
		LODOP.ADD_PRINT_TEXT(788,374,68,25,"行长");
		LODOP.ADD_PRINT_TEXT(758,461,246,25,objReportJson.hpresidemess);
		LODOP.ADD_PRINT_TEXT(783,609,100,25,objReportJson.hpreside);
		LODOP.ADD_PRINT_TEXT(807,609,100,25,objReportJson.hprday);

	}

	//---------------------------贴现清单------------------------------------------------
function CreatePrintPage_pj_30001_list(objReportJson,objDblistJson) {
		 
		LODOP=getLodop(); 
		LODOP.PRINT_INITA(0,0,1100,800,"");
		
		//---------------------------高度不变部分开始-----------------
		LODOP.ADD_PRINT_TEXT(69,486,121,34,"贴现清单");
		LODOP.SET_PRINT_STYLEA(0,"FontSize",14);
		LODOP.SET_PRINT_STYLEA(0,"Bold",1);
		LODOP.ADD_PRINT_TEXT(108,859,60,20,"合同号：");
		LODOP.ADD_PRINT_TEXT(108,920,163,20,objReportJson.bktrsq);
		LODOP.ADD_PRINT_RECT(191,39,1038,25,0,1);
		LODOP.ADD_PRINT_LINE(191,76,216,77,0,1);
		LODOP.ADD_PRINT_LINE(191,182,216,183,0,1);
		LODOP.ADD_PRINT_LINE(191,381,216,382,0,1);
		LODOP.ADD_PRINT_LINE(191,524,216,525,0,1);
		LODOP.ADD_PRINT_LINE(191,569,216,570,0,1);
		LODOP.ADD_PRINT_LINE(191,644,216,645,0,1);
		LODOP.ADD_PRINT_LINE(191,767,216,768,0,1);
		LODOP.ADD_PRINT_LINE(191,884,216,885,0,1);
		LODOP.ADD_PRINT_LINE(191,982,216,983,0,1);
		LODOP.ADD_PRINT_TEXT(193,40,36,20,"序号");
		LODOP.ADD_PRINT_TEXT(193,87,84,20,"汇票号码");
		LODOP.ADD_PRINT_TEXT(193,233,90,20,"承兑行");
		LODOP.ADD_PRINT_TEXT(193,406,100,20,"汇票金额（元）");
		LODOP.ADD_PRINT_TEXT(193,531,35,20,"期限");
		LODOP.ADD_PRINT_TEXT(193,570,75,20,"贴现利率(%)");
		LODOP.ADD_PRINT_TEXT(193,652,113,20,"贴现指导年利率(%)");
		LODOP.ADD_PRINT_TEXT(193,767,118,20,"客户经理收益（元）");
		LODOP.ADD_PRINT_TEXT(193,886,95,20,"贴现利息（元）");
		LODOP.ADD_PRINT_TEXT(193,983,94,20,"实付金额（元）");

		//------------------------------高度不变部分结束------------------------
		
		//---------------------有多条数据，根据List循环高度增加----------------
		
		var iCurLine=216;//上边距从216开始
		var amountsum = 0;
		var ctmginsum = 0;
		var cntrinsum = 0;
		var tranamsum = 0;
		for (i = 0; i < objDblistJson.length; i++) {
				LODOP.ADD_PRINT_LINE(iCurLine,39,iCurLine+30,40,0,1);
				LODOP.ADD_PRINT_LINE(iCurLine,76,iCurLine+30,77,0,1);
				LODOP.ADD_PRINT_LINE(iCurLine,182,iCurLine+30,183,0,1);
				LODOP.ADD_PRINT_LINE(iCurLine,381,iCurLine+30,382,0,1);
				LODOP.ADD_PRINT_LINE(iCurLine,524,iCurLine+30,525,0,1);
				LODOP.ADD_PRINT_LINE(iCurLine,569,iCurLine+30,570,0,1);
				LODOP.ADD_PRINT_LINE(iCurLine,644,iCurLine+30,645,0,1);
				LODOP.ADD_PRINT_LINE(iCurLine,767,iCurLine+30,768,0,1);
				LODOP.ADD_PRINT_LINE(iCurLine,884,iCurLine+30,885,0,1);
				LODOP.ADD_PRINT_LINE(iCurLine,982,iCurLine+30,983,0,1);
				LODOP.ADD_PRINT_LINE(iCurLine,1076,iCurLine+30,1077,0,1);
		
				LODOP.ADD_PRINT_TEXT(iCurLine+4,40,36,20,i+1);
				LODOP.ADD_PRINT_TEXT(iCurLine+4,77,105,20,objDblistJson[i].ntnumb);
				LODOP.ADD_PRINT_TEXT(iCurLine+4,184,194,20,objDblistJson[i].acbkna);
				LODOP.ADD_PRINT_TEXT(iCurLine+4,384,136,20,objDblistJson[i].amount);
				amountsum = amountsum + parseFloat(objDblistJson[i].amount);
				LODOP.ADD_PRINT_TEXT(iCurLine+4,525,43,20,objDblistJson[i].dealdt);
				LODOP.ADD_PRINT_TEXT(iCurLine+4,572,65,20,objDblistJson[i].ntrate);
				LODOP.ADD_PRINT_TEXT(iCurLine+4,651,115,20,objDblistJson[i].ckctir);
				LODOP.ADD_PRINT_TEXT(iCurLine+4,777,100,20,objDblistJson[i].ctmgin);
				ctmginsum = ctmginsum + parseFloat(objDblistJson[i].ctmgin);
				LODOP.ADD_PRINT_TEXT(iCurLine+4,889,90,20,objDblistJson[i].cntrin);
				cntrinsum = cntrinsum + parseFloat(objDblistJson[i].cntrin);
				LODOP.ADD_PRINT_TEXT(iCurLine+4,986,79,20,objDblistJson[i].tranam);
				tranamsum = tranamsum + parseFloat(objDblistJson[i].tranam);
				
				LODOP.ADD_PRINT_LINE(iCurLine+30,39,iCurLine+31,1077,0,1);
				
				iCurLine=iCurLine+30;//每行占30px
		}
		
		//--------------List结束----------------------------
		
		//---------------结束部分，高度根据list增加----------
		LODOP.ADD_PRINT_RECT(iCurLine+119,39,1042,25,0,1);
		LODOP.ADD_PRINT_LINE(iCurLine+119,76,iCurLine+145,77,0,1);
		LODOP.ADD_PRINT_LINE(iCurLine+119,182,iCurLine+145,183,0,1);
		LODOP.ADD_PRINT_LINE(iCurLine+119,381,iCurLine+145,382,0,1);
		LODOP.ADD_PRINT_LINE(iCurLine+119,525,iCurLine+145,526,0,1);
		LODOP.ADD_PRINT_LINE(iCurLine+119,568,iCurLine+145,569,0,1);
		LODOP.ADD_PRINT_LINE(iCurLine+119,644,iCurLine+145,645,0,1);
		LODOP.ADD_PRINT_LINE(iCurLine+119,768,iCurLine+145,769,0,1);
		LODOP.ADD_PRINT_LINE(iCurLine+119,884,iCurLine+145,885,0,1);
		LODOP.ADD_PRINT_LINE(iCurLine+119,982,iCurLine+145,983,0,1);
		
		LODOP.ADD_PRINT_TEXT(iCurLine+122,40,36,20,"合计");
		LODOP.ADD_PRINT_TEXT(iCurLine+122,387,128,20,amountsum);
		LODOP.ADD_PRINT_TEXT(iCurLine+122,780,100,20,ctmginsum);
		LODOP.ADD_PRINT_TEXT(iCurLine+122,887,90,20,cntrinsum);
		LODOP.ADD_PRINT_TEXT(iCurLine+122,985,90,20,tranamsum);
		
		LODOP.ADD_PRINT_TEXT(iCurLine+169,45,100,20,"贴现清单");
		LODOP.ADD_PRINT_TEXT(iCurLine+172,993,39,20,"1");
		LODOP.ADD_PRINT_TEXT(iCurLine+172,1031,10,20,"/");
		LODOP.ADD_PRINT_TEXT(iCurLine+172,1040,40,20,"1");
    //---------------结束----------------------------
		
}