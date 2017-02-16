$(document).ready(function() {
    $(document).on('blur', '#holiday-holidayDate', function() {
    	if(this.value){
        	$.ajax({
                type : "post",
                global : false,
                async : false,
                url : '/cpms/linkus/capital/system/holiday/validateDate',
                data : {
                    srcDate : this.value
                },
                dataType : "json",
                success : function(data) {
                    if (data != null) {
                        var tip = data['tip'];
                        if(tip != ""){
                            $("#holiday_input_0").attr("disabled", "disabled");
                            doTheAlert("提示",tip);
                            $('#holiday-holidayDate').val(this.value);
                            return;
                        }else{
                            $("#holiday_input_0").removeAttr("disabled");
                        }
                    }
                }
            });
    	}
    });
});