/*************************************************************************************************
/* DESC       ：票据打印中心ＪＳ处理文件                                                                                                                                                                                 
/* AUTHOR     ：大资管平台项目组                                                                                                                                                                                 
/* CREATE     ：2016-04-01                                     
/* MODIFYLIST ： Name          Date         Reason                                                
/*              yourName      updateDate    modiReason                                               
/*              -------------------------------------------------------------   
*************************************************************************************************/

/**
 * @Author 王聪
 * @Name 勾选多选框改变查询条件是否填写日期
 * @Return null
 * @Param null 
 * @Description 勾选多选框动作
 * @Throws null
 **/
 $(document).on('change','#flag',function(){
		if($('#flag').is(':checked')==true){
			$('#startprinttime').attr("disabled", "disabled");
			$('#endprinttime').attr("disabled", "disabled");
		}else {
			$('#startprinttime').removeAttr("disabled");
			$('#endprinttime').removeAttr("disabled");
		}
});
	
/**
 * @Author 王聪
 * @Name 业务类型与打印类型联动
 * @Return null
 * @Param null 
 * @Description 类型联动
 * @Throws null
 **/
 $(document).on('change','#bill_busitype',function(){
 	$("#bill_printtype").find("option").remove();
        var busitype = $('#bill_busitype').val();
        var html = "";
        $.ajax({
            type : "post",
            global : false,
            async : false,
            url : '/cpms/linkus/capital/report/rpBusiTypePrint/getRpBusiType?busiType='+busitype,
            dataType : "json",
            success : function(data) {
                 if (data != null) {
                    var z=0;
                    if(typeof(data.result) !="undefined" )
                        z = data.result.length;
                    for(var i=0;i<z;i++){
                        var rpBusiType = data.result[i];
                        if(rpBusiType!=null){
                            html += "<option value='"+rpBusiType.printTypeCode+"' >"+rpBusiType.printTypeName+"</option>";
                        }
                    }
                    $("#bill_printtype").append(html);
                    $('#bill_printtype').removeClass("empty");
                }
            },
            error:function(){
                doTheAlert("提示","查询打印类型失败！");
            }
        });
        
        
/*        var t1 = "<option value=''></option><option value='审批单'>审批单</option><option value='通知单'>通知单</option><option value='凭证'>凭证</option><option value='票据买房付息凭证'>票据买房付息凭证</option><option value='传票'>传票</option>";
        var t2 = "<option value=''></option><option value='审批单'>审批单</option><option value='通知单'>通知单</option><option value='传票'>传票</option>";
        var t3 = "<option value=''></option><option value='审批单'>审批单</option><option value='通知单'>通知单</option><option value='凭证'>凭证</option><option value='凭证汇总'>凭证汇总</option><option value='传票'>传票</option>";
        var t4 = "<option value=''></option><option value='审批单'>审批单</option><option value='通知单汇总'>通知单汇总</option><option value='传票'>传票</option>";
        if(busitype == "30001"){
        	$('#bill_printtype').html(t1)  ;
        }
        if(busitype == "30002"){
        	$('#bill_printtype').html(t2)  ;
        }
        if(busitype == "30003"){
        	$('#bill_printtype').html(t3)  ;
        }
        if(busitype == "30004"){
        	$('#bill_printtype').html(t2)  ;
        }
        if(busitype == "30005"){
        	$('#bill_printtype').html(t2)  ;
        }
        if(busitype == "30006"){
        	$('#bill_printtype').html(t4)  ;
        }
        if(busitype == "30007"){
        	$('#bill_printtype').html(t3)  ;
        }
        if(busitype == ""){
        	$('#bill_printtype').html("")  ;
        }*/
}); 	
