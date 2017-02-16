/**
 * 债券卖出、提前赎回选择债券页面公共js处理文件
 */

$(function(){
	
		$(document).on('click','#btn_close_zqPrSearch',closePage);
	//--------------------------------------//点击选择债券跳转
	$(document).on('click','#chooseBond',function(){
		var bondCode = $("#bondCode").val();//债券代码
		var BONDAM = getMoneyValue($("#BONDAM").val());//券面面值
		var bondBusiessStatus = $("#bondBusiessStatus").val();//是否债券融入
		/*if(!bondBusiessStatus){
			$.messager.alert('提示','请选择是否债券融入!');
			return;
		}*/
		if(!bondCode){
			$.messager.alert('提示','请输入债券代码!');
			return;
		}
		if(!BONDAM){
			$.messager.alert('提示','请输入券面面值!');
			return;
		}
		
		var $totalBONDAM = $("#bondSaletrInfoTable_1 tbody td[class='totalBONDAM']");
		var totalBONDAM=0;
		//总面值
		for(var i=0;i<$totalBONDAM.length;i++){
			bondAm = getMoneyValue($("input[name='bondCntr.teamBookItems["+i+"].BONDAM']").val());
			totalBONDAM +=  bondAm*1;//求出总和 (*1是为了可以直接相加,而不是拼接字符串)
		}
		var amount = BONDAM*1-totalBONDAM*1;
		if(amount<0){
			doTheAlert("提示","当前明细总面值: "+(totalBONDAM*10000)+" 大于券面面值: "+(BONDAM*10000));
			return;
		}
		var pageUrl = '/cpms/linkus/capital/bond/bussiness/t20002Bond/chooseBond?bondCode='+bondCode+'&bondAmount='+amount+'&bondBusiessStatus='+bondBusiessStatus;
		if($("#busiType").val()=='20017'){
			pageUrl +="&noAssetsTypeLimit="+"yes";
		}
		window.open(pageUrl,{width:'80%'});
	});
	
	//---------------------------------------添加标记
	$(document).on('click','#bondSaletrInfoTable_1 tbody tr',
		function(){
			//移除所有标记
			$("#bondSaletrInfoTable_1 tbody tr").removeClass("justMark1");
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
				//更新序号以及下标
				var length = $("#bondSaletrInfoTable_1 tbody td[class='totalBONDAM']").length;//数据条数
				var h="";
				var index = 0;
				if(length>0){
					ok:for(var i=0;i<length;i++){
						
						var bondCode = $("input[name='bondCntr.teamBookItems["+i+"].bondCode']").val();
						var assetsTypeName = $("input[name='bondCntr.teamBookItems["+i+"].assetsTypeName']").val();
						var teamName = $("input[name='bondCntr.teamBookItems["+i+"].teamName']").val();
						var BONDAM = $("input[name='bondCntr.teamBookItems["+i+"].BONDAM']").val();
						var subjectMappingCode = $("input[name='bondCntr.teamBookItems["+i+"].subjectMappingCode']").val();
						var bookId = $("input[name='bondCntr.teamBookItems["+i+"].bookId']").val();
						var assetsType = $("input[name='bondCntr.teamBookItems["+i+"].assetsType']").val();
						var teamId = $("input[name='bondCntr.teamBookItems["+i+"].teamId']").val();
						if(bondCode==undefined){
							i=i+1;
							var bondCode = $("input[name='bondCntr.teamBookItems["+i+"].bondCode']").val();
							var assetsTypeName = $("input[name='bondCntr.teamBookItems["+i+"].assetsTypeName']").val();
							var teamName = $("input[name='bondCntr.teamBookItems["+i+"].teamName']").val();
							var BONDAM = $("input[name='bondCntr.teamBookItems["+i+"].BONDAM']").val();
							var subjectMappingCode = $("input[name='bondCntr.teamBookItems["+i+"].subjectMappingCode']").val();
							var bookId = $("input[name='bondCntr.teamBookItems["+i+"].bookId']").val();
							var assetsType = $("input[name='bondCntr.teamBookItems["+i+"].assetsType']").val();
							var teamId = $("input[name='bondCntr.teamBookItems["+i+"].teamId']").val();
							length=length+1;
							if(bondCode==undefined){
							// length=length+1;
							 continue ok;
						 }
						}
						
						h += '<tr>'+			
				   			'<td><center><input name="bondCntr.teamBookItems['+index+'].bondCode" 						  class="bondCode" value="'+bondCode+'" 		readonly=true width="15px;" style="background-color: transparent;border:none;text-align:center"/></center></td>'+			
				   			'<td><center><input name="bondCntr.teamBookItems['+index+'].assetsTypeName" 				  class="assetsTypeName" value="'+assetsTypeName+'" 		readonly=true width="15px;" style="background-color: transparent;border:none;text-align:center"/></center></td>'+
				   			'<td><center><input name="bondCntr.teamBookItems['+index+'].teamName" 						  class="teamName" value="'+teamName+'" 			readonly=true width="15px;" style="background-color: transparent;border:none;text-align:center"/></center></td>'+
				   			'<td class="totalBONDAM"><center><input name="bondCntr.teamBookItems['+index+'].BONDAM" 	  value="'+BONDAM+'"	class="noatoc amount tenthousand BONDAM" data\-scale="6" readonly=true width="15px;" style="background-color: transparent;border:none;text-align:center"/></center></td>'+
				   			'<td><center><input name="bondCntr.teamBookItems['+index+'].subjectMappingCode" 			  class="SMCode" value="'+subjectMappingCode+'" readonly=true width="15px;" style="background-color: transparent;border:none;text-align:center"/></center></td>'+
				   			'<td style="display:none"><center><input  name="bondCntr.teamBookItems['+index+'].bookId"     class="bookId" value="'+bookId+'" readonly=true width="15px;" style="background-color: transparent;border:none;text-align:center"/></center></td>'+
				   			'<td style="display:none"><center><input  name="bondCntr.teamBookItems['+index+'].assetsType" class="assetsType" value="'+assetsType+'" readonly=true width="15px;" style="background-color: transparent;border:none;text-align:center"/></center></td>'+
				   			'<td style="display:none"><center><input  name="bondCntr.teamBookItems['+index+'].teamId" 	  class="teamId" value="'+teamId+'" readonly=true width="15px;" style="background-color: transparent;border:none;text-align:center"/></center></td>'+
						'</tr>';
						index+=1;
					}
				}
				$('#tabbody').html(h);
				$("#bondSaletrInfoTable_1 tbody tr input").attr('readonly','');
			}
		});
	});
	
	//----------------------------------------//查询券面信息 已经改为页面加载后由后台处理
