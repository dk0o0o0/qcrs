/*************************************************************************************************
/* DESC       ：债券分销买入ＪＳ处理文件                                                                                                                                                                                 
/* AUTHOR     ：大资管平台项目组                                                                                                                                                                                 
/* CREATE     ：2016-04-05                                     
/* MODIFYLIST ： Name          Date         Reason                                                
/*              yourName      updateDate    modiReason                                               
/*              -------------------------------------------------------------   
*************************************************************************************************/

$(function(){
	
	//---------------------------------------//给页面加上投组信息
	function showBondTeamListInfo(assetsType,userName,trIndex){
		//$("#bond_team"+trIndex).find("option").remove();
		var selectObj = $("select[name='bondCntr.teamBookItems["+trIndex+"].teamId']")[0];
		$(selectObj).find("option").remove();
		var html = "<option>请选择</option>";
		//var html = "";
		$.ajax({
				type : "post",
				global : false,
				async : true,
				url : '/cpms/linkus/capital/bond/bussiness/bondPublic/findTeamListByUserNameAndType',
				data : {"assetsType":assetsType,
							"userName":userName},
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
	$(document).on('click','#t20006Items tbody tr',
		function(){
			//移除所有标记
			$("#t20006Items tbody tr").removeClass("justMark");
			//添加标记
			$(this).addClass("justMark");
	});
	//------------根据选择的资产类型生成不同的投组
	$(document).on('change','.justMark td[class="assetsType"]',function(){
		var assetsType = $(this).children().children().children().val();//获取当前选中的资产类型的值
		var userName = $("#userName").val();
		var trIndex = $(this).parent().parent().find("tr").index($(this).parent()[0]);
		//console.log("assetsType = "+assetsType+",userName = "+userName);
		showBondTeamListInfo(assetsType,userName,trIndex);
	});
	
	//页面的保存
	$(document).on('click','#doBondDistributionIn',dealBondData);
	
	//选择投组改变
	$(document).on('change','.justMark td[class="teamName"]',function(){
		var teamName = $(this).children().children().val();//获取当前选中的投组值
		//与已有找是否重复
		var $trs = $('#t20006Items tbody tr');
		for (var i=0; i<$trs.length; i++){
			if ($(this).parent().is($trs.eq(i))) //排除自己行
				continue;
			var tn= $trs.eq(i).children().eq(2).children().children().val();
			if (tn != "请选择" && teamName == tn){
				doTheAlert("提示", "已添加过该投组");
				//变成请选择
				$(this).children().children().val("请选择");
				return;
			}
		}
	});
});

function dealBondData(){
//		desribeLength();
		//判断交割日期是否在债券到期日之前
		var bool = compareToDeliveryDate($("#matureDate").val(),$("input[name='bondCntr.deliveryDate']").val(),"分销日期: ");
		if(!bool){
			return false;
		}
		if($("select[name='bondCntr.transPlaceType']").val()==""){
			doTheAlert("提示","请输入托管场所!");
			return false;
		}
		
		if($("input[name='bondCntr.podageAmt']").val()!=""){
			if($("input[name='bondCntr.disribonPayDate']").val()==""){
				doTheAlert("提示","已收取手续费,请输入手续费收取日期!");
				return false;
			}
		}
		
		if($("input[name='bondCntr.deliveryDate']").val()==""){
			doTheAlert("提示","请输入分销日期!");
			return false;
		}
		
		//效验有没有未选择的
		var $trs = $("#t20006Items tbody tr");
		for (var i=0; i<$trs.length; i++){
			var tr = $trs.eq(i);
			var tempDealinType = tr.children().eq(0).children().val();
			if (tempDealinType == "请选择" || tempDealinType == ""){
				doTheAlert("提示","经营方式 未选择！");
				return false;
			}
			var tempAssetsType = tr.children().eq(1).children().children().children().val();
			if (tempAssetsType == "请选择" || tempAssetsType == ""){
				doTheAlert("提示","资产类型 未选择！");
				return false;
			}
			var tempTeamName = tr.children().eq(2).children().children().val();
			if (tempTeamName == "请选择" || tempTeamName == ""){
				doTheAlert("提示","投组 未选择！");
				return false;
			}
		}
		
		var totalBONDAM = 0;
		var totalTransAmount = 0;
		var bondCode = $("#bondCode").val();
		var BONDAM = getMoneyValue($("#BONDAM").val());//券面面值
		var transAmount = getMoneyValue($("#transAmount").val());//分销金额
		if(BONDAM == ""){
			doTheAlert("提示","请输入券面面值");
			$("#BONDAM").focus();
			return false;
		}
		if(transAmount == ""){
			doTheAlert("提示","请输入分销金额");
			$("#transAmount").focus();
			return false;
		}
		//求出总面值,与页面上债券面值做校验
		var $totalValue = $("#t20006Items tbody td[class='BONDAM']");
		for(var i = 0;i<$totalValue.length;i++){
			
			var teamName = $("select[name='bondCntr.teamBookItems["+i+"].teamId'] option:selected").text();
			$("input[name='bondCntr.teamBookItems["+i+"].teamName']").val(teamName);
			
			$(".bondCodeChild input").val(bondCode);
			bondAm = getMoneyValue($("input[name='bondCntr.teamBookItems["+i+"].BONDAM']").val());
			console.log(bondAm);
			totalBONDAM +=  bondAm*1;//求出总和 (*1是为了可以直接相加,而不是拼接字符串)
		};
		//求出总金额,与页面上分销金额做校验
//		var $totalValue = $("#t20006Items tbody td[class='transAmount']");
		for(var i = 0;i<$totalValue.length;i++){
			amount = getMoneyValue($("input[name='bondCntr.teamBookItems["+i+"].transAmount']").val());
			totalTransAmount +=  amount*1;//求出总和 (*1是为了可以直接相加,而不是拼接字符串)
		};
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