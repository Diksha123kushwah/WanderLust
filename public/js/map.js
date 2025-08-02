maptilersdk.config.apiKey = Access_Token;
const map = new maptilersdk.Map({
    container: 'map', // container's id or the HTML element in which SDK will render the map
    style: maptilersdk.MapStyle.STREETS,
    center: [75.8577, 22.7196], // starting position [lng, lat]
    zoom: 9 // starting zoom
});