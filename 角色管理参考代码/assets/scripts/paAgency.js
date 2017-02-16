/*************************************************************************************************
/* DESC       ：机构管理ＪＳ处理文件                                                                                                                                                                                 
/* AUTHOR     ：大资管平台项目组                                                                                                                                                                                 
/* CREATE     ：2016-04-01                                     
/* MODIFYLIST ： Name          Date         Reason                                                
/*              yourName      updateDate    modiReason                                               
/*              -------------------------------------------------------------   
*************************************************************************************************/


/**
 * @Author 刘佳
 * @Name checkedMenuNode点击菜单树结构复选框一级节点方法
 * @Return null
 * @Param node 节点
 * @Description 展开节点下所有子节点，给所有子节点checked赋值为父节点的checked
 * @Throws null
 **/
$(document).ready(function() {
	$('#addPaAgency').click(function(event) {
		var upperId = $("#upperId").val();
		var upperName = $("#upperName").val();
		var upperCode = $("#upperCode").val();
		if (upperId == null || upperId == '') {
			doTheAlert("提示","请在左边机构树中点击选择一个机构！");
			return false
		} else {
			window.open("/cpms/linkus/capital/authority/paAgency/input?upperId="
					+ upperId + "&upperCode=" + upperCode + "&upperName="
					+ encodeURI(upperName) + "&isEdit=1");
		}
	});
});


/**
 * @Author 刘佳
 * @Name checkedMenuNode点击菜单树结构复选框一级节点方法
 * @Return null
 * @Param node 节点
 * @Description 展开节点下所有子节点，给所有子节点checked赋值为父节点的checked
 * @Throws null
 **/
Observation.paAgency = function(container) {
	$('#paAgency_input', container).each(function() {
		var form = this;
		form.onsuccess = function() {
			$('.ui-dialog-titlebar-close', $(form).closest('.ui-dialog')).click();
			queryAgency();
			//$('#id_paAgency_query').submit();
		}
	});
}

function queryAgency() {
	var upperId=document.getElementById("upperId").value;
	var from1 = $('form.criteria');
	if (from1 && from1.length >= 0) {
		var from2 = from1[from1.length - 1];
		var id = from2.id;
		var actionBase = "/cpms/linkus/capital/authority/paAgency?upperId="+upperId;
		$("#" + id)[0].action = actionBase;
		$("#" + id).trigger("submit");
	}
	$('#id_parent').val(document.getElementById("upperId").value);
	//document.getElementById("upperName").value = node.name;
	//document.getElementById("upperCode").value = node.departmentCode;
	//$('#id_paAgency_query').submit();
}
/**
 * @Author 刘佳
 * @Name checkedMenuNode点击菜单树结构复选框一级节点方法
 * @Return null
 * @Param node 节点
 * @Description 展开节点下所有子节点，给所有子节点checked赋值为父节点的checked
 * @Throws null
 **/
function clickDptNode(node) {
	 var no=$('.treeview.li.active').data('treenode');
	var from1 = $('form.criteria');
	if (from1 && from1.length >= 0) {
		var from2 = from1[from1.length - 1];
		var id = from2.id;
		var actionBase = "/cpms/linkus/capital/authority/paAgency?parent=" + node.id;
		$("#" + id)[0].action = actionBase;
		$("#" + id).trigger("submit");
	}
	$('#id_parent').val(node.id);
	document.getElementById("upperId").value = node.id;
	document.getElementById("upperName").value = node.name;
	document.getElementById("upperCode").value = node.departmentCode;
	//$('#id_paAgency_query').submit();
}
