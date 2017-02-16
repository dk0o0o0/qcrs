function toSearchBill(){
	//查询前需先录入利率
	var reg=/^\d{1,2}(\.\d{1,10})?$/;
	if(reg.test($("#billRate").val()) && $("#billRate").val()!="0.0" ){
		var url="../bussiness/billPublic/searchBill?busiType=bill_search";
	window.open(url);
	showSearchBill();
	}else{
		doTheAlert("提示","利率应在（0,100）内！");
		$("#billRate").val("");
		$("#billRate").focus();
	}
}
/**
 * 显示查询页面同时给控件加上不可用属性
 */
function showSearchBill(){
    showSearchBillPage();
}
function showSearchBillPage(){
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
			}
			//递归
		setTimeout(showTheEditVal,100);
	}
function checkboxClick(){
	$("input[name='checkbox']").each(function() {
		//点击选中，则1.获取checkbox id，移除所有class.has(该 id)的 readonly=true 
			if ($(this).prop("checked")) {
				var id=$(this).attr("id");
				if($("#"+id).hasClass("select")){
					$("select[class='"+id+"']").contractNoeach(function(){
					$(this).removeAttr("disabled");
				});
				}else{
				$("input."+id).each(function(){
					$(this).removeAttr("disabled");
				});
				}
		}else{
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
 * 将票据查询页面选中的票据传到系统内转贴页面的table显示
 */
var checkedCount;//票据查询结果选中条数标记
function addNoteToTable(tableName){
   checkedCount=0;
   $("#resultTable input[name='checkname']").each(function(){
   if($(this).is(':checked')){
   	//累计选中条数
   	checkedCount++;
	   //获取checkbox所在行行号
   var trNo=$(this).parents("tr").index();
	    //获取table列
   var  len = $("#"+tableName+" tbody tr").length;
	   // 若第一行中数据为空 则认为已有数据的行数为0
	if (!$("#"+tableName+" tbody tr").eq(0).children().eq(2).children("input").val())
		len = 0;
		 // 若第一行中数据不为空 则添加一行空行
	if (len > 0){
		$("#"+tableName+" tbody tr").eq(len - 1)
				.children("[class='manipulate']").children().eq(0).click();
	}
	//获取目标列
	var $dest = $("#"+tableName+" tbody tr").eq(len).children();
	//设置序号列
    $dest.eq(1).text(len + 1);
    var td = $("#"+tableName+" tr:eq(0) th:eq(0)").parents("tr").children('th');
	    //循环table_30008列，取对应值
    	for (var i = 2; i < td.length; i = i + 1) {
    		//根据这列表头的id,找到resultTable的对应id列的数据
    		var tabid = td.eq(i).attr("id");
			var ind = $("#resultTable th[id="+tabid+"]").index();
    		var value;
			if(ind>=0){
				value= $("#resultTable tbody tr:eq("+trNo+") td:eq("+ind+")").text();
			}else{
				value="";
			}
    		//赋值
    		$dest.eq(i).children("input").val(value);
    	}
    }
	});
   
   $("#ecdsClearType").value=ecdsClearType;
   $("#cdsConveyType").value=cdsConveyType;
   $("#scounterpartyName").val(counterpartyName);
   $("#scounterpartyBankNo").val(counterpartyBankNo);
	closePage();
}
// -----------------------------全选事件
function checkAllbox(evt) {
	var flag=false;
	$("#resultTable input[name='checkname']").each(function(){
	    if($(this).is(':checked')){
	    }else{
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
function searchResult(){
	//1.获取所有条件
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
	var faceAmount1=$("#faceAmount1").val();
	params+="amount_0="+faceAmount1+"&";
	var faceAmount2=$("#faceAmount2").val();
	params+="amount_1="+faceAmount2+"&";
	var billNo=$("#bNo").val();
	params+="billNo="+billNo+"&";
	var contractNo=$("#cntrNo").val();
	params+="contractNo="+contractNo+"&";
	if($("#collectFlag").is(':checked')){
		var collectFlag="true";
		params+="collectFlag="+collectFlag+"&";
	}
	params=params+getBillDetailBillNO()+"&";
	params=params.substring(0,params.lastIndexOf("&"));
	
	$.ajax({
		type : "post",
		global : false,
		async : false,
		url : '../bussiness/billPublic/findBillsByParams?'+params,
		dataType : "json",
		success : function(data) {
			if (data != null) {
				//根据表头的id顺序，循环从notelist、booklist中查到和id同名的属性值。
				    //首先从notelist中查找，如果找到则取值，循环下一个Id,如果notelist 中没有找到则再从booklist中查找(前提条件是表中的数据在note/book表中都有)
			//取得table的所有表头
			var td = $("#resultTable tr:eq(0) th:eq(0)").parents("tr").children('th');	
			//根据notelist的长度确定有多少行数据
			var innerHTML="";
			var i,j;
			for (i =0; i < data.notelist.length; i = i + 1) {
				innerHTML+="<tr><td><input type='checkbox' name='checkname' id='checkname' />"+(i*1+1)+"</td>";
				//从第3列开始循环
			    for (j = 1; j < td.length; j = j + 1) {
			    	//取得table表头的id
			    	var temp = td.eq(j).attr("id");
					var textid = temp.substring(3);
					//从notelist 、booklist 中找到id值匹配的value
				   if(data.notelist[i].hasOwnProperty(textid)){
				   	    innerHTML+="<td>"+data.notelist[i][textid]+"</td>";
					}else  if(data.booklist[i].hasOwnProperty(textid)){
						innerHTML+="<td>"+data.booklist[i][textid]+"</td>";
					}else{
						innerHTML+="<td></td>";
					}
			    }
			    innerHTML+="</tr>";
			}
			$("#resultTable tbody tr").remove();
			$("#resultTable tbody").append(innerHTML);
			}
		}
	});
}



