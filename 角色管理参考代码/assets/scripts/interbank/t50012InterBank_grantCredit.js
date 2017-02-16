/*************************************************************************************************
/* DESC       ：同业本行投资第三方授信信息JS                                                                                                                                                                                 
/* AUTHOR     ：大资管平台项目组                                                                                                                                                                                 
/* CREATE     ：2016-04-01                                     
/* MODIFYLIST ： Name          Date         Reason                                                
/*              yourName      updateDate    modiReason                                               
/*              -------------------------------------------------------------   
*************************************************************************************************/


/**
* 
*显示掩藏第三方信息
* @author 陈阳妙
* @description
* @return
* @modified
*/	
$(document).ready(function(){
	//显示掩藏第三方信息
	$(document).on('change','#occupyLimitType',function(){
		if($('#occupyLimitType').is(':checked')==false){//判断是否选中
			$('#div1').show();
			$('#numId').val('1');
		}else{
			$('#div1').hide();
			var allBox=document.getElementsByName("checkname")
			for(var i=0;i<allBox.length;i++){
				if(allBox[i].type=="checkbox"){
					allBox[i].checked=true;
				}
			}
			btnDeleteRow();//调用删除方法
			$('#btn_celldata').val("");
		}	
		$('#DSacceptBankId').val("");
		$('#DSacceptBankNo').val("");
		$('#DStransAmount').val("");
	});
		
});


/**
* 
*第三方授信信息导入
* @author 陈阳妙
* @description
* @return
* @modified
*/
$(document).ready(function(){
	$(document).on('click','#btn_import',function() {
		 //每次导入前清空文件名称方可导入
		$("#fileUpload").val("");
		//导入数据
		$("#fileUpload").click();
	});
	
	
	
	/**
	* 
	*同业本行投资第三方授信信息
	* @author 陈阳妙
	* @description
	* @return
	* @modified
	*/
	$(document).on('change', '#fileUpload', function() {
		//同业本行投资第三方授信信息
		var counterpartyName=$('#counterpartyNameA').val();
		var maturityDate=$('#maturityDateA').val();
		var h="";
		$.ajaxFileUpload({
			url : $("#actionBaseUrl").val()+"/importData?uploadName="+$("#fileUpload").val(),
			type : "post",
			global : false,
			secureuri : false,
			fileElementId : 'fileUpload',
			dataType : 'json',
			success : function(data) {
				var len = data.list.length;
				for(var i = 1; i<len;i++){
						json = data.list[i];
						var str=$(':input[name="checkname"]').length*1+json['xh']*1;
	                   	h += '<tr id="table'+str+'"onclick="getLine('+str+')">'+			
	                   	'<td><center><input onclick="getLine('+str+')" id="checkname'+str+'" name="checkname" type="checkbox" value="'+str+'"><input readonly=true style="width: 31px;" id="input_str'+str+'" value="'+str+'"/></center></td>'+			
	                   		              '<td id="transAmount'+str+'"><center><input name="interbankIvcntr.creditList['+str+']" id="inputTR'+str+'" readonly=true value="'+moneyEncoder(json['transAmount'])+'" /></center></td>'+
	                   		              '<td id="acceptBankNo'+str+'"><center><input  id="inputNO'+str+'" readonly=true value="'+json['acceptBankNo']+'"/></center></td>'+
	                   		              '<td id="acceptBankCode'+str+'"><center><input name="interbankIvcntr.creditList['+str+']" id="inputCO'+str+'" readonly=true value="'+json['acceptBankCode']+'"/></center></td>'+
	                   		           	  '</tr>';	
						 }
				 $('#tabbody').append(h);
			}
			});

	});

});


/**
* 
*同业本行投资第三方授信信息全选事件
* @author 陈阳妙
* @description
* @return
* @modified
*/
function checkAll(evt) {
//全选事件
	var isChecked = $(evt).prop("checked");
	$("input[name='checkname']").prop("checked", isChecked);
}

