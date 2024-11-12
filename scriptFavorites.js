var favoriteBuildings = {
    "Lecture Center Building A": [41.872143, -87.650828],
    "Science & Engineering Laboratory East": [41.870769, -87.649636],
    "Addams Hall": [41.870118, -87.648242],
};

function refreshFavoriteList() {
    const menuDiv = document.getElementById( "favorites-menu" );

    for ( const [name, coordinates] of Object.entries( favoriteBuildings ) ) {
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

refreshFavoriteList();