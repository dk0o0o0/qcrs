						// *********经办RG回调*********//
function RGInvok(data){
	setForbiddenClickFlag_false();
	if(data.normal){
		setPageHandleName("close");
		window.open('/cpms/linkus/capital/business/cpmsPublicStep/showApprovalPath?contractNo='+data.contractNo,{width:'60%'});
	}else{
		doTheAlert("提示",data.tip);
	}
}
//$(document).on('click','#btn_save',
		function pubRGSave(){
			var $selects = $("select[disabled]");
			var $input = $("input[disabled]");
			$selects.removeAttr("disabled");
			$input.removeAttr('disabled');
			var busiType=$("#busiType").val();
			var $form = $("#bill_cntr"+busiType);
			$form.removeAttr("action");
			var approvalOpinion = $('#approvalOpinion').val();
			if(!approvalOpinion){
				approvalOpinion = '';
			}
			$form.attr("action",$("#actionBaseUrl").val()+"/businessRegister?approvalOpinion="+encodeURI(approvalOpinion));
		    $form.attr("enctype","");
			var option = {
					type:"post",
					dataType:"json",
					async:false,
					success:function(data){
						RGInvok(data);
					},
					error:function(){
						doTheAlert("提示","经办操作失败");
						setForbiddenClickFlag_false();
					}
				};
				//if(checkForbiddenClickFlag()){return;} 
				$("#bill_cntr"+busiType).ajaxSubmit(option);
				$selects.attr('disabled','');
				$input.attr('disabled','');
	}
