//****************************债券承销  Begin***********************************//
//---------------------------------------//选定机构
	$(document).on('click','#result input[value="选择"]',
		function(){
			var agencyId = $(this).parents("tr").attr("id");
			if($("#uwai_infos_disribonAgencyName").length){
				var agencyName = $(this).parents("td").prev().text();
				$("#uwai_infos_disribonAgencyName").val(agencyName);
				$("#uwai_infos_disribonAgencyName").attr('class','');
				$("#uwai_infos_disribonAgencyName").addClass('agencyId_'+agencyId);
				closePage();
				return;
			}
			var str = "...".split('.');
			var $buw_cpi_selects = $("#buw_counterpartyInfo select");
			$buw_cpi_selects.remove("option");
			$("#buw_counterpartyInfo input").val('');
			$.ajax({
				type : "post",
				global : false,
				async : true,
				url : '/cpms/linkus/capital/bond/bussiness/bondPublic/choiceEmissionAgency',
				data : {
					"agencyId":agencyId
				},
				dataType : "json",
				success : function(data) {
				 if (data != null) {
					$("input[name='bondCntr.counterpartyName']").val(data.agencySimpName);
					$("input[name='bondCntr.counterpartyNo']").val(agencyId);
					$("input[name='bondCntr.payBankNo']").val(data.payBankNo);
					var z=0;
					if(typeof(data.details) !="undefined" )
				 		z = data.details.length;
					for(var i=0;i<z;i++){
						var json = data.details[i];
						if(json!=null){
							str[0] += "<option>"+json.custOpUnitName+"</option>";
							str[1] += "<option>"+json.opBankAcctNo+"</option>";
							str[2] += "<option>"+json.custOpBankName+"</option>";
							str[3] += "<option>"+json.opBankNo+"</option>";
						}
					}
					for(var i=0;i<$buw_cpi_selects.length;i++){
						$buw_cpi_selects.eq(i).html(str[i]);
					}
				 }
				 $("#buw_counterpartyNo").val(data.counterpartyNo);
				 closePage();
				},
				error:function(){
					doTheAlert('提示', errorTip);
				}
			});
	});

//---------------------------------------//发行行信息联动
	$(document).on('change','#buw_counterpartyInfo select',
		function(){
			var index = $(this).children(":selected").index();
			$("#buw_counterpartyInfo select option").removeAttr("selected");
			for(var i=0;i<$("#buw_counterpartyInfo select").length;i++){
				$("#buw_counterpartyInfo select").eq(i).children().eq(index).attr('selected','');
			}
	});
	
	
	
//---------------------------------------//给页面加上投组信息
	function showBondTeamListInfo(){
		$("#bondUnderwrite_team").find("option").remove();
		var assetsType = $("#uwai_infos_assetsType").val();
		if(!assetsType){
			$("#bondUnderwrite_team").append("<option>请更换资产类型</option>");
			return;
		}
		$.ajax({
				type : "post",
				global : false,
				async : true,
				url : '/cpms/linkus/capital/bond/bussiness/bondPublic/findTeamListByUserNameAndType',
				dataType : "json",
				data:{"assetsType":assetsType},
				success : function(data) {
				 if (data != null) {
				 	var html = "<option>-请选择-</option>";
					var z=0;
					if(typeof(data.bondTeamList) !="undefined" )
				 		z = data.bondTeamList.length;
					for(var i=0;i<z;i++){
						var bondTeam = data.bondTeamList[i];
						if(bondTeam!=null){
							html += "<option value='"+bondTeam.teamId+"' >"+bondTeam.teamName+"</option>";
						}
					}
					if(z>0){
				 		$("#bondUnderwrite_team").append(html);
				 		if($("#teamIdMark").val()){
				 			$("#bondUnderwrite_team").val($("#teamIdMark").val());
				 			$("#teamIdMark").val('');
				 		}
				 	}else{
				 		$("#bondUnderwrite_team").append("<option>请更换资产类型</option>");
				 	}
				 }
				},
				error:function(){
					doTheAlert('提示', errorTip);
				}
			});
	}
	
	//在债券代码录入框中按回车触发blur的查询
	$(document).on("keydown","input[name='bondCntr.bondCode']",function(event){
		if(event.keyCode==13){	
			$('input[name="bondCntr.bondCode"]').blur();
		}
	});
	
	
	//债券是否存在的flag----债券查询到时再进行应收应计计算
	var existThisBond;
	//上次输入的(存在的)债券代码----录入新的债券代码时，若明细表中存在信息   禁止此次录入
	var defaultBondCode;
	//上次输入的缴款日期----录入新的缴款日期时，若明细表中存在信息   禁止此次录入
	var defaultPaymentDate;
