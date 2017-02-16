/*************************************************************************************************
/* DESC       ：债券公用ＪＳ                                                                                                                                                                                 
/* AUTHOR     ：大资管平台项目组                                                                                                                                                                                 
/* CREATE     ：2016-04-13                                     
/* MODIFYLIST ： Name          Date         Reason                                                
/*              yourName      updateDate    modiReason                                               
/*              -------------------------------------------------------------   
*************************************************************************************************/

						//*********经办RG*********//
//----------------------//经办保存
	function RG_save(){
		if(checkForbiddenClickFlag()){return;}
		var busiType=$("#busiType").val();
		if("20001||20002".indexOf(busiType)==-1){
			var checkFlag=pubCheck("t"+busiType+"Bond_form");
			if(!checkFlag){
				setForbiddenClickFlag_false();
				return ;
			}
			var bool = dealBondData();
			if(!bool){
				setForbiddenClickFlag_false();
				return;
			}
		}
		var approvalOpinion = $('#approvalOpinion').val();
		if(!approvalOpinion){
			approvalOpinion = '';
		}
		var $form = $("#t"+busiType+"Bond_form");
		$form.attr("action",$("#actionBaseUrl").val()+"/businessRegister?approvalOpinion="+encodeURI(approvalOpinion));
		var option = {
				type:"post",
				dataType:"json",
				async:false,
				success:function(data){
					setForbiddenClickFlag_false();
					RG_MDInvok(data,"RG");
				},
				error:function(){
					setForbiddenClickFlag_false();
					doTheAlert('提示', errorTip);
				}
			};
		$form.ajaxSubmit(option);
	}
	
						//*********更正MD*********//
	
