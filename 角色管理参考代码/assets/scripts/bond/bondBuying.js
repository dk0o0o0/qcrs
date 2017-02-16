$(function(){
	$(document).on('click','#btn_close_zqPrSearch',closePage);
	//****************************债券买入  Begin***********************************//
//	$('#accountInfo').panel('close');//隐藏panel
	
	
	//---------------------------------------//给页面加上投组信息
	function showBondTeamListInfo(assetsType,userName,trIndex){
		var selectObj = $("select[name='bondCntr.teamBookItems["+trIndex+"].teamId']")[0];
		$(selectObj).find("option").remove();
		var html = "<option>请选择</option>";
		$.ajax({
				type : "post",
				global : false,
				async : true,
				url : '/cpms/linkus/capital/bond/bussiness/bondPublic/findTeamListByUserNameAndType',
				data : {"assetsType":assetsType},
				dataType : "json",
				success : function(data) {
				 if (data != null) {
					var z=0;
					if(typeof(data.bondTeamList) !="undefined" )
				 		z = data.bondTeamList.length;
					for(var i=0;i<z;i++){
						var bondTeam = data.bondTeamList[i];
						//console.log("bondTeam " + bondTeam);
						if(bondTeam!=null){
							html += "<option value='"+bondTeam.teamId+"' >"+bondTeam.teamName+"</option>";
						}
					}
					$(selectObj).append(html);
				 }
				},
				error:function(){
					doTheAlert('提示', errorTip);
				}
			});
	}
	
	//点击一行添加标记
	$(document).on('click','#bondBuyingtrInfoTable_0 tbody tr',
		function(){
			//移除所有标记
			$("#bondBuyingtrInfoTable_0 tbody tr").removeClass("justMark");
			//添加标记
			$(this).addClass("justMark");
	});
	//------------根据选择的资产类型生成不同的投组
	$(document).on('change','.justMark td[class="assetsType"]',function(){
		var assetsType = $(this).children().children().children().val();//获取当前选中的资产类型的值
		var userName = $("#userName").val();
		var trIndex = $(this).parent().parent().find("tr").index($(this).parent()[0]);
		showBondTeamListInfo(assetsType,userName,trIndex);
	});
	
	/*****************选择为是债券融入时明细部分处理******************************************/
	//---------------------------------------//是否债券融入切换bondBusiessStatus
	//切换显示是否债券融入时需要将另一个列表设为disabled，否则另一个列表会保存空，后面更正时删除后再保存会出问题
	$(document).on('change','#bondBusiessStatus',function(){
		//隐藏债券信息部分所有的信息
		$(".bondBusiessStatus_").hide();
		//根据选择的是否融入债券显示对应的信息
		var str ="bondBusiessStatus_"+$(this).val();
		$("#"+str).show();
//		saveOneitem();
	});
	/*$(document).on('change','#bondBusiessStatus',function(){
		saveOneitem();
	});*/
	
	
	//点击选择债券 跳转查询子页面
	$(document).on('click','#chooseBond',function(){
		var bondCode = $("input[name='bondCntr.bondCode']").val();
		var BONDAM = getMoneyValue($("input[name='bondCntr.BONDAM']").val());
		if(!bondCode){$.messager.alert('提示','请输入债券代码!');return;}
		if(!BONDAM){$.messager.alert('提示','请输入券面面值!');return;}
		
		window.open('/cpms/linkus/capital/bond/bussiness/t20001Bond/chooseBond?bondCode='+bondCode,{width:'80%'});
//		window.open('/cpms/linkus/capital/bond/bussiness/t20001Bond/chooseBond?bondCode='+bondCode+'&bondAmount='+amount+'&bondBusiessStatus='+bondBusiessStatus,{width:'80%'});
	});
	
	//添加标记(主页面删除明细用)
	$(document).on('click','#bondBuyingtrInfoTable_1 tbody tr',
		function(){
			//移除所有标记
			$("#bondBuyingtrInfoTable_1 tbody tr").removeClass("justMark1");
			//添加标记
			$(this).toggleClass("justMark1");
			//设置当前行背景色，并清除除当前行外其他行的背景色
			$(this).siblings().css("background-color","");
			$(this).css("background-color","#ffe48d");
	});
	
	//双击一行传入上方做录入 
	$(document).on('dblclick','#tableToSwap #rightDiv tbody tr',
		function(){
			//清除所有行的标记
			$("#tableToSwap #rightDiv tbody tr td").removeClass("justMark");
			//给该行添加标记   以便修改信息的传递
			$(this).children("td").eq(0).addClass("justMark");
			var $tr = $(this).children(".justMark").parent("tr");
			
			$("#CB_BONDAM").val($(this).children("td[class='CB_BONDAM']").text());//券面信息的面值为td可用面值
			$("#CB_bondTeam").val($tr.children("td[class='CB_bondTeam']").children().children().val());
			$("#CB_assetsType").val($tr.children("td[class='CB_assetsType']").children().children().val());
			var BONDAMToBuy = getMoneyValue($(this).children("td[class='CB_BONDAMToBuy']").children().children().val());
			$("#CB_BONDAMToBuy").val(BONDAMToBuy*1/10000);
		});
	
	//将录入的信息传入下方td中
	$(document).on('click','#sureSubmit',function(){
		var CB_BONDAM = getMoneyValue($("#CB_BONDAM").val());//券面信息的面值
		var CB_BONDAMToBuy = getMoneyValue($("#CB_BONDAMToBuy").val());//券面信息的剩余面值
		var CB_BONDAMBuy = getMoneyValue($("#CB_BONDAMBuy").val());//用户输入的券面信息的卖出券面金额
		if(CB_BONDAM=="")return;
		if(CB_BONDAMBuy==""||CB_BONDAMBuy*1==0){
			doTheAlert("提示","请输入正确的券面面值!");
			return;
		}
		if(CB_BONDAMBuy*1>CB_BONDAMToBuy*1){
			doTheAlert("提示","输入的券面面值大于待买入面值!");
			return;
		}
		
		var $tr = $("#tableToSwap #rightDiv tbody td[class='justMark']").parents("tr");//选中点击行
		var tr_BONDAMBuy = $tr.children("td[class='CB_BONDAMBuy']").children().children();//债券信息下方的卖出券面金额
		var BONDAMBuy = (getMoneyValue(tr_BONDAMBuy.val())*1+CB_BONDAMBuy*1).toFixed(6);
		if(BONDAMBuy*1>CB_BONDAMToBuy*1){
			doTheAlert("提示","可用面值不足!");
			return;
		}
		tr_BONDAMBuy.val(BONDAMBuy);
		
		$("#CB_BONDAMBuy").val("");
	});
	
	//将子页面的列表传入父页面
	$(document).on('click','#btn_zqPrSearch',function(){
		/**1.2**/
		var h="";
		var str=$('#itemsTable tbody tr').length;//数据条数
		var index = $("#bondBuyingtrInfoTable_1 tbody td[class='totalBONDAM']").length;
		
		if (index){
			for(var i=1;i<str+1;i++){
				if(!$("#BONDAM"+i).val())
					 continue;
				var teamId = $("#teamId"+i).val();//隐藏值投组ID
				for(var j=0;j<index;j++){
					if (teamId == $("#bondBuyingtrInfoTable_1 tbody tr").eq(j).children().eq(6).children().children("input").val()){
						doTheAlert("提示","已添加该投组");
						return;
					}
				}
			}
		}
		
		ok:for(var i=1;i<str*1+1;i++){
			if(!$("#BONDAM"+i).val()){
				 continue ok;
			}else{
				var val=i;
				var bondCode =$("#bondCode"+val).val();//债券代码
				var assetsTypeName = $("#assetsTypeName"+val).val();//资产类型中文
				var teamName = $("#teamName"+val).val();//投组名称
				var BONDAM = getMoneyValue($("#BONDAM"+val).val());//面值
				var subjectMappingCode = $("#subjectMappingCode"+val).val();//隐藏值业务代号
				var bookId = $("#bookId"+val).val();//隐藏值bookId
				var assetsType = $("#assetsType"+val).val();//资产类型
				var teamId = $("#teamId"+val).val();//隐藏值投组ID
				
				//$("#bondBuyingtrInfoTable_1 tbody tr").eq(i-1).children("[class='manipulate']").children().eq(0).click();
				
				
				h += '<tr>'+			
			   			'<td><center><input name="bondCntr.teamBookItems['+index+'].bondCode"   					  class="bondCode" value="'+bondCode+'" 		readonly=true width="15px;" style="background-color: transparent;border:none;text-align:center"/></center></td>'+			
			   			'<td><center><input name="bondCntr.teamBookItems['+index+'].assetsTypeName" 				  class="assetsTypeName" value="'+assetsTypeName+'" 		readonly=true width="15px;" style="background-color: transparent;border:none;text-align:center"/></center></td>'+
			   			'<td><center><input name="bondCntr.teamBookItems['+index+'].teamName"    					  class="teamName" value="'+teamName+'" 			readonly=true width="15px;" style="background-color: transparent;border:none;text-align:center"/></center></td>'+
			   			'<td class="totalBONDAM"><center><input name="bondCntr.teamBookItems['+index+'].BONDAM"       value="'+BONDAM+'"	class="noatoc amount tenthousand BONDAM" data\-scale="6" readonly=true width="15px;" style="background-color: transparent;border:none;text-align:center"/></center></td>'+
			   			'<td><center><input name="bondCntr.teamBookItems['+index+'].subjectMappingCode"               class="SMCode" value="'+subjectMappingCode+'" readonly=true width="15px;" style="background-color: transparent;border:none;text-align:center"/></center></td>'+
			   			'<td style="display:none"><center><input  name="bondCntr.teamBookItems['+index+'].bookId"     class="bookId" value="'+bookId+'" readonly=true width="15px;" style="background-color: transparent;border:none;text-align:center"/></center></td>'+
			   			'<td style="display:none"><center><input  name="bondCntr.teamBookItems['+index+'].assetsType" class="assetsType" value="'+assetsType+'" readonly=true width="15px;" style="background-color: transparent;border:none;text-align:center"/></center></td>'+
			   			'<td style="display:none"><center><input  name="bondCntr.teamBookItems['+index+'].teamId"     class="teamId" value="'+teamId+'" readonly=true width="15px;" style="background-color: transparent;border:none;text-align:center"/></center></td>'+
					'</tr>';
				index +=1;
				
			}
		}
		$('#tabbody').append(h);
		//添加到目标表中显示readOnly属性
		$("#bondBuyingtrInfoTable_1 tbody tr input").attr('readonly','');
//		saveOneitem();
		closePage();
	});
	
	//主页面删除
	//----------------------------------------//删除
	$(document).on('click','#deleteBond',function(){
		//获取选中行的债券代码
		var bondCode = $(".justMark1 td input").eq(0).val();
		var trLength = $("#bondBuyingtrInfoTable_1 tbody tr").length;
		//非空才删除
		if( bondCode )//此判断条件只是为了没有标记行时      点击删除按钮不弹出confirm框  影响用户体验
			getTheMessager().confirm("提示",'确定是要删除"'+bondCode+'"的信息吗？',function(e){
				if(e){
				var tr = $(".justMark1 td").parent();
				tr.remove();
				//移除标记
				$("#bondBuyingtrInfoTable_1 tbody tr").removeClass("justMark1");
		
				//更新序号以及下标
				var length = $("#bondBuyingtrInfoTable_1 tbody td[class='totalBONDAM']").length;//数据条数
				var h="";
				var index = 0;
				if(length>0){
					ok:for(var i=0;i<length;i++){
						
						var bondCode = $("#bondBuyingtrInfoTable_1 input[name='bondCntr.teamBookItems["+i+"].bondCode']").val();
						var assetsTypeName = $("#bondBuyingtrInfoTable_1 input[name='bondCntr.teamBookItems["+i+"].assetsTypeName']").val();
						var teamName = $("#bondBuyingtrInfoTable_1 input[name='bondCntr.teamBookItems["+i+"].teamName']").val();
						var BONDAM = $("#bondBuyingtrInfoTable_1 input[name='bondCntr.teamBookItems["+i+"].BONDAM']").val();
						var subjectMappingCode = $("#bondBuyingtrInfoTable_1 input[name='bondCntr.teamBookItems["+i+"].subjectMappingCode']").val();
						var bookId = $("#bondBuyingtrInfoTable_1 input[name='bondCntr.teamBookItems["+i+"].bookId']").val();
						var assetsType = $("#bondBuyingtrInfoTable_1 input[name='bondCntr.teamBookItems["+i+"].assetsType']").val();
						var teamId = $("#bondBuyingtrInfoTable_1 input[name='bondCntr.teamBookItems["+i+"].teamId']").val();
						if(bondCode==undefined){
							i=i+1;
							var bondCode = $("#bondBuyingtrInfoTable_1 input[name='bondCntr.teamBookItems["+i+"].bondCode']").val();
							var assetsTypeName = $("#bondBuyingtrInfoTable_1 input[name='bondCntr.teamBookItems["+i+"].assetsTypeName']").val();
							var teamName = $("#bondBuyingtrInfoTable_1 input[name='bondCntr.teamBookItems["+i+"].teamName']").val();
							var BONDAM = $("#bondBuyingtrInfoTable_1 input[name='bondCntr.teamBookItems["+i+"].BONDAM']").val();
							var subjectMappingCode = $("#bondBuyingtrInfoTable_1 input[name='bondCntr.teamBookItems["+i+"].subjectMappingCode']").val();
							var bookId = $("#bondBuyingtrInfoTable_1 input[name='bondCntr.teamBookItems["+i+"].bookId']").val();
							var assetsType = $("#bondBuyingtrInfoTable_1 input[name='bondCntr.teamBookItems["+i+"].assetsType']").val();
							var teamId = $("#bondBuyingtrInfoTable_1 input[name='bondCntr.teamBookItems["+i+"].teamId']").val();
							length=length+1;
							if(bondCode==undefined){
								continue ok;
						 	}
						}
						h += '<tr>'+			
				   			'<td><center><input name="bondCntr.teamBookItems['+index+'].bondCode"   					  class="bondCode" value="'+bondCode+'" 		readonly=true width="15px;" style="background-color: transparent;border:none;text-align:center"/></center></td>'+			
				   			'<td><center><input name="bondCntr.teamBookItems['+index+'].assetsTypeName" 				  class="assetsTypeName" value="'+assetsTypeName+'" 		readonly=true width="15px;" style="background-color: transparent;border:none;text-align:center"/></center></td>'+
				   			'<td><center><input name="bondCntr.teamBookItems['+index+'].teamName"    					  class="teamName" value="'+teamName+'" 			readonly=true width="15px;" style="background-color: transparent;border:none;text-align:center"/></center></td>'+
				   			'<td class="totalBONDAM"><center><input name="bondCntr.teamBookItems['+index+'].BONDAM"       value="'+BONDAM+'"	class="noatoc amount tenthousand BONDAM" data\-scale="6" readonly=true width="15px;" style="background-color: transparent;border:none;text-align:center"/></center></td>'+
				   			'<td><center><input name="bondCntr.teamBookItems['+index+'].subjectMappingCode"               class="SMCode" value="'+subjectMappingCode+'" readonly=true width="15px;" style="background-color: transparent;border:none;text-align:center"/></center></td>'+
				   			'<td style="display:none"><center><input  name="bondCntr.teamBookItems['+index+'].bookId"     class="bookId" value="'+bookId+'" readonly=true width="15px;" style="background-color: transparent;border:none;text-align:center"/></center></td>'+
				   			'<td style="display:none"><center><input  name="bondCntr.teamBookItems['+index+'].assetsType" class="assetsType" value="'+assetsType+'" readonly=true width="15px;" style="background-color: transparent;border:none;text-align:center"/></center></td>'+
				   			'<td style="display:none"><center><input  name="bondCntr.teamBookItems['+index+'].teamId"     class="teamId" value="'+teamId+'" readonly=true width="15px;" style="background-color: transparent;border:none;text-align:center"/></center></td>'+
						'</tr>';
						index+=1;
					}
				}
				$('#tabbody').html(h);
				$("#bondBuyingtrInfoTable_1 tbody tr input").attr('readonly','');
			}
		});
	/*****************选择为是债券融入时明细部分处理 END**************************************/
	});
});

