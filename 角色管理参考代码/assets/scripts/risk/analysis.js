/**
 *现金流图表展示方法*/
function showCashFlowChart(queryType){
	teamId=""+teamId;
	if($('#id_frame_cashFlowChart').length>0){
		
	}else{
		var frame="<iframe id='id_frame_cashFlowChart' name='frame_cashFlowChart' src='/cpms/linkus/capital/risk/analysis/showCashFlowChart?queryType=" + queryType;
		if (queryType == "team"){
			frame += "&teamId=" + $("#id_teamId").val();
			frame += "&assetsType=" + $("#id_assetsType").val();
		}else if(queryType == "assetsType"){
			frame += "&assetsType=" + $("#id_assetsType").val();
		}
		frame += "' frameborder='0' scrolling='auto' style='height:100%;width:100%;'></iframe>";
		$("#id_cashFlowChart").html(frame);	
	}
	
}

/**
 *现金流明细展示方法*/
function showCashFlowDetail(queryType){
	var frame="<iframe id='id_frame_cashFlowDetail' name='frame_cashFlowDetail' src='/cpms/linkus/capital/risk/analysis/cashFlowDetail?queryType=" + queryType;
	if (queryType == "team"){
		frame += "&teamId=" + $("#id_teamId").val();
		frame += "&assetsType=" + $("#id_assetsType").val();
	}else if(queryType == "assetsType"){
		frame += "&assetsType=" + $("#id_assetsType").val();
	}
    frame += "' frameborder='0' scrolling='auto' style='height:100%;width:100%;'></iframe>";
	$("#id_cashFlowDetail").html(frame);
}

/**
 *情景分析计算方法*/
$(document).on('click','#id_calAnalysis_btn',function(){
	var curveUp = $("#id_curveUp").val();
	var curveDown = $("#id_curveDown").val();
	var curveMove;
	var $stressScenario = $("#id_stressScenario");
	if ($stressScenario.length == 0){
		if (curveUp != "" && curveDown != "")
		{
			doTheAlert("提示", "曲线上升下降只能输入其中一个！");
			return;
		}else if(curveUp == "" && curveDown == ""){
			doTheAlert("提示", "曲线上升下降须输入其中一个！");
			return;
		}else if(curveUp != ""){
			curveMove = curveUp * 1;
		}else{
			curveMove = curveDown * -1;
		}
	}else{
		curveMove = $stressScenario.val() * 1;
	}
	
	var calcDate = $("#id_calcDate").val();
	if (calcDate == "")
	{
		doTheAlert("提示", "请输入计算日期！");
		return;
	}
	var teamId = $("#id_teamId").val();
	var queryType = $("#id_queryType").val();
	var urlStr = '/cpms/linkus/capital/risk/analysis/calAnalysis?curveMove='+curveMove+'&calDate='+calcDate+'&queryType='+queryType;
	if (queryType == "team"){
		urlStr += "&teamId=" + $("#id_teamId").val();
		urlStr += "&assetsType=" + $("#id_assetsType").val();
	}else if(queryType == "assetsType"){
		urlStr += "&assetsType=" + $("#id_assetsType").val();
	}
	
    $.ajax({
        type : "post",
        global : false,
        async : true,
        url : urlStr,
        dataType : "json",
        success : function(data) {
        	var res = data.res;
            if (res == null)
            	return;
            $("#id_bondTeamSum").val(addThousandCharacter(res['bondteamsum'].toFixed(2)));
            $("#id_ScenarioSum").val(addThousandCharacter((res['bondteamsum'] - res['floatProfit']).toFixed(2)));
            $("#id_floatProfitSum").val(addThousandCharacter(-res['floatProfit'].toFixed(2)));
            var list =data.list;
            
        },
        error:function(){
            doTheAlert("提示","查询失败！");
            return false;
        }
    });

});


/**
 *组合成分信息查询方法*/
