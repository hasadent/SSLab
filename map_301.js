// 點資訊
var points = {}
points["entrance"] = { position: new google.maps.LatLng(23.558514, 120.471963), icon: 'map-images/entrance.png'};
points["sslab"] = { position: new google.maps.LatLng(23.562378, 120.478017), icon: 'map-images/lab.png'}; 
points["park0"] = { position: new google.maps.LatLng(23.560978, 120.477872), icon: 'map-images/park.png'}; 
points["park1"] = { position: new google.maps.LatLng(23.562557, 120.477445), icon: 'map-images/park.png'}; 


// 開車資訊
var items_car = {}
items_car["entrance_m"] = new google.maps.Marker(points["entrance"]);
items_car["sslab_m"] = new google.maps.Marker(points["sslab"]);
items_car["park0_m"] = new google.maps.Marker(points["park0"]);
items_car["park1_m"] = new google.maps.Marker(points["park1"]);

// 步行資訊
var items_walk = {}
items_walk["entrance_m"] = new google.maps.Marker(points["entrance"]);
items_walk["sslab_m"] = new google.maps.Marker(points["sslab"]);


// 停車場
items_car["park0"] = new google.maps.Polygon({
  paths: [
    new google.maps.LatLng(23.561135, 120.477764), 
    new google.maps.LatLng(23.560904, 120.477577),
    new google.maps.LatLng(23.560813, 120.477839),
    new google.maps.LatLng(23.560860, 120.478022),
    new google.maps.LatLng(23.560950, 120.478041),
  ],
  strokeColor: '#509c8f',
  strokeOpacity: 0.8,
  strokeWeight: 3,
  fillColor: '#509c8f',
  fillOpacity: 0.35
});

items_car["park1"] = new google.maps.Polygon({
  paths: [
    new google.maps.LatLng(23.562781, 120.477279), 
    new google.maps.LatLng(23.562437, 120.477756),
    new google.maps.LatLng(23.562279, 120.477622),
    new google.maps.LatLng(23.562624, 120.477129),
  ],
  strokeColor: '#509c8f',
  strokeOpacity: 0.8,
  strokeWeight: 3,
  fillColor: '#509c8f',
  fillOpacity: 0.35
});

// 路徑
items_car["path0"] = new google.maps.Polyline({
  path: [
    points["entrance"].position, 
    new google.maps.LatLng(23.560585, 120.473564), // 活中路口
    new google.maps.LatLng(23.559788, 120.474712), // 社科院後, 往管院路口
    new google.maps.LatLng(23.559743, 120.474801),
    new google.maps.LatLng(23.559478, 120.475723),
    new google.maps.LatLng(23.559517, 120.476142),
    new google.maps.LatLng(23.559694, 120.476388),
    new google.maps.LatLng(23.561543, 120.477815),
	new google.maps.LatLng(23.561990, 120.478170),
	new google.maps.LatLng(23.562162, 120.477919), // 樓梯
	new google.maps.LatLng(23.562352, 120.478067), // 實驗室門
	points["sslab"].position, 
  ],
  geodesic: true,
  strokeColor: '#3875d7',
  strokeOpacity: 1.0,
  strokeWeight: 2
});

items_walk["path0"] = new google.maps.Polyline({
  path: [
    points["entrance"].position, 
    new google.maps.LatLng(23.560585, 120.473564), // 活中路口
    new google.maps.LatLng(23.561813, 120.474567), // 行政大樓南往管院
	new google.maps.LatLng(23.561076, 120.475651), // 管院門口
	new google.maps.LatLng(23.561675, 120.476144),
	new google.maps.LatLng(23.562200, 120.477141), // 工院走廊
	new google.maps.LatLng(23.562376, 120.477273), // 工院走廊
	new google.maps.LatLng(23.562032, 120.477762), // 工院走廊 
	new google.maps.LatLng(23.562162, 120.477919), // 樓梯
	new google.maps.LatLng(23.562352, 120.478067), // 實驗室門
	points["sslab"].position, 
  ],
  geodesic: true,
  strokeColor: '#3875d7',
  strokeOpacity: 1.0,
  strokeWeight: 2
});

// global map
var map;

function initialize() {
  // Create the map.
  var mapOptions = {
    zoom: 16,
    center: new google.maps.LatLng(23.561945, 120.475039),
    mapTypeId: google.maps.MapTypeId.SATELLITE
  };

  map = new google.maps.Map(document.getElementById('map-canvas'),
      mapOptions);

  document.getElementById("gr0").checked = true;
  test0();
}

google.maps.event.addDomListener(window, 'load', initialize);

function test0()
{
  for(var item in items_walk)
    items_walk[item].setMap(null);
  for(var item in items_car)
	items_car[item].setMap(map);
}

function test1()
{
  for(var item in items_car)
	items_car[item].setMap(null);
	
  for(var item in items_walk)
    items_walk[item].setMap(map);
}
