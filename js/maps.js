$(document).ready(function() {
    var autocomplete = new google.maps.places.Autocomplete(
        (document.getElementById('contribute-input-address')),
        { types: ['geocode'] }
    );

    autocomplete.addListener('place_changed', function () {
        var place = autocomplete.getPlace();

        if (!place.geometry) {
            // User entered the name of a Place that was not suggested and
            // pressed the Enter key, or the Place Details request failed.
            window.alert("No details available for input: '" + place.name + "'");
            return;
        }
    });
});

function initMap() {
    // do nothing
}
