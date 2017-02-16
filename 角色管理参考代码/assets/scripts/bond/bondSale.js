$(function(){
	
		$(document).on('click','#btn_close_zqPrSearch',closePage);
		
		$(document).on('change','#bondBusiessStatus',function(){
			var $status = $("#bondBusiessStatus");
			var $td = $("#bondSaletrInfoTable_1 tbody td");
			if($td.length!="0"){
				doTheAlert("提示","请删除明细后再选择是否为融入债！");
				if($status.val()=="0"){
					$status.val("1");
				}else if($status.val()=="1"){
					$status.val("0");
				}
				return false;
			}
		});
	
});

function dealBondData(){
		var coutertyBankAcctNo = $("select[name='bondCntr.coutertyBankAcctNo']").val();
		if(coutertyBankAcctNo==""||coutertyBankAcctNo==null){
			doTheAlert("提示","对手方托管账号为空，请更换托管场所。");
			return false;
		}
		if(!parseFloat($("#matureEarningRate").val())){
			doTheAlert("提示","持有至到期收益率录入有误或为空。");
			return false;
		}
		var pldval = $("#pldval").val();//偏离度
		var coutertyBankAcctNo = $("#coutertyBankSelect option:selected").val();
		$("input[name='bondCntr.coutertyBankAcctNo']").val(coutertyBankAcctNo);
		//保存前金额的校验
		var $totalBONDAM = $("#bondSaletrInfoTable_1 tbody td[class='totalBONDAM']");
		var totalBONDAM=0;
		var BONDAM = getMoneyValue($("input[name='bondCntr.BONDAM']").val())*1;//获取页面上(bondCntr表)的券面面值  (*1是将String转换为int型做加减)
		//总面值
		for(var i=0;i<$totalBONDAM.length;i++){
			bondAm = getMoneyValue($("input[name='bondCntr.teamBookItems["+i+"].BONDAM']").val());
			totalBONDAM +=  bondAm*1;//求出总和 (*1是为了可以直接相加,而不是拼接字符串)
		}
		if(BONDAM!=totalBONDAM){
			$.messager.alert('提示', '券面面值与明细中面值不符!'); 
			return false;
		}
		if(pldval*1>30){
			$.messager.alert('错误', '偏离度错误或超过30%!');
			return false;
		}
		
		return true;
	};