/**
 * 理财平台首页搜索功能实现增加的js
 * */
(function($){
	$(document).ready(function(){
		/*系统时间  用户所属机构设置 start*******************/
		$.ajax({
			url:CONTEXT_PATH +"/fncBase/getSyspartm",
			async:false,
			cache:false,
			type:'POST',
			dataType:"json",
			success:function(json){
				var sysWorkDate = json.sysWorkDate;
				var userOrg = json.userOrg;
				$("#sysWorkDate_index").html("当前系统日期 :"+sysWorkDate);
				$("#userOrg_index").html("所属机构 :"+userOrg);
			}
		});
		/*系统时间  用户所属机构设置 end**********************/
		
		/*在导航栏管理位置增加 菜单搜索功能 start*/
		/*1.定义搜索输入框*/
		var _search_input = "<div class='input_search_div'>" +
							"	<input id='input_search' type='text' class='input-sm input_search' data-provide='typeahead'  placeholder='菜单搜索' data-items='20' data-source=''>" +
							"</div>";
		/*2.将定义的输入框添加到导航栏位置*/
		$(".layout-panel-west").children().eq(0).children().eq(0).css("margin-left","-90px").append(_search_input);
		/*3.为输入框绑定搜索数据*/
		$.ajax({
			url:CONTEXT_PATH +"/fncBase/getSearchData",
			async:false,
			cache:false,
			type:'POST',
			dataType:"json",
			success:function(json){
				var listStr = json.jsonResult;
				var str = "[";
				if(listStr!=undefined){
					for(var i=0;i<listStr.length;i++){
						if(i!=listStr.length-1){
							str += "\"" +listStr[i] +"\",";
						}else{
							str += "\"" +listStr[i] +"\"";
						}
					}
				}
				str += "]";
				$("#input_search").attr("data-source",str);
			}
		});
		/*4.启动搜索功能*/
		//$('.typeahead').typeahead();
		//var $this = $("#input_search");
	    //if ($this.data('typeahead')) return
	    //$this.typeahead($this.data());
		//$(document).on("click","#input_search",function(){
		//	alert("haoren");
		//});
		
		/*在导航栏管理位置增加 菜单搜索功能 end*/
	});
})(jQuery);
