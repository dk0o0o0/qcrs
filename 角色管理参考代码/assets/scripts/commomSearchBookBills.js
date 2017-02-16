
/**
 * 点击查询票据按钮，跳转至票据查询页面
 */
function toSearchBill(){
	//查询前需先录入利率  和票据类型
	var reg=/^\d{1,2}(\.\d{1,10})?$/;
	if((reg.test($("#billRate").val()) && $("#billRate").val()!="0.0")||($("#billRate").length==0)){
		if(""==$("#noteType").val()){
		doTheAlert("提示","请选择票据类型！");
	    }else{
	    	var url="/cpms/linkus/capital/bill/bussiness/billPublic/searchBill?busiType=bill_search";
	      //  window.open(url,"{width:60%}");
	         window.open(url);
	        showSearchBill();
	    }
	}else{
		doTheAlert("提示","利率应在（0,100）内！");
		$("#billRate").val("");
		$("#billRate").focus();
	}

}
/**
 * 电票查询页面
 * 
 */
function toSearchEBills(){
	//查询前需先录入利率
//	var reg=/^\d{1,2}(\.\d{1,10})?$/;
//	if((reg.test($("#billRate").val()) && $("#billRate").val()!="0.0")||($("#billRate").length==0)){
//	
	var url="/cpms/linkus/capital/bill/bussiness/billPublic/searchEBills?formName="+$("#formName").val();
	window.open(url);
	showSearchBill();
//	}else{
//		doTheAlert("提示","利率应在（0,100）内！");
//		$("#billRate").val("");
//		$("#billRate").focus();
//	}
}

function controlMatureReadonly(){
	if($("#matureDate").prop("checked")){ //如果到期日的多选框勾选中则，到期日可选择
		$("#matureDate1").prop("readonly",false);
	}else{
		$("#matureDate1").prop("readonly",true);
	}
}
function controlStartReadonly(){
	if($("#startInterDate").prop("checked")){ //如果到期日的多选框勾选中则，到期日可选择
		$("#startInterDate1").prop("readonly",false);
	}else{
		$("#startInterDate1").prop("readonly",true);
	}
}
	
/**
 * 逆回购赎回 查询合同信息
 */
function searchContract(){
	var params="";
	
	//起息日
	if($("#startInterDate").prop("checked")){
		var startInterDate = $("#startInterDate1").val();
		params+="startInterDate="+startInterDate+"&";
	}
	//到期日
	if($("#matureDate").prop("checked")){
		var matureDate=$("#matureDate1").val();
     	params+="matureDate="+matureDate+"&";
	}
	//对手方名称
	var counterpartyName=$("#counterpartyName").val();
	if (null!=counterpartyName && ""!=counterpartyName){
		params+="counterpartyName="+counterpartyName+"&";
		
	}
	
	//首期合同号
	var initialContractNo=$("#initialContractNo1").val();
	if (null!=initialContractNo &&　""!=initialContractNo){
	   params+="initialContractNo="+initialContractNo+"&";
	}
	var busiType=$("#oldBusiType").val();
	if (busiType=="30009"){
		if (busiType!=null&&busiType!=""){
			params+="busiType="+busiType;
		}
	}else{
		params+="busiType="+$("#busiType").val();
	}
	var urls='';
	if(busiType=="30009"){
		urls='/cpms/linkus/capital/bill/bussiness/billPublic/searchContractResult?' +params;
	}else{
		urls='/cpms/linkus/capital/bill/bussiness/billPublic/searchReedenContractResult?' +params;
	}
		

	$.ajax({
		type : "post",
		global : false,
		async : false,
		url :urls,
		dataType : "json",
		success : function(data) {
			if(data.datalist!=null && data.datalist.length>0){
			//取得table的所有表头
			var td = $("#resultTable tr:eq(0) th:eq(0)").parents("tr").children('th');	
			//根据datalist的长度确定有多少行数据
			var innerHTML="";
			var i,j ;

			for (i =0; i < data.datalist.length; i = i + 1) {
				innerHTML+="<tr>";
				for(j=0;j<td.length*1-1;j++){
			    	//取得table表头的id
			    	var temp = td.eq(j).attr("id");
					var textid = temp.substring(3);
					var contractNo=data.datalist[i]["contractNo"];
					
					//从datalist中找到id值匹配的value
				   if(data.datalist[i].hasOwnProperty(textid)){
					 if(data.datalist[i][textid]==null||data.datalist[i][textid]==''){
							 innerHTML+="<td></td>";  
						   }else{
							   innerHTML+="<td>"+data.datalist[i][textid]+"</td>";
					 }
				   	}else{
						innerHTML+="<td></td>";
					}
			    }
				var conditions = "\'"+contractNo+"\',\'"+busiType+"\'";
			    innerHTML+="<td><input type='button' value='选择' onclick=\"findSelectedContract("+conditions+");\" /></td></tr>";
			}
			$("#resultTable tbody tr").remove();
			$("#resultTable tbody").append(innerHTML);
			}
		}
	});
}
/**
 * 点击回购赎回查询合同界面的选择事件
 */
