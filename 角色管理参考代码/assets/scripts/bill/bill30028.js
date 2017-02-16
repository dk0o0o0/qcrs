var busiType=$("#busiType").val();
//票据导入
$(document).ready(function() {
	$(document).on('click','#btn_import',function() {
	
	    //每次导入前清空文件名称方可导入
		$("#fileUpload").val("");
		//导入数据
		$("#fileUpload").click();
	});
$(document).on('change', 'input[name="upload"]', function() {
	//起息日
	var startDate=$("#startInterDate").val();
	//明细张数
	var itemSum=$("#itemSum").val();
	//合同金额
    var Amount=parseFloat(getMoneyValue($("#faceAmount").val()));
    var noteType=$("#noteType option:selected").text();
    /***
     * ajax传递Excel数据
     * data中放置map1,map1存每条数据key为数据编号，value为map2
     * map2放置每行数据的明细，key为列字段，value储存值
     */
	$.ajaxFileUpload({
		url : "../bussiness/billPublic/importData?busiType="+ busiType,
		type : "post",
		global : false,
		secureuri : false,
		fileElementId : 'fileUpload',
		dataType : 'json',
		success : function(data) {
			if (data.tip!=null){
				var map=data["tip"];
				doTheAlert('提示',map.tip);
				return;
			}
			var innerHTML = "";
			//获取表头，用于获取字段
			var td = $("#table tr:eq(0) th:eq(0)").parents("tr").children();
			var rowNum = document.getElementById("table").rows.length * 1 - 2;
			var ifbreak="";
			$.each(data, function(key1, value1) {
				if (ifbreak=="false") {return false;}
				//获取每行数据
				var map = data[key1];
				//第二行数据开始自动新增行
				if (rowNum>0)
			      $("#table tbody tr").eq(rowNum-1).children("[class='manipulate']").children().eq(0).click();
				//获取已传进票据张数
				itemSum++;
				//获取被导入数据行，导入按照单列数据中每列导入
				var $dest = $("#table tbody tr").eq(rowNum).children();
				for (var i = 1; i < td.length-2; i = i + 1) {
					//获取表头字段ID
					var temp = td.eq(i).attr("id");
					//获取字段名称，表头ID=tb_+字段，故此处截掉前三位
					var textid = temp.substring(3);
					var flag = true;
					//导入数据设置只读
					$dest.eq(i).children("input").attr("readonly","readonly");
					if (noteType!=map["noteType"]){
						doTheAlert('提示',"明细中票据类型与合同中不一致,请确认模板数据！");
						$("#table tbody tr").eq(rowNum).children("[class='manipulate']").children().eq(1).click();
						ifbreak="false";
						return false;
					}
					$.each(map, function(key, value) {
						if (key == textid) {
							//如果是面值，计算总金额
							if (textid.toLowerCase().indexOf('amount')>=0){
								Amount=Amount+parseFloat(getMoneyValue(value));
							}
							//设置编号
							if (textid=="xh"){//如果是序号
							    $dest.eq(i).text(parseInt(rowNum)+1);	
							}else{
								//被导入的单位数据传值
								if(textid.toLowerCase().indexOf('amount')>=0){
									var v = parseFloat(value).toFixed(2);
									$dest.eq(i).children("input").val(v);
									$dest.eq(i).children("input").change();
								}else{
									$dest.eq(i).children("input").val(value);
									$dest.eq(i).children("input").change();
								}
							}
						}
						});
				}
				//计算已经导入数据量
				rowNum=rowNum+1;
			});
			if (ifbreak=="false") {return false;}
			$("#itemSum").val(itemSum);
			//总面值
			$("#faceAmount").val(Amount.toFixed(2));
			toAddNoteTypeOrNotDisabled();
			//计算每笔票据实付金额，利息、成交金额、期限、顺延天数等
		}
	});
});
});


