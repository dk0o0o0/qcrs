/**
 * 机构树点击事件
 * */
function clickFlowDptNode(node) {
	var from1 = $('form.criteria');
	document.getElementById("departmentCode").value = node.departmentCode;
	//ajax刷新列表
	if (from1 && from1.length >= 0) {
		var from2 = from1[from1.length - 1];
		var id = from2.id;
		var actionBase = "/cpms/linkus/capital/workflow/xtExaminepurView?departmentCode=" + node.departmentCode;
		$("#" + id)[0].action = actionBase;
		$("#" + id).trigger("submit");
	}
}
function pathNameChange(){
	var name=$('#id_flowPathName').val();
	var tabletr=$('#id_tbody_voList').find("tr");
	for(var i=0;i<tabletr.length;i++){
	   tabletr.eq(i).find("td").eq(11).find("span").text(name);
	}
}
function closeXtExaminepur(){
	var test=$('#id_queryExaminepurView',window.parent.document); 
	$('.ui-dialog-titlebar-close').click();
	//$('#id_queryExaminepurView',window.parent.document).click();
}
function approveExaminepur(){
		var length = $("#xtExaminepurView_form table tbody tr").length;
		var selectLength=0;//总行数
		var selectedRow=0;//被选中行的下标
		//计算总行数
		for (var i = 0; i < length; i++) {
			var select = $("#xtExaminepurView_form table tbody").find("tr").eq(i).attr("class");
			if (select == "selected") {
				selectedRow=i;
				selectLength++;
			}
		}
		//校验如果selectLength=0则表示没选中一行，如果selectLength>1表示选中了多行
		if(selectLength<1){
			doTheAlert("提示","请表格中勾选中一条需要复核的信息！");
			return false;
		}else if(selectLength>1){
			doTheAlert("提示","只能勾选中一条信息复核！");
			return false;
		}else if(selectLength==1){
			var tr = $("#xtExaminepurView_form table tbody").find("tr").eq(selectedRow);
			var flowId = tr.find("td")[1].childNodes[0].value;
			var flowOperUserId=tr.find("td")[5].childNodes[0].value;
			var status=tr.find("td")[6].childNodes[0].value;
			if(flowOperUserId==$('#id_currentUserId').val()){
				doTheAlert("提示","不能复核自己添加的审批流！");
				return false;
			}
			if(status=="1"){
				doTheAlert("提示","该流程已经复核，不能再次复核！");
				return false;
			}
			$.ajax({
				type : "post",
				global : false,
				async : true,
				url : '/cpms/linkus/capital/workflow/xtExaminepurView/approveByFlowId?flowId='+flowId,
				dataType : "json",
				success : function(data) {
					doTheAlert("提示",data.tip);
					$('#id_queryExaminepurView').click();
				},
				error:function(){
					doTheAlert("提示","复核流程失败！");
				}
			});
		}
}

function queryExaminepurView(){
	var from1 = $('form.criteria');
	if (from1 && from1.length >= 0) {
		var from2 = from1[from1.length - 1];
		var id = from2.id;
		var actionBase = "/cpms/linkus/capital/workflow/xtExaminepurView?departmentCode=" + $('#departmentCode').val();
		$("#" + id)[0].action = actionBase;
		$("#" + id).trigger("submit");
	}
}

/**
 * 业务类型改变事件
 * */
function busiTypeChange() {
	//异步加载依据信息
	var busiType=$('#id_busiType').val();
	$('#id_typeset_tab li').eq(0).removeAttr("class");
	$("#id_typeset").data("url","/cpms/linkus/capital/workflow/xtExaminepurView/getTypesetPage?busiType=" + busiType+"&isNew=true");
	$('#id_typeset_tab a').eq(0).click();
	//异步加载维度信息
	$('#id_parmset_tab li').eq(0).removeAttr("class");
	$("#id_parmset").data("url","/cpms/linkus/capital/workflow/xtExaminepurView/getParmsetPage?busiType=" + busiType+"&isNew=true");
	$('#id_parmset_tab a').eq(0).click();
}

/**
 * 机构改变事件
 * */
