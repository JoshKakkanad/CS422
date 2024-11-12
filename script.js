let map;
let routingLayer;
let userMarker;
const apiKey = '1ea29fb3-6b38-4313-b0f8-4bf703ef6892';


const uicBuildings = {
    // Academic and Administrative Facilities
    "University Hall": [41.874065, -87.649169],
    "UH": [41.874065, -87.649169],
    "Jefferson Hall": [41.872673, -87.650028],
    "JH": [41.872673, -87.650028],
    "Lecture Center Building A": [41.872143, -87.650828],
    "LCA": [41.872143, -87.650828],
    "Lecture Center Building B": [41.871886, -87.651267],
    "LCB": [41.871886, -87.651267],
    "Lecture Center Building C": [41.872545, -87.651061],
    "LCC": [41.872545, -87.651061],
    "Lecture Center Building D": [41.872317, -87.651573],
    "LCD": [41.872317, -87.651573],
    "Lecture Center Building E": [41.872079, -87.650630],
    "LCE": [41.872079, -87.650630],
    "Lecture Center Building F": [41.871800, -87.650340],
    "LCF": [41.871800, -87.650340],
    "Student Center East": [41.872366, -87.648296],
    "SCE": [41.872366, -87.648296],
    "Student Center East Tower": [41.872366, -87.648296],
    "SCET": [41.872366, -87.648296],
    "Science & Engineering Laboratory East": [41.870769, -87.649636],
    "SELE": [41.870769, -87.649636],
    "Science & Engineering Laboratory West": [41.872593, -87.652593],
    "SELW": [41.872593, -87.652593],
    "Daley Library": [41.872728, -87.648208],
    "LIB": [41.872728, -87.648208],
    "Grant Hall": [41.874065, -87.649169],
    "GH": [41.874065, -87.649169],
    "Douglass Hall": [41.873399, -87.650351],
    "DH": [41.873399, -87.650351],
    "Lincoln Hall": [41.874732, -87.649402],
    "LH": [41.874732, -87.649402],
    "Taft Hall": [41.871850, -87.648067],
    "TH": [41.871850, -87.648067],
    "Addams Hall": [41.870118, -87.648242],
    "AH": [41.870118, -87.648242],
    "Burnham Hall": [41.871850, -87.647186],
    "BH": [41.871850, -87.647186],
    "Behavioral Sciences Building": [41.870769, -87.649636],
    "BSB": [41.870769, -87.649636],
    "Science & Engineering South": [41.872593, -87.652593],
    "SES": [41.872593, -87.652593],
    "Education, Theatre, Music and Social Work": [41.873544, -87.650935],
    "ETMSW": [41.873544, -87.650935],
    "UIC Theatre": [41.873544, -87.650935],
    "UICT": [41.873544, -87.650935],
    "Henry Hall": [41.868980, -87.648052],
    "HH": [41.868980, -87.648052],
    "Stevenson Hall": [41.874355, -87.653780],
    "SH": [41.874355, -87.653780],
    "Academic & Residential Complex": [41.868941, -87.650501],
    "ARC": [41.868941, -87.650501],
    "Student Residence Hall": [41.868628, -87.650287],
    "SRH": [41.868628, -87.650287],
    "Campus Recreation Center East": [41.872394, -87.647367],
    "CRCE": [41.872394, -87.647367],
    "Art and Design Hall": [41.874355, -87.653780],
    "Engineering Research Facility": [41.872041, -87.652411],
    "ERF": [41.872041, -87.652411],
    "Engineering Innovation Building": [41.870591, -87.653190],
    "EIB": [41.870591, -87.653190],
    "Flames Athletic Center": [41.875, -87.651],
    "FAC": [41.875, -87.651]
};

// Initialize the map
function initializeMap() {
    map = L.map( 'map' ).setView( [41.8708, -87.6505], 15 );

    L.tileLayer( 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
    } ).addTo( map );

    map.locate( { watch: true, setView: true, maxZoom: 16 } );
    map.zoomControl.setPosition( 'bottomleft' );
    map.on( 'locationfound', onLocationFound );
}

