function queryBillWrongNumber(){
	$('#id_form_query').submit();
}

function addBillWrongNumberItem(){
	$('#addBillWrongNmuber_form').submit();
}
function addBillWrongNumber() {
	window.open("/cpms/linkus/capital/bill/base/billWrongNumber/input",{width:'90%'});
}
Observation.billWrongNumber = function(container) {
	$('#billWrongNumber_input', container).each(function() {
		//捕获窗体
		var form = this;
		form.onsuccess = function() {
			//关闭窗体
			$('.ui-dialog-titlebar-close', $(form).closest('.ui-dialog')).click();
			//调用按钮刷新返回的界面
			$('#id_queryBillWrongNumber').click();
		}
	});
}