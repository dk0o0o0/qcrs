$(document).ready(function() {


	$('#id_showQueryParm_btn').click(function(event) {
		//$('#id_showQueryParm').css("display","none");
		//$('#id_queryParm_page').css("display","block");
	});
	
	$('#id_reportQuery_btn').click(function(event) {
		var size=$('#id_pageSize').val();
		if(size==null||size==""){
			doTheAlert("提示","每页条数不能为空!");
			return false;
		}
		if(parseInt($('#id_pageSize').val())<=0){
			doTheAlert("提示","每页条数必须大于等于0!");
			return false;
		}
		$('#id_pageNo').val("1");
		//$('#id_showQueryParm').css("display","block");
		//$('#id_queryParm_page').css("display","none");
	});
	needToAddReadonly();
});

function needToAddReadonly(){
	$("input.matureDate").each(function(){
		$(this).attr("readonly",true);
	});
	$("input.applyDate").each(function(){
		$(this).attr("readonly",true);
	});
	$("input.transDate").each(function(){
		$(this).attr("readonly",true);
	});
}

function showDetail(text,href){
	parent.showReportDetail(text,href);
}

function reportQuery(){
	$('#id_showQueryParm').css("display","block");
	$('#id_queryParm_page').css("display","none");
	$("#id_reportQuery_form").attr("action","/cpms/linkus/capital/report/reportQuery/list");
	$("#id_ReportQueryResult").trigger("submit");
}
function exportExcel(formname){
	//billPrint_query
	$("#id_reportQuery_form").attr("action","/cpms/linkus/capital/report/reportQuery/expportExcel");
	$('#'+formname).submit();
	$("#id_reportQuery_form").attr("action","/cpms/linkus/capital/report/reportQuery/list");
}
function goFirstPage(formname){
	var pageNo=1;
	$('#id_pageNo').val(pageNo);
	$('#'+formname).submit();
}

function goUpPage(formname){
	var pageNo=parseInt($('#id_pageNo').val())-1;
	$('#id_pageNo').val(pageNo);
	$('#'+formname).submit();
}
function goDownPage(formname){
	var pageNo=parseInt($('#id_pageNo').val())+1;
	$('#id_pageNo').val(pageNo);
	$('#'+formname).submit();
}
function goEndPage(formname){
	
	var pageNo=parseInt($('#id_totalPages').val())
	$('#id_pageNo').val(pageNo);
	$('#'+formname).submit();
}
function goAnyPage(formname){
	var size=$('#id_pageSize').val();
	var submitFlag=true;
	if(size==null||size==""){
		doTheAlert("提示","每页条数不能为空!");
		submitFlag=false ;
	}
	if(parseInt($('#id_pageSize').val())<=0){
		doTheAlert("提示","每页条数必须大于等于0!");
		submitFlag=false ;
	}
	if($('#id_pageNo').val()!=""){
		var pageNo=parseInt($('#id_pageNo').val());
		$('#id_pageNo').val(pageNo);
		if(submitFlag){
			$('#'+formname).submit();
		}
		
	}
}
function checkboxClick(){
	$("input[name='checkbox']").each(function() {
		//点击选中，则1.获取checkbox id，移除所有class.has(该 id)的 readonly=true 
			if ($(this).prop("checked")) {
				var id=$(this).attr("id");
				if($("#"+id).hasClass("select")){
					$("select[class='"+id+"']").each(function(){
					$(this).removeAttr("disabled");
				});
				}else{
				$("input."+id).each(function(){
					$(this).removeAttr("readonly");
				});
				}
		}else{//取消选中，筛选控件不可用
			var id=$(this).attr("id");
			if($("#"+id).hasClass("select")){
					$("select[class='"+id+"']").each(function(){
					$(this).attr("disabled",true);
				});
				}else{
				$("input."+id).each(function(){
					$(this).attr("readonly",true);
				});
				}
		}});
}