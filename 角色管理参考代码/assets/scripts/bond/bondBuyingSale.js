/*************************************************************************************************
/* DESC       ：债券买卖公共ＪＳ处理文件                                                                                                                                                                                 
/* AUTHOR     ：大资管平台项目组                                                                                                                                                                                 
/* CREATE     ：2016-07-21                                     
/* MODIFYLIST ： Name          Date         Reason                                                
/*              renkang      2016-07-21    modiReason                                               
/*              -------------------------------------------------------------   



/**
 * 债券买卖公共js处理文件
 * 值的计算,对手方选择,查询债券基本信息
 */

	//--------------------------------------点击详情按钮出来债券详情
	$(document).on('click','#goDetails',
		function(){
			window.open("/cpms/linkus/capital/bond/base/bondBasic/view?bondCode="+$("#bondCode").val(),{width:'90%'});

	});
	
	//回车事件
	$(document).keydown(function(event){
		//输入债券代码处
		var bCode = $("input[name='bondCntr.bondCode']:focus").length;
		//是否在机构查询页面
		var ifAgencyPage		  = $("#agencyName").length;
		if(event.keyCode==13){
			$("input:focus").blur();
			//点击债券代码查询按钮
			if(bCode){
				$("#searchBond").click();
				return;
			}
			//点击查询机构
			if(ifAgencyPage){
				$("#searchAgencyName").click();
				return;
			}
		}
	});	
	//---------------------------------------通过债券代码查询债券基本信息
	$(document).on('click','#searchBond',function(){
		var bondCode = $('#bondCode').val();
		var deliveryDate = $("#deliveryDate").val();
		var tradeDate = $("#tradeDate").val();
		$("#detail").hide();//将详情页的div隐藏,查询成功后才显示详情按钮
		var $tr = $("#bondSaletrInfoTable_1 tbody tr");
		var itemBondCodeFirst = $tr.eq(0).children().eq(0).children().children().val();
		if(bondCode!=itemBondCodeFirst){
			$("#bondSaletrInfoTable_1 tbody").empty();
		}
		
		if(bondCode != ""){//如果债券代码为空则弹出提示,非空则走ajax查询
			$.ajax({
					type : "post",
					global : false,
//					async : false,
					url : '/cpms/linkus/capital/bond/bussiness/bondPublic/findBondAndEvalByCode',
					data : {"bondCode":bondCode},
					dataType : "json",
					success : function(data){
						if(data.ifNull==null){
							doTheAlert("提示",data.tip);//未找到债券
							$("#bondName").val("");
							$("#valuationNetPrice").val("");
							return;
						}else if(data.tip!=null){
							doTheAlert("提示",data.tip);//债券已到期或未复核
							$("#bondName").val("");
							$("#valuationNetPrice").val("");
							return;
						}
						
						if(typeof(data.valuationNetPrice) == "undefined"){
							doTheAlert("提示",bondCode+" 未进行估值!请前往债券每日估值进行维护! "+"日期:"+tradeDate);
							$("#bondName").val("");
							$("#valuationNetPrice").val("");
							$("#bondCode").focus();
							return;
						}
						if(data.ifNull!=null&&data.tip==null){//将值放入页面对应位置
							$("#bondName").val(data.bondName);
							$("#valuationNetPrice").val(data.valuationNetPrice);//估值净价
							$("#bondBasicId").val(data.bondId);//详情页绑定的id
							$("#detail").show();//将详情页的div显示
						}
					},
					error:function(){
						doTheAlert('提示', errorTip);
					}
			});
		}else{
			doTheAlert("提示","请输入债券代码!");
			$("#bondName").val("");
			$("#valuationNetPrice").val("");
		};
	});
	//---------------------------------------页面上值的计算
		//计算偏离度和净价金额
		function calPldandPrice(){
			var bondCode = $('#bondCode').val();
			var input = $('[name="bondCntr.BONDAM"]');
			var BONDAM = parseFloat(getMoneyValue(input.val()));//获取券面面值
			var transNetPrice = getMoneyValue($("#transNetPrice").val());//获取交易净价
			var valuationNetPrice = getMoneyValue($("#valuationNetPrice").val());//获取每日估值净价
			if(BONDAM && transNetPrice){
				//**偏离度计算 ( (取整（成交净价-估值净价）*100  /估值净价))100)
				$("#pldval").val(parseFloat((transNetPrice-valuationNetPrice)*100/valuationNetPrice).toFixed(4));
				if (input.hasClass('tenthousand'))
					BONDAM = BONDAM * 10000;
				//**净价金额计算
				var netPriceAmount = parseFloat((BONDAM*transNetPrice/100)).toFixed(2);
				$("#netPriceAmount").val(netPriceAmount).change();
			}else{
				//若券面面值和交易净价无值则清除信息
				$("#pldval").val("");
				$("#netPriceAmount").val("");
				$("#transAmount").val("");
				$("#fullPriceAmount").val("");
			}
		}
		
		//顺延后的计算
		function calculate(reversalFlag){
			var deliveryDate = $('#deliveryDate');
			var settleDateType = $("select[name='bondCntr.settleDateType']").val();
			var tradeDate = $("input[name='bondCntr.tradeDate']");
			if(settleDateType=="0"){
				deliveryDate.val(tradeDate.val());
			}
			if(settleDateType=="1"){
				deliveryDate.val(getNonHoliday(addDay(tradeDate.val(),1)).toString());
			}
			matureYieldRateCal(reversalFlag);
			if(deliveryDate){
				calYSYJ(deliveryDate.val());
			}
		}
		
		
	//**应收应计利息计算,交易全价计算,全价金额计算
		function calYSYJ(deliveryDate){
			var bondCode = $('#bondCode').val();//获取债券代码
			var input = $('[name="bondCntr.BONDAM"]');
			var BONDAM = parseFloat(getMoneyValue(input.val()));//获取券面面值
			if (input.hasClass('tenthousand'))
					BONDAM = BONDAM * 10000;
			//如果交割日期,债券信息,券面面值同时存在则计算,否则清除应收应计信息
			if(deliveryDate && bondCode && BONDAM){
				$.ajax({
						type : "post",
						global : false,
						async : false,
						url : '/cpms/linkus/capital/bond/bussiness/bondPublic/calYSYJ',
						data : {"bondCode":bondCode,"deliveryDate":deliveryDate,"BONDAM":BONDAM},
						dataType : "json",
						success : function(data){
//							var delivery = parseInt(deliveryDate.toString().replace(new RegExp('-','g'),""));//交割日期转换为int类型与到期日和起息日比较大小
//							var matureDate = parseInt(data.matureDate.toString().replace(new RegExp('-','g'),""));//到期日
//							var startInterDate = parseInt(data.startInterDate.toString().replace(new RegExp('-','g'),""));//起息日
							var bondName = $("#bondName").val();
							//这里取债券名称是为了判断债券代码更换后是否找到值,若为空则不进计算,并清除所有前一个计算出来的信息
							if(bondName != ""){
								//判断交割日期是否在起息日和到期日之间
//								if(delivery > startInterDate && delivery < matureDate ){
									var transNetPrice = parseFloat(getMoneyValue($("#transNetPrice").val()));//交易净价
									var receAccruedInterest = parseFloat(data.ysyj).toFixed(2);//应收应计利息
									//**应收应计利息计算
									$("#receAccruedInterest").val(receAccruedInterest).change();
									if(transNetPrice != "" && BONDAM && transNetPrice){
										var netPriceAmount = parseFloat((BONDAM*transNetPrice/100));//净价金额
										//**全价金额计算  (净价金额 + 应收应计)
										var transAmount = parseFloat(netPriceAmount) + parseFloat(receAccruedInterest);
										$("#transAmount").val(transAmount.toFixed(2)).change();
										//**交易全价计算  全价金额/券面总额  * 100
										var fullPriceAmount = (transAmount/BONDAM*100);//交易全价
										$("#fullPriceAmount").val(fullPriceAmount.toFixed(4));
										//**应收应计(元/百元)利息计算
										$("#receAccruedRadix").val((fullPriceAmount - transNetPrice).toFixed(4));
									}
//								}else{
////									$.messager.alert('提示','交割日期不在起息日和到期日之间!');
//									//交割日期不在起息日和到期日之间则清空信息
//									$("#receAccruedInterest").val("").change();
//									$("#receAccruedRadix").val("").change();
//									$("#transAmount").val("").change();
//									$("#fullPriceAmount").val("").change();
//								}
							}else{
								//债券代码更换后为空清除所有信息
								$("#transAmount").val("");
								$("#pldval").val("");
								$("#fullPriceAmount").val("");
								$("#receAccruedInterest").val("");
								$("#receAccruedRadix").val("");
							}
						},
						error:function(){
							doTheAlert('提示', errorTip);
						}
				});
			}else{
				//券面面值,债券信息,交割日期没有同时存在,则清除信息
				$("#receAccruedInterest").val("");
				$("#receAccruedRadix").val("");
			}
		};
		
	//交易日期改变交割日期
	$(document).on('change','#tradeDate',function(){
		var tradeDate = $("#tradeDate").val();
		$("#deliveryDate").val(tradeDate);
	});
		
	//**不同条件下触发计算	
		//面值改变
		$(document).on('blur','#BONDAM',function(){
			calculate();
			calPldandPrice();
		});
		//交易净价改变
		$(document).on('blur','#transNetPrice',function(){
			calculate();
			calPldandPrice();
		});
		
		//更改交易全价
		$(document).on('blur','#transAmount',function(){
			var input = $('[name="bondCntr.BONDAM"]');
			var BONDAM = parseFloat(getMoneyValue(input.val()));//获取券面面值
			if (input.hasClass('tenthousand'))
					BONDAM = BONDAM * 10000;
			var transAmount = parseFloat(getMoneyValue($("#transAmount").val()));
			var transNetPrice = parseFloat(getMoneyValue($("#transNetPrice").val()));//交易净价
			if(transAmount&&transNetPrice&&BONDAM){
				//**交易全价计算  全价金额/券面总额  * 100
				var fullPriceAmount = (transAmount/BONDAM*100);//交易全价
				$("#fullPriceAmount").val(fullPriceAmount.toFixed(4)).change();
				//**应收应计(元/百元)利息计算
				$("#receAccruedRadix").val((fullPriceAmount - transNetPrice).toFixed(4)).change();
			}else{
				$("#fullPriceAmount").val('');
				$("#receAccruedRadix").val('');
			}
		});
		
		
		
		//到期收益率改变
