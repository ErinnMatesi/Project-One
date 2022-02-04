// creating Welcome modal and zipmodal variable
var $modal = $(".modal");
var $zipModal = $(".zipModal");
// Coords to center the map initially
var coords = { lat: 47.6142, lng: -122.1937 };
// creating input variable and search button variable
var zipInput = document.querySelector("#zip");
var searchBtn = document.querySelector("#button1");
// will be used later to pull zip value
var getZip;

// modal
$modal.dialog({
  modal: true,
  buttons: [
    {
      text: "Yes!",
      click: function () {
        $(this).dialog("close");
      }
    },
    {
      text: "No, I'll be wearing gloves.",
      click: function () {
        $(this).dialog("close");
      }
    }
  ],
  minWidth: 400,
});

// Google maps
var initMap = function () {

  map = new google.maps.Map(document.getElementById('localgardenmap'), {
    center: coords,
    zoom: 11
  });

  const infowindow = new google.maps.InfoWindow();
  
  function createMarker(place) {
    if (!place.geometry || !place.geometry.location) return;

    const marker = new google.maps.Marker({
      map,
      position: place.geometry.location,
    });
    // open a pop-up window to display address for the marker.
    google.maps.event.addListener(marker, 'click', () => {
      const content = document.createElement('div');
      const nameElement = document.createElement('h2');
      const addressElement = document.createElement('p');

      nameElement.textContent = place.name;
      addressElement.textContent = place.formatted_address;

      content.appendChild(nameElement);
      content.appendChild(addressElement);
      infowindow.setContent(content);
      infowindow.open(map, marker);
    });
  };

  var request = {
    location: coords,
    radius: '500', // Preferring results closer to the center point.
    query: 'community garden',
  };

  service = new google.maps.places.PlacesService(map);

  service.textSearch(request, (results, status) => {
    if (status === google.maps.places.PlacesServiceStatus.OK && results) {
      console.log(results.length);
      for (var i = 0; i < results.length; i++) {
        createMarker(results[i]);
      }
    }
  });
};





// ZIPCODE INPUT
searchBtn.addEventListener("click", function(event) {
  event.preventDefault();
  getZip = zipInput.value.trim();
  if (getZip.length !== 5) {
    // zipModal displays if zipcode entry is !5 character
    $zipModal.dialog({
    modal: true,
    minWidth: 400,
    }) 
  } else {
      console.log(getZip);
  // this is optional, if we don't want to store zipcodes we can scratch this
  localStorage.setItem("zip", JSON.stringify(getZip));
  }
  if (getZip[0].style.visibility === 'hidden') {
    getZip[0].style.visibility = 'visible'
  } else {
    getZip[0].style.visibility = 'hidden'
  }
  
});

function show() {
  paraP = document.getElementById('hidden');
}