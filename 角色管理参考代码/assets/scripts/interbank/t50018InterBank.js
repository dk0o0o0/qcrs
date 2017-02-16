/*************************************************************************************************
/* DESC       ：同业本行投资卖出JS                                                                                                                                                                                 
/* AUTHOR     ：大资管平台项目组                                                                                                                                                                                 
/* CREATE     ：2016-04-01                                     
/* MODIFYLIST ： Name          Date         Reason                                                
/*              yourName      updateDate    modiReason                                               
/*              -------------------------------------------------------------   
*************************************************************************************************/


/**
* 
*同业本行投资卖出查询页面跳转
* @author 陈阳妙
* @description
* @return
* @modified
*/		
$(document).ready(function(){
	//同业本行投资卖出查询页面跳转
	$(document).on('click','#seacthbtn',function(){
		showWin=window.open('/cpms/linkus/capital/interbank/bussiness/T50018InterBank/getInterbankIvcntrBySearchInfo');
	});
	
	
	/**
	* 
	*同业本行投资卖出持仓信息查询
	* @author 陈阳妙
	* @description
	* @return
	* @modified
	*/	
	$(document).on('click','#searchbtn',function(){
		//同业本行投资卖出持仓信息查询
		var counterpartyName=$('#counterpartyName_search').val();
		var acceptBankId=$('#acceptBankId_search').val();
		var maturityDate=$('#maturityDate_search').val();
		//业务代号
		var busiType =$(':input[name="interbankCntr.busiType"]').val();
		var h="";
		$.ajax({
			type:"post",
			global:false,
			async:true,
			url:""+'/cpms/linkus/capital/interbank/bussiness/InterbankIvcntr/getInterbankIvcntrByBookInfo_50018',
			data : {
				"busiType":busiType,
				"acceptBankId":acceptBankId,
				"maturityDate":maturityDate
			},
			dataType : "json",
			success : function(data) {
				if (data.list.length!=0) {
					 for(var i = 0; i < data.list.length; i++) {
	                   		var json = data.list[i];
	                   		var x=i+1;
	                   		h += '<tr id="table_search" onclick="getLine('+x+')">'+
	                   		'<td><label><input onclick="updataLine('+x+')" name="tableB" id="tableB'+x+'"type="radio"value="'+x+'" >'+x+'</label></td>'+
				              '<td id="contractNo'+x+'">'+json['contractNo']+'</td>'+
				              '<td>'+moneyEncoder(json['transAmount'])+'</td>'+
				              '<td>'+moneyEncoder(json['remainAmount'])+'</td>'+
				              '<td>'+json['productName']+'</td>'+
				              '<td>'+json['counterpartyName']+'</td>'+
				              '<td>'+json['counterpartyNo']+'</td>'+
	        				  '</tr>';
						 }
				}else{
					doTheAlert("提示",counterpartyName+"无同业本行投资记录！");
				}
				 $('#tabbody').html(h)
			}
		});
	});
	
	
	/**
	* 
	*显示掩藏承兑行查询按钮
	* @author 陈阳妙
	* @description
	* @return
	* @modified
	*/		
	$(document).on('change','#accruedFlag_search',function(){
		//显示掩藏交易对手名称查询按钮
		if($('#accruedFlag_search').is(':checked')==true){
			$('#searchSameBusiness').show();
		}else {
			$('#counterpartyName_search').val('');
			$('#acceptBankId_search').val('');
			$('#searchSameBusiness').hide();
		}
	});

	/**
	* 
	*显示掩藏到期日查询按钮
	* @author 陈阳妙
	* @description
	* @return
	* @modified
	*/
	$(document).on('change','#accruedFlag_maturityDate',function(){
		//显示掩藏到期日查询按钮
		if($('#accruedFlag_maturityDate').is(':checked')==true){
			$('#maturityDate_search').removeAttr("disabled");
		}else {
			$('#maturityDate_search').val('');
			document.getElementById("maturityDate_search").disabled="true";
		}
	});
	
	/**
	* 
	*绑定提交按钮
	* @author 陈阳妙
	* @description
	* @return
	* @modified
	*/
	$(document).on('click','#buttonId',function(){
		//绑定提交按钮
		var val=$('input:radio[name="tableB"]:checked').val();
		if(val==null){
			doTheAlert("提示","请选择！");
			return false;
		}else{
			$('table').each(function(){
				var str='contractNo'+val;
				var contractNoStr=$(this).find('#'+str).text();
				if(contractNoStr) {
					closePage();//关闭查询页面
					document.getElementById("initialContractNo").focus();
					document.getElementById("initialContractNo").value=contractNoStr;
					document.getElementById("initialContractNo").blur();
					$('#initialContractNo').change();//调用方法
				}
			});
		}
	});
	
	
	/**
	* 
	*同业本行投资卖出页面回显
	* @author 陈阳妙
	* @description
	* @return
	* @modified
	*/	
	$(document).on('change', '#initialContractNo', function() {
		//同业本行投资卖出页面回显
		var initialContractNo=document.getElementById("initialContractNo").value;
		var occupyLimitType0=($('#occupyLimitType0').val());
		var occupyLimitType1=($('#occupyLimitType1').val());
		if (this.value) {
			$.ajax({
				type : "post",
				global : false,
				async : false,
				url : "" + '/cpms/linkus/capital/interbank/bussiness/InterbankIvcntr/getInterbankIvcntrByInfo',
				data : {
					"initialContractNo" : initialContractNo
				},
				dataType : "json",
				success : function(data) {
					if (data != null) {
						for (var key in data['map']) {
							if (key == 'initialContractNo')
								continue;
							if(key=='transAmount'){
								$('#oldFaceAmount').val(data['map']['transAmount']).change();
							}else{
								var ele = $('#'+ key );
								var strq=ele.val();
								if(data['map'][key].val!=""){
									ele.val("");
									if(key=='occupyLimitType'||occupyLimitType0==""||occupyLimitType1==""){
										if(data['map']['occupyLimitType']=='0'){
											document.getElementById('occupyLimitType0').checked=true;
											$('#divId').hide();
										}
										if(data['map']['occupyLimitType']=='1'){
											var bookId=data['map']['bookId'];
											$('#divId').show();
											document.getElementById('occupyLimitType1').checked=true;
											findTnirdInfo(bookId);
										}
									}
									ele.val(data['map'][key]);
									if(key=='remainAmount'){
										validationAmount();
										continue;
									}
								}
							}
						}
						//去除下拉选为空时颜色变灰的样式
						$("#payInterestPeriod").removeClass("empty");
						$("#productNature").removeClass("empty");
						$("#interestAccruedBasis").removeClass("empty");
						$("#specialPurposeVehicle").removeClass("empty");
					}
				}
			});

		}
		
	});
	

	/**
	* 
	*同业本行投资提前支取第三方授信信息回显
	* @author 陈阳妙
	* @description
	* @return
	* @modified
	*/
	 function findTnirdInfo(bookId) {
		 //第三方授信信息回显
			var h="";
			var n="";
			$.ajax({
				type : "post",
				global : false,
				async : false,
				url : "" + "/cpms/linkus/capital/interbank/bussiness/InterbankIvcntr/findThirdInfo",
				data : {
					"bookId" : bookId
				},
				dataType : "json",
				success : function(data) {
					var datas=data.list;
					var i=0;
						$.each(datas, function(key1, value1) {
							json = datas[i];
							h += '<tr id="table_search">'+
							'<td><center>'+json['num']+'</center></td>'+
							'<td ><center>'+moneyEncoder(json['happenAmount'])+'</center></td>'+
							'<td><center>'+json['paName']+'</enter></td>'+
							'<td><center>'+json['agencyId']+'</center></td>'+
							'</tr>';
							//绑定table数据传给后台
							n=n+json['happenAmount'+i+'']+"/"+json['agencyId'+i+'']+";";
							i=i*1+1;
						});
						 $('#Tbody').html(h);
						 $('#btn_celldata').html(n);
				}
				});
		}	
	 
		/**
		* 
		*同业本行投资卖出卖出面值判断
		* @author 陈阳妙
		* @description
		* @return
		* @modified
		*/
	 $(document).on('keyup change', '#maturityAmount', function() {//改变面值
		 //卖出面值
		 var maturityAmount=getMoneyValue(document.getElementById("maturityAmount").value);
		 //剩余金额
		 var remainAmount=getMoneyValue(document.getElementById("remainAmount").value);
		 if(remainAmount!=""){
			 if(maturityAmount*1>remainAmount*1){
				 doTheAlert("提示","卖出面值不能大于剩余金额！");
			 	$('#maturityAmount').val("");
		 	}
		 }
	 });
	 
	
});