function findSelectedContract(contractNo,oldBusiType){
	//将合同号作为参数传到后台查询出对象
    var params="";
	params+="contractNo="+contractNo+"&busiType="+oldBusiType;
	if (oldBusiType == "30009") {
		url = "/cpms/linkus/capital/bill/bussiness/t30032Bill/checkSearchBills?"+params;
	} else if (oldBusiType == "30010") {
		url = "/cpms/linkus/capital/bill/bussiness/t30011Bill/checkSearchBills?"+params;
	} else if (oldBusiType == "30006") {
		url = "/cpms/linkus/capital/bill/bussiness/t30033Bill/checkSearchBills?"+params;
	}
	
	var $form = $("#contractSearch");
	$form.attr("action",url);
	var option = {
		type : "post",
		dataType : "json",
		async : false,
		success : function(data) {
			if (data!=null&&data.tip!=null&&data.tip!=""){
				doTheAlert("提示",data.tip);
			}else{
				var url = "";
				if (oldBusiType == "30009") {
					url = "/cpms/linkus/capital/bill/bussiness/t30032Bill/findBillsToRedeem";
				} else if (oldBusiType == "30010") {
					url = "/cpms/linkus/capital/bill/bussiness/t30011Bill/findBillsToRedeem";
				} else if (oldBusiType == "30006") {
					url = "/cpms/linkus/capital/bill/bussiness/t30033Bill/findBillsToRedeem";
				}
				var $form = $("#test1111");
				$form.attr("action", url + "?" + params);
				$form.submit();
			}
		},
		error : function() {
			doTheAlert("提示", "查询操作失败");
		}
	};
	$("#contractSearch").ajaxSubmit(option);
}
function showSearchBill(){
	showTheEditVal_flag = false;
			showTheEditVal();
}
//打开查询票据页面时实时检查    页面加载完成时结束检查    给date赋disabled
	var showTheEditVal_flag;
	function showTheEditVal(){
			if(showTheEditVal_flag) return;
			//方法部分
			if($('#successFlag').length){
				//结束递归
				showTheEditVal_flag = true;
				console.log("结束递归");
				$("#firstBuyDate1").attr("disabled",true);
				$("#firstBuyDate2").attr("disabled",true);
				$("#makerDate1").attr("disabled",true);
				$("#makerDate2").attr("disabled",true);
				$("#matureDate1").attr("disabled",true);
				$("#matureDate2").attr("disabled",true);
				$("#utype").attr("disabled",true);
				$("#bstatus").attr("disabled",true);
				  
			}
			//递归
		setTimeout(showTheEditVal,100);
	}
/**
 * 选中/不选中 筛选条件前的 checkbox 就让筛选条件可用/不可用
*/
function checkboxClick(){
	$("input[name='checkbox']").each(function() {
		//点击选中，则1.获取checkbox id，移除所有class.has(该 id)的 readonly=true 
			if ($(this).prop("checked")) {
				var id=$(this).attr("id");
				if($("#"+id).hasClass("select")){
					$("select[class='"+id+"']").each(function(){
					$(this).removeAttr("disabled");
				});
				}else{
				$("input."+id).each(function(){
					$(this).removeAttr("disabled");
				});
				}
		}else{//取消选中，筛选控件不可用
			var id=$(this).attr("id");
			if($("#"+id).hasClass("select")){
					$("select[class='"+id+"']").each(function(){
					$(this).attr("disabled",true);
				});
				}else{
				$("input."+id).each(function(){
					$(this).attr("disabled",true);
				});
				}
		}});
}

/**
 * 验证查询条件中的出票日和到期日
 */
