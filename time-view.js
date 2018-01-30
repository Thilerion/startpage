var timeView = (function() {
	var timeP = document.getElementById("timeString");
	
	function updateTime() {
		let t = date.getTimeString();
		timeP.innerHTML = t;
	}
	
	return {
		updateTime: updateTime
	};
	
})();