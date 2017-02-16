$(document).keydown(
		function(event){
			
		//正回购债券查询页面 查询/录入信息     逆回购债券信息提交
			//是否在债券搜索页面      通过查找页面上可见的id为#b_bondCode的输入框实现
			var ifZqPrSearchPage  = $("#b_bondCode").length;
			//回车键
			if(event.keyCode==13){
				if(ifZqPrSearchPage){
					$("#doItemSearch").click();
					return;
				}
				
			}
			
	});



var totalPledgeAmount = 0;
   //--------------------------------------------查询债券信息--------------------
   function seacherBondInfo(){
   	var maturityDate = $("input[name='bondCntr.maturityDate']").val();
    var bondCode = $("#bondCode").val();
	var $showTheBondInfo = $("#showTheBondInfo");
	$showTheBondInfo.removeAttr('href');
	$showTheBondInfo.hide();
    if(bondCode==""){
    	doTheAlert("提示","请输入债券代码!");
    	return;
    }
    var $bondName = $("#bondName");
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
        	if(data!=null){
				if(data.ifNull){
					getTheMessager().alert("提示",data.tip,'',function(){
			 			$("#bondCode").focus();//输入债券代码有误则继续聚焦此处
						$bondName.val("");
			 		});
				}else{
					var matureDate = data.bondBasicInfo.matureDate;
					$("#matureDate").val(matureDate);
					if(maturityDate!=null){
				    	var tip = "到期交割日期: ";
				    	compareToDeliveryDate(matureDate,maturityDate,tip);
				    }
					$bondName.val(data.bondName);
//					$("#bondBasicId").val(data.bondId);//详情页绑定的id
					$showTheBondInfo.attr('href',"/cpms/linkus/capital/bond/base/BondBasic/view?bondCode="+bondCode);
					$showTheBondInfo.show();
				}
			}
        },
		error:function(){
			doTheAlert('提示', errorTip);
		}
    });
   }
   
   //---------------------------------------//打开机构查询页面
/*    $(document).on('click','#goSBSearchPage',
        function(){
            var href = "/cpms/linkus/capital/bond/bussiness/bondPublic/businessSearchPage";
            $(this).next().attr("href",href);
            $(this).next().click();
    });*/
   
   
   //---------------------------------------//机构搜索---（可公共）-------------------------------------------------------------------------------
/*    $(document).on('click','#findAgencyByName',
    function (){
        var agencyName = $('#agencyName').val();
        var h = "";
        var tip = $("#searchAgencyNameTip");
        tip.text("搜索中，请稍候");
        $.ajax({
                type : "post",
                global : false,
                //async : true,
                url : '/cpms/linkus/capital/bond/bussiness/bondPublic/findAgency',
                data : {
                    "agencyName":agencyName
                },
                dataType : "json",
                success : function(data) {
                 if (data != null) {
                 for(var i = 0; i < data.LIST.length; i++) {
                            var json = data.LIST[i];
                            h += '<tr id="'+json['id']+'">'+
                                  '<td>'+json['name']+'</td>'+
                                  '<td><input type="button" value="选择" id="h" /></td>'+
                                  '</tr>';
                   }
                 }
                 $('#result').html(h);
                 tip.text('');
                }
            });
    });*/