// Handle live location tracking
function onLocationFound( e ) {
    if ( userMarker ) {
        userMarker.setLatLng( e.latlng );
    } else {
        userMarker = L.marker( e.latlng, { icon: L.icon( { iconUrl: 'gps_icon.png', iconSize: [32, 32] } ) } ).addTo( map );
    }
    console.log( "User location updated:", e.latlng );
}


async function geocodeAddress( address ) {
    // Convert input to lowercase to match dictionary keys
    const normalizedAddress = address.toLowerCase();

    // Check if the address matches a UIC building or abbreviation in our local dictionary
    for ( const [key, coords] of Object.entries( uicBuildings ) ) {
        if ( key.toLowerCase() === normalizedAddress ) {
            console.log( `Using local coordinates for: ${key}` );
            return coords;
        }
    }

    // If not found in dictionary, fall back to using the GraphHopper API
    const encodedAddress = encodeURIComponent( address );
    const url = `https://graphhopper.com/api/1/geocode?q=${encodedAddress}&locale=en&limit=1&key=${apiKey}`;

    console.log( `Geocoding address: ${address}` );
    console.log( `Encoded URL: ${url}` );

    try {
        const response = await fetch( url );
        const data = await response.json();

        if ( !data.hits || data.hits.length === 0 ) {
            alert( "Address not found. Please check the address format." );
            return null;
        }

        const { lat, lng } = data.hits[0].point;
        console.log( `Geocoded coordinates: Latitude = ${lat}, Longitude = ${lng}` );
        return [lat, lng];
    } catch ( error ) {
        console.error( "Error during geocoding fetch:", error );
        return null;
    }
}


// Utility function to decode the encoded polyline
function decodePolyline( encoded, precision = 1e5 ) {
    let index = 0, lat = 0, lng = 0;
    const coordinates = [];
    const factor = precision;

    while ( index < encoded.length ) {
        let shift = 0, result = 0;
        let byte;
        do {
            byte = encoded.charCodeAt( index++ ) - 63;
            result |= ( byte & 0x1f ) << shift;
            shift += 5;
        } while ( byte >= 0x20 );
        const deltaLat = ( ( result & 1 ) ? ~( result >> 1 ) : ( result >> 1 ) );
        lat += deltaLat;

        shift = 0;
        result = 0;
        do {
            byte = encoded.charCodeAt( index++ ) - 63;
            result |= ( byte & 0x1f ) << shift;
            shift += 5;
        } while ( byte >= 0x20 );
        const deltaLng = ( ( result & 1 ) ? ~( result >> 1 ) : ( result >> 1 ) );
        lng += deltaLng;

        coordinates.push( [lat / factor, lng / factor] );
    }
    return coordinates;
}


async function route( startCoords, endCoords ) {
    if ( !startCoords || !endCoords ) {
        alert( "Invalid coordinates for routing." );
        return;
    }

    if ( routingLayer ) routingLayer.remove();

    const url = `https://graphhopper.com/api/1/route?point=${startCoords[0]},${startCoords[1]}&point=${endCoords[0]},${endCoords[1]}&vehicle=foot&locale=en&key=${apiKey}`;
    console.log( "Routing URL:", url );

    try {
        const response = await fetch( url );
        const data = await response.json();

        console.log( "Routing response data:", data );

        // Check if the response contains errors
        if ( data.info && data.info.errors && data.info.errors.length > 0 ) {
            console.error( "Routing API errors:", data.info.errors );
            alert( `Routing API error: ${data.info.errors[0].message}` );
            return;
        }

        // Check if the 'paths' array is present and has at least one route
        if ( !data.paths || data.paths.length === 0 ) {
            console.error( "No route found in response:", data );
            alert( "No route could be found. Please try a different route." );
            return;
        }

        const path = data.paths[0];
        if ( !path || !path.points ) {
            console.error( "Invalid path structure:", path );
            alert( "Invalid routing response. Please try again." );
            return;
        }

        // Decode the encoded polyline
        const points = decodePolyline( path.points );
        console.log( "Decoded route points:", points );

        // Draw the route on the map
        routingLayer = L.polyline( points, { color: 'blue' } ).addTo( map );
        map.fitBounds( routingLayer.getBounds() );

    } catch ( err ) {
        console.error( "Routing error:", err );
        alert( "Routing failed. Please check your inputs or try again later." );
    }
}




