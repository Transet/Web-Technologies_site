function throttle (callback, limit) {
	var wait = false;
    return function () {
        if (!wait) {
            wait = true;
            setTimeout(function () {
                callback.call();
				wait = false;
            }, limit);
        }
    }
};
makeMenuFixed = function() {
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
};
var throttledScroll = throttle(makeMenuFixed, 100 , {leading: true});

window.addEventListener("scroll", throttledScroll);
