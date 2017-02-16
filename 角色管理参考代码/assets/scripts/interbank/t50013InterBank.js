/*************************************************************************************************
/* DESC       ：同业本行投资收息JS 

                                                                                                                                                                            
                                                                                                                                                                                
/* AUTHOR     ：大资管平台项目组                                                                                                                                                                                 
/* CREATE     ：2016-08-09                                     
/* MODIFYLIST ： Name          Date         Reason                                                
/*              yourName      updateDate    modiReason                                               
/*              -------------------------------------------------------------   
*************************************************************************************************/

/**
 * 同业本行投资收息持仓信息查询页面跳转
 * 陈阳妙
 */		
$(document).ready(function() {
	$(document).on('click', '#search_btn', function() {
		//同业本行投资收息信息查询页面跳转
		window.open('/cpms/linkus/capital/interbank/bussiness/t50013InterBank/executeSearch',{width:'70%'});
	});
		
	$(document).on('change','#accruedFlag_search',function(){
		//显示掩藏交易对手名称查询按钮
		if($('#accruedFlag_search').is(':checked')==true){
			$('#searchSameBusiness').show();
		}else {
			$('#counterpartyName_search').val('');
			$('#acceptBankId_search').val('');
			$('#searchSameBusiness').hide();
		}
	});
	
	/**
	 * 同业本行投资收息持仓信息查询
	 */
	$(document).on('click','#seacthInof_btn',function(){
		//同业本行投资收息持仓信息查询
		var busiType =$('#busiType').val(); //业务代号
		var counterpartyName = $('#counterpartyName_search').val(); //对手方名称
		var acceptBankId = $('#counterpartyNo_search').val();//对手方ID
		var maturityDate= $('#maturityDate_search').val();//到期日
		var productNo = $('#productNo_search').val();//产品编号
		var contractNo = $('#contractNo_search').val();//合同号
		var h = "";
		$.ajax({
			type : "post",
			global : false,
			async : true,
			url : "" + '/cpms/linkus/capital/interbank/bussiness/InterbankIvcntr/getInterbankIvcntrByBookInfo_50013',
			data : {
				"busiType" : busiType,
				"counterpartyName" : counterpartyName,
				"acceptBankId" : acceptBankId,
				"maturityDate" : maturityDate,
				"productNo" : productNo,
				"contractNo" : contractNo
			},
			dataType : "json",
			success : function(data) {
				var h="";
				if (data.list.length!=0) {
					 for(var i = 0; i < data.list.length; i++) {
                   		var json = data.list[i];
                   		var x=i+1;
                   		h += '<tr id="tableA" onclick="getLine('+x+')">'+
                   		'<td><center><input onclick="getLine('+x+')" name="tableB" id="tableB'+x+'"type="radio"value="'+x+'" >'+x+'</center></td>'+
			              '<td id="contractNo'+x+'"><center>'+json['contractNo']+'</center></td>'+
			              '<td><center>'+json['productNo']+'</center></td>'+
			              '<td><center>'+moneyEncoder(json['transAmount'])+'</center></td>'+
			              '<td><center>'+moneyEncoder(json['remainAmount'])+'</center></td>'+
			              '<td><center>'+json['realRate']+'</center></td>'+
			              '<td><center>'+json['startInterDate']+'</center></td>'+
			              '<td><center>'+json['maturityDate']+'</center></td>'+
			              '<td><center>'+moneyEncoder(json['receAccruedInterest'])+'</center></td>'+
			              '<td><center>'+json['bookId']+'</center></td>'+
			              '<td><center>'+moneyEncoder(json['receAccruedInterest'])+'</center></td>'+
        				  '</tr>';
					 }
				} else {
					doTheAlert("提示",counterpartyName+"无同业本行投资记录！！");
				}
				$('#tabbody').html(h);
			}
		});
	});
	
	/**
	 * 同业本行投资提前支取持页面回显
	 */	
	$(document).on('change', '#initialContractNo', function() {
		//同业本行投资提前支取持页面回显
		var initialContractNo=document.getElementById("initialContractNo").value;
		//业务代号
		var busiType =$('#busiType').val();
		if (this.value) {
			$.ajax({
				type : "post",
				global : false,
				async : false,
				url : "" + '/cpms/linkus/capital/interbank/bussiness/InterbankIvcntr/getInterbankIvcntrByInitialContractNo',
				data : {
					"busiType" : busiType,
					"initialContractNo" : initialContractNo
				},
				dataType : "json",
				success : function(data) {
					if (data != null) {
						var bookId=data['map']['bookId'];
						$('#maturityAmount').val(data['periodInterestReve']);
						for (var key in data['map']) {
							if (key == 'initialContractNo'){
								continue;
							}
							if(key=='contractNo') {
								continue;
							}
							if(key=='faceAmount'){
								$("#faceAmount").val(data['map']['remainAmount']);
							}
							/*if(key=='periodInterestReve') {
								$('#maturityAmount').val(data['map'][key]);
							}*/
							/*if(key=='transAmount'){
								$('#oldFaceAmount').val(data['map']['transAmount']);
								$("#oldFaceAmount").change();//面值的汉字大写提示
							}else{*/
							var ele = $('#'+ key );
							ele.val("");
							if(key=='occupyLimitType'){
								if(data['map']['occupyLimitType']=='0'){
									document.getElementById('occupyLimitType0').checked=true;
									$('#divId').hide();
								}
								if(data['map']['occupyLimitType']=='1'){
									$('#divId').show();
									document.getElementById('occupyLimitType1').checked=true;
									findTnirdInfo(bookId);
								}
							}
							ele.val(data['map'][key]);
							//}
						}
						$("#specialPurposeVehicle").removeClass("empty");
						$("#productNature").removeClass("empty");
						$("#interestAccruedBasis").removeClass("empty");
						$("#payInterestPeriod").removeClass("empty");
						$("#busiRelateCenter").removeClass("empty");
						$("#faceAmount").change();
						$("#receAccruedInterest").change();
					}
				}
			});
		}
	});
	
	/**
	 *同业本行投资提前支取持仓信息查询提交
	 */
	$(document).on('click','#buttonId',function() {
		var val=$('input:radio[name="tableB"]:checked').val();
		if(val==null) {
			doTheAlert("提示","请选择！！");
			return false;
		} else {
			$('table').each(function(){
				var contractNoStr = $(this).find('#contractNo' + val).text();
				if(contractNoStr) {
					closePage();//关闭查询页面
					document.getElementById("initialContractNo").focus();
					document.getElementById("initialContractNo").value=contractNoStr;
					document.getElementById("initialContractNo").blur();
					$('#initialContractNo').change();//调用方法
				}
			});
		}
	});
	
	/**
	 * 同业本行投资提前支取第三方授信信息回显
	 */
	 function findTnirdInfo(bookId) {
		 //第三方授信信息回显
		var h="";
		var n="";
		$.ajax({
			type : "post",
			global : false,
			async : false,
			url : "" + "/cpms/linkus/capital/interbank/bussiness/InterbankIvcntr/findThirdInfo",
			data : {
				"bookId" : bookId
			},
			dataType : "json",
			success : function(data) {
				var datas=data.list;
				var i=0;
				$.each(datas, function(key1, value1) {
					json = datas[i];
					h += '<tr id="tableA">'+
					'<td><center>'+json['num']+'</center></td>'+
					'<td ><center>'+moneyEncoder(json['happenAmount'])+'</center></td>'+
					'<td><center>'+json['paName']+'</enter></td>'+
					'<td><center>'+json['agencyId']+'</center></td>'+
					'</tr>';
					//绑定table数据传给后台
					n=n+json['happenAmount'+i+'']+"/"+json['agencyId'+i+'']+";";
					i=i*1+1;
				});
				$('#Tbody').html(h);
				$('#btn_celldata').html(n);
			}
		});
	}
});