// Event listener for the route button
document.getElementById( 'routeBtn' ).addEventListener( 'click', async () => {
    const startAddress = document.getElementById( 'start' ).value.trim();
    const endAddress = document.getElementById( 'end' ).value.trim();

    // Check if an end address is provided
    if ( !endAddress ) {
        alert( "Please enter a destination address." );
        return;
    }

    let startCoords;
    const endCoords = await geocodeAddress( endAddress );

    // If no starting address is provided, use the user's current location
    if ( !startAddress ) {
        if ( userMarker && userMarker.getLatLng() ) {
            const userLocation = userMarker.getLatLng();
            startCoords = [userLocation.lat, userLocation.lng];
            console.log( "Using user's current location as start:", startCoords );
        } else {
            alert( "Unable to determine your current location. Please enter a starting address." );
            return;
        }
    } else {
        // Geocode the starting address
        startCoords = await geocodeAddress( startAddress );
    }

    // Check if both coordinates are valid
    if ( startCoords && endCoords ) {
        console.log( "Start coordinates:", startCoords );
        console.log( "End coordinates:", endCoords );
        await route( startCoords, endCoords );
    }
} );

// Event listener for the cancel route button
document.getElementById( 'cancelBtn' ).addEventListener( 'click', () => {
    if ( routingLayer ) {
        routingLayer.remove();
        routingLayer = null;
        console.log( "Route canceled." );
    }

    // Clear the input fields
    document.getElementById( 'start' ).value = '';
    document.getElementById( 'end' ).value = '';
} );


// Check if we're on the main page
if ( document.getElementById( 'postEventBtn' ) ) {
    // Add event listener to the "Post Event" button on the main page
    document.getElementById( 'postEventBtn' ).addEventListener( 'click', () => {
        window.location.href = 'social.html';
    } );
}

// Check if we're on the social.html page
if ( document.getElementById( 'addEventBtn' ) ) {
    const eventBoard = document.getElementById( 'event-board' );
    const storedEvents = JSON.parse( localStorage.getItem( 'uicEvents' ) ) || [];

    // Load existing events from local storage
    storedEvents.forEach( event => addEventToBoard( event ) );

    // Add event listener to the "Add Event" button on social.html page
    document.getElementById( 'addEventBtn' ).addEventListener( 'click', () => {
        const title = document.getElementById( 'eventTitle' ).value.trim();
        const description = document.getElementById( 'eventDescription' ).value.trim();
        const location = document.getElementById( 'eventLocation' ).value.trim();

        if ( title && description && location ) {
            const event = { title, description, location };
            addEventToBoard( event );
            saveEvent( event );

            // Clear the form fields after saving
            document.getElementById( 'eventTitle' ).value = '';
            document.getElementById( 'eventDescription' ).value = '';
            document.getElementById( 'eventLocation' ).value = '';
        } else {
            alert( "Please fill out all fields." );
        }
    } );

    // Function to add an event to the event board
    function addEventToBoard( event ) {
        const eventTile = document.createElement( 'div' );
        eventTile.className = 'event-tile';
        eventTile.innerHTML = `
            <h3>${event.title}</h3>
            <p>${event.description}</p>
            <p><strong>Location:</strong> ${event.location}</p>
        `;
        eventBoard.appendChild( eventTile );
    }

    // Function to save the event to local storage
    function saveEvent( event ) {
        storedEvents.push( event );
        localStorage.setItem( 'uicEvents', JSON.stringify( storedEvents ) );
    }
}

initializeMap();

function onLocationFound( e ) {
    var radius = e.accuracy;

    L.marker( e.latlng ).addTo( map )
        .bindPopup( "You are within " + radius + " meters from this point" ).openPopup();

    L.circle( e.latlng, radius ).addTo( map );
}

function getCurrentLocation() {
    map.locate( { setView: true, maxZoom: 16 } );
}

map.on( 'locationfound', onLocationFound );
map.on( 'click', onMapClick );

function onMapClick( e ) {
    popup
        .setLatLng( e.latlng )
        .setContent( `You clicked the map at ${e.latlng.toString()}` )
        .openOn( map );
    console.log( e.latlng.toString() );
}