//计算总金额等
function count(){
	if(verifyTheFirstTrData()){
		if(verifyCountCondition()){
	var $info = $("#table tbody tr");

	// len和i为目标已有数据的行数
	var i = $info.length;
	var j=0;

	var faceAmountSum=0;
	var lxhj=0;
	if (i>0){
	for (var j=0;j<i;j++){
		
		//第I行票面金额
		var selectorName = 'billCntr.items['+ j +'].billNote.faceAmount';
		var val = $("#bill_cntr30028 [name='"+selectorName+"']");
		var faceAmount=parseFloat(getMoneyValue($(val)[0].value));
		if (i==1){
			if($(val)[0].value==""){
				break;
			}
		}
		faceAmountSum=faceAmountSum+faceAmount;
		
	}
	}
	
	$("#faceAmount").val(faceAmountSum.toFixed(2));
	//总票据张数金额显示界面
	$("#itemSum").val(i);
		}
	}
	
	
}
//保存编辑数据
function saveDetail(){
	//编辑页
	var formName = "bill30028_edit";
	var checkFlag=pubCheck(formName);
	if(!checkFlag){
		return ;
	}
	if(!validateMaturityDate($("#detail_matureDate").val(),$("#detail_makerDate").val())){
		doTheAlert("提示","到期日必须大于出票日！");
		return;
	   }
	//被修改明细保存
	newCreateOrUpdate(formName, $("#busiType").val());
	//关闭页面
	closePage();
	count();
}
$(document).on('click','#do30028Save',
		function (){
		/***
		 * 各明细验证
		 */
	//验证页面上是否有重复的票号
    if(!judgeRepeatedBillNo()){
    	return ;
    }
    /***\
	 * 判断是否在登记薄中
	 */
	if (!billsInBook()){
		return;
	}
	var formName=$("#formName").val();
    if(!pubCheck(formName)){
	     return;
    }
	var billRate=parseFloat($("#interestRate").val());
	if (billRate==null||billRate==0){
		doTheAlert('提示',"请输入手续费率！");
		$("#interestRate").focus();
		return false;
	}
	
	if ($("#counterpartyNo").val()==null||$("#counterpartyName").val()==null||$("#counterpartyName").val()==""){
		doTheAlert('提示',"请选择对手方！");
		return false;
	}
	
	   //判断票据明细有没有
	if(!verifyTheFirstTrData()){
		doTheAlert('提示',"票据明细不能为空！");
		return;
	}
		
	if(!verifyNoteType()){
		return;
	}
	
	pubRGSave();
	
	});
$(document).on('click','#MD_pass',
		function (){
	//验证页面上是否有重复的票号
    if(!judgeRepeatedBillNo()){
    	return ;
    }
    /***\
	 * 判断是否在登记薄中
	 */
	if (!billsInBook()){
		return;
	}
	    var formName=$("#formName").val();
    if(!pubCheck(formName)){
	     return;
    }
	var billRate=parseFloat($("#interestRate").val());
	if (billRate==null||billRate==0){
		doTheAlert('提示',"请输入手续费率！");
		$("#interestRate").focus();
		return false;
	}
	
	if ($("#counterpartyNo").val()==null||$("#counterpartyName").val()==null||$("#counterpartyName").val()==""){
		doTheAlert('提示',"请选择对手方！");
		return false;
	}
	
	   //判断票据明细有没有
	if(!verifyTheFirstTrData()){
		doTheAlert('提示',"票据明细不能为空！");
		return;
	}
	
	if(!verifyNoteType()){
		return;
	}
	
	pubAmendSave();	
	
	  
	});


//****************修改更新明细数据信息^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
function newCreateOrUpdate(formName, busiType) {
	// 获得所在行号
	var trNo = $('#' + formName + ' [id="trNo"]').val();
	var $info = $("#table tbody tr");
	// len和i为目标已有数据的行数
	var i = len = $info.length;
	// 循环获取目标源 x行中的所有列
	var $dest = $("#table tbody tr").eq(i).children();
	var td = $("#table tr:eq(0) th:eq(0)").parents("tr").children('th');
	//如果是更新，则根据行号取得该行去更新。
	var $dest = $("#table tbody tr").eq(trNo).children();
	//给每列赋值
	for (var i = 2; i < td.length*1-1; i = i + 1) {
		//将表头id 为 tb_id 截取 id
		var textid = td.eq(i).attr("id").substring(3);
		//如果存在该id对应的标签
		if ($('#' + formName + ' [id=detail_' + textid + ']').length > 0) {
			$dest.eq(i).children("input").val($('#' + formName + ' [id=detail_' + textid + ']').val());

		} 
		
	}
	
}