$(document).on('click','#searchBond',function(){
	var bondCode = $("#id_searchBondCode").val();
	if (bondCode == ''){
		doTheAlert("提示",'请选择债券！');
		return;
	}
	var queryType = $("#id_queryType").val();
	var urlStr = '/cpms/linkus/capital/risk/analysis/searchBonds?queryType='+queryType+"&bondCode="+bondCode;
	if (queryType == "team"){
		urlStr += "&teamId=" + $("#id_teamId").val();
		urlStr += "&assetsType=" + $("#id_assetsType").val();
	}else if(queryType == "assetsType"){
		urlStr += "&assetsType=" + $("#id_assetsType").val();
	}
	var $table = $("#analysisListTable tbody");
	$table.text("");
	$.ajax({
        type : "post",
        global : false,
        async : true,
        url : urlStr,
        dataType : "json",
        success : function(data) {
        	var html = "";
        	var list =data.list;
        	for (var i=0; i<list.length; i++){
        		html += "<tr>";
        		html += "<td>"+ list[i].assetsTypeName +"</td>";
        		html += "<td>"+ list[i].teamName +"</td>";
        		html += "<td>"+ list[i].bondCode +"</td>";
        		html += "<td>"+ list[i].s_info_name +"</td>";
        		html += "<td>"+ addThousandCharacter(list[i].bondam.toFixed(2)) +"</td>";
        		html += "<td>"+ addThousandCharacter(list[i].bondamNow.toFixed(2)) +"</td>";
        		if (queryType == "team"){
            		html += "<td>"+ addThousandCharacter((list[i].bondweight*100).toFixed(2)) +"</td>";
        		}
        		html += "<td>"+ addThousandCharacter(list[i].showDura.toFixed(4)) +"</td>";
        		html += "<td>"+ addThousandCharacter(list[i].b_anal_duration.toFixed(4)) +"</td>";
        		html += "<td>"+ addThousandCharacter(list[i].showCnxt.toFixed(4)) +"</td>";
        		html += "<td>"+ addThousandCharacter(list[i].b_anal_vobp_cnbd.toFixed(2)) +"</td>";
        		html += "</tr>";
        	}
        	$table.append(html);
        },
        error:function(){
            doTheAlert("提示","查询失败！");
            return false;
        }
    });
});


/**
 *现金流查询方法*/
$(document).on('click','#cash_searchBond',function(){
	var bondCode = $("#cash_bondCode").val();
	if (bondCode == ''){
		doTheAlert("提示",'请选择债券！');
		return;
	}
	var queryType = $("#id_queryType").val();
	var urlStr = '/cpms/linkus/capital/risk/analysis/searchCashFlow?queryType='+queryType+"&bondCode="+bondCode;
	if (queryType == "team"){
		urlStr += "&teamId=" + $("#id_teamId").val();
		urlStr += "&assetsType=" + $("#id_assetsType").val();
	}else if(queryType == "assetsType"){
		urlStr += "&assetsType=" + $("#id_assetsType").val();
	}
	var $table = $("#analysisGroupTable tbody");
	$table.text("");
	$.ajax({
        type : "post",
        global : false,
        async : true,
        url : urlStr,
        dataType : "json",
        success : function(data) {
        	var html = "";
        	var list =data.list;
        	for (var i=0; i<list.length; i++){
        		html += "<tr>";
        		html += "<td>"+ list[i].b_info_paymentdate +"</td>";
        		html += "<td>"+ list[i].assetsTypeName +"</td>";
        		html += "<td>"+ list[i].teamName +"</td>";
        		html += "<td>"+ list[i].s_info_windcode +"</td>";
        		html += "<td>"+ list[i].bondName +"</td>";
        		html += "<td>"+ addThousandCharacter(list[i].b_info_paymentsum.toFixed(4)) +"</td>";
        		html += "</tr>";
        	}
        	$table.append(html);
        },
        error:function(){
            doTheAlert("提示","查询失败！");
            return false;
        }
    });
});

/**
 *组合成分信息导出方法*/
$(document).on('click','#exportComponent',function(){
	var $form = $("#id_exportComponentForm");
	$form.attr("action","/cpms/linkus/capital/risk/analysis/exportComponent");
	$form.submit();
});

/**
 *现金流信息导出方法*/
$(document).on('click','#exportCashFlow',function(){
	var $form = $("#id_exportCashFlowForm");
	$form.attr("action","/cpms/linkus/capital/risk/analysis/exportCashFlow");
	$form.submit();
});

