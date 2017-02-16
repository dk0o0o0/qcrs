/*************************************************************************************************
/* DESC       ：债券分销买卖公共ＪＳ处理文件                                                                                                                                                                                 
/* AUTHOR     ：大资管平台项目组                                                                                                                                                                                 
/* CREATE     ：2016-05-28                                     
/* MODIFYLIST ： Name          Date         Reason                                                
/*              yourName      updateDate    modiReason                                               
/*              -------------------------------------------------------------   
*************************************************************************************************/

	//回车事件
	$(document).keydown(function(event){
		//输入债券代码处
		var bCode = $("input[name='bondCntr.bondCode']:focus").length;
		//选择机构处
		if(event.keyCode==13){
			$("input:focus").blur();
			//点击债券代码查询按钮
			if(bCode){
				$("#searchBond").click();
				return;
			}
		}
	});	
	
	//---------------------------------------//选定机构
	$(document).on('click','#result input[value="选择"]',
		function(){
			var agencyId = $(this).parents("tr").attr("id");
			if($("#uwai_infos_disribonAgencyName").length){
				var agencyName = $(this).parents("td").prev().text();
				$("#uwai_infos_disribonAgencyName").val(agencyName);
				$("#uwai_infos_disribonAgencyName").addClass('agencyId_'+agencyId);
				closePage();
				return;
			}
			var strstr = "";
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
					var a=0;
					if(typeof(data.trusteeShipdetails) !="undefined" )
				 		a = data.trusteeShipdetails.length;
					for(var i=0;i<a;i++){
						var json = data.trusteeShipdetails[i];
						if(json!=null)
						strstr += "<option value='"+json.coutertyBankAcctNo+"' id='__"+json.escrowAcctNoName+"'>"+json.coutertyBankAcctNo+"</option>";
					}
					$("#coutertyBankSelect").html(strstr);
				 }
				 $("#transPlaceType").val("其他");
				 closePage();
				 $("#escrowPlaceCode").trigger("change");
				},
				error:function(){
					doTheAlert('提示', errorTip);
				}
			});
	});

