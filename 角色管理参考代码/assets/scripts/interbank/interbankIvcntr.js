/*******************************************************************************
 * /* DESC ：行外机构选择ＪＳ处理文件 /* AUTHOR ：大资管平台项目组 /* CREATE ：2016-04-01 /* MODIFYLIST ：
 * Name Date Reason /* yourName updateDate modiReason /*
 * -------------------------------------------------------------
 ******************************************************************************/

/**
 * @Author 王聪
 * @Name 点击弹窗查询选择行外机构方法
 * @Return null
 * @Param id
 *            自动生成序列绑定选择控件
 * @Description 隐藏对话框窗口每次点开这个变量aria-describedby就加一
 * @Throws null
 */
function openWindow(id) {
	var cs = $('#cs' + id).val();
	window.open('/cpms/linkus/capital/interbank/bussiness/interbankIvcntr/toSearch?' + cs);
	afterShowAddFocus();
}
var addFocus_flag;
function afterShowAddFocus() {
	addFocus_flag = false;
	addFocus();
}
// 打开查询票据页面时实时检查 页面加载完成时结束检查 给date赋disabled

function addFocus() {
	if (addFocus_flag)
		return;
	// 方法部分
	if ($('#flag').length) {
		// 结束递归
		addFocus_flag = true;
		$("#agencyName").focus();
	}
	// 递归
	setTimeout(addFocus, 100);
}

/**
 * @Author 王聪
 * @Name 点击关闭当前弹窗方法
 * @Return null
 * @Param null
 * @Description 点击关闭当前弹窗
 * @Throws null
 */
function closeWindow() {
	$('.ui-dialog:visible').last().find('.ui-dialog-titlebar-close').click();
}

/**
 * @Author 王聪
 * @Name 根据机构名称模糊查询获取结果集以表单展示方法
 * @Return null
 * @Param null
 * @Description 根据机构名称模糊查询获取结果集以表单展示
 * @Throws null
 */
function getAgency() {
	var userAgent = navigator.userAgent;
	var agencyName = document.getElementById('agencyName').value;
	if(!agencyName&&userAgent.indexOf("Chrome")==-1){
		getTheMessager().alert("提示","请录入机构简称。",'',function(){
 			$('#agencyName').focus();
 		});
		return;
	}
	if(checkForbiddenClickFlag()){return;}
	var h = "";
	$.ajax({
		type : "post",
		global : false,
		async : false,
		url : '/cpms/linkus/capital/interbank/bussiness/interbankIvcntr/search',
		data : {
			"agencyName" : agencyName
		},
		dataType : "json",
		success : function(data) {
			if (data != null) {
				for (var i = 0; i < data.LIST.length; i++) { //onclick="setAgency(\''+json['name']+'\')"
					var json = data.LIST[i];
					h += '<tr id="'+i+ '" >'+ '<td>'+ json['name']+ '</td>'+'<td><input type="button" value="选择" onclick="setAgency(\''+json['name'] + '\')" class="btn"  /></td>'+'</tr>';
				}
			}
			$('#result').html(h);
			setForbiddenClickFlag_false();

		}
	});
}

/**
 * @Author 王聪
 * @Name 根据机构名称获取结果集展示到页面方法
 * @Return null
 * @Param agencyName
 *            选择的行外机构名称
 * @Description 根据机构名称获取结果集展示到页面
 * @Throws null
 */