//----------------------//更正保存
	//更正保存
	function MD_save(){
		if(checkForbiddenClickFlag()){return;}
		var busiType = $("#busiType").val();
		var checkFlag=pubCheck("t"+busiType+"Bond_form");
		if(!checkFlag){
			setForbiddenClickFlag_false();
			return ;
		}
		
		var bool = dealBondData();
		if(!bool){
			setForbiddenClickFlag_false();
			return;
		}
		var approvalOpinion = $('#approvalOpinion').val();
		if(!approvalOpinion){
			approvalOpinion = '';
		}
		var action = "/cpms/linkus/capital/bond/bussiness/t"+busiType+"Bond/businessAmend?passFlag=PASS&approvalOpinion="+encodeURI(approvalOpinion);
		var option = {
			type:"post",
			dataType:"json",
			url:action,
			async:false,
			success:function(data){
				if(data!=null){
					if(data.normal){
						setForbiddenClickFlag_false();
						RG_MDInvok(data,"MD");
					}else{
						doTheAlert("提示",data.tip);
						setForbiddenClickFlag_false();
					}
				}
			},
			error:function(){
				doTheAlert('提示', errorTip);
				setForbiddenClickFlag_false();
			}
		};
		var $selects = $("select[disabled]");
		$selects.removeAttr("disabled");
		if("20005||20008||20012".indexOf(busiType)>-1){
			//除明细中的千分号     务必引入对应的js
			removeTheItemsThousandCharacter();
		}
		//完毕
		$("#t"+busiType+"Bond_form").ajaxSubmit(option);
		$selects.attr('disabled','');
		console.log("#t"+busiType+"Bond_form");
	}

						//*********复核CK*********//	
	function CK_pass(){
		var busiType = $("#busiType").val();
		var approvalOpinion =  $('#approvalOpinion').val();
		if(!approvalOpinion){
			approvalOpinion = '';
		}
		var action = "/cpms/linkus/capital/bond/bussiness/t"+busiType+"Bond/businessVerify?passFlag=PASS&approvalOpinion="+encodeURI(approvalOpinion);
		var option = {
			type:"post",
			dataType:"json",
			url:action,
			async:false,
			success:function(data){
				setForbiddenClickFlag_false();
				if(data!=null){
					if(data.normal){
						setPageHandleName("close");
				 		if("20001||20002||20006||20008||20009||20052||20054".indexOf(busiType)>-1){
				 			getTheMessager().confirm("提示",data.tip+"，是否打印审批单?",function(flag){
					 			if(flag){
					 				showPrintpage();
					 			}else{
					 				pageHandle();
					 			}
					 		});
				 		}else{
				 			getTheMessager().alert("提示",data.tip,'',function(){
					 			pageHandle();
					 		});
				 		}
					}else{
						doTheAlert("提示",data.tip);
					}
				}
			},
			error:function(){
				doTheAlert('提示', errorTip);
				setForbiddenClickFlag_false();
			}
		};
		var $selects = $("select[disabled]");
		$selects.removeAttr("disabled");
//		if("T20005||T20008||T20012".indexOf(busiType)>-1){
		if("T20005||T20012".indexOf(busiType)>-1){
			//除明细中的千分号     务必引入对应的js
			removeTheItemsThousandCharacter();
		}
		if(checkForbiddenClickFlag()){return;}
		$("#t"+busiType+"Bond_form").ajaxSubmit(option);
		$selects.attr('disabled','');
		console.log("#t"+busiType+"Bond_form");
	}
	
						//*********我方指令确认_指令匹配*********//	
	function toFSQS(){
		//业务类型
		var busiType = $("#busiType").val();
		var contractNo = $("#contractNo").val();
		var approvalOpinion =  $('#approvalOpinion').val();
		if(!approvalOpinion){
			approvalOpinion = '';
		}
		var url = "/cpms/linkus/capital/bond/bussiness/bondPublic/doComParion";
		if(checkForbiddenClickFlag()){return;}
		$.ajax({
			type : "post",
			global : false,
			url : url,
			data : {
				"contractNo":contractNo,
				"busiType":busiType,
				"approvalOpinion":approvalOpinion,
				"passFlag":"PASS"
			},
			dataType : "json",
			success:function(data){
				if(data!=null){
					setForbiddenClickFlag_false();
					if(data.normal){
						ifDoTheFSQS("AUTOMATE");
					}else{
						doTheAlert("提示",data.tip);
					}
				}
			},
			error:function(){
				doTheAlert('提示', errorTip);
				setForbiddenClickFlag_false();
			}
		});
	}
	
	/** 打开交割单补录页面*/
	function toJG(contractNo){
		window.open('/cpms/linkus/capital/bond/bussiness/bondPublic/toJG?contractNo='+contractNo,{width:'30%',minHeight:'40%'});
	}
	
	/** 交割单补录*/
	function JG_save(){
		var busiType = $("#busiType").val();
		var contractNo = $("#contractNo").val();
		var approvalOpinion =  $('#approvalOpinion').val();
		var deliveryNo = $("#deliveryNo").val();
		if(!approvalOpinion){
			approvalOpinion = '';
		}
		var url = "/cpms/linkus/capital/bond/bussiness/t20008Bond/deliveryNoRepair";
		if(checkForbiddenClickFlag()){return;}
		$.ajax({
			type : "post",
			global : false,
			url : url,
			data : {
				"contractNo":contractNo,
				"busiType":busiType,
				"approvalOpinion":approvalOpinion,
				"deliveryNo":deliveryNo
			},
			dataType : "json",
			success:function(data){
				setForbiddenClickFlag_false();
				if(data!=null){
					if(data.normal){
						setPageHandleName("close");
						getTheMessager().alert("提示",data.tip,'',function(){
				 			pageHandle();
				 		});
					}else{
						doTheAlert("提示",data.tip);
					}
				}
			},
			error:function(){
				doTheAlert('提示', errorTip);
				setForbiddenClickFlag_false();
			}
		});
	}
	
	
	/**跳转到人工处理页面   FSQS QYBK公用*/
	function manuallyDispose(taskStatus){
		var contractNo = $("#contractNo").val();
		var transCsbsNo = $("#transCsbsNo").val();
		window.open('/cpms/linkus/capital/bond/bussiness/bondPublic/manuallyDisposePage?contractNo='+contractNo+'&transCsbsNo='+transCsbsNo+'&taskStatus='+taskStatus,{width:'30%',minHeight:'40%'});
	}
	
	function ifDoTheFSQS(manualHandleFlag){
		getTheMessager().confirm('确认', '是否要指令确认，发送报文至中债登？', function(flag) {
			if (flag) {
				doTheFSQS(manualHandleFlag);
			}
		});
	}
	
	//指令确认
	function doTheFSQS(manualHandleFlag){
		var $settleInstructNo = $("#settleInstructNo");
//		var settleContractNo = $("#settleContractNo").val();
		if(manualHandleFlag=="MANUAL_HANDLE"){
			if(!$settleInstructNo.val()){
				getTheMessager().alert("提示","结算指令编号未填写。",'',function(){
		 			$settleInstructNo.focus();
		 		});
		 		setForbiddenClickFlag_false();
				return;
			}
			$("#manuallyDispos_button").attr('disabled','');
		}
		var busiType = $("#busiType").val();
		var contractNo = $("#contractNo").val();
		var approvalOpinion =  $('#approvalOpinion').val();
		if(!approvalOpinion){
			approvalOpinion = '';
		}
		var url = "/cpms/linkus/capital/bond/bussiness/t"+busiType+"Bond/businessSendCSBSMsg";
		if(checkForbiddenClickFlag()){return;}
		$.ajax({
			type : "post",
			global : false,
			url : url,
			data : {
				"contractNo":contractNo,
				"busiType":busiType,
				"passFlag":"PASS",
				"approvalOpinion":approvalOpinion,
				"settleInstructNo":$("#settleInstructNo").val(),
				"manualHandleFlag":manualHandleFlag//是否是人工处理的标志
			},
			dataType : "json",
			success:function(data){
				setForbiddenClickFlag_false();
				if(data!=null){
					if(data.normal){
						setPageHandleName("close");
						getTheMessager().alert("提示",data.tip,'',function(){
				 			pageHandle();
				 		});
					}else{
						doTheAlert("提示",data.tip);
					}
				}
			},
			error:function(){
				doTheAlert('提示', errorTip);
				setForbiddenClickFlag_false();
			}
		});	
	}
	
	
	//聚焦在结算指令编号输入框且按下回车时触发人工处理
	$(document).on("keydown","#settleInstructNo",function(event){
		if(event.keyCode==13){	
			doTheFSQS('MANUAL_HANDLE');
		}
	});

	//指令确认
	function doTheQYBK(manualHandleFlag){
		var $settleContractNo = $("#settleContractNo");
		if(manualHandleFlag=="MANUAL_HANDLE"){
			if(!$settleContractNo.val()){
				getTheMessager().alert("提示","结算合同编号未填写。",'',function(){
		 			$settleContractNo.focus();
		 		});
		 		setForbiddenClickFlag_false();
				return;
			}
			$("#manuallyDispos_button").attr('disabled','');
		}
		var busiType = $("#busiType").val();
		var contractNo = $("#contractNo").val();
		var approvalOpinion =  $('#approvalOpinion').val();
		if(!approvalOpinion){
			approvalOpinion = '';
		}
		var url = "/cpms/linkus/capital/bond/bussiness/t"+busiType+"Bond/QYBKDispose";
		if(checkForbiddenClickFlag()){return;}
		$.ajax({
			type : "post",
			global : false,
			url : url,
			data : {
				"contractNo":contractNo,
				"busiType":busiType,
				"passFlag":"PASS",
				"approvalOpinion":approvalOpinion,
				"settleContractNo":$("#settleContractNo").val()
			},
			dataType : "json",
			success:function(data){
				setForbiddenClickFlag_false();
				if(data!=null){
					if(data.normal){
						setPageHandleName("close");
						getTheMessager().alert("提示",data.tip,'',function(){
				 			pageHandle();
				 		});
					}else{
						doTheAlert("提示",data.tip);
					}
				}
			},
			error:function(){
				doTheAlert('提示', errorTip);
				setForbiddenClickFlag_false();
			}
		});	
	}
	
	
	/***打开审批单打印页面**/
	function showPrintpage(){
		if(checkForbiddenClickFlag()){return;}
		$.ajax({
			type : "post",
			global : false,
			url : "/cpms/linkus/capital/bond/bussiness/bondPublic/getPrintPageUrl",
			data : {
				"busiType":$("#busiType").val(),
				"contractNo":$("#contractNo").val()
			},
			dataType : "json",
			success:function(data){
				setForbiddenClickFlag_false();
				window._open(encodeURI(encodeURI(data.printPageUrl)));
				pageHandle();
			},
			error:function(){
				setForbiddenClickFlag_false();
				getTheMessager().alert("提示","审批单信息查询失败，请在打印中心中打印。",'',function(){
		 			pageHandle();
		 		});
			}
		});	
	}
	
	
	
	//聚焦在结算合同编号输入框且按下回车时触发人工处理
	$(document).on("keydown","#settleContractNo",function(event){
		if(event.keyCode==13){	
			doTheQYBK("MANUAL_HANDLE");
		}
	});
	

