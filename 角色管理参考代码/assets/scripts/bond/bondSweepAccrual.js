//********************************债券划息  Begin***********************************//
	$(document).keydown(
		function(event){
			if(event.keyCode==13){
				$("#bsa_searchItem").click();
			}
	});
	
	//根据债券代码查询BondBasic
	function   searchBondByCode(){
		var $bondCode = $("#bsa_bondCode");
		if(!$bondCode.val()){
			$("#bsa_bondName").val('');
			doTheAlert("提示","请输入债券代码");
			$bondCode.focus();
			return;
		}
		$.ajax({
			type:"post",
			global : false,
			async : true,
			url : '/cpms/linkus/capital/bond/bussiness/bondPublic/findTheBondByCode',
			data:{"bondCode":$bondCode.val()},
			dataType:"json",
			success:function(data){
				if(data!=null){
					if(data.ifNull){
						getTheMessager().alert("提示",data.tip,'',function(){
				 			$("#bsa_bondName").val('');
							endSearch_flag = true;
							$bondCode.focus();
				 		});
					}else{
						$("#bsa_bondName").val(data.bondName);
						searchItem();
					}
				}
			},
			error:function(){
				doTheAlert('提示', errorTip);
			}
		});
	}
	//查询划息账户列表
	function searchItem(){
		var transAmount_ = getMoneyValue($("input[name='bondCntr.transAmount']").val());
		var bsa_totalGA = getMoneyValue($("#bsa_totalGA").val());
		if(!bsa_totalGA){
			doTheAlert("提示","请录入划息金额");
			$("#bsa_totalGA").focus();
			return;
		}
		if(isNaN(bsa_totalGA)){
			doTheAlert("提示","划息金额录入有误！请重新录入...");
			$("#bsa_totalGA").focus();
			return;
		}
		var bsa_Itemtable_tbody = $("#getAccrualItem_table tbody");
		bsa_Itemtable_tbody.remove("tr");
		var bondCode = $("input[name='bondCntr.bondCode']").val();
		$.ajax({
			type:"post",
			global:false,
			url : '/cpms/linkus/capital/bond/bussiness/bondPublic/findTheBondBooks',
			data:{"busiType":$("#busiType").val(),
				  "bondCode":bondCode,
				  "transAmount":transAmount_
			},
			dataType:"json",
			success:function(data){
				$("#getAccrualItem_table tbody tr:first input").val('');
				$("#getAccrualItem_table tbody tr:first td:first center").text('');
				$("#getAccrualItem_table tbody tr").remove(":gt(0)");
				var len = 0;
				if(data!=null){
					var totalLastDayAmountV = 0;
					if(data.bondBookList){
						len = data.bondBookList.length;
					}
					//逐行
					for(var i=0;i<len;i++){
						var bondBook = data.bondBookList[i];
						if(i>0)
							$("#getAccrualItem_table tbody tr:last").children(".manipulate").children().eq(0).click();
						var $descInputs = $("#getAccrualItem_table tbody tr:last td input");
						$descInputs.attr('readonly','');
						$("#getAccrualItem_table tbody tr:last td center").text(i+1);
						//逐列传值
						$descInputs.eq(0).val(bondBook.bondCode);
						$descInputs.eq(1).val($("#assetsType option[value='"+bondBook.assetsType+"']").text());
						$descInputs.eq(2).val(bondBook.subjectMappingCode);
						//!!!!  下面一行用bondBook.BONDAM获取不到值→_→
						$descInputs.eq(3).val((bondBook.bondam));
						$descInputs.eq(4).val((bondBook.lastDayAmount));
						$descInputs.eq(5).val((bondBook.debitCreditPayAmt));
						$descInputs.eq(6).val((data.amountList[i]));
						$descInputs.eq(7).val(bondBook.assetsType);
						$descInputs.eq(8).val(bondBook.bookId);
						totalLastDayAmountV += parseFloat(bondBook.lastDayAmount)*1;
					}
					$("#bsa_totalLastDayAmount").val(totalLastDayAmountV);
				}
				if(!len){
					getTheMessager().alert("提示","无此债券："+bondCode+"的债券划息账户信息，请查证后再试。",'',function(){
			 			return;
		 			});
				}
			},
			error:function(){
				doTheAlert('提示', errorTip);
			}
		});
	
	}
//********************************债券划息 End*********************************//


	function doGaOrMaSave(){
		if(checkForbiddenClickFlag()){return;}
		var transAmount_ = getMoneyValue($("input[name='bondCntr.transAmount']").val());
		$("#transAmount_act").val(0);
		$("toolbarBottom .end,toolbarBottomTips .end").hide();
		var $inputs = $("#getAccrualItem_table tbody tr input");
		var temp;
		//上日余额用的是本日余额的name来获得后台的值     往后台传值的时候除掉
//		$(".lastDayAmount").removeAttr("name");
		var taskStatus = $("input[name='taskStatus']").val();
		for(var i=0;i<$inputs.length;i++){
			temp = i%9;
			if(temp==3||temp==4||temp==5||temp==6)
			$inputs.eq(i).val(removeThousandCharacter($inputs.eq(i).val()));
		}
		//通过判断页面上有无合同号，确定走经办保存/交易更正
		var $contractNo = $("#contractNo");

		//流程图节点已经改为RD passFlag给PASS仅限于记账通过
		if(ifContractExist()){
			action = "/cpms/linkus/capital/bond/bussiness/t20057Bond/businessAmend?passFlag=FAIL";
		}else{
			action = "/cpms/linkus/capital/bond/bussiness/t20057Bond/businessRegister?passFlag=FAIL";
		}
		console.log(action);
		var option = {
			type:"post",
			dataType:"json",
			url:action,
			async:false,
			success:function(data){
				setForbiddenClickFlag_false();
				if(data!=null){
					if(data.normal){
						$("#transAmount_act").val(transAmount_);
						$contractNo.val(data.contractNo);
						$("toolbarBottom .end,toolbarBottomTips .end").show();
						var href = "/cpms/linkus/capital/business/cpmsPublicStep/showAct?contractNo="+$("#contractNo").val()+"&busiType="+$("#busiType").val();
						var $aLink = $("#bsa_publicLink");
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
				setForbiddenClickFlag_false();
				doTheAlert('提示', errorTip);
			}
		};
		$("#t20057Bond_form").ajaxSubmit(option);
		for(var i=0;i<$inputs.length;i++){
			temp = i%9;
			if(temp==3||temp==4||temp==5||temp==6)
			$inputs.eq(i).val(addThousandCharacter($inputs.eq(i).val()));
		}
}


Observation.sweppAccrual = function(container) {
	$('input.hide_assetsType', container).each(function() {
		var t = $(this);
		var assetsText = $("#assetsType option[value='"+t.val()+"']").text();
		t.parents("tr").children().eq(2).children().val(assetsText);
	});
	
	$('#bga_totalLastDayAmount', container).each(function() {
		var t = $(this);
		var $getAccrualItem_table = $("#getAccrualItem_table tbody tr");
		var totalLastDayAmount = 0;
		for(var i=0;i<$getAccrualItem_table.length;i++){
			var thisLastDayAmount =	getMoneyValue($getAccrualItem_table.eq(i).children().eq(5).children().val()); 
			totalLastDayAmount += (thisLastDayAmount)*1;
		}
		totalLastDayAmount = totalLastDayAmount?totalLastDayAmount:'';
		t.val(totalLastDayAmount);
		t.change();
		t.val(totalLastDayAmount);
	});
	
}