function setAgency(agencyName) {
	// var p =window.parent.frames[name ="frame_panle"].document;
	var p = $(window.frames.document);
	var fromFields = $('#fromFields').val().split("-");
	var toFields = $('#toFields').val().split("-");
	var flag = $('#flag').val();
	$.ajax({
		type : "post",
		global : false,
		async : false,
		url : '/cpms/linkus/capital/interbank/bussiness/interbankIvcntr/setAgency',
		data : {
			"agencyName" : agencyName,
			"flag" : flag
		},
		dataType : "json",
		success : function(data) {
			if (data != null) {
				$("#counterpartyNo_search").val(data.counterpartyNo);
				for (var k = 0; k < toFields.length; k++) {
					var h1 = '';
					// var
					// type=p.getElementById(toFields[k]).getAttribute("type");
					var typelength = p.find("#" + toFields[k]).length;
					var type = "";
					if (typelength == "0") {
						type = "text";
					} else {
						type = p.find("#" + toFields[k])[0].type;
					}
					if (type == 'text' || type == 'hidden') {
						// document.getElementById(toFields[k]).value=data[fromFields[k]];
						p.find("#" + toFields[k]).val(data[fromFields[k]]);
					} else {
						type = type.substring(0, 6);
					}
					if (type == 'select') {
						// alert(flag);
						var z = 0;
						if (typeof(data.details) != "undefined") {
							z = data.details.length;
						}
						if (typeof(data.trusteeShipdetails) != "undefined") {
							z = data.trusteeShipdetails.length;
						}
						for (var i = 0; i < z; i++) {
							if (flag == '10') {
								var json1 = data.details[i];
								if(json1==null)	continue;
								h1 += "<option index='" + (i * 1 + 1)
										+ "' value='" + json1[fromFields[k]]
										+ "'>" + json1[fromFields[k]]
										+ "</option>";
							}
							if (flag == '01') {
								var json2 = data.trusteeShipdetails[i];
								if(json2==null)	continue;
								h1 += "<option index='" + (i * 1 + 1)
										+ "' value='" + json2[fromFields[k]]
										+ "'>" + json2[fromFields[k]]
										+ "</option>";
							}
							if (flag == '11') {
								var json1 = data.details[i];
								if(json1!=null)	{
									if (typeof(json1) != "undefined"
											&& typeof(json1[fromFields[k]]) != "undefined") {
										h1 += "<option index='" + (i * 1 + 1)
												+ "' value='"
												+ json1[fromFields[k]] + "'>"
												+ json1[fromFields[k]]
												+ "</option>";
									}
								}
								var json2 = data.trusteeShipdetails[i + 1];
								if(json2!=null)	{
									if (typeof(json2) != "undefined"
											&& typeof(json2[fromFields[k]]) != "undefined") {
										h1 += "<option index='" + (i * 1 + 1)
												+ "' value='"
												+ json2[fromFields[k]] + "'>"
												+ json2[fromFields[k]]
												+ "</option>";
									}
								}
							}

						}
						p.find("#" + toFields[k]).html(h1);
						// p.getElementById(toFields[k]).innerHTML=h1;
					}
				}

			}
		}
	});
	// zcy add....to ...触发 onchange 事件
	$("#" + toFields[0]).change();
	closeWindow();
}
/**
 * 交易对手方信息联动
 * @param {} id 当前控件的Id
 */
$(document).on('change','#transCoutertyAcctName, #transCoutertyAcctNo,#custOpBankName,#counterpartyOpBkNo', function(event) {
	//定义 四个联动的对手方信息Id（跟控件的id一样）
	//通过 id(传来的参数)的 change，令另外三个联动显示值（开户行名称，资金账号，开户名，开户行行号)
	//取得当前select选中的index值
	var id = $(this).attr("id");
	var index = $("#" + id + " option:selected").attr("index");
	var arry = "transCoutertyAcctName-transCoutertyAcctNo-custOpBankName-counterpartyOpBkNo";
	var obj = arry.split("-");
	for (var i = 0; i < obj.length; i++) {
		if (id != obj[i]) {
			$("#" + obj[i] + " option").removeAttr('selected');
			$("#" + obj[i] + " option[index='" + index + "']").attr('selected', true);
			$("#" + obj[i]).val($("#" + obj[i] + " option[index='" + index + "']").val());
		}
	}
});

/*$(document).on('change', '#counterpartyOpBkNo', function() {
	var f = 1;
 	var c = $('#counterpartyOpBkNo').val();
 	khChange(c,f);
});

$(document).on('change', '#custOpBankName', function() {
 	var c = $('#custOpBankName').val();
 	var f = 2;
 	khChange(c,f);
});

$(document).on('change', '#transCoutertyAcctName', function() {
 	var f = 3;
	var c = $('#transCoutertyAcctName').val();
 	khChange(c,f);
 });

$(document).on('change', '#transCoutertyAcctNo', function() {
 	var f = 4;
 	var c = $('#transCoutertyAcctNo').val();
 	khChange(c,f);
});

function khChange(c,f){
	var agenid = $('#counterpartyNo').val();
 	$.ajax({
 		type : "post",
		global : false,
		async : false,
	 	url : '/cpms/linkus/capital/interbank/bussiness/interbankIvcntr/khChange',
		data : {
		"c":c,
		"flag":f,
		"agenid":agenid
		},
		dataType : "json",
		success : function(data) {
			if (data != null) {
				$('#counterpartyOpBkNo').val(data.sameBsAccoutDetail.opBankNo).selected=true;
				$('#custOpBankName').val(data.sameBsAccoutDetail.custOpBankName).selected=true;
				$('#transCoutertyAcctName').val(data.sameBsAccoutDetail.custOpUnitName).selected=true;
				$('#transCoutertyAcctNo').val(data.sameBsAccoutDetail.opBankAcctNo).selected=true;
			}
		}
	});
}*/

/**
 * @Author
 * @Name 回车键调用模糊查询返回行外机构结果集方法
 * @Return null
 * @Param
 * @Description 回车键调用模糊查询
 * @Throws null
 */
$(document).on('keydown', '#agencyName', function() {
	var keycode = event.keyCode;
	if (keycode == 13) {
		getAgency();
	}
});

/*$(document).on('blur','#deadline', function() {
	var readonly = $("#deadline").attr("readonly");
	if(readonly==undefined) {
		var deadline = $("#deadline").val();
		if(deadline.length > 0) {
			deadline = deadline*1;
			if(deadline < 1) {
				doTheAlert("提示","拟存期限：不合法！");
				$("#deadline").val("");
			}
		}
	}
});*/