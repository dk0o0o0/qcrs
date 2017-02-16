	//点击导入按钮
	$(document).on('click','#btn_import',function() {
		 //每次导入前清空文件名称方可导入
		$("#fileUpload").val("");
		//导入数据
		$("#fileUpload").click();
	});
	
	//加载导入的信息
	$(document).on('change', '#fileUpload', function() {
		$("#findLocation").hide();
		$(".param_bondName").hide();
		$("input[name='bondNameShowFlag']").val('');
		if(checkForbiddenClickFlag()){return;}
		$.ajaxFileUpload({
			url : $("#actionBaseUrl").val()+"/importData?uploadName="+$("#fileUpload").val(),
			type : "post",
			global : false,
			secureuri : false,
			fileElementId : 'fileUpload',
			dataType : 'json',
			success : function(data) {
				setForbiddenClickFlag_false();
				$("#uploadInfoTable tbody tr:first input").val('');
				$("#uploadInfoTable tbody tr:first center").text('');
				$("#uploadInfoTable tbody tr:gt(0)").remove();
				if(data.normal){
					var len = data.list.length;
					for(var i = 1; i<len;i++){
						var map = data.list[i];
						if(($("#uploadInfoTable tbody tr").length)<i){
							$("#uploadInfoTable tbody tr").eq(i-2).find(".manipulate .add").click();
							$("#uploadInfoTable tbody tr").eq(i-1).find("input").attr("readonly","true");
						}
						$("#uploadInfoTable tbody tr").eq(i-1).find("td:first center").text(i);
						$("input[name='bondValuationParamList["+(i-1)+"].bondCode']").val(map["bondCode"]);
						$("input[name='bondValuationParamList["+(i-1)+"].netUnitPrice']").val(map["netUnitPrice"]);
//						$("input[name='bondValuationParamList["+(i-1)+"].fullUnitPrice']").val(map["fullUnitPrice"]);
					}
					$("#uploadInfoTable tbody tr:last").click();
					$("#findLocation").show();
				}else{
					doTheAlert("提示",data.tip);
				}
			},
			error:function(){
				doTheAlert('提示', errorTip);
				setForbiddenClickFlag_false();
			}
		});

	});
	
	function getBondBasicEvaluateInfoAtToday(){
		$("#findLocation").hide();
		$("input[name='bondNameShowFlag']").val('show');
		if(checkForbiddenClickFlag()){return;}
		$.ajax({
			type : "post",
			global : false,
			url :  $("#actionBaseUrl").val()+"/getBondBasicEvaluateInfoAtToday",
			dataType : "json",
			success : function(data) {
				setForbiddenClickFlag_false();
				$("#uploadInfoTable tbody tr:first input").val('');
				$("#uploadInfoTable tbody tr:first center").text('');
				$("#uploadInfoTable tbody tr:gt(0)").remove();
				if(data.normal){
					var len = data.list.length;
					for(var i = 0; i<len;i++){
						var map = data.list[i];
						if(($("#uploadInfoTable tbody tr").length)<i+1){
							$("#uploadInfoTable tbody tr").eq(i-1).find(".manipulate .add").click();
							$("#uploadInfoTable tbody tr").eq(i).find("input").attr("readonly","true");
						}
						$("#uploadInfoTable tbody tr").eq(i).find("td:first center").text(i+1);
						$("input[name='bondValuationParamList["+i+"].bondCode']").val(map["bondCode"]);
						$("input[name='bondValuationParamList["+i+"].netUnitPrice']").val(parseFloat(map["netUnitPrice"]).toFixed(4));
						$("input[name='bondValuationParamList["+i+"].bondName']").val(map["bondName"]);
					}
					$("#uploadInfoTable tbody tr:last").click();
					$("#findLocation").show();
					$(".param_bondName").show();
				}else{
					doTheAlert("提示",data.tip);
				}
			},
			error:function(){
				doTheAlert('提示', errorTip);
				setForbiddenClickFlag_false();
			}
		});	
		
	}
	
	
	
	$('#uploadInfoTable tr .netUnitPrice_').unbind('dblclick').dblclick(function() {
		$(this).removeAttr('readonly');
	});
	
	$(document).on("keydown",".netUnitPrice_",function(event){
		if(event.keyCode==13){	
			$(this).blur();
		}
	});
	
	
	$('#uploadInfoTable tr .netUnitPrice_').unbind('blur').blur(function(){
		var $thisInput = $(this);
		if(!$thisInput.val()){
			$thisInput.val(100);
			$thisInput.attr('readonly','');
			return;
		}
		if(isNaN($thisInput.val())){
			getTheMessager().alert("提示","请录入正确的数值",'',function(){
	 			$thisInput.focus();
	 		});
	 		return;
		}
		$thisInput.attr('readonly','');
	});
	
	
	
	
	