function departmentChange(){
	$("#id_roleIde").find("option").remove();
    if($("#id_view_departmentCode").val()==null||$("#id_view_departmentCode").val()==""){
    	return ;
    }
	//异步加载角色信息
	
	var departmentCode=$("#id_view_departmentCode").val();
	var html = "";
	$.ajax({
			type : "post",
			global : false,
			async : true,
			url : '/cpms/linkus/capital/workflow/xtExaminepurView/getRoleList?departmentCode='+departmentCode,
			dataType : "json",
			success : function(data) {
				 if (data != null) {
					var z=0;
					if(typeof(data.roleList) !="undefined" )
				 		z = data.roleList.length;
					for(var i=0;i<z;i++){
						var paRole = data.roleList[i];
						console.log("paRole " + paRole);
						if(paRole!=null){
							html += "<option value='"+paRole.roleId+"' >"+paRole.roleName+"</option>";
						}
					}
					$("#id_roleIde").append(html);
				}
			},
			error:function(){
				doTheAlert("提示","查询角色失败！");
			}
	});
}
function changeExamType(examTypeId){
	var examTypeId=examTypeId;
	$.ajax({
			type : "post",
			global : false,
			async : true,
			url : '/cpms/linkus/capital/workflow/xtExaminepurView/getExamType?examTypeId='+examTypeId,
			dataType : "json",
			success : function(data) {
				 if (data != null) {
				 	$('#id_contractBasisType').attr("disabled",false);
					var z=0;
					if(typeof(data.examTypeSet) !="undefined" ){
						$('#id_contractBasisType').removeAttr('checked');
						if("1"==data.examTypeSet.contractOnly){
							$('#id_contractBasisType').click();
						}
						//alert(data.examTypeSet.approvalBasisId);
						//data.roleList.examTypeSet.approvalBasisId
					}else{
						$('#id_contractBasisType').removeAttr('checked');
					}
				 }else{
				 	$('#id_contractBasisType').removeAttr('checked');
				 }
				 $('#id_contractBasisType').attr("disabled",true);
			},
			error:function(){
				$('#id_contractBasisType').removeAttr('checked');
			}
	});	
}
function setdepartmentbymodi(roleid){
	$("#id_roleIde").find("option").remove();
    if($("#id_view_departmentCode").val()==null||$("#id_view_departmentCode").val()==""){
    	return ;
    }
	//异步加载角色信息
	
	var departmentCode=$("#id_view_departmentCode").val();
	var html = "<option>-请选择-</option>";
	$.ajax({
			type : "post",
			global : false,
			async : true,
			url : '/cpms/linkus/capital/workflow/xtExaminepurView/getRoleList?departmentCode='+departmentCode,
			dataType : "json",
			success : function(data) {
				 if (data != null) {
					var z=0;
					if(typeof(data.roleList) !="undefined" )
				 		z = data.roleList.length;
					for(var i=0;i<z;i++){
						var paRole = data.roleList[i];
						console.log("paRole " + paRole);
						if(paRole!=null){
							if(roleid==paRole.roleId){
								html += "<option value='"+paRole.roleId+"' selected >"+paRole.roleName+"</option>";
							}else{
								html += "<option value='"+paRole.roleId+"' >"+paRole.roleName+"</option>";
							}
							
						}
					}
					$("#id_roleIde").append(html);
				}
			},
			error:function(){
				doTheAlert("提示","查询角色失败！");
			}
	});
}