//删除所有选中记录
function btnDeleteRow() {
	$("input[name='checkname']").each(function(){
		var val=$('input:checkbox[name="checkname"]:checked').val();//选中box的值
		var str='table'+val;//拼写tr的ID
			if(val!=null){//判断是否选中
				if ($(this).prop("checked")) {
					var tabbody=document.getElementById("tabbody");
					var cell=document.getElementById(str);
					if(cell!=null){
						tabbody.removeChild(cell);
					}
				}
			}
	});
	
	//更新序号以及下标
	var num=$(':input[name="checkname"]').length;//数据条数
	var h="";
	var N=1;
	if(num>0){
		ok:for(var i=1;i<=num;i++){
			var transAmount=$('#inputTR'+i).val();//获取金额
			var acceptBankCode=$('#inputCO'+i).val();//获取第三方ID
			var acceptBankNo=$('#inputNO'+i).val();//获取第三方ID
			if(transAmount==undefined){
				i=i+1;
				 transAmount=$('#inputTR'+i).val();
				 acceptBankCode=$('#inputCO'+i).val();
				 acceptBankNo=$('#inputNO'+i).val();
				 num=num+1;
				 if(transAmount==undefined){
					 num=num+1;
					 continue ok;
				 }
			}
			h += '<tr id="table'+N+'"onclick="getLine('+N+')">'+			
		   	'<td><center><input onclick="getLine('+N+')"id="checkname'+N+'" name="checkname" type="checkbox" value="'+N+'"><input readonly=true style="width: 31px;" id="input_str'+N+'" value="'+N+'"/></center></td>'+			
		   		              '<td id="transAmount'+N+'"><center><input name="interbankIvcntr.creditList['+N+']" id="inputTR'+N+'" readonly=true value="'+transAmount+'"/></center></td>'+
		   		              '<td id="acceptBankNo'+N+'"><center><input  id="inputNO'+N+'" readonly=true value="'+acceptBankNo+'"/></center></td>'+
		   		              '<td id="acceptBankCode'+N+'"><center><input name="interbankIvcntr.creditList['+N+']" id="inputCO'+N+'" readonly=true value="'+acceptBankCode+'"/></center></td>'+
		   		           	  '</tr>';		
				N=N+1;
		}
	$('#tabbody').html(h);
	$(':input[name="checkname"]').prop("checked", false);
	}
	$('#hiId').html("");//设置修改隐藏域

}


/**
* 
*同业本行投资第三方授信信息新增显示掩藏第三方查询按钮
* @author 陈阳妙
* @description
* @return
* @modified
*/
$(document).on('click','#btn_add',function(){
//新增显示掩藏第三方查询按钮
		$('#searchSameBusiness').show();
		$('#DStransAmount').removeAttr("readonly");
});


/**
* 
*同业本行投资第三方授信信息修改按钮
* @author 陈阳妙
* @description
* @return
* @modified
*/
$(document).on('click','#btn_update',function(){
	//修改按钮
	$('#searchSameBusiness').show();//显示第三方查询按钮
	var val=$('input:checkbox[name="checkname"]:checked').val();//选中修改box的值
	var num=$(':input[name="checkname"]:checked').length;//数据条数
	if(num==1){//判断修改为一行
		$('#DStransAmount').removeAttr("readonly");
			if($('#checkname'+val).is(':checked')==true){//box选中行
				var transAmount=$('#inputTR'+val).val();//table中取金额
				var acceptBankNo=$('#inputNO'+val).val();//table中取第三方
				var DSacceptBankId=$('#inputCO'+val).val();//table中取第三方
				$('#DStransAmount').val(transAmount).change();
				$('#DSacceptBankNo').val(acceptBankNo);
				$('#DSacceptBankId').val(DSacceptBankId);
				$('#hiId').html(val);//设置修改隐藏域
			}else {
				doTheAlert("提示","请选择！！");
			}
		}else{
			doTheAlert("提示","请选择一行！！");
			$('#searchSameBusiness').hide();//隐藏第三方查询按钮
	}
	$(':input[name="checkname"]').prop("checked", false);
});

