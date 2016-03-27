window.addEventListener("scroll", function() {
	var leftToolbar = document.getElementById("leftToolbar");
	var headerImage = document.getElementById("headerImage");
	if(leftToolbar === null || headerImage === null ) {
		return;
	}
	if ( leftToolbar.getBoundingClientRect().top <= 0 && leftToolbar.style.position !== "fixed") {
		leftToolbar.style.position = "fixed";
	} else if( window.scrollY <= headerImage.getBoundingClientRect().height && leftToolbar.style.position !== "") {
		leftToolbar.style.position = "";
	}
});