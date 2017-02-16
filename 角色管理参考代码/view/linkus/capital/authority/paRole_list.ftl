<#--
/******************************************************************************************************/
/* DESC       ：角色管理页面                                                                                                                                                                                 
/* AUTHOR     ：大资管平台项目组                                                                                                                                                                                 
/* CREATE     ：2016-04-01                                                                       
/* MODIFYLIST ： Name          Date         Reason                                                
/*              yourName      updateDate    modiReason                                               
/*              -------------------------------------------------------------                    
/*****************************************************************************************************/
-->
<!DOCTYPE html>
<#escape x as x?html>
<html>
<head>
    <title>角色管理</title>
    <script src=<@url value="/assets/scripts/paRole.js"/> type="text/javascript" defer=""></script>
    <script>
        $(function(){
            $("#roleTree").treeview({
            	collapsed:true,
            	animated:"medium",
            	control:"#sidetreecontrol",
            	persist:"location"
            });

                    
        })
    </script>
</head>
<body >
	<div class="easyui-layout" style="width:100%;height:100%">

	    <div data-options="region:'west',title:'所有角色',split:true," style="width:18%;overflow:auto;">
		    <ul id="roleTree">
		       <li><a class="hover" onClick="clickRoleNode('all');"><span>所有角色</span></a>
		           <ul>
		              <li><a class="hover" onClick="clickRoleNode('0');"><span>总行</span></a></li>             
		              <li><a class="hover" onClick="clickRoleNode('1');"><span>分行</span></a></li>
		              <li><a class="hover" onClick="clickRoleNode('2');"><span>支行</span></a></li>
		           </ul>
		       </li>
		    </ul>
	    </div>
	    <div data-options="region:'center',title:'角色管理',iconCls:'icon-save'," style="width:100%;padding: 10px;overflow:auto">
			<div class="toolbar">
			<a class="easyui-linkbutton" id="addRolePower" data-options="iconCls:'glyphicon glyphicon-cog'">配置角色权限</a>
			<a class="easyui-linkbutton" id="deleteRolePower" data-options="iconCls:'glyphicon glyphicon-trash'">删除角色</a>
			</div>
	   	    <div style="display:none">
	    	<@s.form id="id_paRole_query" action="${actionBaseUrl}" method="post"  >
	    		<@selectDictionary  dictionaryName="roleLevel" name="paRole.roleLevel" id="id_query_roleLevel" class="required" />
	    	</@s.form>
	    	</div>
		    <#assign actionColumnButtons=r'<@btn view="input" label="edit"/><@btn view="showUserList" label="查询用户"/>'>
		    <#assign columns={
		    "roleLevel":{"width":"120px", "template":"<@s.hidden name=viroleId value=entity.roleId/><@displayDictionaryLabel dictionaryName='roleLevel' value=value/>"},
		    "角色名称":{"width":"180px", "template":r"${entity.roleName!}"},
		    "roleType":{"width":"120px", "template":"<@displayDictionaryLabel dictionaryName='roleType' value=value/>"},
		    "loginType":{"width":"120px", "template":"<@displayDictionaryLabel dictionaryName='loginType' value=value/>"},
		    "创建人":{"width":"120px", "template":r"${entity.createUserId!}"},
		    "创建时间":{"width":"120px", "template":r"${entity.createDate!}"}
			}>
			<div class="table-body table-style3 mt10">
				<@richtable entityName="paRole" columns=columns bottomButtons = bottomButtons actionColumnButtons=actionColumnButtons downloadable=false  showBottomButtons=true  searchable=false celleditable=false enableable=true/>
		    </div>	 
	    </div>
	</div>	
</body>
</html>
</#escape>