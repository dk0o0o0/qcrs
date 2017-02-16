function querygrantCredit(){
    var from1 = $('form.criteria');
    if (from1 && from1.length >= 0) {
        var from2 = from1[from1.length - 1];
        var id = from2.id;
        var actionBase = "/cpms/linkus/capital/system/grantCredit";
        var agencyId=$('#agencyId').val();
        actionBase=actionBase+"?agencyId="+ agencyId;
        $("#" + id)[0].action = actionBase;
        $("#" + id).trigger("submit");
    }
}


function clickGrantCreditNode(node){
    var from1 = $('form.criteria');
    if (from1 && from1.length >= 0) {
        var from2 = from1[from1.length - 1];
        var id = from2.id;
        var actionBase = "/cpms/linkus/capital/system/grantCredit?agencyId="+node.id;
        $("#" + id)[0].action = actionBase;
        $("#" + id).trigger("submit");
    }
    document.getElementById("agencyId").value=node.id;
    document.getElementById("agencyName").value=node.name;
    
}

Observation.grantCredit = function(container) {
    $('#grantCredit_input', container).each(function() {
        var form = this;
        form.onsuccess = function() {
            $('.ui-dialog-titlebar-close', $(form).closest('.ui-dialog')).click();
            $('#id_querygrantCredit').click();
        }
    });
}
$(document).ready(function() {
	$('#editGrantCredit').click(function(event) {
        var length = $("#grantCredit_form table tbody tr").length;
        var selectLength=0;//总行数
        var selectedRow=0;//被选中行的下标
        //计算总行数
        for (var i = 0; i < length; i++) {
            var select = $("#grantCredit_form table tbody").find("tr").eq(i).attr("class");
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
            var tr = $("#grantCredit_form table tbody").find("tr").eq(selectedRow);
            //var checkId = tr.find("td")[0].childNodes[0].value;
            var checkGrantId = tr.find("td")[0].childNodes[0].value;
            window.open("/cpms/linkus/capital/system/grantCredit/edit?grantCreditId="+checkGrantId,{width:'710px'});
        }
    });
    
   $('#delGrantCredit').click(function(event) {
        var length = $("#grantCredit_form table tbody tr").length;
        var selectLength=0;//总行数
        var selectedRow=0;//被选中行的下标
        //计算总行数
        for (var i = 0; i < length; i++) {
            var select = $("#grantCredit_form table tbody").find("tr").eq(i).attr("class");
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
            var tr = $("#grantCredit_form table tbody").find("tr").eq(selectedRow);
            //var checkId = tr.find("td")[0].childNodes[0].value;
            var checkGrantId = tr.find("td")[0].childNodes[0].value;
            $.ajax({
                type : "post",
                global : false,
                async : true,
                url : '/cpms/linkus/capital/system/grantCredit/delete?grantCreditId='+checkGrantId,
                dataType : "json",
                success : function(data) {
                	getTheMessager().alert("提示",data.tip,'',function(){
                                $('#id_querygrantCredit').click();
                            });
                },
                error:function(){
                    doTheAlert("提示","删除失败！");
                    return false;
                }
            });
        }
    });
	
    $(document).on('click', 'button[name="query_matching"]', function() {
        var from1 = $('form.criteria');
        if (from1 && from1.length >= 0) {
            var from2 = from1[from1.length - 1];
            var id = from2.id;
            var actionBase = "./matchingQuery?a=1";
            if (prodCode != null && prodCode != '') {
                actionBase = actionBase + "&prodCode-op=EQ&prodCode="
                        + prodCode;
            }
            $("#" + id)[0].action = actionBase;
            $("#" + id).trigger("submit");
        }
    });
    
$(document).on('click', '#addGrantCredit',function() {
    var agencyId   = $("#agencyId").val();  
    var agencyName = $("#agencyName").val();
    if(agencyId==null||agencyId==''){
        doTheAlert("提示","请选择机构！");
    }
    else{
        window.open("/cpms/linkus/capital/system/grantCredit/input?agencyId="+agencyId+"&agencyName="+encodeURI(agencyName));
    }
});

    var selecBusiType = '#grantCredit_input [name="grantCredit.busiType"]';
    $(document).on('change', selecBusiType, function() {
        validateGrant("busiType");
    });
    var url;    
    $(document).on('click', 'span.glyphicon.glyphicon-download-alt', function(ev) {
    	var agencyId = $("#agencyId").val();
        if(agencyId){
            url = this.parentNode.formAction;
            if(url.indexOf("agencyId") < 0){
                url += "?agencyId="+agencyId;
            }
            this.parentNode.formAction = url;
/*            $.ajax({
                type : "post",
                global : false,
                async : true,
                url : url+'?agencyId='+agencyId,
                dataType : "json",
                success : function(data) {
                    doTheAlert("提示",data.tip);
                    $('#id_querygrantCredit').click();
                },
                error:function(){
                    doTheAlert("提示","下载失败！");
                }
            });*/
        }else{
        	this.parentNode.formAction = "";
        	doTheAlert("提示","请先选择一个机构！");
        	return false;
        }
    });    
  });  
    
    
//****************************************************************************************************************************************
/**
 * @Author 
 * @Name 回车键调用模糊查询返回行外机构结果集方法
 * @Return null
 * @Param 
 * @Description 回车键调用模糊查询
 * @Throws null
 **/
