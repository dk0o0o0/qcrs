$(document).on('click','#do30026Save',
		function (){
		if (!checkDatasNull($("#billType").val())){
			return;
		}
		 if(!judgeRepeatedInvoiceNo()){
		 	return;
		 }
    //验证页面上是否有重复的票号
	    if(!judgeRepeatedBillNo()){
	    	return ;
	    }
	
	pubRGSave();
});
$(document).on('click','#MD_pass',
		function (){
		if (!checkDatasNull($("#billType").val())){
			return;
		}
		 if(!judgeRepeatedInvoiceNo()){
		 	return;
		 }
    //验证页面上是否有重复的票号
	    if(!judgeRepeatedBillNo()){
	    	return ;
	    }
	    pubAmendSave();
	});


//}
function btn_pjInputClick() {
	if(!pubCheck("bill30026_edit")){
		return ;
	}
		// js操作table新增一行
		var formName = "bill30026_edit";
		if ($("#oprateType").val() == "create" || $("#oprateType").val()=="copy" ) {
			var type = "create";
			//添加或修改一行数据
			newCreateOrUpdate(formName,type);
		
		}
		if ($("#oprateType").val() == "update") {
			var type = "update";
			newCreateOrUpdate(formName,type);
		}
		closePage();
			//统计账务信息
		count30026();
}

function addTrData() {
	$("#oprateType").val("create");
    var busiType = $("#busiType").val();
    var noteType=$("#noteType").val();
    var url ="";
	url = "/cpms/linkus/capital/bill/bussiness/billPublic/pjInput?busiType="
			+ busiType + "&oprateType=create&noteType="+noteType;
	window.open(url,{width:'80%'});
}
function newCreateOrUpdate(formName,type) {
	// 获得所在行号
	var trNo = $('#' + formName + ' [name="billDetail.trNo"]').val();
	var $info = $("#table tbody tr");
	// len和i为目标已有数据的行数
	var i = len = $info.length;
	// 若第一行中数据为空 则认为已有数据的行数为0
	if (!$info.eq(0).children().eq(2).children("input").val())
		i = 0;
	// 新增一行(点击上一行的"+"号来实现) 如果第一行数据为空 直接覆写
	if(type=="create"){
	if (i > 0)
		$("#table tbody tr").eq(i - 1)
				.children("[class='manipulate']").children().eq(0).click();
	}
	// 循环获取目标源 x行中的所有列
	var $dest = $("#table tbody tr").eq(i).children();
	var td = $("#table tr:eq(0) th:eq(0)").parents("tr").children('th');
	// 序号赋值
	$dest.eq(1).text(i + 1);
	//如果是更新，则根据行号取得该行去更新。
	if(type == "update"){
		var $dest = $("#table tbody tr").eq(trNo).children();
	}
	//给每列赋值
	for (var i = 2; i < td.length*1-1; i = i + 1) {
		//将表头id 为 tb_id 截取 id
		var textid = td.eq(i).attr("id").substring(3);
		//如果存在该id对应的标签
		if ($('#' + formName + ' [id=it_' + textid + ']').length > 0) {
		    //贴现类型值对应中文辖内外
		        if (textid == "noteType") {
				if($('#' + formName + ' [id=it_' + textid + ']').val()=='1007001' || '银行承兑汇票'==$('#' + formName + ' [id=it_' + textid + ']').val()){
					$dest.eq(i).children("input").val("银行承兑汇票");
				}else{
					$dest.eq(i).children("input").val("商业承兑汇票");
				}
			   
			}else{
				$dest.eq(i).children("input").val($('#' + formName + ' [id=it_' + textid + ']').val());
			}

		} else {//如果不存在则赋空值""
			$dest.eq(i).children("input").val("");
		}
		
	}
	
}

function count30026(){
	if(verifyTheFirstTrData()){
		if(verifyCountCondition()){
	//1.取得tbody行数
	var trlen = $("#table tbody tr").length;
	//2.根据id取得相应列的列号 ，循环相加。
	var thFaceAmount = $("#tb_faceAmount").index();
   //定义变量存放总计值
	var totalFaceAmount=0;
	for(var i=0;i<trlen;i=i+1){
			//贴现金额合计
		totalFaceAmount+=getMoneyValue($("#table tbody tr:eq("+i+") td:eq("+thFaceAmount+")").children('input').val())*1;
    }
	//**********合计信息赋值
	//张数
	if($("#table tbody tr").length>1){
		$("#itemSum").val(trlen);
	}else{//如果只有一行数据，判断是否是空的，空的则length=0;
		if($("#table tbody tr:eq(0) td:eq(1)").text()==""){
			$("#itemSum").val(0);
		}else{
			$("#itemSum").val(1);
		}
	}
	$("#faceAmount").val(totalFaceAmount.toFixed(2));
	$("#faceAmount").change();
		}
	}
}




