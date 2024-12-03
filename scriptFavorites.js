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

  delete favoriteBuildings[name];

  // also remove from uicBuildings if it's a custom pin
  if ( !uicBuildingsBack[name] ) {
    delete uicBuildings[name];
  }
}

function addFavorites( long, lat, name ) {
  // if adding custom location
  if ( name == "Selected location" ) {
    name = document.getElementById( "user-fav-name-input" ).value;

    // if no name given, generate random
    if ( name == null || name == "" ) {
      var i = 1;
      while ( favoriteBuildings["Custom pin " + i] ) {
        i++;
      }
      name = "Custom pin " + i;
    }

    uicBuildings[name] = [long, lat];
  }

  // add only if doesn't exist
  if ( !favoriteBuildings[name] ) {
    favoriteBuildings[name] = [long, lat];
  } else {
    delete favoriteBuildings[name];
  }

  refreshFavoriteList();

  // also re-create the popup to show new updated icon
  showPopupAtDest( [long, lat], name );
}

/*
  Returns true/false depending if some location is saved to favorites
  (instead of using the building's name)

  Use it for randomly placed pins and favorites.
*/
function isLocationInList( lat, long ) {
  const tolerance = 0.0001;

  for ( const [name, coordinates] of Object.entries( favoriteBuildings ) ) {
    const [storedLat, storedLong] = coordinates;

    // Check if the latitude and longitude are approximately equal
    if ( Math.abs( storedLat - lat ) < tolerance && Math.abs( storedLong - long ) < tolerance ) {
      return true; // Location is in the list
    }
  }

  return false;
}


refreshFavoriteList();