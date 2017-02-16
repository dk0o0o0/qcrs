function exportUserSaveExcel(){
	$('#id_form_paUserSave').removeAttr('action');
	$('#id_form_paUserSave').attr('action','/cpms/linkus/capital/authority/paUserSave/exprotExcelUserSave');
	$('#id_form_paUserSave').submit();
}

function queryUserSave(){
	$('#id_form_paUserSave').removeAttr('action');
	$('#id_form_paUserSave').attr('action','/cpms/linkus/capital/authority/paUserSave/queryUserSave');
	$('#id_form_paUserSave').submit();
}