//改变收息金额同时改变清算金额(记账)
$(document).on('blur', '#maturityAmount', function() {
	$("#transAmount_act").val(getMoneyValue($("#maturityAmount").val()));
});

/**
 * 同业本行投资提前终止第三方授信信息单机选中一行
 */
function getLine(str) {
	if($('#tableB'+str).is(':checked')){//判断是否选中
		$('#tableB'+str).prop("checked", false);
	} else {
		$('#tableB'+str).prop("checked", true);
	}
}

/**
 * 判断提前支取面值并且计算利息
 */
$(document).on('blur', '#faceAmount', function() { //改变交易总金额
	//提前支取面值
	 var faceAmount=getMoneyValue(document.getElementById("faceAmount").value);
	 //利率
	 var realRate=$("#realRate").val();
	 //提前支取日期
	 var advanceEndDate=new Date($("#advanceEndDate").val());
	 //原起息日
	 var startInterDate=new Date($("#startInterDate").val());
	 //天数差
	 var days=(advanceEndDate-startInterDate)/(24*3600*1000);
	//利息计提基础
	 $('#interestAccruedBasis').removeAttr("disabled");
	 var interestAccruedBasis=$('#interestAccruedBasis').val();
	 $('#interestAccruedBasis').attr("disabled",true);
	 //利息
	var receAccruedInterest=(parseFloat(faceAmount*realRate).toFixed(4))/100/interestAccruedBasis*days;
	//剩余面值
	var remainAmount=getMoneyValue($("#remainAmount").val());
	if(remainAmount*1>=faceAmount*1){
		//利息赋值	
		$("#receAccruedInterest").val(parseFloat(receAccruedInterest).toFixed(2)).change();
	}else{
		$("#faceAmount").val("0.00");
		doTheAlert("提示","亲！提前支取面值不能大于剩余面值！！");
		$("#faceAmount").focus();
	}
});