/**
* 
*同业本行投资第三方授信信息提交按钮btn_btn
* @author 陈阳妙
* @description
* @return
* @modified
*/
$(document).on('click','#btn_btn',function() {
	//提交按钮btn_btn
	var DStransAmount=$('#DStransAmount').val();//获取金额
	var DSacceptBankNo=$('#DSacceptBankNo').val();//获取第三方
	var counterpartyName=$('#counterpartyName').val();
	if(DSacceptBankNo==counterpartyName){
		doTheAlert("提示","交易对手方和第三方不能为同一机构");
		return;
	}
	var DSacceptBankId=$('#DSacceptBankId').val();//获取地方ID
	var str=document.getElementById("hiId").innerText;//修改隐藏值
	//var val=$('input:checkbox[name="checkname"]:checked').val();//选中修改box的值
	var numId=$(':input[name="checkname"]').length+1;//数据条数
	var h="";
	//判断是否是为新增	
	if(str=="") {
		if(DSacceptBankNo!=""&&DStransAmount!="") {
			h ='<tr id="table'+numId+'"onclick="getLine('+numId+')">'+			
	       	'<td><center><input onclick="getLine('+numId+')" id="checkname'+numId+'" name="checkname" type="checkbox" value="'+numId+'"><input readonly=true style="width: 31px;" id="input_str'+numId+'" value="'+numId+'"/></center></td>'+			
	       	'<td id="transAmount'+numId+'"><center><input name="interbankIvcntr.creditList['+numId+']" id="inputTR'+numId+'" readonly=true value="'+moneyEncoder(DStransAmount)+'" class="amount"/></center></td>'+
	       	'<td id="acceptBankNo'+numId+'"><center><input  id="inputNO'+numId+'" readonly=true value="'+DSacceptBankNo+'"/></center></td>'+
	       	'<td id="acceptBankCode'+numId+'"><center><input name="interbankIvcntr.creditList['+numId+']" id="inputCO'+numId+'" readonly=true value="'+DSacceptBankId+'"/></center></td>'+
	       	'</tr>';
			 $('#tabbody').append(h);
		} else {
			doTheAlert("提示","请填写完整信息！！");
		}
	} else {
		$('#inputTR'+str).val(DStransAmount).change();//修改金额
		$('#inputNO'+str).val(DSacceptBankNo);//修改第三方
		$('#inputCO'+str).val(DSacceptBankId);//修改第三方ID
	}
	$('#DStransAmount').val("");
	$('#DSacceptBankNo').val("");
	$('#DSacceptBankId').val("");
	$(':input[name="checkname"]').prop("checked", false);
	$('#hiId').html("");//设置修改隐藏域
	$('#searchSameBusiness').hide();//隐藏查询按钮
	document.getElementById("DStransAmount").readOnly="true";//置灰金额输入框
});

/**同业本行投资由于需传第三方数据到后台，故经办保存使用单独的方法(20161112)**/
$(document).on('click', '#form_saveT50012', function() {
	//判断页面输入项是否为空
	if(!pubCheck("form_id")){//表单ID
		return;
	}
	
	var occupyLimitType = $("input[name='interbankCntr.occupyLimitType']:checked").val();
	if(occupyLimitType=="1" && $("#table tbody tr").length==0) {
		doTheAlert("提示","第三方授信信息不能为空！");
		return;
	}
	
	//绑定table数据传给后台
	var num=$('#tabbody tr').length;//数据条数
	var h="";
	for(var i=0;i<num;i++){
		var transAmount=$('#inputTR'+i).val();//获取金额
		var acceptBankCode=$('#inputCO'+i).val();//获取第三方ID
		h=h+getMoneyValue(transAmount)+"#"+acceptBankCode+";";
	}
	$('#btn_celldata').val(h);
	//提交保存	
	var $form = $("#form_id");
	var approvalOpinion = $('#approvalOpinion').val();
	if(!approvalOpinion){
		approvalOpinion = '';
	}
	$form.attr("action",$("#actionBaseUrl").val()+"/businessRegister?approvalOpinion="+encodeURI(approvalOpinion));
	var option = {
		type:"post",
		dataType:"json",
		action:$("#actionBaseUrl").val()+"/businessRegister?approvalOpinion="+encodeURI(approvalOpinion),
		async:false,
		success:function(data){
			RGInvok(data);
		},
		error:function(){
			doTheAlert("提示","经办操作失败 ！！");
		}
	};
	deleteDisabled();
	$form.ajaxSubmit(option);
	addDisabled();
});

/**
* 
*同业本行投资第三方授信信息当全选则选定全选按钮
* @author 陈阳妙
* @description
* @return
* @modified
*/
function findCellAll(){
	var num=$(':input[name="checkname"]:checked').length;//数据条数
	var str=$(':input[name="checkname"]').length;//数据条数
	if(num*1-str*1==0){
		$('#checkall').prop("checked", true);
	}else{
		$('#checkall').prop("checked", false);
	}
}

