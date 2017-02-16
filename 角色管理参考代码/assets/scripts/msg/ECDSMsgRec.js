$(document).ready(function(){
	if($('#interfaceType').val()=='0'){
		$("#typeNo").hide();
		$("#control-group-typeNo").find("label").hide();
	}else{	
		$("#typeNo").show();
		$("#control-group-typeNo").find("label").text($("#typeNoName").val());
		$("#control-group-typeNo").find("label").show();
	}
	
	
})
$(document).on('click',"#viewMsg",function(){
	var msgtype=$(this).parent().parent().find('td').eq(0).find('input').val();
	var desc=$(this).parent().parent().find('td').eq(1).find('input').val();
	var statusdesc=$(this).parent().parent().find('td').eq(2).find('input').val();
	var sendrecflag=$(this).parent().parent().find('td').eq(3).find('input').val();
	var sendrectime=$(this).parent().parent().find('td').eq(4).find('input').val();
	var msgcontent=$(this).parent().parent().find('td').eq(5).find('input').val();
	window.open("/cpms/linkus/capital/msg/ecdsMsgRec/input?msgtype="
			+msgtype+"&desc="+desc+"&statusdesc="+statusdesc+"&sendrecflag="
			+sendrecflag+"&sendrectime="+sendrectime+"&msgcontent="+msgcontent);
});

function interfaceTypeChange(){
	var interfaceType = $('#interfaceType').val();//接口类型
	var $msgType = $('#msgType');//报文类型
	$msgType.empty();
	switch(interfaceType){
	case "0":$msgType.val('');
			$("#control-group-typeNo").find("label").hide();
			$("#typeNo").hide();
			$("#typeNo").val("");
			break;
	case "1":
		$("#control-group-typeNo").find("label").text("成交单编号：");
		$("#control-group-typeNo").find("label").show();
		$("#typeNo").show();
		for(var i=1;i<=9;i++){
		$msgType.append("<option value='CSBS00"+i+"'>CSBS00"+i+"</option>");
		}
		$msgType.append("<option value='CSBS010'>CSBS010</option>");
		$msgType.append("<option value='CSBS011'>CSBS011</option>");
		$msgType.append("<option value='CSBS012'>CSBS012</option>");
		break;
	case "2":
		$("#control-group-typeNo").find("label").text("票号：");
		$("#control-group-typeNo").find("label").show();
		$("#typeNo").show();
		for(var i=1;i<=9;i++){
		$msgType.append("<option value='Z00"+i+"'>Z00"+i+"</option>");
		}
		for(var i=10;i<=26;i++){
			$msgType.append("<option value='Z0"+i+"'>Z0"+i+"</option>");
			}
		$msgType.append("<option value='Z040'>Z040</option>");
	break;
	}
}

$(document).on('click',"#queryECDSMsgRec",function(){
	$("#id_Query_form").submit();
	
});