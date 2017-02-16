/*************************************************************************************************
/* DESC       ：质押式回购ＪＳ处理文件                                                                                                                                                                                 
/* AUTHOR     ：大资管平台项目组                                                                                                                                                                                 
/* CREATE     ：2016-04-05                                     
/* MODIFYLIST ： Name          Date         Reason                                                
/*              yourName      updateDate    modiReason                                               
/*              -------------------------------------------------------------   
*************************************************************************************************/

$(function(){
	
//****************************质押式回购  Begin***********************************//
	
/**
 * @Author 申铭
 * @Name 键盘监听
 * @Return null
 * @Param event
 * @Description 监听质押式回购业务下的键盘操作
 * @Throws null
 **/
	$(document).keydown(
		function(event){
			//组合按键       按下Ctrl
			if(event.ctrlKey)
				//Ctrl + 下面的按键
				switch(event.keyCode){
					//Enter  保存
					case 13:if($('.ui-dialog:visible').last().find("#b_bondCode").length){
								$("#btn_zqPrSearch").click();return;
						      }
							doReposSave();
							return;
					
					//  ←    切换正回购
					case 37:if($("#transDirection").val()=="0")
								return;
							$("#transDirection").val("0");
							$("#transDirection").change();
							closePage();
							return;
					//  →    切换逆回购
					case 39:if($("#transDirection").val()=="1")
								return;
							$("#transDirection").val("1");
							$("#transDirection").change();
							closePage();
							return;
				}
				
			//Insert键
			if(event.keyCode==45){
				//判断是在正/逆回购业务
				var transDirection = $("#transDirection").val();
				if(transDirection=='0'){
					$("#goBESearchPage").click();
				}
				if(transDirection=='1'){
					$("#transDirection_1_add").click();
				}
				return;
			}
			
		//正回购债券查询页面 查询/录入信息     逆回购债券信息提交
			//是否在正回购债券搜索页面      通过查找页面上可见的id为#b_bondCode的输入框实现
			var ifZqPrSearchPage      = $("#b_bondCode").length;
			//是否聚焦在逆回购债券信息录入框 
			var transDirection_1_info = $("#transDirection_1_info4 input:gt(0):focus,#transDirection_1_info4 select:focus").length;
			//是否聚焦在逆回购bondCode输入框
			var bondCodeCheck = $("#transDirection_1_info4 input:first:focus").length;
			//是否聚焦在对手方信息栏           
			var counterpartyName      = $("input[name='bondCntr.counterpartyName']:focus").length;
			//回车键
			if(event.keyCode==13){
				$("input:focus").blur();
				//在对手方信息栏   点击查询按钮  进入机构查寻页
				if(counterpartyName){
					$("#goSBSearchPage").click();
					return;
				}
				//在bondCode输入框
				if(bondCodeCheck){
					$("#control-group-transDirection_1_bondCode").click();
					return;
				}
				//如果正在逆回购债券信息录入  按回车就相当于点击提交按钮
				if(transDirection_1_info){
					$("#transDirection_1_check").click();
					return;
				}
				//如果在正回购债券搜索页面 
				if(ifZqPrSearchPage){
					//是否聚焦在债券计算中的质押比例/质押面值 输入框
					var ifBondCalculate = $("#b_pledgeRatio:focus,#b_pledgeBondAmount:focus").length;
					//点击债券计算的提交按钮
					if(ifBondCalculate){
						//此处用click的话 提交完成能做到  但是聚焦依然在录入框
						$("div #right #sureSubmit").focus();
						return;
					}
					//点击债券查询的按钮
						$("div #left  #doItemSearch").click();
						return;
				}
			}
			//方向键+Delete   债券信息部分
			var $tr = $(".transDirection_ tbody tr[class='justMark1']");
			if($tr.length){
				var $td = $("input:focus").parents("td");
				var index = $td.index();
				if($("input:focus").length){
					switch(event.keyCode){
						//←
						case 37:$td.prev().children("input").focus();return;
						//↑
						case 38:$tr.prev().click();$td.parents("tr").prev().children().eq(index).children().focus();return;
						//→
						case 39:$td.next().children("input").focus();return;
						//↓
						case 40:$tr.next().click();$td.parents("tr").next().children().eq(index).children().focus();return;
						//Delete
						case 46:$("#transDirection_"+$("#transDirection").val()+"_remove").click();return;
					}
				}else{
					switch(event.keyCode){
						//↑
						case 38:$tr.prev().click();return;
						//↓
						case 40:$tr.next().click();return;
						//Delete
						case 46:$("#transDirection_"+$("#transDirection").val()+"_remove").click();return;
					}
				}
			}
	});
	
//---------------------------------------//选定机构
	$(document).on('click','#result input[value="选择"]',
	function(){
		var str = "";
		var dealerNa="";
		var agencyId = $(this).parents("tr").attr("id");
		var agencyName = $(this).parents("td").prev().text();
		$.ajax({
			type : "post",
			global : false,
			async : true,
			url : '/cpms/linkus/capital/bond/bussiness/bondPublic/choiceEmulantAgency',
			data : {
				"agencyId":agencyId
			},
			dataType : "json",
			success : function(data) {
			 if (data != null) {
				$("input[name='bondCntr.counterpartyName']").val(agencyName);
				$("#agencySimpName").val(data.agencySimpName);
				$("#bondReposUserName").val(data.userName);
				$("#transPlace").val(data.transPlace);
				var z=0;
				if(typeof(data.trusteeShipdetails) !="undefined" )
			 		z = data.trusteeShipdetails.length;
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
			 closePage();
			 $("#escrowPlaceCode").trigger("change");
			},
			error:function(){
				doTheAlert('提示', errorTip);
			}
		});
	});

//---------------------------------------//切换显示
	$(document).on('click','#changeShowName',changeShowName);
	function changeShowName(){
		var $options = $("#coutertyBankSelect option");
		var ControlLabel = $("#coutertyBankSelect").parent().prev();
		var index = "";
		for(var i=0;i<$options.length;i++){
			text = $options.eq(i).attr("id").substring(2);
			val  = $options.eq(i).val();
			$options.eq(i).text((ControlLabel.text()=="对手方托管账号")?text:val);
		}
		ControlLabel.text((ControlLabel.text()=="对手方托管账号")?"托管账号名称":"对手方托管账号");
	}
//---------------------------------------//将托管账号的下拉选值传递到隐藏的input框中
	$(document).on('change','#coutertyBankSelect',
		function(){
			$("input[name='bondCntr.coutertyBankAcctNo']").val($(this).val());
	});
//---------------------------------------//期限的计算
	function calculateDaysInterval(){
			//交易日期/交割日期/到期日
			var tradeDate 	   = $("#repoElement input[name='bondCntr.tradeDate']");
			var deliveryDate   = $("#repoElement input[name='bondCntr.deliveryDate']");
			var maturityDate   = $("#repoElement input[name='bondCntr.maturityDate']");
			//清算速度
			var settleDateType = $("#repoElement select[name='bondCntr.settleDateType']").val();
			if(settleDateType==""){
				deliveryDate.val("");
				$("input[name='bondCntr.maturityAmount']").val('');
				$("#mAmount_transDirection_"+$("#transDirection").val()).val('');
				$("#dateInterval").val('');
				$("input[name='bondCntr.maturityAmount']").change();
			}
			if(settleDateType=="0")
				//deliveryDate.val(getNonHoliday(tradeDate.val()));
				deliveryDate.val(tradeDate.val());
			if(settleDateType=="1")
				deliveryDate.val(getNonHoliday(addDay(tradeDate.val(),1)).toString());
			if(deliveryDate.val()&&maturityDate.val()){
			//用交割日期和顺延下的到期日来计算期限
				$("#dateInterval").val(calculateDays(deliveryDate.val(),getNonHoliday(maturityDate.val())));
				calculateMaturityAmount();
			}
	}
	//修改交易日期/到期日        改变清算速度的时候触发期限计算
	$(document).on("blur","#repoElement input[name='bondCntr.tradeDate'],#repoElement input[name='bondCntr.maturityDate']",
		calculateDaysInterval
		);
	$(document).on("change","#repoElement select[name='bondCntr.settleDateType']",
		calculateDaysInterval
		);
//---------------------------------------//输入回购利率触发到期金额计算
	$(document).on('blur','input[name="bondCntr.repoInterestRate"]',
		function(){
			calculateMaturityAmount();
	});
	
//---------------------------------------//正逆回购切换
/**
	$(document).on('change','#transDirection',
		function(){
			//隐藏债券信息部分所有的信息
			$(".transDirection_").hide();
			//根据选择的正逆回购显示对应的信息
			var str ="transDirection_"+$(this).val();
			$("#"+str).show();
			//移除所有标记
			$('.transDirection_ tbody tr').removeClass("justMark1");
			//移除所有旗帜图片
			$(".flagImg").remove();
			//显示正逆回购对应的的券面总额/首期金额/到期金额
			$("input[name='bondCntr.BONDAM']").val($("#amount_"+str).val());
			$("input[name='bondCntr.ropoInitialAmount']").val($("#rAmount_"+str).val());
			//当在正/逆回购才输入回购利率的时候    逆/正回购的到期金额并有存在隐藏框中
			//所以切换时不会显现   故切换时重新计算到期金额   到期金额的传值和大写提示两步
			//$("input[name='bondCntr.maturityAmount']").val($("#mAmount_"+str).val());
			//showChineseNum();
			calculateMaturityAmount();
	});
*/
	
	
						//*********逆回购*********//
//---------------------------------------//验证逆回购输入的债券代码是否存在
	$(document).on('blur','#transDirection_1_bondCode',
		function (){
			var bondCode = $("#transDirection_1_bondCode").val();
			//如果未输入债券代码  则不验证
			if(!bondCode)
				return;
			$.ajax({
				type : "post",
				global : false,
				async : false,
				url : '/cpms/linkus/capital/bond/bussiness/bondPublic/findTheBondByCode',
				data : { 
					"bondCode":bondCode
				},
				dataType : "json",
				success : function(data) {
				 if (data != null) 
				 	if(data.ifNull){
				 		getTheMessager().alert("提示",data.tip,'',function(){
				 			$("#transDirection_1_bondCode").focus();
				 		});
				 	}else{
				 		$("#transDirection_1_BONDAM").focus();
				 	}
				},
				error:function(){
					doTheAlert('提示', errorTip);
				}
			});
	});
//---------------------------------------//逆回购四个按钮的功能
	//增加
	$(document).on('click','#transDirection_1_add',
		function(){
			ifEdit = false;
			//选定四个信息框
			var $info4 = $("#transDirection_1_info4 input,#transDirection_1_info4 select");
			//消除readonly属性  清空内容
			$info4.removeAttr("readonly");
			$info4.removeAttr("disabled");
			$info4.val("");
			$("#occupyLimitType").val('1');
//			//设置默认的占用额度为对手方
//			$info4.eq(3).val("1");
			$info4.eq(0).focus();
			
	});
	//修改
		//状态：是否点击修改
	var ifEdit = false;
	$(document).on('click','#transDirection_1_edit',
		function(){
			if($("#transDirection_1 .justMark1").length>0){
				//选定四个信息框
				var $info4 = $("#transDirection_1_info4 input,#transDirection_1_info4 select");
				//消除readonly属性	
				$info4.removeAttr("readonly");
				$info4.removeAttr("disabled");
				//找到被标记行中的数据列
				var editTds = $(".justMark1 td input");
				//将行内的数据显示到上方的信息框中
				$info4.eq(0).val(editTds.eq(0).val());
				$info4.eq(1).val(getMoneyValue(editTds.eq(1).val())).change();
				$info4.eq(2).val(editTds.eq(2).val());
				$info4.eq(3).val(editTds.eq(4).val()=='对手方'?0:1);
				//进入修改状态
				ifEdit = true;
			}
	});
	//删除 
	$(document).on('click','#transDirection_1_remove',
		function(){
			//获取选中行的债券代码
			var bondCode = $(".justMark1 td input").eq(0).val();
			var trLength = $("#transDirection_1 tbody tr").length;
			//非空才删除
			if( bondCode )//此判断条件只是为了没有标记行时      点击删除按钮不弹出confirm框  影响用户体验
				getTheMessager().confirm("提示",'确定是要删除"'+bondCode+'"的信息吗？',function(e){
					if(e){
						//券面总额/首期金额
						var totalAmount = $("input[name='bondCntr.BONDAM'],#amount_transDirection_1");
						var ropoInitialAmount = $("input[name='bondCntr.ropoInitialAmount'],#rAmount_transDirection_1");
						$input = $(".justMark1 td input");
						var amount_index = parseFloat(getMoneyValue(totalAmount.val())-removeThousandCharacter($input.eq(1).val()?$input.eq(1).val():0)).toFixed(6);
						totalAmount.val(amount_index==0?"":amount_index).change();
						amount_index = parseFloat(getMoneyValue(ropoInitialAmount.val())-removeThousandCharacter($input.eq(3).val()?$input.eq(3).val():0)).toFixed(6);
						ropoInitialAmount.val(amount_index==0?"":amount_index);
						//到期金额
						calculateMaturityAmount();
						//若有多行则删除本行   一行则清空该行数据
						if(trLength>1){
								var index = $("#transDirection_1 tbody tr[class='justMark1']").index();
								//删除标记行  通过点击本行的"-"号来实现
								$("#transDirection_1 .justMark1").children("[class='manipulate']").children().eq(1).click();
//								transDirection_1_trs = $("#transDirection_1 tbody tr");
								//重新写序号
								for(var i= index;i<trLength-1;i++){
									$("#transDirection_1 tbody tr").eq(i).children().eq(0).children().text(i+1);
								}
								//标记下一行   若删除的是最后一行  则标记上一行
								var $nextLine = $("#transDirection_1 tbody tr").eq(trLength == index+1?index-1:index);
								$nextLine.click();
								$nextLine.children().eq(1).children().focus();
						}else{
							//移除标记
							$("#transDirection_1 tbody tr").removeClass("justMark1");
							//移除所有旗帜图片
							$(".flagImg").remove();
							//清空第一行信息
							var trInfo = $("#transDirection_1 tbody tr td").children();
							trInfo.eq(0).text("");
							trInfo.val("");
							trInfo.children().val("");//因层次不一样,需单独清除融资金额
						}
					}
			 	});
	});
	//提交
	var flag_cancelCheckDouble = false;
	$(document).on('click','#transDirection_1_check',
		function (){
			var noEmpty = true;
			//选定四个信息框
			var $info4 = $("#transDirection_1_info4 input,#transDirection_1_info4 select");
			//如果信息框是只读状态   则结束该方法
			if($info4.eq(0).attr("readonly"))
				return;
			//若四个信息框有未填写的  则弹窗提示  并聚焦到对应的信息框
			for(var i=0;i<$info4.length;i++){
				if(!$info4.eq(i).val()){
					getTheMessager().alert("提示","债券信息录入不完整，请完善",'',function(){
				 		$info4.eq(i).focus();
				 	});
					return;
				}
			}
			//目标列
			var $inputs;
			//券面总额/首期金额
			var totalAmount = $("input[name='bondCntr.BONDAM']");
			var hiddenAmount1 = $("#amount_transDirection_1");
			var ropoInitialAmount = $("input[name='bondCntr.ropoInitialAmount']");
			var hiddenRAmount1 = $("#rAmount_transDirection_1");
			var flag_fullAmount = true;
			
			//获取现有表格的所有行，查找有无重复的债券代码
			var bondCode = $info4.eq(0).val();
			var $zcit = $("#zqCntrInfoTable_1 tbody tr");
			for (var i = 0; i < $zcit.length; i++){
				var $mark = $("#zqCntrInfoTable_1 tbody tr[class='justMark1']");
				if (ifEdit && $mark.length){
					if ($zcit.eq(i).children().eq(1).children("input").val() == bondCode){
						continue;
					}
				}
				if ($zcit.eq(i).children().eq(1).children("input").val() == bondCode){
					doTheAlert('提示','已添加过该债券');
					return;
				}
			}
			
			//根据状态体现出修改和新增的功能
			if(ifEdit){
				//选定目标行中的目标列
				$inputs = $(".justMark1 td input");
				//减去原来的面值
				var totalAmount_ = (parseFloat(getMoneyValue(totalAmount.val())-getMoneyValue($inputs.eq(1).val())));
				totalAmount.val(totalAmount_?totalAmount_.toFixed(2):0);
				var ropoInitialAmount_ = (parseFloat(getMoneyValue(ropoInitialAmount.val()))-getMoneyValue($inputs.eq(3).val()));
				ropoInitialAmount.val(ropoInitialAmount_?ropoInitialAmount_.toFixed(2):0);
				//结束修改状态
				ifEdit = true;
			}else{
				//获取表格中第一行的债券信息
				noEmpty = $("#zqCntrInfoTable_1 tbody tr:first td").eq(1).children().val();
				//上述信息非空  则点击最后一行的加号  添加新的一行
				if( noEmpty ){
					$("#zqCntrInfoTable_1 tr:last td:last i:first").click();
				}
				//选定目标行中的目标列
				$inputs = $("#zqCntrInfoTable_1 tr:last td input");
			}
			//将行内信息框中的数据显示到目标行对应的列中
			$inputs.eq(0).val($info4.eq(0).val());
			$inputs.eq(1).val(getMoneyValue($info4.eq(1).val())).change();
			$inputs.eq(2).val($info4.eq(2).val());
			var itemAmount = parseFloat(getMoneyValue($info4.eq(1).val())*$info4.eq(2).val()*100.00).toFixed(2);
			$inputs.eq(3).val(itemAmount).change();
			$inputs.eq(4).val($info4.eq(3).find("option:selected").text());
			$inputs.eq(5).val($info4.eq(3).val());
			//计算新的券面总额/首期金额
			var totalAmountV = parseFloat(totalAmount.val()).toFixed(6)?getMoneyValue(totalAmount.val()):0;
			var newAmountV = ($inputs.eq(1).val())?getMoneyValue($inputs.eq(1).val()):0;
			
			var ropoInitialAmountV = (ropoInitialAmount.val())?getMoneyValue(ropoInitialAmount.val()):0;
			var newRopoInitialAmountV = ($inputs.eq(3).val())?getMoneyValue($inputs.eq(3).val()):0;
			if(!noEmpty){
				totalAmountV = 0;
				ropoInitialAmountV = 0;
			}
			totalAmount.val((totalAmountV*1+newAmountV*1).toFixed(6)).change();
			ropoInitialAmount.val((ropoInitialAmountV*1+newRopoInitialAmountV*1).toFixed(2)).change();
			//到期金额
			calculateMaturityAmount();
			//将标记移至此行
			$("#zqCntrInfoTable_1 tbody tr:last td:first").children().text($("#zqCntrInfoTable_1 tbody tr").length);
			$inputs.attr("readonly","");
			$inputs.click();
			//清除信息框内容  并锁定只读
//			$("#transDirection_1 div[class='row'] div[class='span2'] span").eq(2).text("");
			$info4.val("");
			$info4.attr("readonly","readonly");
			$("#transDirection_1_info4 select").attr("disabled",true);
			//聚焦新行债券代码列
			$inputs.eq(0).focus();
	});
	
	//到期日与起息日的判断
	$(document).on('blur','input[name="bondCntr.maturityDate"]',function(){
		var tradeDate = $("input[name='bondCntr.tradeDate']");
		var maturityDate = $("input[name='bondCntr.maturityDate']");
		var days = calculateDays(tradeDate.val(),maturityDate.val());
		if(days<0){
			doTheAlert('提示','起息日大于到期日');
			$("input[name='bondCntr.deadLine']").val(0);
			maturityDate.val(tradeDate.val());
		}
		
	});
	$(document).on('blur','input[name="bondCntr.tradeDate"]',function(){
		var tradeDate = $("input[name='bondCntr.tradeDate']");
		var maturityDate = $("input[name='bondCntr.maturityDate']");
		var days = calculateDays(tradeDate.val(),maturityDate.val());
		if(days<0){
			doTheAlert('提示','起息日大于到期日');
			$("input[name='bondCntr.deadLine']").val(0);
			maturityDate.val(tradeDate.val());
		}
		
	});
	
						//*********正回购*********//
//国库现金到期存款要共用正回购的js  抽取公用了

	
	
						//*********更正MD*********//	
						
//********************************质押式回购  End*********************************//
	
});

//去除明细表中的千分号
function  removeTheItemsThousandCharacter(){
	var transDirection = $("#transDirection").val();
	var str="transDirection_"+transDirection;
	var index1 = (transDirection==0?5:(transDirection==1?2:-1));
	var index2 = (transDirection==0?6:(transDirection==1?4:-1));
	var input1 = null , input2=null;
	var $trs = $("#"+str+" tbody tr");
	for(var i=0;i<$trs.length;i++){
		input1 = $trs.eq(i).children().eq(index1).children();
		input2 = $trs.eq(i).children().eq(index2).children();
		if(input1)
		input1.val(removeThousandCharacter(input1.val()));
		if(input2)
		input2.val(removeThousandCharacter(input2.val()));
	}
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
	
	function dealBondData(){
		
		var deliveryDate = $("input[name='bondCntr.deliveryDate']");
		var maturityDate = $("input[name='bondCntr.maturityDate']");
		if(calculateDays(deliveryDate.val(),maturityDate.val())<=0){
			doTheAlert("提示","到期日必须在交割日之后。");
			return false;
		}
		
		//明细检查
		var $table = $("#zqCntrInfoTable_1");
		var $trs;
		if ($table.length == 1){ //是逆回购
			$trs = $("#zqCntrInfoTable_1 tbody tr");
		}
		$table =  $("#zqCntrInfoTable");
		if ($table.length == 1){ //是正回购
			$trs = $("#zqCntrInfoTable tbody tr");
		}
		var v = $trs.eq(0).children().eq(1).children("input").val();
		if (v == "" || v == null){
			doTheAlert("提示","未添加债券明细！");
			return false;
		}
		
		var liquidationMode = $("#liquidationMode").val();
		if (liquidationMode == "请选择" || liquidationMode == null){
			doTheAlert("提示","未选择清算方式！");
			return false;
		}
		
		//保存前根据正/逆回购   删掉不需要的表格
		var transDirection = $("#transDirection").val();
//		var option = {
//			type:"post",
//			dataType:"json",
//			async:false,
//			success:function(data){
//				RG_MDInvok(data);
//			},
//			error:function(){
//				doTheAlert("提示","经办操作失败");
//			}
//		};
		removeTheItemsThousandCharacter();
		$("select[name='bondCntr.TRADTP']").removeAttr('disabled');
		$("select[name='bondCntr.transMode']").removeAttr('disabled');
//		if(transDirection==0)
//			$("#t20005Bond_form").ajaxSubmit(option);
//		else
//			$("#t20012Bond_form").ajaxSubmit(option);
//		$("select[name='bondCntr.TRADTP']").attr('disabled','');
		return true;
	}



