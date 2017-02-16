/*$(function(){
	//场外报价点击提交
	$(document).on('click', '#btn_add', function(){
		var shiborTypeText = $("#shiborType").find("option:selected").text();//页面上显示的品种名称
		var shiborTypeVal = getMoneyValue($("#shiborType").find("option:selected").val());//存入数据库的品种的值
		var occurredShiborPrice = getMoneyValue($("#occurredShiborPrice").val());//前一工作日SHIBOR价格
		var occurredAAAIssueRate = $("#occurredAAAIssueRate").val();occurredReposRate
		var occurredReposRate = $("#occurredReposRate").val();
		if(shiborTypeText==""){
			doTheAlert("提示","SHIBOR场外报价品种录入有误!");
			return;
		}
		if(shiborTypeText==""){
			doTheAlert("提示","SHIBOR场外报价品种录入有误!");
			return;
		}
		if(occurredShiborPrice == ""||occurredShiborPrice<0){
			doTheAlert("提示","前一工作日SHIBOR价格录入有误!");
			$("#occurredShiborPrice").focus();
			return;
		}
		var dayPrice = getMoneyValue($("#dayPrice").val());//当日报价价格
		if(dayPrice == ""||dayPrice<0){
			doTheAlert("提示","当日报价价格录入有误!");
			$("#dayPrice").focus();
			return;
		}
		var h;
		var occurredAAAIssueRate = $("#occurredAAAIssueRate").val();//前一工作日AAA同业存单收盘收益率
		var occurredReposRate = $("#occurredReposRate").val();//前一工作日质押式回购加权利率
		var index = $("#t20060ItemsTable tbody td[class='shiborName']").length;
		var index = 0;
		if(length==0){
			index = length
		}else{
			index = length -1;
		}
		if(1==shiborTypeVal){
			shiborTypeText=='隔夜';
		}else if(2==shiborTypeVal){
			shiborTypeText=='1周';
		}else if(3==shiborTypeVal){
			shiborTypeText=='2周';
		}else if(4==shiborTypeVal){
			shiborTypeText=='1个月';
		}else if(5==shiborTypeVal){
			shiborTypeText=='3个月';
		}else if(6==shiborTypeVal){
			shiborTypeText=='6个月';
		}else if(7==shiborTypeVal){
			shiborTypeText=='9个月';
		}else if(8==shiborTypeVal){
			shiborTypeText=='1年';
		}
		var str = $(':input[name="checkname"]').length+1;//数据条数
		var interRateMargin = (dayPrice-occurredShiborPrice).toFixed(2);//利差
		
		h = '<tr id="table'+str+'">'+			
	    '<td class="shiborName"><center><input readonly=true name="bondCntr.bondShiborItems['+ index +'].shiborName" 			 value="'+ shiborTypeText +'"></center></td>'+
	    '<td ><center><input readonly=true name="bondCntr.bondShiborItems['+ index +'].occurredAAAIssueRate" value="'+ occurredAAAIssueRate +'"></center></td>'+
	    '<td ><center><input readonly=true name="bondCntr.bondShiborItems['+ index +'].occurredShiborPrice"  value="'+ occurredShiborPrice +'"></center></td>'+
	    '<td ><center><input readonly=true name="bondCntr.bondShiborItems['+ index +'].occurredReposRate"    value="'+ occurredReposRate +'"></center></td>'+
	    '<td ><center><input readonly=true name="bondCntr.bondShiborItems['+ index +'].dayPrice" 			 value="'+ dayPrice +'"></center></td>'+
	    '<td ><center><input readonly=true name="bondCntr.bondShiborItems['+ index +'].interRateMargin"      value="'+ interRateMargin +'"></center></td>'+
	    '<td style="display:none;"><center><input id="shiborType" name="bondCntr.bondShiborItems['+ index +'].shiborType" value="'+ shiborTypeVal +'"></center></td>'+
	    '</tr>';
	    index+=1;
	   	$('#tabtbody').append(h);
		
		//添加后清空输入信息
		$("#occurredAAAIssueRate").val("");
		$("#occurredShiborPrice").val("");
		$("#occurredReposRate").val("");
		$("#dayPrice").val("");
		
		
	});	
	
	//---------------------------------------添加标记
	$(document).on('click','#t20060ItemsTable tbody tr',
		function(){
			//移除所有标记
			$("#t20060ItemsTable tbody tr").removeClass("justMark1");
			//添加标记
			$(this).toggleClass("justMark1");
			//设置当前行背景色，并清除除当前行外其他行的背景色
			$(this).siblings().css("background-color","");
			$(this).css("background-color","#ffe48d");
	});
	
	//场外报价点击删除
	$(document).on('click', '#btn_del', function() {
		var shiborName = $(".justMark1 td input").eq(0).val();
		if(shiborName==undefined) {
			doTheAlert("提示","请选择要删除的数据！");
			return;
		}
		getTheMessager().confirm("提示",'确定是要删除"'+shiborName+'"的信息吗？',function(r){
			if(r) {
				var tr = $(".justMark1 td").parent();
				tr.remove();
				//移除标记
				$("#t20060ItemsTable tbody tr").removeClass("justMark1");
		
		//更新下标
		var length = $("#t20060ItemsTable tbody td[class='shiborName']").length;
		var h="";
		var index = 0;
		if(length>0){
			ok:for(var i=0;i<length;i++){
				var shiborName = $("input[name='bondCntr.bondShiborItems["+i+"].shiborName']").val();
				var issueRate = $("input[name='bondCntr.bondShiborItems["+i+"].occurredAAAIssueRate']").val();
				var shiborPrice = $("input[name='bondCntr.bondShiborItems["+i+"].occurredShiborPrice']").val();
				var reposRate = $("input[name='bondCntr.bondShiborItems["+i+"].occurredReposRate']").val();
				var dayPrice = $("input[name='bondCntr.bondShiborItems["+i+"].dayPrice']").val();
				var interRateMargin = $("input[name='bondCntr.bondShiborItems["+i+"].interRateMargin']").val();
				var shiborType = $("input[name='bondCntr.bondShiborItems["+i+"].shiborType']").val();
				
				if(shiborName==undefined){
					i=i+1;
					var shiborName = $("input[name='bondCntr.bondShiborItems["+i+"].shiborName']").val();
					var issueRate = $("input[name='bondCntr.bondShiborItems["+i+"].occurredAAAIssueRate']").val();
					var shiborPrice = $("input[name='bondCntr.bondShiborItems["+i+"].occurredShiborPrice']").val();
					var reposRate = $("input[name='bondCntr.bondShiborItems["+i+"].occurredReposRate']").val();
					var dayPrice = $("input[name='bondCntr.bondShiborItems["+i+"].dayPrice']").val();
					var interRateMargin = $("input[name='bondCntr.bondShiborItems["+i+"].interRateMargin']").val();
					var shiborType = $("input[name='bondCntr.bondShiborItems["+i+"].shiborType']").val();
					length=length+1;
					if(shiborName==undefined){
						continue ok;
					}
				}
				
				var str = $(':input[name="checkname"]').length+1;//数据条数
				h += '<tr id="table'+str+'">'+			
			    '<td class="shiborName"><center><input readonly=true name="bondCntr.bondShiborItems['+ index +'].shiborName" 			 value="'+ shiborName +'"></center></td>'+
			    '<td ><center><input readonly=true name="bondCntr.bondShiborItems['+ index +'].occurredAAAIssueRate" value="'+ issueRate +'"></center></td>'+
			    '<td ><center><input readonly=true name="bondCntr.bondShiborItems['+ index +'].occurredShiborPrice"  value="'+ shiborPrice +'"></center></td>'+
			    '<td ><center><input readonly=true name="bondCntr.bondShiborItems['+ index +'].occurredReposRate"    value="'+ reposRate +'"></center></td>'+
			    '<td ><center><input readonly=true name="bondCntr.bondShiborItems['+ index +'].dayPrice" 			 value="'+ dayPrice +'"></center></td>'+
			    '<td ><center><input readonly=true name="bondCntr.bondShiborItems['+ index +'].interRateMargin"      value="'+ interRateMargin +'"></center></td>'+
			    '<td style="display:none;"><center><input id="shiborType" name="bondCntr.bondShiborItems['+ index +'].shiborType" value="'+ shiborType +'"></center></td>'+
			    '</tr>';
				index+=1;
			}
		}
		$('#tabtbody').html(h);
		$("#t20060ItemsTable tbody tr input").attr('readonly','');
		}
		});
	});
	
	
});

function dealBondData(){
	var $tbody = $("#t20060ItemsTable tbody");
	if($tbody.children()==""){
		doTheAlert("提示","未填写明细信息!");
		return false;
	}
	return true;
}

*/


