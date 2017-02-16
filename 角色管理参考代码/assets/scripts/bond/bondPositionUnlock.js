/*************************************************************************************************
/* DESC       ：债券持仓人工解锁ＪＳ处理文件                                                                                                                                                                                 
/* AUTHOR     ：大资管平台项目组                                                                                                                                                                                 
/* CREATE     ：2016-11-11                                     
/* MODIFYLIST ： Name          Date         Reason                                                
/*              yourName      updateDate    modiReason                                               
/*              -------------------------------------------------------------   
*************************************************************************************************/
var curBondCode;

$(document).on('click','#findContractByBondCode',
	function(){
		var bondCode = $("#bondCode").val();
		if (bondCode == null || bondCode == ""){
			doTheAlert("提示", "债券代码不能为空！")
			//$("#bondCode").focus();
			return;
		}
		GetBondCodeLocker(bondCode, false);
	});

$(document).on('click','#result input[value="解锁"]',
	function(){
		var bookId = $(this).parents("tr").attr("id");
		getTheMessager().confirm('确认',"是否解锁",function(flag){
			if(flag){
				$.ajax({
					type : "post",
					global : false,
					async : true,
					url : '/cpms/linkus/capital/bond/bussiness/bondPositionUnlock/unlockBook',
					data : {
						"bookId":bookId
					},
					dataType : "json",
					success : function(data) {
						if (data != null) {
							if (curBondCode != null){
								GetBondCodeLocker(curBondCode, true);
							}
						}
					},
					error:function(){
						doTheAlert('提示', errorTip);
					}
				});
			}
		});
	});

//回车事件
$(document).on("keydown","#bondCode",function(event){
	if(event.keyCode==13){	
		$('#findContractByBondCode').click();
	}
});

function GetBondCodeLocker(bondCode, delFlag){
	$('#result').children().remove();
	var h = "";
	$.ajax({
		type : "post",
		global : false,
		//async : true,
		url : '/cpms/linkus/capital/bond/bussiness/bondPositionUnlock/findByBondCode',
		data : {
			"bondCode":bondCode
		},
		dataType : "json",
		success : function(data) {
			if (data != null) {
				if (data.LIST.length == 0){
					if (!delFlag)
						doTheAlert('提示', "该债券无锁定的持仓");
					curBondCode = null;
					return;
				}
				curBondCode = bondCode;
				for(var i = 0; i < data.LIST.length; i++) {
					var json = data.LIST[i];
					h += '<tr id="'+json['bookid']+'">'+
		              '<td>'+json['bondcode']+'</td>'+
		              '<td>'+json['bondname']+'</td>'+
		              '<td>'+json['locker']+'</td>'+
		              '<td><input type="button" value="解锁" id="h" class="btn"/></td>'+
    				  '</tr>';
				}
			}
			$('#result').html(h);
		},
		error:function(){
			doTheAlert('提示', errorTip);
		}
	});
}