function ck30001_26(busitype){
	// 30001单张票复核
	var $billNo="";
	var $noteType="";
	var $matureDate="";
	var $billRate="";
	var $faceAmount="";
	var flag=true;
	var billnoflag=true;
	if($("input[name='checkname']").not("input:checked").length<=0){   // 如果没有
 		ckAffirm(); 
		flag=false;
 		return;
    }else{
	    $("input[name='checkname']").each(function(){
	    if (!$(this).prop("checked")) {
	    	 var trNo =$(this).parent().parent().index();
	    	       if($("#ck_billNo").length>0){
	    	    	    $billNo = $("#table tbody tr").eq(trNo).children().find('.billNo').val();
				        if($billNo==$("#ck_billNo").val()){
				        	billnoflag=false;
				    	// 根据输入的 billNo获取出对应的明细数据 再根据该条明细数据去匹配输入的其他要素是否正确
						if($("#ck_noteType").length>0){
						$noteType = $("#table tbody tr").eq(trNo).children().find('.noteType').val();
						if($noteType!=$("#ck_noteType").val()){
						 	doTheAlert("提示","票据类型错误！");
						 	flag=false;
						 	return flag;
						}
						}
				
				 	 	if($("#ck_billRate").length>0){
				 	 	$billRate = $("#table tbody tr").eq(trNo).children().find('.rate-ordinary').val();
				 	 	if($billRate*1-$("#ck_billRate").val()*1!=0){
				 	 	 	doTheAlert("提示","利率错误！");
				 	 	 	flag=false;
						 	return flag;
				 	 	}
						}
						if($("#ck_matureDate").length>0){
						   $matureDate = $("#table tbody tr").eq(trNo).children().find('.matureDate').val();
			               if($matureDate!=$("#ck_matureDate").val()){
			                 	doTheAlert("提示","日期错误！");
			                 	flag=false;
							 	return flag;
			               }
						}
						if($("#ck_faceAmount").length>0){
							$faceAmount = getMoneyValue($("#table tbody tr").eq(trNo).children().find('.faceAmount').val());
				 	 	 	if($faceAmount*1-getMoneyValue($("#ck_faceAmount").val())*1==0){
				 	 	 	  flag=false;
				 	 	 	}else{
				 	 	 		doTheAlert("提示","金额错误！");
				 	 	 		flag=false;
							 	return flag;
				 	 	 	}
						}
			 	 	 
		                 // 如果正确 标记该条数据为已复核，且判断是否还有未复核的数据
		 	 	 		$("#table tbody tr").eq(trNo).children().find("#checkname").prop("checked","true");
		 	 	 		$(this).parent().parent().css("backgroundColor","#FFCC80");
		 	 	 		// 隐藏的值显示出来
		 	 	 		$("#table tbody tr").eq(trNo).children().find('.rate-ordinary').css("visibility",'visible');
		 	 	 		$("#table tbody tr").eq(trNo).children().find('.faceAmount').css("visibility",'visible');
		 	 	 		$("#table tbody tr").eq(trNo).children().find('.matureDate').css("visibility",'visible');
		 	 	 		
		 	 			if($("input[name='checkname']").not("input:checked").length>0){   // 如果有
						if($("#ck_billNo").length>0){																// 继续调用
		 	 				$("#ck_billNo").val("");
						}
		 	 			if($("#ck_billRate").length>0){
		 	 				$("#ck_billRate").val("");
		 	 			}
		 	 			if($("#ck_billRate").length>0){
							$("#ck_faceAmount").val("");
		 	 			}
		 	 	 		}else{
		 	 	 			 // 如果全复核完，则贴现调用复核通过的公共方法，质押调用审票通过的方法
		 	 	 			if('30026'==busitype){
		 	 	 				$("#CNpass").click();
		 	 	 			}else{
		 	 	 				ckAffirm(); 
		 	 	 				return;
		 	 	 			}
		 	 	 			 
		 	 	 		}
				        }
	    	       }
		     }
	        });
    	   }
	        if(billnoflag){
					doTheAlert("提示","票据号码错误!");
					$("#ck_billNo").val("");
					flag=false;
				 	return flag;
	        }
	        return flag;
}
$(document).on("keydown","input[name='ck_billRate']",function(event){
	if(event.keyCode==13){	
		btn_CKClick();
	}
});
var trNo=0;
function check_ebill_30001(){ 
	// 30001单张票复核
	var ecdsClearType=$("#ecdsClearType").val();
	var ecdsConveyType=$("#ecdsConveyType").val();
	var trlen=$("#table tbody tr").length;
	var flag=true;
	var $billRate="";
	var billNo;
	var noteType;
	var matureDate;
	var faceAmount;
	if($("input[name='checkname']").not("input:checked").length<=0){   // 如果没有
 		ckAffirm(); 
 		return;
    }else{
    		$billRate=$("#table [name='billCntr.items["+trNo+"].billRate']").val();
    		if($billRate*1-$("#ck_billRate").val()*1!=0){
    			doTheAlert("提示","利率错误！");
     	 	 	flag=false;
    		 	return flag;
    		}
    		if(ecdsClearType!=$("#ck_ecdsClearType").val()){
    			doTheAlert("提示","清算方式错误！");
    			flag=false;
    		 	return flag;
    		}
    		if(ecdsConveyType!=$("#ck_ecdsConveyType").val()){
    			doTheAlert("提示","转让方式错误！");
    			flag=false;
    		 	return flag;
    		}
    		//  如果正确 标记该条数据为已复核，且判断是否还有未复核的数据
 	 		$("#table tbody tr").eq(trNo).children().find("#checkname").prop("checked","true");
 	 		$("#table tbody tr").eq(trNo).css("backgroundColor","#FFCC80");
 	 		
 			if($("input[name='checkname']").not("input:checked").length>0){   // 如果还有要复核的数据 
 				//给票号、到期日，金额，类型栏赋 下一行的值。
 				billNo=$("#table [name='billCntr.items["+(trNo+1)+"].billNote.billNo']").val();
 				noteType=$("#table [name='billCntr.items["+(trNo+1)+"].billNote.noteType']").val();
 				matureDate=$("#table [name='billCntr.items["+(trNo+1)+"].billNote.matureDate']").val();
 				faceAmount=$("#table [name='billCntr.items["+(trNo+1)+"].billNote.faceAmount']").val();
 				$("#ck_billNo").val(billNo);
 				$("#ck_noteType").val(noteType);
 				$("#ck_matureDate").val(matureDate);
 				$("#ck_faceAmount").val(faceAmount);
 				$("#ck_billRate").val(""); //清空利率栏
 				$("#ck_billRate").focus();
 				trNo++;
 	 		}else{
 	 			 // 如果全复核完，则贴现调用复核通过的公共方法，质押调用审票通过的方法
 	 				ckAffirm(); 
 	 				return;
 	 		}
    	}
	
}
   
