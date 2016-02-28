import countdownHandler from "./js/countdownHandler";

(function () {
	const countdown = countdownHandler();
	let _countDownTo;

	const getQueryParameterByName = (name, url) => {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
	};

	const clockEngine = () => {
		setTimeout(function() {
			const remaining = countdown.getRemainingTime(_countDownTo);
			document.getElementById("clock").innerHTML = remaining;
			clockEngine();
		}, 1000);
	};

	const setBackgroundColor = (color) => {
		document.body.style.background = "#" + color;
	};

	const setBackgroundImage = (url, stretched) => {
		let styling = "";

		if(stretched) {
			styling += "width: 100%; height: 100%;background-image: url('" + url + "');";

			document.getElementById("wrapper").style = styling;
		} else {
			var img = new Image();
    	img.onload = function(){
				styling += "margin-top: 1em;" +
    							 "width: " + this.width + ";" +
    							 "height: " + this.height + ";" + 
    							 "background-image: url('" + url + "');";
				document.getElementById("wrapper").style = styling;
    	};
    	img.src = url;
		}
	};

	const initPage = () => {
		const displayText = getQueryParameterByName('text');
		document.getElementById("text").innerHTML = displayText;

		_countDownTo = new Date(Number(getQueryParameterByName('date')));
		clockEngine();

		let isStretched = getQueryParameterByName('stretched') === "true";

		const protocol = getQueryParameterByName('protocol');
		const url = getQueryParameterByName('image');
		setBackgroundImage(protocol + "://" + url, isStretched);
		setBackgroundColor(getQueryParameterByName('color'));
	}
	initPage();

})();
