$(document).ready(function() {
	$(document).on('click', '#isDistribution', function() {
		$("#addDistribution").removeAttr("style");;
		$("#addDistribution").attr("style","display:block");
	});
	
	$(document).on('click', '#cancle', function() {
		$("#addDistribution").removeAttr("style");
		
		var id_detailsLen= $('#id_details').find('tr').length;
		for(var i=id_detailsLen-1;i>0;i--){
			$('#id_details').find('tr').eq(i).find('td:last i').eq(1).click();
		}			
        if(id_detailsLen>0){
        	$('#id_details').find('input').val('');
        }

		$("#addDistribution").attr("style","display:none");
		
	});
	
	
});
function closeviewsambusiness(){
 closePage();
 $('#id_querySaBusiness').click();
}
Observation.sameBusiness = function(container) {
	$('#sameBusiness_input', container).each(function() {
		var form = this;
		form.onsuccess = function() {
			closeviewsambusiness();
		}
	});
}



$(document).ready(function() {
	$(document).on('click', 'button[name="queryDptListBtn"]', function() {
		    //alert(1);
		
		    var baseAction="/cpms/linkus/capital/system/sameBusiness/queryDptToList?a=1"
		    var viName=$("#dptName").val();
		    var viEcdsStatus=$("#ticksPower").val();
		    if (viName != null && viName != '') {
		    	baseAction=baseAction+"&viName="+viName;
		    }
		    if (viEcdsStatus != null && viEcdsStatus != '') {
		    	baseAction=baseAction+"&viEcdsStatus="+viEcdsStatus;
		    }
			$("#sameBusiness_form").attr("action",baseAction);
			$("#sameBusiness_form").trigger("submit");

	});
});

$(document).ready(function() {
	$(document).on('click', 'button[name="query_matching"]', function() {
		var from1 = $('form.criteria');
		if (from1 && from1.length >= 0) {
			var from2 = from1[from1.length - 1];
			var id = from2.id;
			var actionBase = "./matchingQuery?a=1";
			if (prodCode != null && prodCode != '') {
				actionBase = actionBase + "&prodCode-op=EQ&prodCode="
						+ prodCode;
			}
			$("#" + id)[0].action = actionBase;
			$("#" + id).trigger("submit");
		}
	});
	

	
//	$(document).on('click', '#addSameBusiness',function() {
//	   	var upperId   = $("#upperId").val();	  
//		if(upperId==null||upperId==''){
//			doTheAlert("提示","请选择机构！");
//		}
//		else{	
//			window.open("/cpms/linkus/capital/system/sameBusiness/input?upperId="+upperId+"&isEdit=1");
//		}
//	});
	
	$(document).on('click', '#modiSameBusiness',function() {
		var upperId   = $("#upperId").val();
		var length = $("#sameBusiness_form table tbody tr").length;
		var selectLength=0;//总行数
		var selectedRow=0;//被选中行的下标
		//计算总行数
		for (var i = 0; i < length; i++) {
			var select = $("#sameBusiness_form table tbody").find("tr").eq(i).attr("class");
			if (select == "selected") {
				selectedRow=i;
				selectLength++;
			}
		}
		//校验如果selectLength=0则表示没选中一行，如果selectLength>1表示选中了多行
		if(selectLength<1){
			doTheAlert("提示","请表格中勾选中一条行外机构信息！");
			return false;
		}else if(selectLength>1){
			doTheAlert("提示","只能勾选中一条行外机构修改！");
			return false;
		}else if(selectLength==1){
			var tr = $("#sameBusiness_form table tbody").find("tr").eq(selectedRow);
			var id = tr.find("td")[0].childNodes[0].value;
			//var checkRoleId = tr.find("td")[1].childNodes[0].value;
			window.open("/cpms/linkus/capital/system/sameBusiness/edit?id="+id+"&isEdit=1&upperId="+upperId+"");

		}		

	});
	

});

