/*************************************************************************************************
/* DESC       ：国库现金定期存款投标ＪＳ处理文件                                                                                                                                                                                 
/* AUTHOR     ：大资管平台项目组                                                                                                                                                                                 
/* CREATE     ：2016-04-29                                     
/* MODIFYLIST ： Name          Date         Reason                                                
/*              yourName      updateDate    modiReason                                               
/*              -------------------------------------------------------------   
*************************************************************************************************/

	//---------------------------------------//选定机构
	$(document).on('click','#result input[value="选择"]',
	function(){
		var str = ".".split('.');
		var agencyId = $(this).parents("tr").attr("id");
		var agencyName = $(this).parents("td").prev().text();
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
				$("input[name='bondCntr.counterpartyName']").val(agencyName);
				$("input[name='bondCntr.counterpartyNo']").val(agencyId);
				var z=0;
				if(typeof(data.details) !="undefined" )
			 		z = data.details.length;
				for(var i=0;i<z;i++){
					var json = data.details[i];
					if(json!=null)
					str[0] += "<option >"+json.custOpBankName+"</option>";
					str[1] += "<option >"+json.opBankAcctNo+"</option>";
				}
				$("select[name='bondCntr.transCountertyName']").html(str[0]);
				$("select[name='bondCntr.transCoutertyAcctNo']").html(str[1]);
				$("#addChangeShowName").children().remove();
			 }
			 closePage();
			},
			error:function(){
				doTheAlert('提示', errorTip);
			}
		});
	});

	//---------------------------------------//往来单位信息联动
	$(document).on('change','#bfc_counterpartyInfo select',
		function(){
			var index = $(this).children(":selected").index();
			console.log(index);
			for(var i=0;i<$("#bfc_counterpartyInfo select").length;i++){
				var $options = $("#bfc_counterpartyInfo select").eq(i).children();
				console.log("$options size = " + $options.length);
				console.log("a - b = "+($options.length-index));
				console.log(($options.length-index)>0);
				if(($options.length-index)>0){
					$("#bfc_counterpartyInfo select").eq(i).removeAttr("selected");
					$("#bfc_counterpartyInfo select").eq(i).children().eq(index).attr('selected','');
				}
			}
	});
	
	//修改起息/到期日        改变清算速度的时候触发期限计算
	$(document).on("blur","input[name='bondCntr.startInterDate'],input[name='bondCntr.maturityDate']",function(){
			calculateDaysInterval();
		});
	//输入回购利率触发到期金额计算
	$(document).on('blur','input[name="bondCntr.repoInterestRate"]',function(){
		calculateMaturityAmount();
	});
	//日期
	$(document).on('blur','input[name="bondCntr.startInterDate"],input[name="bondCntr.maturityDate"]',function(){
		var startInterDate = $("input[name='bondCntr.startInterDate']");
		var maturityDate = $("input[name='bondCntr.maturityDate']");
		var days = calculateDays(startInterDate.val(),maturityDate.val());
		if(days<=0){
			doTheAlert('提示','到期日必须大于起息日');
		}
	});
	
	
	//---------------------------------------//input页面保存
	
//	$(document).on('click','#doFiscalCashSave',doFiscalCashSave);
	
	
	//---------------------------------------//往来单位信息修改
	$(document).on('dblclick','.fiscalCashT',function(){
		var $theSelect = $(this).find("select");
		var $theInput  = $(this).next().find("input");
		$(this).hide();
		$theInput.val($theSelect.find("option.selected").text());
		$(this).next().show();
		$theInput.focus();
	});
	
	$(document).on('blur','.fiscalCashTHide',function(){
		var $theInput  = $(this).find("input");
		var $theSelect = $(this).prev().find("select");
		$(this).hide();
		if($theInput.val()){
			$theSelect.find("option:selected").removeAttr("selected");
			$theSelect.append("<option selected>"+$theInput.val()+"</option>");
		}
		$(this).prev().show();
	});

$(document).on('blur','input[name="bondCntr.maturityAmount"]',function(){
	calFiscalCashYSYJ();
});

//-------------------------------------------//
function dealBondData(){
	
		
		var startInterDate = $("input[name='bondCntr.startInterDate']");
		var maturityDate = $("input[name='bondCntr.maturityDate']");
		var days = calculateDays(startInterDate.val(),maturityDate.val());
		if(days<=0){
			doTheAlert('提示','到期日必须大于起息日');
			return false;
		}
	
	
		//将没有删除的明细表中数字的千分符去掉
		var $trs = $("#transDirection_0 tbody tr");
		for(var i=0;i<$trs.length;i++){
			input1 = $trs.eq(i).children().eq(5).children();
			input2 = $trs.eq(i).children().eq(6).children();
			if(input1)
			input1.val(removeThousandCharacter(input1.val()));
			if(input2)
			input2.val(removeThousandCharacter(input2.val()));
		}
		return true;
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
//		$("#t20024Bond_form").ajaxSubmit(option);
	}




function calculateDaysInterval(){
	//起息日/到期日/期限
	var startInterDate = $("input[name='bondCntr.startInterDate']").val();
	var maturityDate   = $("input[name='bondCntr.maturityDate']").val();
	var $dateInterval   = $("#dateInterval");
	if(!startInterDate&&!maturityDate){
		$dateInterval.val('');
		return;
	}
	if(startInterDate&&maturityDate){
	$dateInterval.val(calculateDays(startInterDate,getNonHoliday(maturityDate)));
		calculateMaturityAmount();
	}
}


//交易复核
function doTheCk(){
	var contractNo = $("input[name='bondCntr.contractNo']").val();
	$.ajax({
			type : "post",
			global : false,
			async : true,
			url : '/cpms/linkus/capital/bond/bussiness/t20024Bond/businessVerify',
			data : {
				"contractNo":contractNo
			},
			dataType : "json",
			success : function(data) {
			 	if (data != null&&data.success) {
			 		parent.$.messager.alert('提示', "已通过");
				 	parent.closePage();
				}
			},
			error:function(){
				doTheAlert('提示', errorTip);
			}
		});
}