/**
	* 
	*同业本行投资卖出卖出面值判断
	* @author 陈阳妙
	* @description
	* @return
	* @modified
	*/
function  validationAmount() {//改变剩余面值
	//卖出面值
	var maturityAmount=getMoneyValue(document.getElementById("maturityAmount").value);
	//剩余金额
	var remainAmount=getMoneyValue(document.getElementById("remainAmount").value);
 	if(maturityAmount*1>remainAmount*1){
 		doTheAlert("提示","卖出面值不能大于剩余金额！请重新输入！");
 		$('#faceAmount').val("");
 		$('#maturityAmount').val("");
 	}
 	
 }


/**
 * 
 *同业本行投资提前终止第三方授信信息单机选中一行
 * @author 陈阳妙
 * @description
 * @return
 * @modified
 */
function getLine(str){
	var str=str;
	
	if($('#tableB'+str).is(':checked')==true){//判断是否选中
		$('#tableB'+str).prop("checked", false);
	}else{
		$('#tableB'+str).prop("checked", true);
	}
}

/**
 * 
 *同业本行投资提前终止第三方授信信息单机radio选中一行
 * @author 陈阳妙
 * @description
 * @return
 * @modified
 */
function updataLine(str){
	var str=str;
	
	if($('#tableB'+str).is(':checked')==true){//判断是否选中
		$('#tableB'+str).prop("checked", false);
	}else{
		$('#tableB'+str).prop("checked", true);
	}
}

