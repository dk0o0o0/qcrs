/*******************************************************************************
 * /* DESC ：同业存单根据存单代码查询信息JS /* AUTHOR ：大资管平台项目组 /* CREATE ：2016-04-01 /*
 * MODIFYLIST ： Name Date Reason /* yourName updateDate modiReason /*
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
var showWin = null;
function openWindow() {
	showWin = window
			.open(
					'/cpms/linkus/capital/interbank/bussiness/interbankKpcntr/toInterbankSearch',
					'_self');
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
 * @Name 根据存单代码模糊查询获取结果集以表单展示方法
 * @Return null
 * @Param null
 * @Description 根据存单代码模糊查询获取结果集以表单展示
 * @Throws null
 */
var json = null;
function getInterbank() {
	var bondCode = $('#bondCode_search').val();
	var h = "";
	$.ajax({
		type : "post",
		global : false,
		async : false,
		url : '/cpms/linkus/capital/interbank/bussiness/interbankKpcntr/findBondBasic',
		data : {
			"bondCode" : bondCode
		},
		dataType : "json",
		success : function(data) {
			if (data != null) {
				for (var i = 0; i < data.bondBasicList.length; i++) {
					json = data.bondBasicList[i];
					h += '<tr id="'
							+ i
							+ '">'
							+ '<td>'
							+ json['bondCode']
							+ '</td>'
							+ '<td>'
							+ json['bondName']
							+ '</td>'
							+ '<td><a class="easyui-linkbutton" data-options="iconCls:"icon-ok"" id="h" onclick="setAgency(\''
							+ json['bondCode'] + '\')" ><img src="/assets/images/search.png">选择</a></td>' + '</tr>';
				}
			}
			$('#result').html(h);

		}
	});
}

function setAgency(bondCode) {
	closeWindow();
	var busiType = 50031;
	$.ajax({
		type : "post",
		global : false,
		async : false,
		url : '/cpms/linkus/capital/interbank/bussiness/interbankKpcntr/getKpBaseInfo',
		data : {
			"bondCode" : bondCode,
			"busiType" : busiType
		},
		dataType : "json",
		success : function(data) {
			if (data.interbankKpcntrList != undefined) {
				for (var i = 0; i < data.interbankKpcntrList.length; i++) {
					json = data.interbankKpcntrList[i];
					$('#bondCode').val(json['bondCode']);
					$('#bondName').val(json['bondName']);
					$('#issuePrice').val(json['issuePrice']).change();
					$('#issueDate').val(json['issueDate']);
					$('#startInterDate').val(json['startInterDate']);
					$('#matureDate').val(json['matureDate']);
					$('#paymentInterCycle').val(json['paymentInterCycle']).selected = true;
					$('#payInterType').val(json['payInterType']).selected = true;
					$('#rateBenchmark').val(json['rateBenchmark']).selected = true;
					$('#faceInterestRate').val(json['faceInterestRate']);
					$('#interestBasic').val(json['interestBasic']).selected = true;
					$('#rateMargin').val(json['rateMargin']);
					$('#initialContractNo').val(json['contractNo']);
					//$('#faceValueAmount').val(json['faceValueAmount']).change();
					var tempVal = parseFloat(json['faceValueAmount']/10000);
					$('#faceValueAmount').val(tempVal).change();
					$('#faceValueAmount').val(tempVal);
					var matureDate = ($('#matureDate').val());
					var addsum = getPostponeDays(matureDate);
					var clDate = addDay(matureDate, addsum);
					$('#clDate').val(clDate);
					var items = data.interbankKpcntrList[i].items;
					var itemSize = items.length;
					var h = '';
					for(var j = 0; j < itemSize; j++){
						var productType = items[j].productType;
						if('0'==productType){
							productType = '存款类金融机构';
						}else if('1'==productType){
							productType = '非存款类金融机构';
						}else if('2'==productType){
							productType = '其他非存款类金融机构';
						}
						h += '<tr id="table'+j+'">'+
						'<td><center><input id="checkname'+j+'" name="checkname" type="checkbox" value="'+j+'"style="margin-top: -2px;" >&nbsp;&nbsp;<input id="input_str'+j+'" readonly=true width="15px;" style="background-color: transparent;border:none;text-align:center" value="'+j+'"/></center></td>'+	
	                    '<td ><center><input id="counterpartyName'+j+'" name="interbankKpcntr.items['+ j +'].transCounterpartyNo" style="background-color: transparent;border:none;text-align:center" readonly=true value="'+ items[j].coutertyBankName +'"></input></center></td>'+
	                    '<td style="display:none;"><center><input id="counterpartyNo'+j+'" name="interbankKpcntr.items['+ j +'].coutertyBankName" readonly=true value="'+items[j].transCounterpartyNo +'"></center></td>'+
	                    '<td ><center><input id="faceAmount'+j+'" name="interbankKpcntr.items['+ j +'].transAmount" style="background-color: transparent;border:none;text-align:center" readonly=true value="'+ items[j].transAmount +'"></center></td>'+
	                    '<td ><center><input id="productType'+j+'" name="producttype" style="background-color: transparent;border:none;text-align:center" readonly=true value="'+ productType +'"></center></td>'+
	                    '<td style="display:none;"><center><input id="productType'+j+'" name="interbankKpcntr.items['+ j +'].productType" style="background-color: transparent;border:none;text-align:center" readonly=true value="'+ items[j].productType +'"></center></td>'+
	                    '</tr>';
	                    $('#tabbody').html(h);
					}
				}
			}else{
				doTheAlert("提示","亲，同业存单不存在！请核对！！");
				return false;
			}
		}
	});
}