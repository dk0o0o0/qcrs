/**
 * 同业本行投资批量收息js处理文件
 */
function openWindow(){
	window.open("/cpms/linkus/capital/interbank/bussiness/t50019InterBank/addItems",{width:'80%'});
}

$(function(){
	
	/**点击添加按钮弹出选择持仓页面**/
	$(document).on('click','#addItems',function(){
		//获取明细中已添加的产品编号,用于查询条件时将已添加的筛选出去
		var productNoArr = getInputProductNo();
		window.open("/cpms/linkus/capital/interbank/bussiness/t50019InterBank/addItems?productNoArr="+productNoArr,{width:'80%'});
	});
	
	/**点击查询对手方按钮弹出查询对手方页面**/
	$(document).on('click','#searchSameBusiness',function(){
		window.open('/cpms/linkus/capital/interbank/bussiness/interbankIvcntr/toSearch');
	});
	
	/**查看本季度已收息产品**/
	$(document).on('click','#searchDoneIncome',function(){
		window.open('/cpms/linkus/capital/interbank/bussiness/t50019InterBank/toDoneIncome');
	});
	/**查看本季度已确认产品**/
	$(document).on('click','#searchDoingIncome',function(){
		window.open('/cpms/linkus/capital/interbank/bussiness/t50019InterBank/toDoingIncome');
	});
	
	/**点击查询持仓按钮搜素出符合要求的持仓信息**/
	$(document).on('click','#searchBook',function(){
		var counterpartyName = $('#counterpartyName_search').val(); //添加页面的对手方名称
		var counterpartyName_input = $('#counterpartyName').val(); //input页面的对手方名称
		var busiRelateCenter = $("#center_search").val();//添加页面业务所属机构
		var length = $("#interbankIvcntrItemTable tbody tr").length;//明细数据条数
		/*if(counterpartyName==""){
			doTheAlert('提示','请输入需要批量收息的对手方名称!');
			return false;
		}else if(length !=0 && counterpartyName != counterpartyName_input){
			doTheAlert('提示','重选的对手方:['+counterpartyName+'] 与已录对手方:['+counterpartyName_input+'] 不一致!请删除明细后再重选!');
			return false;
		}*/
		var productNoArr = getInputProductNo();
		var productNo = $('#productNo_search').val();//产品编号
		var startInterDate = $("#startInterDate_search").val();
		var h = "";
		$.ajax({
			type : "post",
			global : false,
			async : true,
			url : '/cpms/linkus/capital/interbank/bussiness/t50019InterBank/searchContractInfo',
			data : {
				"counterpartyName" : counterpartyName,
				"productNo" : productNo,
				"busiRelateCenter" : busiRelateCenter,
				"startInterDate" : startInterDate,
				"productNoArr" : productNoArr
 			},
			dataType : "json",
			success : function(data) {
				var h="";
				if (data.cntrList.length!=0) {
					$("#cntrlength").text(data.cntrList.length);
					 for(var i = 0; i < data.cntrList.length; i++) {
                   		var json = data.cntrList[i];
                   		/*var payInterestPeriod = json['payInterestPeriod'];
                   		switch(json['payInterestPeriod']){//产品性质
	            			case "1" : payInterestPeriod="按月付息";break;
	            			case "3" : payInterestPeriod="按季付息";break;
	            			case "12" : payInterestPeriod="按年付息";break;
	            			case "0" : payInterestPeriod="到期一次性";break;
	            			case "00" : payInterestPeriod="其他";break;
	            			case "6" : payInterestPeriod="按半年付息";break;
	            		}*/
                   		var x=i+1;
                   		h += '<tr>'+
		            	    	'<td style="width:40px"><center><input name="tableB" id="tableB'+x+'" type="checkbox" value="'+x+'" >'+x+'</center></td>'+
		            	    	'<td><center><input name="cntrList['+i+'].busiRelateCenter" value="'+json["busiRelateCenter"]+'" readonly=true /></center></td>'+
		            	    	'<td><center><input name="cntrList['+i+'].inputUserId" value="'+json["inputUserId"]+'" readonly=true /></center></td>'+
		            	    	'<td><center><input name="cntrList['+i+'].productNo" value="'+json["productNo"]+'" readonly=true /></center></td>'+
		            	    	'<td id="counterpartyName'+x+'"><center><input name="cntrList['+i+'].counterpartyName" value="'+json["counterpartyName"]+'" readonly=true /></center></td>'+
		            	    	'<td><center><input name="cntrList['+i+'].productName" value="'+json["productName"]+'" readonly=true /></center></td>'+
		            	    	'<td><center><input name="cntrList['+i+'].remainAmount" value="'+moneyEncoder(json["remainAmount"])+'" readonly=true /></center></td>'+
		            	    	'<td><center><input name="cntrList['+i+'].realRate" value="'+json["realRate"]+'" readonly=true /></center></td>'+
		            	    	'<td><center><input name="cntrList['+i+'].startInterDate" value="'+json["startInterDate"]+'" readonly=true /></center></td>'+
		            	    	'<td><center><input name="cntrList['+i+'].maturityDate" value="'+json["maturityDate"]+'" readonly=true /></center></td>'+
		            	    	'<td><center><input name="cntrList['+i+'].interestAccruedBasis" value="'+json["interestAccruedBasis"]+'" readonly=true /></center></td>'+
		            	    	'<td><center><input name="cntrList['+i+'].receAccruedInterest" value="'+moneyEncoder(json["receAccruedInterest"])+'" readonly=true /></center></td>'+
		            	    	'<td><center><input name="cntrList['+i+'].bookId" value="'+json["bookId"]+'" readonly=true /></center></td>'+
		            	    	'<td id="contractNo'+x+'"><center><input name="cntrList['+i+'].contractNo" value="'+json["contractNo"]+'" readonly=true /></center></td>'+
		                	'</tr>';
					 }
				} else {
					doTheAlert("提示",counterpartyName+" 无同业本行投资记录！！");
				}
				$('#tabbody').html(h);
			}
		});
		
	});
	
	/**点击提交，将选择的批量收息数据传到后台处理，并显示到前台合同明细中**/
	$(document).on('click','#buttonId',function() {
		if(checkForbiddenClickFlag()){return;}
		var contractinfo = $('input:checkbox[name="tableB"]:checked');
		var contractNoArr="";
		if(contractinfo.length==0) {
			setForbiddenClickFlag_false();
			doTheAlert("提示","请至少选择一条！！");
			return false;
		} else {
			var counterpartyName_input = $("input[name='interbankCntr.counterpartyName']").val();
			//取勾选的第一条产品信息的对手方名称，循环与剩下的产品信息对手方名称作比较
			var counterpartyName_first = contractinfo.eq(0).parent().parent().parent().children("#counterpartyName"+contractinfo.eq(0).val()).children().children().val();
			for(var i=0;i<contractinfo.length;i++){
				var index = contractinfo.eq(i).val();
				//将所有勾选的产品信息的合同号拼接，传到后台处理
				var contractNo = contractinfo.eq(i).parent().parent().parent().children("#contractNo"+index).children().children().val();
				contractNoArr = contractNoArr + contractNo + ",";
				//重新选择时对手方判重
				var counterpartyNameall = contractinfo.eq(i).parent().parent().parent().children("#counterpartyName"+index).children().children().val()
				if(counterpartyName_input!=""){
					if(counterpartyName_input!=counterpartyNameall){
						setForbiddenClickFlag_false();
						doTheAlert("提示","请勾选与主页面同一对手方: "+counterpartyName_input+" 的产品信息！否则将明细中的产品清空再重选！");
						return false;
					}
				}
				for(var j=1;j<contractinfo.length;j++){
					var next_intdex = contractinfo.eq(j).val();
					var counterpartyName = contractinfo.eq(j).parent().parent().parent().children("#counterpartyName"+next_intdex).children().children().val()
					//单次勾选多笔时对手方判重
					if(counterpartyName_first!=counterpartyName){
						setForbiddenClickFlag_false();
						doTheAlert("提示","请勾选同一对手方！！");
						return false;
					}
				}
			}
		}
		//将已选择的条目的合同号传到后台进行处理
		if(contractNoArr.length>0){
			contractNoArr=contractNoArr.substring(0,contractNoArr.length-1);
			$.ajax({
				type : "post",
				global : false,
				async : true,
				url : '/cpms/linkus/capital/interbank/bussiness/t50019InterBank/Batch',
				data : {
					"contractNoArr" : contractNoArr,
				},
				dataType : "json",
				success : function(data) {
					if(data!=null){
						if(loadContractInfo2ParentPage(data)){
							calYSYJ();
							calYSLX();
							setForbiddenClickFlag_false();
							closePage();
						}
					}
				}
			});
		}
	});
	
	/**手动输入收息金额，计算总收息金额**/
	$(document).on('blur','#interbankIvcntrItemTable tbody td[class="YSLX"]',function(){
		calYSLX();
	});
	
	/**点击弹出的机构查询页面的选择，回显到持仓查询页面对手方信息**/
	$(document).on('click','#result input[value="选择"]',function(){
		var agencyId = $(this).parents("tr").attr("id");
		var agencyName = $(this).parents("td").prev().text();
		$("#counterpartyNo_search").val(agencyId);
		$("#counterpartyName_search").val(agencyName);	 
		closePage();
	});
	
	/**点击一行添加标记**/
	$(document).on('click','#interbankIvcntrItemTable tbody tr',
		function(){
			//移除所有标记
			$("#interbankIvcntrItemTable tbody tr").removeClass("justMark");
			//添加标记
			$(this).addClass("justMark");
			//设置当前行背景色，并清除除当前行外其他行的背景色
			$(this).siblings().css("background-color","");
			$(this).css("background-color","#ffe48d");
	});
	/**删除明细中的合同信息**/
	$(document).on('click','#deleteItem',function(){
		var productNo = $(".justMark td input").eq(0).val();
		if(productNo){
			getTheMessager().confirm("提示",'确定是要删除产品编号： "'+productNo+'" 的信息吗？',function(e){
				if(e){
					var tr = $(".justMark td").parent();
					tr.remove();
					//移除标记
					$("#interbankIvcntrItemTable tbody tr").removeClass("justMark");
					//更新序号
					var length = $("#interbankIvcntrItemTable tbody tr").length;//数据条数
					var h="";
					var index = 0;
					if(length>0){
						ok:for(var i=0;i<length;i++){
							var productNo = $("#interbankIvcntrItemTable input[name='interbankCntr.ivcntrItem["+i+"].productNo']").val();
							var productName = $("#interbankIvcntrItemTable input[name='interbankCntr.ivcntrItem["+i+"].productName']").val();
							var costAmount = $("#interbankIvcntrItemTable input[name='interbankCntr.ivcntrItem["+i+"].costAmount']").val();
							var startInterDate = $("#interbankIvcntrItemTable input[name='interbankCntr.ivcntrItem["+i+"].startInterDate']").val();
							var maturityDate = $("#interbankIvcntrItemTable input[name='interbankCntr.ivcntrItem["+i+"].maturityDate']").val();
							var receAccruedInterest = $("#interbankIvcntrItemTable input[name='interbankCntr.ivcntrItem["+i+"].receAccruedInterest']").val();
							var itemMaturityAmount = $("#interbankIvcntrItemTable input[name='interbankCntr.ivcntrItem["+i+"].itemMaturityAmount']").val();
							var bookId = $("#interbankIvcntrItemTable input[name='interbankCntr.ivcntrItem["+i+"].bookId']").val();
							var realRate = $("#interbankIvcntrItemTable input[name='interbankCntr.ivcntrItem["+i+"].realRate']").val();
							var quarterFlag = $("#interbankIvcntrItemTable input[name='interbankCntr.ivcntrItem["+i+"].quarterFlag']").val();
							if(productNo==undefined){
								i=i+1;
								var productNo = $("#interbankIvcntrItemTable input[name='interbankCntr.ivcntrItem["+i+"].productNo']").val();
								var productName = $("#interbankIvcntrItemTable input[name='interbankCntr.ivcntrItem["+i+"].productName']").val();
								var costAmount = $("#interbankIvcntrItemTable input[name='interbankCntr.ivcntrItem["+i+"].costAmount']").val();
								var startInterDate = $("#interbankIvcntrItemTable input[name='interbankCntr.ivcntrItem["+i+"].startInterDate']").val();
								var maturityDate = $("#interbankIvcntrItemTable input[name='interbankCntr.ivcntrItem["+i+"].maturityDate']").val();
								var receAccruedInterest = $("#interbankIvcntrItemTable input[name='interbankCntr.ivcntrItem["+i+"].receAccruedInterest']").val();
								var itemMaturityAmount = $("#interbankIvcntrItemTable input[name='interbankCntr.ivcntrItem["+i+"].itemMaturityAmount']").val();
								var bookId = $("#interbankIvcntrItemTable input[name='interbankCntr.ivcntrItem["+i+"].bookId']").val();
								var realRate = $("#interbankIvcntrItemTable input[name='interbankCntr.ivcntrItem["+i+"].realRate']").val();
								var quarterFlag = $("#interbankIvcntrItemTable input[name='interbankCntr.ivcntrItem["+i+"].quarterFlag']").val();
								length=length+1;
								if(productNo==undefined){
									continue ok;
							 	}
							}
							h += '<tr>'+
							    	'<td style="width:40px"><center>'+(index+1)+'</center></td>'+
							    	'<td><center><input name="interbankCntr.ivcntrItem['+index+'].productNo" value="'+productNo+'" readonly=true /></center></td>'+
							    	'<td><center><input name="interbankCntr.ivcntrItem['+index+'].productName" value="'+productName+'" readonly=true /></center></td>'+
							    	'<td><center><input name="interbankCntr.ivcntrItem['+index+'].costAmount" value="'+costAmount+'" class="noatoc amount" readonly=true /></center></td>'+
							    	'<td><center><input name="interbankCntr.ivcntrItem['+index+'].startInterDate" value="'+startInterDate+'" readonly=true /></center></td>'+
							    	'<td><center><input name="interbankCntr.ivcntrItem['+index+'].maturityDate" value="'+maturityDate+'" readonly=true /></center></td>'+
							    	'<td class="YSYJ"><center><input name="interbankCntr.ivcntrItem['+index+'].receAccruedInterest" value="'+receAccruedInterest+'" class="noatoc amount" readonly=true /></center></td>'+
							    	'<td class="YSLX"><center><input name="interbankCntr.ivcntrItem['+index+'].itemMaturityAmount"  value="'+itemMaturityAmount+'" class="noatoc amount"/></center></td>'+
							    	'<td style="display:none;"><input name="interbankCntr.ivcntrItem['+index+'].bookId" value="'+bookId+'" readonly=true /></center></td>'+
							    	'<td style="display:none;"><input name="interbankCntr.ivcntrItem['+index+'].realRate" value="'+realRate+'" readonly=true /></center></td>'+
							    	'<td style="display:none;"><input name="interbankCntr.ivcntrItem['+index+'].quarterFlag" value="'+quarterFlag+'" readonly=true /></center></td>'+
						    	'</tr>';
							index+=1;
						}
					}else{
						//如果明细中全部删除，则清空对手方信息
						$("#counterpartyName").val("");
						$("#transCoutertyAcctName").val("");
						$("#transCoutertyAcctNo").val("");
						$("#custOpBankName").val("");
						$("#counterpartyOpBkNo").val("");
					}
					$('#itembody').html(h);
					//删除需重新计算总应收金额和总收息金额
					calYSYJ();
					calYSLX();
				}
			});
		}
	});
	
});

