var welcomeText = (function() {
	//goedemorgen van 06:00 tot 11:00
	//goedemiddag van 11:00 tot 18:00
	//goedenavond van 18:00 to 06:00
	
	function updateWelcomeText() {
		let p = date.getPartOfDay();
		let str = strings[p];
		document.getElementById("welcomeString").innerHTML = str;
		let nStr = prefs.get.general.name;
	
		document.getElementById("nameString").innerHTML = nStr;
	}
	
	
	
	let strings = ["Goedemorgen", "Goedemiddag", "Goedenavond"];
	
	
	
	
	return {
		updateWelcomeText: updateWelcomeText
	};
	
})();