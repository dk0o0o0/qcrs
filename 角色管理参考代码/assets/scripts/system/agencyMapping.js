function openWindow(){
    window.open('/cpms/linkus/capital/interbank/bussiness/interbankIvcntr/toSearch?');
   //afterShowAddFocus();
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
    	$("[name='agencyMapping.agencyId']").val(agencyId);
        $("[name='agencyMapping.agencySimpName']").val(agencyName);
    }
}
$(document).ready(function() {
$(document).on('keypress','#agencyName',function(){
    var keycode=event.keyCode;
    if(keycode==13){
        getAgency();
    }
});
});

function queryAgencyMapping(){
    var from1 = $('form.criteria');
    if (from1 && from1.length >= 0) {
        var from2 = from1[from1.length - 1];
        var id = from2.id;
        var actionBase = "/cpms/linkus/capital/system/agencyMapping";
        var agencyName=$('#deptName').val();       
        actionBase=actionBase+"?agencyName="+agencyName;
        $("#" + id)[0].action = actionBase;
        $("#" + id).trigger("submit");
    }
}