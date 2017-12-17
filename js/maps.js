function addressAutocomplete(elementId) {
    var element = (document.getElementById(elementId));
    var autocomplete = new google.maps.places.Autocomplete(
        element,
        { types: ['geocode'] }
    );

    autocomplete.addListener('place_changed', function () {
        var place = autocomplete.getPlace();

        if (!place.geometry) {
            // User entered the name of a Place that was not suggested and
            // pressed the Enter key, or the Place Details request failed.
            window.alert("No details available for input: '" + place.name + "'");
        }
    });
}


$(document).ready(function() {
    addressAutocomplete('contribute-input-address')
});
