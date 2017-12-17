$(document).ready(function() {
    var modals              = $('.modal'),
        datepickers         = $('.datepicker'),
        buttons             = $('button'),
        contributeButtons   = $('.contribute-button'),
        stayInContactForm   = $('#stay-in-contact-form'),
        signupModal         = $('#signup-modal');

    if (buttons) {
        buttons.addClass('waves-effect');
    }

    if (modals) {
        modals.modal();
    }

    if (datepickers) {
        datepickers.datepicker();
    }

    if (contributeButtons) {
        contributeButtons.click(contributeButtonClick);
    }

    if (stayInContactForm && signupModal) {
        stayInContactForm.submit(function (e) {
            e.preventDefault();

            // This just submits the request to HubSpot through its automatic forms thingy

            var $form = $(this),
                serializedForm = $form.serialize(),
                email = $form.find('[name="email"]').val();
            console.log(email);

            $.get($form.prop('action'), serializedForm);
            slackInvite(email);

            signupModal.modal('open');
        });
    }

    // if (grecaptcha) {
    //     grecaptcha.render('recaptcha', {
    //         sitekey: '6LfQ7zYUAAAAAN7OShfZvnZ_qav6GxVTkVLmpYOd',
    //         size: 'invisible',
    //     })
    // }
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

function recaptchaCallback() {

}

function slackInvite(email) {
    console.log('slack invite', email)
    var inviteUrl = 'https://us-central1-jaxlp-187506.cloudfunctions.net/slack';

    return $.ajax({
        url: inviteUrl,
        method: 'POST',
        dataType: 'json',
        crossDomain: true,
        data: {
            email: email
        }
    });
}