//---------------------------------------//债券查询
	function searchTheBondByCode(){
		var paymentDate = $("input[name='bondCntr.paymentDate']").val();
		var $bondCode = $('input[name="bondCntr.bondCode"]');
		existThisBond = false;
		var $showTheBondInfo = $("#showTheBondInfo");
			$showTheBondInfo.removeAttr('href');
			$showTheBondInfo.hide();
		$("#buw_bondBasicInfo input:gt(0)").eq(1).val('');
		$("#buw_bondBasicInfo select:first").val('');
		if(!$bondCode.val())
			return;
		$.ajax({
			type:"post",
			global:false,
			async:false,
			url:"/cpms/linkus/capital/bond/bussiness/bondPublic/findTheBondByCode",
			data:{"bondCode":$bondCode.val()},
			dataType:"json",
			success:function(data){
				if(data!=null){
					if(data.ifNull){
						getTheMessager().alert("提示",data.tip,'',function(){
				 			$bondCode.focus();
				 		});
					}else{
						var matureDate = data.bondBasicInfo.matureDate;
						if(paymentDate!=null){
							var tip = "缴款日期: ";
				    		compareToDeliveryDate(matureDate,paymentDate,tip);
				    	}
						$("input[name='bondCntr.bondName']").val(data.bondName);
						$("#t20008Bond_form").append("<input type='hidden' id='issueUnit'/>");
						$("#bondIssueUnit").val(data.issueUnit);
						$("#BondBasic_reportType").val(data.reportType);
						$("#actualReportType").val(data.reportType);
						existThisBond = true;
						$showTheBondInfo.attr('href',"/cpms/linkus/capital/bond/base/BondBasic/view?bondCode="+$bondCode.val());
						$showTheBondInfo.show();
						$("#bondCode_").val($bondCode.val());
					}
				}
			},
			error:function(){
				doTheAlert('提示', errorTip);
			}
		});
	}
	
	
	//父页面上触发计算
	$('input[name="bondCntr.bondCode"]').unbind('blur').blur(function(){
			var $bondCode = $('input[name="bondCntr.bondCode"]');
			defaultBondCode = $("#bondCode_").val();
			if($("#underwriteItem_table tbody tr:first input:first").val()&&$bondCode.val()!=defaultBondCode){
				getTheMessager().alert("提示","请删除所有债券承销明细信息后，再修改债券代码！",'',function(){
		 			$bondCode.val(defaultBondCode);
					$bondCode.focus();
		 		});
				return;
			}
			if(!$bondCode.val()){
				return;
			}
			searchTheBondByCode();
			if(existThisBond){
				calParentBothYSYJ_IA();
				calMatureEarningRate();
			}
			else{
				$("input[name='bondCntr.YSLXAM']").val('');
//				$("input[name='bondCntr.YSLXAM']").change();
				calParentIA();
			}
	});
	
	$('input[name="bondCntr.paymentDate"]').unbind('blur').blur(function(){
			var $paymentDate = $('input[name="bondCntr.paymentDate"]');
			defaultPaymentDate = $("#paymentDate_").val();
			if($("#underwriteItem_table tbody tr:first input:first").val()&&$paymentDate.val()!=defaultPaymentDate){
				getTheMessager().alert("提示",'请删除所有债券承销明细信息后，再修改缴款日期！','',function(){
		 			$paymentDate.val(defaultPaymentDate);
		 		});
				return;
			}
			calParentBothYSYJ_IA();
			calMatureEarningRate();
	});
	$(document).on('blur','input[name="bondCntr.BONDAM"]',calParentBothYSYJ_IA);
	$(document).on('blur','input[name="bondCntr.transAmount"]',calParentIA);
	//父页面应收应计  + 溢折价总额的计算
	function  calParentBothYSYJ_IA(){
		calParentYSYJ();
		calParentIA();
	}
	//父页面计算应收应计
	var bondCode;
	var paymentDate;
	function calParentYSYJ(){
		bondCode = $('input[name="bondCntr.bondCode"]').val();
		paymentDate = $('input[name="bondCntr.paymentDate"]').val();
		var BONDAM = parseFloat(getMoneyValue($('input[name="bondCntr.BONDAM"]').val()))*10000;
		var $YSYJ  = $("input[name='bondCntr.YSLXAM']");
		calYSYJ_main(bondCode,paymentDate,BONDAM,$YSYJ);
		if($YSYJ.val()){
			$YSYJ.change();
		}
	}
	//子页面计算应收应计
	function calChildrenYSYJ(){
		bondCode = $('input[name="bondCntr.bondCode"]').val();
		paymentDate = $('input[name="bondCntr.paymentDate"]').val();
		var BONDAM = parseFloat(getMoneyValue($("#uwai_infos_BONDAM").val()))*10000;
		var $YSYJ  = $("#uwai_infos_YSYJ");
		calYSYJ_main(bondCode,paymentDate,BONDAM,$YSYJ);
		if($YSYJ.val()){
			$YSYJ.change();
		}
		if(!getMoneyValue($YSYJ.val())&&BONDAM){
			if(!bondCode&&!paymentDate)
				$YSYJ.val("无债券代码 缴款日期");
			else if(!bondCode)
				$YSYJ.val("请录入债券代码");
			else
				$YSYJ.val("请录入缴款日期");
		}
	}
//---------------------------------------//抽取的应收应计的计算部分
	function calYSYJ_main(bondCode,paymentDate,BONDAM,$YSYJ){
		if(!bondCode||!paymentDate||!BONDAM){
				$YSYJ.val('');
				return;
			}
		$.ajax({
			type : "post",
			global : false,
			url : '/cpms/linkus/capital/bond/bussiness/bondPublic/calYSYJ',
			data : {
				"bondCode":bondCode,
				//ajax调用的方法抽了公用   此处统一为交割日期deliveryDate
				"deliveryDate":paymentDate,
				"BONDAM":BONDAM
			},
			dataType : "json",
			success : function(data) {
			 if (data.ysyj)
			 	$YSYJ.val(addThousandCharacter(parseFloat(data.ysyj).toFixed(2)));
			 else
			 	$YSYJ.val(addThousandCharacter(parseFloat(0).toFixed(2)));
			 	$YSYJ.change();
			},
			error:function(){
				doTheAlert('提示', errorTip);
			}
		});
	}
	
	//父页面计算溢折价总额/承销价位
	function calParentIA(){
		bondCode = $('input[name="bondCntr.bondCode"]').val();
		paymentDate = $('input[name="bondCntr.paymentDate"]').val();
		var BONDAM = parseFloat(getMoneyValue($('input[name="bondCntr.BONDAM"]').val()))*10000;
		var transAmount = parseFloat(getMoneyValue($('input[name="bondCntr.transAmount"]').val()));
		var $underwritPrice = $("input[name='bondCntr.underwritPrice']");
		var $interestAdjust = $("input[name='bondCntr.interestAdjust']");
		calIA_main(bondCode,paymentDate,BONDAM,transAmount,$underwritPrice,$interestAdjust);
		if($interestAdjust.val()){
			$interestAdjust.change();
		}
		calMatureEarningRate();
	}
	//子页面计算溢折价总额/承销价位
	function calChildrenIA(){
		bondCode = $('input[name="bondCntr.bondCode"]').val();
		paymentDate = $('input[name="bondCntr.paymentDate"]').val();
		var BONDAM = parseFloat(getMoneyValue($("#uwai_infos_BONDAM").val()))*10000;
		var transAmount = parseFloat(getMoneyValue($("#uwai_infos_transAmount").val()));
		var $underwritPrice = $("#uwai_infos_underwritPriceRadix");
		var $interestAdjust = $("#uwai_infos_interestAdjust");
		calIA_main(bondCode,paymentDate,BONDAM,transAmount,$underwritPrice,$interestAdjust);
		if($interestAdjust.val()){
			$interestAdjust.change();
		}
	}
	
	function calMatureEarningRate(){
		var deliveryDate = $("input[name='bondCntr.startInterDate']").val();
		var bondCode = $("input[name='bondCntr.bondCode']").val();
		var BONDAM = getMoneyValue($("input[name='bondCntr.BONDAM']").val());
		var netPriceAmount = getMoneyValue($("input[name='bondCntr.netPriceAmount']").val());
		var transNetPrice = netPriceAmount/BONDAM/100;
		var $matureEarningRate = $("input[name='bondCntr.matureEarningRate']");
		if(deliveryDate&&bondCode&&transNetPrice){
			$.ajax({
				type:"post",
				global:false,
				async:false,
				url:"/cpms/linkus/capital/bond/bussiness/bondPublic/matureYieldRateCal",
				data:{
					"bondCode":bondCode,
					"deliveryDate":deliveryDate,
					"transNetPrice":transNetPrice,
					"matureEarningRate":0
				},
				dataType : "json",
				success : function(data) {
					$matureEarningRate.val(data.result);
				},
				error:function(){
					doTheAlert('提示', errorTip);
				}
			});
		}
	}
	
	