//---------------------------------------//选定机构--（部分不需要"切换托管信息"的页面可公共）------------------------------------------------------------------------
    $(document).on('click','#result input[value="选择"]',
    function(){
        var str = "";
        var dealerNa="";
        var agencyId = $(this).parents("tr").attr("id");
        var agencyName = $(this).parents("td").prev().text();
        $.ajax({
            type : "post",
            global : false,
            async : true,
            url : '/cpms/linkus/capital/bond/bussiness/bondPublic/choiceEmulantAgency',
            data : {
                "agencyId":agencyId
            },
            dataType : "json",
            success : function(data) {
             if (data != null) {
                $("input[name='bondCntr.counterpartyName']").val(agencyName);
                $("#agencySimpName").val(data.agencySimpName);
                $("#bondReposUserName").val(data.userName);
                $("#transPlace").val(data.transPlace);
                var z=0;
                if(typeof(data.trusteeShipdetails) !="undefined" )
                    z = data.trusteeShipdetails.length;
                for(var i=0;i<z;i++){
                    var json = data.trusteeShipdetails[i];
                    if(json!=null)
                    str += "<option value='"+json.coutertyBankAcctNo+"' id='__"+json.escrowAcctNoName+"'>"+json.coutertyBankAcctNo+"</option>";
                }
                var N=0;
				if(typeof(data.userName) !="undefined" ){
			 		N = data.userName.dealerNameList.length;
				}
				for(var i=0;i<N;i++){
					var json = data.userName.dealerNameList[i];
					if(json!=null)
					dealerNa += "<option value='"+json.dealerName+"' id='__"+json.dealerName+"'>"+json.dealerName+"</option>";
				}
				$("#bondReposUserName").html(dealerNa);
                $("input[name='bondCntr.counterpartyNo']").val(agencyId);
                $("#coutertyBankSelect").html(str);
//                $("#addChangeShowName").children().remove();
//                if($("#coutertyBankSelect option").length>0);
//                    $("input[name='bondCntr.coutertyBankAcctNo']").val($("#coutertyBankSelect option").eq(0).val());
            	 }
//             $("#coutertyBankSelect").parent().prev().text("对手方托管账号");
             closePage();
             $("#escrowPlaceCode").trigger("change");
            },
			error:function(){
				doTheAlert('提示', errorTip);
			}
        });
    });
    
    //-----------------------------------------------清算速度改变交割日期
    $(document).on('change','select[name="bondCntr.settleDateType"]',function(){
    	changeSettleDateType();
    	calActuaDays();
    });
    
    
    function changeSettleDateType(){
    	var $deliveryDate = $('#deliveryDate');
		var settleDateType = $("select[name='bondCntr.settleDateType']").val();
		var $tradeDate = $("input[name='bondCntr.tradeDate']");
		if(settleDateType=="0"){
			$deliveryDate.val($tradeDate.val());
		}
		if(settleDateType=="1"){
			$deliveryDate.val(getNonHoliday(addDay($tradeDate.val(),1)).toString());
		}
    }
    
       //-----------------------------------------------自动计算占用天数，借贷期限----------------------------------------------------------------
    function calActuaDays(){
    		changeSettleDateType();
            var deliveryDate = $("#deliveryDate").val();//首期交割日
            var maturityDate = $("#maturityDate").val();//到期交割日
            var descDate = getNonHoliday(maturityDate);//顺延后的到期交割日
            var actualdays = calculateDateInterval(deliveryDate, descDate);
            var fhsxfd = calculateDateInterval(deliveryDate, maturityDate);
            if(actualdays < 0){
                //doTheAlert("提示","首期交割日不能大于到期交割日!");
                $('#actualdays').val(0);//实际占用天数
                $('#fhsxfd').val(0);//借贷期限
                return false;
            }else{
                $('#actualdays').val(actualdays);//实际占用天数
                $('#fhsxfd').val(fhsxfd);//借贷期限
                $('#actualdays').change();
            }
    }
    
  //-----------------------------------------------由借贷期限自动计算占用天数，到期交割日----------------------------------------------------------------
    function calMaturityDate(){
    	changeSettleDateType();
    	var fhsxfd = $('#fhsxfd').val() * 1;//借贷期限
    	if(fhsxfd <= 0){
    		doTheAlert("提示","借贷期限有误!");
    		return false;
    	}
    	var deliveryDate = $("#deliveryDate").val();//首期交割日
    	var maturityDate = calculateAddDate(deliveryDate, fhsxfd); //到期日
    	var descDate = getNonHoliday(maturityDate);//顺延后的到期交割日
    	var actualdays = calculateDateInterval(deliveryDate, descDate); //实际占用天数
    	$('#maturityDate').val(descDate);
    	$('#actualdays').val(actualdays);
    	$('#actualdays').change();
}
    
    //---------------------------------------//假日顺延
/*    function getNonHoliday(srcDate){
        var descDate = "";
        $.ajax({
                type : "post",
                global : false,
                async : false,
                url : '/cpms/linkus/capital/system/holiday/getNonHoliday',
                data : {
                    "srcDate":srcDate
                },
                dataType : "json",
                success : function(data) {
                 if (data != null) 
                    descDate = data.descDate;
                },
                error:function(){
                    doTheAlert("提示","日期顺延失败");
                }
            });
        return descDate;
    }*/
    
   //-----------------------------------------------计算两个日期间隔天数（可公共）---------------------------------------------------------------------------------------------
    function calculateDateInterval(date1,date2){
        //将年月日格式转成月日年再转成Date类型  通过毫秒数差来计算日期间隔
        var indexDate,oDate1,oDate2,days;
        indexDate = date1.split("-");
        oDate1 = new Date(indexDate[1]+"-"+indexDate[2]+"-"+indexDate[0]);
        indexDate = date2.split("-");
        oDate2 = new Date(indexDate[1]+"-"+indexDate[2]+"-"+indexDate[0]);
        days = parseInt((oDate2-oDate1)/1000/60/60/24);
        return days;
    }
    
   //-----------------------------------------------计算一个日期加上天数后的日期（可公共）-----------------------------------------------
    function calculateAddDate(date, days){
    	var d = new Date(date);
    	d.setDate(d.getDate()+days);
    	var m = d.getMonth()+1;
    	return d.getFullYear() + '-' + m +'-' + d.getDate();
    }
    
    
   //-----------------------------------------------计算融券面额---------------------------------------------------------------- 
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
    
        //---------------------------------------//关闭债券查询页面
    $(document).on('click','#btn_close_zqPrSearch',closePage);
