/*************************************************************************************************
/* DESC       ：树型结构ＪＳ处理文件                                                                                                                                                                                 
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
function checkedMenuNode(node){
	//展开子节点
	var li=node.parentNode;
	var childrenList=li.children;//获取某个li下的所有子对象 
	li.class="collapsable";
	for(var i=0;i<childrenList.length;i++){
		if(childrenList[i].className=="hitarea expandable-hitarea"){
		    childrenList[i].className="hitarea collapsable-hitarea";
		}
		if(childrenList[i].nodeName=="UL"){
		   childrenList[i].style.display="";
		   checkNextObj(childrenList[i],node.checked);
		}
	}
}


/**
 * @Author 刘佳
 * @Name checkedMenuFun点击菜单树子节点结构复选框节点方法
 * @Return null
 * @Param node 节点
 * @Description 根据子节点的checked状态更改父节点的checked状态
 * @Throws null
 **/
function checkedMenuFun(node){
	//如果选中上级也需要选中否则判断同级是否都未选中如果都没有选中上级也设置为不选中
	if(node.checked){
		var li=node.parentNode.parentNode.parentNode;
		upchecked(li,node.checked);
	}else{
		var li=node.parentNode.parentNode.parentNode;
		var liList=node.parentNode.parentNode.children;
		var isAllCheck="0";
		for(var i=0;i<liList.length;i++){
			var inputBox=liList[i].children;//获取某个li下的所有子对象
			//循环li的的子对象
			for(j=0;j<inputBox.length;j++){
				var inputType=inputBox[j].type;
				if(inputBox[j].type=="checkbox"&&inputBox[j].checked==true){
		  			 isAllCheck="1";
				}
			}
		}
		if(isAllCheck==0){
			upchecked(li,node.checked);
		}
		
	}
}


/**
 * @Author 刘佳
 * @Name checkedMenuRoot点击菜单树根节点方法
 * @Return null
 * @Param node 节点
 * @Description 根据子节点的checked状态更改父节点的checked状态
 * @Throws null
 **/
function checkedMenuRoot(node){
   node.checked=true;
}


/**
 * @Author 刘佳
 * @Name checkedMenuRoot点击菜单树根节点方法
 * @Return null
 * @Param node 节点
 * @Description 根据子节点的checked状态更改父节点的checked状态
 * @Throws null
 **/
function upchecked(obj,check){
	var inputBox=obj.children;//获取某个li下的所有子对象
	//循环li的的子对象
	for(j=0;j<inputBox.length;j++){
		var inputType=inputBox[j].type;
		if(inputBox[j].type=="checkbox"){
		   inputBox[j].checked=check
		}
	}
}



/**
 * @Author 刘佳
 * @Name checkNextObj点击菜单树根节点方法
 * @Return null
 * @Param obj 节点
 * @Param check 节点选中状态
 * @Description 根据子节点的checked状态更改父节点的checked状态
 * @Throws null
 **/
function checkNextObj(obj,check) {
	var liList=obj.children;//获取菜单下所有的LI;
	// 如果子节点复选框对象集合不为空
	for(i=0;i<liList.length;i++){
		var inputBox=liList[i].children;//获取某个li下的所有子对象
		//循环li的的子对象
		for(j=0;j<inputBox.length;j++){
		    var inputType=inputBox[j].type;
		    if(inputBox[j].type=="checkbox"){
		    	inputBox[j].checked=check
		    }
		}
	}
}


/**
 * @Author 刘佳
 * @Name saveSelectedMenu保存选中菜单信息
 * @Return null
 * @Param node 节点
 * @Description 保存选中菜单信息
 * @Throws null
 **/
function saveSelectedMenu(){
	var roleId=$('#id_checkRoleId').val();
	var liList=$('#id_menutree li');//获取菜单下所有的LI
	var saveJsonStr="";
	for(i=0;i<liList.length;i++){
		var inputBox=liList[i].children;//获取某个li下的所有子对象
		//循环li的的子对象找到复选框被选中的
		for(j=0;j<inputBox.length;j++){
		    var inputType=inputBox[j].type;
		    if(inputBox[j].type=="checkbox"&&inputBox[j].checked==true){
		    	var rolefunctionItem="";
		    	var menuId=inputBox[j].value;
		    	var parentMenuId=inputBox[j].getAttribute("parentId");
		    	var functionCode=inputBox[j].name;
		    	var menuUrl=inputBox[j].getAttribute("menuUrl");
		    	rolefunctionItem="{'roleId':'"+roleId+"','menuId':'"+menuId+"','parentMenuId':'"+parentMenuId+"','functionCode':'"+functionCode+"','menuUrl':'"+menuUrl+"','flag':'','id':''}";
		    	saveJsonStr=saveJsonStr+rolefunctionItem+",";
		    	break;
		    }
		}
	}
	saveJsonStr="["+saveJsonStr.substring(0,(saveJsonStr.length-1))+"]";
	$.ajax({
		type:"post",
		global:false,
		url:'/cpms/linkus/capital/authority/paRole/saveRolefunction',
		data:{
			saveJsonStr : saveJsonStr,
			checkRoleId : roleId
		},
		dataType:"json",
		success:function(data){
			if(data!="success" ){
				doTheAlert("提示","保存失败！");
			}else{
				doTheAlert("提示","保存成功！");
			}	
		}
	});
	
	//$('.ui-dialog:visible').last().find('.ui-dialog-titlebar-close').click();
}

/**
 * @Author 刘佳
 * @Name saveSelectedTask保存选中工作流节点信息
 * @Return null
 * @Param node 节点
 * @Description 保存选中工作流节点信息
 * @Throws null
 **/
