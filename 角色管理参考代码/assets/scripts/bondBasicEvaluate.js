$(document).ready(function(){
function checkBondInfo (){
		var flag = false;
		var bondCode = $("#bondCode").val();
		//如果未输入债券代码  则不验证
		if(!bondCode)return;
		$.ajax({
			type : "post",
			global : false,
			async : false,
			url : '/cpms/linkus/capital/bond/bussiness/bondPublic/checkBondEvaluateInfo',
			data : { 
				"bondCode":bondCode
			},
			dataType : "json",
			success : function(data) {
			 if (data != null) 
			 	if(data.ifNull){
			 		getTheMessager().alert("提示",data.tip,'',function(){
			 			$("#bondCode").focus();
			 		});
			 	}else{
		 			if(data.tip2!=null){
			 			getTheMessager().alert("提示",data.tip2,'',function(){
				 			$("#bondCode").focus();
		 				});
		 			}else{
		 				flag = true;
		 			}
			 	}
			},
			error:function(){
				doTheAlert('提示', errorTip);
			}
		});
		return flag;
	}
	
	/**input页面提交按钮**/
	$(document).on('click','#checkInfo',function(){
		var bool = checkBondInfo();
		if(!bool){
			return;
		}
		//获取两个数据
		var　$info2 = $("#evaluateInfo input");
		if(!$info2.eq(0).val()){
			doTheAlert('提示','请输入债券代码！');
			return;
		}
		if(!$info2.eq(1).val()){
			doTheAlert('提示','请输入估值净价！');
			return;
		}
		//获取表格中第一行的债券信息
		var noEmpty = $("#bondBasicEvaluateTable tbody tr:first td").eq(1).children().children().children().val();
		//上述信息非空  则点击最后一行的加号  添加新的一行
		if( noEmpty ){
			$("#bondBasicEvaluateTable tr:last td:last i:first").click();
		}
		var $inputs = $("#bondBasicEvaluateTable tr:last td input");
		var $tr = $("#bondBasicEvaluateTable tr:last");
		var num = $("#bondBasicEvaluateTable tr").length;
		$tr.children().eq(0).children().text(num-1);
		$inputs.eq(0).val($info2.eq(0).val());
		$inputs.eq(1).val($info2.eq(1).val());
		
		$inputs.attr("readonly","");
		$info2.val("");
	});
	
	/**通过日期查询出符合条件的估值信息**/
	$(document).on('click','#searchHistoryInfo',function(){
		var historyDate = $("#historyDate").val();
		var bondCode = $("#query_bondCode").val();
		if(historyDate==""){
			doTheAlert("提示","请选择查询日期!");
			return false;
		}
		$("#formSearch").submit();
	});
	
	/**input导入**/
	//点击选中行
	var flagImg = "<i class='flagImg glyphicon glyphicon-flag'></i>";
	$(document).on('click','#bondBasicEvaluateTable tbody tr',
		function(){
			//移除所有标记
			$('#bondBasicEvaluateTable tbody tr').removeClass("justMark1");
			//移除所有旗帜图片
			$(".flagImg").remove();
			//若点击行非空 
			if($(this).children().eq(1).children().children().children().val()){
				//添加标记
				$(this).addClass("justMark1");
				//加上旗帜
				$(this).children().eq(0).children().append(flagImg);
			}
				
	});
	//点击删除按钮
	$(document).on('click','#bondBasicEvaluateBtn #btn_remove',function(){
		var trLength = $("#bondBasicEvaluateTable tbody tr").length;
		//若有多行 删除标记的行    只有一行则将该行的数据清除
		if(trLength>1){
			var index = $("#bondBasicEvaluateTable tbody tr[class='justMark1']").index();
			//删除标记行(点击本行的"-"号来实现)
			$("#bondBasicEvaluateTable .justMark1").children("[class='manipulate']").children().eq(1).click();
			//重新写序号
			for(var i= index;i<trLength-1;i++){
				$("#bondBasicEvaluateTable tbody tr").eq(i).children().eq(0).children().text(i+1);
			}
			//标记下一行   若删除的是最后一行  则标记上一行
			var $nextLine = $("#bondBasicEvaluateTable tbody tr").eq(trLength == index+1?index-1:index);
			$nextLine.click();
		}
		else{
			//移除标记
			$("#bondBasicEvaluateTable tbody tr").removeClass("justMark1");
			//移除所有旗帜图片
			$(".flagImg").remove();
			//清空第一行信息
			var trInfo = $("#bondBasicEvaluateTable tbody tr td").children();
			trInfo.eq(0).text("");
			trInfo.eq(1).children().children().val("");
			trInfo.eq(2).children().children().val("");
		}
	});
	
	//点击导入按钮
	$(document).on('click','#btn_import',function() {
		 //每次导入前清空文件名称方可导入
		$("#fileUpload").val("");
		//导入数据
		$("#fileUpload").click();
	});
	
	//加载导入的信息
	$(document).on('change', '#fileUpload', function() {
		$.ajaxFileUpload({
			url : $("#actionBaseUrl").val()+"/importData?uploadName="+$("#fileUpload").val(),
			type : "post",
			global : false,
			secureuri : false,
			fileElementId : 'fileUpload',
			dataType : 'json',
			success : function(data) {
				/*var str = $(data).find("find").text();
				var json = $.parseJSON(str);*/
				$("#bondBasicEvaluateTable tbody tr:first input").val('');
				$("#bondBasicEvaluateTable tbody tr:first center").text('');
				$("#bondBasicEvaluateTable tbody tr:gt(0)").remove();
				if(data.normal){
					var len = data.list.length;
					for(var i = 1; i<len;i++){
						var map = data.list[i];
						if(($("#bondBasicEvaluateTable tbody tr").length)<i){
							$("#bondBasicEvaluateTable tbody tr").eq(i-2).find(".manipulate .add").click();
							$("#bondBasicEvaluateTable tbody tr").eq(i-1).find("input").attr("readonly","true");
						}
						$("#bondBasicEvaluateTable tbody tr").eq(i-1).find("td:first center").text(i);
						$("input[name='bondBasicEvaluateList["+(i-1)+"].bondCode']").val(map["bondCode"]);
						$("input[name='bondBasicEvaluateList["+(i-1)+"].transAmount']").val(map["transAmount"]);
					}
					$("#bondBasicEvaluateTable tbody tr:last").click();
					if(data.removeTip){
						doTheAlert("提示",data.removeTip);
					}
				}else{
					doTheAlert("提示",data.tip);
				}
			},
			error:function(){
				doTheAlert('提示', errorTip);
			}
		});

	});
	
	
	
});
/**跳转新建每日估值页面**/
function addBondBasicEvaluate(){
	window.open("/cpms/linkus/capital/bond/base/bondBasicEvaluate/input",{width:'50%'});
}

