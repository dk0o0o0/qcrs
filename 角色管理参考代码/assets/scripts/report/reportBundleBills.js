//机构扎帐检测及扎帐处理
function agencyBundle(bundleType){
	$("#resultTable tbody tr").remove();
	$("#bundleType").val("");
	var transDate=$("#transDate").val();
	var departmentCode=$("#departmentCode").val();
	var params="saveDate="+transDate+"&trandt"+transDate;
	params +="&departmentCode="+$("#departmentCode").val();
	params +="&srchtp="+bundleType;
   if (departmentCode=="990401" || departmentCode=="990101" || departmentCode =="922001"){
	   //长沙本部检测是否扎帐
	   if(!agencyBundleBill(params)){
		   return;
	   }
   }else{
	   //分支机构扎帐前检测是否对账
	  if(!otherAgencyBundle(params)){
		  return;
	  }
   }
   
	//机构扎帐处理
	var flag=bundleBills(params);
	if(flag){
		$("#bundleType").val(bundleType);
	}
	$("#oldtransDate").val($("#transDate").val());
}
/**
 * 总行扎帐前检测
 */

function agencyBundleBill(params){
	var flag=true;
	$.ajax({
		type : "post",
		global : false,
		async : false,
		url : '/cpms/linkus/capital/common/account/bundleBillAccountCheck/checkAccountPassed?'+params,
		dataType : "json",
		success : function(data) {
			if (data.tip!=null){
				doTheAlert('提示',data.tip);
				flag=false;
			}
		},
		error:function(){
			doTheAlert("提示","扎帐失败");
			flag=false;
		}
		});
	return flag;
}
/***
 * 其他机构扎帐前检测是否对账
 */
function otherAgencyBundle(params){
	var flag=true;
	$.ajax({
		type : "post",
		global : false,
		async : false,
		url : '/cpms/linkus/capital/common/account/bundleBillAccountCheck/checkAccountByOthersAgency?'+params,
		dataType : "json",
		success : function(data) {
			if (data.tip!=null){				
				doTheAlert('提示',data.tip);
				flag=false;
			}
		},
		error:function(){
			doTheAlert("提示","扎帐失败");
			flag=false;
		}
		});
	return flag;
}

//扎帐
function bundleBills(params){
	var flag=false;
	$.ajax({
		type : "post",
		global : false,
		async : false,
		url : '/cpms/linkus/capital/common/account/bundleBillAccountCheck/bundleAccount?'+params,
		dataType : "json",
		success : function(data) {
			if(data.tip!=null && data.tip!=""){
				doTheAlert('提示',data.tip);
				return flag;
			}
			if(data.list!=null && data.list.length>0){
				//取得table的所有表头
				var td = $("#resultTable tr:eq(0) th:eq(0)").parents("tr").children('th');	
				//根据list的长度确定有多少行数据
				var innerHTML="";
				var i,j ;
				for (i =0; i < data.list.length; i = i + 1) {
					innerHTML+="<tr>";
					for(j=0;j<=td.length*1-1;j++){
						if(j==0){
							innerHTML+="<td>"+(i+1)+"</td>";
						}else if(j==5||j==7){
							//取得table表头的id
					    	var temp = td.eq(j).attr("id");
							var textid = temp.substring(3);
							//从list中找到id值匹配的value
						   if(data.list[i].hasOwnProperty(textid)){
							   var str=data.list[i][textid]+'';
							 if(str==null||str==''){
									 innerHTML+="<td></td>";  
								   }else{
									   innerHTML+="<td>"+addThousandCharacter(data.list[i][textid])+"</td>";
							 }
						   }
						}else{
					    	//取得table表头的id
					    	var temp = td.eq(j).attr("id");
							var textid = temp.substring(3);
							//从list中找到id值匹配的value
						   if(data.list[i].hasOwnProperty(textid)){
							   var str=data.list[i][textid]+'';
							 if(str==null||str==''){
									 innerHTML+="<td></td>";  
								   }else{
									   innerHTML+="<td>"+data.list[i][textid]+"</td>";
							 }
						   	}else{
								innerHTML+="<td></td>";
							}
						}
		
				    }
					innerHTML+="</tr>";
				}
				$("#resultTable tbody tr").remove();
				$("#resultTable tbody").append(innerHTML);
				
				flag= true;
			}
		}
	});
	return flag;
}

/**
 * 
 */

function exportBundleBillAccount(){
	var bundleType=$('#bundleType').val();
	if(bundleType==""||null==bundleType){
		doTheAlert('提示',"没有选择扎账类型!");
		return;
	}
	var transDate=$("#transDate").val();
	var departmentCode=$("#departmentCode").val();
	var params="saveDate="+transDate+"&trandt"+transDate;
	params +="&departmentCode="+$("#departmentCode").val();
	params +="&srchtp="+bundleType;
	$("#exportBundleBill").attr("action","/cpms/linkus/capital/common/account/bundleBillAccountCheck/exportBundleBillAccount?"+params);
	$("#exportBundleBill").submit();
}
function printBundleBillAccount(){
	var bundleType=$('#bundleType').val();
	if(bundleType==""||null==bundleType){
		doTheAlert('提示',"没有选择扎账类型!");
		return;
	}
	var transDate=$("#oldtransDate").val();
	var departmentCode=$("#departmentCode").val();
	var params="saveDate="+transDate+"&trandt"+transDate;
	params +="&departmentCode="+$("#departmentCode").val();
	params +="&srchtp="+bundleType;
	window._open("/cpms/linkus/capital/common/account/bundleBillAccountCheck/print?"+params);
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