function saveSelectedTask(){
	var roleId=$('#id_checkRoleId').val();
	var liList=$('#id_tasktree li');//获取菜单下所有的LI
	var saveJsonStr="";
	for(i=0;i<liList.length;i++){
		var inputBox=liList[i].children;//获取某个li下的所有子对象
		//循环li的的子对象找到复选框被选中的
		for(j=0;j<inputBox.length;j++){
		    var inputType=inputBox[j].type;
		    if(inputBox[j].type=="checkbox"&&inputBox[j].checked==true){
		    	var roleTaskItem="";
		    	var taskCode=inputBox[j].value;
		    	var parentTaskCode=inputBox[j].getAttribute("parentTask");
		    	if(parentTaskCode==null){
		    		parentTaskCode="";
		    	}
		    	roleTaskItem="{'roleId':'"+roleId+"','taskCode':'"+taskCode+"','parentTaskCode':'"+parentTaskCode+"','flag':'','id':''}";
		    	saveJsonStr=saveJsonStr+roleTaskItem+",";
		    	break;
		    }
		}
	}
	saveJsonStr="["+saveJsonStr.substring(0,(saveJsonStr.length-1))+"]";
	$.ajax({
		type:"post",
		global:false,
		url:'/cpms/linkus/capital/authority/paRole/saveRoleTask',
		data:{
			saveJsonStr : saveJsonStr,
			checkRoleId : roleId
		},
		dataType:"json",
		success:function(data){
			if(data!="success" ){
				doTheAlert("提示","保存失败！");
			}else{
				doTheAlert("提示","保存成功！");
			}	
		}
	});
	
	//$('.ui-dialog:visible').last().find('.ui-dialog-titlebar-close').click();
}


/**
 * @Author 刘佳
 * @Name saveSelectedRole保存选中角色
 * @Return null
 * @Param node 节点
 * @Description 保存选中角色信息
 * @Throws null
 **/
function saveSelectedRole(){
	var liList=$('#id_roletree li');//获取菜单下所有的LI
	var roleNameList="";
	var roleIdList="";
	for(i=0;i<liList.length;i++){
		var inputBox=liList[i].children;//获取某个li下的所有子对象
		//循环li的的子对象找到复选框被选中的
		for(j=0;j<inputBox.length;j++){
		    var inputType=inputBox[j].type;
		    if(inputBox[j].type=="checkbox"&&inputBox[j].checked==true){
		    	var roleName=inputBox[j].name;
		    	var roleId=inputBox[j].value;
		    	roleNameList=roleNameList+roleName+",";
		    	roleIdList=roleIdList+roleId+",";
		    	break;
		    }
		}
	}
	roleNameList=roleNameList.substring(0,roleNameList.length-1);
	roleIdList=roleIdList.substring(0,roleIdList.length-1);
	$('#id_userRoleNames').val(roleNameList);
	$('#id_userRoleIds').val(roleIdList);
	$('.ui-dialog:visible').last().find('.ui-dialog-titlebar-close').click();
}

/**
 * @Author 刘佳
 * @Name selectDptNode选择机构节点
 * @Return null
 * @Param node 节点
 * @Description 将机构信息赋值到页面
 * @Throws null
 **/
function selectDptNode(node){
	var toFieldsStr   = document.getElementById("toFields").value;
	var fromFieldsStr = document.getElementById("fromFields").value;
	//校验取值来源字段
	if(fromFieldsStr!=null&&fromFieldsStr!=""){
	}else{
		doTheAlert("提示","取值来源字段不能为空！");
		$('.ui-dialog:visible').last().find('.ui-dialog-titlebar-close').click();
	}
	
	//目标赋值字段不为空情况处理
	if(toFieldsStr!=null&&toFieldsStr!=""){
		var toFields    = toFieldsStr.split("-");
		var fromFields  = fromFieldsStr.split("-");
		if(fromFields.length==toFields.length){
			for(var i=0;i<fromFields.length;i++){
				try{
					var fromField=eval("node."+fromFields[i]);
					var temp=toFields[i];
					$("#"+temp).attr("readOnly",false);
					$("#"+temp).focus();
					document.getElementById(toFields[i]).value=fromField;
					$("#"+temp).change();
					$("#"+temp).blur();
					$("#"+temp).attr("readOnly",true);
				}catch(Exception){
				    doTheAlert("提示",Exception);
				    break;
				}
			}
			//选择机构将机构名称回显在页面的并触发它的change事件。（默认第一个字段是回显的字段） 
			if(!$("#"+toFields[0]).change()){
				  return;
			}
			$('.ui-dialog:visible').last().find('.ui-dialog-titlebar-close').click();
		}else{
			doTheAlert("提示","取值来源字段与目标赋值字段个数不一致！");
			//窗口关闭
			$('.ui-dialog:visible').last().find('.ui-dialog-titlebar-close').click();
		}
	}else{//目标赋值字段为空情况处理
		var fromFields = fromFieldsStr.split("-");
		for(var i=0;i<fromFields.length;i++){
			try{
				var fromField=eval("node."+fromFields[i]);
				var temp=fromFields[i];
				$("#"+temp).attr("readOnly",false);
				$("#"+temp).focus();
				document.getElementById(fromFields[i]).value=fromField;
				$("#"+temp).change();
				$("#"+temp).blur();
				$("#"+temp).attr("readOnly",true);
				//$("#"+fromFields[i])).change();
			}catch(Exception){
			    doTheAlert("提示",Exception);
			    break;
			}
		}
		$('.ui-dialog:visible').last().find('.ui-dialog-titlebar-close').click();
	}

}