$(document).ready(function(){
	
  $('#btn_query').click(function(){
	 var acctNo = $("#acctNo").val();
      
     var url="/com/linkus/capital/report/jasper?format=PDF&type=AcctReport&acctNo="+acctNo;
    // window.open(url,'report');
     $("#report").attr("src",url);
  });
  
    $('#btn_query1').click(function(){
	 var acctNo = $("#acctNo").val();
      
     var url="/com/linkus/capital/report/jasper?format=HTML&type=AcctReport&acctNo="+acctNo;
    // window.open(url,'report');
//     $("#report").attr("src",url);
      $.ajax({ 
	 	url: url, dataType:"html",headers:{"X-Fragment":"_"},
	 	cache:false,success: function(html) { 
		$("#DIV").empty();
		$("#DIV").html(html);
	   
	 } 
	}); 
  });
  
	$("#btn_download").click(function(){
	   var acctNo = $("#acctNo").val();
	   
	   var url="/com/linkus/capital/report/jasper?format=XLS&type=AcctReport&acctNo="+acctNo;
       $("#report").attr("src",url);
	 
//		var url="/com/linkus/capital/report/jasper";
//	  	var form = $("<form>");
//	  	form.attr("action",url);
//	  	form.attr("method","get");
//	  	form.attr("style","display:none");
//	  	form.append("<input name='type' value='AcctReport'>");
//	  	form.append("<input name='acctNo' value='"+acctNo+"'>");
//	    form.append("<input name='format' value='XLS'>");
//	  	$('body').append(form);
//	  	form.submit();
//	  	form.remove();
  });
  
});
