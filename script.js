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
    "RRB": [41.867552652316014, -87.64614850944423],
    "Thomas Beckham Hall": [41.86626111882355, -87.64724135398865],
    "TBH": [41.86626111882355, -87.64724135398865]
};

const uicBuildingsBack = uicBuildings; // to make custom favorites work, hacky workaround but it's late to forgive me

const uicPrinters = {
    // UIC Wepa Printer locations and description
    "TBH Front Desk": [[41.86648723286237, -87.64730349817728], "Wepa printer can be found to the left of the front desk."],
    "MRH 156": [[41.86462837094461, -87.64740049817358], ""],
    "SELE 2265": [[41.870517167586044, -87.64798946133658], ""],
    "SCE 1st Floor West Lobby": [[41.871698383936824, -87.6481393269936], "Wepa printer near the West entrance of SCE. Near the ID Center."]
}

const uicBathrooms = {
    // UIC Bathroom locations and description
    "LCE Bathroom": [[41.8715810717739, -87.64944043434458], "All-gender bathroom can be found at the West entrance of Lecture Center E building."],
    "SCE Bathroom": [[41.87235562453282, -87.64782201320713], "Men's and Women's bathrooms can be found on the second floor, to the right of the Dunkin'."],
    "TBH Bathroom": [[41.866471752650234, -87.64732562639999], "Men's and Women's bathrooms can be found to the left of the front desk."]
}

const uicBuildingsAmenities = {
    "Student Center East": ["building-images/student-center-east.png", `
        <h5>Available amenities:</h5>
        <ul>
            <li>Bathrooms</li>
            <li>Printers</li>
            <li>Commons Dining Hal</li>
            <li>Market / grocery store - Located on 2nd Floor</li>
            <li>Dunkin’ Donuts - Located on 1st Floor</li>
            <li>Moe's Southwest Grill - Located on 2nd Floor</li>
            <li>Panda Express - Located on 1st Floor</li>
            <li>Subway - Located on 2nd Floor</li>
            <li>Chick-fil-A - Located on 1st Floor</li>
        </ul>
        `],
    "Lecture Center Building A": ["building-images/lca.png", "Lecture Center A is part of an 85,549 sq ft six-building general-use classroom Lecture Center Complex that opened for operation in 1965 and was designed by Walter Netsch."],
    "Lecture Center Building B": ["building-images/lcb.png", "Lecture Center B is part of an 85,549 sq ft six-building general-use classroom Lecture Center Complex that opened for operation in 1965 and was designed by Walter Netsch."],
    "Lecture Center Building C": ["building-images/lcc.png", "Lecture Center C is part of an 85,549 sq ft six-building general-use classroom Lecture Center Complex that opened for operation in 1965 and was designed by Walter Netsch."],
    "Lecture Center Building D": ["building-images/lcd.png", "Lecture Center D is part of an 85,549 sq ft six-building general-use classroom Lecture Center Complex that opened for operation in 1965 and was designed by Walter Netsch."],
    "Lecture Center Building E": ["building-images/lce.png", "Lecture Center E is part of an 85,549 sq ft six-building general-use classroom Lecture Center Complex that opened for operation in 1965 and was designed by Walter Netsch."],
    "LCA": ["building-images/lca.png", "Lecture Center A is part of an 85,549 sq ft six-building general-use classroom Lecture Center Complex that opened for operation in 1965 and was designed by Walter Netsch."],
    "LCB": ["building-images/lcb.png", "Lecture Center B is part of an 85,549 sq ft six-building general-use classroom Lecture Center Complex that opened for operation in 1965 and was designed by Walter Netsch."],
    "LCC": ["building-images/lcc.png", "Lecture Center C is part of an 85,549 sq ft six-building general-use classroom Lecture Center Complex that opened for operation in 1965 and was designed by Walter Netsch."],
    "LCD": ["building-images/lcd.png", "Lecture Center D is part of an 85,549 sq ft six-building general-use classroom Lecture Center Complex that opened for operation in 1965 and was designed by Walter Netsch."],
    "LCE": ["building-images/lce.png", "Lecture Center E is part of an 85,549 sq ft six-building general-use classroom Lecture Center Complex that opened for operation in 1965 and was designed by Walter Netsch."],
    "Daley Library": ["building-images/daleylib.png", "The Richard J. Daley Library has books, computers and other materials for study in the humanities, social sciences, sciences, and engineering. The librarys website is available 24/7, and you will find many books, journal articles, and databases online. The IDEA Commons The IDEA Commons, a state-ofthe-art collaborative learning environment, is open 24 hours Sunday-Thursday."],
    "LIB": ["building-images/daleylib.png", "The Richard J. Daley Library has books, computers and other materials for study in the humanities, social sciences, sciences, and engineering. The librarys website is available 24/7, and you will find many books, journal articles, and databases online. The IDEA Commons The IDEA Commons, a state-ofthe-art collaborative learning environment, is open 24 hours Sunday-Thursday."],
    "Library": ["building-images/daleylib.png", "The Richard J. Daley Library has books, computers and other materials for study in the humanities, social sciences, sciences, and engineering. The librarys website is available 24/7, and you will find many books, journal articles, and databases online. The IDEA Commons The IDEA Commons, a state-ofthe-art collaborative learning environment, is open 24 hours Sunday-Thursday."],
    "Academic & Residential Complex": ["building-images/arc.png", "The new Academic and Residential Complex (ARC) is a public private partnership between UIC and American Campus Communities (ACC). As part of a master plan to address the university¿s increasing enrollment, this new living-learning community features a 10-story, 146,000-square-foot residence hall with 548 beds in traditional dorm rooms and semi-suite style units. A two-story, 54,000-square-foot academic center on the west side of ARC holds three large tiered lecture halls, active learning classrooms, several small group study rooms, a tutoring center and multiple collaboration spaces."],
    "ARC": ["building-images/arc.png", "The new Academic and Residential Complex (ARC) is a public private partnership between UIC and American Campus Communities (ACC). As part of a master plan to address the university¿s increasing enrollment, this new living-learning community features a 10-story, 146,000-square-foot residence hall with 548 beds in traditional dorm rooms and semi-suite style units. A two-story, 54,000-square-foot academic center on the west side of ARC holds three large tiered lecture halls, active learning classrooms, several small group study rooms, a tutoring center and multiple collaboration spaces."],
    "TBH": ["building-images/tbh.png", "Thomas Beckham Hall has opened in August 2003 and is a student apartment building housing 450 upperclassmen students on the south side of campus. Thomas Beckham Hall was named after Thomas Beckham, who was the dean of the College of Associated Health Professions in 1982 when UIC was formed by the merger of the medical center and undergraduate campuses. "],
    "Thomas Beckham Hall": ["building-images/tbh.png", "Thomas Beckham Hall has opened in August 2003 and is a student apartment building housing 450 upperclassmen students on the south side of campus. Thomas Beckham Hall was named after Thomas Beckham, who was the dean of the College of Associated Health Professions in 1982 when UIC was formed by the merger of the medical center and undergraduate campuses. "],
    //"": ["building-images/.png", ""],

}

