$(document).ready(function(){
	 $("#owl-demo").owlCarousel({
		 
		autoPlay: 3000, //Set AutoPlay to 3 seconds
		 
		items : 3,
		itemsDesktop : [1199,3],
		itemsDesktopSmall : [979,3],
		navigation: true,
		navigationText: ["<i class='fa fa-angle-left'></i>","<i class='fa fa-angle-right'></i>"]
		 
	});
	
	 $("#slide-testimonial").owlCarousel({
		 
		autoPlay: 3000, //Set AutoPlay to 3 seconds
		 
		singleItem:true,
		pagination: true,
		 
	});
	
	$('#menu').slicknav();
});