function checkDate($date){
	var matureDate = $("#matureDate").val();
	var issueDate = $("#issueDate").val();
	var matureDateInt = parseInt(matureDate.toString().replace(new RegExp('-','g'),""));
	var issueDateInt = parseInt(issueDate.toString().replace(new RegExp('-','g'),""));
	if(issueDateInt>matureDateInt){
		doTheAlert("提示","截止日小于生效日");
		$('#matureDate').val('');
		return;
	}
}