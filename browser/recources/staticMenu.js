function throttle (callback, limit) {
	var wait = false;
	var lastCall = false;
    return function () {
		lastCall = true;
        if (!wait) {
			lastCall = false;
            wait = true;
            callback.call();
            setTimeout(function () {
				wait = false;
				if(lastCall)
					callback.call();
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
		// +2 : border offset get from css #headerImage
	} else if( window.scrollY <= headerImage.getBoundingClientRect().height + 2 && leftToolbar.style.position !== "") {
		leftToolbar.style.position = "";
	}
};
var throttledScroll = throttle(makeMenuFixed, 50);

window.addEventListener("scroll", throttledScroll);
