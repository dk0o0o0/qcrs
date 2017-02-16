/*************************************************************************************************
/* DESC       ：债券分销卖出ＪＳ处理文件                                                                                                                                                                                 
/* AUTHOR     ：大资管平台项目组                                                                                                                                                                                 
/* CREATE     ：2016-04-05                                     
/* MODIFYLIST ： Name          Date         Reason                                                
/*              yourName      updateDate    modiReason                                               
/*              -------------------------------------------------------------   
*************************************************************************************************/

$(function(){
	
		$(document).on('click','#btn_close_zqPrSearch',closePage);
	
	//--------------------------------------//点击选择债券跳转
	$(document).on('click','#chooseBond',function(){
		var bondCode = $("#bondCode").val();//债券代码
		var BONDAM = getMoneyValue($("#BONDAM").val());//券面面值
		var transAmount = getMoneyValue($("#transAmount").val());//分销金额
		var $totalBONDAM = $("#bond20009Table tbody td[class='totalBONDAM']");//明细中面值列
		var totalBONDAM=0;//明细中总面值
		//总面值
		for(var i=0;i<$totalBONDAM.length;i++){
			bondAm = getMoneyValue($("input[name='bondCntr.teamBookItems["+i+"].BONDAM']").val());
			totalBONDAM +=  bondAm*1;//求出总和 (*1是为了可以直接相加,而不是拼接字符串)
		}
		var amount = BONDAM*1-totalBONDAM*1;//剩余面值
		if(amount<0){
			doTheAlert("提示","当前明细总面值: "+(totalBONDAM*10000)+" 大于券面面值: "+(BONDAM*10000));
			return;
		}
		if(!bondCode){
			$.messager.alert('提示','请输入债券代码!');
			$("#bondCode").focus();
			return;
		}
		if(!BONDAM){
			$.messager.alert('提示','请输入券面面值!');
			$("#BONDAM").focus();
			return;
		}
		if(!transAmount){
			$.messager.alert('提示','请输入分销金额!');
			$("#transAmount").focus();
			return;
		}
		window.open('/cpms/linkus/capital/bond/bussiness/t20009Bond/chooseBond?bondCode='+bondCode+'&BONDAM='+amount,{width:'80%'});
	});
	
	//---------------------------------------添加标记
	$(document).on('click','#bond20009Table tbody tr',
		function(){
			//移除所有标记
			$("#bond20009Table tbody tr").removeClass("justMark1");
			//添加标记
			$(this).toggleClass("justMark1");
			//设置当前行背景色，并清除除当前行外其他行的背景色
			$(this).siblings().css("background-color","");
			$(this).css("background-color","#ffe48d");
	});
	
	//----------------------------------------//删除
	$(document).on('click','#deleteBond',function(){
		//获取选中行的债券代码
		var bondCode = $(".justMark1 td input").eq(0).val();
		var trLength = $("#bondSaletrInfoTable_1 tbody tr").length;
		//非空才删除
		if( bondCode )//此判断条件只是为了没有标记行时      点击删除按钮不弹出confirm框  影响用户体验
			getTheMessager().confirm("提示",'确定是要删除"'+bondCode+'"的信息吗？',function(e){
				if(e){
				var tr = $(".justMark1 td").parent();
				tr.remove();
				//移除标记
				$("#bondSaletrInfoTable_1 tbody tr").removeClass("justMark1");
					
				
				//更新序号下标
				var length = $("#bond20009Table tbody td[class='totalBONDAM']").length;
				var h="";
				var index = 0;
				if(length>0){
					ok:for(var i=0;i<length;i++){
						
						var assetsTypeName = $("input[name='bondCntr.teamBookItems["+i+"].assetsTypeName']").val();
						var teamName = $("input[name='bondCntr.teamBookItems["+i+"].teamName']").val();
						var BONDAM = $("input[name='bondCntr.teamBookItems["+i+"].BONDAM']").val();
						var transAmount = $("input[name='bondCntr.teamBookItems["+i+"].transAmount']").val();
						var bondCode = $("input[name='bondCntr.teamBookItems["+i+"].bondCode']").val();
						var YSYJ = caliItemYSYJ(BONDAM);
						var subjectMappingCode = $("input[name='bondCntr.teamBookItems["+i+"].subjectMappingCode']").val();
						var bookId = $("input[name='bondCntr.teamBookItems["+i+"].bookId']").val();
						var assetsType = $("input[name='bondCntr.teamBookItems["+i+"].assetsType']").val();
						var teamId = $("input[name='bondCntr.teamBookItems["+i+"].teamId']").val();
						if(bondCode==undefined){
							i=i+1;
							var assetsTypeName = $("input[name='bondCntr.teamBookItems["+i+"].assetsTypeName']").val();
							var teamName = $("input[name='bondCntr.teamBookItems["+i+"].teamName']").val();
							var BONDAM = $("input[name='bondCntr.teamBookItems["+i+"].BONDAM']").val();
							var transAmount = $("input[name='bondCntr.teamBookItems["+i+"].transAmount']").val();
							var bondCode = $("input[name='bondCntr.teamBookItems["+i+"].bondCode']").val();
							var YSYJ = caliItemYSYJ(BONDAM);
							var subjectMappingCode = $("input[name='bondCntr.teamBookItems["+i+"].subjectMappingCode']").val();
							var bookId = $("input[name='bondCntr.teamBookItems["+i+"].bookId']").val();
							var assetsType = $("input[name='bondCntr.teamBookItems["+i+"].assetsType']").val();
							var teamId = $("input[name='bondCntr.teamBookItems["+i+"].teamId']").val();
							if(bondCode==undefined){
								continue ok;
						 }
						}
						
						h += '<tr>'+			
				   			'<td><center><input name="bondCntr.teamBookItems['+index+'].assetsTypeName" value="'+assetsTypeName+'" 		readonly=true width="15px;" style="background-color: transparent;border:none;text-align:center"/></center></td>'+
				   			'<td><center><input name="bondCntr.teamBookItems['+index+'].teamName"     value="'+teamName+'" 			readonly=true width="15px;" style="background-color: transparent;border:none;text-align:center"/></center></td>'+
				   			'<td class="totalBONDAM"><center><input name="bondCntr.teamBookItems['+index+'].BONDAM"     value="'+BONDAM+'"	class="noatoc amount tenthousand"	readonly=true width="15px;" style="background-color: transparent;border:none;text-align:center"/></center></td>'+
				   			'<td class="transAmount"><center><input name="bondCntr.teamBookItems['+index+'].transAmount"     value="'+transAmount+'"	class="noatoc amount"	readonly=true width="15px;" style="background-color: transparent;border:none;text-align:center"/></center></td>'+
				   			'<td><center><input name="bondCntr.teamBookItems['+index+'].receAccruedInterest"   value="'+YSYJ+'" class="noatoc amount" readonly=true width="15px;" style="background-color: transparent;border:none;text-align:center"/></center></td>'+			
				   			'<td style="display:none"><center><input name="bondCntr.teamBookItems['+index+'].subjectMappingCode" value="'+subjectMappingCode+'"  /></center></td>'+
				   			'<td style="display:none"><center><input  name="bondCntr.teamBookItems['+index+'].bookId" 	 value="'+bookId+'"   /></center></td>'+
				   			'<td style="display:none"><center><input name="bondCntr.teamBookItems['+index+'].bondCode"   value="'+bondCode+'" /></center></td>'+
				   			'<td style="display:none"><center><input  name="bondCntr.teamBookItems['+index+'].assetsType" value="'+assetsType+'" /></center></td>'+
				   			'<td style="display:none"><center><input  name="bondCntr.teamBookItems['+index+'].teamId" value="'+teamId+'" /></center></td>'+
						'</tr>';
						index+=1;
					}
				}
				$('#tabbody').html(h);
				$("#bond20009Table tbody tr input").attr('readonly','');
			}
		});
	});	
	
	//----------------------------------------//选定选择债券页面的一行传入到上方做录入
	$(document).on('dblclick','#tableToSwap #rightDiv tbody tr',
		function(){
			//清除所有行的标记
			$("#tableToSwap #rightDiv tbody tr td").removeClass("justMark");
			//给该行添加标记   以便修改信息的传递
			$(this).children("td").eq(0).addClass("justMark");
			var $tr = $(this).children(".justMark").parent("tr");
			
			$("#CB_BONDAM").val($(this).children("td[class='CB_BONDAMCanUse']").text());//券面信息的面值为td可用面值
			$("#CB_bondTeam").val($tr.children("td[class='CB_bondTeam']").children().children().val());
			$("#CB_assetsType").val($tr.children("td[class='CB_assetsType']").children().children().val());
			
			var str = $tr.children().eq(0).children().children().val();//获取序号
			if($('#checkname'+str).is(':checked')==true){//判断是否选中
				$('#checkname'+str).prop("checked", false);
			}else{
				$('#checkname'+str).prop("checked", true);
			}
			
		});
		
	//----------------------------------------//点击选择债券页面的提交将修改后的数据传入td中
	$(document).on('click','#sureSubmit',function(){
		var CB_BONDAM = getMoneyValue($("#CB_BONDAM").val());//券面信息的面值
		var CB_BONDAMCanUse = getMoneyValue($("#CB_BONDAMCanUse").val());//券面信息的剩余面值
		var CB_BONDAMSaled = getMoneyValue($("#CB_BONDAMSaled").val());//用户输入的券面信息的卖出券面金额
		var CB_transAmount = getMoneyValue($("#CB_transAmount").val());//用户输入的券面信息的分销金额
		if(CB_BONDAM*1 == "" && CB_BONDAM!=0){
			$.messager.alert('提示','请选择债券!');
			return;
		}
		if(CB_BONDAMSaled*1<0){
			$.messager.alert('提示','输入有误!');
			return;
		}
		if(CB_BONDAMCanUse*1==0){
			$.messager.alert('提示','剩余面值不足!');
			return;
		}
		//判断输入的数值是否合理
		if(CB_BONDAMSaled*1>CB_BONDAM*1){
			alert("卖出券面面值大于可用面值!");
			$("#CB_BONDAMSaled").focus();
			return;
		}
		if(CB_BONDAMSaled*1>CB_BONDAMCanUse*1){
			alert("卖出券面面值大于剩余面值!");
			$("#CB_BONDAMSaled").focus();
			return;
		}
		
		var $tr = $("#tableToSwap #rightDiv tbody td[class='justMark']").parents("tr");//选中点击行
		
		var BONDAMSaled = $tr.children("td[class='CB_BONDAMSaled']").children().children();//债券信息下方的卖出券面金额
		BONDAMSaled.val((getMoneyValue(BONDAMSaled.val())*1+CB_BONDAMSaled*1).toFixed(6));
		var CB_BONDAMCanUse = getMoneyValue($("#CB_BONDAMCanUse").val())*1-CB_BONDAMSaled*1;
		$("#CB_BONDAMCanUse").val((CB_BONDAMCanUse*1).toFixed(6)).change();
		
		var transAmount = $tr.children("td[class='CB_transAmountTable']").children().children();//债券信息下方的分销金额
		transAmount.val(getMoneyValue(transAmount.val())*1+CB_transAmount*1);
	});
	
	//--------------------------------------//将选择债券页面的值保存到input页面
	$(document).on('click','#btn_zqPrSearch',function(){
		
		/**1.2**/
		var h="";
		var str=$('#itemsTable tbody tr').length;//数据条数
//		var index = 0;
		var index = $("#bond20009Table tbody td[class='totalBONDAM']").length;
		ok:for(var i=0;i<str*1;i++){
			if(!$("#BONDAM"+i).val()){
				 continue ok;
			}else{
				var val=i;
				var assetsTypeName = $("#assetsTypeName"+val).val();//资产类型中文
				var teamName = $("#teamName"+val).val();//投组名称
				var BONDAM = getMoneyValue($("#BONDAM"+val).val());//面值
				
				var YSYJ = caliItemYSYJ(BONDAM);
				
				var transAmount = getMoneyValue($("#transAmount"+val).val());//金额
				var bondCode =$("#bondCode"+val).val();//债券代码
//				var YSYJ =getMoneyValue($("#YSYJ"+val).val());//应收应计
				
				var subjectMappingCode = $("#subjectMappingCode"+val).val();//隐藏值业务代号
				var bookId = $("#bookId"+val).val();//隐藏值bookId
				var assetsType = $("#assetsType"+val).val();//资产类型
				var teamId = $("#teamId"+val).val();//投组Id
				if(BONDAM==""||transAmount==""){
					doTheAlert("提示","表格中存在已勾选却未输入面值或金额的债券!");
					return false;
				}
			
				var $dest = $("#tabbody tr");
				for (var j=0; j<$dest.length; j++){
					if ($dest.eq(j).children().eq(9) != null){
						if (teamId == $dest.eq(j).children().eq(9).children().children().attr("value")){
							doTheAlert("提示","已添加该投组!");
							return false;
						}
					}
				}
				
				h += '<tr>'+			
			   			'<td><center><input name="bondCntr.teamBookItems['+index+'].assetsTypeName" value="'+assetsTypeName+'" 		readonly=true width="15px;" style="background-color: transparent;border:none;text-align:center"/></center></td>'+
			   			'<td><center><input name="bondCntr.teamBookItems['+index+'].teamName"     value="'+teamName+'" 			readonly=true width="15px;" style="background-color: transparent;border:none;text-align:center"/></center></td>'+
			   			'<td class="totalBONDAM"><center><input name="bondCntr.teamBookItems['+index+'].BONDAM"     value="'+BONDAM+'"	class="noatoc amount tenthousand"	readonly=true width="15px;" style="background-color: transparent;border:none;text-align:center"/></center></td>'+
			   			'<td class="transAmount"><center><input name="bondCntr.teamBookItems['+index+'].transAmount"     value="'+transAmount+'"	class="noatoc amount"	readonly=true width="15px;" style="background-color: transparent;border:none;text-align:center"/></center></td>'+
			   			'<td><center><input name="bondCntr.teamBookItems['+index+'].receAccruedInterest"   value="'+YSYJ+'" class="noatoc amount" readonly=true width="15px;" style="background-color: transparent;border:none;text-align:center"/></center></td>'+			
			   			'<td style="display:none"><center><input name="bondCntr.teamBookItems['+index+'].subjectMappingCode" value="'+subjectMappingCode+'"  /></center></td>'+
			   			'<td style="display:none"><center><input  name="bondCntr.teamBookItems['+index+'].bookId" 	 value="'+bookId+'"   /></center></td>'+
			   			'<td style="display:none"><center><input name="bondCntr.teamBookItems['+index+'].bondCode"   value="'+bondCode+'" /></center></td>'+
			   			'<td style="display:none"><center><input  name="bondCntr.teamBookItems['+index+'].assetsType" value="'+assetsType+'" /></center></td>'+
			   			'<td style="display:none"><center><input  name="bondCntr.teamBookItems['+index+'].teamId" value="'+teamId+'" /></center></td>'+
					'</tr>';
				index +=1;
			}
		}
	
		$('#tabbody').append(h);
		
		var receAccruedInterest = getMoneyValue($("input[name='bondCntr.receAccruedInterest']").val());//页面上的应收应计利息
		var $transAmount = $("#bond20009Table tbody td[class=transAmount]");
		var $lastYSYJ = $("input[name='bondCntr.teamBookItems["+($transAmount.length-1)+"].receAccruedInterest']");
		var totalYSYJ=0;
		for(var i=0;i<$transAmount.length-1;i++){
			var ysyj = getMoneyValue($("input[name='bondCntr.teamBookItems["+i+"].receAccruedInterest']").val());
			totalYSYJ += (ysyj)*1;
		}
		$lastYSYJ.val((receAccruedInterest-totalYSYJ).toFixed(2));
		
		//添加到目标表中显示readOnly属性
		$("#bond20009Table tbody tr input").attr('readonly','');
		closePage();
	});
	
	
	//---------------------------------------//页面的保存
	$(document).on('click','#doBondDistributionSale',dealBondData);
});
//分销卖出时计算明细中的应收应计利息
function caliItemYSYJ(BONDAM){
	var receAccruedInterest = getMoneyValue($("input[name='bondCntr.receAccruedInterest']").val());//页面上的应收应计利息
	var bondAmount = getMoneyValue($("input[name='bondCntr.BONDAM']").val());//页面上的券面面值
	var YSYJ = ((BONDAM/bondAmount)*receAccruedInterest).toFixed(2);//按照所选明细所占券面面值分摊应收应计利息
	return YSYJ;
}


