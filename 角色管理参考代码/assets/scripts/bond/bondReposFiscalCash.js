//质押式正回购/国库现金 公用js
	//---------------------------------------//打开债券查询页面
	$(document).on('click','#goBESearchPage',
		function(){
			//在页面跳转前预留功能
			window.open("/cpms/linkus/capital/bond/bussiness/bondPublic/btbSearchPage?busiType="+$("#busiType").val(),{width:'95%'});
	});
//---------------------------------------//关闭债券查询页面
	$(document).on('click','#btn_close_zqPrSearch',closePage);
//--------------------------------------//债券查询
	$(document).on('click','#doItemSearch',
		function(){
			//以下四个分别是     资产分类    债券代码    左范围  右范围
			var assetsType = $("#searchCondition #assetsType").val();
			var bondCode   = $("#searchCondition #bondCode").val();
			var range1     = getMoneyValue($("#searchCondition #range1").val()); 
			var range2     = getMoneyValue($("#searchCondition #range2").val()); 
			var strstr = "";
			$.ajax({
				type : "post",
				global : false,
				async : false,
				url : '/cpms/linkus/capital/bond/bussiness/bondPublic/findBondTeambook',
				data : {
					"assetsType":assetsType,
					"bondCode":bondCode,
					"range1":range1,
					"range2":range2
				},
				dataType : "json",
				success : function(data) {
				 if (data != null) {
				 	var teamInfo = null;
				 	var bondTeamBook = null;
				 	for(var i=0;i<data.bondTeambookList.length;i++){
				 		bondTeamBook = data.bondTeambookList[i];
                        var $rtrs = $("#rightTable tbody tr");
                        var added = false;
                        for(var j=0;j<$rtrs.length;j++){
                        	var hadTeamId = $rtrs.eq(j).attr("id");
                        	var hadBondCode = $rtrs.eq(j).children().eq(0).text();
                        	if (hadTeamId == bondTeamBook.teamId && hadBondCode == bondTeamBook.bondCode){
                        		added = true;
                        		break;
                        	}
                        }
                        if(added) continue;
				 		//投组名称做展示用    投组ID藏到tr的id中   等页面保存时将投组ID取出    写入到隐藏的列中
				 		strstr+='<tr id="'+bondTeamBook.teamId+'" name="bookId_'+bondTeamBook.bookId+'">'+
								'<td name="subjectMappingCode_'+bondTeamBook.subjectMappingCode+'" style="width:110px;border-right:1px solid #ddd;background-color:#fff;">'+bondTeamBook.bondCode+'</td>'+
								'<td>'+bondTeamBook.teamName+'</td>'+												           //↓ 此处用BONDAM  获得的是NaN
								'<td class="faceValueAmount">'+addThousandCharacter((bondTeamBook.bondam/10000).toFixed(6))+'</td>'+
								'<td class="faceValueAmountCanUse">'+addThousandCharacter((bondTeamBook.availableAmount/10000).toFixed(6))+'</td>'+
								'<td class="assetsType" id="'+bondTeamBook.assetsType+'">'+bondTeamBook.assetsTypeName+'</td>'+
								'<td style="display:none;" class="bondName">' + bondTeamBook.bondName +'</td>'+
							'</tr>';
				 	}
				 }
				 //清除上次的查询结果      再加上本次的
				 $("#tableToSwap #leftTable tbody tr").remove();
				 $("#tableToSwap #leftTable tbody").append(strstr);
				},
				error:function(){
					doTheAlert('提示', errorTip);
				}
			});
	});
//--------------------------------------//点击选取行
	$(document).on('click','#leftTable tbody tr,#rightTable tbody tr',
		function(){
			var tr = $(this);
			tr.toggleClass("selected");
		});