/**场外报价js处理文件**/
$(function(){
	 //------------------------点击当前行添加标记
    $(document).on('click','#t20060ItemsTable tbody tr',function(){
		//移除所有标记
		$("#t20060ItemsTable tbody tr").removeClass("justMark");
		//添加标记
		$(this).addClass("justMark");
	});
	
	$(document).on('blur','#t20060ItemsTable tbody tr td[class="newPrice"]',function(){
		var oldPrice = $(this).prev().children().children().children().children().val();
		var newPrice = $(this).children().children().children().children().val();
		var margin = (newPrice - oldPrice).toFixed(4);
		$(this).next().children().children().children().children().val(margin);
	});
	
	//移出两个价格框时触发计算
	$(document).on('blur','.justMark td[class="oldPrice"]',function(){
		calMargin();
	});
	$(document).on('blur','.justMark td[class="newPrice"]',function(){
		calMargin();
	});
	
});

//计算利差
function calMargin(){
	var oldprice = $(".justMark td[class='oldPrice']").children().children().children().children().val();
	var newprice = $(".justMark td[class='newPrice']").children().children().children().children().val();
	var margin = (newprice - oldprice).toFixed(4);
	if(oldprice&&newprice){
		$(".justMark td[class='margin']").children().children().children().children().val(margin);
	}
}

//保存前的数据处理
function dealBondData(){
	var $iteminfo = $("#t20060ItemsTable tbody tr td[class='newPrice'],#t20060ItemsTable tbody tr td[class='oldPrice']");
	for(var i=0;i<$iteminfo.length;i++){
		var input = $iteminfo.eq(i).children().children().children().children();
		if(input.val()==""){
			doTheAlert('提示','明细信息输入有误!');
			return false;
		}
	}
	var $itemTr = $("#t20060ItemsTable tbody tr");
	for(var i=0;i<$itemTr.length;i++){
		$("select[name='bondCntr.bondShiborItems["+i+"].shiborType']").removeAttr('disabled');
		var shiborName = $("select[name='bondCntr.bondShiborItems["+i+"].shiborType'] option:selected").text();
		$("input[name='bondCntr.bondShiborItems["+i+"].shiborName']").val(shiborName);
	}
	var length = $("#t20060ItemsTable tbody td[class=shiborType]").length;
	for(var i=0;i<length;i++){
		var shiborName = $("select[name='bondCntr.bondShiborItems["+i+"].shiborType'] option:selected").text();
		$("input[name='bondCntr.bondShiborItems["+i+"].shiborName']").val(shiborName);
	}
	return true;
}



