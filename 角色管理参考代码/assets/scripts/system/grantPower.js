
$(document).ready(function() {
	
	   $('#editGrantPower').click(function(event) {
        var length = $("#grantPower_form table tbody tr").length;
        var selectLength=0;//总行数
        var selectedRow=0;//被选中行的下标
        //计算总行数
        for (var i = 0; i < length; i++) {
            var select = $("#grantPower_form table tbody").find("tr").eq(i).attr("class");
            if (select == "selected") {
                selectedRow=i;
                selectLength++;
            }
        }
        //校验如果selectLength=0则表示没选中一行，如果selectLength>1表示选中了多行
        if(selectLength<1){
            doTheAlert("提示","请表格中勾选中一条记录！");
            return false;
        }else if(selectLength>1){
            doTheAlert("提示","只能勾选中一个条记录进行编辑！");
            return false;
        }else if(selectLength==1){
            var tr = $("#grantPower_form table tbody").find("tr").eq(selectedRow);
            //var checkId = tr.find("td")[0].childNodes[0].value;
            var checkGrantId = tr.find("td")[0].childNodes[0].value;
            window.open("/cpms/linkus/capital/system/grantPower/edit?grantPowerId="+checkGrantId,{width:'710px'});
        }
    });
    
   $('#delGrantPower').click(function(event) {
        var length = $("#grantPower_form table tbody tr").length;
        var selectLength=0;//总行数
        var selectedRow=0;//被选中行的下标
        //计算总行数
        for (var i = 0; i < length; i++) {
            var select = $("#grantPower_form table tbody").find("tr").eq(i).attr("class");
            if (select == "selected") {
                selectedRow=i;
                selectLength++;
            }
        }
        //校验如果selectLength=0则表示没选中一行，如果selectLength>1表示选中了多行
        if(selectLength<1){
            doTheAlert("提示","请表格中勾选中一条记录！");
            return false;
        }else if(selectLength>1){
            doTheAlert("提示","只能勾选中一个条记录进行操作！");
            return false;
        }else if(selectLength==1){
            var tr = $("#grantPower_form table tbody").find("tr").eq(selectedRow);
            //var checkId = tr.find("td")[0].childNodes[0].value;
            var checkGrantId = tr.find("td")[0].childNodes[0].value;
            $.ajax({
                type : "post",
                global : false,
                async : true,
                url : '/cpms/linkus/capital/system/grantPower/delete?grantPowerId='+checkGrantId,
                dataType : "json",
                success : function(data) {
                    doTheAlert("提示",data.tip);
                    $('#id_querygrantPower').click();
                },
                error:function(){
                    doTheAlert("提示","删除失败！");
                }
            });
        }
    });
	
$(document).on('click', '#addGrantPower',function() {
   	var departmentCode   = $("#departmentCode").val();	
   	var agencyName = $("#agencyName").val();
    
	if(departmentCode==null||departmentCode==''){
		doTheAlert("提示","请选择机构！");
	}
	else{
		window.open("/cpms/linkus/capital/system/grantPower/input?departmentCode="+departmentCode+"&agencyName="+agencyName);
	}
});

//    $(document).on('blur', '#grantPower_input [name="grantPower.empowAmount"]', function() {
//				var t = $(this);
//				temp=t.val()+"";
//				if(temp.indexOf(".")==0){
//					t.val("");
//					return true;
//				}
//				var tempAmount=moneyDecoder(t.val());
//				var fuhao="";
//				if(tempAmount.length>0){
//					if(tempAmount.substring(0,1)=="-"){
//						fuhao="-";
//					}
//				}					
//				tempAmount=tempAmount.replace(/[^\d.]/g,'');
//				t.val(moneyEncoder(tempAmount));
//				if(fuhao=="-"&&$(this).attr("readonly")){
//					t.val("-"+t.val());
//				}    	
//        validateGrant("empowAmount");
//    });

    var selecBusiType = '#grantPower_input [name="grantPower.busiType"]';
    $(document).on('change', selecBusiType, function() {
        validateGrant("busiType");
    });
 
     var url;    
    $(document).on('click', 'span.glyphicon.glyphicon-download-alt', function(ev) {
        var departmentCode = $("#departmentCode").val();
        if(departmentCode){
            url = this.parentNode.formAction;
            if(url.indexOf("departmentCode") < 0){
                url += "?departmentCode="+departmentCode;
            }
            this.parentNode.formAction = url;
        }else{
            this.parentNode.formAction = "";
            doTheAlert("提示","请先选择一个机构！");
        }
    }); 


});
    function validateGrant(selectName){
    	var selector = "[name='grantPower."+selectName+"']";
    	var returnFlag=false;
      $.ajax({
        type : "post",
        global : false,
        async : false,
        url : '/cpms/linkus/capital/system/grantPower/validatePower',
        data : {
            departmentCode : $('[name="grantPower.departmentCode"]').val(),
            busiType : $('[name="grantPower.busiType"]').val(),
            empowAmount : getMoneyValue($('[name="grantPower.empowAmount"]').val()),
            grantPowerId : $('[name="grantPower.id"]').val(),
            validateType : selectName
        },
        dataType : "json",
        success : function(data) {
            if (data != null) {
                var errorMessage = data['errorMessage'];
                if(errorMessage != ""){
                	if(selectName=="busiType"){
                    	$("#grantPower_input_0").attr("disabled", "disabled");
                	}
                    if(selectName != 'empowAmount'){
                        $('#grantPower_input [name="grantPower.empowAmount"]').attr("readonly", "readonly");
                    }
                    getTheMessager().alert("提示",errorMessage,'',function(){
                            $(selector).focus();
                        });
                    returnFlag= false;
                }else{
                	$('#grantPower_input [name="grantPower.empowAmount"]').removeAttr("readonly");
                    if(selectName=="busiType"){
                    	$("#grantPower_input_0").removeAttr("disabled");
                    }
                    returnFlag= true;
                }
            }
        }
    });
    return returnFlag;
    }
    
    function checkGrantPower(){

//    	if(!validateGrant('busiType')){
//    		return false;
//    	}else{
    		if(!validateGrant('empowAmount')){
    			return false;
    		}else{
    			$('#grantPower_input').submit();
    			//return true;
    		}
//    	}
    	
    }