//--------------------------------------//移动选取的行
	//右移被双击的行
	$(document).on('dblclick','#tableToSwap #leftDiv tbody tr',
		function(){
			//隐藏td资产类型名称
			$(this).children("td[class='assetsType']").hide();
			//添加三个td 质押率 质押面值 融资金额
			$(this).append($("<td style='width:150px;' class='settleAmount'></td>" +
							"<td style='width:150px;' class='pledgeBondAmount'></td>"+
							"<td style='width:150px;' class='pledgeRatio'></td>"));
			//将该行移至右边的表
			$('#rightTable tbody').append($(this));
			//清除选定时给定的样式
			$('#rightDiv tr').removeClass('selected');
			//合计
			zqCntrEvalTotal();
	});
	//点击右移按钮  右移所有选定行
	$(document).on('click','#goRight',
		function(){
			//选定所有被选中的行
			var $trs = $('#leftDiv tbody tr[class="selected"]');
			//隐藏td资产类型名称
			$($trs).children("td[class='assetsType']").hide();
			//添加三个td 质押率 质押面值 融资金额
			$($trs).append($("<td style='width:150px;' class='settleAmount'></td>" +
							"<td style='width:150px;' class='pledgeBondAmount'></td>"+
							"<td style='width:150px;' class='pledgeRatio'></td>"));
			//将选定行移至右边的表
			$('#rightTable tbody').append($trs);
			//清除选定时给定的样式
			$('#rightTable tr').removeClass('selected');
			//合计
			zqCntrEvalTotal();
	});
	//点击左移按钮 右移动所有选定行
	$(document).on('click','#goLeft',
		function(){
			//选定所有被选中的行
			var $trs = $('#rightTable tbody tr[class="selected"]');
			//清除 三个td 质押率 质押面值 融资金额
			$($trs).children("td[class='settleAmount'],td[class='pledgeBondAmount'],td[class='pledgeRatio']").remove();
			//显示td资产类型名称
			$($trs).children("td[class='assetsType']").show();
			//将选定行移至左边的表
			$('#leftDiv tbody').append($trs);
			//清除选定时给定的样式
			$('#leftDiv tr').removeClass('selected');
			//合计
			zqCntrEvalTotal();
	});
//--------------------------------------//合计结算
	function zqCntrEvalTotal(){
		//面值
		var $faceValueAmounts = $("#tableToSwap #rightDiv tbody td[class='faceValueAmount']");
		//可用面值
		var $faceValueAmountCanUses = $("#tableToSwap #rightDiv tbody td[class='faceValueAmountCanUse']");
		//融资金额
		var $settleAmounts = $("#tableToSwap #rightDiv tbody td[class='settleAmount']");
		//质押面值
		var $pledgeBondAmounts = $("#tableToSwap #rightDiv tbody td[class='pledgeBondAmount']");
		//数值总和计算中使用的变量
		var total;
	//计算总面值
		for(var i=0,total=0;i<$faceValueAmounts.length;i++){
			var param = $faceValueAmounts.eq(i).text();
			if(param=="")
				param=0;
			total +=removeThousandCharacter(param);
		}
		$("#totalFaceValueAmount").text(addThousandCharacter(total.toFixed(6)));
	//计算总可用面值
		for(var i=0,total=0;i<$faceValueAmountCanUses.length;i++){
			var param = $faceValueAmountCanUses.eq(i).text();
			if(param=="")
				param=0;
			total +=removeThousandCharacter(param);
		}
		$("#totalFaceValueAmountCanUse").text(addThousandCharacter(total.toFixed(6)));
	//计算总融资金额
		for(var i=0,total=0;i<$settleAmounts.length;i++){
			var param = $settleAmounts.eq(i).text();
			if(param=="")
				param=0;
			total +=removeThousandCharacter(param);
		}
		$("#totalSettleAmount").text(addThousandCharacter(parseFloat(total).toFixed(2)));
	//计算总质押面值
		for(var i=0,total=0;i<$pledgeBondAmounts.length;i++){
			var param = $pledgeBondAmounts.eq(i).text();
			if(param=="")
				param=0;
			total +=removeThousandCharacter(param);
		}
		$("#totalPledgeBondAmount").text(addThousandCharacter(total.toFixed(6)));
	}
