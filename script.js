let map;
let routingLayer;
let userMarker;
const apiKey = '1ea29fb3-6b38-4313-b0f8-4bf703ef6892';

const defaultLat = 41.871894;
const defaultLng = -87.64924;
const defaultZoom = 20;



const uicBuildings = {
    // Academic and Administrative Facilities
    "University Hall": [41.873947914171005, -87.65085754188924],
    "UH": [41.873947914171005, -87.65085754188924],
    "Jefferson Hall": [41.874040759340694, -87.65020232524772],
    "JH": [41.874040759340694, -87.65020232524772],
    "Lecture Center Building A": [41.87212936454845, -87.64981124987864],
    "LCA": [41.87212936454845, -87.64981124987864],
    "Lecture Center Building B": [41.87219677238241, -87.64925536205912],
    "LCB": [41.87219677238241, -87.64925536205912],
    "Lecture Center Building C": [41.87211797636909, -87.64871534127201],
    "LCC": [41.87211797636909, -87.64871534127201],
    "Lecture Center Building D": [41.87171739066957, -87.64868811805962],
    "LCD": [41.87171739066957, -87.64868811805962],
    "Lecture Center Building E": [41.87160654136344, -87.64923394759485],
    "LCE": [41.87160654136344, -87.64923394759485],
    "Lecture Center Building F": [41.871685434132985, -87.64978648265206],
    "LCF": [41.871685434132985, -87.64978648265206],
    "Student Center East": [41.87193269647761, -87.64793984913224],
    "SCE": [41.87193269647761, -87.64793984913224],
    "Student Center East Tower": [41.872825254185905, -87.6478608179774],
    "SCET": [41.872825254185905, -87.6478608179774],
    "Science & Engineering Laboratory East": [41.870741178056605, -87.64858761797716],
    "SELE": [41.870741178056605, -87.64858761797716],
    "Science & Engineering Laboratory West": [41.87044457630189, -87.64898994932965],
    "SELW": [41.87044457630189, -87.64898994932965],
    "Daley Library": [41.87191750468951, -87.65026981727092],
    "LIB": [41.87191750468951, -87.65026981727092],
    "Library": [41.87191750468951, -87.65026981727092],
    "Grant Hall": [41.87289077766574, -87.64944746635246],
    "GH": [41.87289077766574, -87.64944746635246],
    "Douglass Hall": [41.872819875378994, -87.64908939144811],
    "DH": [41.872819875378994, -87.64908939144811],
    "Lincoln Hall": [41.87248740071305, -87.64931909142328],
    "LH": [41.87248740071305, -87.64931909142328],
    "Taft Hall": [41.87132956005642, -87.64902489017028],
    "TH": [41.87132956005642, -87.64902489017028],
    "Addams Hall": [41.87095758743077, -87.6490278118239],
    "AH": [41.87095758743077, -87.6490278118239],
    "Burnham Hall": [41.87105066197899, -87.64947097955375],
    "BH": [41.87105066197899, -87.64947097955375],
    "Behavioral Sciences Building": [41.873946156756176, -87.65224730976355],
    "BSB": [41.873946156756176, -87.65224730976355],
    "Science & Engineering South": [41.868992232942986, -87.64863009056158],
    "SES": [41.868992232942986, -87.64863009056158],
    "Education, Theatre, Music and Social Work": [41.874560357840906, -87.6530839162182],
    "ETMSW": [41.874560357840906, -87.6530839162182],
    "UIC Theatre": [41.874616279255264, -87.65331995061179],
    "UICT": [41.874616279255264, -87.65331995061179],
    "Henry Hall": [41.874109853543665, -87.65055120016747],
    "HH": [41.874109853543665, -87.65055120016747],
    "Stevenson Hall": [41.87289094314316, -87.65033650016757],
    "SH": [41.87289094314316, -87.65033650016757],
    "Academic & Residential Complex": [41.87460916374127, -87.65061854303872],
    "ARC": [41.87460916374127, -87.65061854303872],
    "Student Residence Hall": [41.87111405510994, -87.67441247935736],
    "SRH": [41.87111405510994, -87.67441247935736],
    "Student Recreation Facility": [41.872587787521994, -87.64672659172098],
    "SRF": [41.872587787521994, -87.64672659172098],
    "Art and Exhibition Hall": [41.876449587773955, -87.64965605426593],
    "AEH": [41.876449587773955, -87.64965605426593],
    "Engineering Research Facility": [41.869904659565506, -87.64835697386215],
    "ERF": [41.869904659565506, -87.64835697386215],
    "Engineering Innovation Building": [41.86951809222366, -87.64960646512898],
    "EIB": [41.86951809222366, -87.64960646512898],
    "Flames Athletic Center": [41.86678166166006, -87.64837801339864],
    "FAC": [41.86678166166006, -87.64837801339864],
    "Architecture and Design Studios": [41.87377019338313, -87.64874793827921],
    "ADS": [41.87377019338313, -87.64874793827921],
    "Chemical Engineering Building": [41.87153663871172, -87.64127622601173],
    "CEB": [41.87153663871172, -87.64127622601173],
    "College of Urban Planning and Public Affairs Hall": [41.87636618139708, -87.649757582209],
    "CUPPAH": [41.87636618139708, -87.649757582209],
    "Credit Union 1 Arena": [41.87494531356071, -87.65634706225603],
    "Arena": [41.87494531356071, -87.65634706225603],
    "Jane Addams Hull-House": [41.871897601551396, -87.64743700269818],
    "JAH": [41.871897601551396, -87.64743700269818],
    "Physical Education Building": [41.86680481405539, -87.64941632243408],
    "PEB": [41.86680481405539, -87.64941632243408],
    "Roosevelt Road Building": [41.867552652316014, -87.64614850944423],
    "RRB": [41.867552652316014, -87.64614850944423]
};

// Initialize the map
function initializeMap() {
    map = L.map( 'map' ).setView( [defaultLat, defaultLng], defaultZoom );

    L.tileLayer( 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
    } ).addTo( map );

    //map.locate( { watch: true, setView: true, maxZoom: defaultZoom } );
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

const popup = L.popup()
    .setContent( 'I am a standalone popup.' );

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
}

function populateBuildingsMenu() {
    const menuDiv = document.getElementById( "buildings-menu" );

    for ( const [name, coordinates] of Object.entries( uicBuildings ) ) {
        const link = document.createElement( "a" );
        link.href = `#`;
        link.onclick = () => {
            console.log( `Navigating to ${name} at ${coordinates[0]}, ${coordinates[1]}` );
            document.getElementById( 'end' ).value = name;
            closeFavorites();
            navigateButtonClick();
        };

        // Set the inner HTML of the link to show the building's name
        link.innerHTML = `
        <div class="building-list">
          ${name}
        </div>
      `;

        // Append the link to the menuDiv
        menuDiv.appendChild( link );
    }
}

populateBuildingsMenu();