//---------------------------------------//抽取的折价总额/承销价位的计算部分
	function calIA_main(bondCode,paymentDate,BONDAM,transAmount,$underwritPrice,$interestAdjust){
		if(!BONDAM||!transAmount){
				$underwritPrice.val('');
				$interestAdjust.val('');
				$("input[name='bondCntr.netPriceAmount']").val('');
				return;
			}
			//计算承销价位
				$underwritPrice.val(addThousandCharacter(cleanFloat0((100*parseFloat(transAmount)/parseFloat(BONDAM)).toFixed(4))));
			if(!bondCode||!paymentDate){
				$interestAdjust.val(addThousandCharacter(transAmount-BONDAM));
				return;
			}
		$.ajax({
			type : "post",
			global : false,
			url : '/cpms/linkus/capital/bond/bussiness/bondPublic/calInterestAdjust',
			data : {
				"bondCode":bondCode,
				"deliveryDate":paymentDate,
				"transAmount":transAmount,
				"BONDAM":BONDAM
			},
			dataType : "json",
			success : function(data) {
			 if (data.interestAdjust){
			 	$interestAdjust.val(addThousandCharacter(parseFloat(data.interestAdjust).toFixed(2)));
			 }else{
			 	$interestAdjust.val(addThousandCharacter(parseFloat(0).toFixed(2)));
			 }
			 	$interestAdjust.change();
			 	var $netPriceAmount = $("input[name='bondCntr.netPriceAmount']");
			 	var BONDAM = parseFloat(getMoneyValue($("input[name='bondCntr.BONDAM']").val())*10000).toFixed(2);
			 	if(BONDAM){
			 		var netPriceAmount = BONDAM*1 + parseFloat(getMoneyValue($interestAdjust.val()))*1;
			 		netPriceAmount = eval(netPriceAmount).toFixed(2);
					$netPriceAmount.val(netPriceAmount);
					if($netPriceAmount.val()){
						$netPriceAmount.change();
					}
			 	}
			},
			error:function(){
				doTheAlert('提示', errorTip);
			}
		});
	}
//---------------------------------------//债券承销---input页面保存
/*	$(document).on('click','#doBondUnderwriteSave',function(){
		var option = {
			type:"post",
			dataType:"json",
			async:false,
			success:function(data){
				RG_MDInvok(data);
			},
			error:function(){
				doTheAlert("提示","经办操作失败");
			}
		};
		$("#t20008Bond_form").ajaxSubmit(option);
	});*/
	

//---------------------------------------//点击行  
	var originalBgc = $(".buwi_t tbody tr").css("background-color");
	$(document).on('click','.buwi_t tbody tr',
		function(){
			//如果在添加债券明细页面上  且在修改状态下   禁止点击行的事件
			if($("#underwriteAddItem_table").hasClass('BuwiInEdit')&&$("#addItemLoadSuccess").length)
				return;
			//如果点击行数据为空  不做标记
			if(!$(this).children().eq(1).children().val())
				return;
			//禁用所有的修改 删除按钮
			$(".buw_btns .buw_btn_ed").attr('disabled','');
			//清除所有行的标记
			if(!$("#underwriteAddItem_table").hasClass('BuwiInEdit')){
				$(".buwi_t tbody tr").removeClass("buw_justMark");
				$(".buwi_t tbody tr").css("background-color",originalBgc);
			}
			//alert();
			//标记点击行
			$(this).addClass("buw_justMark");
			$(this).css("background-color","#ffe48d");
			//设置点击行所在页面的 修改 删除按钮为可用
			var btnsId = $(this).parents("table").attr('id')+"_btns";
			var $buw_btns = $("#"+btnsId).children("button");
			$buw_btns.eq(1).removeAttr("disabled");
			$buw_btns.eq(2).removeAttr("disabled");
	});
