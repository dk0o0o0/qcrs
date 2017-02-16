/**修改操作**/
function operateDeviate(editType){
	var length = $("#deviateParamter_form table tbody tr").length;
	var selectLength=0;//总行数
	var selectedRow=0;//被选中行的下标
	//计算总行数
	for (var i = 0; i <= length; i++) {
		var select = $("#deviateParamter_form table tbody").find("tr").eq(i).attr("class");
		if (select == "selected") {
			selectedRow=i;
			selectLength++;
		}
	}
	//校验如果selectLength=0则表示没选中一行，如果selectLength>1表示选中了多行
	if(selectLength<1){
		doTheAlert("提示","请在表格中勾选中一条信息!");
		return false;
	}else if(selectLength>1){
		doTheAlert("提示","只能勾选中一条信息!");
		return false;
	}else if(selectLength==1){
		var tr = $("#deviateParamter_form table tbody").find("tr").eq(selectedRow);
		if(editType=="modi"){
			modiDeviate(tr);
		}
	}	
}

/**修改操作**/
function modiDeviate(tr){
	var uid=tr.find("td")[0].childNodes[0].value;
	window.open("/cpms/linkus/capital/bond/base/DeviateParamter/edit?uid="+uid,{width:'40%'});
}

/**input页面保存操作**/
function saveDeviate(){
	var checkFlag=pubCheck("deviateParamter_input");
	if(!checkFlag){
		return ;
	}
	$("#deviateParamter_input").submit();
	closePage();
	location.reload(true);
}