/**
* 判断卖出日期
**改变卖出日期计算利息
* @author 陈阳妙
* @description
* @return
* @modified
*/
$(document).on('blur', '#transDate', function() {
	//卖出日期
	 var transDate=new Date($("#transDate").val());
	//原到期日期
	 var maturityDate=new Date($("#maturityDate").val());
	//原到期日期
	 var startInterDate=new Date($("#startInterDate").val());
	 if(transDate-maturityDate>0){
		 doTheAlert("提示","卖出日期必须小于原到期日期！！");
		 $("#transDate").val($("#startInterDate").val());
		 return;
	 }
	 if(startInterDate-transDate>0){
		 doTheAlert("提示","卖出日期必须大于原起期日期！！");
		 $("#transDate").val($("#startInterDate").val());
		 return;
	 }
	rateInof();
});

/**
* 
*改变卖出面值计算利息
**改变利率计算利息
* @author 陈阳妙
* @description
* @return
* @modified
*/
$(document).on('keyup change', '#maturityAmount,#realRate', function() {//改变面值
	rateInof();
});

function rateInof(){
	//卖出面值
	 var maturityAmount=getMoneyValue(document.getElementById("maturityAmount").value);
	 //利率
	 var realRate=$("#realRate").val();
	 //卖出日期
	 var transDate=new Date($("#transDate").val());
	 //原起息日
	 var startInterDate=new Date($("#startInterDate").val());
	 var days=(transDate-startInterDate)/(24*3600*1000);
	 //利息计提基础
	 $('#interestAccruedBasis').removeAttr("disabled");
	 var interestAccruedBasis=$("#interestAccruedBasis").val();
	 $('#interestAccruedBasis').attr("disabled",true);
	 //利息
	var receAccruedInterest=(parseFloat(maturityAmount*realRate).toFixed(4))/100/interestAccruedBasis*days;
	//利息赋值	
	$("#receAccruedInterest").val(parseFloat(receAccruedInterest).toFixed(2));
	//交易总金额赋值
	var faceAmount=getMoneyValue(maturityAmount*1+receAccruedInterest*1);
	$("#faceAmount").val(parseFloat(faceAmount).toFixed(2)).change();
}

/**
* 
*手动改变交易总金额计算利息
* @author 陈阳妙
* @description
* @return
* @modified
*/
$(document).on('blur', '#faceAmount', function() {//改变交易总金额
	 //卖出面值
	 var maturityAmount=getMoneyValue(document.getElementById("maturityAmount").value);
	//交易总金额
	 var faceAmount=getMoneyValue(document.getElementById("faceAmount").value);
	 //利息
	 if(maturityAmount*1>faceAmount*1){
		 $("#faceAmount").val("0.00");
		 doTheAlert("提示","交易总金额必须大于卖出金额！");
		 $("#faceAmount").val($("#maturityAmount").val());
		 $("#faceAmount").focus();
	
	 }else{
		//利息赋值隐藏域
		 $("#receAccruedInterest").val(faceAmount*1-maturityAmount*1);
	 }
});

/**

* @author 陈阳妙
* @description
* @return
* @modified
*/
$(document).on('blur', '#transDate', function() {//改变面值
	rateInof();
});