//---------------------------------------//债券承销明细信息
	//添加
	$(document).on('click','#underwrite_add',
		function(){
			if(!$("input[name='bondCntr.bondCode']").val()){
				getTheMessager().alert("提示","请录入债券代码",'',function(){
		 			$("input[name='bondCntr.bondCode']").focus();
		 		});
		 		return;
			}
			if(!$("input[name='bondCntr.paymentDate']").val()){
				getTheMessager().alert("提示","请录入缴款日期",'',function(){
		 			$("input[name='bondCntr.paymentDate']").focus();
		 		});
		 		return;
			}
			var $uwLink = $("#underwriteItem_table_btns a");
			$uwLink.attr("href","/cpms/linkus/capital/bond/bussiness/bondPublic/addUwItemPage?addFlag=add");
			$uwLink.click();
//			href=""
	});
	
	//修改
	$('#underwrite_edit').unbind('click').click(function() {
		if(!$("#underwriteItem_table .buw_justMark").length)
				return;
			$("#teamIdMark").val($("#underwriteItem_table .buw_justMark .item_teamId").val());
			var $uwLink = $("#underwriteItem_table_btns a");
			$uwLink.attr("href","/cpms/linkus/capital/bond/bussiness/bondPublic/addUwItemPage");
			$uwLink.click();
			showTheEditVal_flag = false;
			showTheEditVal();
	});
	//打开修改页面时实时检查    页面加载完成时结束检查    传值
	var showTheEditVal_flag;
	function showTheEditVal(){
		if(showTheEditVal_flag) return;
		//方法部分
		if($('#addItemLoadSuccess').length){
			//结束递归
			showTheEditVal_flag = true;
			//写入投组信息
			var $srcInfos  = $("#underwriteItem_table .buw_justMark input");
			var $descInfo_selects = $("#underwriteAddItem_infos  select");
			var $descInfo_inputs = $("#underwriteAddItem_infos input");
			//$descInfo_selects.removeAttr("disabled");
			$descInfo_inputs.eq(0).removeAttr("disabled");
			$descInfo_inputs.eq(1).removeAttr("disabled");
			for(var i=0;i<$descInfo_selects.length;i++){
				$descInfo_selects.eq(i).val($srcInfos.eq(10+i).val());
				console.log($srcInfos.eq(10+i).val());
			}
			$descInfo_selects.change();
			for(var i=0;i<$descInfo_inputs.length;i++){
				$descInfo_inputs.eq(i).val(removeThousandCharacter($srcInfos.eq(($descInfo_selects.length)+i).val()));
			}
			//分销机构Id
			var disribonAgencyIdV =$srcInfos.eq(9).val();
			//将分销机构id从input页面传递到修改页面
			if(disribonAgencyIdV){
				disribonAgencyIdV =  "agencyId_" + disribonAgencyIdV;
				$descInfo_inputs.eq(2).attr('class',disribonAgencyIdV);
			}
			$("#teamIdMark").val($("#underwriteItem_table .buw_justMark input:last").val());
//			showBondTeamListInfo();
			$descInfo_inputs.change();
			$("#underwriteItem_save").removeAttr('disabled');
//			$("#underwriteAddItem_tables").remove();
			$("#uwai_infos_searchAgc").hide();
		}
			//递归
		setTimeout(showTheEditVal,100);
	}
	//删除
	$(document).on('click','#underwrite_remove',
		function(){
			var $buwi_markTr = $("#underwriteItem_table .buw_justMark");
			if(!$buwi_markTr.length)
				return;
			var $trs = $("#underwriteItem_table tbody tr");
			if($trs.length==1){
				$("#underwriteItem_table tbody tr td:first").text('');
				$("#underwriteItem_table tbody tr input").val('');
				$("#underwriteItem_table tbody tr").removeClass("buw_justMark");
				$("#underwriteItem_table tbody tr").css("background-color",originalBgc);
				return;
			}
			var index = i = $buwi_markTr.index();
			$buwi_markTr.children("[class='manipulate']").children().eq(1).click();
			for(;i<$("#underwriteItem_table tbody tr").length;i++){
				$("#underwriteItem_table tbody tr").eq(i).children(":first").text(i+1);
			}
			if(index>$("#underwriteItem_table tbody tr").length-1)
				index = $("#underwriteItem_table tbody tr").length-1;
			$("#underwriteItem_table tbody tr").eq(index).click();
	});
