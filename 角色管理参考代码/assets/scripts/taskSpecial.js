function processErrTask(contractNo){
	$.ajax({
		type : "post",
		global : false,
		async : false,
		url : '/cpms/linkus/capital/workflow/taskSpecial/errorTaskProcess?contractNo='+contractNo,
		dataType : "json",
		success : function(data) {
			
		},
		error:function(){
		}
	});		
	location.reload();
}