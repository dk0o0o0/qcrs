function provinceCity(currProvince){
	cityArray =new Array();
	cityArray[0]=new Array("北京市","东城|西城|崇文|宣武|朝阳|丰台|石景山|海淀|门头沟|房山|通州|顺义|昌平|大兴|平谷|怀柔|密云|延庆");
	cityArray[1]=new Array("上海市","黄浦|卢湾|徐汇|长宁|静安|普陀|闸北|虹口|杨浦|闵行|宝山|嘉定|浦东|金山|松江|青浦|南汇|奉贤|崇明");
	cityArray[2]=new Array("天津市","和平|东丽|河东|西青|河西|津南|南开|北辰|河北|武清|红桥|塘沽|汉沽|大港|宁河|静海|宝坻|蓟县");
	cityArray[3]=new Array("重庆市","万州|涪陵|渝中|大渡口|江北|沙坪坝|九龙坡|南岸|北碚|万盛|双桥|渝北|巴南|黔江");
	cityArray[4]=new Array("河北省","石家庄|邯郸|邢台|保定|承德|张家口|廊坊|唐山|秦皇岛|沧州|衡水");
	cityArray[5]=new Array("山西省","太原|大同|阳泉|长治|晋城|朔州|吕梁|忻州|晋中|临汾|运城");	
	cityArray[6]=new Array("内蒙古自治区","呼和浩特|包头|乌海|赤峰|呼伦贝尔盟|阿拉善盟|哲理木盟|兴安盟|乌兰察布盟|锡林郭勒盟|巴彦淖尔盟|伊克昭盟");
	cityArray[7]=new Array("辽宁省","沈阳|大连|鞍山|抚顺|本溪|丹东|锦州|营口|阜新|辽阳|盘锦|铁岭|朝阳|葫芦岛");
	cityArray[8]=new Array("吉林省","长春|吉林|四平|辽源|通化|白山|松原|白城|延边");
	cityArray[9]=new Array("黑龙江省","哈尔冰|齐齐哈尔|牡丹江|佳木斯|大庆|绥化|鹤岗|鸡西|黑河|伊春|大兴安岭");
	cityArray[10]=new Array("江苏省","南京|镇江|苏州|南通|扬州|盐城|徐州|连云港|常州|无锡|宿迁|泰州|淮安");
	cityArray[11]=new Array("浙江省","杭州|宁波|温州|嘉兴|湖州|绍兴|金华|舟山|台州|丽水");
	cityArray[12]=new Array("安徽省","合肥|芜湖|蚌埠|马鞍山|淮北|铜陵|安庆|黄山|滁州");
	cityArray[13]=new Array("福建省","福州|厦门|莆田|三明|泉州|漳州|南平|龙岩|宁德");
	cityArray[14]=new Array("江西省","南昌|景德镇|九江|鹰潭|萍乡|赣州|宜春|抚州|上饶");
	cityArray[15]=new Array("山东省","济南|青岛|淄博|枣庄|东营|烟台|潍坊|济宁|泰安|威海|日照|临沂|德州|聊城|菏泽|莱芜|滨州");
	cityArray[16]=new Array("河南省","郑州|开封|洛阳|平顶山|安阳|鹤壁|新乡|焦作|濮阳|许昌|三门峡|漯河|南阳|商丘|信阳|周口|驻马店|济源");
	cityArray[17]=new Array("湖北省","武汉|宜昌|荆州|襄樊|黄石|荆门|黄冈|十堰|恩施|潜江|天门|仙桃|随州|咸宁|孝感|鄂州");
	cityArray[18]=new Array("湖南省","长沙|常德|株洲|湘潭|衡阳|岳阳|邵阳|益阳|娄底|怀化|郴州|永州|湘西|张家界");
	cityArray[19]=new Array("广东省","广州|深圳|珠海|汕头|东莞|中山|佛山|韶关|江门|湛江|茂名|惠州|梅州|汕尾|河源|清远");
	cityArray[20]=new Array("广西壮族自治区","南宁|柳州|桂林|梧州|北海|防城港|钦州|贵港|玉林|贺州");
	cityArray[21]=new Array("海南省","海口|三亚");
	cityArray[22]=new Array("四川省","成都|绵阳|德阳|自贡|攀枝花|广元|内江|乐山|南充|宜宾|广安|达州|雅安|眉山|凉山|泸州");
	cityArray[23]=new Array("贵州省","贵阳|六盘水|遵义|安顺|铜仁");
	cityArray[24]=new Array("云南省","昆明|大理|曲靖|玉溪|昭通|西双版纳|丽江");
	cityArray[25]=new Array("西藏自治区","拉萨|日喀则");
	cityArray[26]=new Array("陕西省","西安|宝鸡|咸阳|铜川|渭南|延安");
	cityArray[27]=new Array("甘肃省","兰州|嘉峪关|酒泉|天水");
	cityArray[28]=new Array("宁夏回族自治区","银川|石嘴山|固原");
	cityArray[29]=new Array("新疆维吾尔自治区","乌鲁木齐|石河子");
	cityArray[30]=new Array("香港特别行政区","香港特别行政区");
	cityArray[31]=new Array("澳门特别行政区","澳门特别行政区");
	cityArray[32]=new Array("台湾省","台北|高雄|台南");

	var currProvincecurrProvince=currProvince;
	var i,j,k;
	
	document.all.selCity.length=0;
	for(i=0;i<cityArray.length;i++){
		if(cityArray[i][0]==currProvince){
			tmpcityArray = cityArray[i][1].split("|");
			for(j=0;j<tmpcityArray.length;j++){
				document.all.selCity.options[document.all.selCity.length]=new Option(tmpcityArray[j],tmpcityArray[j]);
			}
			return;
		}
		
	}
	
}