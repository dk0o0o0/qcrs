//债券融出首期
//---------------------------------------//打开债券查询页面-------------------------------------------------------------------------------
    $(document).on('click','#goBESearchPage',
        function(){
        	var bondCode = $('#t20054Bond_form [name="bondCntr.bondCode"]').val();
        	if(!bondCode||bondCode==""){
        		doTheAlert("提示","请输入债券代码!");
        		return;
        	}
        	window.open("/cpms/linkus/capital/bond/bussiness/t20054Bond/examSearchPage4BondPledge?bondCode="+bondCode,{width:'95%'});
    });

    //----------------------------------根据债券代码回显债券简称-----（部分业务可公共）-------------------------------------------
    var selector = '#t20054Bond_form [name="bondCntr.bondCode"]';
    $(document).on('keydown', selector, function(event) {
                if (event.keyCode == 13) {
                    $(this).blur();	
                    return false;
                }
            });
    
    $('#t20054Bond_form [name="bondCntr.bondCode"]').unbind('blur').blur(function(){
    	if (this.value) {
            seacherBondInfo();
        }
    });
    /*
    //-----------------------------------------------自动计算占用天数，借贷期限----------------------------------------------------------------
    var actualdaySelector = '#t20054Bond_form [name="bondCntr.deliveryDate"], #t20054Bond_form [name="bondCntr.maturityDate"]';
    $(document).on('blur', actualdaySelector, function() {
        if (this.value) {
        	calActuaDays();
        }
    });
    */
    
    //-----------------------------------------------自动计算占用天数，到期交割日----------------------------------------------------------------
    var deadLineSelector = '#t20054Bond_form [name="bondCntr.deadLine"]';
    $(document).on('blur', deadLineSelector, function() {
    	calMaturityDate();
    });
    
    function calPodageAmt(){
        var bondCode = $('#bondCode').val(); //债券代码
        var bondam = getMoneyValue($('#BONDAM').val()); //融券面额
        var lendingRate = $('#lendingRate').val(); //借贷费率
        var actualdays = $('#actualdays').val(); //实际占用天数
        if (bondCode!=''&bondam!=''&lendingRate!=''&actualdays!=''&actualdays!=0) {
            var bondamTemp = parseFloat(bondam)*10000*parseFloat(lendingRate)/100*parseFloat(actualdays)/365;
            $('#podageAmt').val(bondamTemp.toFixed(2)).change();//融券费用
        }else{
            $('#podageAmt').val(0);//清空 融券费用
        }
    }
    
   //-----------------------------------------------计算融券面额----------------------------------------------------------------
    var bondamSelector = '#t20054Bond_form [name="bondCntr.bondCode"], ' +
            '#t20054Bond_form [name="bondCntr.lendingRate"],#t20054Bond_form [id="actualdays"]';
    $(document).on('change', bondamSelector, function() {
    	calPodageAmt();
    });
     $(document).on('blur','input[name="bondCntr.BONDAM"]',calPodageAmt);
    
    //------------------------点击当前行添加标记
    $(document).on('click','#bondPledgeInvestItemsTab tbody tr',
		function(){
			//移除所有标记
			$("#bondPledgeInvestItemsTab tbody tr").removeClass("justMark0");
			//添加标记
			$(this).addClass("justMark0");
	});
	$(document).on('blur','.justMark0 td[class="faceValueAmount"]',function(){
		var $totalBONDAM = $("#bondPledgeInvestItemsTab tbody td[class='faceValueAmount']");
		var totalBONDAM=0;
		//总面值
		for(var i=0;i<$totalBONDAM.length;i++){
			bondAm = getMoneyValue($("input[name='bondCntr.bondPledgeItems["+i+"].BONDAM']").val());
			totalBONDAM +=  bondAm*1;//求出总和 (*1是为了可以直接相加,而不是拼接字符串)
		}
		$("input[name='bondCntr.pledgeBondAmount']").val(totalBONDAM*10000).change();
	});
    
    
