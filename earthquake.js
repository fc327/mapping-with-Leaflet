var myMap = L.map("map", {
  center: [37.7749, -122.4194],
  zoom: 15

 });

 var streetmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href='https://www.openstreetmap.org/'>OpenStreetMap</a> contributors, <a href='https://creativecommons.org/licenses/by-sa/2.0/'>CC-BY-SA</a>, Imagery © <a href='https://www.mapbox.com/'>Mapbox</a>",
  maxZoom: 15,
  id: "mapbox.streets",
  accessToken: API_KEY
 }).addTo(myMap);

 var url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

 d3.json(url, function(response) {

  // console.log(response);
  // console.log(response.features);

  var myLayer = L.geoJson(geojsonPopup, {
    style: function (feature) {
        return feature.properties.style;
    },
    onEachFeature: function (feature, layer) {
        layer.bindPopup(feature.properties.name);
    }
})
myLayer.addTo(myMap);

  var test=L.geoJSON(response.features, {
    pointToLayer: function (feature, latlng) {
      //function radiusSize (mag) {
      console.log(latlng);
      //}
      var geojsonEarthquake = {
        radius: feature.properties.mag*5,
        fillColor: "red",
        color: "yellow",
        weight: 1,
        opacity: 1,
        fillOpacity: 0.6
    };
  //   console.log(geojsonEarthquake);
        return L.circleMarker(latlng, geojsonEarthquake);
  }
 });
 myMap.addLayer(test);

});