$(document).on('change','.bond_team',function(){
	var $sels = $('.bond_team');
	for (var i=0;i<$sels.length;i++){
		if ($(this).is($sels.eq(i)))
			continue;
		if ($(this).val() == "" || $(this).val() == "请选择")
			continue;
		if ($(this).val() == $sels.eq(i).val()){
			doTheAlert("重复","已添加该投组");
			$(this).val("请选择");
		}
	}
});


////******************债券买入托管场所联动改变托管账号*******************//
//$(document).on('change','#escrowPlaceCode',function(){
//	 var escrowPlaceCode =$("#escrowPlaceCode").val();
//	 var counterpartyNo=$("#counterpartyNo").val();
//	 var counterpartyName =$("#counterpartyName").val();
//	 var option="";
//	 $.ajax({
//			type : "post",
//			global : false,
//			async : true,
//			url : '/cpms/linkus/capital/bond/bussiness/bondPublic/findCoutertyBankAcctNoInfo',
//			data : {"escrowPlaceCode":escrowPlaceCode,
//						"counterpartyNo":counterpartyNo},
//			dataType : "json",
//			success : function(data) {
//				if(data.list.length>0){
//					for(var i=0;i<data.list.length;i++){
//						option += '<option value='+data.list[i]+' >'+data.list[i]+'</option>';
//					}
//					$("#coutertyBankSelect").html(option);
//				}else{
//					doTheAlert("提示","亲该托管场所下没有"+counterpartyName+"托管账号，请补录！！");
//					$("#coutertyBankSelect").html("");
//				}
//			}
//	 });
//	
//});
//------------保存一条明细
function saveOneitem (status){
	
	var assetsType_0 = $("#bondBuyingtrInfoTable_0 .assetsTypeFlag");
	var bond_team_0 = $("#bondBuyingtrInfoTable_0 .bond_team");
	var BONDAM_0 = $("#bondBuyingtrInfoTable_0 .BONDAM");
	var SMCode_0 = $("#bondBuyingtrInfoTable_0 .SMCode");
	var teamName_0 = $("#bondBuyingtrInfoTable_0 .teamName");
	var bookId_0 = $("#bondBuyingtrInfoTable_0 .bookId");
	var bondCode_0 = $("#bondBuyingtrInfoTable_0 .bondCode");
	
	var bondCode_1 = $("#bondBuyingtrInfoTable_1 .bondCode");
	var assetsTypeName_1 = $("#bondBuyingtrInfoTable_1 .assetsTypeName");
	var teamName_1 = $("#bondBuyingtrInfoTable_1 .teamName");
	var BONDAM_1 = $("#bondBuyingtrInfoTable_1 .BONDAM");
	var SMCode_1 = $("#bondBuyingtrInfoTable_1 .SMCode");
	var bookId_1 = $("#bondBuyingtrInfoTable_1 .bookId");
	var teamId_1 = $("#bondBuyingtrInfoTable_1 .teamId");
	var assetsType_1 = $("#bondBuyingtrInfoTable_1 .assetsType");
	
	if(status=="0"){
		//移除债券融入为否时的明细的name，防止提交后台(这里绑定的是class)
		bondCode_1.removeAttr("name");
		assetsTypeName_1.removeAttr("name");
		teamName_1.removeAttr("name");
		BONDAM_1.removeAttr("name");
		SMCode_1.removeAttr("name");
		bookId_1.removeAttr("name");
		assetsType_1.removeAttr("name");
		teamId_1.removeAttr("name");
		
		var $tr_0 = $("#bondBuyingtrInfoTable_0 tbody tr");
		for(var i=0;i<$tr_0.length;i++){
			assetsType_0.eq(i).attr("name","bondCntr.teamBookItems["+i+"].assetsType");
			bond_team_0.eq(i).attr("name","bondCntr.teamBookItems["+i+"].teamId");
			BONDAM_0.eq(i).attr("name","bondCntr.teamBookItems["+i+"].BONDAM");
			SMCode_0.eq(i).attr("name","bondCntr.teamBookItems["+i+"].subjectMappingCode");
			teamName_0.eq(i).attr("name","bondCntr.teamBookItems["+i+"].teamName");
			bookId_0.eq(i).attr("name","bondCntr.teamBookItems["+i+"].bookId");
			bondCode_0.eq(i).attr("name","bondCntr.teamBookItems["+i+"].bondCode");		
		}
		
	}else if(status=="1"){
		//移除债券融入为是时的明细的name，防止提交后台(这里绑定的是class)
		assetsType_0.removeAttr("name");
		bond_team_0.removeAttr("name");
		BONDAM_0.removeAttr("name");
		SMCode_0.removeAttr("name");
		teamName_0.removeAttr("name");
		bookId_0.removeAttr("name");
		bondCode_0.removeAttr("name");

		var $tr_1 = $("#bondBuyingtrInfoTable_1 tbody tr");
		for(var i=0;i<$tr_1.length;i++){
			bondCode_1.eq(i).attr("name","bondCntr.teamBookItems["+i+"].bondCode");		
			assetsTypeName_1.eq(i).attr("name","bondCntr.teamBookItems["+i+"].assetsTypeName");
			teamName_1.eq(i).attr("name","bondCntr.teamBookItems["+i+"].teamName");
			BONDAM_1.eq(i).attr("name","bondCntr.teamBookItems["+i+"].BONDAM");
			SMCode_1.eq(i).attr("name","bondCntr.teamBookItems["+i+"].subjectMappingCode");
			bookId_1.eq(i).attr("name","bondCntr.teamBookItems["+i+"].bookId");
			assetsType_1.eq(i).attr("name","bondCntr.teamBookItems["+i+"].assetsType");
			teamId_1.eq(i).attr("name","bondCntr.teamBookItems["+i+"].teamId");
		}
	}
}

