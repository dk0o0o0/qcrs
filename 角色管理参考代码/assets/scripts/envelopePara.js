$(document).ready(function() {
	$(document).on('click', '#queryBtn', function() {		
		var baseAction="/cpms/linkus/capital/bill/base/envelopeTrack?a=1";
		var acceptCode=$("#acceptCode").val();
		var remittingBankName=$("#remittingBankName").val();
		if (acceptCode != null && acceptCode != '') {
			baseAction=baseAction+"&acceptCode="+acceptCode;
		}
		if (remittingBankName != null && remittingBankName != '') {
			baseAction=baseAction+"&remittingBankName="+remittingBankName;
		}
		$("#bondUnderWriterInfo_form").attr("action",baseAction);
		$("#bondUnderWriterInfo_form").trigger("submit");
	});
});

$(document).ready(function(){
	$(document).on('click','#resetBtn',function(){
		var baseAction="/cpms/linkus/capital/bill/base/envelopeTrack";
		$("#acceptCode").val("");
		$("#remittingBankName").val("");
		$("#bondUnderWriterInfo_form").attr("action",baseAction);
		$("#bondUnderWriterInfo_form").trigger("submit");
	});
});

$(document).ready(function() {
	$(function() {
		var selector = '#unitAcct_input [name="unitAcct.discountUnitAccount"]';
		$(document).on('change', selector, function() {
			if (this.value) {
				$.ajax({
					type : "post",
					global : false,
					async : false,
					url : "" + '/cpms/linkus/capital/bill/base/unitAcct/getUnitAcctData',
					data : {
						discountUnitAccount : this.value
					},
					dataType : "json",
					success : function(data) {
						if (data != null) {
							for (var key in data) {
								if (key == 'discountUnitAccount')
									continue;
								var ele = $('#'+ key );
								ele.val(data[key]);
							}
						}
					}
				});

			}
		});
	});
	
	$(document).on('click', '#envelopePara_input [id="btn_APS0003"]', function() {
		var param = $('#envelopePara_input [name="envelopePara.acceptCode"]').val();
        if (param) {
        $.ajax({
            type : "post",
            global : false,
            async : false,
            url : "" + '/cpms/linkus/capital/bill/base/envelopePara/getEnvelopeInfo',
            data : {
                acceptCode : param
            },
            dataType : "json",
            success : function(data) {
                if (data != null) {
                    for (var key in data) {
                        var ele = $('#'+ key );
                        ele.val(data[key]);
                    }
                }
            }
        });
    }
  });
});

	