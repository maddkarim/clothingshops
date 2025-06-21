// Using Leaflet for creating the map and adding controls for interacting with the map

//
// --- Part 1: Adding base maps ---

// Creating the map; centering on Salzburg city and setting zoom level.
// The map container has the ID 'map' in the HTML file.
var map = L.map('map', {
    center: [47.8095, 13.0550], // Centered on Salzburg city
    zoom: 13 // Closer zoom to see city-level detail
});

// Adding OpenStreetMap as the base map layer
var osmap = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);


// ---- Part 2: Adding a scale bar
//
L.control.scale({
    position: 'bottomright',
    imperial: false
}).addTo(map);

//
//
// ---- Part 3: Adding GeoJSON point features for clothing shops
//
// Load the GeoJSON file using fetch
fetch('data/clothshops.geojson')
  .then(response => response.json())
  .then(data => {
    console.log("Loaded shops:", data);

    L.geoJSON(data, {
      pointToLayer: function (feature, latlng) {
        return L.circleMarker(latlng, {
          radius: 6,
          fillColor: "#ff6600",
          color: "#fff",
          weight: 1,
          opacity: 1,
          fillOpacity: 0.8
        });
      },
      onEachFeature: function (feature, layer) {
        const props = feature.properties;
        layer.bindPopup(
          `<strong>${props.name || 'Unnamed shop'}</strong><br>` +
          `Type: ${props.shop || 'N/A'}<br>` +
          `Opening hours: ${props.opening_ho || 'Not listed'}`
        );
      }
    }).addTo(map);
  }); 


  // --- PART 4: Button to locate the user on demand ---

// Create a custom Leaflet control (button)
var locateControl = L.control({position: 'topright'});

locateControl.onAdd = function(map) {
    var div = L.DomUtil.create('div', 'leaflet-bar leaflet-control leaflet-control-custom');

    // Button style
    div.innerHTML = '<button id="locateBtn" title="Show My Location">📍</button>';
    div.style.backgroundColor = 'white';
    div.style.padding = '5px';

    return div;
};

locateControl.addTo(map);

// When the button is clicked, locate the user
document.getElementById('locateBtn').onclick = function() {
    map.locate({
        setView: true,
        maxZoom: 16
    });
};

// When location is found, add a marker and popup
map.on('locationfound', function(e) {
    L.marker(e.latlng)
        .addTo(map)
        .bindPopup("📍 You are here!")
        .openPopup();
});

// If location fails or is denied
map.on('locationerror', function(e) {
    alert("Geolocation error: " + e.message);
});

//---- Part 5: Adding GeoJSON points with popups and hover effects
let clothingShopsLayer;

fetch('data/clothshops.geojson')
  .then(response => response.json())
  .then(data => {
    clothingShopsLayer = L.geoJSON(data, {
      pointToLayer: function (feature, latlng) {
        return L.circleMarker(latlng, {
          radius: 8,
          fillColor: "#ff6600",
          color: "#ffffff",
          weight: 1,
          opacity: 1,
          fillOpacity: 0.9
        });
      },
      onEachFeature: function (feature, layer) {
        const props = feature.properties;
        let popupContent = `<b>${props.name || 'No name'}</b><br>`;
        popupContent += `<b>Working days:</b> ${props.opening_ho || 'Not listed'}<br>`;
        popupContent += `<b>Clothes type:</b> ${props.clothes || 'Not specified'}`;

        layer.bindPopup(popupContent);

        layer.on('click', function (e) {
          map.setView(e.latlng, 17);
          layer.openPopup();
        });

        layer.on('mouseover', function () {
          layer.setStyle({
            color: '#000000',
            weight: 3,
            fillColor: '#ffff00'
          });
        });

        layer.on('mouseout', function () {
          layer.setStyle({
            color: '#ffffff',
            weight: 1,
            fillColor: '#ff6600'
          });
        });
      }
    }).addTo(map);


// Create a simple search input control
var searchControl = L.control({ position: 'topleft' });

searchControl.onAdd = function(map) {
  var container = L.DomUtil.create('input', 'leaflet-bar leaflet-control');
  container.type = 'text';
  container.placeholder = 'Search shops...';
  container.style.padding = '5px';
  container.style.width = '150px';

  // Prevent map dragging when interacting with input
  L.DomEvent.disableClickPropagation(container);
  L.DomEvent.disableScrollPropagation(container);

  container.oninput = function() {
    var val = this.value.toLowerCase();

    clothingShopsLayer.eachLayer(function(layer) {
      var name = layer.feature.properties.name.toLowerCase();
      if (name.includes(val)) {
        layer.setStyle({ fillColor: 'yellow', color: 'black', weight: 3 });
        layer.openPopup();
        map.setView(layer.getLatLng(), 16);
      } else {
        layer.setStyle({ fillColor: '#ff6600', color: '#ffffff', weight: 1 });
        layer.closePopup();
      }
    });
  };

  return container;
};

searchControl.addTo(map);



    //---- Part 6: Adding a layer control for base maps and feature layers

    var baseMaps = {
      "OpenStreetMap": L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; OpenStreetMap contributors'
      }),
      "CartoDB Positron": L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
        maxZoom: 19,
        attribution: '&copy; OpenStreetMap contributors &copy; CARTO'
      })
    };

    baseMaps["OpenStreetMap"].addTo(map);

    var overlayMaps = {
      "Clothing Shops": clothingShopsLayer
    };

    L.control.layers(baseMaps, overlayMaps, { collapsed: false }).addTo(map);
  });

// Add a legend to the map
  var legend = L.control({position: 'bottomleft'});

legend.onAdd = function(map) {
  var div = L.DomUtil.create('div', 'legend');
  div.style.background = 'rgba(255, 255, 255, 0.8)';
  div.style.padding = '6px 10px';
  div.style.borderRadius = '4px';
  div.style.boxShadow = '0 0 6px rgba(0,0,0,0.3)';
  div.innerHTML = 
    '<b>Legend</b><br>' +
    '<i style="background:#ff6600; width:16px; height:16px; display:inline-block; margin-right:6px;"></i> Clothing Shops';
  return div;
};

legend.addTo(map);


//---- Part 7: Adding interactive highlighting and zooming to map features
 

function highlightFeature(e) {
    var activefeature = e.target;  //access to activefeature that was hovered over through e.target
	
    activefeature.setStyle({
        weight: 7,
        color: '#333',
        dashArray: '',
        fillOpacity: 0.5
    });
	
    if (!L.Browser.ie && !L.Browser.opera) {
        activefeature.bringToFront();
    }
}


//function for resetting the highlight
function resetHighlight(e) {
}

function zoomToFeature(e) {
    map.fitBounds(e.target.getBounds());
}

//to call these methods we need to add listeners to our features

function interactiveFunction(feature, layer) {
    layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight,
        click: zoomToFeature
   } );
}




