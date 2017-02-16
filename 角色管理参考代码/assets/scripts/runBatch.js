	
	var baseUrl = "/cpms/linkus/capital/system/runbatchControl";
	
	$(document).on('click','#toManully',function(){//切人工
		$("#batchStatus").val("MANUALLY");
		changeStatus(baseUrl+"/changeBatchStatus");
	});
	$(document).on('click','#toEndDay',function(){//切日终
		changeSysStatus("ENDDAY");
	});
	$(document).on('click','#toOperate',function(){//切运营
		changeSysStatus("OPERATE");
	});
	$(document).on('click','#toRunbatch',function(){//强制跑批
		if($("#coreDateDiv:visible").length&&!$("#coreDate").val()){
			doTheAlert("提示","请录入记账核心日期");
			return;
		}
		getTheMessager().confirm('确认','确认强制跑批?',function(flag){
			if(flag){
				runbatch();
			}
		});	
	});
	
	//强制跑批
	function runbatch(){
		if(checkForbiddenClickFlag()){return;}
		$("#sysStatus").val("RUNBATCHIN");
		changeButton();
		$.ajax({
			type : "post",
			global : false,
			url : baseUrl+"/runbatch",
			data : {
				"coreDate":$("#coreDate").val()
			},
			dataType : "json",
			success:function(data){
				setForbiddenClickFlag_false();
				if(data!=null){
					if(data.normal){
						findRunbatchList();
						$("#sysStatus").val("STARTDAY");
						changeButton();
					}else{
						getTheMessager().alert("提示",data.tip,'',function(){
				 			location.reload(true);
				 		});
					}
				}else{
					doTheAlert("提示","跑批出现异常！返回的数据为空！");
				}
			},
			error:function(){
				setForbiddenClickFlag_false();
				doTheAlert("提示","强制跑批失败。");
			}
		});
	}
	
	
	//根据系统状态/跑批状态改变按钮状态
	function changeButton(){
		var $toManully = $("#toManully");//切人工
		var $toEndDay = $("#toEndDay");//切日终
		var $toOperate = $("#toOperate");//切运营
		var $toRunbatch = $("#toRunbatch");//强制跑批
		var sysStatus = $("#sysStatus").val();//系统状态
		var batchStatus = $("#batchStatus").val();//跑批状态
		if("OPERATE"==sysStatus){//运营
			$toEndDay.removeAttr('disabled');
			if("AUTOMATIC"==batchStatus){//自动状态
				$toManully.removeAttr('disabled');
			}
			$toOperate.attr('disabled','');
			$toRunbatch.attr('disabled','');
		}else if("ENDDAY"==sysStatus){//日终
			$toEndDay.attr('disabled','');
			$toManully.attr('disabled','');
			$toOperate.removeAttr('disabled');
			$toRunbatch.removeAttr('disabled');
		}else if("STARTDAY"==sysStatus){//日始
			$toEndDay.attr('disabled','');
			$toManully.attr('disabled','');
			$toOperate.attr('disabled','');
			$toRunbatch.attr('disabled','');
		}else if("RUNBATCHIN"==sysStatus){//跑批中
			$toEndDay.attr('disabled','');
			$toManully.attr('disabled','');
			$toOperate.attr('disabled','');
			$toRunbatch.attr('disabled','');
		}else if("RUNBATCHERROR"==sysStatus){//跑批失败
			$toEndDay.attr('disabled','');
			$toManully.attr('disabled','');
			$toOperate.attr('disabled','');
			$toRunbatch.removeAttr('disabled');
		}
		$("#sysStatusCHName").text($("#sysStatus option:selected").text());
		
	}
	
	//查询跑批信息集合
	function findRunbatchList(){
		var showFlag = $("#showFlag").val();
		var $coreDate = $("#coreDateDiv");
		if(showFlag=='1'){
			$("#coreDate").val('');
			$coreDate.hide();
		}else{
			$coreDate.show();
		}
		var $from = $('#SystemRunbatch_form');
		var action = $("#actionBaseUrl").val()+"?showFlag="+showFlag;
		$from.attr('action',action);
		$from.trigger("submit")
	}
	
	//改变系统状态
	function changeSysStatus(status){
		var url = baseUrl+"/changeSystemStatus";
		$("#sysStatus").val(status);
		changeStatus(url);
	}
	
	//改变系统/跑批状态
	function changeStatus(url){
		$.ajax({
			type : "post",
			global : false,
			url : url,
			data : {
				"systemStatus":$("#sysStatus").val(),
				"batchStatus":$("#batchStatus").val()
			},
			dataType : "json",
			success:function(data){
				if(data!=null){
					if(data.normal){
						getTheMessager().alert("提示","状态已修改",'',function(){
				 			location.reload(true);
				 		});
					}else{
						getTheMessager().alert("提示",data.tip,'',function(){
				 			location.reload(true);
				 		});
					}
				}
			},
			error:function(){
				doTheAlert("提示","失败。");
			}
		});
	}
	






















$(function(){
	var url = "/cpms/linkus/capital/runbatch/runBathJobTask/";
	//刷提醒
	$(document).on('click','#remind',remind);
	function remind(){
		$.ajax({
				type : "post",
				global : false,
				url : url+"RunBathDayEnd",
				data : {},
				dataType : "json",
				success:function(data){
					if(data!=null&&data.tip){
						doTheAlert("提示",data.tip);
					}
				},
				error:function(){
					doTheAlert("提示","刷提醒失败");
				}
			});
	}
	
	//刷代办
	$(document).on('click','#todo',todo);
		function todo(){
		$.ajax({
				type : "post",
				global : false,
				url : url+"Test",
				data : {},
				dataType : "json",
				success:function(data){
					if(data!=null&&data.tip){
						doTheAlert("提示",data.tip);
					}
				},
				error:function(){
					doTheAlert("提示","刷代办失败");
				}
			});
	}
	//更新实际利率
	$(document).on('click','#realRate',realRate);
		function realRate(){
		$.ajax({
				type : "post",
				global : false,
				url : url+"TestRate",
				data : {},
				dataType : "json",
				success:function(data){
					if(data!=null&&data.tip){
						doTheAlert("提示",data.tip);
					}
				},
				error:function(){
					doTheAlert("提示","实际利率更新失败");
				}
			});
	}
})