function checkData(addflag){
	if($('#id_busiType').val()==null||$('#id_busiType').val()==""){
		doTheAlert("提示","请选择业务类型!");
		return false;
	}
	if($('#id_view_departmentCode').val()==null||$('#id_view_departmentCode').val()==""){
		doTheAlert("提示","请选择机构!");
		return false;
	}
	if($('#id_roleIde').val()==null||$('#id_roleIde').val()==""){
		doTheAlert("提示","请选择角色!");
		return false;
	}else{
		
			var length = $("#id_tbody_voList tr").length;
			for(var i=0;i<length;i++){
				var tr=$('#id_tbody_voList').children().eq(i);
				var roleName1=$('#id_roleIde').find("option:selected").text();
				var roleName2=$(tr).children().eq(7).children().children().eq(1).text();
				if(roleName1==roleName2){
					if(addflag=="1"){
				    doTheAlert("提示","角色"+$('#id_roleIde').find("option:selected").text()+"已经存在!");
				    return false;
					}
				}
			}		
		//}

	}
	var axamineMin=moneyDecoder($('#id_axamineMin').val());
	var axamineMax=moneyDecoder($('#id_axamineMax').val());
	
	//修改时需要进行的校验
	if(addflag=="0"){
		var tbLength=$('#id_tbody_voList tr').length;
		//被选中的单前行
		var id_cur_index=$('#id_cur_index').val();
		if(tbLength>1){
			if(id_cur_index*1==0){
				var nextmin=$('#id_tbody_voList tr').eq(1).find("td").eq(8).find('input').val();//下一条下线
				if(axamineMax>nextmin*1){
					doTheAlert("提示","审批流上限值必须小于等于下一条审批流的下限值！");
					return false;
				}
			}else if(id_cur_index*1==$('#id_tbody_voList tr').length){
				var upmax=$('#id_tbody_voList tr').eq(tbLength-2).find("td").eq(9).find('input').val();//上一条上线
				if(axamineMin<upmax*1){
					doTheAlert("提示","审批流下限值必须大于等于上一条审批流的上限值！");
					return false;
				}
			}else{
				
				var upmax=$('#id_tbody_voList tr').eq(id_cur_index-1).find("td").eq(9).find('input').val();//上一条上线
				var nextmin=$('#id_tbody_voList tr').eq(id_cur_index*1+1).find("td").eq(8).find('input').val();
				if(axamineMax>nextmin*1){
					doTheAlert("提示","审批流上限值必须小于等于下一条审批流的下限值！");
					return false;
				}
				if(axamineMin<upmax*1){
					doTheAlert("提示","审批流下限值必须大于等于上一条审批流的上限值！");
					return false;
				}
			}
			
		}
		
		
	}
		
	if($('#id_tbody_voList tr').length>0){
		var tbLength=$('#id_tbody_voList tr').length;
		var lastmax=$('#id_tbody_voList tr').eq(tbLength-1).find("td").eq(9).find('input').val();//最后一条上线
		//var lastmin=$('#id_tbody_voList tr').eq(tbLength-1).find("td").eq(8).find('input').val();//最后一条上线
		//新增时才进行的校验
		if(addflag=="1"){
			if(lastmax==-1){
				doTheAlert("提示","最后一条审批流上限为-1（无穷大），必须先删除这条审批流才能新增!");
			    return false;
				}
			if(axamineMin<lastmax*1){
				doTheAlert("提示","新增的审批流下限值必须大于等于最后一条审批流的下限值！");
				return false;
			}		
		}
			
	}

	if(axamineMin==null||axamineMax==""){
	    doTheAlert("提示","请输入下限!");
	    return false;
	}else{
		if(axamineMin=="-1"){
			doTheAlert("提示","下限不能为-1无穷大！");
		}
	}
	if(axamineMax==null||axamineMax==""){
		doTheAlert("提示","请输入上限!");
		return false;
	}else{
		var min=parseInt(axamineMin);
		var max=parseInt(axamineMax);
		if(axamineMin=="-1"){
			doTheAlert("提示","下限值不能为无穷!");
		    return false;
		}
		if(axamineMax!="-1"){
			if(min>max){
		   		doTheAlert("提示","上限值不能小于下限值!");
		   		return false;
			}
		}
	}
	
	return true;
}

/**
 * 处理维度信息，将选中的维度和维度值组合存放在隐藏域方便提交后台获取
 * */
