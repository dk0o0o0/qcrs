$(function(){
//--------------------------------------//进入记账页面
	/*$(document).on('click','#doSave',function(){
		var href = "/cpms/linkus/capital/common/account/accountPublic/showAct";
		var $aLink = $("#bga_publicLink");
		$aLink.attr('href',href);
		$aLink.click();
		$aLink.removeAttr('href');
	});*/
//--------------------------------------//取消  
	$(document).on('click','#cancelThis',
		function(){
		var t0=$('#cancelThis',window.parent.frames['frame_panle'].document);
		console.log($(this).parents('.tabs-panels').length);
		console.log(t0.text());
	});
});