$(document).ready(function() {
		var selector = $('#payInterType');
		$(document).on('change', selector, function() {});
	
	//创建债券时选择发行人 选定机构
	$(document).on('click','#result input[value="选择"]',function(){
		var agencyId = $(this).parents("tr").attr("id");
		var agencyName = $(this).parents("td").prev().text();
		$("input[name='bondBasic.issueUnit']").val(agencyId);
		$("#issueUnitName").val(agencyName);	 
		closePage();
	});
	
	//复核债券 
	$('#recheck').click(function(event) {
		var length = $("#bondBasic_form table tbody tr").length;
		var selectLength=0;//总行数
		var selectedRow=0;//被选中行的下标
		//计算总行数
		for (var i = 0; i < length; i++) {
			var select = $("#bondBasic_form table tbody").find("tr").eq(i).attr("class");
			if (select == "selected") {
				selectedRow=i;
				selectLength++;
			}
		}
		//校验如果selectLength=0则表示没选中一行，如果selectLength>1表示选中了多行
		if(selectLength<1){
			doTheAlert("提示","请在表格中勾选一笔债券！");
			return false;
		}else if(selectLength>1){
			doTheAlert("提示","只能选择一笔债券复核");
			return false;
		}else if(selectLength==1){
			var tr = $("#bondBasic_form table tbody").find("tr").eq(selectedRow);
			var bondCode = tr.find("td")[2].childNodes[0];
		}
	});
	
	
});

function payInterTypeChange(){
	var v = $('#payInterType').val();//根据选择的付息方式不同,显示部分录入字段可填不可填
	var paymentInterCycle = $('#paymentInterCycle').val();
	if((v=="1"||v=="2")&&paymentInterCycle=="0"){
		$('#paymentInterCycle').val("");
		//return false;
	}	
	if(v=="0"||v=="1"){//利随本清,付息式固定利率
		$('#currentBasicRate').val("");
		$('#id_rateBenchmark').val("");
		$('#rateMargin').val("");
		$('#paymentInterCycle').removeAttr("disabled");
		$('#faceInterestRate').removeAttr("readonly");//票面利率
		$('#currentBasicRate').removeAttr("readonly");//当期基础利率
		$('#id_rateBenchmark').removeAttr("disabled");//基准利率
		$('#rateMargin').removeAttr("readonly");//利差
		$('#currentBasicRate').attr("readonly","true");
		$('#id_rateBenchmark').attr("disabled","true");
		$('#rateMargin').attr("readonly","true");
		$('#currentBasicRate').removeAttr("class");//当期基础利率
		$('#faceInterestRate').attr('class','required percent');
	}else if(v=="2"){//付息式浮动利率
		//$('#id_rateBenchmark').val("");
		$('#rateMargin').val("");
		$('#paymentInterCycle').removeAttr("disabled");
		$('#faceInterestRate').removeAttr("readonly");//票面利率
		$('#currentBasicRate').removeAttr("readonly");//当期基础利率
		$('#id_rateBenchmark').removeAttr("disabled");//基准利率
		$('#rateMargin').removeAttr("readonly");//利差
		$('#currentBasicRate').attr('class','required');
		$('#faceInterestRate').attr('class','required percent');
	}else if(v=="3"){//贴现式
		$('#currentBasicRate').val("");
		$('#faceInterestRate').val("");
		$('#id_rateBenchmark').val("");
		$('#rateMargin').val("");
		$('#paymentInterCycle').removeAttr("disabled");
		$('#paymentInterCycle').val("0");//付息周期
		$('#faceInterestRate').removeAttr("readonly");//票面利率
		$('#currentBasicRate').removeAttr("readonly");//当期基础利率
		$('#id_rateBenchmark').removeAttr("disabled");//基准利率
		$('#rateMargin').removeAttr("readonly");//利差
		$('#faceInterestRate').attr("readonly","true");
		$('#currentBasicRate').attr("readonly","true");
		$('#id_rateBenchmark').attr("disabled","true");
		$('#rateMargin').attr("readonly","true");
		$('#currentBasicRate').removeAttr("class");//当期基础利率
		$('#faceInterestRate').removeAttr("class");//
		$('#faceInterestRate').attr('class','percent');
		
	}else if(v=="4"){//零息式
		$('#faceInterestRate').removeAttr("readonly");//票面利率
		$('#paymentInterCycle').val("0");//付息周期
		$('#paymentInterCycle').removeAttr("disabled");
		$('#currentBasicRate').removeAttr("readonly");//当期基础利率
		$('#id_rateBenchmark').removeAttr("disabled");//基准利率
		$('#rateMargin').removeAttr("readonly");//利差
		$('#paymentInterCycle').attr("disabled","true");
		$('#currentBasicRate').attr("readonly","true");
		$('#id_rateBenchmark').attr("disabled","true");
		$('#rateMargin').attr("readonly","true");
		$('#currentBasicRate').removeAttr("class");//当期基础利率
		$('#faceInterestRate').removeAttr("class");//
		$('#faceInterestRate').attr('class','percent');
	}
}

