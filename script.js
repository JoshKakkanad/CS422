let map;
let routingLayer;
let userMarker;
const apiKey = '1ea29fb3-6b38-4313-b0f8-4bf703ef6892';

// Initialize the map
function initializeMap() {
    map = L.map('map').setView([41.8708, -87.6505], 15);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    map.locate({ watch: true, setView: true, maxZoom: 16 });
    map.on('locationfound', onLocationFound);
}

// Handle live location tracking
function onLocationFound(e) {
    if (userMarker) {
        userMarker.setLatLng(e.latlng);
    } else {
        userMarker = L.marker(e.latlng).addTo(map);
    }
}

// Geocode addresses using direct fetch to GraphHopper API
async function geocodeAddress(address) {
    const encodedAddress = encodeURIComponent(address);
    const url = `https://graphhopper.com/api/1/geocode?q=${encodedAddress}&locale=en&limit=1&key=${apiKey}`;

    console.log(`Geocoding address: ${address}`);
    console.log(`Encoded URL: ${url}`);

    try {
        const response = await fetch(url);
        if (!response.ok) {
            console.error(`Geocoding request failed: ${response.status} - ${response.statusText}`);
            alert(`Geocoding failed with status: ${response.status}`);
            return null;
        }

        const data = await response.json();
        console.log("Geocoding response data:", data);

        if (!data.hits || data.hits.length === 0) {
            alert("Address not found. Please check the address format.");
            return null;
        }

        const { lat, lng } = data.hits[0].point;
        console.log(`Geocoded coordinates: Latitude = ${lat}, Longitude = ${lng}`);
        return [lat, lng];
    } catch (error) {
        console.error("Error during geocoding fetch:", error);
        alert("Geocoding failed due to a network error. Please try again.");
        return null;
    }
}

// Utility function to decode the encoded polyline
function decodePolyline(encoded, precision = 1e5) {
    let index = 0, lat = 0, lng = 0;
    const coordinates = [];
    const factor = precision;

    while (index < encoded.length) {
        let shift = 0, result = 0;
        let byte;
        do {
            byte = encoded.charCodeAt(index++) - 63;
            result |= (byte & 0x1f) << shift;
            shift += 5;
        } while (byte >= 0x20);
        const deltaLat = ((result & 1) ? ~(result >> 1) : (result >> 1));
        lat += deltaLat;

        shift = 0;
        result = 0;
        do {
            byte = encoded.charCodeAt(index++) - 63;
            result |= (byte & 0x1f) << shift;
            shift += 5;
        } while (byte >= 0x20);
        const deltaLng = ((result & 1) ? ~(result >> 1) : (result >> 1));
        lng += deltaLng;

        coordinates.push([lat / factor, lng / factor]);
    }
    return coordinates;
}


async function route(startCoords, endCoords) {
    if (!startCoords || !endCoords) {
        alert("Invalid coordinates for routing.");
        return;
    }

    if (routingLayer) routingLayer.remove();

    const url = `https://graphhopper.com/api/1/route?point=${startCoords[0]},${startCoords[1]}&point=${endCoords[0]},${endCoords[1]}&vehicle=foot&locale=en&key=${apiKey}`;
    console.log("Routing URL:", url);

    try {
        const response = await fetch(url);
        const data = await response.json();

        console.log("Routing response data:", data);

        // Check if the response contains errors
        if (data.info && data.info.errors && data.info.errors.length > 0) {
            console.error("Routing API errors:", data.info.errors);
            alert(`Routing API error: ${data.info.errors[0].message}`);
            return;
        }

        // Check if the 'paths' array is present and has at least one route
        if (!data.paths || data.paths.length === 0) {
            console.error("No route found in response:", data);
            alert("No route could be found. Please try a different route.");
            return;
        }

        const path = data.paths[0];
        if (!path || !path.points) {
            console.error("Invalid path structure:", path);
            alert("Invalid routing response. Please try again.");
            return;
        }

        // Decode the encoded polyline
        const points = decodePolyline(path.points);
        console.log("Decoded route points:", points);

        // Draw the route on the map
        routingLayer = L.polyline(points, { color: 'blue' }).addTo(map);
        map.fitBounds(routingLayer.getBounds());

    } catch (err) {
        console.error("Routing error:", err);
        alert("Routing failed. Please check your inputs or try again later.");
    }
}




// Event listener for the route button
document.getElementById('routeBtn').addEventListener('click', async () => {
    const startAddress = document.getElementById('start').value.trim();
    const endAddress = document.getElementById('end').value.trim();

    if (!startAddress || !endAddress) {
        alert("Please enter both starting and destination addresses.");
        return;
    }

    const startCoords = await geocodeAddress(startAddress);
    const endCoords = await geocodeAddress(endAddress);

    if (startCoords && endCoords) {
        console.log("Start coordinates:", startCoords);
        console.log("End coordinates:", endCoords);
        await route(startCoords, endCoords);
    }
});

initializeMap();
