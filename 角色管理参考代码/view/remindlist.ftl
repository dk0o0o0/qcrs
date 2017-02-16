<#assign sysPretreatmentManger=statics['org.ironrhino.core.util.ApplicationContextUtils'].getBean('systemPretreatmentManger')>
<#assign remindList=sysPretreatmentManger.findSystemPretreatByRelationAgencyId()!>
<#assign AgencyId=beans['paAgencyService'].getCurrentAgency().getDepartmentCode()!>
<#assign bondList=sysPretreatmentManger.findSystemPretreat()!>
			<ul>
			<#if AgencyId??&&AgencyId=='990401'>
				<#if bondList?? && bondList?size gt 0>
					<#list bondList as temp>
						<li>
						<a class="popwindow"  href="/cpms/linkus/capital/runbatch/remind/systemPretreatment/view?flag=1&&busiType=${temp.busiType!}" class="view">${temp.remindName!}</a>
						<span class="count">${temp.count!}</span>
						</li>
						</li>
					</#list>
				</#if>	
			</#if>
			<#if remindList?? && remindList?size gt 0>
			<#list remindList as rmd>
				<li>
				<#if rmd.functioncode??>
					<a href="#" onClick="openPanel('${rmd.remindName!}','${rmd.functioncode!}');" class="view" realtitle="${rmd.remindName!}" title="${rmd.functioncode!}">${rmd.remindName!}</a>
				<#elseif rmd.remindType=='only_remind'>
					<a class="popwindow"  href="/cpms/linkus/capital/runbatch/remind/systemPretreatment?busiType=${rmd.busiType!}" class="view">${rmd.remindName!}</a>
				<#else>
					<a class="popwindow"  href="/cpms/linkus/capital/runbatch/remind/systemPretreatment/view?busiType=${rmd.busiType!}" class="view">${rmd.remindName!}</a>
				</#if>
					<span class="count">${rmd.count!}</span>
				</li>
			</#list>
			</#if>
			</ul>
	