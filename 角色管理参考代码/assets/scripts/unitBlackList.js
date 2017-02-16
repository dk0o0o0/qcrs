/*******************************************************************************
 * /* DESC ：贴现单位黑名单表JS /* AUTHOR ：大资管平台项目组 /* CREATE ：2016-04-01 /* MODIFYLIST ：
 * Name Date Reason /* yourName updateDate modiReason /*
 * -------------------------------------------------------------
 ******************************************************************************/

/**
 * 
 * 
 * @author 陈阳妙
 * @description
 * @return
 * @modified
 */
$(document).on('change', '#unitBlackList_input [name="unitBlackList.unitOrgCode"]',
		function() {
			var unitId = document.getElementById("unitId").value;
			if (this.value) {
				$.ajax({
					type : "post",
					global : false,
					async : false,
					url : ""
							+ '/cpms/linkus/capital/bill/base/unitBlackList/getUnitBlackListData',
					data : {
						"unitId" : unitId
					},
					dataType : "json",
					success : function(data) {
						if (data != null) {
							if (data.tip != null) {
								doTheAlert("提示", data.tip);
							} else {
								for (var key in data) {
									if (key == 'unitId')
										continue;
									var ele = $('#' + key);
									ele.val(data[key]);
								}
							}
						}
					}
				});

			}
		});