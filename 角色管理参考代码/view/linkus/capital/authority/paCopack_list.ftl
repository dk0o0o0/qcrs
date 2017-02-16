<#--
/******************************************************************************************************/
/* DESC       ：票据托收地址重打页面                                                                                                                                                                                 
/* AUTHOR     ：大资管平台项目组                                                                                                                                                                                 
/* CREATE     ：2016-04-08                                                                       
/* MODIFYLIST ： Name          Date         Reason                                                
/*              yourName      updateDate    modiReason                                               
/*              -------------------------------------------------------------                    
/*****************************************************************************************************/
--> 
<script src=<@url value="/assets/scripts/bill/bill30020.js"/> type="text/javascript" defer=""></script>
<form action="${request.requestURI}/queryCopack" class="ajax view" data-replacement="paCopack_form">
<div class="form-horizontal pj-pd10">
<div class="form-horizontal pj-pd10">
 	<div class="row-fluid">	   
 		<div class="span4">
			<div class="span1 ml0 right-style lh28" style="display:none">
	          <@s.checkbox name="checkbox" id="checkboxPrintDate" class="select" checked=true onclick="checkboxPrintClick();" />
			</div>		
			<div class="span8 w70">
			  	<label class="control-label">打印日期：</label>
			    <@s.textfield  id="id_printDate" name="viPrintDate" class="date "/>
			</div>
		</div>
		<div class="span4">
			<label class="control-label">信封编号：</label>
		 	<@s.textfield id="id_packId" name="viPackId" cssStyle="width: 140px;"/>
		</div>
		<div class="span4">
			<label class="control-label">票据编号：</label>
			<@s.textfield id="id_billNo" name="viBillNo" cssStyle="width: 140px;"/>
		</div>
	</div>
	<div class="row-fluid toolbar" >
		<input type="hidden" name="viqueryFlag" value="query"/>
		<div class="span12">

	 		<a class="l-btn" onclick="$(this).closest('form').submit()">
	 			<span class="l-btn-left l-btn-icon-left">
					<span class="l-btn-text">查询</span>
					<span class="l-btn-icon icon-search glyphicon glyphicon-search">&nbsp;</span>
				</span>
			</a>			
        	<a class="l-btn" onclick="cancelPrint()">
				<span class="l-btn-left l-btn-icon-left">
					<span class="l-btn-text">解绑</span>
					<span class="l-btn-icon icon-search glyphicon glyphicon-link">&nbsp;</span>
				</span>
			</a>
        	<a class="l-btn" onclick="printAgain()">
				<span class="l-btn-left l-btn-icon-left">
					<span class="l-btn-text">地址重打</span>
					<span class="l-btn-icon icon-search glyphicon glyphicon-repeat">&nbsp;</span>
				</span>
			</a>
		</div>
	</div>
	</form>
	<div class="row-fluid">
		<div id="elenoteinfo" class="span12">
			<#assign actionColumnButtons=r'<@btn label="查看" view="view"/>'>
			<#assign columns={
			"信封编号":{"width":"45px", "template":r"${entity.packId!}"},
			"托收人名称":{"width":"60px", "template":r"${entity.acceptName!}"},
			"托收人地址":{"width":"65px", "template":r"${entity.acceptAddress!}"},
			"托收人电话":{"width":"55px", "template":r"${entity.receTelehpone!}"},
			"票据张数":{"width":"55px", "template":r"${entity.packBillCount!}"}
			}>
			<div class="table-body table-style3">
				<@richtable entityName="paCopack" formid="paCopack_form" columns=columns bottomButtons = bottomButtons actionColumnButtons=actionColumnButtons   showBottomButtons=false showActionColumn=false  searchable=false celleditable=false enableable=true/>
	   		</div>
		</div>
	</div>	
</div>