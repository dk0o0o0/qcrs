<#assign taskManager=statics['org.ironrhino.core.util.ApplicationContextUtils'].getBean('xtTaskManager')>
<#assign count=taskManager.getTaskCount()>
<span>${count}</span>