function btn_CKClick(){
	// 判断录入数据是否正确 noteType matureDate billRate faceAmount
	var busitype=$("#busiType").val();
	var billType=$("#billType").val();
	if ("1"==billType){
		var busitype=$("#busiType").val();
		if('30001'==busitype||'30003'==busitype||'30007'==busitype||'30011'==busitype||'30033'==busitype){
			if ($("#billType").val()=="1" && !checkBillRecall()){
				return;
			}
		}
	}
	if(busitype=='30001' || '30026'==busitype ){
	 //贴现及质押复核
		 if ("1"==billType){
			 if (!check_ebill_30001()){
		    	 return;
		    	} 
		 }else{
		 	if (!ck30001_26(busitype)){
	    	 return;
	    	}
		 }
	     
	}else{// 公共复核
		 if ("1"==billType){
			 //-----电票买入业务检测是否有对方撤回票据 
		
			 ebill_ckCheck(); 
		 }else{
			 //------纸票复核
			 bill_ckCheck();
		 }
		
		
	}
	    
				
	     
}	
//*********纸票复核验证
function bill_ckCheck(){
	var flag =true;
    if(($("#ck_noteType").length>0)&&($("#ck_noteType").val()!=$("#noteType").val())){
		doTheAlert("提示","票据类型错误！");
		flag=false;
 	 	return flag;
 	}
	if(($("#ck_billRate").length>0)&&($("#ck_billRate").val()*1-$("#billRate").val()*1!=0)){
		doTheAlert("提示","利率错误！");
		flag=false;
	 	return flag;
	}
	if(($("#ck_faceAmount").length>0)&&(getMoneyValue($("#ck_faceAmount").val())*1-getMoneyValue($("#faceAmount").val())*1!=0)){
		doTheAlert("提示","面值错误！");
		flag=false;
 	 	return flag;
 	}
		
	if(($("#ck_transAmount").length>0)&&(getMoneyValue($("#ck_transAmount").val())*1-getMoneyValue($("#transAmount").val())*1!=0)){
		doTheAlert("提示","成交金额错误！");
		flag=false;
 	 	return flag;
 	}

	if (flag) { 
		var taskStatus = $("#id_taskStatus",window.parent.document).val();
		if('SCK'==taskStatus){
			doSCK();
		}else{
			ckAffirm();
		}
	}
	
}
//******************电票复核验证
function ebill_ckCheck(){
	var flag =true;
 	if($("#ck_ecdsClearType").val()!=$("#ecdsClearType").val()){
		doTheAlert("提示","清算方式错误！");
		flag=false;
 	 	return flag;
 	}
 	
	if($("#ck_ecdsConveyType").val()!=$("#ecdsConveyType").val()){
		doTheAlert("提示","转让方式错误！");
		flag=false;
 	 	return flag;
 	}
 	if($("#busiType").val()=="30011" ||$("#busiType").val()=="30032"||$("#busiType").val()=="30033"){
 		if($("#ck_billRate").val()*1-$("#redeemRate").val()*1!=0){
 			doTheAlert("提示","赎回利率错误！");
 			flag=false;
 		 	return flag;
 		}
 	}	else{
	if($("#ck_billRate").val()*1-$("#billRate").val()*1!=0){
		doTheAlert("提示","利率错误！");
		flag=false;
	 	return flag;
	}}

	if(getMoneyValue($("#ck_faceAmount").val())*1-getMoneyValue($("#faceAmount").val())*1!=0){
		doTheAlert("提示","面值错误！");
		flag=false;
 	 	return flag;
 	}
	
	if($("#ck_transAmount").length>0){
		if(getMoneyValue($("#ck_transAmount").val())*1-getMoneyValue($("#transAmount").val())*1!=0){
			doTheAlert("提示","成交金额错误！");
			flag=false;
	 	 	return flag;
		}
	}
	
	if($("#ck_redeemAmount").length>0){
		if(getMoneyValue($("#ck_redeemAmount").val())*1-getMoneyValue($("#redeemAmount").val())*1!=0){
			doTheAlert("提示","赎回金额错误！");
			flag=false;
	 	 	return flag;
		}
	}
		
	if (flag) { 
		var taskStatus = $("#id_taskStatus",window.parent.document).val();
		if('SCK'==taskStatus){
			doSCK();
		}else{
	 		ckAffirm();
		}
	}
	
}
	