function reportTypeChange(){
	var reportType = $('#reportType').val();//债券统计类型
	var $bondSettleType = $('#bondSettleType');//债券核算类型
	if(reportType){
		$bondSettleType.val(reportType.split("_")[0]);
	}
}


function changeInterCycle(){
	var payInterType = $('#payInterType').val();
	var paymentInterCycle = $('#paymentInterCycle').val();
	if((payInterType=="1"||payInterType=="2")&&paymentInterCycle=="0"){
		doTheAlert("提示","付息方式选择＂附息式浮动利率＂与＂附息式固定利率＂时，付息周期不能选择＂到期还本付息＂");
		$('#paymentInterCycle').val("");
		return false;
	}
	//payInterTypeChanage
}
function addBondBasic(){
	window.open("/cpms/linkus/capital/bond/base/bondBasic/input",{width:'90%'});
}
function checkBondCode(){
	var viBondCode=$('#bondCode').val();
	if(!viBondCode){
		return false;
	}
	$.ajax({
		type : "post",
		global : false,
		async : true,
		url : '/cpms/linkus/capital/bond/base/bondBasic/checkBondCode?viBondCode='+viBondCode,
		dataType : "json",
		success : function(data) {
		 	if (data != null) {
				if(typeof(data.msg) !="undefined" && data.msg=="1"){
					doTheAlert("提示","债券代码已存在！");
					$('#bondCode').val('');
					$('#bondCode').focus();
					return false;
				}else{
					getBondWindInfo();
				}
			}else{
				getBondWindInfo();
			}
		},
		error:function(){
			doTheAlert('提示', errorTip);
		}
	});		
}
function saveBondBasic(){
		
	var faceInterestRate=$('#faceInterestRate').val();
	if (faceInterestRate.indexOf(".")>0){
		var length = faceInterestRate.split(".")[1].length;
		if (length > 8){
			doTheAlert("提示","票面利率：小数点不能超过8位");
			return;
		}
	}
	
	var checkFlag=pubCheck("bondBasic_input");
	var v = $('#payInterType').val();//根据选择的付息方式不同,显示部分录入字段可填不可填
	if(v=="0"||v=="1"){//利随本清,付息式固定利率
				
	}else if(v=="2"){//付息式浮动利率

	}else if(v=="3"){//贴现式
				
	}else if(v=="4"){//零息式
				
	}
		
	var matureDate = $("#matureDate").val();//到期日
	var issueDate = $("#issueDate").val();//发行日
	var matureDateInt = parseInt(matureDate.toString().replace(new RegExp('-','g'),""));
	var issueDateInt = parseInt(issueDate.toString().replace(new RegExp('-','g'),""));
	var startInterDate = $("input[name='bondBasic.startInterDate']").val();
	var startInterDateInt = parseInt(startInterDate.toString().replace(new RegExp('-','g'),""));
	if(startInterDateInt>matureDateInt){
		doTheAlert("提示","起息日不能大于到期日");
		
		$('#matureDate').val('');
		return;
	}
	if(issueDateInt>matureDateInt){
		doTheAlert("提示","到期日小于发行日");
		$('#matureDate').val('');
		return;
	}
		if(!checkFlag){
			return ;
		}
		var v = $('#payInterType').val();
		//保存时去除disabled
		if(v=="0"||v=="1"||v=="3"){
			$('#id_rateBenchmark').removeAttr("disabled");//基准利率
		}else if(v=="4"){
			$('#id_rateBenchmark').removeAttr("disabled");//基准利率
			$('#paymentInterCycle').removeAttr("disabled");//付息周期
		}
		$('#bondSettleType').removeAttr("disabled");//债券核算类型
		$("#bondBasic_input").submit();
		//closePage();	
}


