


function checkTeamName(){
	var viTeamName=$('#teamName').val();
	$.ajax({
		type : "post",
		global : false,
		async : true,
		url : '/cpms/linkus/capital/bond/base/bondTeam/checkTeamName?viTeamName='+viTeamName,
		dataType : "json",
		success : function(data) {
		 	if (data != null) {
				if(typeof(data.msg) !="undefined" && data.msg=="1"){
					doTheAlert("提示","资产组合名称已存在！");
					$('#teamName').val('');
					return false;
				}
			}
		},
		error:function(){
			doTheAlert('提示', errorTip);
		}
	});		
}

/**
 * 债券资金组合js处理文件
 * 
 */
 $(function(){
 	
 	//-------------跳转 用户查询 页面添加用户
 	$(document).on('click','#btn_addUser',function(){
// 		window.open("/cpms/linkus/capital/bond/base/bondTeam/chooseUser",{width:'40%'});
 		window.open("/cpms/linkus/capital/bond/base/bondTeam/userSearchPage",{width:'60%'});
 	});
 	
 	//-------------删除用户
 	$(document).on('click','#btn_deleteUser',function(){
 		var index1 =$('#nameRadio:checked').val();
 		var input = $("input[name='bondTeam.userList["+index1+"].userName']");
 		var name = input.parent().children().eq(0).children().val();
 		if($('input[name="nameRadio"]').is(':checked')==false){//判断是否选中
			doTheAlert("提示","请选择一个用户!");	
			return;
		}else{
			getTheMessager().confirm("提示",'确定要删除  "'+name+'" 用户吗?',function(e){
				if(e){
					input.parent().remove();//删除
					var length = $("#userbody tr").length;//数据条数
					var result="";
					var index = 0;
					if(length>0){
						ok:for(var i=0;i<length;i++){
							var $username = $("#userbody input[name='bondTeam.userList["+i+"].userName']")
							var userName = $username.val();//用户id
							var name = $username.prev().prev().children().val();//用户姓名
							
							if(userName==undefined){
								i=i+1;
								var $username = $("#userbody input[name='bondTeam.userList["+i+"].userName']")
								var userName = $username.val();
								var name = $username.prev().prev().children().val();
								length=length+1;
								if(userName==undefined){
									continue ok;
							 	}
							}
							result += '<tr>'+
					 					'<td><input name="" readOnly=true value="'+name+'"></input></td>'+
					 					'<td><input type="radio" id="nameRadio" name="nameRadio"value="'+index+'"></input></td>'+
					 					'<input type="hidden" name="bondTeam.userList['+index+'].userName" value="'+userName+'"/>'
					 				  '</tr>';
							index+=1;
						}
					}
					$('#userbody').html(result);
					$("#userbody tr input").attr('readonly','');
				}
			});
		}
 	});
 	
// 	$(document).on('click','#goUserSearchPage',function(){
// 		//跳转选择用户页面
// 		window.open("/cpms/linkus/capital/bond/base/bondTeam/userSearchPage",{width:'60%'});
// 	});
 	
 	//---------------------------------------------查询用户
 	$(document).on('click','#searchUser',function(){
 		var userPageName = $("#userPageName").val();
 		var h;
 		$.ajax({
				type : "post",
				global : false,
				async : true,
				url : '/cpms/linkus/capital/bond/base/bondTeam/findUserInfo',
				data : {
					"userPageName":userPageName
				},
				dataType : "json",
				success : function(data) {
				 if (data != null) {
				 for(var i = 0; i < data.userList.length; i++) {
	                   	var json = data.userList[i];
                    	h +=  '<tr>'+
	                    		  '<td>'+json['username']+'</td>'+
					              '<td>'+json['name']+'</td>'+
					              '<td><input type="button" value="选择" id="h" class="btn"/></td>'+
	        				  '</tr>';
	               }	
				 }
				 $('#tabbody').html(h);
				},
				error:function(){
					doTheAlert('提示', errorTip);
				}
			});
 	});
 	
 	//---------------------------------------------选择用户
 	$(document).on('click','#tabbody input[value="选择"]',function(){
 		var index = $("#userbody tr").length;
 		var userName = $(this).parents("td").prev().prev().text();//用户ID
		var name = $(this).parents("td").prev().text();//用户名
 		var result;
 		
 		result += '<tr>'+
 					'<td><input name="" readOnly=true value="'+name+'"></input></td>'+
 					'<td><input type="radio" id="nameRadio" name="nameRadio"value="'+index+'"></input></td>'+
 					'<input type="hidden" name="bondTeam.userList['+index+'].userName" value="'+userName+'"/>'
 				  '</tr>';
 		$("#userbody").append(result);
 		closePage();
 	});
 	
 	//保存前的校验与数据处理
 	$(document).on('click','#bondTeamSave',function(){
		var requireds = $("#projectView_finProject .required");
		for(var i=0;i<requireds.length;i++){
			if(!requireds.eq(i).val()){
				doTheAlert("提示","请录入"+requireds.eq(i).parents("div .controls").prev().text());
				return;
			}
		}
		if(!$("#teamType").val()){
			doTheAlert("提示","请选择投组四分类");	
			return;
		}
		//不用必选联系人
 		/*if($('input[name="nameRadio"]').is(':checked')==false){//判断是否选中
			doTheAlert("提示","请选择一个联系人!");	
			return;
		}*/
		var editDate = parseInt($("#editDate").val().toString().replace(new RegExp('-','g'),""));
		var effectiveDate = parseInt($("#effectiveDate").val().toString().replace(new RegExp('-','g'),""));
		if(effectiveDate<editDate){
			doTheAlert("提示","生效截止日期不能小于设置日期!");
			return;
		}
		//判断是否选用户
		var userbodytr = $("#userbody tr");
		if(userbodytr.length==0){
			doTheAlert("提示","请选择至少一个用户!");
			return;
		}
		//将选中的联系人用户名赋值到隐藏域提交
		var index =$('#nameRadio:checked').val();
		var linkName = $("input[name='bondTeam.userList["+index+"].userName']").val();
		$("input[name='bondTeam.linkName']").val(linkName);
		$("#btndoSave").click();
 	});
 	
 });
 
$(document).on('blur','#floatingLossGainRatio',function(){
	var reg = new RegExp('^[-+]?[0-9]+(\.[0-9]+)?$');
	var str = $(this).val();
	var flag=reg.test(str);
	if(!flag){
		doTheAlert("提示","数据输入不正确!");
	}
});