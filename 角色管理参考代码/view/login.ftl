<!DOCTYPE html>
<#escape x as x?html><html>
<head>
<title>${action.getText('login')}</title>
<script type="text/javascript">
        if(window!=top){
        	top.location.href="/cpms/logout";
        }
</script>
<script src="<@url value="/assets/scripts/ironrhino.patterninput.js"/>" type="text/javascript"></script>
<script src="<@url value="/assets/scripts/usbocx.js"/>" type="text/javascript"></script>
<script src="<@url value="/assets/scripts/easyui/jquery.easyui.min.js"/>" type="text/javascript"></script>
<script src="<@url value="/assets/scripts/easyui/easyui-lang-zh_CN.js"/>" type="text/javascript"></script>
<link rel="stylesheet" type="text/css" href="<@url value="/assets/styles/themes/default/easyui.css"/>">
<style>
.input-append{display:block;}
</style>
<script>
$(function(){
		var initName = $('#username').val();
		if(initName == '' || initName == 'admin') {
			$('#smsCode').val('');
			$('#smsCheck').hide();
		}
		$('#username').blur(function(){
			var t = $(this);
			var name = t.val();
			if(name == '' || name == 'admin') {
				$('#smsCode').val('');
				$('#smsCheck').hide();
			} else {
				$('#smsCode').val('');
				$('#smsCheck').show();
			}
		});
		$('#getSmsCode').click(function(){
			var count = 0;
			$.ajax({
				type:'POST',
				url:'${actionBaseUrl}/getSmscode',
				dataType : "json",
				data : {
                	username : $('#username').val()
            	}, 
				success:function(data){
					var retCode = data['retCode'];
					if(retCode != '000') {
						count = 0;
					} else {
						$('#getSmsCode').attr("disabled", "disabled");
						count = data['expired'];
					}
					jAlert(data['retMsg'], '提示框');
				}
			});
			var cDown = setInterval(countDown, 1000);
			function countDown(){
				$('#getSmsCode').text("请" + count + "后重新获取");
				if(count == 0){
					$('#getSmsCode').text("${action.getText('getSmsCode')}").removeAttr("disabled");	
					clearInterval(cDown);
				}
				count --;
			}
		});
});

function loginTypeChange(loginType){
	if(loginType=="0"){
		$('#id_password').removeAttr("readonly");
	}else{
		$('#id_password').attr("readonly","readonly");
	}
}



function logintest(){
	var f=checkLogin();
	//alert(f);
	if(f){
		$("#login").attr("action","/cpms/login");
		$("#login").submit();
	}
}
function checkLogin(){
	var returnFlag=false;
	var $form = $("#login");
	$form.attr("action","/cpms/login/checkLogin");
	var option = {
		type:"post",
		dataType:"json",
		async:false,
		success:function(data){
			if (data != null) {
				if(typeof(data.tip) !="undefined" ){
					if(data.success=="true"){
						returnFlag=true;
					}else{
						returnFlag=false;
						$form.attr("action","/cpms/login");
						$.messager.alert('提示', data.tip); 
					}
				}
			}
		},
		error:function(){
			$form.attr("action","/cpms/login");
			alert("通讯失败!");
		}
	};
	$form.ajaxSubmit(option);	
	return 	returnFlag;
}

$(document).keydown(function(event){
	var keycode=event.keyCode;
  	if(keycode==13){
  		var test=$('.panel.window.messager-window');
  		if(test&&test.length>0){
  			test.find(".eydialog-button .messager-button");
  			test.find(".eydialog-button.messager-button").find("a").click();
  			return ;
  		}
  		$('#id_loginbutton').focus();
  		var f=checkLogin();
  		if(f){
			$("#login").attr("action","/cpms/login");
			$("#login").submit();
			$('#id_loginbutton').blur();
		}
  	}
});
</script>

<link href="<@url value="/assets/styles/login.css"/>" media="all" rel="stylesheet" type="text/css" />

<meta name="body_class" content="welcome" />
<#assign notlogin = false>

<#assign notlogin = true>

<#if !notlogin>
<meta name="decorator" content="login" />
</#if>
</head>
<body>
<#if action.hasActionMessages() || action.hasActionErrors() || action.hasFieldErrors() >
<@s.actionerror />
<@s.actionmessage />
<@s.fielderror />
</#if>
<#if notlogin>
<div class="logo"><img src="<@url value='/assets/images/logo.png'/>" alt="logo"/></div>
<div class="login-container clearfix">
	<div class="login-bg"></div>
	<div class="content">
		<#--class="ajax focus form-horizontal"-->
		<@s.form id="login" action="${actionBaseUrl}" method="post" class=" form-vertical login-form">
			<h3 class="form-title">${action.getText('project.name')}<br><span style="font-size:16px;">${action.getText('userLogin')}</span></h3>
		
				<@s.hidden id="targetUrl" name="targetUrl" />
				<div class="control-group">
					<label class="control-label visible-ie8 visible-ie9">登录方式：</label>
					<div class="input-icon login-type left">
						<input type="radio" name="loginType" value="1"  onClick="loginTypeChange('1');">指纹</input><input type="radio" checked name="loginType" value="0" onClick="loginTypeChange('0');">密码</input>
						<input type="hidden" name="finger" id="showtext" /><input type="button" onClick="return Button_GetTz_Hid();" value="验证" class="btn"></input>
					</div>
				</div>
				<div class="control-group">
					<label class="control-label visible-ie8 visible-ie9">用户名：</label>
					<div class="input-icon left">
						<!--<img src="<@url value='/assets/images/user.png'/>"/>-->
						<i class="glyphicon glyphicon-user" style='float:left; padding:0 3px; padding-top:5px;'></i>
						<input type="text" name="username" id="username" class="required m-wrap placeholder-no-fix" placeholder="${action.getText("userPlaceholder")}"/>
					</div>
				</div>
				<div class="control-group">
					<label class="control-label visible-ie8 visible-ie9">密码：</label>
					<div class="input-icon left">
						<!--<img src="<@url value='/assets/images/lock.png'/>"/ style="margin-top: -10px;">-->
						<i class="glyphicon glyphicon-lock" style='float:left; padding:0 3px; padding-top:5px;'></i>
						<input type="password" style="display:none"><!--解决自动填充表单问题，加了以后就不自动填充了-->
						<input  type="password" name="password" class="required  input-pattern submit m-wrap placeholder-no-fix" placeholder="${action.getText("pwdPlaceholder")}"  id="id_password" autocomplete="off"/>
			
					</div>
				</div>
			<div class="control-group"><!--<@s.checkbox  name="rememberme" class="custom"/><div style="margin-top: -39px;margin-left: 30px;">记住我</div>--></div>
			<input type="button" id="id_loginbutton" value="登录" class="btn pull-right" onClick="logintest();"/>
			<#if getSetting??&&'true'==getSetting('signup.enabled')>
					<@s.param name="after"> <a class="btn" href="${getUrl('/signup')}">${action.getText('signup')}</a></@s.param>
			</#if>
			<#--<@s.submit value="%{getText('login')}" class="green pull-right"> 
		
				
			</@s.submit>
			-->
			 
		</@s.form>
	</div>
</div>
	<div class="copyright">
<img src="<@url value='/assets/images/copy-icon.png'/>"/>
© 2016   版权所有：长沙银行资金交易系统
	</div>
</div>
<#if getSetting??&&'true'==getSetting('signup.enabled')&&'true'==getSetting('oauth.enabled')>

</#if>
<#else>

</#if>
</body>
</html></#escape>