//--------------------------------------//显示选定证券的信息
	$(document).on('dblclick','#tableToSwap #rightDiv tbody tr',
		function(){
			//清除所有行的标记
			$("#tableToSwap #rightDiv tbody tr td").removeClass("justMark");
			//给该行添加标记   以便修改信息的传递
			$(this).children("td").eq(0).addClass("justMark");
			//将该行的六列值传递到右上的债权计算模块中   以待修改/计算
			$("#b_pledgeRatio").val($(this).children("td[class='pledgeRatio']").text());
			$("#b_pledgeBondAmount").val($(this).children("td[class='pledgeBondAmount']").text());
			$("#b_settleAmount").val($(this).children("td[class='settleAmount']").text());
			$("#b_bondCode").val($(this).children().eq(0).text());
			$("#b_faceValueAmount").val($(this).children().eq(2).text());
			$("#b_faceValueAmountCanUse").val($(this).children().eq(3).text());
			if($("#b_pledgeBondAmount").val()){
				$("#b_pledgeBondAmount").change();
			}
	});
	//提交质押率和质押面值
	$(document).on('click','#sureSubmit',
		function(){
			var amount = getMoneyValue($("#b_pledgeBondAmount").val())*1;//质押面值
			if (!amount){
				doTheAlert("提示","质押面值未录入或为0");
				return;
			}
			var faceAmount = getMoneyValue($("#b_faceValueAmountCanUse").val());//可用面值
			if(amount*1>faceAmount*1){
				doTheAlert("提示","质押面值大于可用面值");
    			return;
			}
			var ratio = 0;
			var settleAmount = 0;
			if ($("#busiType").val() == '20024'){
				settleAmount = getMoneyValue($("#b_settleAmount").val())*1;				
				if (settleAmount <= 0){
					doTheAlert("提示","融资金额未录入或为0");
	    			return;
				}
				ratio = settleAmount / (amount*100);
				$("#b_pledgeRatio").val(ratio.toFixed(4));
			}else{
				//获取债权计算模块中的 质押率和质押面值
				ratio  = $("#b_pledgeRatio").val()*1;
				if(!ratio){
					doTheAlert("提示","质押率未录入或为0");
					return;
				}
				settleAmount = ratio*amount*100;
				//如果融资金额大于0小与可用面值  则开始传值
				if(settleAmount <= 0){
	                doTheAlert("提示","融资金额不能为0");
	                return;
	            }
				$("#b_settleAmount").val(addThousandCharacter(settleAmount.toFixed(2)));
			}
			var $tr = $("#tableToSwap #rightDiv tbody td[class='justMark']").parents("tr");
			$tr.children("td[class='settleAmount']").text(addThousandCharacter(settleAmount.toFixed(2)));
			$tr.children("td[class='pledgeBondAmount']").text(addThousandCharacter(parseFloat(amount).toFixed(6)));
			$tr.children("td[class='pledgeRatio']").text(ratio.toFixed(4));
			//合计
			zqCntrEvalTotal();
			//清除债券计算模块中的值
			$("#b_pledgeRatio").val("");
			$("#b_pledgeBondAmount").val("");
			$("#b_settleAmount").val("");
			$("#b_bondCode").val("");
			$("#b_faceValueAmount").val("");
			$("#b_faceValueAmountCanUse").val("");
			if($("#b_pledgeBondAmount").val()){
				$("#b_pledgeBondAmount").change();	
			}
		});
