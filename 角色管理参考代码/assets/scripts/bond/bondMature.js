	$(document).keydown(
		function(event){
			if(event.keyCode==13){
				$("#bm_searchItem").click();
			}
	});
	
	//开始查询
	$(document).on('click','#bm_searchItem',
		function(){
			searchBondByCode();
	});
	//根据债券代码查询BondBasic
	function   searchBondByCode(){
		var $bondCode = $("#bm_bondCode");
		if(!$bondCode.val()){
			getTheMessager().alert("提示","请输入债券代码",'',function(){
	 			$bondCode.focus();
	 		});
			return;
		}
		$.ajax({
			type:"post",
			global : false,
			async : false,
			url : '/cpms/linkus/capital/bond/bussiness/bondPublic/findTheBondByCode',
			data:{"bondCode":$bondCode.val(),"maturityDateFlag":"true"},
			dataType:"json",
			success:function(data){
				if(data!=null){
					if(data.ifNull){
						getTheMessager().alert("提示",data.tip,'',function(){
				 			$("#bm_bondName").val('');
							endSearch_flag = true;
							$bondCode.focus();
				 		});
					}else{
						$("#bm_bondName").val(data.bondName);
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
		var bm_totalGA = getMoneyValue($("#bm_totalGA").val());
		if(!bm_totalGA){
			getTheMessager().alert("提示","请录入到期总金额",'',function(){
	 			$("#bm_totalGA").focus();
	 		});
			return;
		}
		if(isNaN(bm_totalGA)){
			getTheMessager().alert("到期总金额合计录入有误！请重新录入...",'',function(){
	 			$("#bm_totalGA").focus();
	 		});
			return;
		}
		var bm_Itemtable_tbody = $("#matureItem_table tbody");
		bm_Itemtable_tbody.remove("tr");
		var len = 0;
		var bondCode = $("input[name='bondCntr.bondCode']").val();
		$.ajax({
			type:"post",
			global:false,
			url : '/cpms/linkus/capital/bond/bussiness/bondPublic/findTheBondBooks',
			data:{"busiType":$("#busiType").val(),
				  "bondCode":bondCode,
				  "transAmount":transAmount_},
			dataType:"json",
			success:function(data){
				$("#matureItem_table tbody tr:first input").val('');
				$("#matureItem_table tbody tr:first td:first center").text('');
				$("#matureItem_table tbody tr").remove(":gt(0)");
				if(data!=null){
					var totalLastDayAmountV = 0;
					//逐行
					if(data.bondBookList){
						len = data.bondBookList.length;
					}
					for(var i=0;i<len;i++){
						var bondBook = data.bondBookList[i];
						if(i>0)
							$("#matureItem_table tbody tr:last").children(".manipulate").children().eq(0).click();
						var $descInputs = $("#matureItem_table tbody tr:last td input");
						$descInputs.attr('readonly','');
						$("#matureItem_table tbody tr:last td center").text(i+1);
						//逐列传值
						$descInputs.eq(0).val(bondBook.bondCode);
						$descInputs.eq(1).val($("#assetsType option[value='"+bondBook.assetsType+"']").text());
						$descInputs.eq(2).val(bondBook.subjectMappingCode);
						//!!!!  下面一行用bondBook.BONDAM获取不到值→_→
						$descInputs.eq(3).val(addThousandCharacter(bondBook.bondam));
						$descInputs.eq(4).val(addThousandCharacter(bondBook.lastDayAmount));
						$descInputs.eq(5).val(addThousandCharacter(data.amountList[i]));
						$descInputs.eq(6).val(addThousandCharacter(bondBook.receAccruedInterest));
						$descInputs.eq(7).val(bondBook.assetsType);
						$descInputs.eq(8).val(bondBook.bookId);
						totalLastDayAmountV += parseFloat(bondBook.lastDayAmount);
					}
					var totalList = data.totalList;
					$("#totalBONDAM center").text(addThousandCharacter(totalList[0]));
					$("#totalLastDayAmount center").text(addThousandCharacter(totalList[1]));
					$("#totalTransAmount center").text(addThousandCharacter(totalList[2]));
					$("#totalReceAccruedInterest center").text(addThousandCharacter(totalList[3]));
					$("#bm_totalLastDayAmount").val(addThousandCharacter(totalLastDayAmountV));
				}
				if(!len){
					getTheMessager().alert("提示","无此债券："+bondCode+"的债券到期账户信息，请查证后再试。",'',function(){
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
	
//--------------------------------------//终止
	$(document).on('click','.doCutout',function(){
		$.ajax({
			type:"post",
			global : false,
			async : false,
			url : '/cpms/linkus/capital/business/cpmsPublicStep/businessOver',
			data:{"contractNo":$("#contractNo").val()},
			dataType:"json",
			success:function(data){
				console.log(data.ifOver);
				if(data!=null&&data.ifOver){
					doTheAlert("提示","业务已终止");
					//关闭tabs
//					closeTheTabs();
				}
			},
			error:function(){
				doTheAlert('提示', errorTip);
			}
		});
	});
//--------------------------------------//取消  
//	$(document).on('click','#cancelThis',closeTheTabs);

	function doGaOrMaSave(){
		
		var bm_totalGA = getMoneyValue($("#bm_totalGA").val());
		var totalBONDAM = getMoneyValue($("#totalBONDAM  center").text());
		var totalReceAccruedInterest = getMoneyValue($("#totalReceAccruedInterest  center").text());
		var d_value = bm_totalGA-totalBONDAM-totalReceAccruedInterest;
		if(d_value>1000000||d_value<-1000000){
			getTheMessager().confirm('确认', '到期总金额与本日总余额、应收应计总额的和相差超过100万，是否继续？', function(flag) {
				if (flag) {
					if(checkForbiddenClickFlag()){return;}
					actualBondMatureSave();
				}else{
					setForbiddenClickFlag_false();
				}
			});
		}else{
			actualBondMatureSave();
		}
	}
	
	
	function actualBondMatureSave(){
		var transAmount_ = getMoneyValue($("input[name='bondCntr.transAmount']").val());
		$("#transAmount_act").val(0);
		$("#MD .end").hide();
		var $inputs = $("#matureItem_table tbody tr input");
		var temp;
		$(".lastDayAmount").removeAttr("name");
		for(var i=0;i<$inputs.length;i++){
			temp = i%9;
			if(temp==3||temp==4||temp==5||temp==6)
			$inputs.eq(i).val(removeThousandCharacter($inputs.eq(i).val()));
		}
		//通过判断页面上有无合同号，确定走经办保存/交易更正
		var $contractNo = $("#contractNo");
		//流程图节点已经改为RD passFlag给PASS仅限于记账通过
		if(ifContractExist()){
			action = "/cpms/linkus/capital/bond/bussiness/t20011Bond/businessAmend?passFlag=FAIL";
		}else{
			action = "/cpms/linkus/capital/bond/bussiness/t20011Bond/businessRegister?passFlag=FAIL";
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
						$("#MD .end").show();
						var href = "/cpms/linkus/capital/business/cpmsPublicStep/showAct?contractNo="+$("#contractNo").val()+"&busiType="+$("#busiType").val();
						console.log('href = '+href);
						var $aLink = $("#bm_publicLink");
						$("#MD_end").show();
						$aLink.attr('href',href);
						$aLink.click();
						$aLink.removeAttr('href');
						$(".toolbarBottom .end").show();
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
		$("#t20011Bond_form").ajaxSubmit(option);
		for(var i=0;i<$inputs.length;i++){
			temp = i%9;
			if(temp==3||temp==4||temp==5||temp==6)
			$inputs.eq(i).val(addThousandCharacter($inputs.eq(i).val()));
		}
	}

Observation.mature = function(container) {
	$('input.hide_assetsType', container).each(function() {
		var t = $(this);
		var assetsText = $("#assetsType option[value='"+t.val()+"']").text();
		t.parents("tr").children().eq(2).children().val(assetsText);
	});
	
//	$('#bm_totalGA', container).each(function() {
//		var t = $(this);
//		var $matureItem_table = $("#matureItem_table tbody tr");
//		var totalBONDAM = 0;
//		for(var i=0;i<$matureItem_table.length;i++){
//			var thisBONDAM = $matureItem_table.eq(i).children().eq(4).children().val(); 
//			totalBONDAM += removeThousandCharacter(thisBONDAM);
//		}
//		totalBONDAM = totalBONDAM?totalBONDAM:'';
//		t.val(totalBONDAM);
//		t.change();
//		t.val(totalBONDAM);
//	});
	
}