// --------记账
$(document).on('click','#AK .account',function(){
	   
		var busiType = $("#busiType").val();
		var captitalAcctNo = $("#counterpartyAcctNo").val();
		var url = "/cpms/linkus/capital/business/cpmsPublicStep/showAct?contractNo="+$("#contractNo").val()+"&busiType="+busiType+"&captitalAcctNo="+captitalAcctNo;
	   window.open(url);
	});
// ----------------------//更正
	function  pubAmendSave(){
		var $selects = $("select[disabled]");
		var $input = $("input[disabled]");
		$selects.removeAttr("disabled");
		$input.removeAttr('disabled');
		var busiType = $("#busiType").val();
		var contractNo=$("#contractNo").val();
		var approvalOpinion = $('#approvalOpinion').val();
		if(!approvalOpinion){
			approvalOpinion = '';
		}
		// var action =
		// "/cpms/linkus/capital/bill/bussiness/t"+busiType+"Bill/businessAmend";
		var $form = $("#bill_cntr"+busiType);
		$form.attr("action",$("#actionBaseUrl").val()+"/businessAmend?passFlag=PASS&approvalOpinion="+encodeURI(approvalOpinion));
		$form.attr("enctype","");
		var option = {
				type:"post",
				dataType:"json",
				async:false,
				success:function(data){
					setForbiddenClickFlag_false();
					if(data!=null){
						RGInvok(data);
					if(data.normal){
						parent.closePage();
					}
				}
				},
				error:function(){
					doTheAlert("提示","业务更正失败。");
					setForbiddenClickFlag_false();
				}
			};
	//	if(checkForbiddenClickFlag()){return;}
		$("#bill_cntr"+busiType).ajaxSubmit(option);
		$selects.attr("disabled","");
		$input.attr('disabled',"");
	}
	

	// *********复核CK*********//
	$(document).on('click','#CK .affirm',function(){
		var checkOperUserFlag=$("#id_checkOperUserFlag").val();
		if(checkOperUserFlag=="1"){
		     doTheAlert("提示","复核与经办不能为同一个人!");
		     return false;
		}
		var busitype=$("#busiType").val();
		 if('30001'==busitype||'30003'==busitype||'30007'==busitype||'30009'==busitype||'30011'==busitype||'30033'==busitype){
			 if ($("#billType").val()=="1" && !checkBillRecall()){
				 return;
			 }
		 }
		// 弹出复核页面
		toOpenCKUrl();
	});
	
	function toOpenCKUrl(){
		var busiType = $("#busiType").val();
		var billType = $("#billType").val();
		var billNo=$("#table [name='billCntr.items[0].billNote.billNo']").val();
		var noteType=$("#table [name='billCntr.items[0].billNote.noteType']").val();
		var matureDate=$("#table [name='billCntr.items[0].billNote.matureDate']").val();
		var faceAmount=$("#table [name='billCntr.items[0].billNote.faceAmount']").val();
		if('30029'==busiType){
			ckAffirm();
		}else{
			var url ;
			//30001 电票要传第一条数据的票号、票据类型、到期日、金额显示。
			if("30001"==busiType){
				url = "/cpms/linkus/capital/bill/bussiness/billPublic/checkCK?busiType="+busiType+"&billType="+billType+
				"&billNo="+billNo+"&noteType="+noteType+"&matureDate="+matureDate+"&faceAmount="+faceAmount;
			}else{
				url = "/cpms/linkus/capital/bill/bussiness/billPublic/checkCK?busiType="+busiType+"&billType="+billType;
			}
	         window.open(url);
		}
	}
	
	function ckAffirm(){
		var $selects = $("select[disabled]");
		var $input = $("input[disabled]");
		$selects.removeAttr("disabled");
		$input.removeAttr('disabled');
		var busiType = $("#busiType").val();
		var contractNo=$("#contractNo").val();
		var approvalOpinion =  $('#approvalOpinion').val();
		var action = "/cpms/linkus/capital/bill/bussiness/t"+busiType+"Bill/businessVerify";
		console.log("action" + action);
		var option = {
				type:"post",
				data:{
				"busiType":busiType,
				"contractNo":contractNo,
				"passFlag":"PASS",
				"approvalOpinion":approvalOpinion
			    }, 
				dataType:"json",
				url:action,
				async:false,
				success:function(data){
					if(data!=null){
						setForbiddenClickFlag_false();
						if(data.normal){
							setPageHandleName("close");
							$.messager.alert('提示',data.tip,'',function(r){
								if(r){
									pageHandle();
								}
							});
						}else{
							doTheAlert("提示",data.tip);
							
						}
					}
				},
				error:function(){
					doTheAlert("提示","业务复核失败。");
					setForbiddenClickFlag_false();
				}
			};
		if(checkForbiddenClickFlag()){return;}
		$("#bill_cntr"+busiType).ajaxSubmit(option);
		$selects.attr("disabled","");
		$input.attr('disabled',"");
	}
	
	
	$(document).on('click','#SCK .affirm',function(){// SCK
		toOpenCKUrl();
	});
	function doSCK(){
		var $selects = $("select[disabled]");
		var $input = $("input[disabled]");
		$selects.removeAttr("disabled");
		$input.removeAttr('disabled');
		var busiType = $("#busiType").val();
		var contractNo=$("#contractNo").val();
		var approvalOpinion = $('#approvalOpinion').val();
		var action = "/cpms/linkus/capital/bill/bussiness/t"+busiType+"Bill/businessUpperVerify";
		console.log("action" + action);
		var option = {
				type:"post",
				data:{
				"busiType":busiType,
				"contractNo":contractNo,
				"passFlag":"PASS",
				"approvalOpinion":approvalOpinion
			    }, 
				dataType:"json",
				url:action,
				async:false,
				success:function(data){
					setForbiddenClickFlag_false();
					if(data!=null){
						setForbiddenClickFlag_false();
					setPageHandleName("close");
					$.messager.alert('提示',data.tip,'',function(r){
								if(r){
									pageHandle();
								}
							});
				}
				},
				error:function(){
					doTheAlert("提示","业务复核失败。");
					setForbiddenClickFlag_false();
				}
			};
		if(checkForbiddenClickFlag()){return;}
		$("#bill_cntr"+busiType).ajaxSubmit(option);
		$selects.attr("disabled","");
		$input.attr('disabled',"");
	}
	