//---------------------------------------//添加承销明细信息
	//新增
	$(document).on('click','#underwriteItem_btn_add',
		function(){
			$('#underwriteItem_btn_submit').removeAttr("disabled");
			//除溢折价、承销价格与分销机构名称外      remove其他信息录入栏disabled的属性
			$("#underwriteAddItem_infos  select,#underwriteAddItem_infos input:lt(2)").removeAttr("disabled");
			$("#underwriteAddItem_infos  select").eq(0).val(1);
			$("#underwriteAddItem_infos  select").change();
			$("#underwriteAddItem_infos  input").val('');
			$("#underwriteAddItem_infos  input").change();
			$("#underwriteAddItem_infos  input:first").focus();
	});
	//修改
	$(document).on('click','#underwriteItem_btn_edit',
		function(){
//			alert("修改");
			//如果在添加债券承销明细的表中没有标记行  return
			if(!$("#underwriteAddItem_table .buw_justMark").length)
				return;
			var martTr =  $("#underwriteAddItem_table .buw_justMark");
			martTr.addClass("editTr");
			$("#teamIdMark").val($("#underwriteAddItem_table .buw_justMark td:eq(3)").attr('id'));
			$(this).addClass('BuwiInEdit');
			$(this).attr("name",martTr.index());
			var $srcInfos  = $("#underwriteAddItem_table .buw_justMark  input");
			var $descInfo_selects = $("#underwriteAddItem_infos  select");
			var $descInfo_inputs = $("#underwriteAddItem_infos input");
			$descInfo_selects.removeAttr("disabled");
			$descInfo_inputs.eq(0).removeAttr("disabled");
			$descInfo_inputs.eq(1).removeAttr("disabled");
			for(var i=0;i<$descInfo_selects.length;i++){
				$descInfo_selects.eq(i).val($srcInfos.eq(i).parents('td').attr('id'));
			}
			$descInfo_selects.change();
			for(var i=0;i<$descInfo_inputs.length;i++){
				$descInfo_inputs.eq(i).val(removeThousandCharacter($srcInfos.eq(($descInfo_selects.length)+i).val()));
			}
			$descInfo_inputs.eq(0).change();$descInfo_inputs.eq(1).change();$descInfo_inputs.eq(4).change();$descInfo_inputs.eq(5).change();
			$descInfo_inputs.eq(2).attr('class','agencyId_'+martTr.children().eq(10).children("input").val());
			$(this).prev().attr('disabled','');
			$(this).attr('disabled','');
			$(this).next().attr('disabled','');
			$(this).next().next().removeAttr('disabled');
	});
	//删除
	$(document).on('click','#underwriteItem_btn_remove',
		function(){
			$("#underwriteItem_btn_edit,#underwriteItem_btn_remove").attr('disabled','');
			var $buwai_markTr = $("#underwriteAddItem_table .buw_justMark");
			if(!$buwai_markTr.length)
				return;
			$("#underwriteItem_btn_add").removeAttr('disabled');
			if($("#underwriteAddItem_table tbody tr").length==1){
				$("#underwriteAddItem_table tbody tr td:first").text('');
				$("#underwriteAddItem_table tbody tr input").val('');
				$("#underwriteAddItem_table tbody tr td").removeAttr('id');
				$("#underwriteAddItem_table tbody tr").removeClass("buw_justMark");
				$("#underwriteAddItem_table tbody tr").css("background-color",originalBgc);
				return;
			}
			var i = $buwai_markTr.index();
			$buwai_markTr.children("[class='manipulate']").children().eq(1).click();
			for(;i<$("#underwriteAddItem_table tbody tr").length;i++){
				$("#underwriteAddItem_table tbody tr").eq(i).children(":first").text(i+1);
			}
			if(!$("#underwriteAddItem_table tbody tr:first td:first").text())
				$("#underwriteItem_save").attr('disabled','');
		
	});
	//提交
	$(document).on('click','#underwriteItem_btn_submit',
		function(){
			//点击提交时,判断经营方式然后再判断是否需要录入机构
			var dealinType = $("#uwai_infos_dealinType").val();
			var disribonAgencyName = $("#uwai_infos_disribonAgencyName").val();
			if(dealinType==2&&disribonAgencyName==""){
				doTheAlert("提示","当前为非自营,请选择分销机构!");
    			return;
			}
			
			var $uwai_infos = $("#underwriteAddItem_infos  select,#underwriteAddItem_infos input");
			//若有未填写的   弹窗提示  并将焦点移至未填写处
			for(var i=0;i<$uwai_infos.length;i++){
				if(!$uwai_infos.eq(i).val()&&!$uwai_infos.eq(i).attr("disabled")){
					getTheMessager().alert("提示",'"'+$uwai_infos.eq(i).parents('.controls').prev().text()+'"填写有误','',function(){
			 			$uwai_infos.eq(i).focus();
			 		});
			 		return;
				}
			}
			if(!$("#bondUnderwrite_team").val()||($("#bondUnderwrite_team").val()=="-请选择-")||($("#bondUnderwrite_team").val()=="请更换资产类型")){
				getTheMessager().alert("提示","请选择投组",'',function(){
		 			$("#bondUnderwrite_team").focus();
		 		});
		 		return;
			}
			var $BuwiInEdit_status = $("#underwriteItem_btn_edit");
			var $descInfos;

			var $srcInfo_inputs = $("#underwriteAddItem_infos input");
			var saveAgencyId = $srcInfo_inputs.eq(2).attr('class');
		
			
			/*  20161108修改 相同投组可以累加，经营方式，投组ID，分销机构全相同
			//检查有无添加相同投组，有则不通过
			var $uwai_table = $('#underwriteAddItem_table tbody tr');
			for (var i=0; i<$uwai_table.length; i++){
				var teamId = $uwai_table.eq(i).children().eq(3).attr('id');
				if (teamId == null)
					continue;
				var $uwai_markTr = $("#underwriteAddItem_table .buw_justMark");
				if ($uwai_markTr.length){
					//修改状态
					if(($BuwiInEdit_status.hasClass('BuwiInEdit'))&&($BuwiInEdit_status.attr("name")==$("#underwriteAddItem_table .editTr").index())){
						//修改的行跳过（自己）
						if($uwai_markTr.eq(0).children().eq(3).attr('id') == teamId){
							continue;
						}
					}
				}
				// 先比较经营方式
				var srcDealinType = $uwai_table.eq(i).children().eq(1).attr('id');
				if (srcDealinType != dealinType)
					continue;
				
				// 非自营再比较分销机构
				if (dealinType == "2"){ //非自营
					var srcAgencyId = $uwai_table.eq(i).children().eq(10).find("input").val();
					if (srcAgencyId != saveAgencyId.substring(9)){
						continue;
					}
				}
				
				// 取投组选择框的值做比较
				var $descInfo_selects = $("#underwriteAddItem_infos  select");
				if ($descInfo_selects.length == 3){
					if ($descInfo_selects.eq(2).val() == teamId){
						doTheAlert("提示", "已添加相同投组");
						return;
					}
				}
			}
			
			
			//修改状态
			if(($BuwiInEdit_status.hasClass('BuwiInEdit'))&&($BuwiInEdit_status.attr("name")==$("#underwriteAddItem_table .editTr").index())){
				$BuwiInEdit_status.removeClass('BuwiInEdit');
				$descInfos  = $("#underwriteAddItem_table .editTr input");
				$("#underwriteAddItem_table .editTr").removeClass('editTr');
			}else{
				if($("#underwriteAddItem_table tbody tr:first").children().eq(1).children("input").val())
				   $("#underwriteAddItem_table tbody tr:last").children("[class='manipulate']").children().eq(0).click();
				   $("#underwriteAddItem_table tbody tr:last input").attr('readonly','');
				$descInfos  = $("#underwriteAddItem_table tbody tr:last input");
			}
			//传值  
			var $srcInfo_selects = $("#underwriteAddItem_infos  select");
			$descInfos.parents("tr").children(":first").text(parseInt($descInfos.parents('tr').index())+1);
			for(var i=0;i<$srcInfo_selects.length;i++){
				$descInfos.eq(i).val($srcInfo_selects.eq(i).children(":selected").text());
				$descInfos.eq(i).parents("td").attr('id',$srcInfo_selects.eq(i).val());
			}
			for(var i=$srcInfo_selects.length;i<$descInfos.length;i++){
				$descInfos.eq(i).val(addThousandCharacter($srcInfo_inputs.eq(i-($srcInfo_selects.length)).val()));
			}

			if(saveAgencyId)
				$descInfos.eq(9).val(saveAgencyId.substring(9));
			else{
				$descInfos.eq(9).val(null);
				$descInfos.eq(5).val(null);
			}
			$("#underwriteAddItem_infos  select,#underwriteAddItem_infos input").val('');
			$("#underwriteAddItem_infos  select,#underwriteAddItem_infos input").change();
			$("#underwriteAddItem_infos  select,#underwriteAddItem_infos input").attr('disabled','disabled');
			$("#underwriteItem_save").removeAttr('disabled');
			$("#underwriteAddItem_table_btns button").removeAttr('disabled');
			$("#underwriteItem_btn_submit").attr('disabled','');
			$descInfos.parents("tr").click();
			*/
			
			//20161108修改 相同投组可以累加，经营方式，投组ID，分销机构全相同
			var addFlag = false; // 是否已添加/累加
			var $uwai_table = $('#underwriteAddItem_table tbody tr');
			for (var i=0; i<$uwai_table.length; i++){
				var teamId = $uwai_table.eq(i).children().eq(3).attr('id');
				if (teamId == null)
					continue;
				var $uwai_markTr = $("#underwriteAddItem_table .buw_justMark");
				if ($uwai_markTr.length){
					//修改状态
					if(($BuwiInEdit_status.hasClass('BuwiInEdit'))&&($BuwiInEdit_status.attr("name")==$("#underwriteAddItem_table .editTr").index())){
						//修改的行跳过（自己）
						if($uwai_markTr.is($uwai_table.eq(i))){
							continue;
						}
					}
				}
				// 先比较经营方式
				var srcDealinType = $uwai_table.eq(i).children().eq(1).attr('id');
				if (srcDealinType != dealinType)
					continue;
				
				// 非自营再比较分销机构
				if (dealinType == "2"){ //非自营
					var srcAgencyId = $uwai_table.eq(i).children().eq(10).find("input").val();
					if (srcAgencyId != saveAgencyId.substring(9)){
						continue;
					}
				}
				
				// 取投组选择框的值做比较
				var $descInfo_selects = $("#underwriteAddItem_infos  select");
				if ($descInfo_selects.length == 3){
					if ($descInfo_selects.eq(2).val() == teamId){
						//如果是修改状态，不允许改成相同的
						if(($BuwiInEdit_status.hasClass('BuwiInEdit'))&&($BuwiInEdit_status.attr("name")==$("#underwriteAddItem_table .editTr").index())){
							doTheAlert("提示", "已存在相同投组");
							return;
						}else{ //添加状态 可以累加
							
							$descInfos = $uwai_table.eq(i).children();
							var bondam2 = parseFloat(getMoneyValue($("#uwai_infos_BONDAM").val()))*10000;
							var transAmount2 = parseFloat(getMoneyValue($("#uwai_infos_transAmount").val()));
							var bondam1 = parseFloat(getMoneyValue($descInfos.eq(4).children("input").val()))*10000;
							var transAmount1 = parseFloat(getMoneyValue($descInfos.eq(5).children("input").val()));
							bondam1 += bondam2;
							transAmount1 += transAmount2;							
							$descInfos.eq(4).children("input").val(addThousandCharacter(bondam1/10000));
							$descInfos.eq(5).children("input").val(addThousandCharacter(transAmount1));
							//重算应收应计
							reCalYSYJ(bondam1, $descInfos.eq(9).children("input"));
							reCalIA(bondam1, transAmount1, $descInfos.eq(7).children("input"), $descInfos.eq(8).children("input"));
							addFlag = true;
						}
					}
				}
			}
			
			if (!addFlag){
				//修改状态   清除修改状态标记
				if(($BuwiInEdit_status.hasClass('BuwiInEdit'))&&($BuwiInEdit_status.attr("name")==$("#underwriteAddItem_table .editTr").index())){
					$BuwiInEdit_status.removeClass('BuwiInEdit');
					$descInfos  = $("#underwriteAddItem_table .editTr input");
					$("#underwriteAddItem_table .editTr").removeClass('editTr');
				}else{
					if($("#underwriteAddItem_table tbody tr:first").children().eq(1).children("input").val())
					   $("#underwriteAddItem_table tbody tr:last").children("[class='manipulate']").children().eq(0).click();
					   $("#underwriteAddItem_table tbody tr:last input").attr('readonly','');
					$descInfos  = $("#underwriteAddItem_table tbody tr:last input");
				}
				//传值  
				var $srcInfo_selects = $("#underwriteAddItem_infos  select");
				$descInfos.parents("tr").children(":first").text(parseInt($descInfos.parents('tr').index())+1);
				for(var i=0;i<$srcInfo_selects.length;i++){
					$descInfos.eq(i).val($srcInfo_selects.eq(i).children(":selected").text());
					$descInfos.eq(i).parents("td").attr('id',$srcInfo_selects.eq(i).val());
				}
				for(var i=$srcInfo_selects.length;i<$descInfos.length;i++){
					$descInfos.eq(i).val(addThousandCharacter($srcInfo_inputs.eq(i-($srcInfo_selects.length)).val()));
				}

				if(saveAgencyId)
					$descInfos.eq(9).val(saveAgencyId.substring(9));
				else{
					$descInfos.eq(9).val(null);
					$descInfos.eq(5).val(null);
				}
			}

			$("#underwriteAddItem_infos  select,#underwriteAddItem_infos input").val('');
			$("#underwriteAddItem_infos  select,#underwriteAddItem_infos input").change();
			$("#underwriteAddItem_infos  select,#underwriteAddItem_infos input").attr('disabled','disabled');
			$("#underwriteItem_save").removeAttr('disabled');
			$("#underwriteAddItem_table_btns button").removeAttr('disabled');
			$("#underwriteItem_btn_submit").attr('disabled','');
			$descInfos.parents("tr").click();
	});
	//更改资产类型  
	$(document).on('change','#uwai_infos_assetsType',function(){
		//写入投组信息
		showBondTeamListInfo();
	});