//----------------------------------------------------累加计算质押面值-------------------------------------------------------------
//    var testSelector = 'td[class="faceValueAmount"]';
//    $(document).on('change', testSelector, function() {
//        var bondPledgeAmount = $("#pledgeBondAmount").val();//总面值
//        
//        var targeTD = $(this).children().children();
//        var hiddenNameTemp = targeTD[0].name;
//        var hiddenName = 'oldBONDAMVal' + hiddenNameTemp.substring(hiddenNameTemp.indexOf('['),hiddenNameTemp.indexOf(']')+1);
//        var oldBondAmVal = $('#t20054Bond_form [name="'+hiddenName+'"]').val();//旧面值
//        var newBondAmVal = targeTD.val();//新面值
//        //将质押合计面值回显到交易信息对应字段
//        if(oldBondAmVal == ''){
//            if(bondPledgeAmount ==''){
//                bondPledgeAmount = parseFloat(newBondAmVal*10000);
//            }else{
//                bondPledgeAmount = parseFloat(bondPledgeAmount)+parseFloat(newBondAmVal*10000);
//            }
//        }else{
//            bondPledgeAmount = parseFloat(bondPledgeAmount/10000)-parseFloat(oldBondAmVal)+parseFloat(newBondAmVal);
//            bondPledgeAmount = parseFloat(bondPledgeAmount*10000);
//        }
//        
//        $("#pledgeBondAmount").val(bondPledgeAmount)
//        $('#t20054Bond_form [name="'+hiddenName+'"]').val(newBondAmVal);
//    });
    
            //---------------------------------------//input页面保存
    $(document).on('click','#do20054Save',dealBondData);
    
    //--------------------------------------//债券查询
    $(document).on('click','#doItemSearch',
        function(){
            //以下四个分别是     资产分类    债券代码    左范围  右范围
            var assetsType = $("#searchCondition #assetsType").val();
            var bondCode   = $("#searchCondition #bondCode").val();
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
        	var $pledgeBondAmount = $("#rightTable tbody td[class='pledgeBondAmount']");
			for(var i=0;i<$pledgeBondAmount.length;i++){
            	var pledgeBondAmount = getMoneyValue($pledgeBondAmount.eq(i).text());
            	if(pledgeBondAmount==""||pledgeBondAmount==null){
            		doTheAlert("提示","存在未录入融出面值的债券信息!");
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
                    	var desTeamId = $dest.eq(6).children("input").val(); //目标中投组代码
                    	if (desBondId == $src.children().eq(0).text() && desTeamId == $src.attr("id")){//判断是否相同              			
                    		doTheAlert("提示","重复添加：" + "债券代码[" + desBondId +"] " + "投组[" + $dest.eq(3).children("input").val() + "]");
                    		return;
                    	}
                	}
            	}
            } 
            
            //获取目标表中的所有行     
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
            	$dest.eq(4).children("input").val($src.children("[class='pledgeBondAmount']").text());
            	$dest.eq(5).children("input").val($src.children("[class='pledgeBondAmount']").text());
            	//将隐藏的投组ID传递到融入/融出页面上
            	$dest.eq(6).children("input").val($src.attr("id"));
            	$dest.eq(7).children("input").val($src.attr("name").substring(7));
            	$dest.eq(8).children("input").val($src.children("[class='assetsType']").attr('id'));
            	$dest.eq(9).children("input").val($src.children().eq(0).attr("name").substring(19));
            }
            
            //券面总额 
            var amountInput = $("#repoElement input[name='bondCntr.BONDAM'],#amount_transDirection_0");
            var amountValues = parseFloat(amountInput.val()?amountInput.val():0);
            var text = $("#tableToSwap table #totalPledgeBondAmount").text();
            var newAmountValue = removeThousandCharacter(text?text:0);
            amountInput.val(amountValues+newAmountValue);
/*            //首期金额
            var ropoInitialAmount = $("#repoElement input[name='bondCntr.ropoInitialAmount'],#rAmount_transDirection_0");
            var ropoInitialValues = parseFloat(ropoInitialAmount.val()?ropoInitialAmount.val():0);
            text = $("#tableToSwap table #totalSettleAmount").text();
            newAmountValue = removeThousandCharacter(text?text:0);
            ropoInitialAmount.val(ropoInitialValues+newAmountValue);*/
            //标记最后一行
            $("#zqCntrInfoTable tbody tr:last").click();
            //目标行只读
            $("#zqCntrInfoTable tbody tr input").attr("readonly","");
            //关闭查询页面
            $(document).find("#btn_close_zqPrSearch").click();
            //聚焦债券代码
            $("#zqCntrInfoTable tbody tr:last td input").eq(0).focus();
            
    });
    
        //--------------------------------------// 删除已选定的债券信息
    $(document).on('click','#transDirection_0_remove',
        function(){
            //获取选中行的债券代码
            var bondCode = $("#transDirection_0 .justMark1 td input").eq(0).val();
            var trLength = $("#transDirection_0 tbody tr").length;
            if(bondCode)//此判断条件只是为了没有标记行时      点击删除按钮不弹出confirm框 
                getTheMessager().confirm("提示",'确定是要删除"'+bondCode+'"的信息吗？',function(e){
                	if(!e) 
                		return;
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
                });
    });

