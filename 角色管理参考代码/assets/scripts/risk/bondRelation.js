/**
 *收益率曲线选择项改变方法*/
function changCurves(){
	var curveName=$('#id_baseCurve').find("option:selected").text();
	$('#id_curveName').val(curveName);
}

/**
 *收益率曲线与债券绑定表单提交成功后监听方法*/
Observation.curvesBondRelation = function(container) {
	$('#curvesBondRelation_input', container).each(function() {
		var form = this;
		form.onsuccess = function() {
			$('.ui-dialog-titlebar-close', $(form).closest('.ui-dialog')).click();
			//pause(this,1000);
			$('#id_queryRelationForm').submit();
		}
	});
}