// Set-up main Cesium widget

var viewer = new Cesium.Viewer('cesiumContainer', {
    'animation': false,
    'baseLayerPicker': false,
    'fullscreenButton': false,
    'geocoder':  false,
    'homeButton': true,
    'infoBox': false,
    'sceneModePicker': false,
    'selectionIndicator': true,
    'timeline': false,
    'navigationHelpButton': false,
    'navigationInstructionsInitiallyVisible': false,
    'scene3DOnly': true,
    'imageryProvider': new Cesium.MapboxStyleImageryProvider({
        /*styleId: 'satellite-streets-v11',*/
        styleId: 'dark-v10',
        accessToken: 'pk.eyJ1Ijoia3Ric2gzIiwiYSI6ImNrY3dtZXZubDBmNzkydHMxZ2NyaDJ4MnMifQ.HFSdqEdMzOTylGqEWXUa9A'
    }),


    'creditContainer': 'credit'
});

var layers = viewer.scene.imageryLayers;
viewer.scene.debugShowFramesPerSecond = true;
viewer.resolutionScale = 1.0 / devicePixelRatio;

// Bind custom elements

let btn = document.querySelector("#find-me-button")
btn.onclick = LocationPing;

// Custom functions

function drawUserDot(lat, lon) {
    console.log("LATITUDE: %f, LONGITUDE: %f", lat, lon);
    viewer.entities.add({
        position: Cesium.Cartesian3.fromDegrees(lon, lat),
        point: {
            pixelSize: 10,
            color: Cesium.Color.YELLOWGREEN,
        },
    });
    viewer.camera.flyTo({
        destination: Cesium.Cartesian3.fromDegrees(lon, lat, 500000),
    });
}

function transmitUserLocation() {

}

function LocationPing() {

    function success(pos) {
        let latitude = pos.coords.latitude;
        let longitude = pos.coords.longitude;
        drawUserDot(latitude,longitude);
        transmitUserLocation(latitude,longitude);
    }

    function error() {
        alert("We were unable to obtain your location.");
    }

    if(!navigator.geolocation) {
        alert("Your browser does not support Geolocation.");
    }
    else {
        navigator.geolocation.getCurrentPosition(success, error);
    }

}

// CZML functions

var czmlSource = new Cesium.CzmlDataSource();
viewer.dataSources.add(czmlSource);
czmlSource.process('./data/example.czml')