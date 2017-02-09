<#assign charset=response.characterEncoding!'utf-8'/>
<#assign requestURI=request.requestURI[request.contextPath?length..]/>
<#assign modernBrowser = true/>
<#assign ua = request.getAttribute('userAgent')!/>
<#if ua?? && ua.name=='msie' && ua.majorVersion lt 9>
<#assign modernBrowser = false/>
</#if>
<#if ua?? &&  ua.userAgent?? && ua.userAgent.indexOf('Firefox') gt -1>
<#assign modernBrowser = false/>
</#if>
<#if modernBrowser>
<!DOCTYPE html>
<html>
<#else>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
</#if>
<#compress><#escape x as x?html>
<head>
<title><#noescape>${title}</#noescape></title>
<#if modernBrowser>
<meta charset="${charset}">
<#else>
<meta http-equiv="Content-Type" content="text/html; charset=${charset}"/>
</#if>
<#if request.contextPath!=''>
<meta name="context_path" content="${request.contextPath}" />
</#if>
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<link rel="shortcut icon" href="<@url value="/assets/images/favicon1.ico"/>" />
<link href="<@url value="/assets/styles/ironrhino-min.css"/>" media="all" rel="stylesheet" type="text/css" />
<script src="<@url value="/assets/scripts/ironrhino.js"/>" type="text/javascript"</script>

<#include "include/assets.ftl" />
<#noescape>${head}</#noescape>
</head>

<body class="main ${(page.properties["meta.body_class"])!}<#if modernBrowser> render-location-qrcode</#if>">
<#if !modernBrowser>
<div class="container">
<div class="alert">
<button type="button" class="close" data-dismiss="alert">&times;</button>
<#noescape>
${action.getText('browser.warning')}
</#noescape>
</div>
</div>
</#if>

<#if 'welcome'!=page.properties["meta.body_class"]!>
<@authorize ifNotGranted="ROLE_BUILTIN_ANONYMOUS">

</@authorize>
</#if>
<div id="content" class="container login-content">
<#noescape>${body}</#noescape>
</div>

</body>
</html></#escape></#compress>