$(document).on('keypress','#agencyName',function(){
    var keycode=event.keyCode;
    if(keycode==13){
        getAgency();
    }
});

    function checkGrantCredit(){

//    	if(!validateMatureDate()){
//    		return false;
//    	}else{
    		if(!validateGrant('creditLimit')||!validateMatureDate()){
    			return false;
    		}else{
    			$('#grantCredit_input').submit();
    			//return true;
    		}
//    	}
    	
    }
    
     function validateGrant(selectName){
        var selector = "[name='grantCredit."+selectName+"']";
        var returnflag=false;
        $.ajax({
            type : "post",
            global : false,
            async : false,
            url : '/cpms/linkus/capital/system/grantCredit/validateGrantCredit',
            data : {
                agencyId : $('[name="grantCredit.agencyId"]').val(),
                busiType : $('[name="grantCredit.busiType"]').val(),
                creditLimit : getMoneyValue($('[name="grantCredit.creditLimit"]').val()),
                matureDate : $('[name="grantCredit.matureDate"]').val(),
                grantCreditId : $('[name="grantCredit.id"]').val(),
                validateType : selectName
            },
            dataType : "json",
            success : function(data) {
                if (data != null) {
                    var errorMessage = data['errorMessage'];
                    if(errorMessage != ""){
                        $("#grantCredit_input_0").attr("disabled", "disabled");
                        if(selectName != 'creditLimit'){
                            $('#grantCredit_input [name="grantCredit.creditLimit"]').attr("readonly", "readonly");
                        }
                        getTheMessager().alert("提示",errorMessage,'',function(){
                                $(selector).focus();
                            });
                        returnflag = false;
                        return ;
                    }else{
                        $('#grantCredit_input [name="grantCredit.creditLimit"]').removeAttr("readonly");
                        $("#grantCredit_input_0").removeAttr("disabled");
                        returnflag=true;
                    }
                }
            }
        });
        return returnflag;
    } 
  /**
 * @Author 王聪
 * @Name 点击弹窗查询选择行外机构方法
 * @Return null
 * @Param id 自动生成序列绑定选择控件
 * @Description 隐藏对话框窗口每次点开这个变量aria-describedby就加一
 * @Throws null
 **/
function openWindow(id){
   var cs = $('#cs'+id).val();
   window.open('/cpms/linkus/capital/interbank/bussiness/interbankIvcntr/toSearch?'+cs);
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

/**
 * @Author 王聪
 * @Name 点击关闭当前弹窗方法
 * @Return null
 * @Param null
 * @Description 点击关闭当前弹窗
 * @Throws null
 **/
function closeWindow(){
     $('.ui-dialog:visible').last()
                    .find('.ui-dialog-titlebar-close').click();
}

/**
 * @Author 王聪
 * @Name 根据机构名称模糊查询获取结果集以表单展示方法
 * @Return null
 * @Param null
 * @Description 根据机构名称模糊查询获取结果集以表单展示
 * @Throws null
 **/
function getAgency(){
	var agency = $('#controls-agencyName');
    var agencyName = agency[0].childNodes[1].value;
    var h = "";
    $.ajax({
            type : "post",
            global : false,
            async : false,
            url : '/cpms/linkus/capital/interbank/bussiness/interbankIvcntr/search',
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
                              '<td><input type="button" value="选择" id="h" class="btn" onclick="setAgency(\''+json['id']+'\',\''+json['name']+'\')" /></td>'+
                              '</tr>';
               }    
             }
             $('#result').html(h);
                  
            }
        });
}
function setAgency(agencyId,agencyName){
	if(agencyId && agencyName){
        closeWindow();
        document.getElementById("agencyId").value=agencyId;
        document.getElementById("agencyName").value=agencyName;
        var from1 = $('form.criteria');
        if (from1 && from1.length >= 0) {
            var from2 = from1[from1.length - 1];
            var id = from2.id;
            var actionBase = "/cpms/linkus/capital/system/grantCredit?agencyId="+agencyId;
            $("#" + id)[0].action = actionBase;
            $("#" + id).trigger("submit");
        }
	}

}

//验证日期
function validateMatureDate(){
    var busiType=$('#grantCredit_input [name="grantCredit.busiType"]').val();
    var matureDate = $('#grantCredit_input [name="grantCredit.matureDate"]').val();
    var agencyId = $('#grantCredit_input [name="grantCredit.agencyId"]').val();
    var returnflag=true;
        if(busiType!="1"&&busiType!=""){
        	 $.ajax({
                 type : "post",
                 global : false,
                 async : false,
                 url : '/cpms/linkus/capital/system/grantCredit/validateMatureDate?matureDate='+matureDate+'&&busiType='+busiType+'&&agencyId='+agencyId,
                 dataType : "json",
                 success : function(data) {
                     if (data != null) {
                         var errorMessage = data['errorMessage'];
                         if(errorMessage != ""){
                             $("#grantCredit_input_0").attr("disabled", "disabled");
                             getTheMessager().alert("提示",errorMessage,'',function(){
                                     $('#grantCredit_input [name="grantCredit.matureDate"]').focus();
                                 });
                             $("#grantCredit_input_0").removeAttr("disabled");
                             returnflag = false;
                             return returnflag;
                         }else{
                             $("#grantCredit_input_0").removeAttr("disabled");
                             returnflag=true;
                         }
                     }
                 }
             });
        }
    return returnflag;
}
    
//****************************************************************************************************************************************    