function verifyFormerDateCondition(){
	var firstBuyDate1 =$("#firstBuyDate1").val();
	var firstBuyDate2=$("#firstBuyDate2").val();
	var matureDate1 = $("#matureDate1").val();
    var matureDate2 = $("#matureDate2").val();
    var makerDate1 = $("#makerDate1").val();
    var makerDate2 = $("#makerDate2").val();
     if(firstBuyDate2<firstBuyDate1){
    	doTheAlert("提示","买入日前者不能比后者大！");
		$("#firstBuyDate1").val($("#startInterDate").val());
		$("#firstBuyDate2").val($("#startInterDate").val());
    	return;
    }
    if(matureDate2<matureDate1){
    	doTheAlert("提示","买入日前者不能比后者大！");
		$("#matureDate1").val($("#startInterDate").val());
		$("#matureDate2").val($("#startInterDate").val());
    	return;
    }
	
    if(makerDate2<makerDate1){
    	doTheAlert("提示","买入日前者不能比后者大！");
		$("#makerDate1").val($("#startInterDate").val());
		$("#makerDate2").val($("#startInterDate").val());
    	return;
    }
}
function verifyLaterDateCondition(){
	var firstBuyDate1 =$("#firstBuyDate1").val();
	var firstBuyDate2=$("#firstBuyDate2").val();
	var matureDate1 = $("#matureDate1").val();
    var matureDate2 = $("#matureDate2").val();
    var makerDate1 = $("#makerDate1").val();
    var makerDate2 = $("#makerDate2").val();
     if(firstBuyDate2<firstBuyDate1){
    	doTheAlert("提示","买入日后者不能比前者小！");
		$("#firstBuyDate1").val($("#startInterDate").val());
		$("#firstBuyDate2").val($("#startInterDate").val());
    	return;
    }
    if(matureDate2<matureDate1){
    	doTheAlert("提示","到期日后者不能比前者小！");
		$("#matureDate1").val($("#startInterDate").val());
		$("#matureDate2").val($("#startInterDate").val());
    	return;
    }
	
    if(makerDate2<makerDate1){
    	doTheAlert("提示","出票日后者不能比前者小！");
		$("#makerDate1").val($("#startInterDate").val());
		$("#makerDate2").val($("#startInterDate").val());
    	return;
    }
}
/**
 * 校验金额
 */
function verifyFaceAmountCondition(){
	var flag =true;
	var faceAmount1=$("#faceAmount1").val();
	var faceAmount2=$("#faceAmount2").val();
	if(""==faceAmount1 && ""!=faceAmount2){
		doTheAlert("提示","请输入完整的金额范围！");
		flag =false ;
	}else if(""==faceAmount2 && ""!=faceAmount1){
		doTheAlert("提示","请输入完整的金额范围！");
		flag =false ;
	}else{
	if(""!=faceAmount1 && ""!=faceAmount2 ){
		if(faceAmount1*1-faceAmount2*1>0){
			doTheAlert("提示","金额范围必须从小到大！");
			flag =false ;
		}
	}
	}
  return flag;
	
}

// -----------------------------全选/全不选事件
function checkAllbox(evt) {
	var flag=false;
	//判断查询结果是否全选中
	$("#resultTable input[name='checkname']").each(function(){
	    if($(this).is(':checked')){
	    	//如果都选中，标记默认，令全选时取消选中所有数据
	    }else{
	    	//如果有没选中的，做标记，令全选时选中所有数据
	    	flag=true;
	    	return false;
	    }
	});
	if(flag){
	$("#resultTable input[name='checkname']").prop("checked", true);
	}else{
	$("#resultTable input[name='checkname']").prop("checked", false);	
	}
}