/**根据按钮不同进行不同操作（修改、删除）**/
function operateBondBasicEvaluate(editType){
	var length = $("#bondBasicEvaluate_form table tbody tr").length;
	var selectLength=0;//总行数
	var selectedRow=0;//被选中行的下标
	//计算总行数
	for (var i = 0; i <= length; i++) {
		var select = $("#bondBasicEvaluate_form table tbody").find("tr").eq(i).attr("class");
		if (select == "selected") {
			selectedRow=i;
			selectLength++;
		}
	}
	//校验如果selectLength=0则表示没选中一行，如果selectLength>1表示选中了多行
	if(selectLength<1){
		doTheAlert("提示","请在表格中勾选中一条估值信息！");
		return false;
	}else if(selectLength>1){
		doTheAlert("提示","只能勾选中一条估值信息");
		return false;
	}else if(selectLength==1){
		var tr = $("#bondBasicEvaluate_form table tbody").find("tr").eq(selectedRow);
		if(editType=="modi"){
			modiBondBasicEvaluate(tr);
		}else if(editType=="del"){
			delBondBasicEvaluate(tr);
		}
	}	
}

/**修改操作**/
function modiBondBasicEvaluate(tr){
	var uid=tr.find("td")[0].childNodes[0].value;
	window.open("/cpms/linkus/capital/bond/base/bondBasicEvaluate/edit?uid="+uid,{width:'40%'});
}
/**删除操作**/
function delBondBasicEvaluate(tr){
	var uid=tr.find("td")[0].childNodes[0].value;
	$.messager.confirm('确认','确定要删除这条估值信息吗？',function(r){
		if(r){
			$.ajax({
				type : "post",
				global : false,
				async : true,
				url : '/cpms/linkus/capital/bond/base/bondBasicEvaluate/del?uid='+uid,
				dataType : "json",
				success : function(data) {
					location.reload(true);
				},
				error:function(){
					doTheAlert('提示', errorTip);
				}
			});	
		}else{
			return ;
		}
	});
}



/**input页面保存操作**/
function saveBondBasicEvaluate(){
	var checkFlag=pubCheck("bondBasicEvaluate_input");
	if(!checkFlag){
		return ;
	}
	var $tr = $("#bondBasicEvaluateTable tbody tr")
	var temp = $tr.children().eq(1).children().children().children().val();
	if(temp){
		
	}
	$("#bondBasicEvaluate_input").submit();
	closePage();
	location.reload(true);
}