//------------页面保存之前处理一些数据
function dealBondData(){	
	var $sels = $('.bond_team');
	for (var i=0;i<$sels.length;i++){
		if ($sels.eq(i).val() == "" || $sels.eq(i).val() == "请选择"){
			$.messager.alert('错误', '债券交易明细-投组未选择!');
			return false;
		}
	}
	
	var coutertyBankAcctNo = $("select[name='bondCntr.coutertyBankAcctNo']").val();
	if(coutertyBankAcctNo==""||coutertyBankAcctNo==null){
		doTheAlert("提示","对手方托管账号为空，请更换托管场所。");
		return false;
	}
	if(!parseFloat($("#matureEarningRate").val())){
		doTheAlert("提示","持有至到期收益率录入有误或为空。");
		return false;
	}
	var bondStatusV = $("#bondBusiessStatus").val();//是否债券融入
	saveOneitem(bondStatusV);
	var pldval = $("#pldval").val();//偏离度
	var coutertyBankAcctNo = $("#coutertyBankSelect").val();
	$("input[name='bondCntr.coutertyBankAcctNo']").val(coutertyBankAcctNo);
	var bondCode = $("#bondCode").val();//获取页面上(bondCntr表)的债券代码
	var BONDAM = getMoneyValue($("input[name='bondCntr.BONDAM']").val())*1;//获取页面上(bondCntr表)的券面面值  (*1是将String转换为int型做加减)
	var totalBONDAM = 0;
	var bondAm;
	var assetsType;
	var bondTeam;
	//选择是否债券融入为是 
	if(bondStatusV=='0'){
		//获取面值列
		var $totalValue = $("#bondBuyingtrInfoTable_0 tbody td[class='faceValueAmount']");
		for(var i = 0;i<$totalValue.length;i++){
			$(".bondCodeChild input").val(bondCode);//给每一行加上页面的债券代码存入到合同投组表中
			var teamName = $("select[name='bondCntr.teamBookItems["+i+"].teamId'] option:selected").text();
			$("input[name='bondCntr.teamBookItems["+i+"].teamName']").val(teamName);
			bondAm = getMoneyValue($("#bondBuyingtrInfoTable_0 input[name='bondCntr.teamBookItems["+i+"].BONDAM']").val());
			totalBONDAM +=  bondAm*1;//求出总和 (*1是为了可以直接相加,而不是拼接字符串)
			
			assetsType = $("#bondBuyingtrInfoTable_0 select[name='bondCntr.teamBookItems["+i+"].assetsType']").val();
			bondTeam = $("#bondBuyingtrInfoTable_0 select[name='bondCntr.teamBookItems["+i+"].bondTeam']").val();
		};
		if(bondAm ==""||assetsType==""||bondTeam==""){
			$.messager.alert('提示', '明细信息输入不全!'); 
			return false;
		}
		//判断敞口面值和券面面值的大小
		if(totalBONDAM>BONDAM){
			$.messager.alert('提示', '所录面值大于券面面值!');
			return false;
		}else if(totalBONDAM<BONDAM){
			$.messager.alert('提示', '所录面值小于券面面值! 未录面值为: '+(BONDAM-totalBONDAM).toFixed(2)+" 万元");
			return false;
		}else{
			//若录入数据都正确,则弹出偏离度,并保存
			if(pldval*1>30){
				$.messager.alert('错误', '偏离度错误或超过30%!');
				return false;
			}
			return true;
		}
	}else if(bondStatusV=='1'){
		//选择是否债券融入为是
		//获取面值列
		var $totalValue = $("#bondBuyingtrInfoTable_1 tbody td[class='totalBONDAM']");
		for(var i = 0;i<$totalValue.length;i++){
			bondAm = getMoneyValue($("#bondBuyingtrInfoTable_1 input[name='bondCntr.teamBookItems["+i+"].BONDAM']").val());
			totalBONDAM +=  bondAm*1;//求出总和 (*1是为了可以直接相加,而不是拼接字符串)
		}
		//判断敞口面值和券面面值的大小
		if(totalBONDAM>BONDAM){
			$.messager.alert('提示', '所录面值大于券面面值!');
			return false;
		}else if(totalBONDAM<BONDAM){
			$.messager.alert('提示', '所录面值小于券面面值! 未录面值为: '+(BONDAM-totalBONDAM).toFixed(2)+" 万元");
			return false;
		}else{
			//若录入数据都正确,则弹出偏离度,并保存
			var pldval = $("#pldval").val();
			if(pldval*1>30){
				$.messager.alert('错误', '偏离度错误或超过30%!');
				return false;
			}
		}
	}
	
	return true;
}