//--------------------------------------//将查询页面的信息写到input页面
	$(document).on('click','#btn_zqPrSearch',
		function(){
			var $pledgeBondAmount = $("#rightTable tbody td[class='pledgeBondAmount']");
			for(var i=0;i<$pledgeBondAmount.length;i++){
            	var pledgeBondAmount = getMoneyValue($pledgeBondAmount.eq(i).text());
            	if(pledgeBondAmount==""||pledgeBondAmount==null){
            		doTheAlert("提示","存在未录入质押面值的债券信息!");
            		return;
            	}
            }
			//获取源表中的所有行
			var $trs = $("#tableToSwap #rightTable tbody tr");
			//获取目标表中的所有行     
				//注意事项:目标行数在循环中会增加  所以循环中不能使用$info！！！！！
			var $info = $("#zqCntrInfoTable tbody tr");
			//len和i为目标已有数据的行数  
			var i = len = $info.length;
			//若第一行中数据为空   则认为已有数据的行数为0
			if(!$info.eq(0).children().eq(1).children("input").val())
				i = len = 0;
			else{
				//检查目标表中是否已添加过相同债券投组的，有则报错
				for(var j=0;j<$trs.length;j++){ 
					var bondId = $trs.eq(j).children().eq(0).text();
					var teamId = $trs.eq(j).attr("id");
					for(var k=0;k<len;k++){
						var $compare = $("#zqCntrInfoTable tbody tr").eq(k).children();
						if ($compare.eq(1).children("input").val() == bondId && $compare.eq(8).children("input").val() == teamId){
							doTheAlert("提示","重复! 已添加过债券[" + bondId + "] 投组[" + $trs.eq(j).children().eq(1).text() + "]");
							return;
						}
					}
				}
			}
			//信息传递从已有数据行之后开始 
			for(;i<$trs.length+len;i++){
				//新增一行(点击上一行的"+"号来实现)  如果第一行数据为空  直接覆写
				if(i>0)
					$("#zqCntrInfoTable tbody tr").eq(i-1).children("[class='manipulate']").children().eq(0).click();
				//循环获取信息源  x行中
				var $src  = $trs.eq(i-len);
				//循环获取目标源  x行中的所有列
				var $dest = $("#zqCntrInfoTable tbody tr").eq(i).children();
				//写入信息
				$dest.eq(0).children("center").text(i+1);
				$dest.eq(1).children("input").val($src.children().eq(0).text());
				$dest.eq(2).children("input").val($src.children("[class='bondName']").text());
				$dest.eq(3).children("input").val($src.children("[class='assetsType']").text());
				$dest.eq(4).children("input").val($src.children().eq(1).text());
				$dest.eq(5).children("input").val($src.children("[class='pledgeRatio']").text());
				$dest.eq(6).children("input").val($src.children("[class='pledgeBondAmount']").text());
				$dest.eq(7).children("input").val($src.children("[class='settleAmount']").text());
				//将隐藏的投组ID传递到正回购页面上
				$dest.eq(8).children("input").val($src.attr("id"));
				$dest.eq(9).children("input").val($src.attr("name").substring(7));
				$dest.eq(10).children("input").val($src.children("[class='assetsType']").attr('id'));
				$dest.eq(11).children("input").val($src.children().eq(0).attr("name").substring(19));
				$dest.eq(12).children("input").val($src.children("[class='faceValueAmount']").text());
				$dest.eq(13).children("input").val($src.children("[class='faceValueAmountCanUse']").text());
			}
			//券面总额 
			var amountInput = $("input[name='bondCntr.BONDAM'],#amount_transDirection_0");
			var amountValues = parseFloat(getMoneyValue(amountInput.val())?getMoneyValue(amountInput.val()):0);
			
			//首期金额
			var ropoInitialAmount = $("input[name='bondCntr.ropoInitialAmount'],#rAmount_transDirection_0");
			var ropoInitialValues = parseFloat(getMoneyValue(ropoInitialAmount.val())?getMoneyValue(ropoInitialAmount.val()):0);
			if(len==0){
				amountValues = 0;
				ropoInitialValues = 0;
			}
			var text = getMoneyValue($("#tableToSwap table #totalPledgeBondAmount").text());
			var newAmountValue = (text?text:0);
			amountInput.val(parseFloat(amountValues*1+newAmountValue*1).toFixed(6));
			if(amountInput.val()){
				amountInput.change()
			}
			/*
			text = getMoneyValue($("#tableToSwap table #totalSettleAmount").text());
			newAmountValue = (text?text:0);
			ropoInitialAmount.val(parseFloat(ropoInitialValues*1+newAmountValue*1).toFixed(2));
			if(ropoInitialAmount.val()){
				ropoInitialAmount.change()
			}
			*/
			reCalInitialAmount();
			
			//到期金额
			calculateMaturityAmount();
			//标记最后一行
			$("#zqCntrInfoTable tbody tr:last").click();
			//目标行只读
			$("#zqCntrInfoTable tbody tr input").attr("readonly","");
			//关闭查询页面
			$(document).find("#btn_close_zqPrSearch").click();
			//聚焦债券代码
			$("#zqCntrInfoTable tbody tr:last td input").eq(0).focus();
	});
