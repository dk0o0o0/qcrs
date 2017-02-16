
function addInterbankBasic(){
	window.open("/cpms/linkus/capital/interbank/base/interbankBasic/input",{width:'90%'});
}
function checkProductNo(){
	var viProductNo=$('#productNo').val();
	if(viProductNo=="")return;
	var reg = new RegExp('^[0-9]{8}[A-Z]{2}[0-9]{2}$');
	var flag=reg.test(viProductNo);
	if(!flag){
		doTheAlert("提示","请输入格式为:'日期-归属团队-序列号'的产品编号!(例:20161115GZ01)");
		return;
	}
	$.ajax({
		type : "post",
		global : false,
		async : true,
		url : '/cpms/linkus/capital/interbank/base/interbankBasic/checkProductNo?viProductNo='+viProductNo,
		dataType : "json",
		success : function(data) {
		 	if (data != null) {
				if(typeof(data.msg) !="undefined" && data.msg=="1"){
					doTheAlert("提示","产品编号已存在！");
					$('#productNo').val('');
					return;
				}
			}
		},
		error:function(){
			doTheAlert('提示', errorTip);
		}
	});		
}


Observation.interbankBasic = function(container) {
	$('#interbankBasic_input', container).each(function() {
		var form = this;
		form.onsuccess = function() {
			$('.ui-dialog-titlebar-close', $(form).closest('.ui-dialog')).click();
			$('#id_queryInterbankBasic').click();
		}
	});
}
function queryInterbankBasic(){
	var from1 = $('form.criteria');
	if (from1 && from1.length >= 0) {
		var from2 = from1[from1.length - 1];
		var id = from2.id;
		var statex = $("#viStatex").val();
		var actionBase = "/cpms/linkus/capital/interbank/base/interbankBasic";
		var productNo = $("#viProductNo").val();
		actionBase=actionBase+"?viProductNo="+ productNo+"&viStatex="+statex+"&viqueryFlag=query";
		$("#" + id)[0].action = actionBase;
		$("#" + id).trigger("submit");
	}
}
function operateInterbankBasic(editType){
		var length = $("#interbankBasic_form table tbody tr").length;
		var selectLength=0;//总行数
		var selectedRow=0;//被选中行的下标
		//计算总行数
		for (var i = 0; i <= length; i++) {
			var select = $("#interbankBasic_form table tbody").find("tr").eq(i).attr("class");
			if (select == "selected") {
				selectedRow=i;
				selectLength++;
			}
		}
		//校验如果selectLength=0则表示没选中一行，如果selectLength>1表示选中了多行
		if(selectLength<1){
			doTheAlert("提示","请表格中勾选中一条同业基础信息!");
			return false;
		}else if(selectLength>1){
			doTheAlert("提示","只能勾选中一条同业基础信息!");
			return false;
		}else if(selectLength==1){
			var tr = $("#interbankBasic_form table tbody").find("tr").eq(selectedRow);
			if(editType=="modi"){
				modiInterbankBasic(tr);
			}else if(editType=="approve"){
				approveInterbankBasic(tr);
			}else if(editType=="del"){
				delInterbankBasic(tr);
			}
		}	
}
function modiInterbankBasic(tr){
	var prductNo=tr.find("td").eq(2).text();
	$.ajax({
		type : "post",
		global : false,
		async : false,
		url : '/cpms/linkus/capital/interbank/base/interbankBasic/validateProduct?prductNo='+prductNo,
		dataType : "json",
		success : function(data) {
		 	if (data.msg == "1") {
		 		doTheAlert('提示', "该产品编号："+prductNo+" 被业务使用或已记帐办结,不能修改!");
				return;
			}
		 	var uid=tr.find("td")[0].childNodes[0].value;
			window.open("/cpms/linkus/capital/interbank/base/interbankBasic/input?uid="+uid,{width:'90%'});
		},
		error:function(){
			doTheAlert('提示', errorTip);
		}
	});	
}
function delInterbankBasic(tr){
	var uid=tr.find("td")[0].childNodes[0].value;
	$.messager.confirm('确认','确定要删除这条同业信息吗？',function(r){
		if(r){
			
			$.ajax({
				type : "post",
				global : false,
				async : true,
				url : '/cpms/linkus/capital/interbank/base/interbankBasic/del?uid='+uid,
				dataType : "json",
				success : function(data) {
				 	if (data != null) {
						var z=0;
						if(typeof(data.msg) !="undefined" ){
							$.messager.alert('提示',data.msg,'',function(r){
								if(r){
									$('#id_queryInterbankBasic').click();
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
function approveInterbankBasic(tr){
	var uid=tr.find("td")[0].childNodes[0].value;
	if(tr.find("td").eq(1).attr('data-cellvalue')=="1"){
		doTheAlert("提示","已经复核的信息不能复核！");
		return false;
	}
	window.open('/cpms/linkus/capital/interbank/base/interbankBasic/confirm?uid='+uid,{width:'65%'});
	
}
function approveClick(flag){
	if(!flag) {
		closePage();
		return;
	}
	var length = $("#interbankBasic_form table tbody tr").length;
	var selectLength=0;//总行数
	var selectedRow=0;//被选中行的下标
	//计算总行数
	for (var i = 0; i <= length; i++) {
		var select = $("#interbankBasic_form table tbody").find("tr").eq(i).attr("class");
		if (select == "selected") {
			selectedRow=i;
			selectLength++;
		}
	}
	var tr = null;
	if(selectLength==1){
		tr = $("#interbankBasic_form table tbody").find("tr").eq(selectedRow);
	}
	var productNo=tr.find("td").eq(2).text();
	var startTransAmount = getMoneyValue(tr.find("td").eq(4).text());
	var counterpartyName = tr.find("td").eq(3).text();
	var realRate = tr.find("td").eq(5).text();
	var secondBusiType = tr.find("td").eq(10).text();
	var firstBusiType = tr.find("td").eq(9).attr("data-cellvalue");
	var riskAsset = tr.find("td").eq(8).attr("data-cellvalue");
	var startInterDate = tr.find("td").eq(6).text();
	var maturityDate = tr.find("td").eq(7).text();
	var uid=tr.find("td")[0].childNodes[0].value;
	
	var ret = false;
	var items = $("#interbankBasic_confirm_frm input,#interbankBasic_confirm_frm select").each(function(item){
		if(ret) return;
		var name = this.name;
		var val = "";
		if(name == "firstBusiType"||name == "riskAsset") {
			val = $(this).find("option:selected").val();
		}else if(name=="startTransAmount"){
			val = getMoneyValue($(this).val());
		}else{
			val = $(this).val();
		}
		var current = eval(name);
		if(name == "startTransAmount") {
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
		url : '/cpms/linkus/capital/interbank/base/interbankBasic/approve?uid='+uid,
		dataType : "json",
		success : function(data) {
		 	if (data != null) {
				var z=0;
				if(typeof(data.msg) !="undefined" ){
					$.messager.alert('提示',data.msg,'',function(r){
						if(r){
							closePage();
							$('#id_queryInterbankBasic').click();
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


function addUnderAsset(){
	var temp=$("#add").attr("disabled")
	if(temp=="disabled"){
		return;
	}
	var flag=checkContent();
	if(!flag){
		return;
		}
		var financename=$("#financename").val();
		var assetAmount=getMoneyValue($("#assetAmount").val());
		var assetRate=$("#assetRate").val();
		var assetInvest=$("#assetInvest").val();
		var assetIndustry=$("#assetIndustry").val();
		var assetIndustrys=$("#assetIndustry").find("option:selected").text();
		var isBankCustomer=$("#isBankCustomer").val();
		var isBankCustomers=$("#isBankCustomer").find("option:selected").text();
		var isPlatforms=$("#isPlatform").find("option:selected").text();
		var isPlatform=$("#isPlatform").val();
		var underCreditMeasure=$("#underCreditMeasure").val();
		var underCreditName=$("#underCreditName").val();
		var underStartdate=$("#underStartdate").val();
		var underEnddate=$("#underEnddate").val();
		//更新表格数据行数下标
		var length = $("#tableItem tbody tr").length;
		var index=parseInt($('#id_index').val());
		if(length>0){//如果表格中已经存在一条以上数据
			index=index+1;
		}
		$('#id_index').val(index);
		//处理表格添加一行
	
		var	trHtrml="<tr>"+
		   "<td style='display:none'>"+index+"</td>"+
		   "<td><input type='text'  readonly=true name='interbankBasic.items["+index+"].financename' style='width:88px;' value='"+financename+"'/></td>"+
		   "<td><input type='text'  readonly=true name='interbankBasic.items["+index+"].assetAmount' style='width:88px;' value='"+assetAmount+"'/></td>"+
		   "<td><input type='text'  readonly=true name='interbankBasic.items["+index+"].assetRate' style='width:88px;' value='"+assetRate+"'/></td>"+
		   "<td><input type='text'  readonly=true name='interbankBasic.items["+index+"].assetInvest' style='width:88px;' value='"+assetInvest+"'/></td>"+
		   "<td><input type='hidden' name='interbankBasic.items["+index+"].assetIndustry' value='"+assetIndustry+"' id='assetIndustry' style='width:88px;'/><span>"+	
		   assetIndustrys+"</span></td>"+
		   "<td><input type='hidden' name='interbankBasic.items["+index+"].isBankCustomer' value='"+isBankCustomer+"' id='isBankCustomer' style='width:88px;'/><span>"+
		   isBankCustomers+"</span></td>"+
		   "<td><input type='hidden' name='interbankBasic.items["+index+"].isPlatform' value='"+isPlatform+"' id='isPlatform' style='width:88px;'/><span>"+	
		   isPlatforms+"</span></td>"+
		   "<td><input type='text'  readonly=true name='interbankBasic.items["+index+"].underCreditMeasure' style='width:88px;' value='"+underCreditMeasure+"'/></td>"+
		   "<td><input type='text'  readonly=true name='interbankBasic.items["+index+"].underCreditName' style='width:88px;' value='"+underCreditName+"'/></td>"+
		   "<td><input type='text'  readonly=true name='interbankBasic.items["+index+"].underStartdate' style='width:88px;' value='"+underStartdate+"'/></td>"+
		   "<td><input type='text'  readonly=true name='interbankBasic.items["+index+"].underEnddate' style='width:88px;' value='"+underEnddate+"'/></td>"+
			"</tr>";
		
		$('#tableItem tbody').append(trHtrml);
		//清空
		clearContent();

}	
function delUnderAsset(){
		var temp=$("#delete").attr("disabled")
		if(temp=="disabled"){
			return;
		}
        //更新表格行数据的对象下标
		var length = $("#tableItem tbody tr").length;
		var id_cur_index=parseInt($('#id_cur_index').val());
		//删除行
		$('#tableItem tbody').children().eq(id_cur_index).remove();
		//删除行后清空当前行下标
        $('#id_cur_index').val("");
		//更新表格数据总行数
		var index=parseInt($('#id_index').val());
		index=index-1;
		$('#id_index').val(index); 
		
		var trHtrml="";
		for (var i=0;i<length-1;i++){
			var financename=$('#tableItem tbody').children().eq(i).find("td").eq(1).find("input").val();
			var assetAmount=$('#tableItem tbody').children().eq(i).find("td").eq(2).find("input").val();
			var assetRate=$('#tableItem tbody').children().eq(i).find("td").eq(3).find("input").val();
			var assetInvest=$('#tableItem tbody').children().eq(i).find("td").eq(4).find("input").val();
			var assetIndustry=$('#tableItem tbody').children().eq(i).find("td").eq(5).find("input").val();
			var assetIndustrys=$('#tableItem tbody').children().eq(i).find("td").eq(5).find("span").text();
			var isBankCustomer=$('#tableItem tbody').children().eq(i).find("td").eq(6).find("input").val();
			var isBankCustomers=$('#tableItem tbody').children().eq(i).find("td").eq(6).find("span").text();
			var isPlatform=$('#tableItem tbody').children().eq(i).find("td").eq(7).find("input").val();
			var isPlatforms=$('#tableItem tbody').children().eq(i).find("td").eq(7).find("span").text();
			var underCreditMeasure=$('#tableItem tbody').children().eq(i).find("td").eq(8).find("input").val();
			var underCreditName=$('#tableItem tbody').children().eq(i).find("td").eq(9).find("input").val();
			var underStartdate=$('#tableItem tbody').children().eq(i).find("td").eq(10).find("input").val();
			var underEnddate=$('#tableItem tbody').children().eq(i).find("td").eq(11).find("input").val();
				
			trHtrml+="<tr><td style='display:none'>"+i+"</td>"+
				   "<td><input type='text'  readonly=true name='interbankBasic.items["+i+"].financename' style='width:88px;' value='"+financename+"'/></td>"+
				   "<td><input type='text'  readonly=true name='interbankBasic.items["+i+"].assetAmount' style='width:88px;' value='"+assetAmount+"'/></td>"+
				   "<td><input type='text'  readonly=true name='interbankBasic.items["+i+"].assetRate' style='width:88px;' value='"+assetRate+"'/></td>"+
				   "<td><input type='text'  readonly=true name='interbankBasic.items["+i+"].assetInvest' style='width:88px;' value='"+assetInvest+"'/></td>"+
				   "<td style='width:88px;'><input type='hidden' name='interbankBasic.items["+i+"].assetIndustry' value='"+assetIndustry+"' id='assetIndustry' style='width:88px;'/><span>"+	
				   assetIndustrys+"</span></td>"+
				   "<td style='width:88px;'><input type='hidden' name='interbankBasic.items["+i+"].isBankCustomer' value='"+isBankCustomer+"' id='isBankCustomer' style='width:88px;'/><span>"+
				   isBankCustomers+"</span></td>"+
				   "<td style='width:88px;'><input type='hidden' name='interbankBasic.items["+i+"].isPlatform' value='"+isPlatform+"' id='isPlatform' style='width:88px;'/><span>"+	
				   isPlatforms+"</span></td>"+
				   "<td><input type='text'  readonly=true name='interbankBasic.items["+i+"].underCreditMeasure' style='width:88px;' value='"+underCreditMeasure+"'/></td>"+
				   "<td><input type='text'  readonly=true name='interbankBasic.items["+i+"].underCreditName' style='width:88px;' value='"+underCreditName+"'/></td>"+
				   "<td><input type='text'  readonly=true name='interbankBasic.items["+i+"].underStartdate' style='width:88px;' value='"+underStartdate+"'/></td>"+
				   "<td><input type='text'  readonly=true name='interbankBasic.items["+i+"].underEnddate' style='width:88px;' value='"+underEnddate+"'/></td></tr>";
		
		}
		$('#tableItem tbody').html("");
		$('#tableItem tbody').html(trHtrml);
		//设置按钮可用性
		$('#modify').attr("disabled",true);
        $('#add').attr("disabled",false);
        $('#delete').attr("disabled",true);
}

function modifyUnderAsset(){
	var temp=$("#modify").attr("disabled")
	if(temp=="disabled"){
		return;
	}
	var flag=checkContent();
	if(!flag){
		return;
		}
		var financename=$("#financename").val();
		var assetAmount=getMoneyValue($("#assetAmount").val());
		var assetRate=$("#assetRate").val();
		var assetInvest=$("#assetInvest").val();
		var assetIndustry=$("#assetIndustry").val();
		var assetIndustrys=$("#assetIndustry").find("option:selected").text();
		var isBankCustomer=$("#isBankCustomer").val();
		var isBankCustomers=$("#isBankCustomer").find("option:selected").text();
		var isPlatforms=$("#isPlatform").find("option:selected").text();
		var isPlatform=$("#isPlatform").val();
		var underCreditMeasure=$("#underCreditMeasure").val();
		var underCreditName=$("#underCreditName").val();
		var underStartdate=$("#underStartdate").val();
		var underEnddate=$("#underEnddate").val();
        //更新表格行数据的对象下标
		var length = $("#tableItem tbody tr").length;
		var id_cur_index=parseInt($('#id_cur_index').val());
		//清空行
		$('#tableItem tbody').children().eq(id_cur_index).html("");
		//更新表格数据
		var	trHtrml=
		   "<td style='display:none'>"+id_cur_index+"</td>"+
		   "<td><input type='text'  readonly=true name='interbankBasic.items["+id_cur_index+"].financename' style='width:88px;' value='"+financename+"'/></td>"+
		   "<td><input type='text'  readonly=true name='interbankBasic.items["+id_cur_index+"].assetAmount' style='width:88px;' value='"+assetAmount+"'/></td>"+
		   "<td><input type='text'  readonly=true name='interbankBasic.items["+id_cur_index+"].assetRate' style='width:88px;' value='"+assetRate+"'/></td>"+
		   "<td><input type='text'  readonly=true name='interbankBasic.items["+id_cur_index+"].assetInvest' style='width:88px;' value='"+assetInvest+"'/></td>"+
		   "<td style='width:88px;'><input type='hidden' name='interbankBasic.items["+id_cur_index+"].assetIndustry' value='"+assetIndustry+"' id='assetIndustry' style='width:88px;'/><span>"+	
		   assetIndustrys+"</span></td>"+
		   "<td style='width:88px;'><input type='hidden' name='interbankBasic.items["+id_cur_index+"].isBankCustomer' value='"+isBankCustomer+"' id='isBankCustomer' style='width:88px;'/><span>"+
		   isBankCustomers+"</span></td>"+
		   "<td style='width:88px;'><input type='hidden' name='interbankBasic.items["+id_cur_index+"].isPlatform' value='"+isPlatform+"' id='isPlatform' style='width:88px;'/><span>"+	
		   isPlatforms+"</span></td>"+
		   "<td><input type='text'  readonly=true name='interbankBasic.items["+id_cur_index+"].underCreditMeasure' style='width:88px;' value='"+underCreditMeasure+"'/></td>"+
		   "<td><input type='text'  readonly=true name='interbankBasic.items["+id_cur_index+"].underCreditName' style='width:88px;' value='"+underCreditName+"'/></td>"+
		   "<td><input type='text'  readonly=true name='interbankBasic.items["+id_cur_index+"].underStartdate' style='width:88px;' value='"+underStartdate+"'/></td>"+
		   "<td><input type='text'  readonly=true name='interbankBasic.items["+id_cur_index+"].underEnddate' style='width:88px;' value='"+underEnddate+"'/></td>";
		$('#tableItem tbody').children().eq(id_cur_index).append(trHtrml);
		var index=parseInt($('#id_index').val());
		//index=index-1;
		$('#id_index').val(index); 
	
		//设置按钮可用性
		$('#modify').attr("disabled",true);
        $('#delete').attr("disabled",true);
        $('#add').attr("disabled",false);
      //清空
		clearContent();
}

$(document).ready(function() {

	/**
	 * 表格行双击事件方法
	 * */	
	$(document).on("dblclick", "#tableItem tbody tr", function() {
		//设置当前行背景色，并清除除当前行外其他行的背景色
		$(this).siblings().css("background-color","");
		$(this).css("background-color","#ffe48d");
		//设置按钮可用性
		$('#modify').attr("disabled",false);
		$('#delete').attr("disabled",true);
		//给将双击行表格的数据赋给页面控件
		$("#financename").val($(this).find("td").eq(1).find("input").val());
		$("#assetAmount").val($(this).find("td").eq(2).find("input").val());
		$("#assetRate").val($(this).find("td").eq(3).find("input").val());
		$("#assetInvest").val($(this).find("td").eq(4).find("input").val());
		$("#assetIndustry").val($(this).find("td").eq(5).find("input").val());
		$("#isBankCustomer").val($(this).find("td").eq(6).find("input").val());
		$("#isPlatform").val($(this).find("td").eq(7).find("input").val());
		$("#underCreditMeasure").val($(this).find("td").eq(8).find("input").val());
		$("#underCreditName").val($(this).find("td").eq(9).find("input").val());
		$("#underStartdate").val($(this).find("td").eq(10).find("input").val());
		$("#underEnddate").val($(this).find("td").eq(11).find("input").val());
		//设置按钮可用性
		$('#modify').attr("disabled",false);
		$('#add').attr("disabled",true);
		$('#delete').attr("disabled",true);
		//设置当前行下标
		$('#id_cur_index').val($(this).children().eq(0).text());//当前选中行下标
	});	
	
	/**
	 * 表格行单击事件方法
	 * */		
	$(document).on("click", "#tableItem tbody tr", function() {
		//设置当前行背景色，并清除除当前行外其他行的背景色
		$(this).siblings().css("background-color","");
		$(this).css("background-color","#ffe48d");
		//设置按钮可用性
		$('#modify').attr("disabled",true);
		//$('#addFlowPathItem').attr("disabled",true);
		$('#delete').attr("disabled",false);
		//设置当前行下标
		$('#id_cur_index').val($(this).children().eq(0).text());
	});	

});

function saveInterbank(){
	var startInterDate = $("#startInterDate").val();//起息日
	var maturityDate = $("#maturityDate").val();//到期日
	var matureDateInt = parseInt(maturityDate.toString().replace(new RegExp('-','g'),""));
	var startInterDateInt = parseInt(startInterDate.toString().replace(new RegExp('-','g'),""));
	if(startInterDateInt>matureDateInt){
		doTheAlert("提示","起息日不能大于到期日");
		$("#maturityDate").val('');
		return;
	}
	$.messager.confirm('提示',"确认保存?",function(r){
		if(r){
			$("#interbankBasic_input").submit();
			queryInterbankBasic();
		}
	});
	
}

$(document).on('click','#goSBSearchPage',
		function(){
			$("#departFlag").val("1");
			window.open('/cpms/linkus/capital/bond/bussiness/bondPublic/businessSearchPage',{width:'65%'});
	});
$(document).on('click','#goSBSearchPage2',
		function(){
			$("#departFlag").val("2");
			window.open('/cpms/linkus/capital/bond/bussiness/bondPublic/businessSearchPage',{width:'65%'});
	});

$(document).on('click','#goSBSearchPage3',
		function(){
			$("#departFlag").val("3");
			window.open('/cpms/linkus/capital/bond/bussiness/bondPublic/businessSearchPage',{width:'65%'});
	});

$(document).on('click','#goSBSearchPage4',
		function(){
			$("#departFlag").val("4");
			window.open('/cpms/linkus/capital/bond/bussiness/bondPublic/businessSearchPage',{width:'65%'});
	});
		
//点击机构查询按钮
$(document).on('click','#findAgencyByName',findAgencyByName);
//机构简称录入时按回车
$(document).on("keydown","#agencyName",function(event){
	if(event.keyCode==13){
		findAgencyByName();
		return false;
	}
});

function findAgencyByName(){
	var userAgent = navigator.userAgent;
	var agencyName = $('#agencyName').val();
	if(!agencyName&&userAgent.indexOf("Chrome")==-1){
		$('#result').html('');
		getTheMessager().alert("提示","请录入机构简称。",'',function(){
 			$('#agencyName').focus();
 		});
		return;
	}
	var h = "";
	var tip = $("#searchAgencyNameTip");
	setPageHandleName("close");
	tip.text("搜索中，请稍候");
	if(checkForbiddenClickFlag()){return;}
	$.ajax({
		type : "post",
		global : false,
		//async : true,
		url : '/cpms/linkus/capital/bond/bussiness/bondPublic/findAgency',
		data : {
			"agencyName":agencyName
		},
		dataType : "json",
		success : function(data) {
		 if (data != null) {
			 for(var i = 0; i < data.LIST.length; i++) {
           		var json = data.LIST[i];
            	h += '<tr id="'+json['id']+'">'+
		              '<td>'+json['name']+'</td>'+
		              '<td><input type="button" value="选择" id="h" class="btn"/></td>'+
    				  '</tr>';
             }
		 }
		 $('#result').html(h);
		 tip.text('');
		 setForbiddenClickFlag_false();
		},
		error:function(){
			doTheAlert('提示', errorTip);
			setForbiddenClickFlag_false();
		}
	});
}

//双击行选择机构
$(document).on('dblclick','#agencySearchTable tbody tr',function(){
	$(this).find("input[value='选择']").click();
});

$(document).on('click','#result input[value="选择"]',
	    function(){
	        var str = "";
	        var dealerNa="";
	        var flag="10";
	        var agencyId = $(this).parents("tr").attr("id");
	        var agencyName = $(this).parents("td").prev().text();
	        $.ajax({
	            type : "post",
	            global : false,
	            async : true,
	            url : '/cpms/linkus/capital/interbank/bussiness/interbankIvcntr/setAgency',
	            data : {
	            	"agencyName" : agencyName,
	    			"flag" : flag
	            },
	            dataType : "json",
	            success : function(data) {
	             if (data != null) {
	            	 var flags=$("#departFlag").val();
	            	 if(flags=="1"){
	            		 $("input[name='interbankBasic.creditName']").val(agencyName);
	            	 }
	            	 if(flags=="2"){
	            		 $("input[name='interbankBasic.creditAgencyName']").val(agencyName);
	            	 }
	            	 if(flags=="3"){
	            		 $("#counterpartyName").val(agencyName);
	            		 $("#counterpartyNo").val(agencyId);
	            		 $("#creditAgencyName").val(agencyName);
	        						var h1 = '';
	        						var h2 = '';
	        						var h3 = '';
	        						var h4 = '';
	        						var z = 0;
	        						if (typeof(data.details) != "undefined") {
	        							z = data.details.length;
	        						}	
	        							//custOpBankName: "中国民生银行总行"
	        							//custOpUnitName: "中国民生银行"
	        							//opBankAcctNo: "0001015360101164"
	        							//opBankNo: "305100000013"
	        								
	        							//custOpBankName: "中国民生银行股份有限公司长沙分行营业部"
	        							//custOpUnitName: "长沙银行股份有限公司"
	        							///opBankAcctNo: "694263262"
	        							//	opBankNo: "305551031017"
	        						for (var i = 0; i < z; i++) {
	        								var json1 = data.details[i];
	        								if(json1==null)	continue;
	        								h1 += "<option index='" + (i * 1 + 1)
	        										+ "' value='" + json1.opBankAcctNo
	        										+ "'>" + json1.opBankAcctNo
	        										+ "</option>";
	        								
	        								h2 += "<option index='" + (i * 1 + 1)
    										+ "' value='" + json1.custOpUnitName
    										+ "'>" + json1.custOpUnitName
    										+ "</option>";
	        								
	        								h3 += "<option index='" + (i * 1 + 1)
    										+ "' value='" + json1.custOpBankName
    										+ "'>" + json1.custOpBankName
    										+ "</option>";
	        								
	        								h4 += "<option index='" + (i * 1 + 1)
    										+ "' value='" + json1.opBankNo
    										+ "'>" + json1.opBankNo
    										+ "</option>";

	        						}
	        						$("#transCoutertyAcctNo").html(h1);
	        						$("#transCoutertyAcctName").html(h2);
	        						$("#custOpBankName").html(h3);
	        						$("#counterpartyOpBkNo").html(h4);

	            	 }
	            	 if(flags=="4"){
	            		 $("#DSacceptBankNo").val(agencyName);
	            		 $("#DSacceptBankId").val(agencyId);
	            	 }
	                	closePage();
	            	 }
	            },
				error:function(){
					doTheAlert('提示', errorTip);
				}
	        });
	    });

function clearContent(){
	$("#financename").val("");
	$("#assetAmount").val("");
	$("#assetRate").val("");
	$("#assetInvest").val("");
	$("#assetIndustry").val("");
	$("#isBankCustomer").val("");
	$("#isPlatform").val("");
	$("#underCreditMeasure").val("");
	$("#underCreditName").val("");
	$("#underStartdate").val("");
	$("#underEnddate").val("");
}

function checkContent(){
	var flag=true;
	if($("#financename").val()==""||$("#assetAmount").val()==""
		||$("#assetRate").val()==""||$("#assetInvest").val()==""
		||$("#assetIndustry").val()==""||$("#isBankCustomer").val()==""
		||$("#isPlatform").val()==""||$("#underCreditMeasure").val()==""
		||$("#underCreditName").val()==""||$("#underStartdate").val()==""){
		doTheAlert('提示', "请填写完整的数据!");
		flag=false;
	}
	return flag;
}
function firstChange(currFirst){
	busitypeArray =new Array();
	busitypeArray[0]=new Array("银行机构类","本行结构化融资|本行产业投资基金|本行城市发展基金|本行票据资管|银行理财|协议存款|非银存款|企业存单质押|受让他行资产|交易所ABS|私募ABS|直投项目|资产池|其它");
	busitypeArray[1]=new Array("证券公司类","券商主动管理产品|固定收益凭证|两融收益权|质押式回购债权|资产池|交易所ABS|私募ABS|其它");
	busitypeArray[2]=new Array("信托公司类","信托主动管理产品|信托单一项目|资产池|交易所ABS|私募ABS|其它");
	busitypeArray[3]=new Array("租赁公司类","权益转让及回购|交易所ABS|私募ABS|其它");
	busitypeArray[4]=new Array("保险公司类","履约保证保险|交易所ABS|私募ABS|其它");
	busitypeArray[5]=new Array("资管公司类","资产管理公司债权|交易所ABS|私募ABS|其它");	
	busitypeArray[6]=new Array("其他","金融市场部委投|其它");

	var currentFirst=currFirst;
	var i,j,k;
	
	document.all.secondBusiType.length=0;
	for(i=0;i<busitypeArray.length;i++){
		if(busitypeArray[i][0]==currFirst){
			tmpBusitypeArray = busitypeArray[i][1].split("|");
			for(j=0;j<tmpBusitypeArray.length;j++){
				document.all.secondBusiType.options[document.all.secondBusiType.length]=new Option(tmpBusitypeArray[j],tmpBusitypeArray[j]);
			}
			return;
		}
		
	}
	
}
function initSecondType(){
	var firstBusiType=$("#firstBusiType").val();
	firstChange(firstBusiType);
	$("#secondBusiType").removeAttr("onMousedown");
}


 
$(document).on('click','#btn_import1',function() {
		 //每次导入前清空文件名称方可导入
		$("#fileUpload1").val("");
		//导入数据
		$("#fileUpload1").click();
	});
	
$(document).on('change', '#fileUpload1', function() {
		//同业本行投资第三方授信信息
		var uploadName=$('#fileUpload1').val();
		var trHtml="";
		$.ajaxFileUpload({
			url : "/cpms/linkus/capital/interbank/base/interbankBasic/importData?uploadName="+$("#fileUpload1").val(),
			type : "post",
			global : false,
			secureuri : false,
			fileElementId : 'fileUpload1',
			dataType : 'json',
			success : function(data) {
				var len = data.list.length;
				var index=$('#tableItem tbody tr').length;
				if(len<=1){
					doTheAlert('提示', "模板没有数据!");
					return;
				}
				for(var i = 1; i<len;i++){
						json = data.list[i];
						trHtml=trHtml+
							   "<tr><td style='display:none'>"+index+"</td>"+
							   "<td><input type='text'  readonly=true name='interbankBasic.items["+index+"].financename' style='width:88px;' value='"+data.list[i].financename+"'/></td>"+
							   "<td><input type='text'  readonly=true name='interbankBasic.items["+index+"].assetAmount' style='width:88px;' value='"+data.list[i].assetAmount+"'/></td>"+
							   "<td><input type='text'  readonly=true name='interbankBasic.items["+index+"].assetRate' style='width:88px;' value='"+data.list[i].assetRate+"'/></td>"+
							   "<td><input type='text'  readonly=true name='interbankBasic.items["+index+"].assetInvest' style='width:88px;' value='"+data.list[i].assetInvest+"'/></td>"+
							   "<td style='width:88px;'><input type='hidden' name='interbankBasic.items["+index+"].assetIndustry' value='"+data.list[i].assetIndustry+"' id='assetIndustry' style='width:88px;'/><span>"+	
							   data.list[i].assetIndustryLabel+"</span></td>"+
							   "<td style='width:88px;'><input type='hidden' name='interbankBasic.items["+index+"].isBankCustomer' value='"+data.list[i].isBankCustomer+"' id='isBankCustomer' style='width:88px;'/><span>"+
							   data.list[i].isBankCustomerLabel+"</span></td>"+
							   "<td style='width:88px;'><input type='hidden' name='interbankBasic.items["+index+"].isPlatform' value='"+data.list[i].isPlatform+"' id='isPlatform' style='width:88px;'/><span>"+	
							   data.list[i].isPlatformLabel+"</span></td>"+
							   "<td><input type='text'  readonly=true name='interbankBasic.items["+index+"].underCreditMeasure' style='width:88px;' value='"+data.list[i].underCreditMeasure+"'/></td>"+
							   "<td><input type='text'  readonly=true name='interbankBasic.items["+index+"].underCreditName' style='width:88px;' value='"+data.list[i].underCreditName+"'/></td>"+
							   "<td><input type='text'  readonly=true name='interbankBasic.items["+index+"].underStartdate' style='width:88px;' value='"+data.list[i].underStartdate+"'/></td>"+
							   "<td><input type='text'  readonly=true name='interbankBasic.items["+index+"].underEnddate' style='width:88px;' value='"+data.list[i].underEnddate+"'/></td></tr>";
								index++;
				}
				 $('#id_index').val(index);
				 $('#tableItem tbody').append(trHtml);
			}
			});

});

$(document).on('change','#transCoutertyAcctName, #transCoutertyAcctNo,#custOpBankName,#counterpartyOpBkNo', function(event) {
	//定义 四个联动的对手方信息Id（跟控件的id一样）
	//通过 id(传来的参数)的 change，令另外三个联动显示值（开户行名称，资金账号，开户名，开户行行号)
	//取得当前select选中的index值
	var id = $(this).attr("id");
	var index = $("#" + id + " option:selected").attr("index");
	var arry = "transCoutertyAcctName-transCoutertyAcctNo-custOpBankName-counterpartyOpBkNo";
	var obj = arry.split("-");
	for (var i = 0; i < obj.length; i++) {
		if (id != obj[i]) {
			$("#" + obj[i] + " option").removeAttr('selected');
			$("#" + obj[i] + " option[index='" + index + "']").attr('selected', true);
			$("#" + obj[i]).val($("#" + obj[i] + " option[index='" + index + "']").val());
		}
	}
});

//显示掩藏第三方信息
$(document).on('change','#occupyLimitType',function(){
	if($('#occupyLimitType').is(':checked')==false){//判断是否选中
		$('#div1').show();
		$("#div2").hide();
		$("#creditAgencyName").val("");
		$('#numId').val('1');
	}else{
		$('#div1').hide();
		$("#div2").show();
		$("#creditAgencyName").val($("#counterpartyName").val());
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
	var numId=$(':input[name="checkname"]').length;//数据条数
	var h="";
	//判断是否是为新增	
	if(str=="") {
		var DSacceptBankId=$('#DSacceptBankId').val();//获取第三方ID
		//更新序号以及下标
		var num=$(':input[name="checkname"]').length;//数据条数
		if(num>0){
			ok:for(var i=0;i<num;i++){
				var acceptBankCode=$('#inputCO'+i).val();//获取第三方ID
				if(DSacceptBankId==acceptBankCode){
					doTheAlert("提示","已经添加该第三方!");
					$('#DStransAmount').val("");
					$('#DSacceptBankNo').val("");
					$('#DSacceptBankId').val("");
					return;
					}
				}
		}
		if(DSacceptBankNo!=""&&DStransAmount!="") {
			h ='<tr id="table'+numId+'"onclick="getLine('+numId+')">'+			
	       	'<td><center><input onclick="getLine('+numId+')" id="checkname'+numId+'" name="checkname" type="checkbox" value="'+numId+'"><input readonly=true style="width: 31px;" id="input_str'+numId+'" value="'+(numId+1)+'"/></center></td>'+			
	       	'<td id="transAmount'+numId+'"><center><input type=hidden name="interbankBasic.creditItems['+numId+'].creditAmount" id="inputTR'+numId+'" value="'+getMoneyValue(DStransAmount)+'" /></center><span>'+moneyEncoder(DStransAmount)+'</span></td>'+
	       	'<td id="acceptBankNo'+numId+'"><center><input  id="inputNO'+numId+'" readonly=true value="'+DSacceptBankNo+'"/></center></td>'+
	       	'<td id="acceptBankCode'+numId+'"><center><input name="interbankBasic.creditItems['+numId+'].creditAgencyid" id="inputCO'+numId+'" readonly=true value="'+DSacceptBankId+'"/></center></td>'+
	       	'</tr>';
			 $('#tabbody').append(h);
		} else {
			doTheAlert("提示","请填写完整信息！！");
		}
	} else {
		
		$('#inputTR'+str).val(getMoneyValue(DStransAmount)).change();//修改金额
		$('#transAmount'+str).find("span").text(DStransAmount);
		$('#inputNO'+str).val(DSacceptBankNo);//修改第三方
		$('#inputCO'+str).val(DSacceptBankId);//修改第三方ID
	}
	$('#DStransAmount').val("");
	$('#DSacceptBankNo').val("");
	$('#DSacceptBankId').val("");
	$(':input[name="checkname"]').prop("checked", false);
	$('#hiId').html("");//设置修改隐藏域
	$('#goSBSearchPage4').hide();//隐藏查询按钮
	document.getElementById("DStransAmount").readOnly="true";//置灰金额输入框
});

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
	var N=0;
	if(num>0){
		ok:for(var i=0;i<num;i++){
			var transAmount=$('#inputTR'+i).val();//获取金额
			var acceptBankCode=$('#inputCO'+i).val();//获取第三方ID
			var acceptBankNo=$('#inputNO'+i).val();//获取第三方ID
			if(transAmount==undefined){
				i=i+1;
				 transAmount=$('#inputTR'+i).val();
				 acceptBankCode=$('#inputCO'+i).val();
				 acceptBankNo=$('#inputNO'+i).val();
				 if(transAmount==undefined){
					 num=num+1;
					 continue ok;
				 }
			}
			h += '<tr id="table'+N+'"onclick="getLine('+N+')">'+			
		   	'<td><center><input onclick="getLine('+N+')" id="checkname'+N+'" name="checkname" type="checkbox" value="'+N+'"><input readonly=true style="width: 31px;" id="input_str'+N+'" value="'+(N+1)+'"/></center></td>'+			
		   		              '<td id="transAmount'+N+'"><center><input type=hidden name="interbankBasic.creditItems['+N+'].creditAmount" id="inputTR'+N+'" readonly=true value="'+transAmount+'"/></center><span>'+moneyEncoder(transAmount)+'</span></td>'+
		   		              '<td id="acceptBankNo'+N+'"><center><input  id="inputNO'+N+'" readonly=true value="'+acceptBankNo+'"/></center></td>'+
		   		              '<td id="acceptBankCode'+N+'"><center><input name="interbankBasic.creditItems['+N+'].creditAgencyid" id="inputCO'+N+'" readonly=true value="'+acceptBankCode+'"/></center></td>'+
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
		$('#goSBSearchPage4').show();
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
			$('#goSBSearchPage4').hide();//隐藏第三方查询按钮
	}
	$(':input[name="checkname"]').prop("checked", false);
});


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
		url : "/cpms/linkus/capital/interbank/bussiness/T50012InterBank/importData?uploadName="+$("#fileUpload").val(),
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
                   	'<td><center><input onclick="getLine('+str+')" id="checkname'+str+'" name="checkname" type="checkbox" value="'+str+'"><input readonly=true style="width: 31px;" id="input_str'+str+'" value="'+(str+1)+'"/></center></td>'+			
                   		              '<td id="transAmount'+str+'"><center><input type=hidden name="interbankBasic.creditItems['+str+'].creditAmount" id="inputTR'+str+'" readonly=true value="'+json['transAmount']+'" /></center><span>'+moneyEncoder(json['transAmount'])+'</span></td>'+
                   		              '<td id="acceptBankNo'+str+'"><center><input  id="inputNO'+str+'" readonly=true value="'+json['acceptBankNo']+'"/></center></td>'+
                   		              '<td id="acceptBankCode'+str+'"><center><input name="interbankBasic.creditItems['+str+'].creditagencyid" id="inputCO'+str+'" readonly=true value="'+json['acceptBankCode']+'"/></center></td>'+
                   		           	  '</tr>';	
					 }
			 $('#tabbody').append(h);
		}
		});

});


function getLine(str){
	var str=str;
	if($('#checkname'+str).is(':checked')==true){//判断是否选中
		$('#checkname'+str).prop("checked", false);
	}else{
		$('#checkname'+str).prop("checked", true);
	}
	findCellAll();//当全选则选定全选按钮
}

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
*同业本行投资-计提利息
*改变金额、利率、计提基础计算利息
* @author 陈阳妙
* @description
* @return
* @modified
*/		
//计提利息
$(document).on('blur', '#startTransAmount,#realRate,#interestAccruedBasis', function() {
	rateInof();
});


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

$(document).on('blur', '#underStartdate,#underEnddate', function() {
	//到期日期
	var maturityDate =new Date($("#underEnddate").val());
	//起息日期
	var startInterDate =new Date($("#underStartdate").val());
	if(maturityDate-startInterDate<0){
		doTheAlert("提示","起息日必须小于到期日！");
		$("#underEnddate").val($("#underStartdate").val());
		return;
	}
	rateInof();
});

function rateInof(){
	var interestAccruedBasis=$("#interestAccruedBasis").val();//利息计提基础
	if(interestAccruedBasis=='360'||interestAccruedBasis=='365'){
		var faceAmount=getMoneyValue($("#startTransAmount").val());
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