//----------------------------------------//自营/非自营切换
	$(document).on('change','#uwai_infos_dealinType',
		function(){
			//切换机构查询按钮
			console.log($(this).val());
			if($(this).val()==2)
				$("#uwai_infos_searchAgc").show();
			else{//自营则清除机构信息（name+id）   id藏在↓的class里面
				var $AgencyName = $("#uwai_infos_disribonAgencyName");
				$AgencyName.val('');
				$AgencyName.attr('class','');
				$("#uwai_infos_searchAgc").hide();
			}
			
	});
//----------------------------------------//债券承销明细  保存
	$(document).on('click','#underwriteItem_save',
		function(){	
			var dealinType = $("#uwai_infos_dealinType").val();
			var disribonAgencyName = $("#uwai_infos_disribonAgencyName").val();
			if(dealinType==2&&disribonAgencyName==""){
				doTheAlert("提示","当前为非自营,请选择分销机构!");
    			return;
			}
		//修改状态下
			if(!($("#underwriteAddItem_table:visible").length)){
				if(!$("#bondUnderwrite_team").val()||($("#bondUnderwrite_team").val()=="-请选择-")||($("#bondUnderwrite_team").val()=="请更换资产类型")){
					getTheMessager().alert("提示","请选择投组",'',function(){
			 			$("#bondUnderwrite_team").focus();
			 		});
					return;
				}
				
				//检查有无存在相同投组，有则不通过
				var $uwi_table = $('#underwriteItem_table tbody tr');
				for (var i=0; i<$uwi_table.length; i++){
					var teamId = $uwi_table.eq(i).children().eq(13).children("input").val();
					if (teamId == null)
						continue;
					var $uwai_markTr = $("#underwriteItem_table .buw_justMark");
					if ($uwai_markTr.length){
						//修改的行跳过（自己）
						if($uwai_markTr.is($uwi_table.eq(i)))
							continue;
					}
					var dealinType = $("#uwai_infos_dealinType").val();
					if ($uwi_table.eq(i).children().eq(11).children("input").val() != dealinType)//判断经营方式
            			continue;
					if (dealinType == "2"){
						var agencyId = $("#uwai_infos_disribonAgencyName").attr('class');
						if (agencyId != null)
							agencyId = agencyId.substring(9);
						if (agencyId != null && $uwi_table.eq(i).children().eq(10).children("input").val() != agencyId)//判断机构
	        				continue;
					}
					
					// 取投组选择框的值做比较
					var $descInfo_selects = $("#underwriteAddItem_infos  select");
					if ($descInfo_selects.length == 3){
						if ($descInfo_selects.eq(2).val() == teamId){
							doTheAlert("提示", "已存在相同投组");
							return;
						}
					}
				}
				
				var $srcInfo_selects = $("#underwriteAddItem_infos  select");
				var $srcInfo_inputs = $("#underwriteAddItem_infos input");
				var $descInfos  = $("#underwriteItem_table .buw_justMark input");
				for(var i=0;i<$srcInfo_selects.length;i++){
					$descInfos.eq(i).val($srcInfo_selects.eq(i).children(":selected").text());
					//$descInfos.eq(i).parents("td").attr('id',$srcInfo_selects.eq(i).val());
					if(i<3)
						$descInfos.eq(10+i).val($srcInfo_selects.eq(i).val());
				}
				for(var i=$srcInfo_selects.length;i<9;i++){
					$descInfos.eq(i).val(addThousandCharacter($srcInfo_inputs.eq(i-($srcInfo_selects.length)).val()));
				}
				//分销机构Id
				var disribonAgencyIdV = $srcInfo_inputs.eq(2).attr('class');
				if(disribonAgencyIdV)
					$descInfos.eq(9).val(disribonAgencyIdV.substring(9));
				closePage();
				return;
			}

		//新增状态下
			//获取源表中的所有行
			//判断有没有需要保存的
			var teamId = $('#underwriteAddItem_table tbody tr').eq(0).children().eq(3).attr('id');
			if (teamId == null)
				return;
			
			var $trs = $("#underwriteAddItem_table tbody tr");
			//获取目标表中的所有行     
				//注意事项:目标行数在循环中会增加  所以循环中不能使用$info！！！！！
	
			for (var k=0;k < $trs.length;k++){
        		var $src  = $trs.eq(k); //源行
            	var len = $("#underwriteItem_table tbody tr").length;
            	
            	var addFlag = false;
            	var $des;
            	if($("#underwriteItem_table tbody tr").eq(0).children().eq(1).children("input").val()){//非空表   无值则为空表
            		for(var j=0; j < len; j++){
                		var $dest = $("#underwriteItem_table tbody tr").eq(j).children(); //目标行
                		//先比较经营方式
                		if ($dest.eq(11).children("input").val() != $src.children().eq(1).attr("id"))//判断是否相同
                			continue;
                		//比较分销机构
                		if($src.children().eq(1).attr("id") == "2"){
                			if ($dest.eq(10).children("input").val() != $src.children().eq(10).children("input").val())
                				continue;
                		}
                		
                    	if ($dest.eq(13).children("input").val() == $src.children().eq(3).attr("id")){//判断投组是否相同 ，相同累加
                    		//doTheAlert("提示","已添加重复的投组！"); 
                    		var bondam2 = parseFloat(getMoneyValue($src.children().eq(4).children("input").val()))*10000;
							var transAmount2 = parseFloat(getMoneyValue($src.children().eq(5).children("input").val()));
							var bondam1 = parseFloat(getMoneyValue($dest.eq(4).children("input").val()))*10000;
							var transAmount1 = parseFloat(getMoneyValue($dest.eq(5).children("input").val()));
							bondam1 += bondam2;
							transAmount1 += transAmount2;							
							$dest.eq(4).children("input").val(addThousandCharacter(bondam1/10000));
							$dest.eq(5).children("input").val(addThousandCharacter(transAmount1));
							reCalYSYJ(bondam1, $dest.eq(9).children("input"));
							reCalIA(bondam1, transAmount1, $dest.eq(7).children("input"), $dest.eq(8).children("input"));
                    		addFlag = true;
                    		break;
                    	}
                	}
            		if (!addFlag){
            			$("#underwriteItem_table tbody tr:last").children("[class='manipulate']").children().eq(0).click();
            			$des = $("#underwriteItem_table tbody tr:last").children();
            			$des.eq(0).text($("#underwriteItem_table tbody tr").length);
            		}
            	}else{
            		$des = $("#underwriteItem_table tbody tr").eq(0).children();
            		$des.eq(0).text("1");
            	}
            	
            	if (!addFlag){ //没有做累加  写入信息
            		$des.eq(1).children("input").val($src.children().eq(1).children().val());
            		$des.eq(11).attr('id',$src.children().eq(1).attr('id'));
            		$des.eq(2).children("input").val($src.children().eq(2).children().val());
            		$des.eq(2).attr('id',$src.children().eq(2).attr('id'));
            		$des.eq(3).children("input").val($src.children().eq(3).children().val());
            		$des.eq(4).children("input").val($src.children().eq(4).children().val());
            		$des.eq(5).children("input").val($src.children().eq(5).children().val());
            		$des.eq(6).children("input").val($src.children().eq(6).children().val());
            		$des.eq(7).children("input").val($src.children().eq(7).children().val());
            		$des.eq(8).children("input").val($src.children().eq(8).children().val());
            		$des.eq(9).children("input").val($src.children().eq(9).children().val());
            		$des.eq(10).children('input').val($src.children().eq(10).children().val());
    				//隐藏的经营方式、资产类型、投组ID
            		$des.eq(11).children('input').val($src.children().eq(1).attr('id'));
            		$des.eq(12).children('input').val($src.children().eq(2).attr('id'));
            		$des.eq(13).children('input').val($src.children().eq(3).attr('id'));
            	}
            }
			
			/*
			if (!addFlag){
				var $info = $("#underwriteItem_table tbody tr");
				//len和i为目标已有数据的行数  
				var i = len = $info.length;
				//若第一行中数据为空   则认为已有数据的行数为0
				if(!$info.eq(0).children().eq(1).children("input").val())
					i = len = 0;
				//信息传递从已有数据行之后开始 
				for(;i<$trs.length+len;i++){
					//新增一行(点击上一行的"+"号来实现)  如果第一行数据为空  直接覆写
					if(i>0)
						$("#underwriteItem_table tbody tr").eq(i-1).children("[class='manipulate']").children().eq(0).click();
					//循环获取信息源  x行中
					var $src  = $trs.eq(i-len);
					//循环获取目标源  x行中的所有列
					var $dest = $("#underwriteItem_table tbody tr").eq(i).children();
					//写入信息
					$dest.eq(0).text(i+1);
					$dest.eq(1).children("input").val($src.children().eq(1).children().val());
					$dest.eq(11).attr('id',$src.children().eq(1).attr('id'));
					$dest.eq(2).children("input").val($src.children().eq(2).children().val());
					$dest.eq(2).attr('id',$src.children().eq(2).attr('id'));
					$dest.eq(3).children("input").val($src.children().eq(3).children().val());
					//$dest.eq(3).attr('id',$src.children().eq(3).attr('id'));
					$dest.eq(4).children("input").val($src.children().eq(4).children().val());
					$dest.eq(5).children("input").val($src.children().eq(5).children().val());
					$dest.eq(6).children("input").val($src.children().eq(6).children().val());
					$dest.eq(7).children("input").val($src.children().eq(7).children().val());
					$dest.eq(8).children("input").val($src.children().eq(8).children().val());
					$dest.eq(9).children("input").val($src.children().eq(9).children().val());
					$dest.eq(10).children('input').val($src.children().eq(10).children().val());
					//隐藏的经营方式、资产类型、投组ID
					$dest.eq(11).children('input').val($src.children().eq(1).attr('id'));
					$dest.eq(12).children('input').val($src.children().eq(2).attr('id'));
					$dest.eq(13).children('input').val($src.children().eq(3).attr('id'));
				}
			}
			*/
			
			$("#bondCode_").val($('input[name="bondCntr.bondCode"]').val());
			$("#paymentDate_").val($('input[name="bondCntr.paymentDate"]').val());
			$(".buw_btn_ed").removeAttr("disabled");
			$("#underwriteItem_table tbody tr input").attr('readonly','');
			closePage();
			$("#underwriteItem_table tbody tr:last").click();
	});
	//---------------------------------------//新增/修改债券明细中   承销价格计算 
	$(document).on('blur','#uwai_infos_BONDAM',calChildrenBothYSYJ_IA);
	$(document).on('blur','#uwai_infos_transAmount',calChildrenIA);
	function calChildrenBothYSYJ_IA(){
		calChildrenYSYJ();
		calChildrenIA();
	}