function doSave(){
	//判断页面输入项是否为空
	if(!pubCheck("saveInterbankfux_form")){//表单ID
		return;
	}
	$("toolbarBottom .end,toolbarBottomTips .end").hide();
	//通过判断页面上有无合同号，确定走经办保存/交易更正
	var $contractNo = $("#contractNo");
	var approvalOpinion = $('#approvalOpinion').val();;

	//流程图节点已经改为RD passFlag给PASS仅限于记账通过
	if(ifContractExist()){
		action = "/cpms/linkus/capital/interbank/bussiness/t50013InterBank/businessAmend?passFlag=FAIL&approvalOpinion="+approvalOpinion;
	}else{
		action = "/cpms/linkus/capital/interbank/bussiness/t50013InterBank/businessRegister?passFlag=FAIL&approvalOpinion="+approvalOpinion;
	}
	var option = {
		type:"post",
		dataType:"json",
		url:action,
		async:false,
		success:function(data){
			if(data!=null){
				if(data.normal){
					$contractNo.val(data.contractNo);
					$("toolbarBottom .end,toolbarBottomTips .end").show();
					var href = "/cpms/linkus/capital/business/cpmsPublicStep/showAct?contractNo="+$("#contractNo").val()+"&busiType="+$("#busiType").val();
					var $aLink = $("#bga_publicLink");
					$aLink.attr('href',href);
					$aLink.click();
					$aLink.removeAttr('href');
					$("#MD_end").show();
				}else{
					doTheAlert("警告",data.tip);
				}
				
			}
		},
		error:function(){
			
		}
	};
	deleDisabled();
	$("#saveInterbankfux_form").ajaxSubmit(option);
	addDisabled();
}

//*********经办保存去除置灰********//
function deleDisabled(){
	$('#interestAccruedBasis').removeAttr("disabled");
	$('#payInterestPeriod').removeAttr("disabled");
	$('#productNature').removeAttr("disabled");
	$('#specialPurposeVehicle').removeAttr("disabled");
	$('#occupyLimitType0').removeAttr("disabled");
	$('#occupyLimitType1').removeAttr("disabled");
	$('#busiRelateCenter').removeAttr("disabled");
}

//*********经办保存禁用********//
function addDisabled(){
	$('#interestAccruedBasis').attr("disabled","disabled");
	$('#payInterestPeriod').attr("disabled","disabled");
	$('#productNature').attr("disabled","disabled");
	$('#specialPurposeVehicle').attr("disabled","disabled");
	$('#occupyLimitType0').attr("disabled","disabled");
	$('#occupyLimitType1').attr("disabled","disabled");
	$('#busiRelateCenter').attr("disabled","disabled");
}