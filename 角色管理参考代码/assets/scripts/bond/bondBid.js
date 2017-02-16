/*************************************************************************************************
/* DESC       ：债券投标ＪＳ处理文件                                                                                                                                                                                 
/* AUTHOR     ：大资管平台项目组                                                                                                                                                                                 
/* CREATE     ：2016-04-12                                     
/* MODIFYLIST ： Name          Date         Reason                                                
/*              yourName      updateDate    modiReason                                               
/*              -------------------------------------------------------------   
*************************************************************************************************/

	//---------------------------------------//验证输入的债券代码是否存在     无需验证
	$(document).on('blur','#bidBondCode',
		function (){
			var bondCode = $("#bidBondCode").val();
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
				 			$("#bidBondCode").focus();
				 		});
				 	}
				},
				error:function(){
					doTheAlert('提示', errorTip);
				}
			});
	});
	
//------------------------------------//付息方式发生改变    基准利率的变化
	$(document).on('change',"select[name='bondCntr.payInterType']",
		function(){
			var payInterTypeV = $("select[name='bondCntr.payInterType']").val();
			var $basicInterRate = $("select[name='bondCntr.basicInterRate']");
			if(payInterTypeV=='2'){
				$basicInterRate.removeAttr('disabled');
				$basicInterRate.children("option:first").text("-请选择-");
			}else{
				$basicInterRate.attr('disabled','');
				$basicInterRate.children("option:first").text("");
				$basicInterRate.val('');
			}
	});
//---------------------------------------//选定机构
	$(document).on('click','#result input[value="选择"]',
		function(){
			var agencyName = $(this).parents("tr").children().text();
			var agencyId = $(this).parents("tr").attr("id");
			$("#bondBid_issueName").val(agencyName);
			$("input[name='bondCntr.issueUnit']").val(agencyId);
			closePage();
	});

//------------------------------------//期限计算
	$(document).on('blur',"input[name='bondCntr.startInterDate']",
		function(){
		calTem($("input[name='bondCntr.startInterDate']"));
	});
	$(document).on('blur',"input[name='bondCntr.matureDate']",
		function(){
		calTem($("input[name='bondCntr.matureDate']"));
	});
	function calTem($this){
		//起息日
		var startInterDateV = $("input[name='bondCntr.startInterDate']").val();
		//到期日
		var matureDateV     = $("input[name='bondCntr.matureDate']").val();
		//期限
		var $deadline     = $("input[name='bondCntr.deadline']");
		console.log("startInterDateV : " + startInterDateV);
		console.log("matureDateV : " + matureDateV);
		if(calculateDays(startInterDateV,matureDateV)<=0){
			doTheAlert("提示","到期日不能小于等于起息日！！！");
			$($this).val('');
			$deadline.val('');
			return;
		}
		if(!startInterDateV||!matureDateV){
			$deadline.val('');
			return;
		}
		$deadline.val(calculateDays(startInterDateV,matureDateV));
	}
//------------------------------------//页面保存
//	$(document).on('click','#doBidSave',function(){
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
//		$("#t20007Bond_form").ajaxSubmit(option);
//	});

function dealBondData(){
	var payInterType = $("select[name='bondCntr.payInterType']").val();
	if(payInterType!="2"){
		$("select[name='bondCntr.basicInterRate']").removeClass("required");
	}else{
		$("select[name='bondCntr.basicInterRate']").addClass("required");
	}
	return true;
}