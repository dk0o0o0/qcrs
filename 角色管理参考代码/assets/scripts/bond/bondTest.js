	
	function searchTheBondByCode(){
		var $bondCode = $('#test_bondCode');
		var $showTheBondInfo = $("#showTheBondInfo");
			$showTheBondInfo.removeAttr('href');
			$showTheBondInfo.hide();
		if(!$bondCode.val())
			return;
		$.ajax({
			type:"post",
			global:false,
			async:false,
			url:"/cpms/linkus/capital/bond/bussiness/bondPublic/findTheBondByCode",
			data:{"bondCode":$bondCode.val()},
			dataType:"json",
			success:function(data){
				if(data!=null){
					if(data.ifNull){
						getTheMessager().alert("提示",data.tip,'',function(){
				 			$bondCode.focus();
				 		});
					}else{
						$showTheBondInfo.attr('href',"/cpms/linkus/capital/bond/base/BondBasic/view?bondCode="+$bondCode.val());
						$showTheBondInfo.show();
					}
				}
			},
			error:function(){
				doTheAlert('提示', errorTip);
			}
		});
	}
	
	
	
	
	function testCal(reversalFlag){
		var transNetPrice = $("#test_transNetPrice").val();
		var matureEarningRate = $("#test_matureEarningRate").val();
		if((reversalFlag&&matureEarningRate)||(!transNetPrice)){
			transNetPrice = 0;
		}else{
			matureEarningRate = 0;
		}
		var bondCode = $("#test_bondCode").val();
		var deliveryDate = $("#test_deliveryDate").val();
		if(!bondCode||!deliveryDate||!(transNetPrice||matureEarningRate)){
			doTheAlert("提醒","缺值");
			return;
		}
		
		$.ajax({
			type:"post",
			global:false,
			async:false,
			url:"/cpms/linkus/capital/bond/bussiness/matureYieldCalTest/matureYRCalTest",
			data:{
				"bondCode":bondCode,
				"deliveryDate":deliveryDate,
				"transNetPrice":transNetPrice,
				"matureEarningRate":matureEarningRate
			},
			dataType:"json",
			success:function(data){
				if((reversalFlag&&matureEarningRate)||(!transNetPrice)){
					$("#test_transNetPrice").val(data.result);
				}else{
					$("#test_matureEarningRate").val(data.result);
				}
			},
			error:function(){
				doTheAlert('提示', errorTip);
			}
		});
	}