/*************************************************************************************************
/* DESC       ：票据打印中心ＪＳ处理文件                                                                                                                                                                                 
/* AUTHOR     ：大资管平台项目组                                                                                                                                                                                 
/* CREATE     ：2016-04-01                                     
/* MODIFYLIST ： Name          Date         Reason                                                
/*              yourName      updateDate    modiReason                                               
/*              -------------------------------------------------------------   
*************************************************************************************************/
function getPrintType(){
        $("#bond_printtype").find("option").remove();
        var busitype = $('#bond_busitype').val();
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
                    $("#bond_printtype").append(html);
                    $('#bond_printtype').removeClass("empty");
                }
            },
            error:function(){
                doTheAlert("提示","查询打印类型失败！");
            }
        });	
}
/**
 * @Author 王聪
 * @Name 业务类型与打印类型联动
 * @Return null
 * @Param null 
 * @Description 类型联动
 * @Throws null
 **/
 $(document).on('change','#bond_busitype',function(){
        $("#bond_printtype").find("option").remove();
        var busitype = $('#bond_busitype').val();
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
                    $("#bond_printtype").append(html);
                    $('#bond_printtype').removeClass("empty");
                }
            },
            error:function(){
                doTheAlert("提示","查询打印类型失败！");
            }
        });

}); 	
