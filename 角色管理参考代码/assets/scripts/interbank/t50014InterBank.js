function removeDisabled() {
	$("select").removeAttr('disabled');
	$("#occupyLimitType0").removeAttr('disabled');
	$("#occupyLimitType1").removeAttr('disabled');
}

function addDisabled() {
	$("select").attr('disabled','true');
	$("#occupyLimitType0").attr('disabled','true');
	$("#occupyLimitType1").attr('disabled','true');
}