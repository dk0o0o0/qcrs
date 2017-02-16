

//托收地址重打查询
function queryCopack(){
	var url="/cpms/linkus/capital/authority/paCopack/queryCopack?viqueryFlag=query";
	if($('#id_printDate').val()!=null&&$('#id_printDate').val()!=""){
		url=url+"&viPrintDate="+$('#id_printDate').val();
	}
	if($('#id_packId').val()!=null&&$('#id_packId').val()!=""){
		url=url+"&viPackId="+$('#id_packId').val();
	}
	if($('#id_billNo').val()!=null&&$('#id_billNo').val()!=""){
		url=url+"&viBillNo="+$('#id_billNo').val();
	}

	var from1 = $('form.criteria');
	if (from1 && from1.length >= 0) {
		var from2 = from1[from1.length - 1];
		var id = from2.id;
		var actionBase = url;
		$("#" + id)[0].action = actionBase;
		$("#" + id).trigger("submit");
	}
}
//托收地址打印查询
function toSearchCollectionBill(formid,target){
	var url="/cpms/linkus/capital/bill/bussiness/billCollection?viqueryFlag=query&targetFlag="+target;
	if($('#id_viBillNo').val()!=null&&$('#id_viBillNo').val()!=""){
		url=url+"&viBillNo="+$('#id_viBillNo').val();
	}
	if($('#id_viContractNo').val()!=null&&$('#id_viContractNo').val()!=""){
		url=url+"&viContractNo="+$('#id_viContractNo').val();
	}
	if($('#id_viOccupyLimitType').val()!=null&&$('#id_viOccupyLimitType').val()!=""){
		url=url+"&viOccupyLimitType="+$('#id_viOccupyLimitType').val();
	}
	if($('#id_viAssetsType').val()!=null&&$('#id_viAssetsType').val()!=""){
		url=url+"&viAssetsType="+$('#id_viAssetsType').val();
	}
	if($('#firstBuyDate1').val()!=null&&$('#firstBuyDate1').val()!=""){
		url=url+"&viCollectDateStart="+$('#firstBuyDate1').val();
	}
	if($('#firstBuyDate2').val()!=null&&$('#firstBuyDate2').val()!=""){
		url=url+"&viCollectDateEnd="+$('#firstBuyDate2').val();
	}
	if($('#makerDate1').val()!=null&&$('#makerDate1').val()!=""){
		url=url+"&viMatureDateStart="+$('#makerDate1').val();
	}
	if($('#makerDate2').val()!=null&&$('#makerDate2').val()!=""){
		url=url+"&viMatureDateEnd="+$('#makerDate2').val();
	}
	//$('#'+target).attr('data-url');
	$('#'+formid).attr('action',url);
	$('#'+formid).trigger("submit");
}



//页面条件控制
function checkboxPrintClick(){
	if ($("#checkboxPrintDate").prop("checked")) {
		$("#id_printDate").removeAttr("readonly");
	}else{
		$("#id_printDate").attr("readonly","true");
	}	
}
//页面条件控制
function checkboxMatureDateClick(){
	if ($("#checkboxMakerDate").prop("checked")) {
		$("#makerDate1").removeAttr("readonly");
		$("#makerDate2").removeAttr("readonly");
	}else{
		$("#makerDate1").attr("readonly","true");
		$("#makerDate2").attr("readonly","true");
	}
		
}