$(document).on('click','#SAU_PASS',function(){
	doTheSAu("PASS");
});

function SAU_FAIL(){
	doTheSAu("FAIL");
}

// 执行审批
function doTheSAu(passFlag){
	var $selects = $("select[disabled]");
	var $input = $("input[disabled]");
	$selects.removeAttr("disabled");
	$input.removeAttr('disabled');
	// 业务类型
	var busiType = $("#busiType").val();
	var contractNo = $("#contractNo").val();
	var approvalOpinion =  $('#approvalOpinion').val();
	var url = "/cpms/linkus/capital/bill/bussiness/t"+busiType+"Bill/businessUpperApproval";
	if(checkForbiddenClickFlag()){return;}
	$.ajax({
			type:"post",
			data:{
				"busiType":busiType,
				"contractNo":contractNo,
				"passFlag":passFlag,
				"approvalOpinion":approvalOpinion
			},
			dataType:"json",
			url:url,
			success:function(data){
				if(data!=null){
					setForbiddenClickFlag_false();
					setPageHandleName("close");
					$.messager.alert('提示',data.tip,'',function(){
						pageHandle();
					});
				}
			},
			error:function(){
				doTheAlert('提示', "审批失败！");
				setForbiddenClickFlag_false();
			}
		});
	$selects.attr("disabled","");
	$input.attr('disabled',"");
}	

	// 出入库
  $(document).on('click','#IO_middle .reset',function(){
	  var $selects = $("select[disabled]");
		var $input = $("input[disabled]");
		$selects.removeAttr("disabled");
		$input.removeAttr('disabled');
		// 业务类型
		var busiType = $("#busiType").val();
		var contractNo=$("#contractNo").val();
		var desribe =  $('#approvalOpinion').val();
		var url = "/cpms/linkus/capital/bill/bussiness/t"+busiType+"Bill/businessInoutstorage";
		console.log("url  " + url);
		var option = {
				type:"post",
				data:{
				"busiType":busiType,
				"contractNo":contractNo,
				"passFlag":"PASS",
				"approvalOpinion":desribe
			},
				dataType:"json",
				url:url,
				success:function(data){
					console.log("data.tip = " + data.tip);
					if(data!=null){
						setForbiddenClickFlag_false();
						setPageHandleName("close");
						$.messager.alert('提示',data.tip,'',function(r){
						if(r){
						pageHandle();
						}
					});
				}
				},
				error:function(){
					doTheAlert('提示', "出入库失败！");
					setForbiddenClickFlag_false();
				}
				};
		if(checkForbiddenClickFlag()){return;}
		$("#bill_cntr"+busiType).ajaxSubmit(option);
		$selects.attr("disabled","");
		$input.attr('disabled',"");
	});
	
	
	 $(document).on('click','#SIO .reset',function(){
		 var $selects = $("select[disabled]");
			var $input = $("input[disabled]");
			$selects.removeAttr("disabled");
			$input.removeAttr('disabled');
		// 业务类型
		var busiType = $("#busiType").val();
		var contractNo=$("#contractNo").val();
		var desribe = $('#approvalOpinion').val();
		var url = "/cpms/linkus/capital/bill/bussiness/t"+busiType+"Bill/businessUpperInoutstorage";
		console.log("url  " + url);
		var option = {
				type:"post",
				data:{
				"busiType":busiType,
				"contractNo":contractNo,
				"passFlag":"PASS",
				"approvalOpinion":desribe
			},
				dataType:"json",
				url:url,
				success:function(data){
					if(data!=null){
					setForbiddenClickFlag_false();
					setPageHandleName("close");
					$.messager.alert('提示',data.tip,'',function(r){
								if(r){
									pageHandle();
								}
							});
				}
				},
				error:function(){
					setForbiddenClickFlag_false();
					doTheAlert('提示', "出入库失败！");
				}
				};
		if(checkForbiddenClickFlag()){return;}
		$("#bill_cntr"+busiType).ajaxSubmit(option);
		$selects.attr("disabled","");
		$input.attr('disabled',"");
	});

