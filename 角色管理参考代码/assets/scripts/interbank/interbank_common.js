
$(document).on('dblclick','#transCoutertyAcctName', function() {
	if(!($(this).val()==""||null==$(this).val())){
	var obj=$(this).parent();
	var txt=$(this).val();
	var text="<label class='control-label'  for='form_transCoutertyAcctNo'>开户行行名：</label> <input type='text' id='transCoutertyAcctName' value='"+txt+"'   name='interbankCntr.transCoutertyAcctName'>";
	obj.html(text);
	}
});

$(document).on('dblclick','#transCoutertyAcctNo', function() {
	if(!($(this).val()==""||null==$(this).val())){
	var obj=$(this).parent();
	var txt=$(this).val();
	var text="<label class='control-label'  for='form_transCoutertyAcctNo'>账号/客户号：</label> <input type='text' id='transCoutertyAcctNo' value='"+txt+"'   name='interbankCntr.transCoutertyAcctNo'>";
	obj.html(text);
	}
});