function searchResult(goflag){
	//1.获取所有筛选条件
	if(verifyFaceAmountCondition()){
	var params="";
	if($("#firstBuyDate").is(':checked')){
		var firstBuyDate1=$("#firstBuyDate1").val();
     	var firstBuyDate2=$("#firstBuyDate2").val();
     	params+="entedt_0="+firstBuyDate1+"&";
     	params+="entedt_1="+firstBuyDate2+"&";
	}
	if($("#makerDate").is(':checked')){
		var makerDate1 =$("#makerDate1").val();
	    var makerDate2 =$("#makerDate2").val();
	    params+="stdate_0="+makerDate1+"&";
     	params+="stdate_1="+makerDate2+"&";
	}
	if($("#matureDate").is(':checked')){
		var matureDate1=$("#matureDate1").val();
     	var matureDate2=$("#matureDate2").val();
     	   params+="endate_0="+matureDate1+"&";
     	params+="endate_1="+matureDate2+"&";
	}
	if($("#unitType").is(':checked')){
		var utype=$("#utype").val();
		params+="unitType="+utype+"&";
	}
	if($("#billStatus").is(':checked')){
		var bstatus=$("#bstatus").val();
		params+="assetsType="+bstatus+"&";
	}
	var faceAmount1=getMoneyValue($("#faceAmount1").val());
	params+="amount_0="+faceAmount1+"&";
	var faceAmount2=getMoneyValue($("#faceAmount2").val());
	params+="amount_1="+faceAmount2+"&";
	var billNo=$("#bNo").val();
	params+="billNo="+billNo+"&";
	if($("#noteType").length>0){
        var noteType=$("#noteType option:selected").val();
    	params+="noteType="+noteType+"&";
    }
	var contractNo=$("#cntrNo").val();
	params+="contractNo="+contractNo+"&";
	if($("#collectFlag").is(':checked')){
		var collectFlag="true";
		params+="collectFlag="+collectFlag+"&";
	}
	//获取已经挑选的票据号码作为参数 传至后台
	params+="bills="+getBillDetailBillNO("billNo")+"&";
	var billType=$("#billType").val();
	params+="billType="+billType+"&";
	params=params.substring(0,params.lastIndexOf("&"));
	if(goflag=="first"){
		params=params+"&pageNo=1";
	}else if(goflag=="up"){
		var pageNo=parseInt($('#id_pageNo').val())-1;
		params=params+"&pageNo="+pageNo;
	}else if(goflag=="down"){
		var pageNo=parseInt($('#id_pageNo').val())+1;
		params=params+"&pageNo="+pageNo;
	}else if(goflag=="end"){
		var pageNo=parseInt($('#id_totalPages').val())
		params=params+"&pageNo="+pageNo;
	}else if(goflag=="any"){
		var pageNo=parseInt($('#id_pageNo').val());
		params=params+"&pageNo="+pageNo;
	}
	params=params+"&recordCount="+$('#id_recordCount').val();
	//params=params+"&pageSize="+parseInt($('#id_pageSize').val());
	//params=params+"&totalPages="+parseInt($('#id_totalPages').val());
	  
	$.ajax({
		type : "post",
		global : false,
		async : false,
		url : '/cpms/linkus/capital/bill/bussiness/billPublic/findBillsByParams?'+params,
		dataType : "json",
		success : function(data) {
			if (data != null) {
				if(data.pageInfo!=null){
					$('#id_pageNo').val(data.pageInfo.pageNo);
					$('#id_pageSize').val(data.pageInfo.pageSize);
					$('#id_totalPages').val(data.pageInfo.totalPages);
					$('#id_recordCount').val(data.pageInfo.recordCount);
				}
				//根据表头的id顺序，循环从notelist、booklist中查到和id同名的属性值。
				    //首先从notelist中查找，如果找到则取值，循环下一个Id,如果notelist 中没有找到则再从booklist中查找(前提条件是表中的数据在note/book表中都有)
			//取得table的所有表头
			var td = $("#resultTable tr:eq(0) th:eq(0)").parents("tr").children('th');	
			//根据notelist的长度确定有多少行数据
			var innerHTML="";
			var i,j;
			if(data.notelist!=null && data.notelist.length>0){
			for (i =0; i < data.notelist.length; i = i + 1) {
				innerHTML+="<tr><td><input type='checkbox' name='checkname' id='checkname' />"+(i*1+1)+"</td>";
				//从第3列开始循环
			    for (j = 1; j < td.length; j = j + 1) {
			    	//取得table表头的id
			    	var temp = td.eq(j).attr("id");
					var textid = temp.substring(3);
					//从notelist 、booklist 中找到id值匹配的value
				   if(data.notelist[i].hasOwnProperty(textid)){
					   if (data.notelist[i][textid]==null||data.notelist[i][textid]==''){
							 innerHTML+="<td></td>";  
					   }else{
							  if(textid.toLowerCase().indexOf('amount')>=0){
								   var v =parseFloat(data.notelist[i][textid]).toFixed(2);
								   innerHTML+="<td>"+v+"</td>";
							  }else{
								   innerHTML+="<td>"+data.notelist[i][textid]+"</td>";
							  }
					   }
					}else if(textid=='regionAddDay'){
						if(data.notelist[i]['region']=='同城'){
							 innerHTML+="<td>0</td>";
						}
						if(data.notelist[i]['region']=='异地'){
							 innerHTML+="<td>3</td>";
						}
				   	   	    
				   	}else{
						innerHTML+="<td></td>";
					}
			    }
			    
			    innerHTML+="</tr>";
			}}
			$("#resultTable tbody tr").remove();
			$("#resultTable tbody").append(innerHTML);
			}
		}
	});
	}
}


