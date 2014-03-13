$(document).ready(function(){

//Parallax Initiation
	var $window = $(window);

	$('div[data-type="background"]').each(function(){
		var $scroll = $(this); // assigning the object

		$(window).scroll(function() {
			var yPos = -($window.scrollTop() / $scroll.data('speed'));
			var coords = '50% '+ yPos + 'px'; // Put together our final background position

			$scroll.css({ backgroundPosition: coords }); // Move the background
		});
	});

// Left Side Menu Button Click
	
	$slideMenu = 0;
		$('#menu-slide-icon').click(function(){
				if ($slideMenu === 0) {
				$('#LC-Mobile-Nav').animate({left:'0px'});

				$slideMenu = 1;
				} else if ( $slideMenu === 1) {
				$('#LC-Mobile-Nav').animate({left:'-180px'});
				$slideMenu = 0;
				}
			});
	$('.mob-nav').click(function(){
		if ($slideMenu === 1) {
		$('#LC-Body-Container').animate({left:'0px'});
		$('#LC-Mobile-Nav').animate({left:'-180px'});

		$slideMenu = 0;
		}
	});

//Navigation Page Scrolling 
	$('#landing-nav').visualNav({

		link              : 'a.menu',         // add a link class, as necessary (e.g. 'a.menu')
		targetAttr        : 'href',      // added in case you have link = "div" and attribute something like
		selectedAppliedTo : 'li',        // where to add the selected class name; to only apply to the link, use the same value as is in the link option
		contentClass      : 'section',   // content class to get height of the section
		contentLinks      : 'visualNav', // class name of links inside the content that act like the visualNav menu (smooth scroll)
		externalLinks     : 'external',  // class name of links that link to external content.
		useHash           : true,        // if true, the location hash will be updated

		// Classes added to items
		inViewClass       : 'inView',    // css class added to items in the viewport
		selectedClass     : 'selected',  // css class applied to menu when a link is selected (highlighted)
		currentContent    : 'current',   // css class applied to the content block when it is currently selected in the menu.

		// Appearance
		bottomMargin      : 0,         // margin from the end of the page where the last menu item is used (in case the target is short)
		fitContent        : true,       // If true, the contentClass width will be adjusted to fit the browser window (for horizontal pages).


		// Animation
		animationTime     : 1200,                 // time in milliseconds
		easing            : [ 'swing', 'swing' ], // horizontal, vertical easing; it might be best to leave one axis as swing [ 'swing', 'easeInCirc' ]
		stopOnInteraction : false,        // if the user presses any key or scrolls the mouse, the animation will cancel

    // Callbacks
    // visNav is visualNavigation object (see the callbacks page)
    // $selected is a jQuery object of the currently selected content (class name from "contentClass")
    initialized       : function(visNav, $selected){ }, // Callback executed when the visualNav plugin has finished initializing
    beforeAnimation   : function(visNav, $selected){ }, // Callback executed before the animation begins moving to the targetted element
    complete          : function(visNav, $selected){ }, // Callback executed when the targetted element is in view and scrolling animation has completed
    changed           : function(visNav, $selected){ }  // Callback executed every time the current menu item changes
	});

	$('#LC-Mobile-Nav').visualNav({
		link              : 'li.mob-nav',  // add a link class, as necessary (e.g. 'a.menu')
		targetAttr        : 'data',      // added in case you have link = "div" and attribute something like
		selectedAppliedTo : 'li',        // where to add the selected class name; to only apply to the link, use the same value as is in the link option
		contentClass      : 'section',   // content class to get height of the section
		contentLinks      : 'visualNav', // class name of links inside the content that act like the visualNav menu (smooth scroll)
		externalLinks     : 'external',  // class name of links that link to external content.
		useHash           : true,        // if true, the location hash will be updated

		// Classes added to items
		inViewClass       : 'inView',    // css class added to items in the viewport
		selectedClass     : 'selected',  // css class applied to menu when a link is selected (highlighted)
		currentContent    : 'current',   // css class applied to the content block when it is currently selected in the menu.

		// Appearance
		bottomMargin      : 0,         // margin from the end of the page where the last menu item is used (in case the target is short)
		fitContent        : true,       // If true, the contentClass width will be adjusted to fit the browser window (for horizontal pages).


		// Animation
		animationTime     : 1200,                 // time in milliseconds
		easing            : [ 'swing', 'swing' ], // horizontal, vertical easing; it might be best to leave one axis as swing [ 'swing', 'easeInCirc' ]
		stopOnInteraction : false,        // if the user presses any key or scrolls the mouse, the animation will cancel

    // Callbacks
    // visNav is visualNavigation object (see the callbacks page)
    // $selected is a jQuery object of the currently selected content (class name from "contentClass")
    initialized       : function(visNav, $selected){ }, // Callback executed when the visualNav plugin has finished initializing
    beforeAnimation   : function(visNav, $selected){ }, // Callback executed before the animation begins moving to the targetted element
    complete          : function(visNav, $selected){ }, // Callback executed when the targetted element is in view and scrolling animation has completed
    changed           : function(visNav, $selected){ }  // Callback executed every time the current menu item changes
	});


// Lazy Loader 

	$('#land-page').onScreen({
		doIn: function(){
			$(this).fadeIn("slow");
		}
	});

// Contact Form Validation

	$('.error').hide();
	$('#submit').click(function(e){
		//Form Validation Here
		e.preventDefault();

		$('.error').hide();
		$name = $('input#name').val();
		console.log($name);
		if ($name === "") {
			$('label#name-error').show();
			//return false;
		}

		$email = $('input#email').val();
		console.log($email);
		if ($email === "") {
			$('label#email-error').show();
			//return false;
		}

		if (!validate($email)) {

		}

		if (($name !== "") && ($email !== "") && (validate($email))) {

			$datObj = ({'name': $('input#name').val(),
						'email': $('input#email').val(),
						'message': $('input#message').val()
						});

			$.ajax({
				type: "POST",
				url: "contact.php",
				data: $datObj,
				dataType: "json",
				success: function(response){

					if(response !== "false") {
					$('#contact-form-data').slideUp("4000");
					$('#contact-msg').html("<h4>Thanks for the message, We look forward to speaking with you!</h4>");
					} else if (response === "true") {
					$('#contact-msg').html("<h6>Please review your submission and try again</h6>");
					}
				}
			});
		}
	});

	// Email Validator 
	function validate(email) {
                var regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                return (regex.test(email));
            }
});