function saveSameBusiness(){
	if(!checkData()){
		return;
	}
	$('#sameBusiness_input').submit();
}
function checkData(){
	var flag=true;
	var sameBusinessId=$("#sameBusinessId").val();
	var sameBusinessName=$("input[name='sameBusiness.name']").val();
	var sameBusinessTransUnitId=$("input[name='sameBusiness.transUnitId']").val();
	  $.ajax({
          type : "post",
          global : false,
          async : false,
          url : '/cpms/linkus/capital/system/sameBusiness/checkData',
          data : {
        	"sameBusinessId" : sameBusinessId,
          	"sameBusinessName" : sameBusinessName,
  			"transUnitId" : sameBusinessTransUnitId
          },
          dataType : "json",
          success : function(data) {
           if(data!=null) {
        	   	if(typeof(data.tip)!="undefined"){
        	   		doTheAlert('提示', data.tip);
        	   		$("input[name='sameBusiness.transUnitId']").val("");
        	   		flag=false;
        	   	}
        		if(typeof(data.isExist)!="undefined"){
        			doTheAlert('提示', data.isExist);
        			flag=false;
        		}
        	   
          	 }
          },
			error:function(){
				doTheAlert('提示', errorTip);
				flag=false;
			}
      });
	return flag;
}
//根据节点查询机构信息
function clickNode(node){
	var from1 = $('form.criteria');
	if (from1 && from1.length >= 0) {
		var from2 = from1[from1.length - 1];
		var id = from2.id;
		var actionBase = "/cpms/linkus/capital/system/sameBusiness?parent="+node.id;
		$("#" + id)[0].action = actionBase;
		$("#" + id).trigger("submit");
	}
//	$('#id_parent').val(node.id);
	document.getElementById("upperId").value=node.id;
	document.getElementById("id_viCounterpartyOrgType").value=node.counterpartyOrgType;
	
//	$('#id_samebusiness_query').submit();
}
function addSameBusiness(){
	   	var upperId   = $("#upperId").val();
	   	if(upperId==1){
	   		doTheAlert("提示","不能在一级目录下增加二级目录，二级目录暂时固定不变，不能添加!如有需要请联系管理员！");
	   		return false;
	   	}
	   	var viCounterpartyOrgType = $("#id_viCounterpartyOrgType").val();
		if(upperId==null||upperId==''){
			doTheAlert("提示","请选择机构！");
		}
		else{	
			window.open("/cpms/linkus/capital/system/sameBusiness/input?upperId="+upperId+"&isEdit=1&viCounterpartyOrgType="+viCounterpartyOrgType);
		}	
}


function querySaBusiness(){
	var parentid=document.getElementById("upperId").value
	var from1 = $('form.criteria');
	if (from1 && from1.length >= 0) {
		var from2 = from1[from1.length - 1];
		var id = from2.id;
		var actionBase = "/cpms/linkus/capital/system/sameBusiness?parent="+parentid;
		$("#" + id)[0].action = actionBase;
		$("#" + id).trigger("submit");
	}
//	$('#id_parent').val(parentid);
//	$('#id_parent').val(parentid);
//	$('#id_samebusiness_query').submit();
}
//根据模糊查询出机构信息
function achange(){

	var from1 = $('form.criteria');
	if (from1 && from1.length >= 0) {
		var from2 = from1[from1.length - 1];
		var id = from2.id;
		var actionBase = "/cpms/linkus/capital/system/sameBusiness?parent="+$("#agenid").val();
		$("#" + id)[0].action = actionBase;
		$("#" + id).trigger("submit");
	}
	$('#id_parent').val($("#agenid").val());
	document.getElementById("upperId").value=$("#agenid").val();
//	$('#id_samebusiness_query').submit();
	
}

$(document).on('click', '#searchTransUnit',function() {
    openCFETSTraBasicWindow();
});

/**
 * 打开交易中心账号信息搜索页面
 */
function openCFETSTraBasicWindow(){
   window.open('/cpms/linkus/capital/msg/cfets/cfetsTraBasicInfo/toSearch');
   //afterShowAddFocus();
    //window.open('/cpms/linkus/capital/interbank/bussiness/interbankIvcntr/toSearch');
}
function clearText(){
	
	$("input[name='sameBusiness.transUnitId']").val("");
}