/**
* 
*同业本行投资第三方授信信息单机选中一行
* @author 陈阳妙
* @description
* @return
* @modified
*/
function getLine(str){
	var str=str;
	if($('#checkname'+str).is(':checked')==true){//判断是否选中
		$('#checkname'+str).prop("checked", false);
	}else{
		$('#checkname'+str).prop("checked", true);
	}
	findCellAll();//当全选则选定全选按钮
}

/**
* 
*同业本行投资-计提利息
*改变金额、利率、计提基础计算利息
* @author 陈阳妙
* @description
* @return
* @modified
*/		
//计提利息
$(document).on('blur', '#faceAmount,#realRate,#interestAccruedBasis', function() {
	rateInof();
});

/**
* 
*同业本行投资-计提利息
*修改时间计算利息
* @author 陈阳妙
* @description
* @return
* @modified
*/		
//计提利息
$(document).on('blur', '#maturityDate,#startInterDate', function() {
	//到期日期
	var maturityDate =new Date($("#maturityDate").val());
	//起息日期
	var startInterDate =new Date($("#startInterDate").val());
	if(maturityDate-startInterDate<0){
		doTheAlert("提示","起息日必须小于到期日！");
		$("#maturityDate").val($("#startInterDate").val());
		return;
	}
	rateInof();
});

function rateInof(){
	var interestAccruedBasis=$("#interestAccruedBasis").val();//利息计提基础
	if(interestAccruedBasis=='360'||interestAccruedBasis=='365'){
		var faceAmount=getMoneyValue($("#faceAmount").val());
		var realRate=$("#realRate").val();//利率
		var maturityDate=new Date($("#maturityDate").val());
		var startInterDate=new Date($("#startInterDate").val());//节假日顺延
		var days=(maturityDate-startInterDate)/(24*3600*1000);
		var receAccruedInterest=(parseFloat(faceAmount*realRate).toFixed(4))/100/interestAccruedBasis*days;
		$("#receAccruedInterest").val(parseFloat(receAccruedInterest).toFixed(2)).change();
	}else{
		$("#receAccruedInterest").val("0.00");
		//doTheAlert("提示","亲，请选择利息计提基础！");
	}
}