// Initialize the map
function initializeMap() {
    map = L.map( 'map' ).setView( [defaultLat, defaultLng], defaultZoom );

    L.tileLayer( 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
    } ).addTo( map );

    map.locate( { watch: true, setView: false, maxZoom: defaultZoom } );
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

    // Stop refreshing location. If we want live navi, need to handle it here?
    map.stopLocate();
}


// Tries to find the coordinates of provided address
// If provided known building name, will return coordinated to that
// Otherwise, will use API to try to find building by name
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

    // alert( "Navi called from \n" + startCoords + "\nto\n" + endCoords + "\nbut navi disabled to limit API calls" );
    // return; // temp. disable route to limit api calls TODO remove me don't forget pls

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

// Starts navigation based on building names, not coordinates
// Initially this code was called by Josh's navigation UI
async function startNavigation( startAddress, endAddress ) {
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
}

// Starts navigation based on coordinates.
// Uses current location as start address (if available)
// Otherwise nothing happens
async function startNavigationByLocation( a, b ) {
    if ( !userMarker ) {
        alert( "Unable to determine your current location. Please enable location services." );
        return;
    }
    const startLoc = userMarker.getLatLng();
    await route( [startLoc.lat, startLoc.lng], [a, b] );
}


// Event listener for the route button
document.getElementById( 'routeBtn' ).addEventListener( 'click', async () => {
    const startAddress = document.getElementById( 'start' ).value.trim();
    const endAddress = document.getElementById( 'end' ).value.trim();

    startNavigation( startAddress, endAddress );
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

initializeMap();

const popup = L.popup()
    .setContent( 'I am a standalone popup.' );


// Called if user clicks on left-lower corner location button
function getCurrentLocation() {
    map.locate( { setView: true, maxZoom: 16, watch: true } );
}

map.on( 'locationfound', onLocationFound );
map.on( 'click', onMapClick );

/*
    Called when user clicks somewhere on the map.
    Tries to find closest known UIC building, otherwise creates generic pin.
    Pin offers navigation to selected location.
*/
function onMapClick( e ) {
    const clickedLocation = e.latlng;
    let closestBuilding = null;
    let minDistance = Infinity;
    const maxDistance = 100; // in meters, if no known building within this distance, place pin

    // try to find building closest to the clicked location
    for ( const buildingName in uicBuildings ) {
        const buildingCoords = uicBuildings[buildingName];
        const buildingLocation = L.latLng( buildingCoords[0], buildingCoords[1] );

        // Calculate distance from the clicked location to the building
        const distance = clickedLocation.distanceTo( buildingLocation );

        // If the building is closer and within the max distance, update closestBuilding
        if ( distance < minDistance && distance <= maxDistance ) {
            closestBuilding = buildingName;
            minDistance = distance;
        }
    }

    // If no closest building, show the picked location
    if ( !closestBuilding ) {
        showPopupAtDest( [clickedLocation.lat, clickedLocation.lng], "Selected location" );
    }
    else {
        showPopupAtDest( uicBuildings[closestBuilding], closestBuilding );
    }
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
            showPopupAtDest( uicBuildings[name], name );
        };

        // Set the inner HTML of the link to show the building's name
        link.innerHTML = `
        <div class="building-list">
          ${name}
        </div>
      `;

        menuDiv.appendChild( link );
    }
}

