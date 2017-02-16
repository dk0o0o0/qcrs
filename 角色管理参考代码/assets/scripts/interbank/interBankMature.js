//到期
$(function(){
    $(document).on('click','#doSave',function(){
    	console.log($("#transAmount_act").val());
    	var busiType = $("#busiType").val();
		var ifExist = ifContractExist();
		if(ifExist){
			doTheStep(busiType,"MD");
		}else{
			doTheStep(busiType,"RG");
		}
    	
    });
    function doTheStep(busiType,step){
    	var methodName,passFlag;
		if((step=="RG")){
			methodName = "businessRegister";
			passFlag = "PASS";
		}else{
			methodName = "businessAmend";
			passFlag = "FAIL";
		}
		
		var approvalOpinion = $('#approvalOpinion').val();
		if(!approvalOpinion){
			approvalOpinion = '';
		}
		action = "/cpms/linkus/capital/interbank/bussiness/t"+busiType+"InterBank/"+methodName+"?passFlag="+passFlag+"&approvalOpinion="+ approvalOpinion;
		var $contractNo = $("input[name='bondCntr.contractNo']");
		var option = {
			type:"post",
			dataType:"json",
			url:action,
			async:false,
			success:function(data){
				if(data.normal){
					if(data!=null&&data.contractNo){
						$contractNo.val(data.contractNo);
						$("a.doCutout").show();
						var href = "/cpms/linkus/capital/business/cpmsPublicStep/showAct?contractNo="+$("#contractNo").val()+"&busiType="+$("#busiType").val();
	                     window.open(href,{width:'40%'});
					}
				}else{
						doTheAlert("警告",data.tip);
				}
			},
			error:function(){
				
			}
		};
		removeDisabled();
		$("#saveInterbankfux_form").ajaxSubmit(option);
		addDisabled();
	}
	
	/**同业存放存入/存放同业存入到期收息特殊处理，直接记账通过**/
	$(document).on('click','#doSpecilSave',function(){
		
    	var busiType = $("#busiType").val();
		var ifExist = ifContractExist();
		if(ifExist){
			doTheSpecilStep(busiType,"MD");
		}else{
			doTheSpecilStep(busiType,"RG");
		}
		toWhatFlow(null,"businessAcctVoucherRegisterBook");
		
		
	});
	
});

function doTheSpecilStep(busiType,step){
    	var methodName,passFlag;
		if((step=="RG")){
			methodName = "businessRegister";
			passFlag = "PASS";
		}else{
			methodName = "businessAmend";
			passFlag = "FAIL";
		}
		
		var approvalOpinion = $('#approvalOpinion').val();
		if(!approvalOpinion){
			approvalOpinion = '';
		}
		action = "/cpms/linkus/capital/interbank/bussiness/t"+busiType+"InterBank/"+methodName+"?passFlag="+passFlag+"&approvalOpinion="+ encodeURI(approvalOpinion);
		var $contractNo = $("input[name='bondCntr.contractNo']");
		var option = {
			type:"post",
			dataType:"json",
			url:action,
			async:false,
			success:function(data){
				if(data.normal){
					
				}else{
					doTheAlert("警告",data.tip);
				}
			},
			error:function(){
				
			}
		};
		if(busiType=='50030'){
			removeRadioDisabled();
		}
		removeDisabled();
		$("#saveInterbankfux_form").ajaxSubmit(option);
		if(busiType=='50030'){
			addRadioDisabled();
		}
		addRadioDisabled();
		addDisabled();
	}

//如果到期金额被改变，则给清算金额重新赋值
$(document).on('blur','#maturityAmount',function() {
	$("#transAmount_act").val(getMoneyValue($("#maturityAmount").val()));
});

function removeDisabled() {
	$("select").removeAttr('disabled');
}

function removeRadioDisabled(){
	//去除radio的disabled
	var checkedRadio = $("input:radio[name='interbankCntr.isSameAcctCollectInterest']:checked");
	checkedRadio.removeAttr('disabled');
}

function addRadioDisabled(){
	var checkedRadio = $("input:radio[name='interbankCntr.isSameAcctCollectInterest']:checked");
	checkedRadio.attr('disabled','true');
}

function addDisabled() {
	$("select").attr('disabled','true');
}

$(document).ready(function(){

	var paymentInterCycle = $('#paymentInterCycle').val();
	var nbsp = "&nbsp;&nbsp;";
	if(paymentInterCycle == '1') { //按月
		$('#span2').show();
		$('#span2').html(nbsp+'每月 ');
		
		$('#expiryDate').show();
		$('#span1').show();
		$('#span1').text('日');
		$('#expiryDate').addClass("required");
	} else if(paymentInterCycle == '3') { //按季
		$('#span2').show();
		$('#span2').html(nbsp+'每季末月');
		
		$('#expiryDate').show();
		$('#span1').show();
		$('#span1').text('日');
		$('#expiryDate').addClass("required");
	} else if(paymentInterCycle == '0') { //利随本清
		$('#span2').show();
		$('#span2').html(nbsp+'其他 ');
		$('#span1').hide();

		$('#expiryDate').hide();
	
		$('#expiryDate').removeClass("required");
	} else if(paymentInterCycle == '4') { //其他
		$('#span2').show();
		$('#span2').html(nbsp+'其他 ');
		$('#span1').hide();
		$('#expiryDate').val('');
		$('#expiryDate').hide();
		$('#expiryDate').removeClass("required");
	}
});