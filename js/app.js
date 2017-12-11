$(document).ready(function() {
    $('.modal').modal();
    $('.datepicker').datepicker();
    $('button').addClass('waves-effect');

    var contributeButtons = $('.contribute-button'),
        stayInContactForm   = $('#stay-in-contact-form'),
        signupModal         = $('#signup-modal');

    if (contributeButtons) {
        contributeButtons.click(contributeButtonClick);
    }

    if (stayInContactForm && signupModal) {
        stayInContactForm.submit(function (e) {
            e.preventDefault();

            signupModal.modal('open');
        });
    }

});

function contributeButtonClick(event) {
    event.preventDefault();
    var modal = $('#contribute-modal'),
        amount = $(this).data('amount') || 5;

    modal.modal('open');

    $('#contribute-input-amount').val(amount);

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

    M.updateTextFields();
}