Observation.bondBasic = function(container) {
	$('#bondBasic_input', container).each(function() {
		var form = this;
		form.onsuccess = function() {
			$('.ui-dialog-titlebar-close', $(form).closest('.ui-dialog')).click();
			$('#id_queryBondBasic').click();
		}
	});
}
function queryBondBasic(){
	var from1 = $('form.criteria');
	if (from1 && from1.length >= 0) {
		var from2 = from1[from1.length - 1];
		var id = from2.id;
		var actionBase = "/cpms/linkus/capital/bond/base/bondBasic";
		var bondCode = $("#viBondCode").val();
		var statex = $("#viStatex").val();
		actionBase=actionBase+"?viBondCode="+ bondCode+"&viStatex="+statex+"&viqueryFlag=query";
		$("#" + id)[0].action = actionBase;
		$("#" + id).trigger("submit");
	}
}
function operateBondBasic(editType){
		var length = $("#bondBasic_form table tbody tr").length;
		var selectLength=0;//总行数
		var selectedRow=0;//被选中行的下标
		//计算总行数
		for (var i = 0; i <= length; i++) {
			var select = $("#bondBasic_form table tbody").find("tr").eq(i).attr("class");
			if (select == "selected") {
				selectedRow=i;
				selectLength++;
			}
		}
		//校验如果selectLength=0则表示没选中一行，如果selectLength>1表示选中了多行
		if(selectLength<1){
			doTheAlert("提示","请表格中勾选中一条债券信息！");
			return false;
		}else if(selectLength>1){
			doTheAlert("提示","只能勾选中一条债券信息");
			return false;
		}else if(selectLength==1){
			var tr = $("#bondBasic_form table tbody").find("tr").eq(selectedRow);
			if(editType=="modi"){
				modiBondBasic(tr);
			}else if(editType=="approve"){
				approveBondBasic(tr);
			}else if(editType=="del"){
				delBondBasic(tr);
			}
		}	
}
function modiBondBasic(tr){
	var operUserId=tr.find("td").eq(11).text();
	var id_currentrUserId=$('#id_currentrUserId').val();
	var uid=tr.find("td")[0].childNodes[0].value;
	window.open("/cpms/linkus/capital/bond/base/bondBasic/input?uid="+uid,{width:'90%'});
}
function delBondBasic(tr){
	var uid=tr.find("td")[0].childNodes[0].value;
	var operUserId=tr.find("td").eq(11).text();
	var id_currentrUserId=$('#id_currentrUserId').val();	
	if(id_currentrUserId!=operUserId){
		doTheAlert("提示","只能删除自己添加的债券信息！");
		return false;
	}	
	$.messager.confirm('确认','确定要删除这条债券信息吗？',function(r){
		if(r){
			
			$.ajax({
				type : "post",
				global : false,
				async : true,
				url : '/cpms/linkus/capital/bond/base/bondBasic/del?uid='+uid+"&bondCode="+tr.find("td").eq(2).text(),
				dataType : "json",
				success : function(data) {
				 	if (data != null) {
						var z=0;
						if(typeof(data.msg) !="undefined" ){
							$.messager.alert('提示',data.msg,'',function(r){
								if(r){
									$('#id_queryBondBasic').click();
								}
							});
						}
					}
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
function approveBondBasic(tr){
	var uid=tr.find("td")[0].childNodes[0].value;
	var operUserId=tr.find("td").eq(11).text();
	var id_currentrUserId=$('#id_currentrUserId').val();

	if(tr.find("td").eq(1).attr('data-cellvalue')=="1"){
		doTheAlert("提示","已经复核的信息不能复核！");
		return false;
	}
	if(id_currentrUserId==operUserId){
		doTheAlert("提示","不能复核自己添加的债券信息！");
		return false;
	}	
	
	var type = tr.find("td").eq(5).attr('data-cellvalue');
	var faceInterestRate = tr.find("td").eq(4).text();
	window.open('/cpms/linkus/capital/bond/base/bondBasic/confirm?payInterType='+type+'&faceInterestRate=' + faceInterestRate,{width:'65%'});
	
}
function approveClick(flag){
	if(!flag) {
		closePage();
		return;
	}
	var length = $("#bondBasic_form table tbody tr").length;
	var selectLength=0;//总行数
	var selectedRow=0;//被选中行的下标
	//计算总行数
	for (var i = 0; i <= length; i++) {
		var select = $("#bondBasic_form table tbody").find("tr").eq(i).attr("class");
		if (select == "selected") {
			selectedRow=i;
			selectLength++;
		}
	}
	var tr = null;
	if(selectLength==1){
		tr = $("#bondBasic_form table tbody").find("tr").eq(selectedRow);
	}
	var bondCode=tr.find("td").eq(2).attr("data-cellvalue");
	var issuePrice = getMoneyValue(tr.find("td").eq(2).find(":hidden").val());
	var faceInterestRate = tr.find("td").eq(4).text();
	var startInterDate = tr.find("td").eq(7).text();
	var matureDate = tr.find("td").eq(8).text();
	var bondSettleType = tr.find("td").eq(12).attr("data-cellvalue");
	var uid=tr.find("td")[0].childNodes[0].value;
	
	var ret = false;
	var items = $("#bondbasic_confirm_frm input,#bondbasic_confirm_frm select").each(function(item){
		if(ret) return;
		var name = this.name;
		var val = "";
		if(name == "bondSettleType") {
			val = $(this).find("option:selected").val();
		}else {
			val = $(this).val();
		}
		var current = eval(name);
		if(name == "issuePrice") {
			current = parseFloat(current);
		}
		if(current != val) {
			ret = true;
			var jq = $(this);
			getTheMessager().alert("提示","复核数据检查失败，请重新录入！",'',function(){
	 			jq.focus();
	 		});
			return;
		}
		
	});
	if(ret) return;
	$.ajax({
		type : "post",
		global : false,
		async : true,
		url : '/cpms/linkus/capital/bond/base/bondBasic/approve?uid='+uid,
		dataType : "json",
		success : function(data) {
		 	if (data != null) {
				var z=0;
				if(typeof(data.msg) !="undefined" ){
					$.messager.alert('提示',data.msg,'',function(r){
						if(r){
							closePage();
							$('#id_queryBondBasic').click();
						}
					});
				}
			}
		},
		error:function(){
			doTheAlert('提示', errorTip);
		}
	});	
}

function checkBondBasicDate($date){
	var matureDate = $("#matureDate").val();
	var issueDate = $("#issueDate").val();
	var matureDateInt = parseInt(matureDate.toString().replace(new RegExp('-','g'),""));
	var issueDateInt = parseInt(issueDate.toString().replace(new RegExp('-','g'),""));
	if(issueDateInt>matureDateInt){
		doTheAlert("提示","到期日小于发行日");
		$('#matureDate').val('');
		return;
	}
	var startInterDate = $("input[name='bondBasic.startInterDate']").val();
	var startInterDateInt = parseInt(startInterDate.toString().replace(new RegExp('-','g'),""));
	if(startInterDateInt>matureDateInt){
		doTheAlert("提示","起息日大于到期日");
		$('#matureDate').val(startInterDate);
		return;
	}
}


$(document).on("keydown","input[name='bondBasic.bondCode']",function(event){
	if($(this).val()&&event.keyCode==13){
		$(this).blur();
	}
});


function getBondWindInfo(){
	if(checkForbiddenClickFlag()){return;}
	var bondCode_ = $("input[name='bondBasic.bondCode']").val();
	$("#bondBasic_input input[id!='bondCode'],#bondBasic_input select").val("");
	$("#bondBasic_input .date").val($("#systemDate_").text());
	$("#currency").val('01');
	$("#accruedFlag").val('0');
	$("#interestBasic").val('actual');
	$.ajax({
		type : "post",
		global : false,
		async : true,
		url : '/cpms/linkus/capital/bond/base/bondBasic/getBondWindInfo?bondCode='+ bondCode_,
		dataType : "json",
		success : function(data) {
			setForbiddenClickFlag_false();
		 	if (data&&data.bond) {
		 		var bond = data.bond;
		 		var value_ ;
				for(var bondColumn in bond){
					value_ = bond[bondColumn];
					if((value_+'').indexOf('00:00:00')>-1){//value_ instanceof Date  不管用
						value_ = (value_+'').substring(0,10);
					}
					$("[name='bondBasic."+bondColumn+"']").val(value_);
				}
				payInterTypeChange();
			}
		 	
		},
		error:function(){
			setForbiddenClickFlag_false();
			doTheAlert('提示', tip);
		}
	});	
}