function checkboxCollectDateClick(){
	if ($("#checkboxBuyDate").prop("checked")) {
		$("#firstBuyDate1").removeAttr("readonly");
		$("#firstBuyDate2").removeAttr("readonly");
	}else{
		$("#firstBuyDate1").attr("readonly","true");
		$("#firstBuyDate2").attr("readonly","true");
	}	
}
function checkSelectBill(){
	return false;
}
//托收地址打印
function printSelectBills(){
	
		var length = $("#id_billcollction_print table tbody tr").length;
		var selectLength=0;//总行数
		//var selectedRow=0;//被选中行的下标
		var billNoList="";
		var contractNoList="";
		//计算总行数
		for (var i = 0; i < length; i++) {
			var select = $("#id_billcollction_print table tbody").find("tr").eq(i).attr("class");
			if (select == "selected") {
				//selectedRow=i;
				var billNo=$("#id_billcollction_print table tbody").find("tr").eq(i).find("td").eq(1).text();
				var contractNo=$("#id_billcollction_print table tbody").find("tr").eq(i).find("td").eq(2).find("input").eq(0).val();
				billNoList=billNoList+ billNo+",";
				contractNoList=contractNoList+  contractNo+",";
				selectLength++;
			}
		}
		if(billNoList.length>1){
			billNoList=billNoList.substring(0,billNoList.length-1);
		}
		if(contractNoList.length>1){
			contractNoList=contractNoList.substring(0,contractNoList.length-1);
		}
		//校验如果selectLength=0则表示没选中一行，如果selectLength>1表示选中了多行
		if(selectLength<1){
			doTheAlert("提示","未勾选打印信息！");
			return false;
		}else{
			//后台ajax校验
				$.ajax({
					type : "post",
					global : false,
					async : false,
					url : '/cpms/linkus/capital/bill/bussiness/billCollection/checkAddress?billNoList='+billNoList+"&contractNoList="+contractNoList,
					dataType : "json",
					success : function(data) {
				   		if (data != null) {
							if(typeof(data.msg) !="undefined" && data.msg.length>1){
								$.messager.confirm('确认',data.msg,function(r){
									if(r){
										//$('#id_printAddress').attr("href","/cpms/linkus/capital/bill/bussiness/billCollection/print?billNoList="+billNoList+"&contractNoList="+contractNoList);
										//exportSelectBills('2');
										window._open("/cpms/linkus/capital/bill/bussiness/billCollection/print?billNoList="+billNoList+"&contractNoList="+contractNoList);
									}
								});
							}else{
								//$('#id_printAddress').attr("href","/cpms/linkus/capital/bill/bussiness/billCollection/print?billNoList="+billNoList+"&contractNoList="+contractNoList);
								//$('#id_printAddress').click();
								window._open("/cpms/linkus/capital/bill/bussiness/billCollection/print?billNoList="+billNoList+"&contractNoList="+contractNoList);
										
							}
						}
					},
					error:function(){
						doTheAlert("提示","校验打印地址是吧！");
					}
				});				
			//printSelectBills('2');
		}
	//}	
}


//打印导出预览
function exportSelectBills(){
	$('.glyphicon.glyphicon-download-alt.clickable').click();
}
    $(document).on('click', 'span.glyphicon.glyphicon-download-alt', function(ev) {
 		var length = $("#id_billcollction_print table tbody tr").length;
		var selectLength=0;//总行数
		//var selectedRow=0;//被选中行的下标
		var billNoList="";
		var contractNoList="";
		//计算总行数
		for (var i = 0; i < length; i++) {
			var select = $("#id_billcollction_print table tbody").find("tr").eq(i).attr("class");
			if (select == "selected") {
				//selectedRow=i;
				var billNo=$("#id_billcollction_print table tbody").find("tr").eq(i).find("td").eq(1).text();
				var contractNo=$("#id_billcollction_print table tbody").find("tr").eq(i).find("td").eq(2).find("input").eq(0).val();
				billNoList=billNoList+ billNo+",";
				contractNoList=contractNoList+  contractNo+",";
				selectLength++;
			}
		}
		if(billNoList.length>1){
			billNoList=billNoList.substring(0,billNoList.length-1)
		}
		if(contractNoList.length>1){
			contractNoList=contractNoList.substring(0,contractNoList.length-1)
		}
		//校验如果selectLength=0则表示没选中一行，如果selectLength>1表示选中了多行
		if(selectLength<1){
			doTheAlert("提示","未勾选打印信息！");
			return false;
		}else{
			var url="/cpms/linkus/capital/bill/bussiness/billCollection/exportAddress?billNoList="+billNoList+"&contractNoList="+contractNoList;
			var form= $('.noajax.plain[type="submit"]');
			if(form.hasClass('noajax')&&form.hasClass('plain')){
				form.attr('formAction',url);
				//$('.glyphicon.glyphicon-download-alt.clickable').click();
			}else{
				return ;
			}
		}   	
    	//var url="/cpms/linkus/capital/bill/bussiness/billCollection/exportAddress?billNoList="+billNoList+"&contractNoList="+contractNoList;
    	//this.parentNode.formAction = url;
    	//exportSelectBills();
    }); 