populateBuildingsMenu();

/*
    Shows the popup at given location on the map
*/
function showPopupAtDest( selectedDest, name ) {
    // figure out add-to-fav button icon
    var imgSrc = "images/fav-icon.png";
    var inputField = "";
    var buildingInfo = "";

    // if building is not know / random pin on the map, name == "Selected location"
    if ( name == "Selected location" ) {
        if ( isLocationInList( selectedDest[0], selectedDest[1] ) ) {
            imgSrc = "images/fav-icon-added.png";
        }
        else {
            // if some custom pin not on the list, also display the input field for custom name
            inputField = `
                <input type="text" class="user-fav-name-input" id="user-fav-name-input" placeholder="Enter custom pin name">
            `;
        }

    } else if ( favoriteBuildings[name] ) {
        imgSrc = "images/fav-icon-added.png";
    }

    // regular button for known buildings
    var button = `
        <button class="remove-button-fav" onclick="addFavorites(${selectedDest[0]}, ${selectedDest[1]}, '${name}')">
            <img src="${imgSrc}" class="add-to-fav-icon-button">
        </button>
    `;

    if ( uicBuildingsAmenities[name] ) {
        var buildingImgSrc = uicBuildingsAmenities[name][0];
        var buildingDescription = uicBuildingsAmenities[name][1];

        buildingInfo = `
            <img src="${buildingImgSrc}" class="popup-building-img">
            ${buildingDescription}
        `;
    }

    const popupContent = `
    <div class="popup-content">
        <h3>${name}</h3>
        ${inputField}
        ${buildingInfo}
        <div class="popup-buttons">
            <button class="popup-button" id="popup-button" onclick="startNavigationByLocation(${selectedDest})">Start Navigation</button>
            ${button}            
        </div>
    </div>
`;

    const marker = L.marker( [selectedDest[0], selectedDest[1]] )
        .bindPopup( popupContent )
        .addTo( map )
        .openPopup();

    marker.on( 'popupclose', function () {
        marker.remove();
    } );

    console.log( `Pin "${name}" created at: ${selectedDest[0]}, ${selectedDest[1]}` );
}

// called when we want to start navigating to some point
// shows destination on map and offers to start nav.
async function onDestinationPicked( destination ) {
    const selectedDest = await geocodeAddress( destination );
    map.setView( [selectedDest[0], selectedDest[1]], 20 );

    showPopupAtDest( selectedDest, destination );
}


// Function to calculate the Haversine distance between two coordinates
function haversineDistance( coord1, coord2 ) {
    const toRad = ( deg ) => deg * Math.PI / 180;

    const [lat1, lon1] = coord1;
    const [lat2, lon2] = coord2;

    const R = 6371e3; // Radius of the Earth in meters
    const φ1 = toRad( lat1 );
    const φ2 = toRad( lat2 );
    const Δφ = toRad( lat2 - lat1 );
    const Δλ = toRad( lon2 - lon1 );

    const a = Math.sin( Δφ / 2 ) ** 2 + Math.cos( φ1 ) * Math.cos( φ2 ) * Math.sin( Δλ / 2 ) ** 2;
    const c = 2 * Math.atan2( Math.sqrt( a ), Math.sqrt( 1 - a ) );

    return R * c; // Distance in meters
}

// Function to find the nearest poi
function findNearest( currentLocation, poiDict ) {
    let nearestPrinter = null;
    let shortestDistance = Infinity;

    for ( const [printerName, [coords]] of Object.entries( poiDict ) ) {
        const distance = haversineDistance( currentLocation, coords );
        if ( distance < shortestDistance ) {
            shortestDistance = distance;
            nearestPrinter = { name: printerName, coords };
        }
    }

    return nearestPrinter;
}

// Routes to nearest poi based on button input
function routeToNearest( poi ) {
    // Assume we have the user's current location (latitude and longitude)
    if ( poi === "printer" ) {
        poiDict = uicPrinters;
    } else if ( poi === "bathroom" ) {
        poiDict = uicBathrooms;
    }

    navigator.geolocation.getCurrentPosition(
        ( position ) => {
            const userLocation = [position.coords.latitude, position.coords.longitude];
            const nearest = findNearest( userLocation, poiDict );

            if ( nearest ) {
                startNavigationByLocation( nearest.coords[0], nearest.coords[1] );
            } else {
                alert( `No ${poi} found.` );
            }
        },
        ( error ) => {
            console.error( "Error getting location:", error );
            alert( "Could not retrieve your location. Please try again." );
        }
    );
}

document.getElementById( "routeToPrinterButton" ).addEventListener( "click", () => {
    routeToNearest( "printer" );
} );

document.getElementById( "routeToBathroomButton" ).addEventListener( "click", () => {
    routeToNearest( "bathroom" );
} );