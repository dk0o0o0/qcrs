$(document).ready(function() {
	$(document).on("click", "#list_form table tr", function() {
 		$(this).find("input:radio").attr("checked","checked");
	});
});

//---------------------------IREPORT打印--------------------------------
function PreviewHTML(){
	var radio =  $("input:radio[name=check]:checked");
		if(radio == undefined){
			doTheAlert("提示","请先选择打印的数据！");		
			return;
		}else{
			if(radio.length>0){
				var acctno = $(radio).parents("tr").children("td").eq(1).text();
				var acctna = $(radio).parents("tr").children("td").eq(2).text();
				var brchno = $(radio).parents("tr").children("td").eq(3).text();
				var accttp = $(radio).parents("tr").children("td").eq(4).text();
				var onlnbl = $(radio).parents("tr").children("td").eq(5).text();
				var acckid = $(radio).parents("tr").children("td").eq(6).text();
				var dtitcd = $(radio).parents("tr").children("td").eq(7).text();
				var bkfild = $(radio).parents("tr").children("td").eq(8).text();
				var url="/com/linkus/capital/report/jasper?format=HTML&type=hostAcctTlog&acctno="+acctno+"&acctna="+acctna
				+"&brchno="+brchno+"&accttp="+accttp+"&onlnbl="+onlnbl+"&acckid="+acckid+"&dtitcd="+dtitcd+"&bkfild="+bkfild;
    			window.open(url,"HTML","height=800,width=400");
			}else{
				doTheAlert("提示","请先选择打印的数据！");		
				return;
			}
		}
}

function PreviewPDF(){
    var radio =  $("input:radio[name=check]:checked");
		if(radio == undefined){
			doTheAlert("提示","请先选择打印的数据！");		
			return;
		}else{
			if(radio.length>0){
				var acctno = $(radio).parents("tr").children("td").eq(1).text();
				var acctna = $(radio).parents("tr").children("td").eq(2).text();
				var brchno = $(radio).parents("tr").children("td").eq(3).text();
				var accttp = $(radio).parents("tr").children("td").eq(4).text();
				var onlnbl = $(radio).parents("tr").children("td").eq(5).text();
				var acckid = $(radio).parents("tr").children("td").eq(6).text();
				var dtitcd = $(radio).parents("tr").children("td").eq(7).text();
				var bkfild = $(radio).parents("tr").children("td").eq(8).text();
				var url="/com/linkus/capital/report/jasper?format=PDF&type=hostAcctTlog&acctno="+acctno+"&acctna="+acctna
				+"&brchno="+brchno+"&accttp="+accttp+"&onlnbl="+onlnbl+"&acckid="+acckid+"&dtitcd="+dtitcd+"&bkfild="+bkfild;
//				alert(url);
    			window.open(url,'PDF','height=400,width=800');
			}else{
				doTheAlert("提示","请先选择打印的数据！");		
				return;
			}
		}
}

//--------------------LODOP打印-------------------------------

var LODOP; //声明为全局变量   
function Preview() {	
		var radio =  $("input:radio[name=check]:checked");
		if(radio == undefined){
			doTheAlert("提示","请先选择打印的数据！");		
			return;
		}else{
			if(radio.length>0){
				var acctno = $(radio).parents("tr").children("td").eq(1).text();
				var acctna = $(radio).parents("tr").children("td").eq(2).text();
				var brchno = $(radio).parents("tr").children("td").eq(3).text();
				var accttp = $(radio).parents("tr").children("td").eq(4).text();
				var onlnbl = $(radio).parents("tr").children("td").eq(5).text();
				var acckid = $(radio).parents("tr").children("td").eq(6).text();
				var dtitcd = $(radio).parents("tr").children("td").eq(7).text();
				var bkfild = $(radio).parents("tr").children("td").eq(8).text();
				CreatePrintPage(accttp,brchno,brchno,brchno,accttp,accttp,acckid,acckid,bkfild,dtitcd,dtitcd,acctno,acctna,bkfild,bkfild,brchno);
  				LODOP.PREVIEW();	
			}else{
				doTheAlert("提示","请先选择打印的数据！");		
				return;
			}
		}
	
};