//解绑
function  cancelPrint(){
 	if(checkIsSelect()){
				$.ajax({
					type : "post",
					global : false,
					async : true,
					url : '/cpms/linkus/capital/bill/bussiness/billCollection/cancelPrint?packIdList='+packIdList,
					dataType : "json",
					success : function(data) {
				   		if (data != null) {
							if(typeof(data.msg) !="undefined" )
								getTheMessager().alert("提示","解绑成功!",'',function(){
									queryCopack();
						 		});
						}
				   		
					},
					error:function(){
						doTheAlert("提示","解绑失败!");
					}
				});	
 	}else{
 		return false;
 	}
}

var packIdList="";
function checkIsSelect(){
		packIdList="";
		var length = $("#paCopack_form table tbody tr").length;
		var selectLength=0;//总行数
		//计算总行数
		for (var i = 0; i < length; i++) {
			var select = $("#paCopack_form table tbody").find("tr").eq(i).attr("class");
			if (select == "selected") {
				//selectedRow=i;
				var packId=$("#paCopack_form table tbody").find("tr").eq(i).find("td").eq(1).text();
				packIdList=packIdList+packId+",";
				selectLength++;
			}
		}
		if(packIdList.length>1){
			packIdList=packIdList.substring(0,packIdList.length-1)
		}
		if(selectLength<1){
			doTheAlert("提示","未勾选打印信息！");
			return false;
		}else{
			return true;
		}
}    
//重打
function  printAgain(){
	packIdList="";
	if(checkIsSelect()){
 		window._open("/cpms/linkus/capital/bill/bussiness/billCollection/printAgain?packIdList="+packIdList);
 		getTheMessager().alert("提示","重打成功!",'',function(){
			queryCopack();
 		});
 	}else{
 		return false;
 	}
}
//托收重打查询双击票据信息

$(document).on("dblclick", "#paCopack_form tr", function() {
		var packId=$(this).find("td").eq(1).text();
		window.open("/cpms/linkus/capital/bill/bussiness/billCollection/showDetail?viqueryFlag=query&viPackId="+packId);
});	

//------查询条件

function countDetail(){
	var totalCount=0;//明细总条数
    var checkCount=0;
    var totalAmount=0;//明细总金额
    var totalCheckAmount=0;

	
	
	$("input[name='checkname']").each(function() {
		totalCount+=1;
		totalAmount+=parseFloat(getMoneyValue($(this).parents("td").parents("tr").children().children("[class='amount noatoc faceAmount']").val()));
		if ($(this).prop("checked")) {
			//被指定删除数据列
			if(getMoneyValue($(this).parents("td").parents("tr").children().children("[class='amount noatoc faceAmount']").val())>0){
				totalCheckAmount+=parseFloat(getMoneyValue($(this).parents("td").parents("tr").children().children("[class='amount noatoc faceAmount']").val()));
				checkCount+=1;
			}
		}
	});	
	$("#checkCount").text("选中条数："+checkCount+"笔");
	$("#totalCheckAmount").text("选中总金额："+totalCheckAmount+"元");
	
}
function getBillNoList(){
	var length = $("#id_billCollection_list table tbody tr").length;
	var selectLength=0;//总行数
	//var selectedRow=0;//被选中行的下标
	var billNoList="";
	//计算总行数
	for (var i = 0; i < length; i++) {
		var select = $("#id_billCollection_list table tbody").find("tr").eq(i).attr("class");
		if (select == "selected") {
			//selectedRow=i;
			var billNo=$("#id_billCollection_list table tbody").find("tr").eq(i).find("td").eq(1).text();
			billNoList=billNoList+ billNo+",";
			selectLength++;
		}
	}
	if(billNoList.length>1){
		billNoList=billNoList.substring(0,billNoList.length-1);
		return billNoList;
	}
	//校验如果selectLength=0则表示没选中一行，如果selectLength>1表示选中了多行
	if(selectLength<1){
		doTheAlert("提示","未勾选打印信息！");
		return "";
	}
}

