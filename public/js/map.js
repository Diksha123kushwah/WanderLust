maptilersdk.config.apiKey = Access_Token;
const map = new maptilersdk.Map({
    container: 'map', // container's id or the HTML element in which SDK will render the map
    style: maptilersdk.MapStyle.STREETS,
    center: coordinatesL, // starting position [lng, lat]
    zoom: 9 // starting zoom
});
console.log("Marker Coordinates:", coordinatesL);

const marker = new maptilersdk.Marker({ color: "red" })
    .setLngLat(coordinatesL)
    .setPopup(new maptilersdk.Popup({ offset: 20 }).setHTML(`<h4>${locationInfo}</h4><p>Exact location provided after booking!</p>`)) 
    .addTo(map);