//--------------------------------------//正回购 删除已选定的债券信息
	$(document).on('click','#transDirection_0_remove',
		function(){
			var thisAmount = 0;
			//获取选中行的债券代码
			var bondCode = $("#transDirection_0 .justMark1 td input").eq(0).val();
			var trLength = $("#transDirection_0 tbody tr").length;
			if(bondCode)//此判断条件只是为了没有标记行时      点击删除按钮不弹出confirm框 
				getTheMessager().confirm("提示",'确定是要删除"'+bondCode+'"的信息吗？',function(e){
					if(!e) 
                		return;
					thisAmount  = removeThousandCharacter($("#transDirection_0 .justMark1 td input").eq(5).val()?$("#transDirection_0 .justMark1 td input").eq(5).val():0);
					thisRAmount = removeThousandCharacter($("#transDirection_0 .justMark1 td input").eq(6).val()?$("#transDirection_0 .justMark1 td input").eq(6).val():0);
					//若有多行 删除标记的行    只有一行则将该行的数据清除
					if(trLength>1){
						var index = $("#transDirection_0 tbody tr[class='justMark1']").index();
						//删除标记行(点击本行的"-"号来实现)
						$("#transDirection_0 .justMark1").children("[class='manipulate']").children().eq(1).click();
						//重新写序号
						for(var i= index;i<trLength-1;i++){
							$("#transDirection_0 tbody tr").eq(i).children().eq(0).children().text(i+1);
						}
						//标记下一行   若删除的是最后一行  则标记上一行
						var $nextLine = $("#transDirection_0 tbody tr").eq(trLength == index+1?index-1:index);
						$nextLine.click();
						$nextLine.children().eq(1).children().focus();
					}
					else{
						//移除标记
						$("#transDirection_0 tbody tr").removeClass("justMark1");
						//移除所有旗帜图片
						$(".flagImg").remove();
						//清空第一行信息
						var trInfo = $("#transDirection_0 tbody tr td").children();
						trInfo.eq(0).text("");
						trInfo.val("");
					}
					//减去删除行的质押面值    若删完了  则券面总额显示为空串
					var amountInput = $("input[name='bondCntr.BONDAM'],#amount_transDirection_0");
					amountInputValue = parseFloat(getMoneyValue(amountInput.val())?getMoneyValue(amountInput.val()):0);
					var actual = (amountInputValue*1-thisAmount*1).toFixed(6);
					amountInput.val(actual?actual:"");
					/*
					//减去删除行的融资金额    若删完了  则显示为空串
					var ropoInitialAmount = $("input[name='bondCntr.ropoInitialAmount'],#rAmount_transDirection_0");
					amountInputValue = parseFloat(ropoInitialAmount.val()?getMoneyValue(ropoInitialAmount.val()):0);
					    actual = amountInputValue-thisRAmount;
					ropoInitialAmount.val(actual?actual:"");
					*/
					reCalInitialAmount();
					//到期金额
					calculateMaturityAmount();
				});
	});
	//--------------------------------------//正回购 修改已选定的债券信息
	$(document).on('click','#transDirection_0_edit',
		function(){
			var thisAmount = 0;
			//获取选中行的债券代码
			var bondCode = $("#transDirection_0 .justMark1 td input").eq(0).val();
			var trLength = $("#transDirection_0 tbody tr").length;
			if(!bondCode) //判断有没有选中的行 没有退出
				return;
			window.open("/cpms/linkus/capital/bond/bussiness/bondPublic/editTeamBookItem?busiType="+$("#busiType").val(),{width:'60%',height:'50%'});
			loadEditVal();
	});
	
	//--------------------------------------//将查询页面的信息写到input页面
	$(document).on('click','#btn_editTeamBookItem',
		function(){
		var settleAmount  = $("#edit_settleAmount").val()*1;
		if(settleAmount <= 0){
			doTheAlert("提示","质押比例错误！");
			return;
		}
		//赋值到原行
		$("#transDirection_0 .justMark1 td input").eq(6).val($('#edit_settleAmount').val());
		$("#transDirection_0 .justMark1 td input").eq(4).val($('#edit_pledgeRatio').val());

		reCalInitialAmount();
		//关闭修改页面
		$(document).find("#btn_close_page").click();
	});
	//---------------------------------------//关闭页面
	$(document).on('click','#btn_close_page',closePage);
	
	//---------------------------------------//将数据加载到编辑界面
	function loadEditVal(){
		if($('#btn_editTeamBookItem').length){
			$('#edit_bondCode').val($("#transDirection_0 .justMark1 td input").eq(0).val());
			$('#edit_settleAmount').val($("#transDirection_0 .justMark1 td input").eq(6).val());
			$('#edit_pledgeRatio').val($("#transDirection_0 .justMark1 td input").eq(4).val());
			$('#edit_pledgeBondAmount').val($("#transDirection_0 .justMark1 td input").eq(5).val());
			return;
		}
		//递归
		setTimeout(loadEditVal,100);
	}
	
	$(document).on('blur', '#edit_pledgeRatio', function(){
		//获取债权计算模块中的 质押率和质押面值
		var ratio  = $("#edit_pledgeRatio").val();
		if (ratio.indexOf(".")>0){
			var length = ratio.split(".")[1].length;
			if (length > 4){
				doTheAlert("提示","质押比例：小数点不能超过4位");
				$("#edit_settleAmount").val(0);
				return;
			}
		}
		var amount = getMoneyValue($("#edit_pledgeBondAmount").val());//质押面值
		var settleAmount = 0;
		if(ratio*1  && ratio*1 < 1000){
			settleAmount = (ratio*amount*100).toFixed(2);
			$("#edit_settleAmount").val(addThousandCharacter(settleAmount));
		}else{
			$("#edit_settleAmount").val(0);
			doTheAlert("提示","质押比例错误！");
		}
	});
	
	//国库现金
	$(document).on('blur','#edit_settleAmount', function(){
		var amount = getMoneyValue($("#edit_pledgeBondAmount").val());//质押面值
		var settleAmount = getMoneyValue($("#edit_settleAmount").val());//融资金额 
		var ratio = settleAmount / (amount * 100);
		if (!ratio || !settleAmount){
			doTheAlert("提示","融资金额错误！");
		}
		$("#edit_pledgeRatio").val(ratio.toFixed(4));
	});
	
	$(document).on('blur',"input[name='bondCntr.ropoInitialAmount']",
		function(){
			$(this).change();
	});
	
	$(document).on('change',"input[name='bondCntr.ropoInitialAmount']",
		function(){
			calculateMaturityAmount();
	});
	
