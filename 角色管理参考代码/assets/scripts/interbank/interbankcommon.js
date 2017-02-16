$(document).on('dblclick','#transCoutertyAcctName', function() {
	if(!($(this).val()==""||null==$(this).val())){
	var obj=$(this).parent();
	var txt=$(this).val();
	var text="<input type='text' id='transCoutertyAcctName' value='"+txt+"'   name='interbankCntr.transCoutertyAcctName'>"
	obj.html(text);
	}
});