function setParaAndSet(){
		var flowPathName=$('#id_departmentCode').val()+"."+$('#id_busiType').find("option:selected").text()+"."+$('#id_approvalBasisId:checked')[0].getAttribute("cname");
		//加载 依据信息和维度信息
		var checkBoxList=$('#id_paramter').find("input:checkbox[name='xtExamParamter.approvalId']:checked");
		for(var i=0;i<checkBoxList.length;i++){
		    flowPathName=flowPathName+"."+$(checkBoxList[i])[0].getAttribute("cname");
		    var saveId=$(checkBoxList[i])[0].getAttribute("saveId");
		    if(saveId==null){
		    	saveId="";
		    }
		    var paraType=checkBoxList[i].getAttribute("paraType");
		    var parentDiv=checkBoxList[i].parentNode.parentNode;
		    var hidden=$(parentDiv.children[1]).find("input:hidden");
		    if("type"==paraType){
		    	var selectValue=$(parentDiv.children[1]).find("select").val();
		    	if(selectValue==""||selectValue==null){
		    		doTheAlert("提示","维度"+$(checkBoxList[i])[0].getAttribute("cname")+"没有选择值，请选择！");
		    		return false;
		    	}
		    	flowPathName=flowPathName+"("+$(parentDiv.children[1]).find("select").find("option:selected").text()+")";
		    	$(hidden).val(saveId+"@@"+checkBoxList[i].value+"@@"+selectValue);
		    }else if("month"==paraType){
		    	var textValue1=$(parentDiv.children[1]).find("input:text")[0].value;
		    	var textValue2=$(parentDiv.children[1]).find("input:text")[1].value;
		    	if(textValue1==""||textValue1==null){
		    		doTheAlert("提示","维度"+$(checkBoxList[i])[0].getAttribute("cname")+"大于月数没有填，请填写值！");
		    		return false;
		    	}
		    	if(textValue2==""||textValue2==null){
		    		doTheAlert("提示","维度"+$(checkBoxList[i])[0].getAttribute("cname")+"小于月数没有填，请填写值！");
		    		return false;
		    	}
		    	flowPathName=flowPathName+"("+textValue1+"<>"+textValue2+")";
		    	$(hidden).val(saveId+"@@"+checkBoxList[i].value+"@@"+textValue1+"|"+textValue2);
		    }else if("boolean"==paraType){
		    	$(hidden).val(saveId+"@@"+checkBoxList[i].value+"@@ ");
		    }
		}
		//设置审批路径中文名称
		
		//$('#id_label_flowPathName').html(flowPathName);
		$('#id_flowPathName').val(flowPathName);
		
		//禁用控件
		$('#id_approvalBasisId').attr("disabled",true);
		$('#id_contractBasisType').attr("disabled",true);
		$('#id_busiType').attr("disabled",true);
		var checkBoxListTemp=$('#id_paramter').find("input:checkbox[name='xtExamParamter.approvalId']");
		for(var i=0;i<checkBoxListTemp.length;i++){
			 $(checkBoxListTemp[i]).attr("disabled",true);
			 var paraType=checkBoxListTemp[i].getAttribute("paraType");
		     var parentDiv=checkBoxListTemp[i].parentNode.parentNode;
		     if("type"==paraType){
		     	$(parentDiv.children[1]).find("select").attr("disabled",true);
		     }else if("month"==paraType){
		     	$(textValue1).attr("disabled",true);
		    	$(textValue2).attr("disabled",true);
		     }
		}
		//设置加载标志
		$('#id_isSet').val("isSet");
		return true;
}

function  addFlowPath(){
	/**
	 * 添加审批流程
	 * */	
	//$('#addFlowPath').click(function(event) {
		var departmentCode = $("#departmentCode").val();
		if (departmentCode == null || departmentCode == '') {
			doTheAlert("提示","请在左边机构树中点击选择一个机构！");
			return false
		} else {
			window.open("/cpms/linkus/capital/workflow/xtExaminepurView/input?departmentCode="+ departmentCode+"&isNew=true",{width:'80%'} );
		}
	//});	
}

function modiFlowPath(){
	/**
	 * 修改审批流程
	 * */		
	//$('#modiFlowPath').click(function(event) {
		var length = $("#xtExaminepurView_form table tbody tr").length;
		var selectLength=0;//总行数
		var selectedRow=0;//被选中行的下标
		//计算总行数
		for (var i = 0; i < length; i++) {
			var select = $("#xtExaminepurView_form table tbody").find("tr").eq(i).attr("class");
			if (select == "selected") {
				selectedRow=i;
				selectLength++;
			}
		}
		//校验如果selectLength=0则表示没选中一行，如果selectLength>1表示选中了多行
		if(selectLength<1){
			doTheAlert("提示","请表格中勾选中一条需要修改的信息！");
			return false;
		}else if(selectLength>1){
			doTheAlert("提示","只能勾选中一条信息修改！");
			return false;
		}else if(selectLength==1){
			var tr = $("#xtExaminepurView_form table tbody").find("tr").eq(selectedRow);
			var flowOperUserId=tr.find("td")[5].childNodes[0].value;
			var status=tr.find("td")[6].childNodes[0].value;
			if(flowOperUserId!=$('#id_currentUserId').val()){
				doTheAlert("提示","不能修改他人添加的审批流！");
				return false;
			}
			if(status=="1"){
				doTheAlert("提示","已复核的审批流程不能修改！");
				return false;
			}
			var flowId = tr.find("td")[1].childNodes[0].value;
			var exuuId = tr.find("td")[2].childNodes[0].value;
			var departmentCode=tr.find("td")[3].childNodes[0].value;
			var busiType=tr.find("td")[4].childNodes[0].value;
			var url="/cpms/linkus/capital/workflow/xtExaminepurView/input?flowId="+flowId+"&exuuId="+exuuId+"&busiType="+busiType+"&departmentCode="+departmentCode+"&isNew=false";
			window.open(url,{width:'80%'});
		}
	//});		
}

