//查询流水按钮点击处理
function listStatement(){
	$("#resultTable tbody tr").remove();
	var transDate=$("#transDate").val();
	$("#srchdt").val(transDate);
	var params="transdt="+transDate;

	//查询流水处理
	$.ajax({
		type : "post",
		global : false,
		async : false,
		url : '/cpms/linkus/capital/common/account/statementAccount/getStatement?'+params,
		dataType : "json",
		success : function(data) {
			if(data.tip!=null && data.tip!=""){
				doTheAlert('提示',data.tip);
				return;
			}
			if(data.list!=null && data.list.length>0){
				//取得table的所有表头
				var td = $("#resultTable tr:eq(0) th:eq(0)").parents("tr").children('th');	
				//根据list的长度确定有多少行数据
				var innerHTML="";
				var i,j ;
				for (i =0; i < data.list.length; i++) {
					innerHTML+="<tr>";
					for(j=0;j<=td.length*1-1;j++){
						//取得table表头的id
					    var temp = td.eq(j).attr("id");
						var textid = temp.substring(3);
						//从list中找到id值匹配的value
						if(data.list[i].hasOwnProperty(textid)){
							var str=data.list[i][textid]+'';
							if(str==null||str==''){
								innerHTML+="<td></td>";  
							}else{
								if(j==6){
									innerHTML+="<td>"+addThousandCharacter(data.list[i][textid])+"</td>";
								}else{
									innerHTML+="<td>"+data.list[i][textid]+"</td>";
								}   
							}
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


/**
 * 
 */

function exportStatementAccount(){
	var transDate=$('#srchdt').val();
	if(transDate==""||null==transDate){
		doTheAlert('提示',"还未查询流水清单!");
		return;
	}
	var params="transdt="+transDate;
	$("#exportStatement").attr("action","/cpms/linkus/capital/common/account/statementAccount/exportStatement?"+params);
	$("#exportStatement").submit();
}
function printStatementAccount(){
	var transDate=$('#srchdt').val();
	if(transDate==""||null==transDate){
		doTheAlert('提示',"还未查询流水清单!");
		return;
	}
	var params="transdt="+transDate;
	window._open("/cpms/linkus/capital/common/account/statementAccount/print?"+params);
}
function addThousandCharacter(num){
	//传入的不是数字或者为空   返回原值
	if(isNaN(num)||!num)
		return num;
	var str;
	//如果传入的是小数   直接拆分
	num = num.toString();
	if(num.indexOf('.')!=-1)
	 	str = num.split(".");
	else//传入的是整数    默认给两位小数
		str = [num,'00'];
	//零宽断言      如果某个字段是1~3位数字  并且它后面的数字个数是3的倍数   则给这个字段后加一个千分符
	str[0]=str[0].replace(/\d{1,3}(?=(\d{3})+$)/g,function(s){return s+','});
	return str[0]+"."+str[1];
}