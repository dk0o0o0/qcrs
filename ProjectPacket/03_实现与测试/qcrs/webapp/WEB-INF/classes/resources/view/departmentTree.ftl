<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="ww" uri="/webwork"%>
<%
	String webapp = request.getContextPath();
%>
<!DOCTYPE html>
<#escape x as x?html><html>
	<head>
		<title>departmentTree.jsp</title>
		<META HTTP-EQUIV='Expires' CONTENT='0'>
		<META HTTP-EQUIV='pragma' CONTENT='no-cache'>
		<META HTTP-EQUIV='Cache-Control' CONTENT='no-cache, must-revalidate'>
		<link href="<%=webapp%>/resources/tree/css/dhtmlXTree.css" rel="stylesheet" type="text/css">
		<SCRIPT language="javascript" src="<%=webapp%>/resources/js/common.js"></SCRIPT>
		<script language="javascript" src="<%=webapp%>/resources/tree/js/dhtmlXCommon.js"></script>
		<script language="javascript" src="<%=webapp%>/resources/tree/js/dhtmlXTree.js"></script>
		<script language="javascript" src="<%=webapp%>/resources/tree/js/dhtmlXTreeExtend.js"></script>
		<script language="javascript">
function itemOnclick(id){

	parent.frames["deptMainFrame"].location.href="viewDepartment.action?department.id="+id;
	
}
function treeInit(){
	tree=new dhtmlXTreeObject("treeboxbox_tree","100%","100%",0);
	tree.setImagePath("<%=webapp%>/resources/tree/imgs/");
	tree.enableCheckBoxes(0);
	tree.setOnClickHandler(itemOnclick);
	try{
		var date = new Date();
		tree.setXMLAutoLoading("asychDeptTree.action?"+date.getTime());
		tree.loadXMLExt("asychDeptTree.action?"+date.getTime());
	}catch(ex){
	}
	deptId = tree.getFirstNodeId();
	tree.selectItem(dept_id,true);   
	tree.openItem(dept_id);
	

}
	//新增或编辑节点时操作树
	function addItem(dept_id,dept_type,dept_name,resultFlag){
	
    
	 
	 
		tree.openItem(dept_type);  //先展开父节点
		if("0"==resultFlag){
		tree.insertNewChild(dept_type,dept_id,dept_name);
		}
		
		//最后树选中当前新增或编辑节点  insertNewChild
		tree.selectItem(dept_id,true);
		//itemOnclick(dept_id);
	}
	
	//编辑节点时操作树
	function updateItem(dept_id,dept_type,dept_name,resultFlag){
	 if("0"==resultFlag){
	 tree.setItemText(dept_id,dept_name);
	 }
		
		//tree.selectItem(dept_id,true);
		//itemOnclick(storageId);
	}
	
	//删除节点时操作树
	function deleteItem(dept_id,dept_type,resultFlag){
	    
		tree.openItem(dept_type);  //先展开父节点
		//判断节点是否存在
		 if("0"==resultFlag){
		 tree.deleteItem(dept_id,dept_type);     //删除已有节点
		 }
		
		//最后树选中父节点
		//tree.selectItem(dept_type,true);
		//itemOnclick(dept_type);
	}
			
</script>
	</head>
	<body onload="treeInit()">
		<div id="treeboxbox_tree" style="background: #e9f4f8"></div>
	
	</body>
</html></#escape>