	function lockCMISCredit(thisObj){
	  var id = $(thisObj).parents("tr").find("input[type='checkbox']").val();
	  $.ajax({
			type : "post",
			global : false,
			async : false,
			url : '/cpms/linkus/capital/bill/bussiness/billCmisCredit/updateLockFlag?lockFlag=1&uid='+id,
			dataType : "json",
			success : function(data) {
				
			}
		});
	  location.reload(true);

}
function deblockCMISCredit(thisObj){
	var id = $(thisObj).parents("tr").find("input[type='checkbox']").val();
	  $.ajax({
			type : "post",
			global : false,
			async : false,
			url : '/cpms/linkus/capital/bill/bussiness/billCmisCredit/updateLockFlag?lockFlag=0&uid='+id,
			dataType : "json",
			success : function(data) {
				
			}
		});
	  location.reload(true);

}