$(document).on('click','#CNpass', // 审票通过CNpass
function (){
	
		var busitype=$("#busiType").val();
		 if('30001'==busitype||'30003'==busitype||'30007'==busitype||'30009'==busitype||'30011'==busitype||'30033'==busitype){
			 if ($("#billType").val()=="1" && !checkBillRecall()){
				 return;
			 }
		 }
	    var allNoteid = $("#noteids").val();
	    if(allNoteid==""){ //如果没有剔除票据则走审票通过，否则要打回更正。
	    	 var $selects = $("select[disabled]");
				var $input = $("input[disabled]");
				$selects.removeAttr("disabled");
				$input.removeAttr('disabled');
		    var busiType = $("#busiType").val();
		    var contractNo=$("#contractNo").val();
		    var approvalOpinion =  $('#approvalOpinion').val();
			var action = "/cpms/linkus/capital/bill/bussiness/t"+busiType+"Bill/businessApprovalBill";
			var option = {
			type:"post",
			data:{
				"busiType":busiType,
				"contractNo":contractNo,
				"passFlag":"PASS",
				"approvalOpinion":approvalOpinion
			}, 
			dataType:"json",
			url:action,
			async:false,
			success:function(data){
			setForbiddenClickFlag_false();
		      if(data!=null){
		    		setForbiddenClickFlag_false();
		      		setPageHandleName("close");
					$.messager.alert('提示',data.tip,'',function(){
						pageHandle();
					});
				}
			},
			error:function(){
			     doTheAlert("提示","审票失败");
			     setForbiddenClickFlag_false();
			}
			};
			if(checkForbiddenClickFlag()){return;}
			$("#bill_cntr"+busiType).ajaxSubmit(option);
			$selects.attr("disabled","");
			$input.attr('disabled',"");
	    }else{
	    	getTheMessager().confirm('确认','您已剔除票据，需要将业务打回更正!',function(flag){
				if(flag){
					//更改数据库票据状态
					updateWipedOutFlagToBills(allNoteid);
					toWhatFlow("FAIL","toNextFlow");//流程扭转
				}
			});
	    }
});	
function CNFail(){
    var allNoteid = $("#noteids").val();
	if(allNoteid!=""){ //如果没有剔除票据则走审票通过，否则要打回更正。
		//更改数据库票据状态
		updateWipedOutFlagToBills(allNoteid);
	}
	toCorrectFlow();
}

