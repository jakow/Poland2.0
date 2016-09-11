var nav = responsiveNav('#nav-mobile', {
	animate: true, 
	transition: 284, 
	label: "Menu", 
	insert: "before", 
	customToggle: "#nav-toggle", 
	closeOnNavClick: false, 
	openPos: "relative", 
	navClass: "nav-collapse", 
	navActiveClass: "js-nav-active", 
	jsClass: "js",
 	init: function(){this.isOpen = false; console.log('init')}, // Function: Init callback
 	open: function(){this.isOpen = true;console.log('open')}, // Function: Open callback
 	close: function(){this.isOpen = false; console.log('close')} // Function: Close callback
 });

$('#nav-mobile a').click(function() { nav.close()});

var $doc = $(document);
$doc.foundation();


$doc.ready(function() {
	$('#banner.content').addClass('animate-content');
	$('.team-grid').addClass('animate-content');
	//hack to close toggle menu	
	var navWrapper = $(nav.wrapper);
	$('#body, footer').click(function(event) {
		if(navWrapper.hasClass('opened')) {
			event.preventDefault();
			nav.close();
		}
	})
});

$doc.ready(function() {
	$('#nav-mobile').show();
})



$doc.ready(function() {
var $mcForm = $('#mc-embedded-subscribe-form');
var $button = $mcForm.find('button');
$buttonText = $button.find('.text');
$buttonLoader = $button.find('.loader-container');
$confirmationText = $mcForm.find('.confirmation');
$email = $('#mce-EMAIL');
$firstName = $('#mce-FNAME');
$lastName = $('#mce-LNAME');


var submitted = false;


var errorFeedback = function($element, isError, errorMessage) {
	$err = $element.parent().find('.error-container');
	if(isError) {
		$err.text(errorMessage);
		$element.addClass('has-error');
	}
	else {
		$element.removeClass('has-error');
		$err.text('');
	}
};


$email.on('blur', function() {
	value = $email.val();
	errorFeedback($email, value && !validateEmail(value), 'This is not a valid e-mail address');
});


$button.click(function(ev) {
	ev.preventDefault();
	var firstName = $firstName.val();
	var lastName = $lastName.val();
	var email = $email.val();
	if (submitted)
		return;
	if(firstName && lastName && validateEmail(email)) {

		//clear error feedback
		errorFeedback($firstName, 0, '');
		errorFeedback($lastName, 0, '');
		// submit the form and give the user feedback
		animateSubmit();

		var listUrl = $mcForm.attr('action').replace('/post?u=', '/post-json?u=') + "&c=?";

		$.ajax({
        type: 'GET',
        url: listUrl,
        data: $mcForm.serialize(),
        cache       : false,
        dataType    : 'json',
        contentType: "application/json; charset=utf-8",
        error       : function(err) { 
    		// console.log(err); 
    		animateError('Something went wrong. Please try again later.');
    		// alert("Could not connect to the registration server. Please try again later."); 
    	},
        success     : function(data) {
        	// console.log(data);
            if (data.result == "success") {
            	animateSuccess('Done! Check your e-mail for next steps.');	
            } 
            else if (data.msg.includes('already subscribed')) {
            	animateSuccess("You already reserved your tickets. Thank you.")
            }
            else {
    			animateError('Something went wrong. Please try again later.');
            }
        }
    });
	}

	else {

		//shake that form!
		shakeForm();

		// display feedback
		if (!email)
			errorFeedback($email, 1, 'Please fill in your e-mail address');
		else 
			errorFeedback($email, !validateEmail(email), 
			'This is not a valid e-mail address');
		errorFeedback($firstName, !firstName, 'Please fill in your first name');
		errorFeedback($lastName, !lastName, 'Please fill in your last name');
	}

})


function shakeForm() {
		$mcForm.addClass('shake');
		setTimeout(function() {
			$mcForm.removeClass('shake');
		}, 700);
}

function validateEmail(email) {
	mailRegex = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
	return mailRegex.test(email);
}

function debounce(fn, delay) {
  var timer = null;
  return function () {
    var context = this, args = arguments;
    clearTimeout(timer);
    timer = setTimeout(function () {
      fn.apply(context, args);
    }, delay);
  };
}

function animateSubmit() {
	$buttonText.addClass('unshow');
	$buttonLoader.addClass('show');
}

function animateSuccess(confirmationText) {
	$buttonLoader.removeClass('show');
	$button.addClass('success');
	// $button.removeClass('secondary');
	$button.prop('disabled', true);
	$buttonText.removeClass('unshow');
	$buttonText.html('<div class="check"/>');
	$confirmationText.text(confirmationText);
	// $button.addClass('unshow');
}

function animateError(errorText) {
	$buttonLoader.removeClass('show');
	$button.addClass('error');
	$button.removeClass('secondary');
	$button.prop('disabled', true);
	$buttonText.removeClass('unshow');
	$buttonText.html('<div class="error-x"/>');
	$confirmationText.text(errorText);

}
});