//	$(document).on('click','#sureSearch',function(){
//		var $totalBONDAM = $("#bondSaletrInfoTable_1 tbody td[class='totalBONDAM']");
//		var totalBONDAM=0;
//		//总面值
//		for(var i=0;i<$totalBONDAM.length;i++){
//			bondAm = getMoneyValue($("input[name='bondCntr.teamBookItems["+i+"].BONDAM']").val());
//			totalBONDAM +=  bondAm*1;//求出总和 (*1是为了可以直接相加,而不是拼接字符串)
//		}
//		$("#CB_BONDAMCanUse").val(($("#BONDAM").val()*1-totalBONDAM*1).toFixed(2));
//		var strstr = "";
//		var bondCode = $("#bondCode").val();
//		$.ajax({
//					type : "post",
//					global : false,
//					async : false,
//					url : '/cpms/linkus/capital/bond/bussiness/t20002Bond/findBondTeambook',
//					data : {
//						"bondCode":bondCode
//					},
//					dataType : "json",
//					success : function(data) {
//						if (data != null) {
//							var teamInfo = null;
//						 	for(var i=0;i<data.bondTeamBookList.length;i++){
//						 		//将拼接的投组ID与投组名称拆开
//						 		teamInfo = (data.bondTeamBookList[i].teamId).split("#→_→#");
//						 		//投组名称做展示用    投组ID藏到tr的id中   等页面保存时将投组ID取出    写入到隐藏的列中
//						 		strstr+='<tr id="'+teamInfo[0]+'" name="bookId_'+data.bondTeamBookList[i].bookId+'">'+
//										'<td >'+data.bondTeamBookList[i].bondCode+'</td>'+											//债券代码
//										//此处不知道如何去使用字典  于是通过从已经使用过字典的下拉选中获取text来转换值
//										'<td class="CB_assetsType" id="'+data.bondTeamBookList[i].assetsType+'">'+data.bondTeamBookList[i].assetsType+'</td>'+		//资产分类
//										'<td class="CB_bondTeam" id="'+teamInfo[0]+'">'+teamInfo[1]+'</td>'+												//投组								           
//										'<td class="CB_BONDAM">'+(parseFloat(data.bondTeamBookList[i].bondam)/10000)+'</td>'+		//面值
//										'<td class="CB_BONDAMSaled"></td>'+															//可用面值为  	 (面值     +   代购入    -    待回购    -   冻结)
//										'<td class="CB_BONDAMCanUse">'+((data.bondTeamBookList[i].bondam+data.bondTeamBookList[i].stayPurchase-data.bondTeamBookList[i].stayRepo-data.bondTeamBookList[i].freezeAmount)/10000)+'</td>'+
//										'<td style="display:none" id="'+data.bondTeamBookList[i].bookId+'"></td>'+					//持仓id
//										'<td style="display:none" id="'+data.bondTeamBookList[i].subjectMappingCode+'"></td>'+		//科目代号
//									'</tr>';
//						 	}
//						}
//							 //清除上次的查询结果      再加上本次的
//							 $("#tableToSwap #itemsTable tbody tr").remove();
//							 $("#tableToSwap #itemsTable tbody").append(strstr);
//							
//					},
//					error:function(){
//						$.messager.alert('提示','ajax出现错误');
//					}
//				});
//			});
				
	
	//----------------------------------------//选定选择债券页面的一行传入到上方做录入
	$(document).on('dblclick','#tableToSwap #rightDiv tbody tr',
		function(){
			//清除所有行的标记
			$("#tableToSwap #rightDiv tbody tr td").removeClass("justMark");
			//给该行添加标记   以便修改信息的传递
			$(this).children("td").eq(0).addClass("justMark");
			var $tr = $(this).children(".justMark").parent("tr");
			//设置当前行背景色，并清除除当前行外其他行的背景色// TODO 设置一行背景色
//			$tr.siblings().css("background-color","");
//			$tr.css("background-color","#ffe48d");
			
			$("#CB_BONDAM").val($(this).children("td[class='CB_BONDAMCanUse']").text());//券面信息的面值为td可用面值
			$("#CB_bondTeam").val($tr.children("td[class='CB_bondTeam']").children().children().val());
			$("#CB_assetsType").val($tr.children("td[class='CB_assetsType']").children().children().val());
			
//			var str = $tr.children().eq(0).children().children().val();//获取序号
		});
	
	//----------------------------------------//点击选择债券页面的提交将修改后的数据传入td中
	$(document).on('click','#sureSubmit',function(){
		var CB_BONDAM = getMoneyValue($("#CB_BONDAM").val());//券面信息的面值
		var CB_BONDAMCanUse = getMoneyValue($("#CB_BONDAMCanUse").val());//券面信息的剩余面值
		var CB_BONDAMSaled = getMoneyValue($("#CB_BONDAMSaled").val());//用户输入的券面信息的卖出券面金额
		if(CB_BONDAM*1 == ""){
			$.messager.alert('提示','请选择债券!');
			return;
		}
		if(CB_BONDAMSaled*1<=0){
			$.messager.alert('提示','输入有误!');
			return;
		}
		if(CB_BONDAMCanUse*1==0){
			$.messager.alert('提示','剩余面值不足!');
			return;
		}
		//判断输入的数值是否合理
		if(CB_BONDAMSaled*1>CB_BONDAM*1){
			doTheAlert("提示","卖出券面面值大于可用面值!");
			$("#CB_BONDAMSaled").focus();
			return;
		}
		if(CB_BONDAMSaled*1>CB_BONDAMCanUse*1){
			doTheAlert("提示","卖出券面面值大于剩余面值!");
			$("#CB_BONDAMSaled").focus();
			return;
		}
		
		var $tr = $("#tableToSwap #rightDiv tbody td[class='justMark']").parents("tr");//选中点击行
		var BONDAMSaled = $tr.children("td[class='CB_BONDAMSaled']").children().children();//债券信息下方的卖出券面金额
		var amountSaled = (getMoneyValue(BONDAMSaled.val())*1+CB_BONDAMSaled*1).toFixed(4);
		if(amountSaled*1>CB_BONDAM*1){
			doTheAlert("提示","可用面值不足!");
			return;
		}
		BONDAMSaled.val(amountSaled);
		var CB_BONDAMCanUse =(getMoneyValue( $("#CB_BONDAMCanUse").val())*1-CB_BONDAMSaled*1).toFixed(4);
		$("#CB_BONDAMCanUse").val(CB_BONDAMCanUse*1).change();
		$("#CB_BONDAMSaled").val("");
	});
	
	//--------------------------------------//将选择债券页面的值保存到input页面
	$(document).on('click','#btn_zqPrSearch',function(){
		/**1.2**/
		var h="";
		var str=$('#itemsTable tbody tr').length;//数据条数
		var index = $("#bondSaletrInfoTable_1 tbody td[class='totalBONDAM']").length;
		var $descTrs = $('#tabbody tr');
		
		//效验是否有重复
		for (var i=0;i<str;i++){
			if(!$("#BONDAM"+(i+1)).val())
				 continue;
			for(var j=0;j<$descTrs.length;j++){
				var teamId = $("#teamId"+(i+1)).val();//投组ID
				if ($descTrs.eq(j).children().eq(7).children().children("input").val() == teamId){
					doTheAlert("重复","已添加相同的投组！");
					return;
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
				var teamId = $("#teamId"+val).val();//投组ID
				
				h += '<tr>'+			
			   			'<td><center><input name="bondCntr.teamBookItems['+index+'].bondCode"   					  class="bondCode"  value="'+bondCode+'" 		readonly=true width="15px;" style="background-color: transparent;border:none;text-align:center"/></center></td>'+			
			   			'<td><center><input name="bondCntr.teamBookItems['+index+'].assetsTypeName" 				  class="assetsTypeName" value="'+assetsTypeName+'" 		readonly=true width="15px;" style="background-color: transparent;border:none;text-align:center"/></center></td>'+
			   			'<td><center><input name="bondCntr.teamBookItems['+index+'].teamName"     					  class="teamName" value="'+teamName+'" 			readonly=true width="15px;" style="background-color: transparent;border:none;text-align:center"/></center></td>'+
			   			'<td class="totalBONDAM"><center><input name="bondCntr.teamBookItems['+index+'].BONDAM"       value="'+BONDAM+'"	class="noatoc amount tenthousand BONDAM" data\-scale="6" readonly=true width="15px;" style="background-color: transparent;border:none;text-align:center"/></center></td>'+
			   			'<td><center><input name="bondCntr.teamBookItems['+index+'].subjectMappingCode" 			  class="SMCode" value="'+subjectMappingCode+'" readonly=true width="15px;" style="background-color: transparent;border:none;text-align:center"/></center></td>'+
			   			'<td style="display:none"><center><input  name="bondCntr.teamBookItems['+index+'].bookId"     class="bookId" value="'+bookId+'" readonly=true width="15px;" style="background-color: transparent;border:none;text-align:center"/></center></td>'+
			   			'<td style="display:none"><center><input  name="bondCntr.teamBookItems['+index+'].assetsType" class="assetsType" value="'+assetsType+'" readonly=true width="15px;" style="background-color: transparent;border:none;text-align:center"/></center></td>'+
			   			'<td style="display:none"><center><input  name="bondCntr.teamBookItems['+index+'].teamId"     class="teamId" value="'+teamId+'" readonly=true width="15px;" style="background-color: transparent;border:none;text-align:center"/></center></td>'+
					'</tr>';
				index +=1;
			}
		}
		$('#tabbody').append(h);
		//添加到目标表中显示readOnly属性
		$("#bondSaletrInfoTable_1 tbody tr input").attr('readonly','');
		closePage();
	});
	
});

	
/**
 *单机选中一行
 */
function getLine(str){
	var str=str;
	if($('#checkname'+str).is(':checked')==true){//判断是否选中
		$('#checkname'+str).prop("checked", false);
	}else{
		$('#checkname'+str).prop("checked", true);
	}
	findCellAll();
}