//********************************债券承销 End*********************************//

//除明细中的千分号
function  removeTheItemsThousandCharacter(){
	var  $trs = $("#underwriteItem_table tbody tr");
	for(var i=0;i<$trs.length;i++){
		for(var j=4;j<10;j++){
			if(j==6)
				continue;
			$input = $trs.eq(i).children().eq(j).children();
			if($input.val())
				$input.val(removeThousandCharacter($input.val()));
		}
	}
}

function dealBondData(){
	$("#BondBasic_reportType").removeAttr("name");
	removeTheItemsThousandCharacter();
	var transAmount = getMoneyValue($("input[name='bondCntr.transAmount']").val());
	var BONDAM = getMoneyValue($("input[name='bondCntr.BONDAM']").val());
	
	var item_transAmount = 0;
	var item_BONDAM = 0;
	var totalTransAmount = 0;
	var totalBONDAM = 0;
	var $totalValue = $("#underwriteItem_table tbody td[class='totalTransAmount']");
	for(var i = 0;i<$totalValue.length;i++){
		
		item_BONDAM = getMoneyValue($("input[name='bondCntr.teamBookItems["+i+"].BONDAM']").val());//中标量
		totalBONDAM += item_BONDAM*1;//求出总和 (*1是为了可以直接相加,而不是拼接字符串)
		
		item_transAmount = getMoneyValue($("input[name='bondCntr.teamBookItems["+i+"].transAmount']").val());//我行缴款总额
		totalTransAmount +=  item_transAmount*1;//求出总和 (*1是为了可以直接相加,而不是拼接字符串)
	};
	if(BONDAM != totalBONDAM){
		doTheAlert("提示","合同中承销面值: "+BONDAM+" 与明细中标量总额: "+totalBONDAM+" 不符!");
    	return false;
	}
	if(transAmount != totalTransAmount){
		doTheAlert("提示","合同中缴款总额: "+transAmount+" 与明细中我行缴款总额: "+totalTransAmount+" 不符!");
    	return false;
	}
	if($("#bondIssueUnit").val()!=$("#buw_counterpartyNo").val()){
		doTheAlert("提示","查询的发行人信息与债券的发行人信息不符!");
    	return false;
	}
	//缴款日期与手续费收取日期判断
	var podageAmtDate = $('input[name="bondCntr.podageAmtDate"]');
	var paymentDate = $('input[name="bondCntr.paymentDate"]');
	var days = calculateDays(paymentDate.val(),podageAmtDate.val());
	if(days<0){
		doTheAlert("提示","手续费收取日期应大于等于缴款日期！");
		return false;
	}
	
	return true;
}

//累加计算时应收应计重算
function reCalYSYJ(bondam, $input){
	bondCode = $('input[name="bondCntr.bondCode"]').val();
	paymentDate = $('input[name="bondCntr.paymentDate"]').val();
	calYSYJ_main(bondCode,paymentDate,bondam,$input);
	if(!getMoneyValue($input.val())&&BONDAM){
		if(!bondCode&&!paymentDate)
			$input.val("无债券代码 缴款日期");
		else if(!bondCode)
			$input.val("请录入债券代码");
		else
			$input.val("请录入缴款日期");
	}
	//$input.val(addThousandCharacter(getMoneyValue($input.val())));
}
//累计算溢折价总额/承销价位
function reCalIA(bondam, transAmount, $underwritPrice, $interestAdjust){
	bondCode = $('input[name="bondCntr.bondCode"]').val();
	paymentDate = $('input[name="bondCntr.paymentDate"]').val();
	calIA_main(bondCode,paymentDate,bondam,transAmount,$underwritPrice,$interestAdjust);
	//$underwritPrice.val(addThousandCharacter(getMoneyValue($underwritPrice.val())));
	//$interestAdjust.val(addThousandCharacter(getMoneyValue($interestAdjust.val())));
}

