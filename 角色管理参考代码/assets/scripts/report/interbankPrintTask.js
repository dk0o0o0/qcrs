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
 $(document).on('change','#interbank_busitype',function(){
        $("#interbank_printtype").find("option").remove();
        var busitype = $('#interbank_busitype').val();
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
                    $("#interbank_printtype").append(html);
                    $('#interbank_printtype').removeClass("empty");
                }
            },
            error:function(){
                doTheAlert("提示","查询打印类型失败！");
            }
        });
        
        
/*        var t1 = "<option value=''></option><option value='审批单'>审批单</option><option value='传票'>传票</option>";
        if(busitype == "50006"){
        	$('#interbank_printtype').html(t1)  ;
        }
        if(busitype == "50007"){
        	$('#interbank_printtype').html(t1)  ;
        }
        if(busitype == "50016"){
        	$('#interbank_printtype').html(t1)  ;
        }
        if(busitype == "50017"){
        	$('#interbank_printtype').html(t1)  ;
        }
        if(busitype == "50034"){
        	$('#interbank_printtype').html(t1)  ;
        }
        if(busitype == "50031"){
        	$('#interbank_printtype').html(t1)  ;
        }
        if(busitype == "50008"){
        	$('#interbank_printtype').html(t1)  ;
        }
        if(busitype == ""){
        	$('#interbank_printtype').html("")  ;
        }*/
}); 	