function delFlowPath(){
	/**
	 * 删除审批流程
	 * */		
	//$('#delFlowPath').click(function(event) {
		var length = $("#xtExaminepurView_form table tbody tr").length;
		var selectLength=0;//总行数
		var selectedRow=0;//被选中行的下标
		//计算总行数
		for (var i = 0; i < length; i++) {
			var select = $("#xtExaminepurView_form table tbody").find("tr").eq(i).attr("class");
			if (select == "selected") {
				selectedRow=i;
				selectLength++;
			}
		}
		//校验如果selectLength=0则表示没选中一行，如果selectLength>1表示选中了多行
		if(selectLength<1){
			doTheAlert("提示","请表格中勾选中一条需要删除的信息！");
			return false;
		}else if(selectLength>1){
			doTheAlert("提示","只能勾选中一条信息删除！");
			return false;
		}else if(selectLength==1){
			$.messager.confirm('确认','当删除审批流时，会将一组审批流程删除，您确认要删除该审批流程吗？',function(r){
				if(r){
					var tr = $("#xtExaminepurView_form table tbody").find("tr").eq(selectedRow);
					var flowId = tr.find("td")[1].childNodes[0].value;
					var flowOperUserId=tr.find("td")[5].childNodes[0].value;
					if(flowOperUserId!=$('#id_currentUserId').val()){
						doTheAlert("提示","不能删除他人添加的审批流！");
						return false;
					}
					$.ajax({
						type : "post",
						global : false,
						async : true,
						url : '/cpms/linkus/capital/workflow/xtExaminepurView/delByFlowId?flowId='+flowId,
						dataType : "json",
						success : function(data) {
							doTheAlert("提示",data.tip);
							$('#id_queryExaminepurView').click();
						},
						error:function(){
							doTheAlert("提示","删除流程失败！");
						}
					});
				}
			});
		}
	//});	
}

