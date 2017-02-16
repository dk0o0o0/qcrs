//********************************债券收息  Begin***********************************//
	$(document).keydown(
		function(event){
			if(event.keyCode==13){
				$("#bga_searchItem").click();
			}
	});
	
	//开始查询
	$(document).on('click','#bga_searchItem',
		function(){
			searchBondByCode();
	});
	//根据债券代码查询BondBasic
	function   searchBondByCode(){
		var $bondCode = $("#bga_bondCode");
		if(!$bondCode.val()){
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
				 			$("#bga_bondName").val('');
							endSearch_flag = true;
							$bondCode.focus();
				 		});
					}else{
						$("#bga_bondName").val(data.bondName);
						searchItem();
					}
				}
			},
			error:function(){
				doTheAlert('提示', errorTip);
			}
		});
	}
	//查询收息账户列表
	function searchItem(){
		var transAmount_ = getMoneyValue($("input[name='bondCntr.transAmount']").val());
		var bga_totalGA = getMoneyValue($("#bga_totalGA").val());
		if(!bga_totalGA){
			doTheAlert("提示","请录入收息总金额合计");
			$("#bga_totalGA").focus();
			return;
		}
		if(isNaN(bga_totalGA)){
			doTheAlert("提示","收息总金额合计录入有误！请重新录入...");
			$("#bga_totalGA").focus();
			return;
		}
		var bga_Itemtable_tbody = $("#getAccrualItem_table tbody");
		bga_Itemtable_tbody.remove("tr");
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
						$descInputs.eq(3).val((addThousandCharacter(bondBook.bondam)));
						$descInputs.eq(4).val((addThousandCharacter(bondBook.lastDayAmount)));
						$descInputs.eq(5).val((addThousandCharacter(data.amountList[i])));
						$descInputs.eq(6).val((addThousandCharacter(bondBook.receAccruedInterest)));
						$descInputs.eq(7).val(bondBook.assetsType);
						$descInputs.eq(8).val(bondBook.bookId);
						totalLastDayAmountV += parseFloat(bondBook.lastDayAmount)*1;
					}
					var totalList = data.totalList;
					$("#totalBONDAM center").text(addThousandCharacter(totalList[0]));
					$("#totalLastDayAmount center").text(addThousandCharacter(totalList[1]));
					$("#totalTransAmount center").text(addThousandCharacter(totalList[2]));
					$("#totalReceAccruedInterest center").text(addThousandCharacter(totalList[3]));
					//$("#bga_totalLastDayAmount center").val(addThousandCharacter(totalLastDayAmountV));
					$("#bga_totalLastDayAmount").val(addThousandCharacter(totalLastDayAmountV));
				}
				if(!len){
					getTheMessager().alert("提示","无此债券："+bondCode+"的债券收息账户信息，请查证后再试。",'',function(){
			 			return;
		 			});
				}
			},
			error:function(){
				doTheAlert('提示', errorTip);
			}
		});
	
	}
//--------------------------------------//进入记账页面
//	$(document).on('click','#doGetAccrualSave',doGetAccrualSave);
	
//********************************债券收息 End*********************************//


	function doGaOrMaSave(){
		if(checkForbiddenClickFlag()){return;}
		var bga_totalGA = getMoneyValue($("#bga_totalGA").val());
		var totalReceAccruedInterest = getMoneyValue($("#totalReceAccruedInterest center").text());
		var d_value = bga_totalGA-totalReceAccruedInterest;
		if(d_value>1000000||d_value<-1000000){
			getTheMessager().confirm('确认', '收息总金额与应收应计总金额相差超过100万，是否继续？', function(flag) {
				if (flag) {
					actualGetAccrualSave();
				}else{
					setForbiddenClickFlag_false();
				}
			});
		}else{
			actualGetAccrualSave();
		}
	}
	
	
	function actualGetAccrualSave(){
		var transAmount_ = getMoneyValue($("input[name='bondCntr.transAmount']").val());
		$("#transAmount_act").val(0);
		$("toolbarBottom .end,toolbarBottomTips .end").hide();
		var $inputs = $("#getAccrualItem_table tbody tr input");
		var temp;
		//上日余额用的是本日余额的name来获得后台的值     往后台传值的时候除掉
		$(".lastDayAmount").removeAttr("name");
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
			action = "/cpms/linkus/capital/bond/bussiness/t20003Bond/businessAmend?passFlag=FAIL";
		}else{
			action = "/cpms/linkus/capital/bond/bussiness/t20003Bond/businessRegister?passFlag=FAIL";
		}
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
						var $aLink = $("#bga_publicLink");
						$aLink.attr('href',href);
						$aLink.click();
						$aLink.removeAttr('href');
						$("#MD_end").show();
						$(".toolbarBottom .end").show();
					}else{
						doTheAlert("警告",data.tip);
					}
					
				}
			},
			error:function(){
				doTheAlert('提示', errorTip);
				setForbiddenClickFlag_false();
			}
		};
		$("#t20003Bond_form").ajaxSubmit(option);
		for(var i=0;i<$inputs.length;i++){
			temp = i%9;
			if(temp==3||temp==4||temp==5||temp==6)
			$inputs.eq(i).val(addThousandCharacter($inputs.eq(i).val()));
		}
	}




Observation.getAccrual = function(container) {
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