function clickGrantPowerNode(node){
	var from1 = $('form.criteria');
	if (from1 && from1.length >= 0) {
		var from2 = from1[from1.length - 1];
		var id = from2.id;
		var actionBase = "/cpms/linkus/capital/system/grantPower?departmentCode="+node.departmentCode;
		$("#" + id)[0].action = actionBase;
		$("#" + id).trigger("submit");
	}
	document.getElementById("departmentCode").value=node.departmentCode;
	document.getElementById("agencyName").value=node.name;
}

Observation.grantPower = function(container) {
    $('#grantPower_input', container).each(function() {
        var form = this;
        form.onsuccess = function() {
            $('.ui-dialog-titlebar-close', $(form).closest('.ui-dialog')).click();
            $('#id_querygrantPower').click();
        }
    });
}

function querygrantPower(){
    var from1 = $('form.criteria');
    if (from1 && from1.length >= 0) {
        var from2 = from1[from1.length - 1];
        var id = from2.id;
        var actionBase = "/cpms/linkus/capital/system/grantPower";
        var departmentCode=$('#departmentCode').val();
        actionBase=actionBase+"?departmentCode="+ departmentCode;
        $("#" + id)[0].action = actionBase;
        $("#" + id).trigger("submit");
    }
}


function openWindow(id){
   window.open('/cpms/linkus/capital/authority/paAgency/toSearch?');
   afterShowAddFocus();
}

var addFocus_flag;
function afterShowAddFocus(){
    addFocus_flag = false;
            addFocus();
}
//打开查询票据页面时实时检查    页面加载完成时结束检查    给date赋disabled
    
    function addFocus(){
            if(addFocus_flag) return;
            //方法部分
            if($('#flag').length){
                //结束递归
                addFocus_flag = true;
                $("#agencyName").focus();
            }
            //递归
        setTimeout(addFocus,100);
    }
    
    function closeWindow(){
     $('.ui-dialog:visible').last()
                    .find('.ui-dialog-titlebar-close').click();
    }
    
    function getAgency(){
    var agency = $('#controls-agencyName');
    var agencyName = agency[0].childNodes[1].value;
    var h = "";
    $.ajax({
            type : "post",
            global : false,
            async : false,
            url : '/cpms/linkus/capital/authority/paAgency/search',
            data : {
                "agencyName":agencyName
            },
            dataType : "json",
            success : function(data) {
             if (data != null) {
             for(var i = 0; i < data.LIST.length; i++) {
                        var json = data.LIST[i];
                        h += '<tr id="'+i+'">'+
                              '<td>'+json['name']+'</td>'+
                              '<td><input type="button" value="选择" id="h" class="btn" onclick="setAgency(\''+json['acctNoAgencyId']+'\',\''+json['name']+'\')" /></td>'+
                              '</tr>';
               }    
             }
             $('#result').html(h);
                  
            }
        });
}
function setAgency(agencyId,agencyName){
    if(agencyId&&agencyName){
        closeWindow();
        document.getElementById("departmentCode").value=agencyId;
        document.getElementById("agencyName").value=agencyName;
        var from1 = $('form.criteria');
        if (from1 && from1.length >= 0) {
            var from2 = from1[from1.length - 1];
            var id = from2.id;
            var actionBase = "/cpms/linkus/capital/system/grantPower?departmentCode="+agencyId;
            $("#" + id)[0].action = actionBase;
            $("#" + id).trigger("submit");
        }
    }
}


$(document).on('keypress','#agencyName',function(){
    var keycode=event.keyCode;
    if(keycode==13){
        getAgency();
    }
});