function saveFlowPath(){
		var length = $("#id_tbody_voList tr").length;
		if(length>0){
			$('#id_busiType').attr("disabled",false);
			var radioList=$('#div_id_approvalBasisId').children();
			for(var i=0;i<radioList.length;i++){
				$(radioList[i]).attr("disabled",false);
			}
			$('#id_contractBasisType').attr("disabled",false);
			
		}else{
			doTheAlert("提示","请添加审批路径！");
			return ;
		}
		$('#id_contractBasisType').attr("disabled",false);
		$('#xtExaminepurView_input').submit();
}
Observation.xtExaminepurView = function(container) {
	$('#xtExaminepurView_input', container).each(function() {
		var form = this;
		form.onsuccess = function() {
			$('.ui-dialog-titlebar-close', $(form).closest('.ui-dialog')).click();
			$('#id_queryExaminepurView').click();
		}
	});
}
function addFlowPathItem(){
	/**
	 * 添加一条审批路径方法
	 * */
	//$('#addFlowPathItem').click(function(event) {
		//校验数据
		if(!checkData("1")){
			return false;
		}
		//处理维度信息
        var isSet=$('#id_isSet').val();
		if(isSet!="isSet"){
		    if(!setParaAndSet()){
		       return false;
		    }
		}		
		//更新表格数据行数下标
		var length = $("#id_tbody_voList tr").length;
		var index=parseInt($('#id_index').val());
		if(length>0){//如果表格中已经存在一条以上数据
			index=index+1;
		}
		$('#id_index').val(index);
		//处理表格添加一行
		var axamineMin=moneyDecoder($('#id_axamineMin').val());
		var axamineMax=moneyDecoder($('#id_axamineMax').val());
		var	trHtrml="<tr id_tr_voList>"+
					"<td style='display:none'><input type='hidden' name='xtExaminepurViewVoList["+index+"].id'/></td>"+
				    "<td style='display:none'><input type='hidden'  name='xtExaminepurViewVoList["+index+"].flowId' value='"+$('#id_flowId').val()+"'/></td>"+
				    "<td style='display:none'><input type='hidden'  name='xtExaminepurViewVoList["+index+"].taskDepartmentCode' value='"+$('#id_view_departmentCode').val()+"'/></td>"+
				    "<td style='display:none'><input type='hidden'  name='xtExaminepurViewVoList["+index+"].approvalType' value='0'/></td>"+
				    "<td style='display:none'><input type='hidden'  name='xtExaminepurViewVoList["+index+"].statex' value='0'/></td>"+
				    "<td style='display:none'><input type='hidden'  name='xtExaminepurViewVoList["+index+"].checkUserId' value=''/></td>"+
					"<td><center><input type='hidden'  name='xtExaminepurViewVoList["+index+"].approvalSeqNo' value='"+(index+1)+"'/><span>"+(index+1)+"</span></center></td>"+
					"<td><center><input type='hidden'  name='xtExaminepurViewVoList["+index+"].roleId' value='"+$('#id_roleIde').val()+"'/><span>"+$('#id_roleIde').find("option:selected").text()+"</span></center></td>"+
					"<td><center><input type='hidden'  name='xtExaminepurViewVoList["+index+"].axamineMin' value='"+axamineMin+"'/><span>"+$('#id_axamineMin').val()+"</span></center></td>"+
					"<td><center><input type='hidden'  name='xtExaminepurViewVoList["+index+"].axamineMax' value='"+axamineMax+"'/><span>"+$('#id_axamineMax').val()+"</span></center></td>"+
					"<td><center><input type='hidden'  name='xtExaminepurViewVoList["+index+"].busiType' value='"+$('#id_busiType').val()+"'/><span>"+$('#id_busiType').find("option:selected").text()+"</span></center></td>"+
					"<td><center><input type='hidden'  name='xtExaminepurViewVoList["+index+"].exuuId' value=''/><span>"+$('#id_flowPathName').val()+"</span></center></td>"+
				"</tr>";
		$('#id_tbody_voList').append(trHtrml);
		//设置上限下限默认值
		$('#id_axamineMin').val($('#id_axamineMax').val());
		$('#id_axamineMax').val("");
		
	//});
}	

function modiFlowPathItem(){
	/**
	 * 修改一条审批路径方法
	 * */
	//$('#modiFlowPathItem').click(function(event) {
		//校验数据
		if(!checkData("0")){
			return false;
		}
        //根据当前行下标获取表格当前行
        var id_cur_index=$('#id_cur_index').val();
        var cur_tr=$('#id_tbody_voList').children().eq(id_cur_index);
    	var axamineMin=moneyDecoder($('#id_axamineMin').val());
    	var axamineMax=moneyDecoder($('#id_axamineMax').val());
        //将页面控件数据更新到表格当前选中行
        $(cur_tr).children().eq(7).children().children().eq(0).val($('#id_roleIde').val());//隐藏域角色ID
        $(cur_tr).children().eq(7).children().children().eq(1).text($('#id_roleIde').find("option:selected").text());//角色名称
        $(cur_tr).children().eq(8).children().children().eq(0).val(axamineMin);//隐藏域下限
        $(cur_tr).children().eq(8).children().children().eq(1).text($('#id_axamineMin').val());//下限
        $(cur_tr).children().eq(9).children().children().eq(0).val(axamineMax);//隐藏域上限
        $(cur_tr).children().eq(9).children().children().eq(1).text($('#id_axamineMax').val());//上限
        $(cur_tr).children().eq(2).children().val($('#id_view_departmentCode').val());//隐藏域机构代码
        //修改数据后清空当前行下标
        $('#id_cur_index').val("");
		//设置上限下限默认值
		$('#id_axamineMin').val($('#id_axamineMax').val());
		$('#id_axamineMax').val("");        
        //设置按钮可用性
        $('#modiFlowPathItem').attr("disabled",true);
        $('#addFlowPathItem').attr("disabled",false);
        $('#delFlowPathItem').attr("disabled",true);
	//});	
}