/**校验对手方质押明细中债券代码是否存在和重复**/
function checkBond (bondCodeField){
	var $bondCodeField = $(bondCodeField);
	var bondCode = bondCodeField.value;
	//如果未输入债券代码  则不验证
	if(!bondCode)
		return;
	$.ajax({
		type : "post",
		global : false,
		async : false,
		url : '/cpms/linkus/capital/bond/bussiness/bondPublic/findTheBondByCode',
		data : { 
			"bondCode":bondCode
		},
		dataType : "json",
		success : function(data) {
		 if (data != null) 
		 	if(data.ifNull)
				{
		 		getTheMessager().alert("提示",data.tip,'',function(){
		 			bondCodeField.focus();
		 		});
		 	}
		},
		error:function(){
			doTheAlert('提示', errorTip);
		}
	});
	$tds = $("#bondPledgeInvestItemsTab tbody td[class='pledgeBondCode'] center input");
	for (var i=0;i<$tds.length;i++){
		if ($bondCodeField.is($tds.eq(i)))
			continue;
		var a = $tds.eq(i).val();
		if (bondCode == a){
	 		getTheMessager().alert("重复","已添加该债券",'',function(){
	 			bondCodeField.value = "";
	 			bondCodeField.focus();
	 		});
		}
	}
}

    
function dealBondData(){
		var deadLine = $("input[name='bondCntr.deadLine']").val();
		if(!deadLine||deadLine<=0){
			doTheAlert("提醒","期限必须大于0。");
			return false;
		}
    	//保存前页面的输入的值的校验
    	var transAmount=0;
    	var totalBONDAM=0;
    	var BONDAM = getMoneyValue($("input[name='bondCntr.BONDAM']").val());
    	var lendingRate = $("#lendingRate").val();
    	var $pledgeBondAmount = $("#zqCntrInfoTable tbody td[class=pledgeBondAmount_]");
    	var $faceValueAmount = $("#bondPledgeInvestItemsTab tbody td[class=faceValueAmount]");
    	if(lendingRate==""||lendingRate=="0"){
    		doTheAlert("提示","借贷费率录入有误!");
    		return false;
    	}
    	if(BONDAM==""||BONDAM=="0"){
    		doTheAlert("提示","融券面额录入有误!");
    		return false;
    	}
    	
    	if($pledgeBondAmount.eq(0).children().val()==""){
    		doTheAlert("提示","交易明细信息不能为空!");
    		return false;
    	}
    	if($faceValueAmount.eq(0).children().children().val()==""){
    		doTheAlert("提示","质押明细信息不能为空!");
    		return false;
    	}
    	for(var i=0;i<$pledgeBondAmount.length;i++){
    		transAmount = getMoneyValue($("input[name='bondCntr.teamBookItems["+i+"].BONDAM']").val());
    		totalBONDAM +=  transAmount*1;//求出总和 (*1是为了可以直接相加,而不是拼接字符串)
    	}
    	if((parseFloat(BONDAM).toFixed(2))!=(parseFloat(totalBONDAM).toFixed(2))){
    		doTheAlert("提示","投组明细合计与债券面额不等!");
    		return false;
    	}
    	//判断质押债券不与本行债券一样
    	var bondCode = $("input[name='bondCntr.bondCode']").val();
    	var $pledgeBondCode = $("#bondPledgeInvestItemsTab tbody td[class=pledgeBondCode]");
    	for(var i=0;i<$pledgeBondCode.length;i++){
    		var pledgeBondCode = $("input[name='bondCntr.bondPledgeItems["+i+"].bondCode']").val();
    		if(pledgeBondCode==bondCode){
    			doTheAlert("提示","请选择与 "+bondCode+" 不同的债券!");
    			return false;
    		}
    	}
    	
//    	var $form = $("#t20054Bond_form");
//		$form.attr("action",$("#actionBaseUrl").val()+"/businessRegister");
//		console.log($form.attr("action"));
//		var option = {
//			type:"post",
//			dataType:"json",
//			async:false,
//			success:function(data){
//				RG_MDInvok(data);
//			},
//			error:function(){
//				doTheAlert("提示","经办操作失败");
//			}
//		};
    	$("select").removeAttr('disabled');
    	return true;
    }
    
/*        //--------------------------------------//合计结算
    function zqCntrEvalTotal(){
        //面值
        var $faceValueAmounts = $("#tableToSwap #rightDiv tbody td[class='faceValueAmount']");
        //可用面值
        var $faceValueAmountCanUses = $("#tableToSwap #rightDiv tbody td[class='faceValueAmountCanUse']");
        //融出面值
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
    