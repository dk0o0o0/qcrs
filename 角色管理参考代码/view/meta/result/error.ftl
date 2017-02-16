<!DOCTYPE html>
<#escape x as x?html>
<#if action.hasActionErrors() && action.actionErrors?size == 1>
<#assign message=action.actionErrors[0]/>
</#if>
<html>
<head>
<script src="<@url value="/assets/scripts/ironrhino.js"/>" type="text/javascript" defer></script>
<script src="<@url value="/assets/scripts/overload.js"/>" type="text/javascript" defer></script>
<title><#if message?has_content>${message}<#else>${action.getText('error.occur')}</#if></title>
<#if !ajax?? || !ajax>
<meta name="decorator" content="none"/>
<style>
*{
	margin:0;
	padding:0;
}
body{
	font-size: 25px;
	color: #d54747;
}
.error-div {
	width: 500px;
	height: 200px;
	position: fixed;
	top:50%;
	left: 50%;
	margin-top: -180px;
	margin-left: -250px;
	padding-left: 100px;
}
.error-div img {
	width: 100px;
	height: 100px;
	position: absolute;
	top: 50%;
	left: 0;
	margin-top: -50px;
}
.error-div p {
	margin-top: 75px;
}
.error-div a {
	display: block;
	font-size: 14px;
	text-decoration: underline;
	line-height: 35px;
	color: #333;
}
.error-div a:hover {
	color: #d64747;
}
</style>
</#if>
</head>
<body>
	<div class="error-div">
		<img src="<@url value="/assets/images/error.png"/>" width="100px" height="100px"/>
		<p>
			<span>
			<#if message?has_content>${message}
			<#else>
				<#if action.hasActionErrors()>
				<#list action.actionErrors as error>
					<#if error?has_content>
			           <h2 class="alert-error">${error}</h2>
			        </#if>
				</#list>
				</#if>
			</#if></span>
			<!--<a href="javascript:history.back();">返回</a> -->
		</p>
		
	</div>
</body>
</html>
</#escape>