function delFlowPathItem (){
	/**
	 * 删除一条审批路径方法
	 * */	
	//$('#delFlowPathItem').click(function(event) {
        //更新表格行数据的对象下标
		var length = $("#id_tbody_voList tr").length;
		var id_cur_index=parseInt($('#id_cur_index').val());
		for(var i=(id_cur_index+1);i<length;i++){
			var tr=$('#id_tbody_voList').children().eq(i);
			var inputList=$(tr).find("input:hidden");
			$(tr).children().eq(6).children().children().eq(0).val(i);//text
        	$(tr).children().eq(6).children().children().eq(1).text(i);			
			for(var j=0;j<inputList.length;j++){
			    $(inputList[j]).attr('name', $(inputList[j]).attr('name').replace(('['+i+']'),('['+(i-1)+']')));
			}
		}
		//删除行
		$('#id_tbody_voList').children().eq(id_cur_index).remove();
		//删除行后清空当前行下标
        $('#id_cur_index').val("");
		//更新表格数据总行数
		var index=parseInt($('#id_index').val());
		index=index-1;
		$('#id_index').val(index); 
		//设置下限默认值
		var maxtr=$('#id_tbody_voList').children().eq(index);
		var axamineMinValue=(maxtr).children().eq(9).children().children().eq(1).text();
		$('#id_axamineMin').val(axamineMinValue);
		//设置按钮可用性
		$('#modiFlowPathItem').attr("disabled",true);
        $('#addFlowPathItem').attr("disabled",false);
        $('#delFlowPathItem').attr("disabled",true);
	//});
}


$(document).ready(function() {





	
	/**
	 * 保存审批流程
	 * */		
//	$('#saveFlowPath').click(function(event) {	
//		var length = $("#id_tbody_voList tr").length;
//		if(length>0){
//			$('#id_busiType').attr("disabled",false);
//			var radioList=$('#div_id_approvalBasisId').children();
//			for(var i=0;i<radioList.length;i++){
//				$(radioList[i]).attr("disabled",false);
//			}
//			$('#id_contractBasisType').attr("disabled",false);
//			
//		}else{
//			doTheAlert("提示","请添加审批路径！");
//			return false;
//		}
//		return true;
//	});	


	/**
	 * 表格行双击事件方法
	 * */	
	$(document).on("dblclick", "#id_tbody_voList tr", function() {
		//设置当前行背景色，并清除除当前行外其他行的背景色
		$(this).siblings().css("background-color","");
		$(this).css("background-color","#ffe48d");
		//设置按钮可用性
		$('#modiFlowPathItem').attr("disabled",false);
		//$('#addFlowPathItem').attr("disabled",true);
		$('#delFlowPathItem').attr("disabled",true);
		//给将双击行表格的数据赋给页面控件
		$('#id_view_departmentCode').val($(this).find("td")[2].childNodes[0].value);//机构
		$('#id_view_departmentCode').attr("disabled",false);
		setdepartmentbymodi($(this).children().eq(7).children().children().eq(0).val());
		//$('#id_roleIde').val($(this).children().eq(7).children().children().eq(0).val());//角色
		$('#id_axamineMin').val(moneyEncoder($(this).children().eq(8).children().children().eq(0).val()));//下限
		$('#id_axamineMax').val(moneyEncoder($(this).children().eq(9).children().children().eq(0).val()));//上限
		$('#id_exuuId').val($(this).children().eq(11).children().children().eq(0).val());//审批路径ID
		//设置当前行下标
		$('#id_cur_index').val(($(this).children().eq(6).children().children().eq(0).val()-1));//当前选中行下标
	});	
	
	/**
	 * 表格行单击事件方法
	 * */		
	$(document).on("click", "#id_tbody_voList tr", function() {
		//设置当前行背景色，并清除除当前行外其他行的背景色
		$(this).siblings().css("background-color","");
		$(this).css("background-color","#ffe48d");
		//设置按钮可用性
		$('#modiFlowPathItem').attr("disabled",true);
		//$('#addFlowPathItem').attr("disabled",true);
		$('#delFlowPathItem').attr("disabled",false);
		//设置当前行下标
		$('#id_cur_index').val(($(this).children().eq(6).children().children().eq(0).val()-1));
	});	
	
	


	

	

	
});