function getAllBillNo(){
	var length = $("#id_billCollection_list table tbody tr").length;
	var billNoList="";
	//计算总行数
	for (var i = 0; i < length; i++) {
		var billNo=$("#id_billCollection_list table tbody").find("tr").eq(i).find("td").eq(0).text();
		billNoList=billNoList+ billNo+",";
	}
	if(billNoList.length>1){
		billNoList=billNoList.substring(0,billNoList.length-1);
	}
	return billNoList;
}


function printTsBills(){
	var url="/cpms/linkus/capital/bill/bussiness/billCollection/printTsBills?viqueryFlag=query";
	if($('#id_viContractNo').val()!=null&&$('#id_viContractNo').val()!=""){
		url=url+"&viContractNo="+$('#id_viContractNo').val();
	}
	if($('#id_viOccupyLimitType').val()!=null&&$('#id_viOccupyLimitType').val()!=""){
		url=url+"&viOccupyLimitType="+$('#id_viOccupyLimitType').val();
	}
	if($('#id_viAssetsType').val()!=null&&$('#id_viAssetsType').val()!=""){
		url=url+"&viAssetsType="+$('#id_viAssetsType').val();
	}
	if($('#firstBuyDate1').val()!=null&&$('#firstBuyDate1').val()!=""){
		url=url+"&viCollectDateStart="+$('#firstBuyDate1').val();
	}
	if($('#makerDate1').val()!=null&&$('#makerDate1').val()!=""){
		url=url+"&viMatureDateStart="+$('#makerDate1').val();
	}
	if($('#makerDate2').val()!=null&&$('#makerDate2').val()!=""){
		url=url+"&viMatureDateEnd="+$('#makerDate2').val();
	}
	var result =getAllBillNo();
	if(result.length>1){
		window._open(url);
	}
}


function exportTsBills(){
	var url="/cpms/linkus/capital/bill/bussiness/billCollection/exportTsBills?viqueryFlag=query";
	if($('#id_viContractNo').val()!=null&&$('#id_viContractNo').val()!=""){
		url=url+"&viContractNo="+$('#id_viContractNo').val();
	}
	if($('#id_viOccupyLimitType').val()!=null&&$('#id_viOccupyLimitType').val()!=""){
		url=url+"&viOccupyLimitType="+$('#id_viOccupyLimitType').val();
	}
	if($('#id_viAssetsType').val()!=null&&$('#id_viAssetsType').val()!=""){
		url=url+"&viAssetsType="+$('#id_viAssetsType').val();
	}
	if($('#firstBuyDate1').val()!=null&&$('#firstBuyDate1').val()!=""){
		url=url+"&viCollectDateStart="+$('#firstBuyDate1').val();
	}
	if($('#makerDate1').val()!=null&&$('#makerDate1').val()!=""){
		url=url+"&viMatureDateStart="+$('#makerDate1').val();
	}
	if($('#makerDate2').val()!=null&&$('#makerDate2').val()!=""){
		url=url+"&viMatureDateEnd="+$('#makerDate2').val();
	}
	
	var result =getAllBillNo();
	if(result.length>1){
		window._open(url);
	}
}
function exportTsNotPrintBills(){
	var billNoList="";
	var length = $("#id_billcollction_noPrint table tbody tr").length;
	if($("#id_billcollction_noPrint table tbody").find("tr").eq(0).find("td").eq(1).text()!=""){
		for (var i = 0; i < length; i++) {
		//删除被指定数据列
			billNoList+=$("#id_billcollction_noPrint table tbody").find("tr").eq(i).find("td").eq(1).text()+",";
		}
	}else{
		doTheAlert('提示',"数据为空，不能执行此操作！");
		return false;
	}
	billNoList=billNoList.substring(0,billNoList.length-1);
	window._open("/cpms/linkus/capital/bill/bussiness/billCollection/exportTsNotPrintBills?billNoList="+billNoList);
}