function pageControl(goflag){
	var params="";
	if(goflag=="first"){
		params=params+"&pageNo=1";
	}else if(goflag=="up"){
		var pageNo=parseInt($('#id_pageNo').val())-1;
		params=params+"&pageNo="+pageNo;
	}else if(goflag=="down"){
		var pageNo=parseInt($('#id_pageNo').val())+1;
		params=params+"&pageNo="+pageNo;
	}else if(goflag=="end"){
		var pageNo=parseInt($('#id_totalPages').val())
		params=params+"&pageNo="+pageNo;
	}else if(goflag=="any"){
		var pageNo=parseInt($('#id_pageNo').val());
		params=params+"&pageNo="+pageNo;
	}
	params=params+"&recordCount="+$('#id_recordCount').val();
	return params;
}
function searchEbillsResult(goflag){
	var params='';
	var faceAmount1=getMoneyValue($("#faceAmount1").val());
	if(faceAmount1!=''){
		if(faceAmount2!=''){
		params+="amount_0="+faceAmount1+"&";
       	var faceAmount2=getMoneyValue($("#faceAmount2").val());
       	params+="amount_1="+faceAmount2+"&";
		}
	}

	if($("#matureDate").is(':checked')){
		var matureDate1=$("#matureDate1").val();
     	var matureDate2=$("#matureDate2").val();
     	   params+="endate_0="+matureDate1+"&";
     	params+="endate_1="+matureDate2+"&";
	}
	if($("#unitType").is(':checked')){
		var ecdsClearType=$("#secdsClearType").val();
		params+="ecdsClearType="+ecdsClearType+"&";
	}
	if($("#billStatus").is(':checked')){
		var ecdsConveyType=$("#secdsConveyType").val();
		params+="ecdsConveyType="+ecdsConveyType+"&";
	}
	
	
	var billNo=$("#bNo").val();
	params+="billNo="+billNo+"&";
	
	var aoAccnInfId=$("#aoAccnInfId").val();
	params+="aoAccnInfId="+aoAccnInfId+"&";
	
	var noteType=$("#noteType option:selected").val();
	params+="noteType="+noteType+"&";
	
	var counterpartyName=$("#scounterpartyName").val();
	params+="counterpartyName="+counterpartyName+"&";
	
	var ebllBillRate=$("#ebllBillRate").val();
	params+="ebllBillRate="+ebllBillRate+"&";
	//获取已经删选过的票据号码
	params+="tranNumbers="+getBillDetailBillNO("transNumber")+"&";
	//查询出 对应利率的，业务类型
	//params+="billRate="+$("#billRate").val()*1/100+"&"; //带%,传到后台要除100
	params+="busiType="+$("#busiType").val()+"&";
	if($("#custManagerId").length>0){
		//将客户经理Id带到后台查询出对应的客户经理收益比例返回
		if($("#custManagerId").val()!=""){
			params+="custManagerId="+$("#custManagerId").val()+"";
		}else{
			params+="custManagerId=";
		}
	}
	
	params=params+pageControl(goflag);
	$.ajax({
		type : "post",
		global : false,
		async : false,
		url : '/cpms/linkus/capital/bill/bussiness/billPublic/findEBillsByParams?'+params,
		dataType : "json",
		success : function(data) {
			if (data != null) {
				if(data.mgalpr!=""){
					$("#mgalpr").val(data.mgalpr);
				}
				if(data.pageInfo!=null){
					$('#id_pageNo').val(data.pageInfo.pageNo);
					$('#id_pageSize').val(data.pageInfo.pageSize);
					$('#id_totalPages').val(data.pageInfo.totalPages);
					$('#id_recordCount').val(data.pageInfo.recordCount);
				}
				//根据表头的id顺序，循环从notelist、booklist中查到和id同名的属性值。
				    //首先从notelist中查找，如果找到则取值，循环下一个Id,如果notelist 中没有找到则再从booklist中查找(前提条件是表中的数据在note/book表中都有)
			//取得table的所有表头
			var td = $("#resultTable tr:eq(0) th:eq(0)").parents("tr").children('th');	
			//根据notelist的长度确定有多少行数据
			var innerHTML="";
			var i,j;
			var billRate=$("#billRate").val();
			if(data.datalist!=null && data.datalist.length>0){
			for (i =0; i < data.datalist.length; i = i + 1) {
				innerHTML+="<tr><td><input type='checkbox' name='checkname' id='checkname' />"+(i*1+1)+"</td>";
				//从第3列开始循环
			    for (j = 1; j < td.length; j = j + 1) {
			    	//取得table表头的id
			    	var temp = td.eq(j).attr("id");
					var textid = temp.substring(3).toLowerCase(); //将表头的大小写字段转小写去匹配从数据库查询出来的小写字段
					//从datalist中找到id值匹配的value
				   if(data.datalist[i].hasOwnProperty(textid)){
				   	  if(textid=='billrate' ||  textid=='redeemrate'){	   
				   	  	var rate =data.datalist[i][textid]*100;
						innerHTML+="<td>"+rate.toFixed(4)+"</td>";
					  }else if(textid=='notetype'){
					  	if(data.datalist[i][textid]=='1007001'){
					  		 innerHTML+="<td>银行承兑汇票</td>";
					  	}
					  	if(data.datalist[i][textid]=='1007002'){
					  		 innerHTML+="<td>商业承兑汇票</td>";
					  	}
					  }else{
					   if (data.datalist[i][textid]==null||data.datalist[i][textid]==''){
							 innerHTML+="<td></td>";  
						   }else{
						   
							  if(textid.toLowerCase().indexOf('amount')>=0){
								   var v =parseFloat(data.datalist[i][textid]).toFixed(2);
								   innerHTML+="<td>"+v+"</td>";
							  }else{
								   innerHTML+="<td>"+data.datalist[i][textid]+"</td>";
							  }
						   }
					  }
					  
					}else if(temp=='regionAddDay'){
						if(data.datalist[i]['region']=='同城' || data.datalist[i]['region']==''){
							 innerHTML+="<td>0</td>";
						}
						if(data.datalist[i]['region']=='异地'){
							 innerHTML+="<td>3</td>";
						}
				   	   	    
				   	}else{
						innerHTML+="<td></td>";
					}
			    }
			    
			    innerHTML+="</tr>";
			}}
			$("#resultTable tbody tr").remove();
			$("#resultTable tbody").append(innerHTML);
			}
		}
	});
}
//-----将需要的明细字段拼接成字符串作为参数传至后台
function getBillDetailBillNO(tableColumnName){
	var billNoParam="";
	$("table input[class='"+tableColumnName+"']").each(function() {
		billNoParam=billNoParam+"'"+$(this).val()+"',";
	});
	billNoParam=billNoParam.substring(0,billNoParam.lastIndexOf(","));
    return billNoParam;
	}
	
	

