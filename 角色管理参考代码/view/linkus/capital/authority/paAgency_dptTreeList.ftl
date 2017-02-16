<#--
/******************************************************************************************************/
/* DESC       ：机构树展示页面                                                                                                                                                                                 
/* AUTHOR     ：大资管平台项目组                                                                                                                                                                                 
/* CREATE     ：2016-04-01                                                                       
/* MODIFYLIST ： Name          Date         Reason                                                
/*              yourName      updateDate    modiReason                                               
/*              -------------------------------------------------------------                    
/*****************************************************************************************************/
-->
<!DOCTYPE html>
<#escape x as x?html></html>
<head>
<title>申请机构名称</title>
<script src=<@url value="/assets/scripts/interbank/interbankIvcntr.js"/> type="text/javascript" ></script>
 </head>
<body>
<div class="treelist" >所有机构
    <#if queryPower=="all">
    	<div class="treeview"  style="position:absolute;height:80%;width:90%;overflow:auto" data-url="/linkus/capital/authority/paAgency/children" data-click="selectDptNode(this)">
    <#else>
    	<div class="treeview"  style="position:absolute;height:80%;width:90%;overflow:auto" data-url="/linkus/capital/authority/paAgency/children?tree=${queryPower!}" data-click="selectDptNode(this)">
    </#if>
</div>
<@s.hidden name="fromFields" id="fromFields"/>
<@s.hidden name="toFields" id="toFields"/>
</body>
<html>
</#escape>
