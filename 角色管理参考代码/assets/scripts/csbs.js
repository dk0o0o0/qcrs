$(document).on('mouseup','#csbsInfo',function(){
	$("#cpmsInfo").scrollLeft($("#csbsInfo").scrollLeft());
});

$(document).on('mouseup','#cpmsInfo',function(){
	$("#csbsInfo").scrollLeft($("#cpmsInfo").scrollLeft());
});

/**跳转到人工处理页面*/
function FSQS_mc_distribution(){
	var contractNo = $("#contractNo").val();
	var bondCode = $("#bondCode").val();
	window.open('/cpms/linkus/capital/bond/bussiness/bondPublic/distributionmdPage?contractNo='+contractNo+'&bondCode='+bondCode,{width:'50%'});
}