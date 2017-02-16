function verifyMaturityDate(){
	if(!validateMaturityDate($("#maturityDate").val(),$("#startInterDate").val())){
		//如果日期出错，则都赋起息日
		doTheAlert("提示","质押到期日必须大于起息日！");
		return false;
	}
	return true;
}


/**
 * 将选中的数据显示到质押页面并计算相关元素
 */
function addNoteToTableAndCaculate(){
	var tableName="table";
	addNoteToTable(tableName);
	count();
}


//计算总金额等
function count(){
		var trlen = $("#table tbody tr").length;
   //定义变量存放总计值
	var totalFaceAmount=0;
	for(var i=0;i<trlen;i=i+1){
		//贴现金额合计
		totalFaceAmount+=  getMoneyValue($("#bill_cntr30029 [class='faceAmount amount noatoc required']").eq(i).val())*1;
	}
	//**********合计信息赋值
	//张数
	if($("#table tbody tr").length>1){
		$("#itemSum").val(trlen);
	}else{//如果只有一行数据，判断是否是空的，空的则length=0;
		if($("#table tbody tr:eq(0) td:eq(1)").text()==""){
			$("#itemSum").val(0);
		}else{
			$("#itemSum").val(1);
		}
	}
	$("#faceAmount").val(totalFaceAmount.toFixed(2));
	
}
//保存编辑数据
function saveDetail(){
	//编辑页
	var formName = "bill30004_edit";
	//被修改明细保存
	newCreateOrUpdate(formName, $("#busiType").val());
	//关闭页面
	closePage();
	count();
}


//****************修改更新明细数据信息^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
function newCreateOrUpdate(formName, busiType) {
	// 获得所在行号
	var trNo = $('#' + formName + ' [id="trNo"]').val();
	var $info = $("#table tbody tr");
	// len和i为目标已有数据的行数
	var i = len = $info.length;
	// 循环获取目标源 x行中的所有列
	var $dest = $("#table tbody tr").eq(i).children();
	var td = $("#table tr:eq(0) th:eq(0)").parents("tr").children('th');
	//如果是更新，则根据行号取得该行去更新。
	var $dest = $("#table tbody tr").eq(trNo).children();
	//给每列赋值
	for (var i = 2; i < td.length*1-1; i = i + 1) {
		//将表头id 为 tb_id 截取 id
		var textid = td.eq(i).attr("id").substring(3);
		//如果存在该id对应的标签
		if ($('#' + formName + ' [id=detail_' + textid + ']').length > 0) {
			$dest.eq(i).children("input").val($('#' + formName + ' [id=detail_' + textid + ']').val());

		} 
		
	}
	
}


$(document).on('click','#do30029Save',
		function (){
		if (!checkDatasNull($("#billType").val())){
			return;
		}
	
	pubRGSave();
});
$(document).on('click','#MD_pass',
		function (){
		if (!checkDatasNull($("#billType").val())){
			return;
		}
	    pubAmendSave();
	});