//-----------------------电票删选票据计算类 公共方法--------------------
function ebillsCaculate(tableName,formName){
	if (!judgeBillData()){
		return;
	}
	var bool = addNoteToTable(tableName);
	if(bool){
		var busiType = $("#busiType").val();
		if (busiType=="30001"){
			caculateTableDatas(tableName,formName);
			//statisticAccounting(tableName,formName);
			count();
		}else{
			count();
		}
	}
	closePage();
	
}
var ecdsClearTypes="";//清算方式
var ecdsConveyTypes="";//转让方式
var transTypes="";//交易方式
var counterpartyBankNos="";//背书人开户行行号
var repoDates="";//赎回开放日
var redeemEndDates="";//赎回截止日
var redeemRates="";//赎回利率

//-----------------------添加电票判断票据明细数据
function  judgeBillData(){
	 //每次加载前清空数据
	ecdsClearTypes="";//清算方式
	 ecdsConveyTypes="";//转让方式
     transTypes="";//交易方式
	 counterpartyBankNos="";//背书人开户行行号
	 repoDates="";//赎回开放日
	 redeemEndDates="";//赎回截止日
	 redeemRates="";//赎回利率
	var noteTypes="";
	var ind="";
	var billRates="" ;//利率
	var busiType=$("#busiType").val();//交易
	var flag=true;
	$("#resultTable input[name='checkname']").each(function(){
	    if($(this).is(':checked')){
	    	//获取checkbox所在行行号
	    	var trNo=$(this).parents("tr").index();
	    	
	    	if (!judgeItems(trNo)){
	    		flag=false;
	    		return flag;
	    	}
	    	//获取第一行数据的清算方式
	    	if (ecdsClearTypes==""){
	    		//票据类型
	    		ind = $("#resultTable th[id=tb_noteType]").index();
	    		noteTypes= $("#resultTable tbody tr:eq("+trNo+") td:eq("+ind+")").text();
	    		//获取清算方式
	    		ind = $("#resultTable th[id=tb_ecdsClearType]").index();
	    		ecdsClearTypes= $("#resultTable tbody tr:eq("+trNo+") td:eq("+ind+")").text();
	    		//获取第一个转让方式
	    		ind=$("#resultTable th[id=tb_ecdsConveyType]").index();
	    		ecdsConveyTypes=$("#resultTable tbody tr:eq("+trNo+") td:eq("+ind+")").text();
	    		//获取第一个利率
	    		ind=$("#resultTable th[id=tb_billRate]").index();
	    		billRates=$("#resultTable tbody tr:eq("+trNo+") td:eq("+ind+")").text();
	    		//获取第一个交易方式
	    		ind=$("#resultTable th[id=tb_transType]").index();
	    		transTypes=$("#resultTable tbody tr:eq("+trNo+") td:eq("+ind+")").text();
	    		
	    		if ($("#busiType").val()=="30001"){
	    			ind=$("#resultTable th[id=tb_aoAccnInfId]").index();
	    			counterpartyBankNos=$("#resultTable tbody tr:eq("+trNo+") td:eq("+ind+")").text();
	    		}else{
	    			//获取第一个对手方开户行号
	    			ind=$("#resultTable th[id=tb_counterpartyBankNo]").index();
	    			counterpartyBankNos=$("#resultTable tbody tr:eq("+trNo+") td:eq("+ind+")").text();
	    		}
	    		//赎回利率
	    		ind=$("#resultTable th[id=tb_redeemRate]").index();
	    		redeemRates=$("#resultTable tbody tr:eq("+trNo+") td:eq("+ind+")").text();
	    		//赎回开放日
	    		ind=$("#resultTable th[id=tb_repoDate]").index();
	    		repoDates=$("#resultTable tbody tr:eq("+trNo+") td:eq("+ind+")").text();
	    		//赎回截止日
	    		ind=$("#resultTable th[id=tb_redeemEndDate]").index();
	    		redeemEndDates=$("#resultTable tbody tr:eq("+trNo+") td:eq("+ind+")").text();
	    		
	    		
	    	
	    	}else{
	    		ind = $("#resultTable th[id=tb_noteType]").index();
	    		var noteType2=$("#resultTable tbody tr:eq("+trNo+") td:eq("+ind+")").text();
	    		if(noteType2!=noteTypes){
	    			doTheAlert('提示',"处理多笔票时票据类型必须一样！");
	    			flag=false;
	    			return flag;
	    		}
	    		ind = $("#resultTable th[id=tb_ecdsClearType]").index();
	    		var ecdsClearType2=$("#resultTable tbody tr:eq("+trNo+") td:eq("+ind+")").text();
	    		if(ecdsClearType2!=ecdsClearTypes){
	    			doTheAlert('提示',"处理多笔票时清算方式必须一样！");
	    			flag=false;
	    			return flag;
	    		}
	    		ind = $("#resultTable th[id=tb_ecdsConveyType]").index();
	    		var ecdsConveyType2=$("#resultTable tbody tr:eq("+trNo+") td:eq("+ind+")").text();
	    		if(ecdsConveyType2!=ecdsConveyTypes){
	    			doTheAlert('提示',"处理多笔票时转让方式必须一样！");
	    			flag=false;
	    			return flag;
	    		}
	    		ind = $("#resultTable th[id=tb_billRate]").index();
	    		var billRate2=$("#resultTable tbody tr:eq("+trNo+") td:eq("+ind+")").text();
	    		if(billRate2!=billRates && busiType!="30001"){
	    			doTheAlert('提示',"处理多笔票时利率必须一样！");
	    			flag=false;
	    			return flag;
	    		}
	    		ind = $("#resultTable th[id=tb_transType]").index();
	    		var transType2=$("#resultTable tbody tr:eq("+trNo+") td:eq("+ind+")").text();
	    		if(transType2!=transTypes){
	    			doTheAlert('提示',"处理多笔票时交易形式必须一样！");
	    			flag=false;
	    			return false;
	    		}
	    		if ($("#busiType").val()=="30001"){
	    			ind=$("#resultTable th[id=tb_aoAccnInfId]").index();
	    			var counterpartyBankNos2=$("#resultTable tbody tr:eq("+trNo+") td:eq("+ind+")").text();
	    			if(counterpartyBankNos2!=counterpartyBankNos){
	    				doTheAlert('提示',"处理多笔票时贴现账号必须一样！");
	    				flag=false;
	    				return false;
	    			}	
	    		}else{
	    			ind = $("#resultTable th[id=tb_counterpartyBankNo]").index();
	    			var counterpartyBankNos2=$("#resultTable tbody tr:eq("+trNo+") td:eq("+ind+")").text();
	    			if(counterpartyBankNos2!=counterpartyBankNos){
	    				doTheAlert('提示',"处理多笔票时背书人必须一样！");
	    				flag=false;
	    				return false;
	    			}	
	    		}
	    		
	    		//赎回开放日
	    		ind=$("#resultTable th[id=tb_repoDate]").index();
	    	    var repoDates2=$("#resultTable tbody tr:eq("+trNo+") td:eq("+ind+")").text();
	    	    if(repoDates2!=repoDates && busiType=="30009"){
	    			doTheAlert('提示',"处理多笔票时赎回开放日必须一样！");
	    			flag=false;
	    			return false;
	    		}
	    	    //赎回截止日
	    		ind=$("#resultTable th[id=tb_redeemEndDate]").index();
	    		var redeemEndDates2=$("#resultTable tbody tr:eq("+trNo+") td:eq("+ind+")").text();
	    		if(redeemEndDates2!=redeemEndDates && busiType=="30009"){
		    		doTheAlert('提示',"处理多笔票时赎回截止日必须一样！");
		    		flag=false;
		    		return false;
		    	}
	    		//赎回利率
	    		ind=$("#resultTable th[id=tb_redeemRate]").index();
	    		var redeemRates2=$("#resultTable tbody tr:eq("+trNo+") td:eq("+ind+")").text();
	    		if(redeemRates2!=redeemRates && busiType=="30009"){
		    		doTheAlert('提示',"处理多笔票时赎回利率必须一样！");
		    		flag=false;
		    		return false;
		    	}
	    		
	    	}
		 }
	});
	return flag;
}