/**查询同业机构**/
function getAgency() {
	var agencyName = document.getElementById('agencyName').value;
	if(agencyName==""){
		doTheAlert('提示','请输入机构名称!');
		return false;
	}
	var h = "";
	$.ajax({
		type : "post",
		global : false,
		async : false,
		url : '/cpms/linkus/capital/interbank/bussiness/interbankIvcntr/search',
		data : {
			"agencyName" : agencyName
		},
		dataType : "json",
		success : function(data) {
			if (data != null) {
				for (var i = 0; i < data.LIST.length; i++) {
					var json = data.LIST[i];
					h += '<tr id="'
							+ json['id']
							+ '" >' 
							+ '<td>'
							+ json['name']
							+ '</td>'
							+ '<td><input type="button" value="选择" id="h" class="btn"/></td>'
							+ '</tr>';
				}
			}
			$('#result').append(h);
		}
	});
}

/**将ajax传回的数据到主页面**/
function loadContractInfo2ParentPage(data){
	var interbank = data.interbankCntr;
	var ivcntrItemList = data.cntrItemList;
	loadContractInfo(interbank);
	return loadContractItemInfo(ivcntrItemList);
}
/**加载合同信息**/
function loadContractInfo(interbank){
	$("#counterpartyName").val(interbank.counterpartyName);
	$("#transCoutertyAcctName").val(interbank.transCoutertyAcctName);
	$("#transCoutertyAcctNo").val(interbank.transCoutertyAcctNo);
	$("#custOpBankName").val(interbank.custOpBankName);
	$("#counterpartyOpBkNo").val(interbank.counterpartyOpBkNo);
}
/**加载明细信息**/
function loadContractItemInfo(ivcntrItemList){
	var h="";
	var index = $("#interbankIvcntrItemTable tbody tr").length;//主页面数据条数
	for(var i=0;i<ivcntrItemList.length;i++){
		var json = ivcntrItemList[i];
		if(moneyEncoder(json["receAccruedInterest"])==0){
			doTheAlert('提示','产品编号：'+json["productNo"]+" 持仓中应收金额为0!");
			return false;
		}
		//效验对手方是否有重复
		
		h += '<tr>'+
	    	'<td style="width:40px"><center>'+(index+1)+'</center></td>'+
	    	'<td><center><input name="interbankCntr.ivcntrItem['+index+'].productNo" value="'+json["productNo"]+'" readonly=true /></center></td>'+
	    	'<td><center><input name="interbankCntr.ivcntrItem['+index+'].productName" value="'+json["productName"]+'" readonly=true /></center></td>'+
	    	'<td><center><input name="interbankCntr.ivcntrItem['+index+'].costAmount" value="'+moneyEncoder(json["costAmount"])+'" class="noatoc amount" readonly=true /></center></td>'+
	    	'<td><center><input name="interbankCntr.ivcntrItem['+index+'].startInterDate" value="'+json["startInterDate"]+'" readonly=true /></center></td>'+
	    	'<td><center><input name="interbankCntr.ivcntrItem['+index+'].maturityDate" value="'+json["maturityDate"]+'" readonly=true /></center></td>'+
	    	'<td class="YSYJ"><center><input name="interbankCntr.ivcntrItem['+index+'].receAccruedInterest" value="'+moneyEncoder(json["receAccruedInterest"])+'" class="noatoc amount" readonly=true /></center></td>'+
	    	'<td class="YSLX"><center><input name="interbankCntr.ivcntrItem['+index+'].itemMaturityAmount" value="'+moneyEncoder(json["receAccruedInterest"])+'" class="noatoc amount"/></center></td>'+
	    	'<td style="display:none;"><input name="interbankCntr.ivcntrItem['+index+'].bookId" value="'+json["bookId"]+'" /></td>'+
	    	'<td style="display:none;"><input name="interbankCntr.ivcntrItem['+index+'].realRate" value="'+json["realRate"]+'" /></td>'+
	    	'<td style="display:none;"><input name="interbankCntr.ivcntrItem['+index+'].quarterFlag" value="'+json["quarterFlag"]+'" /></td>'+
    	'</tr>';
		index+=1;
	}
	$('#itembody').append(h);
	return true;
}
/**计算总应收金额**/
function calYSYJ(){
	var totalYSYJ = 0;
	var length = $("#interbankIvcntrItemTable tbody tr").length;//数据条数
	for(var i=0;i<length;i++){
		//计算总应收金额
		var YSYJ = getMoneyValue($("input[name='interbankCntr.ivcntrItem["+i+"].receAccruedInterest']").val());
		totalYSYJ +=  YSYJ*1;//求出总和 (*1是为了可以直接相加,而不是拼接字符串)
	}
	$("input[name='interbankCntr.receAccruedInterest']").val(totalYSYJ.toFixed(2)).change();
}
/**计算总收息金额**/
function calYSLX(){
	var totalYSLX = 0;
	var length = $("#interbankIvcntrItemTable tbody tr").length;
	for(var i=0;i<length;i++){
		var YSLX = getMoneyValue($("input[name='interbankCntr.ivcntrItem["+i+"].itemMaturityAmount']").val());
		totalYSLX +=  YSLX*1;//求出总和 (*1是为了可以直接相加,而不是拼接字符串)
	}
	$("input[name='interbankCntr.maturityAmount']").val(totalYSLX.toFixed(2)).change();
	$("#transAmount_act").val(getMoneyValue(totalYSLX.toFixed(2)));//将无千位分隔符的金额放入隐藏域中，用于记账核算
}
/**经办保存**/
function do50019Save(){
	var length = $("#interbankIvcntrItemTable tbody tr").length;
	if(length == 0){
		doTheAlert("提示","请选择需要批量收息的产品!");
		return false;
	}
	for(var i=0;i<length;i++){
		var YSLX = getMoneyValue($("input[name='interbankCntr.ivcntrItem["+i+"].itemMaturityAmount']").val());
		var productNo = getMoneyValue($("input[name='interbankCntr.ivcntrItem["+i+"].productNo']").val());
		if(YSLX*1 <= 0){
			doTheAlert("提示","第["+(i+1)+"]条,产品编号：["+productNo+"] 未输入正确的收息金额!");
			return false;
		}
	}
	var totalYSYJ = getMoneyValue($("input[name='interbankCntr.receAccruedInterest']").val());
	var totalYSLX = getMoneyValue($("input[name='interbankCntr.maturityAmount']").val());
	var d_value = totalYSLX-totalYSYJ;
	if(d_value>1000000||d_value<-1000000){
		getTheMessager().confirm('确认', '收息总金额与应收应计总金额相差超过100万，是否继续？', function(flag) {
			if (flag) {
				PLSXSave();
			}
		});
	}else{
		PLSXSave();
	}
}