//---------------------------------------//点击标记选定的行
	//标记的图片
	var baseUrl = $("#actionBaseUrl").val();
	//<img class='flagImg' src='"+baseUrl.substring(0,baseUrl.indexOf('/cpms/linkus'))+"/assets/images/flag.png'/>
	var flagImg = "<i class='flagImg glyphicon glyphicon-flag'></i>";
	$(document).on('click','.transDirection_ tbody tr',
		function(){
			//移除所有标记
			$('.transDirection_ tbody tr').removeClass("justMark1");
			//移除所有旗帜图片
			$(".flagImg").remove();
			//若点击行非空 
			if($(this).children().eq(1).children().val()){
				//添加标记
				$(this).addClass("justMark1");
				//加上旗帜
				$(this).children().eq(0).children().append(flagImg);
			}
	});

//---------------------------------------//到期金额计算
function calculateMaturityAmount(){
	var repoInterestRate = $("input[name='bondCntr.repoInterestRate']").val();//回购利率
	var dateInterval     = $("#dateInterval").val();//期限
	var ropoInitialAmount= getMoneyValue($("input[name='bondCntr.ropoInitialAmount']").val());//首期金额
	var $maturityAmount  = $("input[name='bondCntr.maturityAmount']");//到期金额
	var thisAmount;
	if(repoInterestRate&&dateInterval&&ropoInitialAmount){
		var thisAmount = parseFloat(ropoInitialAmount)*(1+parseFloat(repoInterestRate)/100*parseFloat(dateInterval)/365);
		//到期金额为0的显示空字符串   ↓是float类型
		thisAmount=(thisAmount==0)?"":thisAmount.toFixed(2);
	}else{
		thisAmount="";
	}
	//将计算好的值填入到期金额input
	$maturityAmount.val(thisAmount);
	if(thisAmount){
		$maturityAmount.change()
	}
	//同样将值填入到正/逆回购中对应的到期金额隐藏input中
	$("#mAmount_transDirection_"+$("#transDirection").val()).val(thisAmount);
//	showChineseNum();
	calFiscalCashYSYJ();
}

//计算应收应计   ---  国库到期用
function calFiscalCashYSYJ(){
	var $maturityAmount  = $("input[name='bondCntr.maturityAmount']");//到期金额
	var ropoInitialAmount= getMoneyValue($("input[name='bondCntr.ropoInitialAmount']").val());//首期金额
	var $receAccruedInterest = $("input[name='bondCntr.receAccruedInterest']");
	var YSYJ = parseFloat(getMoneyValue($maturityAmount.val())-ropoInitialAmount);
	if($maturityAmount.val()!=''){
		$receAccruedInterest.val(YSYJ.toFixed(2)).change();
	}else{
		$receAccruedInterest.val('');
	}
}

//重算 首期金额
function reCalInitialAmount(){
	var $trs = $("#zqCntrInfoTable tbody tr");
	var totalAmount = 0;
	
	for(var i=0; i<$trs.length; i++){
		var amount = $trs.eq(i).children().eq(7).children("input").val();
		if(amount == null || amount == ""){
			break;
		}
		totalAmount += getMoneyValue(amount) * 1;
	}
	
	var ropoInitialAmount = $("input[name='bondCntr.ropoInitialAmount']");
	ropoInitialAmount.val(totalAmount?parseFloat(totalAmount).toFixed(2):"");
	if (ropoInitialAmount.val())
		ropoInitialAmount.change();
}

