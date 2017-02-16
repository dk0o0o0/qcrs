<!DOCTYPE html>
<#escape x as x?html>
<html>
<head>
    <title>工作流参数设置</title>
</head>
<body>
当前机构：长沙银行Parm 审批流名称:当前机构+业务类型+审批依据+维度
业务类型：下拉选择<select></select>
<tab>审批依据类型</tab>
<tab>维度信息</tab>
机构名称《下拉选择》角色名称《下拉选择》
审批依据上限 审批依据下线
button 删除 提交 取消
详细流程
<table></table>
button 确定 关闭

<@s.form action="${actionBaseUrl}/save" method="post" class="ajax form-horizontal sequential_create">
          <@s.hidden name="bizParm.moduleId"/>
          <@s.hidden name="bizParm.paraId"/>
          <@s.hidden name="bizParm.paraName"/>
          <@s.hidden name="bizParm.groupParaId"/>
          <@s.hidden name="bizParm.dict"/>
          <@s.hidden name="bizParm.funcType"/>
          <@s.hidden name="bizParm.confOption"/>
          <@s.hidden name="bizParm.isDisPlay"/>
          <@s.hidden name="bizParm.id"/>
    <div class="row-fluid">
    
       <div class="span12">

          <#if bizParm.funcType=='text'>
              <@s.textfield  label="${bizParm.paraName}" name="bizParm.paraValue" class="required"   />
          <#elseif bizParm.funcType=='radio'>
              ${bizParm.paraName}
              <select name="bizParm.paraValue"  style="width:160px;" id="bizParm_paraValue">
              <#if bizParm.paraValue=='1'>
			  <option value="1" selected="true">是</option>
	          <option value="0">否</option>
			  <#elseif bizParm.paraValue=='0'>  
			  <option value="0" selected="true">否</option>
			  <option value="1">是</option>
			  </#if>
			  </select>
          <#elseif bizParm.funcType=='int'>
              <@s.textfield  label="${bizParm.paraName}" name="bizParm.paraValue" class="required integer"  /> 
          <#elseif bizParm.funcType=='number'>  
              <@s.textfield  label="${bizParm.paraName}" name="bizParm.paraValue" class="required double" /> 
          <#elseif bizParm.funcType=='date'>
              <@s.textfield  label="${bizParm.paraName}" name="bizParm.paraValue" class="required" cssClass="date"/> 
          <#elseif bizParm.funcType=='select'>
              <#if bizParm.dict=='vproddict'>
              ${bizParm.paraName}
              <select name="bizParm.paraValue"  style="width:160px;" id="bizParm_paraValue">
              	<#list hostsProductList as map>
              		<option value=${map.prodCode}>${map.prodName}</option>
			  	</#list>
			  </select>
              <#else>
	            ${bizParm.paraName}
	             <div class="controls"> 
			         <@selectDictionary  dictionaryName="yearDays" name="bizParm.paraValue"  class="required" id="bizParm_paraValue"/>	
                 </div>           
              </#if>
          <#elseif bizParm.funcType=='mselect'> 
              ${bizParm.paraName}<br>
              <#list assetTypeList as map>
                  <#if bizParm.paraValue?index_of('${map.assetsCode}') gt -1 >
                     <input type="checkbox" name="bizParm.paraValue" value="${map.assetsCode}" class="custom" checked=true>${map.assetsName}
	              <#else>
	                 <input type="checkbox" name="bizParm.paraValue" value="${map.assetsCode}" class="custom">${map.assetsName} 
	              </#if>
	          </#list>
          </#if>
       </div>
       
    </div>
    <@s.submit value="%{getText('save')}" class="btn-primary"/>  
 
</@s.form>	
</body>
</html>
</#escape>