//---------------------------------------//上传文件
function fileUpload_(){
	var fileName = $("#upload").val();
	var contractNo = $("#contractNo").val();
	var inputDay = $(".inputDay").val();
	$.ajaxFileUpload({
		url : "/cpms/linkus/capital/common/upload/uploadPublic/upload?fileName="+encodeURI(fileName)+"&contractNo="+contractNo+"&inputDay="+inputDay,
		type : "post",
		global : false,
		secureuri : false,
		fileElementId : 'upload',
		dataType : 'json',
		success : function(data) {
			
		},
		error:function(){
			doTheAlert('提示', errorTip);
		}
	});

}

//--------------------------------------//打回更正  删除上传的文件信息
function fileDelete_(){
	var contractNo = $("#contractNo").val();
	var inputDay = $(".inputDay").val();
	$.ajax({
		type : "post",
		global : false,
		url : "/cpms/linkus/capital/common/upload/uploadPublic/deleteDir",
		data : {
			"contractNo":contractNo,
			"inputDay":inputDay
		},
		dataType : "json",
		success:function(data){
			
		},
		error:function(){
			doTheAlert('提示', errorTip);
		}
	});
}

//---------------------------------------//打开机构查询页面
	$(document).on('click','#goSBSearchPage',
		function(){
			window.open('/cpms/linkus/capital/bond/bussiness/bondPublic/businessSearchPage',{width:'65%'});
	});
	
	//点击机构查询按钮
	$(document).on('click','#findAgencyByName',findAgencyByName);
	//机构简称录入时按回车
	$(document).on("keydown","#agencyName",function(event){
		if(event.keyCode==13){
			findAgencyByName();
			return false;
		}
	});