//-------电票勾选多笔明细判断
function judgeItems(trNo){
	var flag=true;
	var selectorName = 'billCntr.items[0].billNote.billNo';
	var val = $("#table [name='"+selectorName+"']");
	var billNoItem=$(val)[0].value;
	var busiType=$("#busiType").val();
    if (null==billNoItem || billNoItem==""){
    	return true;
    }
	//已有利率
	var selectorName = 'billCntr.items[0].billRate';
	var val = $("#table [name='"+selectorName+"']");
	var billRateItem=$(val)[0].value;
	//已有转让方式
	var ecdsConveyTypeItem=$("#ecdsConveyType").val();
	 //已有清算方式
	var ecdsClearTypeItem=$("#ecdsClearType").val();
	//交易对手开户行号
	var counterpartyBankNosItem=$("#scounterpartyOpBkNo").val();
	//赎回开放日
	var repoDateItem=$("#redeemOpenDate").val();
	//赎回截止日
	var redeemEndDateItem=$("#maturityDate").val();
	//赎回利率
	var redeemRateItem=$("#redeemRate").val();
	ind = $("#resultTable th[id=tb_ecdsClearType]").index();
	var ecdsClearType2=$("#resultTable tbody tr:eq("+trNo+") td:eq("+ind+")").text();
	if(ecdsClearType2!=ecdsClearTypeItem){
		doTheAlert('提示',"勾选票据明细与已有票据中清算方式必须一样！");
		flag=false;
		return flag;
	}

	ind = $("#resultTable th[id=tb_ecdsConveyType]").index();
	var ecdsConveyType2=$("#resultTable tbody tr:eq("+trNo+") td:eq("+ind+")").text();
	if(ecdsConveyType2!=ecdsConveyTypeItem){
		doTheAlert('提示',"勾选票据明细与已有票据中转让方式必须一样！");
		flag=false;
		return flag;
	}
	
	
	ind = $("#resultTable th[id=tb_billRate]").index();
	var billRate2=$("#resultTable tbody tr:eq("+trNo+") td:eq("+ind+")").text();
	if(billRate2!=billRateItem && busiType!="30001"){
		doTheAlert('提示',"勾选票据明细与已有票据中利率必须一样！");
		flag=false;
		return flag;
	}
	
	if ($("#busiType").val()=="30001"){
		ind=$("#resultTable th[id=tb_aoAccnInfId]").index();
		var counterpartyBankNosItem2=$("#resultTable tbody tr:eq("+trNo+") td:eq("+ind+")").text();
		if(counterpartyBankNosItem2!=counterpartyBankNosItem){
			doTheAlert('提示',"勾选票据明细与已有贴现单位信息必须一样！");
			flag=false;
			return false;
		}	
	}else{
		ind = $("#resultTable th[id=tb_counterpartyBankNo]").index();
		var counterpartyBankNosItem2=$("#resultTable tbody tr:eq("+trNo+") td:eq("+ind+")").text();
		if(counterpartyBankNosItem2!=counterpartyBankNosItem){
			doTheAlert('提示',"勾选票据明细与已有票据中背书人必须一样！");
			flag=false;
			return false;
		}	
	}
	
	//赎回开放日
	ind=$("#resultTable th[id=tb_repoDate]").index();
    var repoDates2=$("#resultTable tbody tr:eq("+trNo+") td:eq("+ind+")").text();
    if(repoDates2!=repoDateItem && busiType=="30009"){
		doTheAlert('提示',"勾选票据明细与已有票据中赎回开放日必须一样！");
		flag=false;
		return false;
	}
    //赎回截止日
	ind=$("#resultTable th[id=tb_redeemEndDate]").index();
	var redeemEndDates2=$("#resultTable tbody tr:eq("+trNo+") td:eq("+ind+")").text();
	if(redeemEndDates2!=redeemEndDateItem && busiType=="30009"){
		doTheAlert('提示',"勾选票据明细与已有票据中赎回截止日必须一样！");
		flag=false;
		return false;
	}
	//赎回利率
	ind=$("#resultTable th[id=tb_redeemRate]").index();
	var redeemRates2=$("#resultTable tbody tr:eq("+trNo+") td:eq("+ind+")").text();
	if(redeemRates2!=redeemRateItem && busiType=="30009"){
		doTheAlert('提示',"勾选票据明细与已有票据中赎回利率必须一样！");
		flag=false;
		return false;
	}
  return flag;
}

