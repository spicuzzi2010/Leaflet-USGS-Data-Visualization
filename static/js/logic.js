

var grayscaleMap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/light-v10",
    accessToken: API_KEY
});

var satellitemap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/satellite-v9",
    accessToken: API_KEY
});

var outdoorsMap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/outdoors-v11",
    accessToken: API_KEY
});

var baseMaps = {
    "Grayscale": grayscaleMap,
    "Satellite": satellitemap,
    "Outdoors": outdoorsMap
};


var myMap = L.map("map", {
    center: [39.82, -98.58],
    zoom: 5,
    layers: [grayscaleMap]
});

L.control.layers(baseMaps, null, {collapsed: false}).addTo(myMap);




// Store our API endpoint
var url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";
//var url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_month.geojson";

d3.json(url).then(function (data) {
    console.log(data);

    function circleColor(depth) {
        switch (true) {
            case depth > 90:
                return "#ea2c2c";
            case depth >= 70:
                return "#ea822c";
            case depth >= 50:
                return "#ee9c00";
            case depth >= 30:
                return "#eecc00";
            case depth >= 10:
                return "#d4ee00";
            case depth >= -10:
                return "#98ee00";
        }
    }

    // set radiuss from magnitude
    function getRadius(magnitude) {
        if (magnitude === 0) {
            return 1;
        }
        return magnitude * 4;
    }

    function styleInfo(feature) {
        return {
            opacity: 1,
            fillOpacity: 1,
            fillColor: circleColor(feature.geometry.coordinates[2]),
            color: "#000000",
            radius: getRadius(feature.properties.mag),
            stroke: true,
            weight: 0.5
        };
    }


        L.geoJson(data, {
            pointToLayer: function (feature, latlng) {
                return L.circleMarker(latlng);
            },

            style: styleInfo,

            onEachFeature: function (feature, layer) {
                layer.bindPopup("<br>Location: " + feature.properties.place + "<br>Magnitude: " + feature.properties.mag + "<br>Depth: " + feature.geometry.coordinates[2]);
            }
        }).addTo(myMap);
        
        var legend = L.control({
        position: "bottomright"
        });

        // details for the legend
        legend.onAdd = function (map) {
            var div = L.DomUtil.create("div", "info legend");

            var labels = ["-10-10", "10-30", "30-50", "50-70", "70-90", "90+"];
            var grades = [9, 11, 31,51,71,91];
            
            div.innerHTML = '<div><b>Legend</b></div>';
            // Looping through 
            for (var i = 0; i < grades.length; i++) {
                div.innerHTML += '<i style="background:' 
                + circleColor(grades[i]) + '">&nbsp;&nbsp;</i>&nbsp;&nbsp;'
                +labels[i]+'<br/>';
            }
            return div;
        }

        // Finally, we our legend to the map.
        legend.addTo(myMap);
    });
