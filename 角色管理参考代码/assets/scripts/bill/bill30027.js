$(document).on('click','#do30027Save',
		function (){
		$("select").removeAttr('disabled');
		$("toolbarBottom .end,toolbarBottomTips .end").hide();
			//通过判断页面上有无合同号，确定走经办保存/交易更正
		var $contractNo = $("#contractNo");
		var approvalOpinion = $('#approvalOpinion').val();;

		//流程图节点已经改为RD passFlag给PASS仅限于记账通过
		if(ifContractExist()){
			action = "/cpms/linkus/capital/bill/bussiness/t30027Bill/businessAmend?passFlag=FAIL&approvalOpinion="+approvalOpinion;
		}else{
			action = "/cpms/linkus/capital/bill/bussiness/t30027Bill/businessRegister?passFlag=FAIL&approvalOpinion="+approvalOpinion;
		}
		console.log(action);
		var option = {
			type:"post",
			dataType:"json",
			url:action,
			async:false,
			success:function(data){
				if(data!=null){
					if(data.normal){
						$("select").attr('disabled',true);
						$contractNo.val(data.contractNo);
						$("toolbarBottom .end,toolbarBottomTips .end").show();
						var href = "/cpms/linkus/capital/business/cpmsPublicStep/showAct?contractNo="+$("#contractNo").val()+"&busiType="+$("#busiType").val()+"&captitalAcctNo="+$("#counterpartyAcctNo").val();
						var $aLink = $("#bl_publicLink");
						$aLink.attr('href',href);
						$aLink.click();
						$aLink.removeAttr('href');
						$("#MD_end").show();
					}else{
						doTheAlert("警告",data.tip);
					}
					
				}
			},
			error:function(){
				
			}
		};
		$("#bill_cntr30027").ajaxSubmit(option);
        
	});
	
$(document).ready(function() {
	$(document).on('click', '#bill30027_input [id="noteType"]',
			function(event) {
				$("#elenoteinfo").toggle();
			});
});

function collectFlagClick(){ //托收否决定按钮的显示
	var ulWaitToCollect=$("#waitToCollect");
	var ulSave=$("#save");
	if($("#ckCollectFlag").isChecked){//显示入待托收按钮
		$("#collectFlag").val("");
			ulWaitToCollect.css("display","block");
			ulSave.css("display","none");
	}else{
		ulSave.css("display","block");
		ulWaitToCollect.css("display","none");
	}

}
function findBillCntr(){
	//1.获取所有筛选条件
	var params="";
	if($("#inputDate").is(':checked')){
		var inputDate1=$("#inputDate1").val();
     	var inputDate2=$("#inputDate2").val();
     	params+="inputDate1="+inputDate1+"&";
     	params+="inputDate2="+inputDate2+"&";
	}
	var counterpartyAcctNo=$("#unitId").val();
	params+="counterpartyAcctNo="+counterpartyAcctNo+"&";
	
	var billNo=$("#billNo").val();
	params+="billNo="+billNo+"&";
	
	if($("#inputDate").is(':checked')){
		var flag="true";
	}else{
		var flag="false";
	}
	params+="flag="+flag+"&";
	params=params.substring(0,params.lastIndexOf("&"));
	$.ajax({
		type : "post",
		global : false,
		async : false,
		url : '../bussiness/t30027Bill/findBillsByParams?'+params,
		dataType : "json",
		success : function(data) {
			if (data != null) {
			//取得table的所有表头
			var $dest = $("#resultTable tbody tr").eq(i).children();

			var innerHTML="";
			var i;
			$dest.eq(1).text(i + 1);
			for (i =0; i < data.billcntrlist.length; i = i + 1) {
				innerHTML+="<tr><td><input type='checkbox' name='checkname' id='checkname' />"+(i*1+1)+"</td>";
				innerHTML+="<td>"+data.notelist[i]["contractNo"]+"</td>";
				innerHTML+="<td>"+counterpartyAcctNo+"</td>";
				innerHTML+="<td>"+data.notelist[i]["inputDate"]+"</td>";
				innerHTML+="<td>"+billNo+"</td></tr>";
			}
			$("#resultTable tbody tr").remove();
			$("#resultTable tbody").append(innerHTML);
			}
		}
	});
}