//---------------------------------------//点击标记选定的行
	//标记的图片
	var baseUrl = $("#actionBaseUrl").val();
	//<img class='flagImg' src='"+baseUrl.substring(0,baseUrl.indexOf('/cpms/linkus'))+"/assets/images/flag.png'/>
	var flagImg = "<i class='flagImg glyphicon glyphicon-flag'></i>";
	$(document).on('click','#uploadInfoTable tbody tr',
		function(){
			//移除所有标记
			$('#uploadInfoTable tbody tr').removeClass("justMark1");
			//移除所有旗帜图片
			$(".flagImg").remove();
			//若点击行非空 
			if($(this).children().eq(1).children().val()){
				//添加标记
				$(this).addClass("justMark1");
				//加上旗帜
				$(this).children().eq(0).children().append(flagImg);
			}
				
	});
	
	//点击删除按钮
		$(document).on('click','#bondValuationBtn #btn_remove',function(){
			var trLength = $("#uploadInfoTable tbody tr").length;
			//若有多行 删除标记的行    只有一行则将该行的数据清除
			if(trLength>1){
				var index = $("#uploadInfoTable tbody tr[class='justMark1']").index();
				//删除标记行(点击本行的"-"号来实现)
				$("#uploadInfoTable .justMark1").children("[class='manipulate']").children().eq(1).click();
				//重新写序号
				for(var i= index;i<trLength-1;i++){
					$("#uploadInfoTable tbody tr").eq(i).children().eq(0).children().text(i+1);
				}
				//标记下一行   若删除的是最后一行  则标记上一行
				var $nextLine = $("#uploadInfoTable tbody tr").eq(trLength == index+1?index-1:index);
				$nextLine.click();
			}
			else{
				//移除标记
				$("#uploadInfoTable tbody tr").removeClass("justMark1");
				//移除所有旗帜图片
				$(".flagImg").remove();
				//清空第一行信息
				var trInfo = $("#uploadInfoTable tbody tr td").children();
				trInfo.eq(0).text("");
				trInfo.val("");
			}
	});
	
	
	//点击提交按钮，将导入的信息传入到后台
	function submitInfo(){
		var action = $("#actionBaseUrl").val()+"?flag=submit";
		submitValuationInfo(action);
	}
	
	//导出
	function download_csv(){
		if(!$("#valuationAccountTable tbody tr input").eq(1).val()){
			doTheAlert("提示","请先导入数据并提交，出现估值账户列表信息时再导出。");
			return;
		}
		var action = $("#actionBaseUrl").val()+"?flag=submit&downloadFlag=flag";
		submitValuationInfo(action);
	}
	
	function submitValuationInfo(action){
		if(!$("#uploadInfoTable tbody tr:first center").text()){
			doTheAlert("提示","请导入数据再提交。");
			return;
		}
//		$("#valuationAccountTable tbody tr:gt(0)").remove();
//		var $inputs = $("#dataToDel input");
//		for(var i=0;i<$inputs.length;i++){
//			$inputs.eq(i).val('');
//		}
		var $form = $("#t20004Bond_form");
		$form.attr("action",action);
		if(checkForbiddenClickFlag()){return;}
		$form.submit();
		setForbiddenClickFlag_false();
	}
	
	//点击保存按钮，做经办保存操作
	$(document).on('click', '#doValuationSave', function() {
		if(!dealBondData()){
			return;
		}
		var $form = $("#t20004Bond_form");
		var approvalOpinion = $('#approvalOpinion').val();
		if(!approvalOpinion){
			approvalOpinion = '';
		}
		$form.attr("action",$("#actionBaseUrl").val()+"/businessRegister?approvalOpinion="+approvalOpinion);
		var option = {
			type:"post",
			dataType:"json",
			action:$("#actionBaseUrl").val()+"/businessRegister",
			async:false,
			success:function(data){
				setForbiddenClickFlag_false();
				if(data.normal){
					RG_MDInvok(data);
				}else{
					doTheAlert("提示",data.tip);
				}
			},
			error:function(){
				setForbiddenClickFlag_false();
				doTheAlert('提示', errorTip);
			}
		};
		if(checkForbiddenClickFlag()){return;}
		$form.ajaxSubmit(option);
	});
	
	function dealBondData(){
		if(!$("#valuationAccountTable tbody tr:first td:eq(1) input").val()){
			doTheAlert("提醒","估值账户列表不能为空！请提交估值信息再保存。");
			return false;
		}
		return true;
	}
	
	
	//定位指定债券代码的行  并获取净价单价
	$(document).on("keydown","#bondCodeSearch",function(event){
		if(event.keyCode==13){	
			findLocation();
		}
	});
	
	
	function findLocation(){
		var $netUnitPriceSearch = $("#netUnitPriceSearch");
		$netUnitPriceSearch.attr("readonly","");
		var $tip = $("#findLocation span");
		var bondCode = $("#bondCodeSearch").val();
		var $paramCode = findParamCode(bondCode);
		if($paramCode){
			$paramCode.click();
			var lineNum = $paramCode.parents("tr").index();
			var $paramNetPrice = $(".param_netUnitPrice input").eq(lineNum);
			$tip.text("目标在第"+(lineNum*1+1)+"行。");
			$netUnitPriceSearch.removeAttr("readonly");
			$netUnitPriceSearch.val($paramNetPrice.val());
		}else{
			$tip.text("未找到数据");
		}
		$("#netUnitPriceSearch").focus();
	}
	
	
	function findParamCode(bondCode){
		var $bondCodes = $(".param_bondCode input");
		for(var i=0;i<$bondCodes.length;i++){
			if($bondCodes.eq(i).val()==bondCode){
				$("#lineMark").val(i);
				return $bondCodes.eq(i);
			}
		}
		return null;
	}
	
	//定位指定债券代码的行  并获取净价单价
	$(document).on("keydown","#netUnitPriceSearch",function(event){
		if(event.keyCode==13){	
			setTheNetUnitPrice();
		}
	});

	
	function setTheNetUnitPrice(){
		var netUnitPrice = $("#netUnitPriceSearch").val();
		if(isNaN(netUnitPrice)){
			getTheMessager().alert("提示","请录入正确的净价单价。",'',function(){
	 			$("#netUnitPriceSearch").focus();
	 		});
	 		return;
		}
		var lineNum = $("#lineMark").val();
		var $paramNetPrice = $(".param_netUnitPrice input").eq(lineNum);
		$paramNetPrice.val(parseFloat(netUnitPrice).toFixed(4));
		var $tip = $("#findLocation span");
		$("#netUnitPriceSearch").blur();
		$tip.text("目标在第"+(lineNum*1+1)+"行，已修改。");
	}
	
