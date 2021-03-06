var donateFormAction = 'https://us-central1-jaxlp-187506.cloudfunctions.net/donate';
// var stripePublicKey = 'pk_test_YGBg7MPNOayQOOd7TcCGgAbd';
var stripePublicKey = 'pk_live_R5owoJRXovuEh2hefRUMFhPv';
var donateFormCanSubmit = true;

$(document).ready(function() {
    var stripe = Stripe(stripePublicKey);
    var elements = stripe.elements();

    var card = elements.create('card', {
        iconStyle: 'solid',
        style: {
            base: {
                iconColor: '#8898AA',
                color: '#231f20',
                lineHeight: '36px',
                fontWeight: 300,
                fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
                fontSize: '19px',

                '::placeholder': {
                    color: '#8898AA'
                },
            },
            invalid: {
                iconColor: '#e85746',
                color: '#e85746'
            }
        },
        classes: {
            focus: 'is-focused',
            empty: 'is-empty'
        }
    });
    card.mount('#card-element');

    var inputs = document.querySelectorAll('input.field');

    Array.prototype.forEach.call(inputs, function(input) {
        input.addEventListener('focus', function() {
            input.classList.add('is-focused');
        });
        input.addEventListener('blur', function() {
            input.classList.remove('is-focused');
        });
        input.addEventListener('keyup', function() {
            if (input.value.length === 0) {
                console.log('input is empty');
                input.classList.add('is-empty');
            } else {
				console.log('input is NOT empty');
                input.classList.remove('is-empty');
            }
        });
    });

    card.on('change', function(event) {
        setOutcome(event);
    });

    card.addEventListener('change', function(event) {
        var displayError = document.getElementById('card-errors');
        if (event.error) {
            displayError.textContent = event.error.message;
        } else {
            displayError.textContent = '';
        }
    });

    // Create a token or display an error when the form is submitted.
    var $form = $('#contribute-form');

    $form.submit(function(event) {
        event.preventDefault();

        console.log('form submitted');

        if (!donateFormCanSubmit) {
            $('#donation-error-text').html('It appears you have already submitted your donation. For your safety, please refresh this page to submit another donation.');
            M.Modal.getInstance(document.getElementById('donation-error-modal')).open();
            return;
        }

        stripe.createToken(card).then(function(result) {
            if (result.error) {
                console.log(result.error)
                // Inform the customer that there was an error
                var errorElement = document.getElementById('card-errors');
                errorElement.textContent = result.error.message;
            } else {
                // Send the token to your server
                stripeTokenHandler(result.token);

				M.Modal.getInstance(document.getElementById('contribute-modal')).close();
			}
        });
    });

	document.getElementById('contribute-submit').addEventListener('click', function (event) {
	    $form.submit();
    });
});

function setOutcome(result) {
    // var successElement = document.querySelector('.success');
    var errorElement = document.querySelector('.error');
    // successElement.classList.remove('visible');
    errorElement.classList.remove('visible');

    if (result.token) {
        // Use the token to create a charge or a customer
        // https://stripe.com/docs/charges
        // successElement.querySelector('.token').textContent = result.token.id;
        // successElement.classList.add('visible');
        console.log('Success! Your Stripe token is: ' + result.token.id);
	} else if (result.error) {
        errorElement.textContent = result.error.message;
        errorElement.classList.add('visible');
    }
}

function stripeTokenHandler(token) {
    var form = document.getElementById('contribute-form');

    // Insert the token ID into the form so it gets submitted to the server
    var hiddenInput = document.createElement('input');
    hiddenInput.setAttribute('id', 'stripeToken');
    hiddenInput.setAttribute('type', 'hidden');
    hiddenInput.setAttribute('name', 'stripeToken');
    hiddenInput.setAttribute('value', token.id);
    form.appendChild(hiddenInput);

    if (typeof grecaptcha !== 'undefined' && grecaptcha) {
        var recaptchaResponse = document.createElement('input')
            .setAttribute('id', 'recaptcha-response')
            .setAttribute('name', 'recaptcha-response')
            .setAttribute('type', 'hidden');

        grecaptcha.execute();
        recaptchaResponse.setAttribute('value', grecaptcha.getResponse());

        form.appendChild(recaptchaResponse);
    }

    var serializedForm = $(form).serialize();

    $.post(donateFormAction, serializedForm)
        .done(function (result) {
            console.log(result);
            M.Modal.getInstance(document.getElementById('thank-you-modal')).open();

            donateFormCanSubmit = false;
        })
        .fail(function (err) {
            console.error(err);
            $('#donation-error-text').text(JSON.stringify(err));
            console.error(document.getElementById('donation-error-modal'));
            M.Modal.getInstance(document.getElementById('donation-error-modal')).open();
        })
        .always(function (result) {
            form.removeChild(hiddenInput);
            console.log(result);
        })
}
