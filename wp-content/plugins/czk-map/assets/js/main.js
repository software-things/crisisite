jQuery(document).ready(function () {
    const container = jQuery('#czk_map');
    container.addClass('closed');
    const post_id = jQuery('#post_ID').val();
    const data = jQuery('#map').data('markers');
    let markers = data && data.markers ? data.markers : [];
    const handleChange = () => {
        wp.ajax.post('update_czk_map', {
            post_id,
            headline: jQuery('#map-headline').val(),
            markers
        });
    };
    const handleDrag = (e) => {
        const mIndex = jQuery(e.target.getPopup()['_content']).wrap('<div></div>').parent().find('[data-index]').data('index');
        const mLng = e.target.getLatLng()['lng'].toString();
        const mLat = e.target.getLatLng()['lat'].toString();
        markers.map((marker, index) => {
            if (index === mIndex) {
                marker.lng = mLng;
                marker.lat = mLat;
                return marker;
            }
        });
        handleChange();
    }
    const handleMarkersSeeding = () => {
        markersLayer.clearLayers();
        markers.map((marker, index) => {
            let markerHandler = L.marker([marker.lat, marker.lng], {
                draggable: true
            }).bindPopup(`
                    <div style="text-align: center" data-index="${index}">
                        <input type="text" value="${marker.address}"><br><br>
                        <button type="button" class="marker-update button button-small">Zapisz</button>
                        <button type="button" class="marker-delete button button-small">Usuń</button>
                    </div>
            `).openPopup();
            markersLayer.addLayer(markerHandler);
            markerHandler.on("dragend", handleDrag);
        });
    };
    const map = L.map('map', {
        center: [51.9189046, 19.1343786],
        zoom: 6
    });

    const markersLayer = new L.LayerGroup().addTo(map);
    L.control.scale().addTo(map);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    const search = L.esri.Geocoding.geosearch({
        title: 'Szukaj',
        placeholder: 'Szukanie miejsc lub adresów',
        useMapBounds: false
    }).addTo(map);

    search.on('results', (data) => {
        for (let i = data.results.length - 1; i >= 0; i--) {
            const coordinates = data.results[i].latlng;
            const address = data.results[i].text;
            const marker = L.marker(data.results[i].latlng).bindPopup(address).openPopup();
            markersLayer.addLayer(marker);
            markers.push({
                lat: coordinates.lat,
                lng: coordinates.lng,
                address: address
            });
            handleChange();
            handleMarkersSeeding();
        }
    });

    if (markers.length > 0) {
        handleMarkersSeeding();
        const bounds = L.latLngBounds(markers.map(marker => {
            return [marker.lat, marker.lng];
        }));
        map.flyToBounds(bounds);
        map.setZoom(5);
    }

    jQuery(document).on('click', '.marker-delete', function () {
        markers.splice(jQuery(this).parent().data('index'), 1);
        handleChange();
        handleMarkersSeeding();
    });

    jQuery(document).on('click', '.marker-update', function () {
        const index = jQuery(this).parent().data('index');
        markers.map((marker, i) => {
            if (i === index) {
                marker.address = jQuery(this).parent().find('input').val();
            }
            return marker;
        });
        handleChange();
        handleMarkersSeeding();
    });

    jQuery(document).on('click', '.editor-post-publish-button', function () {
        handleChange();
    });

    container.click(() => {
        map.invalidateSize();
    });
});