$(document).on('click','#searchInterbankBasic',function(){
	var productNo = $('#productNo').val();
	$("#detail").hide();//将详情页的div隐藏,查询成功后才显示详情按钮
	if(productNo != ""){//如果债券代码为空则弹出提示,非空则走ajax查询
		$.ajax({
				type : "post",
				global : false,
//				async : false,
				url : '/cpms/linkus/capital/interbank/bussiness/t50012InterBank/findInterbankBasicByProductNo',
				data : {"productNo":productNo},
				dataType : "json",
				success : function(data){
					if(data.isNull!=null){
						doTheAlert("提示",data.isNull);//未找到产品
						$("#counterpartyName").val("");
						$("#transCoutertyAcctNo").val("");
						$("#custOpBankName").val("");
						$("#transCoutertyAcctName").val("");
						$("#counterpartyOpBkNo").val("");
						$("#productName").val("");
						$("#specialPurposeVehicle").val("");
						$("#productNature").val("");
						$("#interestAccruedBasis").val("");
						$("#payInterestPeriod").val("");
						$("#faceAmount").val("");
						$("#realRate").val("");
						$("#receAccruedInterest").val("");
						$("#startInterDate").val("");
						$("#maturityDate").val("");
						$("#firstBusiType").val("");
						$("#secondBusiType").val("");
						$("#riskAsset").val("");
						$("#busiRelateCenter").val("");
						$("#busirelateuser").val("");
						$("#enemy span input#occupyLimitType ").attr("checked","checked");
						$('#tabbody').html("");//先清空表
						$("#div1 ").hide();
						return;
					}else if(data.isStatex!=null){
						doTheAlert("提示",data.isStatex);//未复核产品
						return;
					}else if(data.isRun!=null){
						doTheAlert("提示",data.isRun);//未复核产品
						return;
					}else{
						$("#counterpartyName").val(data.iterBasic.counterpartyName);
						$("#counterpartyNo").val(data.iterBasic.counterpartyNo);
						$("#transCoutertyAcctNo").val(data.iterBasic.transCoutertyAcctNo);
						$("#custOpBankName").val(data.iterBasic.custOpBankName);
						$("#transCoutertyAcctName").val(data.iterBasic.transCoutertyAcctName);
						$("#counterpartyOpBkNo").val(data.iterBasic.counterpartyOpBkNo);
						$("#productName").val(data.iterBasic.productName);
						$("#specialPurposeVehicle").val(data.iterBasic.specialPurposeVehicle);
						$("#productNature").val(data.iterBasic.productNature);
						$("#interestAccruedBasis").val(data.iterBasic.interestAccruedBasis);
						$("#payInterestPeriod").val(data.iterBasic.payInterestPeriod);
						$("#faceAmount").val(moneyEncoder(data.iterBasic.startTransAmount));
						$("#realRate").val(data.iterBasic.realRate);
						$("#receAccruedInterest").val(data.iterBasic.receAccruedInterest);
						$("#startInterDate").val(data.iterBasic.startInterDate);
						$("#maturityDate").val(data.iterBasic.maturityDate);
						$("#firstBusiType").val(data.iterBasic.firstBusiType);
						$("#secondBusiType").val(data.iterBasic.secondBusiType);
						$("#riskAsset").val(data.iterBasic.riskAsset);
						$("#busiRelateCenter").val(data.iterBasic.busiRelateCenter);
						$("#busirelateuser").val(data.iterBasic.busirelateuser);
						
						if(data.iterBasic.creditItems.length>0){
							$("#three span input#occupyLimitType ").attr("checked","checked");
							$('#tabbody').html("");//先清空表
							$("#occupyLimitType ").change();
							var h='';
							for(var i=0;i<data.iterBasic.creditItems.length;i++){
							h +='<tr>'+			
					       	'<td><center><input readonly=true style="width: 31px;" id="input_str'+1+'" value="'+(i+1)+'"/></center></td>'+			
					       	'<td id="transAmount'+i+'"><center><input type=hidden 	name="interbankIvcntr.creditList['+i+']" id="inputTR'+i+'" readonly=true value="'+data.iterBasic.creditItems[i].creditAmount+'" class="amount"/>'+moneyEncoder(data.iterBasic.creditItems[i].creditAmount)+'</center></td>'+
					       	'<td id="acceptBankNo'+i+'"><center><input  id="inputNO'+i+'" readonly=true value="'+data.iterBasic.creditItems[i].creditAgencyName+'"/></center></td>'+
					       	'<td id="acceptBankCode'+i+'"><center><input name="interbankIvcntr.creditList['+i+']" id="inputCO'+i+'" readonly=true value="'+data.iterBasic.creditItems[i].creditAgencyid+'"/></center></td>'+
					       	'</tr>';
							}
							$('#tabbody').append(h);
						}
						$("#detail").show();//将详情页的div显示
						return;
					}
				},
				error:function(){
					doTheAlert('提示', errorTip);
				}
		});
	}else{
		doTheAlert("提示","请输入产品编号!");
		$("#bondName").val("");
		$("#valuationNetPrice").val("");
	};
});


$(document).on('click','#goDetails',
		function(){
			window.open("/cpms/linkus/capital/interbank/base/interbankBasic/viewInterbankBasic?productNo="+$("#productNo").val(),{width:'90%'});

	});

//回车事件
$(document).keydown(function(event){
	//输入债券代码处
	var productNo = $("input[name='interbankCntr.productNo']:focus").length;
	if(event.keyCode==13){
		$("input:focus").blur();
		//点击债券代码查询按钮
		if(productNo){
			$("#searchInterbankBasic").click();
			return;
		}
	}
});

function deleteDisabled(){
	$('#specialPurposeVehicle').removeAttr("disabled");
	$('#productNature').removeAttr("disabled");
	$('#interestAccruedBasis').removeAttr("disabled");
	$('#payInterestPeriod').removeAttr("disabled");
	$('#firstBusiType').removeAttr("disabled");
	$('#riskAsset').removeAttr("disabled");
	$('#busiRelateCenter').removeAttr("disabled");
	$('#three span input').removeAttr("disabled");
	$('#enemy span input').removeAttr("disabled");
}
function addDisabled(){
	$('#specialPurposeVehicle').attr("disabled",true);
	$('#productNature').attr("disabled",true);
	$('#interestAccruedBasis').attr("disabled",true);
	$('#payInterestPeriod').attr("disabled",true);
	$('#firstBusiType').attr("disabled",true);
	$('#riskAsset').attr("disabled",true);
	$('#busiRelateCenter').attr("disabled",true);
	$('#three span input').attr("disabled",true);
	$('#enemy span input').attr("disabled",true);
}