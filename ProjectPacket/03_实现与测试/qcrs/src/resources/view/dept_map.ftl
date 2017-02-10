<!DOCTYPE html>
<#escape x as x?html><html>
<head>
<title>地图</title>
<script>
var map;
var markers = [];
var depts = {};
var newMarker;
var successInfoWindow;
var geocoder;
function init(){
	if(typeof google == 'undefined'){
		var script = document.createElement('script');
		script.src = 'https://www.google.com/jsapi?callback=loadMaps';
		script.type = 'text/javascript';
		document.getElementsByTagName("head")[0].appendChild(script);
	}
}

function loadMaps(){
	var other_params = 'sensor=true&dept=CN';
	var key = $('meta[name="google-maps-key"]').attr('content');
	if(key)
		other_params+='&key='+key;
	if(typeof google != 'undefined' && typeof google.maps == 'undefined'){
		google.load("maps", "3", {other_params:other_params,'callback' : initMaps});
	}
}

function initMaps() {
  geocoder = new google.maps.Geocoder();
  map = new google.maps.Map(document.getElementById("map_container"), {
    zoom: ${Parameters.zoom!8},
<#if Parameters.lat??>
    center: new google.maps.LatLng(${Parameters.lat!}, ${Parameters.lng!}),
</#if>
    mapTypeId: google.maps.MapTypeId.ROADMAP
  });
<#if !Parameters.lat??>
  if(navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      map.setCenter(new google.maps.LatLng(position.coords.latitude,position.coords.longitude));
    }, function() {
       map.setCenter(new google.maps.LatLng(39.8954, 116.4087));
    });
  }
</#if>
	google.maps.event.addListener(map, 'click', placeNewMarker);
	google.maps.event.addListener(map, 'bounds_changed', closeSuccessInfoWindow);
	google.maps.event.addListener(map, 'idle', getMarkers);
	setTimeout(getMarkers,1000);
}
function getMarkers(){
	var bounds = map.getBounds();
	var southWest = bounds.getSouthWest();
	var northEast = bounds.getNorthEast();
	var url = '${actionBaseUrl}/markers?southWest='+southWest.lat().toFixed(6)+','+southWest.lng().toFixed(6)+'&northEast='+northEast.lat().toFixed(6)+','+northEast.lng().toFixed(6)+'&zoom='+map.getZoom();
	$.ajax({
		url:url, 
		global:false,
		dataType:'json',
		success:function(resp) {
			for( i=0;i<markers.length; i++ ) 
		        	removeMarker(markers[i]);
		    markers = [];
			for (var i = 0; i < resp.length; i++) 
				addMarker(resp[i]);
			}
	});
}

function addMarker(dept){
		if(newMarker){
			newMarker.setMap(null);
			newMarker = null;
		}
		var marker = new google.maps.Marker({
		      position: new google.maps.LatLng(dept.coordinate.latitude,dept.coordinate.longitude), 
		      draggable:true,
		      map: map, 
		      title:dept.name
		});
		marker.dept = dept;
		markers.push(marker);
		depts[dept.id+''] = dept;
		/*
    	google.maps.event.addListener(marker, "click", function() {
	    	  var infowindow = new google.maps.InfoWindow();
		      infowindow.setContent(dept.name);
		      infowindow.setPosition(marker.getPosition());
		      infowindow.open(map);
  		});
  		*/
  		google.maps.event.addListener(marker, "dragstart", function(event) {
		      marker.oldPosition = marker.getPosition();
  		});
  		google.maps.event.addListener(marker, "dragend", function(event) {
		      moveMarker(marker);
  		});
}
function removeMarker(marker){
		marker.setMap(null);
		marker = null;
}
function moveMarker(marker){
		var dept = marker.dept;
		if(!confirm('重新标注'+dept.name+'?')){
				if(marker.oldPosition)
					marker.setPosition(marker.oldPosition);
				return;
			}
			dept.coordinate = {
				latitude:marker.getPosition().lat().toFixed(6),
				longitude:marker.getPosition().lng().toFixed(6)
			};
			depts[dept.id+''] = dept;
			var data = {
				'dept.id':dept.id,
				'dept.coordinate.latitude':dept.coordinate.latitude,
				'dept.coordinate.longitude':dept.coordinate.longitude
			}	
			$.ajax({url:'${actionBaseUrl}/mark',data:data,global:false,success:function(resp){
				if(resp.actionMessages){
					  closeSuccessInfoWindow();	
					  successInfoWindow = new google.maps.InfoWindow();
				      successInfoWindow.setContent(resp.actionMessages[0]);
				      successInfoWindow.setPosition(marker.getPosition());
				      successInfoWindow.open(map);
				      }
				}});
}
function placeNewMarker(event){
	if($('.moveTo').hasClass('active'))
		return;
	if(!newMarker){
		newMarker = new google.maps.Marker({
		      position: event.latLng, 
		      map: map,
		      title: '空白'
		});
	}else{
		newMarker.setPosition(event.latLng);
	}
}
function closeSuccessInfoWindow(){
		if(successInfoWindow){
			successInfoWindow.close();
			successInfoWindow = null;
		}
}
function moveTo(dept){
	var r = depts[dept.id+''];
	if(r && r.coordinate)
		dept.coordinate = r.coordinate;
	if(dept.coordinate && dept.coordinate.latitude){
		map.panTo(new google.maps.LatLng(dept.coordinate.latitude,dept.coordinate.longitude));
		map.setZoom(9);
	}else{
		geocoder.geocode( { 'address': dept.fullname||dept.name}, function(results, status) {
	      if (status == google.maps.GeocoderStatus.OK) {
	        var pos = results[0].geometry.location;
	        map.setCenter(pos);
	        map.setZoom(9);
	        dept.coordinate = {
				latitude:pos.lat().toFixed(6),
				longitude:pos.lng().toFixed(6)
			};
			var data = {
			'dept.id':dept.id,
			'dept.coordinate.latitude':dept.coordinate.latitude,
			'dept.coordinate.longitude':dept.coordinate.longitude
			}
			$.ajax({url:'${actionBaseUrl}/mark',data:data,global:false,success:function(resp){if(resp.actionMessages)addMarker(dept)}});
	      } else {
	      	alert(status);
	      }
	    });
		
	}
}

