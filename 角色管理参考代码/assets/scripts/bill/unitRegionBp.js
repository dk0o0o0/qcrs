function verifyMaxAndMinSection(){
	var levelsName=$("#levelsName").val();
	var minSection=$("#minSection").val();
	var maxSection=$("#maxSection").val();
	if(minSection>0){
	 	if(maxSection*1>minSection*1 || maxSection=='-1'){
	 		$("#subbtn").removeAttr("disabled");
	 		return;
	 	}else{
	 		$("#subbtn").attr("disabled","true");
	 		doTheAlert("提示","最高业务量必须大于最低业务量");
	 		return;
	 	}
	}else{
		doTheAlert("提示","最低业务量为1");
		return;
	}
}
/**
 * 最大业务量测试 
 */
function MaxSectionVerify(){
	//如果最大业务量为-1，则提示只能修改
	$.ajax({
		type : "post",
		global : false,
		async : false,
		url : '/cpms/linkus/capital/bill/base/unitRegionBp/findMaxunitRegionBp',
		dataType : "json",
		success : function(data) {
			if(!data.flag){
				doTheAlert("提示",data.tip);
                    return;
			}else{
				$("#create_btn").click();
			}
	}});
	
}