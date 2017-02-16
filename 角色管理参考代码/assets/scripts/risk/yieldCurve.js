/**
 *展示收益率曲线页面方法*/
function showCurveList(){
	//$("#id_curvesList").html('');
	var frame="<iframe id='id_frame_curvesList'  src='/cpms/linkus/capital/risk/yieldCurves/showList' frameborder='0' scrolling='auto' style='height:100%;width:100%;'></iframe>"
	$("#id_curvesList").html(frame);
	
}

/**
 *删除收益率曲线方法*/
function delCurve(curveNumber,tradeDate){
	getTheMessager().confirm('提示','确认删除',function(flag){
		if(flag){
			$.ajax({
		        type : "post",
		        global : false,
		        async : true,
		        url : '/cpms/linkus/capital/risk/yieldCurves/delCurve?curveNumber='+curveNumber+'&tradeDate='+tradeDate,
		        dataType : "json",
		        success : function(data) {
		        	if (data.flag=="1"){
		        		doTheAlert('提示', "删除失败");
		        	}else{
		        		//window.parent.$('#id_a_inputCurves').click();
						window.parent.$('#id_a_curvesList').click();
		        		doTheAlert('提示', "删除成功");
		        		
		        	}
		        }
		    });
		}else{
			return;
		}
	});
}

/**
 *点击修改按钮方法*/
function modiCurve(curveNumber,tradeDate){
	var url='/cpms/linkus/capital/risk/yieldCurves/inputCurve?curveNumber='+curveNumber+'&tradeDate='+tradeDate;
	window.open(url);
}

/**
 *查询收益率曲线方法*/
function queryCurve(){
	$('#id_yieldCurvesForm').attr('action','/cpms/linkus/capital/risk/yieldCurves/showCurve');
	$('#id_yieldCurvesForm').submit();
}
/**
 *上次文件改变方法*/
function changeUploadName(){
	var uploadName = $("#fileUpload").val();
	if(!uploadName){
		uploadName = "点击这里上传文件";
	}else{
		uploadName = uploadName.substring(uploadName.lastIndexOf("\\")+1);
	}
	$("#uploadTip").html(uploadName);
}
/**
 *自定义收益率曲线修改保存方法*/
function curveModiSave(){
	var $form = $("#id_modiCurveForm");
	$form.attr("action","/cpms/linkus/capital/risk/yieldCurves/curveModiSave");
	var option = {
		type:"post",
		dataType:"json",
		async:false,
		success:function(data){
        	if (data.flag=="1"){
        		doTheAlert('提示', "修改失败");
        	}else if(data.flag=="0"){
        		closePage();
        		doTheAlert('提示', "修改成功");
        		window.parent.$('#id_a_curvesList').click();
        	}else{
        		doTheAlert('提示', data.flag);
        	}
		},
		error:function(){
			alert("修改失败!");
		}
	};
	$form.ajaxSubmit(option);
}
/**
 *自定义收益率曲线新增保存方法*/
function curveInputSave(){
	var systemDate = $("#id_systemDate").val();
	var tradeDate = $("#id_tradeDate_input").val();
	if (tradeDate > systemDate){
		doTheAlert("提示","日期不能大于当前系统时间");
		return;
	}
	if($('#id_tbody_curve tr').length<5){
		doTheAlert("提示","至少录入5条数据");
		return;
	}
	var curveName = $("#id_curveName_input").val();
	$.ajax({
        type : "post",
        global : false,
        async : true,
        url : '/cpms/linkus/capital/risk/yieldCurves/findCurveExist?curveName='+curveName+'&tradeDate='+tradeDate,
        dataType : "json",
        success : function(data) {
        	if (data.exist){
        		getTheMessager().confirm('提示','已存在相同日期和名称的收益率曲线，是否覆盖？',function(flag){
        			if(flag){
        				$("#id_inputCurveForm").submit();
        			}else{
        				return;
        			}
        		});
        	}else{
        		$("#id_inputCurveForm").submit();
        	}
        }
    });	
}

/**
 *自定义收益率曲线修导入excel保存方法*/
function impportCurve(){
	var systemDate = $("#id_systemDate").val();
	var tradeDate = $("#id_tradeDate").val();
	if (tradeDate > systemDate){
		doTheAlert("提示","日期不能大于当前系统时间");
		return;
	}

	var curveName = $("#id_curveName").val();
	$.ajax({
        type : "post",
        global : false,
        async : true,
        url : '/cpms/linkus/capital/risk/yieldCurves/findCurveExist?curveName='+curveName+'&tradeDate='+tradeDate,
        dataType : "json",
        success : function(data) {
        	if (data.exist){
        		getTheMessager().confirm('提示','已存在相同日期和名称的收益率曲线，是否覆盖？',function(flag){
        			if(flag){
        				$("#importCurve").submit();
        				$("#uploadTip").html("点击这里上传文件");
        			}else{
        				return;
        			}
        		});
        	}else{
        		$("#importCurve").submit();
        		$("#uploadTip").html("点击这里上传文件");
        	}
        }
    });
}

/**
 *收益率曲线导出excel方法*/
function exportCurve(){
	$('#id_yieldCurvesForm').attr('action','/cpms/linkus/capital/risk/yieldCurves/export');
	$("#id_yieldCurvesForm").submit();
}

/**
 *收益率曲线查看绑定债券信息列表方法*/
$(document).on('click','#id_showbondlist',function(){
	var curveNumber = $("#id_expCurNum").val();
    $.ajax({
        type : "post",
        global : false,
        async : true,
        url : '/cpms/linkus/capital/risk/yieldCurves/getRelationBondCode?curveNumber='+curveNumber,
        dataType : "json",
        success : function(data) {
        	var bondList = data.bondList;
            window.open("/cpms/linkus/capital/bond/base/bondBasic/showRelation?relationBond="+bondList,{width:'99%'});
        },
        error:function(){
            doTheAlert("提示","查询失败！");
            return false;
        }
    });

});
