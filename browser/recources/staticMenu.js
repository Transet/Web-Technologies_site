/**
 * Throttle funtion:
 * throttle(callback, limit, [options]) 
 * time in milliseconds
 * example:
 * var throttled = throttle(updatePosition, 100, {leading: false});
 * {leading: false} - to disable the first call
 */
function throttle (callback, limit, options) {
	var wait = false;
    if( options ) {
		wait = ((options.leading) ? true : false);
	}
    return function () {
        if (!wait) {
            callback.call();
            wait = true;
            setTimeout(function () {
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
var throttledScroll = throttle(makeMenuFixed, 100 , {leading: false});

window.addEventListener("scroll", throttledScroll);