/****系内分支机构验票**/
$(document).on('click','#CIOpass', // 审票通过CNpass
function (){
	    var allNoteid = $("#noteids").val();
	    if(allNoteid==""){ //如果没有剔除票据则走审票通过，否则要打回更正。
	    	var $selects = $("select[disabled]");
			var $input = $("input[disabled]");
			$selects.removeAttr("disabled");
			$input.removeAttr('disabled');
		    var busiType = $("#busiType").val();
		    var contractNo=$("#contractNo").val();
		    var approvalOpinion =  $('#approvalOpinion').val();
				var action = "/cpms/linkus/capital/bill/bussiness/t"+busiType+"Bill/businessCIOBill";
				var option = {
				type:"post",
				data:{
					"busiType":busiType,
					"contractNo":contractNo,
					"passFlag":"PASS",
					"approvalOpinion":approvalOpinion
				}, 
				dataType:"json",
				url:action,
				async:false,
				success:function(data){
			      if(data!=null){
			    		setForbiddenClickFlag_false();
			      		setPageHandleName("close");
						$.messager.alert('提示',data.tip,'',function(r){
									if(r){
										pageHandle();
									}
								});
					}
				},
				error:function(){
				     doTheAlert("提示","审票失败");
				     setForbiddenClickFlag_false();
				}
			};
				if(checkForbiddenClickFlag()){return;}
			$("#bill_cntr"+busiType).ajaxSubmit(option);
			$selects.attr("disabled","");
			$input.attr('disabled',"");
	    }else{
	    	setForbiddenClickFlag_false();
	    	getTheMessager().confirm('确认','您已剔除票据，需要将业务打回更正!',function(flag){
				if(flag){
					//更改数据库票据状态
					updateWipedOutFlagToBills(allNoteid);
					toWhatFlow("FAIL","toNextFlow");//流程扭转
				}
			});
	    }
});	
function updateWipedOutFlagToBills(noteids){
	var contractNo =$("#contractNo").val();
	$.ajax({
				type : "post",
				global : false,
				async : false,
				url : '/cpms/linkus/capital/bill/bussiness/billPublic/updateWipedOutFlagToBills?noteids='+noteids+"&contractNo="+contractNo,
				dataType : "json",
				success : function(data) {
					if(data.flag){
						console.log("return：" + data.flag);
					}
				}
		});
}

$(document).on('click','#SRG .first',function(){
		var $selects = $("select[disabled]");
		var $input = $("input[disabled]");
		$selects.removeAttr("disabled");
		$input.removeAttr('disabled');
		var busiType = $("#busiType").val();
		var contractNo=$("#contractNo").val();
    	var approvalOpinion = $('#approvalOpinion').val();
		var action = "/cpms/linkus/capital/bill/bussiness/t"+busiType+"Bill/businessUpperRegister";
		console.log("action" + action);
		var option = {
				type:"post",
				data:{
				"busiType":busiType,
				"contractNo":contractNo,
				"passFlag":"PASS",
				"approvalOpinion":approvalOpinion
			}, 
				dataType:"json",
				url:action,
				async:false,
				success:function(data){
					RGInvok(data);
				},
				error:function(){
					doTheAlert("提示","保存经办失败。");
					 setForbiddenClickFlag_false();
				}
			};
		if(checkForbiddenClickFlag()){return;}
		$("#bill_cntr"+busiType).ajaxSubmit(option);
		$selects.attr("disabled","");
		$input.attr('disabled',"");
	});
