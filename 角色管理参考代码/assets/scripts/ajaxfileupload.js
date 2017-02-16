(function (factory) {
	if (typeof define === 'function' && define.amd) {
		// AMD
		define(['jquery'], factory);
	} else if (typeof exports === 'object') {
		// CommonJS
		factory(require('jquery'));
	} else {
		// Browser globals
		factory(jQuery);
	}
}
(function ($) {
	$.createUploadIframe = function(id, uri){
		// create frame
		var frameId = 'jUploadFrame' + id;

		if(window.ActiveXObject && false) {
			var io = document.createElement('<iframe id="' + frameId + '" name="' + frameId + '" />');
			if(typeof uri== 'boolean'){
				io.src = 'javascript:false';
			}
			else if(typeof uri== 'string'){
				io.src = uri;
			}
		}
		else {
			var io = document.createElement('iframe');
			io.id = frameId;
			io.name = frameId;
		}
		io.style.position = 'absolute';
		io.style.top = '-1000px';
		io.style.left = '-1000px';

		document.body.appendChild(io);

		return io;
	};
	$.createUploadForm = function(id, fileElementId){
		// create form
		var formId = 'jUploadForm' + id;
		var fileId = 'jUploadFile' + id;
		var form = jQuery('<form  action="" method="POST" name="' + formId + '" id="' + formId + '" enctype="multipart/form-data"></form>');
		var oldElement = $('#' + fileElementId);
		var newElement = $(oldElement).clone();
		$(oldElement).attr('id', fileId);
		$(oldElement).before(newElement);
		$(oldElement).appendTo(form);
		// set attributes
		$(form).css('position', 'absolute');
		$(form).css('top', '-1200px');
		$(form).css('left', '-1200px');
		$("form[name=" + formId + "]").remove();
		$(form).appendTo('body');
		return form;
	};
	$.ajaxFileUpload = function(s) {
		s = $.extend({}, $.ajaxSettings, s);
		var id = s.fileElementId;
		var form = jQuery.createUploadForm(id, s.fileElementId);
		//var io = jQuery.createUploadIframe(id, s.secureuri);
		//var frameId = 'jUploadFrame' + id;
		var formId = 'jUploadForm' + id;
		$("#" + formId).ajaxFormSubmit(s);
	};
	
}));