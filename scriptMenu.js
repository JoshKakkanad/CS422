/*
    UI functions
*/
function navigateButtonClick() {
    closeSideMenu();
    document.getElementById( "sidebar" ).style.display = "block";
}

function showSideMenu() {
    document.getElementById( "sideMenu" ).style.width = "250px";
    document.getElementById( "overlay" ).style.display = "block";
    document.getElementById( "sidebar" ).style.display = "none";
}

function closeSideMenu() {
    document.getElementById( "sideMenu" ).style.width = "0px";
    document.getElementById( "overlay" ).style.display = "none";
}

function showFavorites() {
    console.log( "ee" );
    document.getElementById( "sideMenu" ).style.width = "0px";
    document.getElementById( "favorites-menu" ).style.width = "350px";
}

function closeFavorites() {
    document.getElementById( "favorites-menu" ).style.width = "0px";
    document.getElementById( "buildings-menu" ).style.width = "0px";
    closeSideMenu();
}

function showBuildings() {
    closeFavorites();
    closeSideMenu();
    document.getElementById( "buildings-menu" ).style.width = "350px";
}

function homeButtonClick() {
    closeSideMenu();
    map.setView( [defaultLat, defaultLng], defaultZoom );
}

document.getElementById( "overlay" ).addEventListener( "click", function () {
    closeSideMenu();
    closeFavorites();
} );


/*
    Handles the search bar.
    Creates a list of suggested buildings.
*/
const searchInput = document.getElementById( 'search' );
const clearBtn = document.getElementById( 'clear-btn' );
const suggestionsList = document.getElementById( 'suggestions-list' );

searchInput.addEventListener( 'input', () => {
    const query = searchInput.value.toLowerCase();
    suggestionsList.innerHTML = '';

    if ( query ) {
        const filteredSuggestions = Object.keys( uicBuildings ).filter( building =>
            building.toLowerCase().includes( query )
        );

        filteredSuggestions.forEach( suggestion => {
            const li = document.createElement( 'li' );
            li.textContent = suggestion;
            li.addEventListener( 'click', () => {
                /*
                    When clicked on one of the suggestions
                */
                onDestinationPicked( suggestion );
                searchInput.value = suggestion;
                suggestionsList.innerHTML = '';
            } );
            suggestionsList.appendChild( li );
        } );

        clearBtn.style.display = 'block';
    } else {
        clearBtn.style.display = 'none';
    }
} );

clearBtn.addEventListener( 'click', () => {
    searchInput.value = '';
    suggestionsList.innerHTML = '';
    clearBtn.style.display = 'none';
} );