//		$(document).on('blur','#matureEarningRate',function(){
//			calculate("reversal");
//		});
		
		
		//交割日期改变
		/*$(document).on('blur','#tradeDate',function(){
			calculate();
		});*/
		//改变清算速度
		$(document).on('change','select[name="bondCntr.settleDateType"]',function(){
			calculate();
		});
		//债券代码改变
		$(document).on('click','#searchBond',function(){
			calculate();
			calPldandPrice();
		});
		
	//-----------------------------------------选定机构
	$(document).on('click','#result input[value="选择"]',
	function(){
		var str = "";
		var dealerNa="";
		var transPlaceType = $("select[name='bondCntr.transPlaceType']").val();//托管场所
		var agencyId = $(this).parents("tr").attr("id");
		var agencyName = $(this).parents("td").prev().text();
		$.ajax({
			type : "post",
			global : false,
			async : true,
			url : '/cpms/linkus/capital/bond/bussiness/bondPublic/choiceEmulantAgency',
			data : {
				"agencyId":agencyId,
				"escrowPlaceCode":transPlaceType
			},
			dataType : "json",
			success : function(data) {
			 if (data != null) {
				$("input[name='bondCntr.counterpartyName']").val(agencyName);
				$("#agencySimpName").val(data.agencySimpName);
				//$("#bondReposUserName").val(data.userName);
				$("#transPlace").val(data.transPlace);
				var z=0;
				if(typeof(data.trusteeShipdetails) !="undefined" ){
			 		z = data.trusteeShipdetails.length;
				}
				for(var i=0;i<z;i++){
					var json = data.trusteeShipdetails[i];
					if(json!=null)
					str += "<option value='"+json.coutertyBankAcctNo+"' id='__"+json.escrowAcctNoName+"'>"+json.coutertyBankAcctNo+"</option>";
				}
				var N=0;
				if(typeof(data.userName) !="undefined" ){
			 		N = data.userName.dealerNameList.length;
				}
				for(var i=0;i<N;i++){
					var json = data.userName.dealerNameList[i];
					if(json!=null)
					dealerNa += "<option value='"+json.dealerName+"' id='__"+json.dealerName+"'>"+json.dealerName+"</option>";
				}
				$("#bondReposUserName").html(dealerNa);
				$("input[name='bondCntr.counterpartyNo']").val(agencyId);
				$("#coutertyBankSelect").html(str);
			 }
//			 $("#coutertyBankSelect").parent().prev().text("对手方托管账号");
			 closePage();
			 $("#escrowPlaceCode").trigger("change");
			},
			error:function(){
				doTheAlert('提示', errorTip);
			}
		});
	});
	
	/**
	 * 到期收益率计算
	 */
	function matureYieldRateCal(reversalFlag){
		var $transNetPrice = $("input[name='bondCntr.transNetPrice']");
		var transNetPrice = $transNetPrice.val();
		var $matureEarningRate = $("input[name='bondCntr.matureEarningRate']");
		var matureEarningRate = $matureEarningRate.val();
		var bondCode = $("#bondCode").val();
		var deliveryDate = $("#deliveryDate").val();
		if(!bondCode||!deliveryDate||!(transNetPrice||matureEarningRate)){
			return;
		}
		// 是否反转   是--用到期收益率计算交易净价   否--用交易净价计算到期收益率
		var ifReversal = (reversalFlag&&matureEarningRate)||!transNetPrice;
		if(ifReversal){
			transNetPrice = 0;
		}else{
			matureEarningRate = 0;
		}
		$.ajax({
			type:"post",
			global:false,
			async:false,
			url:"/cpms/linkus/capital/bond/bussiness/bondPublic/matureYieldRateCal",
			data:{
				"bondCode":bondCode,
				"deliveryDate":deliveryDate,
				"transNetPrice":transNetPrice,
				"matureEarningRate":matureEarningRate
			},
			dataType:"json",
			success:function(data){
				if(ifReversal){
					$transNetPrice.val(data.result);
				}else{
					$matureEarningRate.val(data.result);
				}
			},
			error:function(){
				doTheAlert('提示', errorTip);
			}
		});
	}
	

