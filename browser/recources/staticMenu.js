window.addEventListener("scroll", function() {
	/*get element*/
	var el = document.getElementById("leftToolbar");
	if(el === null) {
		return; /* return if no leftToolbar in document */
	}
	if ( el.getBoundingClientRect().top <= 0 && el.style.position !== "fixed") {
		el.style.position = "fixed";
	} else if( window.scrollY <= 150 && el.style.position !== "") {
		el.style.position = "";
	}
});