function updateCollectBillStatus(parms){
	urls='/cpms/linkus/capital/bill/bussiness/billCollection/updateBillPrintStatus?'+parms;
	$.ajax({
		type : "post",
		global : false,
		async : false,
		url :urls,
		dataType : "json",
		success : function(data) {
			if (data.tip!=null && data.tip!=""){
				doTheAlert('提示',data.tip);
			}
		}
	});

}

//打印托收未打印票据
function printTsNotPrintBills(){
	
	var href="/cpms/linkus/capital/report/ptPrintTask/printTsNotPrintBills";
	var length = $("#id_billcollction_noPrint table tbody tr").length;
	var selectLength = 0;
	var billParms="";
	var cntrParms="";
	for (var i = 0; i < length; i++) {
		var select = $("#id_billcollction_noPrint tbody tr").eq(i).children().eq(0).children().eq(0);
		if (select[0].checked == true) {
			selectLength++;
			billParms=billParms+$("#id_billcollction_noPrint tbody tr").eq(i).children().eq(1).text()+",";
			cntrParms=cntrParms+$("#id_billcollction_noPrint tbody tr").eq(i).children().eq(4).text()+",";
		}
	}
	//校验如果selectLength=0则表示没选中一行，如果selectLength>1表示选中了多行
	if(selectLength<1){
		doTheAlert("提示","请表格中勾选中一条记录才能批量打印！");
		return false;
	}
	if(cntrParms.length>0){
		cntrParms=cntrParms.substring(0,cntrParms.length-1);
	}
	if(billParms.length>0){
		billParms=billParms.substring(0,billParms.length-1);
	}
	updateCollectBillStatus("contractNos="+cntrParms);
	printDelete();
	href=href+"?constractnoList="+cntrParms+"&billNoList="+billParms;
    window._open(href);  
}
//多笔明细数据删除
function printDelete(){
	
	$("#id_billcollction_noPrint table tbody tr[class='selected']").remove();
	
}
function exportOutBankBills(){
//	var billNoList="";
//	$("input[name='checkname3']").each(function() {
//		//删除被指定数据列
//		billNoList+=$(this).parents("td").parents("tr").children().children("[class='billNo']").val()+",";
//		
//	});
//	billNoList=billNoList.substring(0,billNoList.length-1);
	var result =getAllBillNo();
	if(result.length>1){
	window._open("/cpms/linkus/capital/bill/bussiness/billCollection/exportOutBankBills?billNoList="+result);
	}
}
function printOutBankBills(){
//	var billNoList="";
//	$("input[name='checkname3']").each(function() {
//		//删除被指定数据列
//		billNoList+=$(this).parents("td").parents("tr").children().children("[class='billNo']").val()+",";
//	});
//	billNoList=billNoList.substring(0,billNoList.length-1);
	var result =getAllBillNo();
	if(result.length>1){
	window._open("/cpms/linkus/capital/bill/bussiness/billCollection/printOutBankBills?billNoList="+result);
	}
}