function mark(dept){
	if(newMarker){
		if(!confirm('确认空白标注所在地是'+dept.name+'?'))
			return;
		dept.coordinate = {
			latitude:newMarker.getPosition().lat().toFixed(6),
			longitude:newMarker.getPosition().lng().toFixed(6)
		};
		var data = {
			'dept.id':dept.id,
			'dept.coordinate.latitude':dept.coordinate.latitude,
			'dept.coordinate.longitude':dept.coordinate.longitude
		}	
		$.ajax({url:'${actionBaseUrl}/mark',data:data,global:false,success:function(resp){if(resp.actionMessages)addMarker(dept)}});
		
	}else{
		alert('请先点击此地点在地图上的位置再标注');
		}
	
}

function markall(){
	var url = '${actionBaseUrl}/unmarked';
	$.getJSON(url,function(data){
		unmarked = data;
		nextRequestInQueue();
	});
}	

var unmarked = [];
var delayTime = 620;
function nextRequestInQueue(){	
	if (unmarked.length) {
        var item = unmarked.shift();
        geocoder.geocode( { 'address': item.label}, function (results, status) {
                  if (status == google.maps.GeocoderStatus.OK) {
                  		var pos = results[0].geometry.location;
                        var data = {
						'dept.id':item.value,
						'dept.coordinate.latitude':pos.lat().toFixed(6),
						'dept.coordinate.longitude':pos.lng().toFixed(6)
						}
						$.ajax({url:'${actionBaseUrl}/mark',data:data,global:false,success:function(resp){}});

                  } else {
                        if (status == "OVER_QUERY_LIMIT") {
                                delayTime *= 1.08;
                                unmarked.push(item);
                        }
                  }
                setTimeout(nextRequestInQueue, delayTime);
        });
            
    }
}



$(function(){
	$('#deptTree').treeview({
		url: '<@url value="/dept/children"/>'+ '?r=' + Math.random(),
		click:function(){
			if(typeof google == 'undefined' || typeof google.maps == 'undefined'){
				alert('请耐心等待地图加载完全');
			}
			var dept = $(this).closest('li').data('treenode');
			if($('.moveTo').hasClass('active')){
				moveTo(dept);
			}else{
				mark(dept);
			}
		},
		collapsed: true,
		unique: true
	});
	$('.markall').click(function(){
		if(!geocoder)
			alert('请耐心等待地图加载完全');
		markall()
		});
	init();
});
</script> 
</head> 
<body>
<div class="row-fluid">
  <div class="span3" style="height: 600px;overflow-y:scroll;overflow-x:hidden;">
  	<div class="btn-toolbar" style="margin-bottom:10px;">
		<div class="btn-group btn-switch">
		  <button class="btn active moveTo">移动</button>
		  <button class="btn mark">标注</button>
		</div>
		<div class="btn-group">
		  <button class="btn markall" title="标注所有未标注的">一键标注</button>
		</div>
	</div>
	<div id="deptTree"></div>
	</div>
	<div class="span9">
	<div id="map_container" style="height: 600px;"></div>
	</div>
</div>
</body> 
</html></#escape>