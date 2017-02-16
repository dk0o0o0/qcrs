$(document).ready(function() {
	$(document).on('click', '#isTgDistribution', function() {
		$("#tgUnitDistribution").removeAttr("style");;
		$("#tgUnitDistribution").attr("style","display:block");
	});
	
	
	$(document).on('click', '#cancle1', function() {
		$("#tgUnitDistribution").removeAttr("style");
		
		var id_trusteeShipdetailslsLen= $('#id_trusteeShipdetails').find('tr').length;
		for(var i=id_trusteeShipdetailslsLen-1;i>0;i--){
			$('#id_trusteeShipdetails').find('tr').eq(i).find('td:last i').eq(1).click();
		}			
        if(id_trusteeShipdetailslsLen>0){
        	$('#id_trusteeShipdetails').find('input').val('');
        	$('#id_trusteeShipdetails').find('select').val('');
        }
		$("#tgUnitDistribution").attr("style","display:none");
	});
	
	
	
});