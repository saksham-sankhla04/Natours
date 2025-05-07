/* eslint-disable */

export const displayMap = locations => {
  mapboxgl.accessToken =
    'pk.eyJ1Ijoic2Frc2hhbXNhbmtobGE3NjciLCJhIjoiY21hMnUzdWExMmY5MzJxc203dGlpM3VrNCJ9.fj6dEYrfy5B9n6_6nIUKfw';
  const map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/sakshamsankhla767/cma2uqu5400dv01r075alersi', // style URL
    scrollZoom: false
    // center: [-74.5, 40], // starting position [lng, lat]
    // zoom: 10, // starting zoom
    // interactive: false
  });

  const bounds = new mapboxgl.LngLatBounds();

  locations.forEach(loc => {
    // Create marker
    const el = document.createElement('div');
    el.className = 'marker';

    // Add Marker
    new mapboxgl.Marker({
      element: el,
      anchor: 'bottom'
    })
      .setLngLat(loc.coordinates)
      .addTo(map);

    // Add popup
    new mapboxgl.Popup({
      offset: 30
    })
      .setLngLat(loc.coordinates)
      .setHTML(`<p>Day ${loc.day}: ${loc.description}</p>`)
      .addTo(map);

    // Extends map bounds to include current location
    bounds.extend(loc.coordinates);
  });

  map.fitBounds(bounds, {
    padding: {
      top: 200,
      bottom: 150,
      left: 100,
      right: 100
    }
  });
};
