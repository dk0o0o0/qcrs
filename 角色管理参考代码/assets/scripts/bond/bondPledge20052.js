$(document).ready(function() {
	
	showBondTeamListInfo();
	
	function showBondTeamListInfo(){
		var teamId = $(".bond_team").val();
		$(".bond_team").find("option").remove();
		var assetsType = "T";
		var html = "<option>请选择</option>";
		$.ajax({
				type : "post",
				global : false,
				async : true,
				url : '/cpms/linkus/capital/bond/bussiness/bondPublic/findTeamListByUserNameAndType',
				data : {"assetsType":assetsType},
				dataType : "json",
				success : function(data) {
				 if (data != null) {
					var z=0;
					if(typeof(data.bondTeamList) !="undefined" )
				 		z = data.bondTeamList.length;
					for(var i=0;i<z;i++){
						var bondTeam = data.bondTeamList[i];
						console.log("bondTeam " + bondTeam);
						if(bondTeam!=null){
							if(bondTeam.teamId==teamId){
								html += "<option value='"+bondTeam.teamId+"' selected>"+bondTeam.teamName+"</option>";
							}else{
								html += "<option value='"+bondTeam.teamId+"' >"+bondTeam.teamName+"</option>";
							}
						}
					}
					$(".bond_team").append(html);
				 }
				},
				error:function(){
					doTheAlert('提示', errorTip);
				}
			});
	}
	
//	function showBondTeamListInfo(assetsType,userName,trIndex){
//		//$("#bond_team"+trIndex).find("option").remove();
//		var selectObj = $("select[name='bondCntr.teamBookItems["+trIndex+"].teamId']")[0];
//		$(selectObj).find("option").remove();
//		var html = "<option>-请选择-</option>";
//		$.ajax({
//				type : "post",
//				global : false,
//				async : true,
//				url : '/cpms/linkus/capital/bond/bussiness/bondPublic/findTeamListByUserNameAndType',
//				data : {"assetsType":assetsType},
//				dataType : "json",
//				success : function(data) {
//				 if (data != null) {
//					var z=0;
//					if(typeof(data.bondTeamList) !="undefined" )
//				 		z = data.bondTeamList.length;
//					for(var i=0;i<z;i++){
//						var bondTeam = data.bondTeamList[i];
//						//console.log("bondTeam " + bondTeam);
//						if(bondTeam!=null){
//							html += "<option value='"+bondTeam.teamId+"' >"+bondTeam.teamName+"</option>";
//						}
//					}
//					$(selectObj).append(html);
//				 }
//				},
//				error:function(){
//					doTheAlert("提示","投组查询失败！");
//				}
//			});
//	}
	
//---------------------------------------//打开债券查询页面-------------------------------------------------------------------------------
    $(document).on('click','#goBESearchPage',
        function(){
            //在页面跳转前预留功能
        	window.open("/cpms/linkus/capital/bond/bussiness/t20052Bond/examSearchPage4BondPledge",{width:'95%'});
//            var href = "/cpms/linkus/capital/bond/bussiness/t20052Bond/examSearchPage4BondPledge";
//            $(this).next().attr("href",href);
//            $(this).next().click();
    });
    
    //清算速度改变交割日期
    $(document).on('change','#settleType',function(){
    	var settleType = $("#settleType").val();
    	var tradeDate = $("#tradeDate").val();
    	if(settleType=="0"){
    		$("#deliveryDate").val(tradeDate);
    	}else if(settleType=="1"){
    		$("#deliveryDate").val(addDay(tradeDate.val(),1));
    	}
    });
    
    //清算速度改变计算
    $(document).on('change','#settleType',function(){
    	calActuaDays();
    	calPodageAmt();
    });
    
    //----------------------------------根据债券代码回显债券简称-----（部分业务可公共）-------------------------------------------
    var selector = '#t20052Bond_form [name="bondCntr.bondCode"]';
    $(document).on('keydown', selector, function(event) {
                if (event.keyCode == 13) {
                    $(this).blur();
                    return false;
                }
            });
    
    $('#t20052Bond_form [name="bondCntr.bondCode"]').unbind('blur').blur(function(){
    	if (this.value) {
            seacherBondInfo();
        }
    });

    /*
    //-----------------------------------------------自动计算占用天数，借贷期限----------------------------------------------------------------
    var actualdaySelector = '#t20052Bond_form [name="bondCntr.deliveryDate"], #t20052Bond_form [name="bondCntr.maturityDate"]';
    $(document).on('blur', actualdaySelector, function() {
        if (this.value) {
        	calActuaDays();
        }
    });
    */
    
    //-----------------------------------------------自动计算占用天数，到期交割日----------------------------------------------------------------
    var deadLineSelector = '#t20052Bond_form [name="bondCntr.deadLine"]';
    $(document).on('blur', deadLineSelector, function() {
    	calMaturityDate();
    });
    
   //-----------------------------------------------计算融券面额----------------------------------------------------------------
    var bondamSelector = '#t20052Bond_form [name="bondCntr.bondCode"], ' +
    		'#t20052Bond_form [name="bondCntr.lendingRate"],#t20052Bond_form [id="actualdays"]';
    $(document).on('change', bondamSelector, function() {
        calPodageAmt();
    });
    
    $(document).on('blur','input[name="bondCntr.BONDAM"]',calPodageAmt);
    

    //***************************************************质押明细查询及回显 START************************************************************
//--------------------------------------//债券查询
    $(document).on('click','#doItemSearch',
        function(){
            //以下四个分别是     资产分类    债券代码    左范围  右范围
            var assetsType = $("#searchCondition #assetsType").val();
            var bondCode   = $("#searchCondition #a_bondCode").val();
            var range1     = getMoneyValue($("#searchCondition #range1").val()); 
            var range2     = getMoneyValue($("#searchCondition #range2").val()); 
            var strstr = "";
            $.ajax({
                type : "post",
                global : false,
                async : false,
                url : '/cpms/linkus/capital/bond/bussiness/bondPublic/findBondTeambook',
                data : {
                    "assetsType":assetsType,
                    "bondCode":bondCode,
                    "range1":range1,
                    "range2":range2
                },
                dataType : "json",
                success : function(data) {
                 if (data != null) {
                    var teamInfo = null;
                    for(var i=0;i<data.bondTeambookList.length;i++){
                        bondTeamBook = data.bondTeambookList[i];  
                        var $rtrs = $("#rightTable tbody tr");
                        var added = false;
                        for(var j=0;j<$rtrs.length;j++){
                        	var hadTeamId = $rtrs.eq(j).attr("id");
                        	var hadBondCode = $rtrs.eq(j).children().eq(0).text();
                        	if (hadTeamId == bondTeamBook.teamId && hadBondCode == bondTeamBook.bondCode){
                        		added = true;
                        		break;
                        	}
                        }
                        if(added) continue;
                        //投组名称做展示用    投组ID藏到tr的id中   等页面保存时将投组ID取出    写入到隐藏的列中
                        strstr+='<tr id="'+bondTeamBook.teamId+'" name="bookId_'+bondTeamBook.bookId+'">'+
                                '<td name="subjectMappingCode_'+bondTeamBook.subjectMappingCode+'" style="width:70px;height:40px;border-right:1px solid #ddd;background-color:#fff;">'+bondTeamBook.bondCode+'</td>'+
                                '<td>'+bondTeamBook.teamName+'</td>'+                                                        //↓ 此处用BONDAM  获得的是NaN
                                '<td class="faceValueAmount">'+addThousandCharacter(bondTeamBook.bondam/10000)+'</td>'+
                                '<td class="faceValueAmountCanUse">'+addThousandCharacter((bondTeamBook.availableAmount/10000).toFixed(6))+'</td>'+
                                '<td class="assetsType" id="'+bondTeamBook.assetsType+'">'+bondTeamBook.assetsTypeName+'</td>'+
                            '</tr>';
                    }
                 }
                 //清除上次的查询结果      再加上本次的
                 $("#tableToSwap #leftTable tbody tr").remove();
                 $("#tableToSwap #leftTable tbody").append(strstr);
                },
				error:function(){
					doTheAlert('提示', errorTip);
				}
            });
    });

//--------------------------------------//将查询页面的信息写到input页面
    $(document).on('click','#btn_zqPrSearch',
        function(){
        	var totalPledgeAmount = getMoneyValue($("#rightTable tfoot td[id='totalPledgeBondAmount']").text());
        	if(totalPledgeAmount==null||totalPledgeAmount==0||totalPledgeAmount==""){
            	doTheAlert("提示","未录入质押面值!");
            	return;
            }
            var $pledgeBondAmount = $("#rightTable tbody td[class='pledgeBondAmount']");
            for(var i=0;i<$pledgeBondAmount.length;i++){
            	var pledgeBondAmount = getMoneyValue($pledgeBondAmount.eq(i).text());
            	if(pledgeBondAmount==""||pledgeBondAmount==null){
            		doTheAlert("提示","存在未录入融入面值的债券信息!");
            		return;
            	}
            }
            
            //获取源表中的所有行
            var $trs = $("#tableToSwap #rightTable tbody tr");

            //20161017修改为相同的投组提示重复
            //为源表的每一行与目标表做对比检查
            for (var i=0;i < $trs.length;i++){
        		var $src  = $trs.eq(i); //源行
            	var len = $("#zqCntrInfoTable tbody tr").length;
            	var added = false; //已累加在现有行上的标记
            	var empty = false; //空表标记
            	if($("#zqCntrInfoTable tbody tr").eq(0).children().eq(1).children("input").val()){//非空表   无值则为空表
            		for(var j=0; j < len; j++){
                		var $dest = $("#zqCntrInfoTable tbody tr").eq(j).children(); //目标行
                		var desBondId = $dest.eq(1).children("input").val(); //目标行中债券代码
                    	var desTeamId = $dest.eq(5).children("input").val(); //目标中投组代码
                    	if (desBondId == $src.children().eq(0).text() && desTeamId == $src.attr("id")){//判断是否相同              			
                    		doTheAlert("提示","重复添加：" + "债券代码[" + desBondId +"] " + "投组[" + $dest.eq(3).children("input").val() + "]");
                    		return;
                    	}
                	}
            	}
            } 
            
            //注意事项:目标行数在循环中会增加  所以循环中不能使用$info！！！！！
            var $info = $("#zqCntrInfoTable tbody tr");
            //len和i为目标已有数据的行数  
            var i = len = $info.length;
            //若第一行中数据为空   则认为已有数据的行数为0
            if(!$info.eq(0).children().eq(1).children("input").val())
                i = len = 0;
            //信息传递从已有数据行之后开始 
            for(;i<$trs.length+len;i++){
                //新增一行(点击上一行的"+"号来实现)  如果第一行数据为空  直接覆写
                if(i>0)
                    $("#zqCntrInfoTable tbody tr").eq(i-1).children("[class='manipulate']").children().eq(0).click();
                //循环获取信息源  x行中
                var $src  = $trs.eq(i-len);
                //循环获取目标源  x行中的所有列
                var $dest = $("#zqCntrInfoTable tbody tr").eq(i).children();
                //写入信息
                $dest.eq(0).children("center").text(i+1);
                $dest.eq(1).children("input").val($src.children().eq(0).text());
                $dest.eq(2).children("input").val($src.children("[class='assetsType']").text());
                $dest.eq(3).children("input").val($src.children().eq(1).text());
                $dest.eq(4).children("input").val($src.children("[class='pledgeBondAmount']").text()).change();
                //将隐藏的投组ID传递到正回购页面上
                $dest.eq(5).children("input").val($src.attr("id"));
                $dest.eq(6).children("input").val($src.attr("name").substring(7));
                $dest.eq(7).children("input").val($src.children("[class='assetsType']").attr('id'));
            }
        
            //券面总额 
            var amountInput = $("#repoElement input[name='bondCntr.BONDAM'],#amount_transDirection_0");
            var amountValues = parseFloat((amountInput.val())?(amountInput.val()):0);
            var text = getMoneyValue($("#tableToSwap table #totalPledgeBondAmount").text());
            var newAmountValue = (text?text:0);
            amountInput.val(amountValues*1+newAmountValue).change();
/*            //首期金额
            var ropoInitialAmount = $("#repoElement input[name='bondCntr.ropoInitialAmount'],#rAmount_transDirection_0");
            var ropoInitialValues = parseFloat(ropoInitialAmount.val()?ropoInitialAmount.val():0);
            text = $("#tableToSwap table #totalSettleAmount").text();
            newAmountValue = removeThousandCharacter(text?text:0);
            ropoInitialAmount.val(ropoInitialValues+newAmountValue);*/
            //到期金额
            //calculateMaturityAmount();
            //标记最后一行
            $("#zqCntrInfoTable tbody tr:last").click();
            //目标行只读
            $("#zqCntrInfoTable tbody tr input").attr("readonly","");
            //关闭查询页面
            $(document).find("#btn_close_zqPrSearch").click();
            //聚焦债券代码
            $("#zqCntrInfoTable tbody tr:last td input").eq(0).focus();
//            var pledgeBondAmount = getMoneyValue($("#pledgeBondAmount").val());
//            if(pledgeBondAmount == ''){
//            	$("#pledgeBondAmount").val(totalPledgeAmount*10000).change();
//            }else{
//            	pledgeBondAmount = parseFloat(pledgeBondAmount)+totalPledgeAmount*10000;
//            	$("#pledgeBondAmount").val(pledgeBondAmount).change();
//            }
            var $pledgeBondAmount = $("#zqCntrInfoTable tbody td[class='pledgeBondAmount_']");
            var totalPledgeAmount=0;
            for(var i=0;i<$pledgeBondAmount.length;i++){
				PledgeAmount = getMoneyValue($("input[name='bondCntr.bondPledgeItems["+i+"].BONDAM']").val());
				totalPledgeAmount +=  PledgeAmount*1;//求出总和 (*1是为了可以直接相加,而不是拼接字符串)
			}
			$("input[name='bondCntr.pledgeBondAmount']").val(parseFloat(totalPledgeAmount*10000).toFixed(2)).change();
            parent.closePage();
    });
    
    //***************************************************质押明细查询及回显 END************************************************************
    
    
    //--------------------------------------// 删除已选定的债券信息
    $(document).on('click','#transDirection_0_remove',
        function(){
            var thisAmount = 0;
            //获取选中行的债券代码
            var bondCode = $("#transDirection_0 .justMark1 td input").eq(0).val();
            var trLength = $("#transDirection_0 tbody tr").length;
            if(bondCode)//此判断条件只是为了没有标记行时      点击删除按钮不弹出confirm框 
                getTheMessager().confirm("提示",'确定是要删除"'+bondCode+'"的信息吗？',function(e){
                	if(!e) 
                		return;
                    thisAmount  = removeThousandCharacter($("#transDirection_0 .justMark1 td input").eq(3).val()?$("#transDirection_0 .justMark1 td input").eq(3).val():0);
                    //若有多行 删除标记的行    只有一行则将该行的数据清除
                    if(trLength>1){
                        var index = $("#transDirection_0 tbody tr[class='justMark1']").index();
                        //删除标记行(点击本行的"-"号来实现)
                        $("#transDirection_0 .justMark1").children("[class='manipulate']").children().eq(1).click();
                        //重新写序号
                        for(var i= index;i<trLength-1;i++){
                            $("#transDirection_0 tbody tr").eq(i).children().eq(0).children().text(i+1);
                        }
                        //标记下一行   若删除的是最后一行  则标记上一行
                        var $nextLine = $("#transDirection_0 tbody tr").eq(trLength == index+1?index-1:index);
                        $nextLine.click();
                        $nextLine.children().eq(1).children().focus();
                    }
                    else{
                        //移除标记
                        $("#transDirection_0 tbody tr").removeClass("justMark1");
                        //移除所有旗帜图片
                        $(".flagImg").remove();
                        //清空第一行信息
                        var trInfo = $("#transDirection_0 tbody tr td").children();
                        trInfo.eq(0).text("");
                        trInfo.val("");
                    }
                    //减去删除行的质押面值    若删完了  则券面总额显示为空串
                    var $pledgeBondAmount = $("#zqCntrInfoTable tbody td[class='pledgeBondAmount_']");
		            var totalPledgeAmount=getMoneyValue($pledgeBondAmount.val());
		            for(var i=0;i<$pledgeBondAmount.length;i++){
						PledgeAmount = getMoneyValue($("input[name='bondCntr.bondPledgeItems["+i+"].BONDAM']").val());
						totalPledgeAmount -=  PledgeAmount*1;//求出总和 (*1是为了可以直接相加,而不是拼接字符串)
					}
					$("input[name='bondCntr.pledgeBondAmount']").val(totalPledgeAmount?totalPledgeAmount:"").change();
			
//                    var amountInput = $("input[name='bondCntr.pledgeBondAmount'],#amount_transDirection_0");
//                    amountInputValue = parseFloat(amountInput.val()?amountInput.val():0);
//                    var actual = amountInputValue-thisAmount*10000;
//                    amountInput.val(actual?actual:"");
                });
    });
    
/*    //--------------------------------------//合计结算
    function zqCntrEvalTotal(){
        //面值
        var $faceValueAmounts = $("#tableToSwap #rightDiv tbody td[class='faceValueAmount']");
        //可用面值
        var $faceValueAmountCanUses = $("#tableToSwap #rightDiv tbody td[class='faceValueAmountCanUse']");
        //融入面值
        var $pledgeBondAmounts = $("#tableToSwap #rightDiv tbody td[class='pledgeBondAmount']");
        //数值总和计算中使用的变量
        var total;
    //计算总面值
        for(var i=0,total=0;i<$faceValueAmounts.length;i++){
            var param = $faceValueAmounts.eq(i).text();
            if(param=="")
                param=0;
            total +=removeThousandCharacter(param);
        }
        $("#totalFaceValueAmount").text(addThousandCharacter(total));
    //计算总可用面值
        for(var i=0,total=0;i<$faceValueAmountCanUses.length;i++){
            var param = $faceValueAmountCanUses.eq(i).text();
            if(param=="")
                param=0;
            total +=removeThousandCharacter(param);
        }
        $("#totalFaceValueAmountCanUse").text(addThousandCharacter(total));
    //计算总质押面值
        for(var i=0,total=0;i<$pledgeBondAmounts.length;i++){
            var param = $pledgeBondAmounts.eq(i).text();
            if(param=="")
                param=0;
            total +=removeThousandCharacter(param);
        }
        $("#totalPledgeBondAmount").text(addThousandCharacter(total));
        totalPledgeAmount = total;
    }*/

   //-----------------------------------------------监听投组明细添加一行td 将资产类型赋值为T-------------------------------------------------
    $(document).on('click',"#bondPledgeInvestItemsTab",
        function (){
        	var tabSize = $("#bondPledgeInvestItemsTab tbody tr").length;
            for(i=0;i<tabSize;i++){
            	var dynicTdName = "bondCntr.teamBookItems["+i+"].assetsType";
            	var tagerTD = $("#t20052Bond_form [name='"+dynicTdName+"']");
            	var ts = tagerTD.val();
            	if(!ts){
                    tagerTD.val('T');
            	}
            }
        });
    
        //---------------------------------------//input页面保存
    $(document).on('click','#doBondPledgeSave',dealBondData);
});

	$(document).on('change','.bond_team',function (){
    	//alert("1");
		var $trs = $("#bondPledgeInvestItemsTab tbody tr");
		for (var i=0;i< $trs.length;i++){
			var $sel = $trs.eq(i).children().eq(1).children().children("select");
			if ($sel.is($(this)))
				continue;
			if ($(this).val() == "" || $(this).val() == "请选择")
				continue;
			if ($(this).val() == $sel.val()){
				doTheAlert("重复", "已添加该投组！");
				$(this).val("请选择");
			}
		}
    });


