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
<script >
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

/**
function loginTypeChange(loginType){
	if(loginType=="0"){
		$('#id_password').removeAttr("readonly");
	}else{
		$('#id_password').attr("readonly","readonly");
	}
}



function loginSys(){
	var flag=checkLogin();
	if(flag){
		$("#login").attr("action","${actionBaseUrl}/execute");
		$("#sys_signup").click();
	}
}
function checkLogin(){
	var returnFlag=false;
	var $form = $("#login");
	$form.attr("action","/login/checkLogin");
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
						$form.attr("action","/login");
						alert(data.tip); 
					}
				}
			}
		},
		error:function(){
			$form.attr("action","/login");
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
  		var f=checkLogin();
  		if(f){
			$("#login").attr("action","${actionBaseUrl}/execute");
			$("#sys_signup").click();
		}
  	}
});
**/
</script>

<link href="<@url value="/assets/styles/login.css"/>" media="all" rel="stylesheet" type="text/css" />

<meta name="body_class" content="welcome" />
<#assign notlogin = false>
<@authorize ifAllGranted="ROLE_BUILTIN_ANONYMOUS">
<#assign notlogin = true>
</@authorize>
<#if !notlogin>
<meta name="decorator" content="main" />
<meta http-equiv="refresh" content="0; url=<@url value="/"/>" />

</#if>
</head>
<body>
<#if notlogin>
	<div class="logo"><img src="./assets/images/logo.png" alt="logo"/></div>
	<div class="login-container clearfix">
		<div class="login-bg"></div>
		<div class="content" >
			<#--class="ajax focus form-horizontal"-->
			<@s.form id="login" action="${actionBaseUrl}" method="post" class="form-vertical login-form">
				<h2 class="form-title">${action.getText('project.name')}<br><span style="font-size:20px;"><legend></legend>${action.getText('userLogin')}</span></h2>
					<@s.hidden id="targetUrl" name="targetUrl" />
					<div class="control-group">
						<label class="control-label visible-ie8 visible-ie9"><b>用户名</b>
						<img src="./assets/images/user.png"/></label>
						<div class="input-icon left">
							<input type="text" name="username" id="username" class="required m-wrap placeholder-no-fix" placeholder="${action.getText("userPlaceholder")}"/>
						</div>
					</div>
					<div class="control-group">
						<label class="control-label visible-ie8 visible-ie9"><b>密码</b>
							<img src="./assets/images/lock.png" style="margin-top: -10px;"/></label>
						<div class="input-icon left">
							<input type="password" style="display:none"><!--解决自动填充表单问题，加了以后就不自动填充了-->
							<input  type="password"  name="password" class="required  input-pattern submit m-wrap placeholder-no-fix" placeholder="${action.getText("pwdPlaceholder")}"/>
						</div>
					</div>
				<div class="control-group"><br><!-- <@s.checkbox  name="rememberme" class="custom"/><div style="margin-top: -39px;margin-left: 30px;"><b>记住我</b></div> --></div>
				<@s.submit value="%{getText('login')}" id="sys_signup"class="green pull-right" style="background:#d64747; color:#fff;text-shadow:0;" > 
					<#if getSetting??&&'true'==getSetting('signup.enabled')>
						<@s.param name="after"> <a class="btn" href="${getUrl('/signup')}">${action.getText('signup')}</a></@s.param>
					</#if>
				</@s.submit>
			</@s.form>
		</div>
	</div>	
		<div class="copyright" style="width:50%">
			<img src="./assets/images/copy-icon.png"/>
			© 2016   版权所有：长沙银行理财综合管理平台
		</div>
	</div>
	<#if getSetting??&&'true'==getSetting('signup.enabled')&&'true'==getSetting('oauth.enabled')>
		<div class="ajaxpanel" data-url="<@url value="/oauth/connect"/>">
		</div>
	</#if>
<#else>
	<div class="modal">
		<div class="modal-body">
			<div class="progress progress-striped active">
				<div class="bar" style="width: 50%;"></div>
			</div>
		</div>
	</div>
</#if>
</body>
</html>
</#escape>