//---------------------------------------//机构搜索
	function findAgencyByName(){
		var userAgent = navigator.userAgent;
		var agencyName = $('#agencyName').val();
		if(!agencyName&&userAgent.indexOf("Chrome")==-1){
			$('#result').html('');
			getTheMessager().alert("提示","请录入机构简称。",'',function(){
	 			$('#agencyName').focus();
	 		});
			return;
		}
		var h = "";
		var tip = $("#searchAgencyNameTip");
		setPageHandleName("close");
		tip.text("搜索中，请稍候");
		if(checkForbiddenClickFlag()){return;}
		$.ajax({
			type : "post",
			global : false,
			//async : true,
			url : '/cpms/linkus/capital/bond/bussiness/bondPublic/findAgency',
			data : {
				"agencyName":agencyName
			},
			dataType : "json",
			success : function(data) {
			 if (data != null) {
				 for(var i = 0; i < data.LIST.length; i++) {
               		var json = data.LIST[i];
                	h += '<tr id="'+json['id']+'">'+
			              '<td>'+json['name']+'</td>'+
			              '<td><input type="button" value="选择" id="h" class="btn"/></td>'+
        				  '</tr>';
                 }
			 }
			 $('#result').html(h);
			 tip.text('');
			 setForbiddenClickFlag_false();
			},
			error:function(){
				doTheAlert('提示', errorTip);
				setForbiddenClickFlag_false();
			}
		});
	}
	
	//双击行选择机构
	$(document).on('dblclick','#agencySearchTable tbody tr',function(){
		$(this).find("input[value='选择']").click();
	});



						//*********经办RG回调*********//
function RG_MDInvok(data,taskStatus){
	if(data.normal){
		var busiType = $("#busiType").val();
		//正逆回购在非市场发起的经办处理完是刷新页面 
		if("20005||20012".indexOf(busiType)>-1&&taskStatus=="RG"&&!$("#marketSign").val()){
			setPageHandleName("reload");
		}else{
			setPageHandleName("close");
		}
		window.open('/cpms/linkus/capital/business/cpmsPublicStep/showApprovalPath?contractNo='+data.contractNo,{width:'60%'});
		if("20006||20008||20009".indexOf(busiType)>-1){
			$("#contractNo").val(data.contractNo);
			fileUpload_();
		}
	}else{
		doTheAlert("提示",data.tip);
	}
}
	
$(document).on('blur','.amountGt0',function(){
	amountGt0($(this));
});
//数值必须大于0
function amountGt0($input){
	var val = $input.val();
	if(val!=""&&val==0){
		doTheAlert("提醒","录入的数据必须大于0");
		$input.val('');
		$input.focus();
	}
}

	//选择不授信时出字提示
	$(document).on('change','#creditStatus',function(){
		var creditStatus = $("#creditStatus").val();
		if(creditStatus==0){
			$("#creditTip").show();
		}else{
			$("#creditTip").hide();
		}
	});