function Design() {		
	var radio =  $("input:radio[name=check]:checked");
		if(radio == undefined){
			doTheAlert("提示","请先选择打印的数据！");		
			return;
		}else{
			if(radio.length>0){
				var acctno = $(radio).parents("tr").children("td").eq(1).text();
				var acctna = $(radio).parents("tr").children("td").eq(2).text();
				var brchno = $(radio).parents("tr").children("td").eq(3).text();
				var accttp = $(radio).parents("tr").children("td").eq(4).text();
				var onlnbl = $(radio).parents("tr").children("td").eq(5).text();
				var acckid = $(radio).parents("tr").children("td").eq(6).text();
				var dtitcd = $(radio).parents("tr").children("td").eq(7).text();
				var bkfild = $(radio).parents("tr").children("td").eq(8).text();
				CreatePrintPage(accttp,brchno,brchno,brchno,accttp,accttp,acckid,acckid,bkfild,dtitcd,dtitcd,acctno,acctna,bkfild,bkfild,brchno);
  				LODOP.PRINT_DESIGN();	
			}else{
				doTheAlert("提示","请先选择打印的数据！");		
				return;
			}
		}
};
function Setup() {	
	var radio =  $("input:radio[name=check]:checked");
		if(radio == undefined){
			doTheAlert("提示","请先选择打印的数据！");		
			return;
		}else{
			if(radio.length>0){
				var acctno = $(radio).parents("tr").children("td").eq(1).text();
				var acctna = $(radio).parents("tr").children("td").eq(2).text();
				var brchno = $(radio).parents("tr").children("td").eq(3).text();
				var accttp = $(radio).parents("tr").children("td").eq(4).text();
				var onlnbl = $(radio).parents("tr").children("td").eq(5).text();
				var acckid = $(radio).parents("tr").children("td").eq(6).text();
				var dtitcd = $(radio).parents("tr").children("td").eq(7).text();
				var bkfild = $(radio).parents("tr").children("td").eq(8).text();
				CreatePrintPage(accttp,brchno,brchno,brchno,accttp,accttp,acckid,acckid,bkfild,dtitcd,dtitcd,acctno,acctna,bkfild,bkfild,brchno);
  				LODOP.PRINT_SETUP();	
			}else{
				doTheAlert("提示","请先选择打印的数据！");		
				return;
			}
		}		
};
function RealPrint() {	
	var radio =  $("input:radio[name=check]:checked");
		if(radio == undefined){
			doTheAlert("提示","请先选择打印的数据！");		
			return;
		}else{
			if(radio.length>0){
				var acctno = $(radio).parents("tr").children("td").eq(1).text();
				var acctna = $(radio).parents("tr").children("td").eq(2).text();
				var brchno = $(radio).parents("tr").children("td").eq(3).text();
				var accttp = $(radio).parents("tr").children("td").eq(4).text();
				var onlnbl = $(radio).parents("tr").children("td").eq(5).text();
				var acckid = $(radio).parents("tr").children("td").eq(6).text();
				var dtitcd = $(radio).parents("tr").children("td").eq(7).text();
				var bkfild = $(radio).parents("tr").children("td").eq(8).text();
				CreatePrintPage(accttp,brchno,brchno,brchno,accttp,accttp,acckid,acckid,bkfild,dtitcd,dtitcd,acctno,acctna,bkfild,bkfild,brchno);
  				if (LODOP.PRINTA()) 
				  doTheAlert("提示","已发出实际打印命令！"); 
				else 
				   doTheAlert("提示","放弃打印！"); 	
			}else{
				doTheAlert("提示","请先选择打印的数据！");		
				return;
			}
		}
};
function CreatePrintPage(number,dcmttp_name,h_subj_no,trans_date,jg_no,smryncd,acctno,assets_code,assets_name
                          ,payasq,rmbDesc,tranamUpper,tranamLower,hxlsh,oper_name,snu) {
		LODOP=getLodop();  
		LODOP.PRINT_INITA(10,10,962,633,"长沙银行传票");
		LODOP.ADD_PRINT_TEXT(29,171,24,26,"第");
		LODOP.ADD_PRINT_TEXT(29,194,58,26,number);
		LODOP.ADD_PRINT_TEXT(62,281,112,36,"长沙银行");
		LODOP.SET_PRINT_STYLEA(0,"FontSize",16);
		LODOP.SET_PRINT_STYLEA(0,"Bold",1);
		LODOP.ADD_PRINT_TEXT(62,546,100,36,"方传票");
		LODOP.SET_PRINT_STYLEA(0,"FontSize",16);
		LODOP.SET_PRINT_STYLEA(0,"Bold",1);
		LODOP.ADD_PRINT_TEXT(62,400,142,36,dcmttp_name);
		LODOP.SET_PRINT_STYLEA(0,"FontSize",16);
		LODOP.SET_PRINT_STYLEA(0,"Bold",1);
		LODOP.ADD_PRINT_TEXT(104,289,38,26,"科目");
		LODOP.ADD_PRINT_TEXT(104,326,65,26,h_subj_no);
		LODOP.ADD_PRINT_TEXT(104,397,124,26,trans_date);
		LODOP.ADD_PRINT_TEXT(104,558,62,26,"机构号：");
		LODOP.ADD_PRINT_TEXT(104,619,75,26,jg_no);
		LODOP.ADD_PRINT_TEXT(164,240,64,26,"户名：");
		LODOP.ADD_PRINT_TEXT(164,302,103,26,smryncd);
		LODOP.ADD_PRINT_TEXT(196,240,67,26,"账号：");
		LODOP.ADD_PRINT_TEXT(196,304,102,26,acctno);
		LODOP.ADD_PRINT_TEXT(223,240,69,26,"摘要：");
		LODOP.ADD_PRINT_TEXT(223,305,101,26,assets_code);
		LODOP.ADD_PRINT_TEXT(223,441,106,26,assets_name);
		LODOP.ADD_PRINT_TEXT(252,305,106,26,payasq);
		LODOP.ADD_PRINT_TEXT(282,238,112,26,"交易金额（大写）");
		LODOP.ADD_PRINT_TEXT(282,348,62,26,rmbDesc);
		LODOP.ADD_PRINT_TEXT(282,426,242,26,tranamUpper);
		LODOP.ADD_PRINT_TEXT(312,288,110,26,"（小写）  CNY");
		LODOP.ADD_PRINT_TEXT(312,427,241,26,tranamLower);
		LODOP.ADD_PRINT_TEXT(346,238,78,26,"交易流水号:");
		LODOP.ADD_PRINT_TEXT(346,315,77,26,hxlsh);
		LODOP.ADD_PRINT_TEXT(346,395,115,26,"交易类别:  转账");
		LODOP.ADD_PRINT_TEXT(346,512,59,26,"对方科目");
		LODOP.ADD_PRINT_TEXT(418,246,41,26,"记账:");
		LODOP.ADD_PRINT_TEXT(418,286,67,26,oper_name);
		LODOP.ADD_PRINT_TEXT(418,399,44,26,"复核");
		LODOP.ADD_PRINT_TEXT(418,566,64,26,snu);
		LODOP.ADD_PRINT_LINE(147,100,146,900,0,1);
		LODOP.ADD_PRINT_LINE(396,100,395,900,0,1);
}