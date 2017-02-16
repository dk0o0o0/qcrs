//	alert('上级节点代码='+$(node).attr('attrParentCode'));
//	alert('上级节点名称='+$(node).attr('attrParentName'));
//	alert('当前节点代码='+$(node).attr('attrCode'));
//	alert('当前节点名称='+$(node).attr('attrName'));

/*敏感性分析点击节点事件*/
function clickSensitivityAnalysisNode(node){
	setActive(node);
	var queryType = $(node).attr('attrquerytype');
	var para = $(node).attr('attrCode');
	var frame="<iframe  name='frame_sensitivityAnalysis' src='/cpms/linkus/capital/risk/analysis/showSensitivity?queryType="+queryType;
	if (queryType == 'team'){
		frame += "&teamId="+para;
		frame += "&assetsType="+$(node).attr('attrParentCode'); 
	}else if(queryType == 'assetsType'){
		frame += "&assetsType="+para;
	}
	frame += "' frameborder='0' scrolling='auto' style='height:100%;width:100%;'></iframe>";
	$("#id_showSensitivity").html(frame);
}
/*情景分析点击节点事件*/
function clickScenarioAnalysisNode(node){
	setActive(node);
	var queryType = $(node).attr('attrquerytype');
	var para = $(node).attr('attrCode');
	var frame="<iframe  name='frame_scenarioAnalysis' src='/cpms/linkus/capital/risk/analysis/showScenario?queryType="+queryType;
	if (queryType == 'team'){
		frame += "&teamId="+para;
		frame += "&assetsType="+$(node).attr('attrParentCode'); 
	}else if(queryType == 'assetsType'){
		frame += "&assetsType="+para;
	}
	frame += "' frameborder='0' scrolling='auto' style='height:100%;width:100%;'></iframe>";
	$("#id_showScenario").html(frame);
}

/*压力测试点击节点事件*/
function clickStressTestAnalysisNode(node){
	setActive(node);
	var queryType = $(node).attr('attrquerytype');
	var para = $(node).attr('attrCode');
	var frame="<iframe  name='frame_stressTestAnalysis' src='/cpms/linkus/capital/risk/analysis/showStressTest?queryType="+queryType;
	if (queryType == 'team'){
		frame += "&teamId="+para;
		frame += "&assetsType="+$(node).attr('attrParentCode'); 
	}else if(queryType == 'assetsType'){
		frame += "&assetsType="+para;
	}
	frame += "' frameborder='0' scrolling='auto' style='height:100%;width:100%;'></iframe>";
	$("#id_showStressTest").html(frame);
}

/*收益率曲线点击节点事件*/
function clickCurveNode(node){
	setActive(node);
	var curveNumber= $(node).attr('attrCode');
	var curveName= $(node).attr('attrName');
	var frame="<iframe  name='id_showYieldCurves' src='/cpms/linkus/capital/risk/yieldCurves/showCurve?curveNumber="+curveNumber+"&curveName="+curveName+"' frameborder='0' scrolling='auto' style='height:100%;width:100%;'></iframe>"
	$("#id_showYieldCurves").html(frame);
}
/*收益率曲线与债券绑定点击节点事件*/
function clickBondRalationNode(node){
	setActive(node);
	var teamId= $(node).attr('attrCode');
	var assetsType=$(node).attr('attrParentCode');
	var frame="<iframe  name='id_BondRelation' src='/cpms/linkus/capital/risk/curvesBondRelation?teamId="+teamId+"&assetsType="+assetsType+"' frameborder='0' scrolling='auto' style='height:100%;width:100%;'></iframe>"
	$("#id_BondRelation").html(frame);
}
//空方法必须保留，
function nofunction(node){
	//var teamId= $(node).attr('attrCode');
	//var frame="<iframe  name='frame_Curves' src='/cpms/linkus/capital/risk/analysis/yieldCurves?teamId="+teamId+" frameborder='0' scrolling='auto' style='height:100%;width:100%;'></iframe>"
	//$("#id_showSensitivity").html(frame);
}

/*设置活动tab页签方法*/
function setActive(node){
	var activeLi =$(node).parents('ul').find('li.active');
	if(activeLi){
		$(activeLi).removeClass('active');
	}
	$(node).parent('li').addClass("active");
}

/*添加千分符方法*/
function addThousandCharacter(num){
	//传入的不是数字或者为空   返回原值
	if(isNaN(num)||!num)
		return num;
	var str;
	//如果传入的是小数   直接拆分
	num = num.toString();
	if(num.indexOf('.')!=-1)
	 	str = num.split(".");
	else//传入的是整数    默认给两位小数
		str = [num,'00'];
	//零宽断言      如果某个字段是1~3位数字  并且它后面的数字个数是3的倍数   则给这个字段后加一个千分符
	str[0]=str[0].replace(/\d{1,3}(?=(\d{3})+$)/g,function(s){return s+','});
	return str[0]+"."+str[1];
}
