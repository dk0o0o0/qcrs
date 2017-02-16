$(function(){
	
	$(document).on('click','#btn_close_zqPrSearch',closePage);
	//--------------------------------------//点击选择债券跳转
	$(document).on('click','#chooseBond',function(){
		var bondCode = $("#bondCode").val();//债券代码
		var BONDAM = $("#BONDAM").val();//券面面值
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
		
		//在页面跳转前预留功能
		var href = "/cpms/linkus/capital/bond/bussiness/t20002Bond/chooseBond";
		$(this).next().attr("href",href);
		
		$(this).next().click();
	});
	
	//----------------------------------------//查询券面信息
	/*$(document).on('click','#sureSearch',function(){
		var $totalBONDAM = $("#bondSaletrInfoTable_1 tbody td[class='totalBONDAM']");
		var totalBONDAM=0;
		//总面值
		for(var i=0;i<$totalBONDAM.length;i++){
			bondAm = $("input[name='bondCntr.teamBookItems["+i+"].BONDAM']").val();
			totalBONDAM +=  bondAm*1;//求出总和 (*1是为了可以直接相加,而不是拼接字符串)
		}
		$("#CB_BONDAMCanUse").val($("#BONDAM").val()*1-totalBONDAM*1);
		var strstr = "";
		var bondCode = $("#bondCode").val();
		$.ajax({
					type : "post",
					global : false,
					async : false,
					url : '/cpms/linkus/capital/bond/bussiness/t20002Bond/findBondTeambook',
					data : {
						"bondCode":bondCode
					},
					dataType : "json",
					success : function(data) {
						if (data != null) {
							var teamInfo = null;
						 	for(var i=0;i<data.bondTeamBookList.length;i++){
						 		//将拼接的投组ID与投组名称拆开
						 		teamInfo = (data.bondTeamBookList[i].teamId).split("#→_→#");
						 		//投组名称做展示用    投组ID藏到tr的id中   等页面保存时将投组ID取出    写入到隐藏的列中
						 		strstr+='<tr id="'+teamInfo[0]+'" name="bookId_'+data.bondTeamBookList[i].bookId+'">'+
										'<td >'+data.bondTeamBookList[i].bondCode+'</td>'+											//债券代码
										//此处不知道如何去使用字典  于是通过从已经使用过字典的下拉选中获取text来转换值
										'<td class="CB_assetsType" id="'+data.bondTeamBookList[i].assetsType+'">'+data.bondTeamBookList[i].assetsType+'</td>'+		//资产分类
										'<td class="CB_bondTeam" id="'+teamInfo[0]+'">'+teamInfo[1]+'</td>'+												//投组								           
										'<td class="CB_BONDAM">'+(parseFloat(data.bondTeamBookList[i].bondam)/10000)+'</td>'+		//面值
										'<td class="CB_BONDAMSaled"></td>'+															//可用面值为  	 (面值     +   代购入    -    待回购    -   冻结)
										'<td class="CB_BONDAMCanUse">'+((data.bondTeamBookList[i].bondam+data.bondTeamBookList[i].stayPurchase-data.bondTeamBookList[i].stayRepo-data.bondTeamBookList[i].freezeAmount)/10000)+'</td>'+
										'<td style="display:none" id="'+data.bondTeamBookList[i].bookId+'"></td>'+					//持仓id
										'<td style="display:none" id="'+data.bondTeamBookList[i].subjectMappingCode+'"></td>'+		//科目代号
									'</tr>';
						 	}
						}
							 //清除上次的查询结果      再加上本次的
							 $("#tableToSwap #itemsTable tbody tr").remove();
							 $("#tableToSwap #itemsTable tbody").append(strstr);
							
					},
					error:function(){
						$.messager.alert('提示','ajax出现错误');
					}
				});
			});*/
				
	
	//----------------------------------------//选定选择债券页面的一行传入到上方做录入
	$(document).on('dblclick','#tableToSwap #rightDiv tbody tr',
		function(){
			//清除所有行的标记
			$("#tableToSwap #rightDiv tbody tr td").removeClass("justMark");
			//给该行添加标记   以便修改信息的传递
			$(this).children("td").eq(0).addClass("justMark");
			$("#CB_BONDAM").val($(this).children("td[class='CB_BONDAMCanUse']").text());//券面信息的面值为td可用面值
			$("#CB_bondTeam").val($(this).children("td[class='CB_bondTeam']").text());
			$("#CB_assetsType").val($(this).children("td[class='CB_assetsType']").text());
			
		});
	
	//----------------------------------------//点击选择债券页面的提交将修改后的数据传入td中
	$(document).on('click','#sureSubmit',function(){
		var CB_BONDAM = $("#CB_BONDAM").val();//券面信息的面值
		var CB_BONDAMCanUse = $("#CB_BONDAMCanUse").val();//券面信息的剩余面值
		var CB_BONDAMSaled = $("#CB_BONDAMSaled").val();//用户输入的券面信息的卖出券面金额
		if(CB_BONDAM*1 == ""){
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
		var BONDAMSaled = $tr.children("td[class='CB_BONDAMSaled']");//债券信息下方的卖出券面金额
		
		BONDAMSaled.text(BONDAMSaled.text()*1+CB_BONDAMSaled*1);
		var CB_BONDAMCanUse = $("#CB_BONDAMCanUse").val()*1-CB_BONDAMSaled*1;
		$("#CB_BONDAMCanUse").val(CB_BONDAMCanUse*1);
	});
	
	//--------------------------------------//将选择债券页面的值保存到input页面
	$(document).on('click','#btn_zqPrSearch',function(){
		var $abc = $("#itemsTable tbody td[class='CB_BONDAMSaled']");
		var a=0;
		for(var i=0;i<$abc.length;i++){
			if($("#tableToSwap tbody tr").eq(i).children("[class='CB_BONDAMSaled']").text()!==""){
				a=a+1;
			}
		}
		//获取源数据行
		var $trs = $("#tableToSwap tbody tr");
		//获取目标数据行
		var $info = $("#bondSaletrInfoTable_1 tbody tr");
		//len和i为目标已有数据的行数  
		var i = len = $info.length;
		//若第一行中数据为空   则认为已有数据的行数为0
		if(!$info.eq(0).children().eq(1).children("input").val())
			i = len = 0;
		//信息传递从已有数据行之后开始
		for(;i<a*1+len;i++){
			
			//新增一行(点击上一行的"+"号来实现)  如果第一行数据为空  直接覆写
			if(i>0)
				$("#bondSaletrInfoTable_1 tbody tr").eq(i-1).children("[class='manipulate']").children().eq(0).click();
			//循环获取信息源  x行中
			var $src  = $trs.eq(i-len);
			//循环获取目标源  x行中的所有列
			var $dest = $("#bondSaletrInfoTable_1 tbody tr").eq(i).children();
			if($src.children("[class='CB_BONDAMSaled']").text()!=""){
			//写入信息
			$dest.eq(0).children().children().children().val($src.children().eq(0).text());
			$dest.eq(1).children().children().children().val($src.children("[class='CB_assetsType']").text());
			$dest.eq(2).children().children().children().val($src.children("[class='CB_bondTeam']").attr("id"));
			$dest.eq(3).children().children().children().val($src.children("[class='CB_BONDAMSaled']").text());
			//隐藏值的传递
			$dest.eq(4).children().children().children().val($src.children().eq(7).attr('id'));//业务代号
			$dest.eq(5).children().val($src.children().eq(6).attr('id'));//bookId
//			$dest.eq(6).children().val($src.children().eq(8).attr('id'));
			}
		}
		//添加到目标表中显示readOnly属性
		$("#bondSaletrInfoTable_1 tbody tr input").attr('readonly','');
		closePage();
	});
	
});