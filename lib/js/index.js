$(document).ready(function(){

// Parallax Inititator
	skrollr.init();


// Explore Button Hover State	
	$('#btn-explore').hover(function(){
		$('#btn-explore').css("background-color","purple");
	}, function(){
		$('#btn-explore').css("background-color", "transparent");
	});



});