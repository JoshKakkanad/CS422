const favoriteBuildings = {
  "Lecture Center Building A": [41.872143, -87.650828],
  "Science & Engineering Laboratory East": [41.870769, -87.649636],
  "Addams Hall": [41.870118, -87.648242],
};

function refreshFavoriteList() {
  const menuDiv = document.getElementById( "favorites-menu" );

  // Clear existing content in the menu before adding new items
  menuDiv.innerHTML = '';

  // add close menu button on top
  const closeBt = document.createElement( "a" );
  closeBt.href = "#";
  closeBt.onclick = () => {
    closeFavorites();
  }
  closeBt.innerHTML = `
    <div class="button-container"><img src="images/sidemenu-home.png">Close</div>
  `;

  menuDiv.append( closeBt );

  for ( const [name, coordinates] of Object.entries( favoriteBuildings ) ) {
    const link = document.createElement( "a" );
    link.href = "#";
    link.onclick = () => {
      console.log( `Navigating to ${name} at ${coordinates[0]}, ${coordinates[1]}` );
      document.getElementById( 'end' ).value = name;
      closeFavorites();
      navigateButtonClick();
      showPopupAtDest( uicBuildings[name], name );
    };

    // Create the inner HTML to include building name and "X" button
    link.innerHTML = `
      <div class="building-list-fav">
        <span class="building-name-fav">${name}</span>
        <button class="remove-button-fav" onclick="removeFavorite(event, '${name}')">X</button>
      </div>
    `;

    // Append the link to the menuDiv
    menuDiv.appendChild( link );
  }
}

// Function to remove the favorite when "X" is clicked
function removeFavorite( event, name ) {
  event.stopPropagation(); // Prevent triggering the link's onclick event
  const menuDiv = document.getElementById( "favorites-menu" );
  // Find and remove the link corresponding to the clicked "X"
  const linkToRemove = Array.from( menuDiv.getElementsByTagName( 'a' ) ).find( link => link.innerText.includes( name ) );
  if ( linkToRemove ) {
    menuDiv.removeChild( linkToRemove );
  }

  // also remove from favoriteBuildings if necessary
  delete favoriteBuildings[name];
}

function addFavorites( long, lat, name ) {
  // add only if doesn't exist
  if ( !favoriteBuildings[name] ) {
    favoriteBuildings[name] = [lat, long];
  } else {
    delete favoriteBuildings[name];
  }

  refreshFavoriteList();

  // also re-create the popup to show new updated icon
  showPopupAtDest( [long, lat], name );
}

refreshFavoriteList();