//检验数据再保存
function checkThenSave(){
	var busiType=$("#busiType").val();
	var checkFlag=pubCheck("t"+busiType+"Bond_form");
	if(!checkFlag){
		return ;
	}
	var bool = dealBondData();
	if(!bool){
		return;
	}
	if(!$("#matureEarningRate").val()||!$("#transNetPrice").val()){
		doTheAlert("提示","请填写交易净价/到期收益率");
		return;
	}
	
	var netPriceAmount = getMoneyValue($("input[name='bondCntr.netPriceAmount']").val());
	var BONDAM = getMoneyValue($("input[name='bondCntr.BONDAM']").val());
	var rate = (netPriceAmount/BONDAM).toFixed(2);
	var rate_diverge = Math.abs(rate_diverge-1);
	if(rate_diverge>0.3){
		getTheMessager().confirm('提示','净价与面值偏离为'+rate_diverge+'，超过30%，是否继续？',function(flag){
			if(flag){
				getTheMessager().confirm('提示','偏离度为: '+$("#pldval").val()+"%，是否要保存？",function(flag_){
					if(flag_){
						RG_save();
					}
				});
			}
		});
	}else{
		getTheMessager().confirm('提示','偏离度为: '+$("#pldval").val()+"%，是否要保存？",function(flag){
			if(flag){
				RG_save();
			}
		});
	}

}