//---------------------------------------//给数字加上/除去千分号
	function addThousandCharacter(num){
		//传入的不是数字或者为空   返回原值
		if(isNaN(num)||!num)
			return num;
		var str;
		//如果传入的是小数   直接拆分
		num = num.toString();
		if(num.indexOf('.')!=-1)
		 	str = num.split(".");
		else//传入的是整数    默认给两位小数
			str = [num,'00'];
		//零宽断言      如果某个字段是1~3位数字  并且它后面的数字个数是3的倍数   则给这个字段后加一个千分符
		str[0]=str[0].replace(/\d{1,3}(?=(\d{3})+$)/g,function(s){return s+','});
		return str[0]+"."+str[1];
	}
	function removeThousandCharacter(num){
		//用replace+正则的形式完成replaceAll的功能
		var returnNum = parseFloat(num.toString().replace(new RegExp(",",'g'),""));
			//传入的值为空或者解析后不是数字    则返回原值
			if(!num||isNaN(returnNum))
				return num;
		return returnNum;
	}


//******************债券买入托管场所联动改变托管账号*******************//
$(document).on('change','#escrowPlaceCode',function(){
	 var escrowPlaceCode =$("#escrowPlaceCode").val();
	 var counterpartyNo=$("#counterpartyNo").val();
	 if(!counterpartyNo){
	 	return;
	 }
	 var counterpartyName =$("#counterpartyName").val();
	 var option="";
	 $.ajax({
			type : "post",
			global : false,
			async : true,
			url : '/cpms/linkus/capital/bond/bussiness/bondPublic/findCoutertyBankAcctNoInfo',
			data : {"escrowPlaceCode":escrowPlaceCode,
						"counterpartyNo":counterpartyNo},
			dataType : "json",
			success : function(data) {
				if(data.list&&data.list.length>0){
					for(var i=0;i<data.list.length;i++){
						option += '<option value='+data.list[i]+' >'+data.list[i]+'</option>';
					}
					$("#coutertyBankSelect").html(option);
				}else{
					if(!$("#notWarnWithEscrowPlaceCode").length){
						var escrowPlaceName= $("#escrowPlaceCode option:selected").text();
						doTheAlert("提示","托管场所为"+escrowPlaceName+"时，没有"+counterpartyName+"的托管账号，请补录或者更换托管场所。");
					}
					$("#coutertyBankSelect").html("");
				}
			},
			error:function(){
				doTheAlert('提示', errorTip);
			}
	 });
	
});

//部分债券业务债券到期日与传入日期的比较(借贷,承分销,提前赎回,)
function compareToDeliveryDate (matureDate,strDate,tip){
	var days = calculateDays(strDate,matureDate);
	if(days<0){
		doTheAlert("提示",tip+strDate+" 大于债券到期日: "+matureDate+"!");
		//$("input[name='bondCntr.bondName']").val("");//清空债券名称信息
		return false;
	}
	return true;
}


function calculateDays(date1,date2){
	//将年月日格式转成月日年再转成Date类型  通过毫秒数差来计算日期间隔
	var indexDate,oDate1,oDate2,days;
	indexDate = date1.split("-");
	oDate1 = new Date(indexDate[1]+"-"+indexDate[2]+"-"+indexDate[0]);
	indexDate = date2.split("-");
	oDate2 = new Date(indexDate[1]+"-"+indexDate[2]+"-"+indexDate[0]);
	days = parseInt((oDate2-oDate1)/1000/60/60/24);
	return days;
}

function changeUploadName(){
	var uploadName = $("#upload").val();
	var $uploadMDTip = $("#uploadMDTip");
	if(!uploadName){
		uploadName = "点击这里上传文件";
		if($uploadMDTip){
			$uploadMDTip.show();
		}
	}else{
		uploadName = uploadName.substring(uploadName.lastIndexOf("\\")+1);
		if($uploadMDTip){
			$uploadMDTip.hide();
		}
	}
	$("#uploadTip").html(uploadName);
}


	//---------------------------------------//消除小数部分尾巴的0
	function cleanFloat0(str){
		if(!str){
			return str+'';
		}
		str = str.split(".");
		if(str.length==1){
			return str;
		}
		var index = 0;
		for(var i=str[1].length-1;i>=0;i--){
			if(str[1].charAt(i)!=0){
				index = i;
				break;
			}
		}
		if(str[1]==0)
			return str[0];
		return str[0]+"."+str[1].substring(0,index+1);
	}
	
/*function desribeLength (){
	var desribe = $("input[name='bondCntr.desribe']").val();
	if(desribe.length>150){
		doTheAlert("提示","备注长度过长!");
		return false;
	}
}*/
	