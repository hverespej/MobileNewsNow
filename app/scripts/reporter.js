navigator.getUserMedia = navigator.getUserMedia ||
	navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

(function() {
	navigator.getUserMedia({
		video: true,
		audio: true
	}, function(stream) {
		var videoElement = document.querySelector("video");
		videoElement.src = window.URL.createObjectURL(stream);
		videoElement.play();
	}, function() {

	});
}());