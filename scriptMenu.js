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