function dealBondData(){
		//判断期限大于0
		var deadLine = $("input[name='bondCntr.deadLine']").val();
		if(!deadLine||deadLine<=0){
			doTheAlert("提醒","期限必须大于0。");
			return false;
		}
		
		
		
		
    	//保存前值的校验
    	var bondAm=0;
    	var totalBONDAM=0;
    	var BONDAM = getMoneyValue($("input[name='bondCntr.BONDAM']").val());
    	var lendingRate = $("#lendingRate").val();
    	var $faceValueAmount = $("#bondPledgeInvestItemsTab tbody td[class=faceValueAmount]");
    	for(var i=0;i<$faceValueAmount.length;i++){
    		bondAm = getMoneyValue($("input[name='bondCntr.teamBookItems["+i+"].BONDAM']").val());
			totalBONDAM +=  bondAm*1;//求出总和 (*1是为了可以直接相加,而不是拼接字符串)
			
			var teamName = $("select[name='bondCntr.teamBookItems["+i+"].teamId'] option:selected").text();
			$("input[name='bondCntr.teamBookItems["+i+"].teamName']").val(teamName);
    	}
//    	alert("BONDAM: "+BONDAM+"   totalBONDAM: "+totalBONDAM);
    	if(BONDAM==""){
    		doTheAlert("提示","请输入融券面额!");
    		return false;
    	}
    	if(lendingRate==""){
    		doTheAlert("提示","请输入借贷费率!");
    		return false;
    	}
    	if((parseFloat(BONDAM).toFixed(2))!=(parseFloat(totalBONDAM).toFixed(2))){
    		doTheAlert("提示","明细中面值总额与融券面额不符!");
    		return false;
    	}
    	var deliveryDate = $("#deliveryDate").val();//首期交割日
        var maturityDate = $("#maturityDate").val();//到期交割日
        var actualdays = calculateDateInterval(deliveryDate, maturityDate);
        if(actualdays <= 0){
            doTheAlert("提示","到期交割日必须在首期交割日之后!");
            $('#actualdays').val("");//实际占用天数
            $('#fhsxfd').val("");//借贷期限
            return false;
        }
    	var $bondTeam = $("#bondPledgeInvestItemsTab tbody td[class='bondTeam']");
    	for(var i=0;i<$bondTeam.length;i++){
    		var bondTeamVal = $bondTeam.eq(i).children().children().val();
    		if(bondTeamVal=="请选择" || bondTeamVal==""){
    		    doTheAlert("提示","明细中投组数据录入不全!");
    		    return false;
    		}
    	}
    	
    	//判断质押债券不与本行债券一样
    	var bondCode = $("input[name='bondCntr.bondCode']").val();
    	var $pledgeBondCode = $("#zqCntrInfoTable tbody td[class=pledgeBondCode]");
    	if($pledgeBondCode.eq(0).children().val()==""){
    		doTheAlert("提示","质押明细信息不能为空!");
    		return false;
    	}
    	console.log($pledgeBondCode.eq(0).children().val());
    	for(var i=0;i<$pledgeBondCode.length;i++){
    		var pledgeBondCode = $("input[name='bondCntr.bondPledgeItems["+i+"].bondCode']").val();
    		if(pledgeBondCode==bondCode){
    			doTheAlert("提示","请选择与 "+bondCode+" 不同的债券!");
    			return false;
    		}
    	}
    	
        $("#bondPledgeInvestItemsTab tbody td[class='assetsType']").removeAttr('disabled');//将资产类型disabled去除,保证能保存
        $("#maturityDeliveryType").removeAttr('disabled');
//      $("#bondPledgeInvestItemsTab tbody td[class='assetsType']").attr('disabled','');
        return true;
    }