function PLSXSave(){
	if(checkForbiddenClickFlag()){return;}
	var busiType=$("#busiType").val();
	var approvalOpinion = $('#approvalOpinion').val();
	if(!approvalOpinion){
		approvalOpinion = '';
	}
	var $form = $("#form_id");
	$form.attr("action",$("#actionBaseUrl").val()+"/businessRegister?approvalOpinion="+encodeURI(approvalOpinion));
	var option = {
			type:"post",
			dataType:"json",
			async:false,
			success:function(data){
				setForbiddenClickFlag_false();
				setPageHandleName("close");
				$.messager.alert('提示',"经办操作成功 ！！",'',function(){
					pageHandle();
				});
			},
			error:function(){
				setForbiddenClickFlag_false();
				doTheAlert('提示', errorTip);
			}
		};
	$form.ajaxSubmit(option);
}
/**挑选持仓时的全选**/
function selectAll(allBox){
	var allBox=allBox.checked;
	var length = $("#table tbody tr").length;
	for (var i = 0; i < length; i++) {
		var select = $("#table tbody tr").eq(i).children().eq(0).children().children().eq(0);
		if(allBox==true){
			select[0].checked=true;
			$("#table tbody tr").eq(i).children().css("backgroundColor","#ffcc80");
		}else{
			select[0].checked=false;
			$("#table tbody tr").eq(i).children().css("backgroundColor","");
		}
	}
}
/**获取明细表格中已添加的产品list，再次查询时做筛选**/
function getInputProductNo(){
	//获取明细中已添加的产品编号,用于查询条件时将已添加的筛选出去
	var productNoArr = "";
	for(var i=0;i<$("#itembody tr").length;i++){
		var productNo = $("input[name='interbankCntr.ivcntrItem["+i+"].productNo']").val();
		productNoArr = productNoArr + productNo + ",";
	}
	if(productNoArr.length>0){
		productNoArr=productNoArr.substring(0,productNoArr.length-1);
	}
	return productNoArr;
}
