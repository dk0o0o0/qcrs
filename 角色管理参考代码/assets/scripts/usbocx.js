
var dwWaitTime = 10000; //超时时间（毫秒）

//获取浏览器类型
function GetBrowserType()
{
	var type = 0 ;
	var Sys = {}; 
	var ua = navigator.userAgent.toLowerCase(); 
	var s; 
	(s = ua.match(/msie ([\d.]+)/)) ? Sys.ie = s[1] : 
	(s = ua.match(/firefox\/([\d.]+)/)) ? Sys.firefox = s[1] : 
	(s = ua.match(/chrome\/([\d.]+)/)) ? Sys.chrome = s[1] : 
	(s = ua.match(/opera.([\d.]+)/)) ? Sys.opera = s[1] : 
	(s = ua.match(/version\/([\d.]+).*safari/)) ? Sys.safari = s[1] : 0; 
	//以下进行测试 
	if(Sys.ie)
	{
		//document.write('IE: ' + Sys.ie);
		type =0;
		return type;
	}
	if(Sys.firefox)
	{
		//document.write('Firefox: ' + Sys.firefox);
		type =1;
		return type;
	}
	if(Sys.chrome)
	{
		//document.write('Chrome: ' + Sys.chrome);
		type =2;
		return type;
	}
	if(Sys.opera)
	{
		//document.write('Opera: ' + Sys.opera);
		type =3;
		return type;
	}
	if(Sys.safari)
	{
		//document.write('Safari: ' + Sys.safari);
		type =4;
		return type;
	}
}		

if(GetBrowserType()>0)
{
	document.write('<embed type="application/miaxis-npCapacitiveDriver-plugin" id="fpDevObj"  width=0 height=0>');
	document.write('</embed>');	
}
else
{
	document.write('<object classid="CLSID:0B6CD28F-5650-4FC9-877D-F8398F5A656F"" id="fpDevObj" name="def" codebase="mxCapacitiveDriver.ocx" width=0 height=0>');
	document.write('</object>');		
}
var fpDevObj = document.getElementById('fpDevObj');

//获取当前路径
function getCurrentDirectory(){
	var locHref = location.href;
	var locArray = locHref.split("/");
  delete locArray[locArray.length-1];
  var dirTxt = locArray.join("//");
	var temp = dirTxt.substring(11);
	var newtemp="";
	//需要过滤空格%20 UNICODE显示
	var i;
	for(i=0 ;i < temp.length;i++)
	{
		if (temp.substr(i,3) == "%20")
		{
			newtemp = newtemp + " ";
			i=i+2;
		}else
		{
			newtemp = newtemp +temp.substr(i,1);
		}
	}
	//alert(newtemp);
  return newtemp;
}

var varSuccess = "成功";
var varFailed  = "失败";

var varGetTz   = "请先获取指纹特征";
var varGetMb   = "请先获取指纹模板";

var varNoEmpty = "客户信息不能为空";	
var varMax32   = "客户信息应不大于32";	
	
var varOpenDeviceFailed = "打开设备失败";
var varCancel           = "取消";
var varTimeout          = "超时"
var varReadImageFailed  = "采集失败";
var varUpImageFailed    = "上传失败";
var varGetTzFailed      = "提取特征失败";
var varGetMbFailed      = "合并模板失败";
var varParameterIllegal = "参数非法";     
var varIsGettingImage   = "已经在采集图像";  

function IsSuccess(tmp)
{
		if(tmp=="-1")
    {
    	alert(varOpenDeviceFailed);
    	return -1;
    }
    else if(tmp=="-2")
    {
    	alert(varCancel);
    	return -2;
    }
    else if(tmp=="-3")
    {
    	alert(varTimeout);
    	return -3;
    }
    else if(tmp=="-4")
    {
    	alert(varReadImageFailed);
    	return -4;
    }
    else if(tmp=="-5")
    {
    	alert(varUpImageFailed);
    	return -5;
    }
    else if(tmp=="-6")
    {
    	alert(varGetTzFailed);
    	return -10;
    }
    else if(tmp=="-7")
    {
    	alert(varGetMbFailed);
    	return -10;
    }
     else if(tmp=="-10")
    {
    	alert(varParameterIllegal);
    	return -10;
    }
    else if(tmp=="-11")
    {
    	alert(varIsGettingImage);
    	return -11;
    }	
    else
    {
    	return 0;
    }	
}

function Button_GetTz_Hid() {
	document.getElementById("showtext").value ="";

			tz  = fpDevObj.GetFeature(0,dwWaitTime);
			if(IsSuccess(tz) == 0)
			{			
				document.getElementById("showtext").value =tz;
				checkFingerprint();
			} 
}

function Button_GetTz_Com() {
	document.getElementById("showtext").value ="";
	var iDevIndex = document.getElementById("devNo").selectedIndex + 1;
	tz  = fpDevObj.GetComFeature(iDevIndex,9600,dwWaitTime);
	if(IsSuccess(tz) == 0)
	{
		document.getElementById("showtext").value =tz;
		checkFingerprint();
		//onChange="checkFingerprint();"
	} 
}

function checkFingerprint(){
	var $form = $("#login");
	$form.attr("action","/cpms/login/checkFingerprint");
	var option = {
		type:"post",
		dataType:"json",
		async:false,
		success:function(data){
			if (data != null) {
				var z=0;
				if(typeof(data.tip) !="undefined" ){
					if(data.success=="true"){
						$('#id_password').removeAttr("readonly");
					}
					$.messager.alert('提示', data.tip); 
				}
			}
		},
		error:function(){
			alert("通讯失败!");
		}
	};
	$form.ajaxSubmit(option);		
}