//--------------------------------------//点击选取行
    $(document).on('click','#leftTable tbody tr,#rightTable tbody tr',
        function(){
            var tr = $(this);
            tr.toggleClass("selected");
        });
//--------------------------------------//移动选取的行
    //右移被双击的行
    $(document).on('dblclick','#tableToSwap #leftDiv tbody tr',
        function(){
            //隐藏td资产类型名称
            $(this).children("td[class='assetsType']").hide();
            //添加1个td 融入面值
            $(this).append($("<td style='width:150px;' class='pledgeBondAmount'></td>"));
            //将该行移至右边的表
            $('#rightTable tbody').append($(this));
            //清除选定时给定的样式
            $('#rightDiv tr').removeClass('selected');
            //合计
            zqCntrEvalTotal();
    });
    //点击右移按钮  右移所有选定行
    $(document).on('click','#goRight',
        function(){
            //选定所有被选中的行
            var $trs = $('#leftDiv tbody tr[class="selected"]');
            //隐藏td资产类型名称
            $($trs).children("td[class='assetsType']").hide();
            //添加1个td 融资金额
            $($trs).append($("<td style='width:225px;' class='pledgeBondAmount'></td>"));
            //将选定行移至右边的表
            $('#rightTable tbody').append($trs);
            //清除选定时给定的样式
            $('#rightTable tr').removeClass('selected');
            //合计
            zqCntrEvalTotal();
    });
    //点击左移按钮 右移动所有选定行
    $(document).on('click','#goLeft',
        function(){
            //选定所有被选中的行
            var $trs = $('#rightTable tbody tr[class="selected"]');
            //清除 td 融入面值 
            $($trs).children("td[class='pledgeBondAmount']").remove();
            //显示td资产类型名称
            $($trs).children("td[class='assetsType']").show();
            //将选定行移至左边的表
            $('#leftDiv tbody').append($trs);
            //清除选定时给定的样式
            $('#leftDiv tr').removeClass('selected');
            //合计
            zqCntrEvalTotal();
    });
    
    //--------------------------------------//合计结算