//---------------------------------------//发行行信息联动
	$(document).on('change','#buw_counterpartyInfo select:lt(4)',
		function(){
			var currentName = $(this).attr("name");
			var index = $(this).children(":selected").index();
			for(var i=0;i<$("#buw_counterpartyInfo select:lt(4)").length;i++){
				var $selecte_ = $("#buw_counterpartyInfo select:lt(4)").eq(i);
				if(currentName==$selecte_.attr("name")){
					continue;
				}
				$selecte_.children().removeAttr("selected");
				$selecte_.children().eq(index).attr('selected','');
				$selecte_.val($selecte_.children().eq(index).val());
			}
	});
	
	
	$(document).on('blur','input[name="bondCntr.deliveryDate"]',function(){
		var deliveryDate = $('input[name="bondCntr.deliveryDate"]');
		var startInterDate = $('input[name="bondCntr.startInterDate"]'); 
		var disribonPayDate = $('input[name="bondCntr.disribonPayDate"]'); 
		if(!deliveryDate.val()){
			return;
		}else{
			var temp1 = parseInt(deliveryDate.val().replace(new RegExp('-','g'),""));
			var temp2 = temp3 = 20991231;
			if(startInterDate.val()){
				temp2 = parseInt(startInterDate.val().replace(new RegExp('-','g'),""));
			}
			if(disribonPayDate.val()){
				temp3 = parseInt(disribonPayDate.val().replace(new RegExp('-','g'),""));
			}
			if((temp1>temp2)||(temp1>temp3)){
				doTheAlert("提示","分销日期不能在分销起息日、手续费收取日期之后");
				deliveryDate.val('');
				return;
			}
		}
	});
	$(document).on('blur','input[name="bondCntr.startInterDate"]',function(){
		var deliveryDate = $('input[name="bondCntr.deliveryDate"]');
		var startInterDate = $('input[name="bondCntr.startInterDate"]'); 
		if(!deliveryDate.val()){
			return;
		}else{
			var temp1 = parseInt(deliveryDate.val().replace(new RegExp('-','g'),""));
			var temp2 = 20991231;
			if(startInterDate.val()){
				temp2 = parseInt(startInterDate.val().replace(new RegExp('-','g'),""));
			}
			if(temp1>temp2){
				doTheAlert("提示","分销起息日不能在分销日期之前");
				startInterDate.val('');
				return;
			}
		}
	});
	$(document).on('blur','input[name="bondCntr.disribonPayDate"]',function(){
		var deliveryDate = $('input[name="bondCntr.deliveryDate"]');
		var disribonPayDate = $('input[name="bondCntr.disribonPayDate"]');  
		if(!deliveryDate.val()){
			return;
		}else{
			var temp1 = parseInt(deliveryDate.val().replace(new RegExp('-','g'),""));
			var temp3 = 20991231;
			if(disribonPayDate.val()){
				temp3 = parseInt(disribonPayDate.val().replace(new RegExp('-','g'),""));
			}
			if(temp1>temp3){
				doTheAlert("提示","手续费收取日期不能在分销日期之前");
				disribonPayDate.val('');
				return;
			}
		}
	});
	
	
	//--------------------------------------点击详情按钮出来债券详情
	$(document).on('click','#goDetails',
		function(){
			window.open("/cpms/linkus/capital/bond/base/bondBasic/view?bondCode="+$("#bondCode").val(),{width:'90%'});
	});

	//点击查询按钮搜索债券基本信息
	$(document).on('click','#searchBond',function(){
		var $bondCode = $("input[name='bondCntr.bondCode']");
		var $bondName = $("input[name='bondCntr.bondName']");
		var $bondSettleType = $("select[name='bondCntr.bondSettleType']");
		var $YZval = $("input[name='bondCntr.YZval']");
		var $YSYJ = $("input[name='bondCntr.receAccruedInterest']");
		var bondCode = $bondCode.val();
		var deliveryDate = $("input[name='bondCntr.deliveryDate']").val();
		$bondSettleType.removeAttr("disabled");
		$bondSettleType.val("");
		$bondSettleType.attr("disabled","true");
		$bondName.val("");
		$YZval.val("");
		$YSYJ.val("");
		$("#detail").hide();//将详情页的div隐藏,查询成功后才显示详情按钮
		if(bondCode==""){
			$.messager.alert('提示','请输入债券代码!');
			$bondCode.focus();
			return;
		}
		$.ajax({
			type : "post",
			globle : false,
			async : false,
			url : "/cpms/linkus/capital/bond/bussiness/bondPublic/findTheBondByCode",
			data : {"bondCode":bondCode},
			dataType : "json",
			success : function(data){
				if(data!=null){
					if(data.ifNull){
						getTheMessager().alert("提示",data.tip,'',function(){
				 			$bondCode.focus();
				 		});
					}else{
						var matureDate = data.bondBasicInfo.matureDate;
						$("#matureDate").val(matureDate);
						if(deliveryDate!=null){
							var tip = "分销日期: ";
				    		compareToDeliveryDate(matureDate,deliveryDate,tip);
				    	}
						$("input[name='bondCntr.bondName']").val(data.bondName);
						$("#bondSettleType").removeAttr("disabled");
						$("#bondSettleType").val(data.bondSettleType).selected=true;
						$("#bondSettleType").attr("disabled","true");
						$("#detail").show();//将详情页的div显示
					}
				}
			},
			error:function(){
				doTheAlert('提示', errorTip);
			}
		});
		
	});

	//页面上值的计算
	/**计算债券价格**/
	function calBondPrice(){
		var BONDAM = getMoneyValue($("#BONDAM").val());
		var transAmount = getMoneyValue($("#transAmount").val());
		var $transNetPrice = $("#transNetPrice");
		if(BONDAM=="" || transAmount==""){
			getMoneyValue($transNetPrice.val(""));
			return;
		}
		var bondPrice = parseFloat(transAmount/BONDAM/100);
		$transNetPrice.val(bondPrice.toFixed(4));
	}
	
	/**计算应收应计**/
	function calYSYJ(){
		var bondCode = $('#bondCode').val();//债券代码
		var deliveryDate = $('[name="bondCntr.startInterDate"]').val();//分销日期
		var input = $('[name="bondCntr.BONDAM"]');
		var BONDAM = parseFloat(getMoneyValue(input.val()));//获取券面面值
		var bondName = $("input[name='bondCntr.bondName']").val();//债券名称
		BONDAM = BONDAM * 10000;
		if(bondName=="" || deliveryDate==""  || input.val()==""){
			$("input[name='bondCntr.receAccruedInterest']").val("");
			return;
		}
		$.ajax({
			type : "post",
			global : false,
			async : false,
			url : '/cpms/linkus/capital/bond/bussiness/bondPublic/calYSYJ',
			data : {"bondCode":bondCode,"deliveryDate":deliveryDate,"BONDAM":BONDAM},
			dataType : "json",
			success : function(data){
				//判断是否取到正确的债券代码
				if(bondName != ""){
					var receAccruedInterest;
					if(data.ysyj){
						receAccruedInterest = parseFloat(data.ysyj).toFixed(2);
					}else{
						receAccruedInterest = parseFloat(0).toFixed(2);
					}
					$("input[name='bondCntr.receAccruedInterest']").val(receAccruedInterest).change();
				}else{
					$("input[name='bondCntr.receAccruedInterest']").val("");
				}
			},
			error:function(){
				doTheAlert('提示', errorTip);
			}
		});
	}
	
	/**计算溢折价**/
	function calYZval(){
		var bondCode = $("#bondCode").val();
		var deliveryDate = $('input[name="bondCntr.deliveryDate"]').val();
		var transAmount = getMoneyValue($("#transAmount").val());
		var bondName = $("input[name='bondCntr.bondName']").val();//债券名称
		var BONDAM = getMoneyValue($("#BONDAM").val());
			BONDAM = BONDAM * 10000;
		var YZval = $("#YZval");
		if(bondName=="" || deliveryDate=="" || transAmount=="" || BONDAM==""){
			YZval.val("");
			return;
		}
		$.ajax({
			type : "post",
			global : false,
			url : '/cpms/linkus/capital/bond/bussiness/bondPublic/calInterestAdjust',
			data : {
				"bondCode":bondCode,
				"deliveryDate":deliveryDate,
				"transAmount":transAmount,
				"BONDAM":BONDAM
			},
			dataType : "json",
			success : function(data) {
			 if (data != null){
			 	if(bondName!=""){
			 		if(data.interestAdjust){
			 			YZval.val(parseFloat(data.interestAdjust).toFixed(2));
			 		}else{
			 			YZval.val(parseFloat(0).toFixed(2));
			 		}
			 		YZval.change();
			 	}else{
			 		YZval.val("");	
			 	}
			 }
			},
			error:function(){
				doTheAlert('提示', errorTip);
			}
		});
	}
	
	/**计算净价总额**/
	function calNetpriceAmount(){
		var transAmount = getMoneyValue($("#transAmount").val());
		var YSYJ = getMoneyValue($("input[name='bondCntr.receAccruedInterest']").val());
		if(transAmount==""||YSYJ==""){
			$("#netPriceAmount").val("");
			return;
		}else{
			$("#netPriceAmount").val(transAmount*1-YSYJ*1).change();
		}
	}
	
	function calMatureEarningRate(){
		var deliveryDate = $("input[name='bondCntr.startInterDate']").val();
		var bondCode = $("input[name='bondCntr.bondCode']").val();
		var transNetPrice = $("input[name='bondCntr.transNetPrice']").val();
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
	
	
	//计算触发条件
	$(document).on('blur','#BONDAM',function(){
		calBondPrice();
		calYSYJ();
		calYZval();
		calNetpriceAmount();
		calMatureEarningRate();
	});
	$(document).on('blur','#transAmount',function(){
		calBondPrice();
		calYZval();
		calNetpriceAmount();
		calMatureEarningRate();
	});
	//债券代码改变
	$(document).on('click','#searchBond',function(){
		calYZval();
		calYSYJ();
		calNetpriceAmount();
		calMatureEarningRate();
	});
	//分销日期改变
	$(document).on('change','input[name="bondCntr.deliveryDate"]',function(){
		calYSYJ();
		calYZval();
		calNetpriceAmount();
	});
	//分销起息日改变
	$(document).on('change','input[name="bondCntr.deliveryDate"]',function(){
		calMatureEarningRate();
	});

