
$(document).ready(function() {
	$(document).on('keydown', '#cfetsagencyName', function(ev) {
		var keyCode=ev.which;
		if(keyCode==13){
			$(this).blur();
			return true;
		}
	});
});

function getCfetsTraBasicInfo() {
    var agencyName = document.getElementById('cfetsagencyName').value;
    if(''==agencyName){
		doTheAlert("提示","关键字不能为空!");
		return ;
	}
    var h = "";
    $.ajax({
        type : "post",
        global : false,
        async : false,
        url : '/cpms/linkus/capital/msg/cfets/cfetsTraBasicInfo/search',
        data : {
            "agencyName" : agencyName
        },
        dataType : "json",
        success : function(data) {
            if (data != null) {
                for (var i = 0; i < data.LIST.length; i++) {
                    var json = data.LIST[i];
                    h += '<tr id="'
                            + i
                            + '">'
                            + '<td>'
                            + json['chineseShort']
                            + '</td>'
                            + '<td>'
                            + json['traderName']
                            + '</td>'
                            + '<td>'
                            + json['traderId']
                            + '</td>'
                            + '<td><input type="button" value="选择" id="h" class="btn" onclick="setCfetsTraBasicInfo(\''
                            + json['traderId'] + '\')" /></td>' + '</tr>';
                }
            }
            $('#result').html(h);

        },
		error:function(){
			doTheAlert('提示', errorTip);
		}
    });
}

function setCfetsTraBasicInfo(id){
	$('#sameBusiness-transUnitId').val(id);
	closePage();
}