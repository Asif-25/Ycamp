mapboxgl.accessToken = mapToken;
const map = new mapboxgl.Map({
container: 'map',
//streets-v12, outdoors-v12, light-v11, dark-v11, satellite-streets-v12
style: 'mapbox://styles/mapbox/light-v11',
// starting position [lng, lat]
center: campground.geometry.coordinates,
// starting zoom
zoom: 8, 
});

map.addControl(new mapboxgl.NavigationControl(), 'top-left');


new mapboxgl.Marker()
	.setLngLat(campground.geometry.coordinates)
	.setPopup(
        new mapboxgl.Popup({ offset: 25 })
            .setHTML(
                `<h3>${campground.title}</h3>
                <p>${campground.location}</p>`))
	.addTo(map);