$(document).ready(function() {
    $(document).on('change', '#acbankRate-acceptBankType', function() {
        if(this.value){
            $.ajax({
                type : "post",
                global : false,
                async : false,
                url : '/cpms/linkus/capital/bill/base/acbankRate/validateType',
                data : {
                    acceptBankType : this.value
                },
                dataType : "json",
                success : function(data) {
                    if (data != null) {
                        var tip = data['tip'];
                        if(tip != ""){
                            $("#acbankRate_input_0").attr("disabled", "disabled");
                            doTheAlert("提示",tip);
                            return;
                        }else{
                            $("#acbankRate_input_0").removeAttr("disabled");
                        }
                    }
                }
            });
        }
    });
});