/*    function zqCntrEvalTotal(){
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
    //--------------------------------------//显示选定证券的信息
    $(document).on('dblclick','#tableToSwap #rightDiv tbody tr',
        function(){
            //清除所有行的标记
            $("#tableToSwap #rightDiv tbody tr td").removeClass("justMark");
            //给该行添加标记   以便修改信息的传递
            $(this).children("td").eq(0).addClass("justMark");
            //将该行的六列值传递到右上的债券计算模块中   以待修改/计算
            $("#b_pledgeBondAmount").val($(this).children("td[class='pledgeBondAmount']").text());
            $("#b_bondCode").val($(this).children().eq(0).text());
            $("#b_faceValueAmount").val($(this).children().eq(2).text());
            $("#b_faceValueAmountCanUse").val($(this).children().eq(3).text());
            //给出质押面值的汉字大写提示
            $("#b_pledgeBondAmount").change();
    });
    //提交质押率和质押面值
    $(document).on('click','#sureSubmit',function(){
            //获取债权计算模块中的 质押率和质押面值b_faceValueAmountCanUse b_faceValueAmount
            var amount = getMoneyValue($("#b_pledgeBondAmount").val());
            var faceValueAmountCanUse = getMoneyValue($("#b_faceValueAmountCanUse").val());//可用面值
            var faceValueAmount = getMoneyValue($("#b_faceValueAmount").val());//面值
            if(amount>parseFloat(faceValueAmountCanUse)){
            	doTheAlert("提示","质押面值不能超过可用面值!");
            	return;
            }
            var settleAmount = 0;
                if(amount){
                    settleAmount = eval(amount*100);
                    var flag =getMoneyValue($("#b_faceValueAmountCanUse").val())*10000>=settleAmount;
                    //如果融资金额大于0小与可用面值  则开始传值
                    if(settleAmount <= 0){
                    	doTheAlert("提示","融出面值不能为0");
                    	return;
                    }
                    else if(settleAmount>0&flag){
                        //将债券计算模块中的值传递到标记的行中
                        var $tr = $("#tableToSwap #rightDiv tbody td[class='justMark']").parents("tr");
                        $tr.children("td[class='pledgeBondAmount']").text((amount)).change();
                        //合计
                        zqCntrEvalTotal();
                        //清除债券计算模块中的值
                        $("#b_pledgeBondAmount").val("");
                        $("#b_bondCode").val("");
                        $("#b_faceValueAmount").val("");
                        $("#b_faceValueAmountCanUse").val("");
                        //更改质押面值汉字大写提示
                        $("#b_pledgeBondAmount").change();
                    }else{
                        doTheAlert("提示","可用面值不足");
                    }
                }else{
                   doTheAlert("提示","债券质押面值未录入！");
                }
        });
     
                //--------------------------------------//合计结算
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
            var param = getMoneyValue($faceValueAmounts.eq(i).text());
            if(param=="")
                param=0;
            total +=(param)*1;
        }
        $("#totalFaceValueAmount").text(addThousandCharacter(total));
    //计算总可用面值
        for(var i=0,total=0;i<$faceValueAmountCanUses.length;i++){
            var param = getMoneyValue($faceValueAmountCanUses.eq(i).text());
            if(param=="")
                param=0;
            total +=(param)*1;
        }
        $("#totalFaceValueAmountCanUse").text(addThousandCharacter(total));
    //计算总质押面值
        for(var i=0,total=0;i<$pledgeBondAmounts.length;i++){
            var param = getMoneyValue($pledgeBondAmounts.eq(i).text());
            if(param=="")
                param=0;
            total +=(param)*1;
        }
        $("#totalPledgeBondAmount").text(addThousandCharacter(total));
        totalPledgeAmount = total;
    }
        
            //---------------------------------------//点击标记选定的行
    //标记的图片
    //var flagImg = "<img class='flagImg' src='../../../../assets/images/flag.png'/>";
    var flagImg = "<i class='flagImg glyphicon glyphicon-flag'></i>"
    $(document).on('click','.transDirection_ tbody tr',
        function(){
            //移除所有标记
            $('.transDirection_ tbody tr').removeClass("justMark1");
            //移除所有旗帜图片
            $(".flagImg").remove();
            //若点击行非空 
            if($(this).children().eq(1).children().val()){
                //添加标记
                $(this).addClass("justMark1");
                //加上旗帜
                $(this).children().eq(0).children().append(flagImg);
            }
                
    });
        
    //---------------------------------------//给数字加上/除去千分号
    function addThousandCharacter(num){
        //传入的不是数字或者为空   返回原值
        if(isNaN(num)||!num)
            return num;
        var str;
        //如果传入的是小数   直接拆分
        num = num.toString();
        if(num.indexOf('.')!=-1)
            str = num.split(".");
        else//传入的是整数    防止return时str[1]下标越界      默认给两位小数
            str = parseFloat(num).toFixed(2).split(".");
        //零宽断言      如果某个字段是1~3位数字  并且它后面的数字个数是3的倍数   则给这个字段后加一个千分符
        str[0]=str[0].replace(/\d{1,3}(?=(\d{3})+$)/g,function(s){return s+','});
        return str[0]+"."+str[1];
    }
    function removeThousandCharacter(num){
        //用replace+正则的形式完成replaceAll的功能
        var returnNum = parseFloat(num.toString().replace(new RegExp(",",'g'),""));
            //传入的值为空或者解析后不是数字    则返回原值
            if(!num||isNaN(returnNum))
                return num;
        return returnNum;
    }
//--------------------------------------//将查询页面的信息写到input页面
/*    $(document).on('click','#btn_zqPrSearch',
        function(){
            //获取源表中的所有行
            var $trs = $("#tableToSwap #rightTable tbody tr");
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
                //将隐藏的投组ID传递到融入/融出页面上
                $dest.eq(5).children("input").val($src.attr("id"));
                $dest.eq(6).children("input").val($src.attr("name").substring(7));
                $dest.eq(7).children("input").val($src.children("[class='assetsType']").attr('id'));
            }
            //券面总额 
            var amountInput = $("#repoElement input[name='bondCntr.BONDAM'],#amount_transDirection_0");
            var amountValues = parseFloat(amountInput.val()?amountInput.val():0);
            var text = $("#tableToSwap table #totalPledgeBondAmount").text();
            var newAmountValue = removeThousandCharacter(text?text:0);
            amountInput.val(amountValues+newAmountValue);
            //首期金额
            var ropoInitialAmount = $("#repoElement input[name='bondCntr.ropoInitialAmount'],#rAmount_transDirection_0");
            var ropoInitialValues = parseFloat(ropoInitialAmount.val()?ropoInitialAmount.val():0);
            text = $("#tableToSwap table #totalSettleAmount").text();
            newAmountValue = removeThousandCharacter(text?text:0);
            ropoInitialAmount.val(ropoInitialValues+newAmountValue);
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
            $("#pledgeBondAmount").val(totalPledgeAmount*10000);
            
    });*/
    //***************************************************质押明细查询及回显 END************************************************************
    