function dealBondData(){
	//判断交割日期是否在债券到期日之前
	var bool = compareToDeliveryDate($("#matureDate").val(),$("input[name='bondCntr.deliveryDate']").val(),"分销日期: ");
	if(!bool){
		return false;
	}
	var $transAmount = $("#bond20009Table tbody td[class=transAmount]");
	if($transAmount.eq(0).children().children().val()==""){
		doTheAlert("提示","交易明细信息不能为空!");
		return false;
	}
	
	if($("input[name='bondCntr.podageAmt']").val()!=""){
		if($("input[name='bondCntr.disribonPayDate']").val()==""){
			doTheAlert("提示","已收取手续费,请输入手续费收取日期!");
			return false;
		}
	}
	var totalTransAmount = 0;//明细中的总金额
	for(var i=0;i<$transAmount.length;i++){
		var transAmountItem = getMoneyValue($("input[name='bondCntr.teamBookItems["+i+"].transAmount']").val());
		totalTransAmount += transAmountItem*1;
	}
	var totalBONDAM = 0;//明细中的总面值
	for(var i=0;i<$transAmount.length;i++){
		 var BONDAMItem = getMoneyValue($("input[name='bondCntr.teamBookItems["+i+"].BONDAM']").val());
		totalBONDAM += BONDAMItem*1;  	
	}
	var BONDAM = getMoneyValue($("#BONDAM").val());//券面面值
	var transAmount = getMoneyValue($("#transAmount").val());//分销金额
	if(totalBONDAM != BONDAM){
		doTheAlert("提示","敞口中面值与明细不符!");
		return false;
	}
	if(totalTransAmount != transAmount){
		doTheAlert("提示","敞口中金额与明细不符!");
		return false;
	}
	
	return true;
}