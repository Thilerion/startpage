/*jshint browser: true, devel: true, esversion: 6 */
/* globals prefs */

var date = (function() {
	
	var timeAndDate = {
		year: null,
		month: null,
		dayMonth: null,
		dayWeek: null,
		hours: null,
		minutes: null,
		seconds: null,
		dateText: {
			en: {
				monthNames: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
				shortMonthNames: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"],
				dayNames: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
				shortDayNames: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
				
			},
			nl: {
				monthNames: ["januari", "februari", "maart", "april", "mei", "juni", "juli", "augustus", "september", "oktober", "november", "december"],
				shortMonthNames: ["jan", "feb", "mrt", "apr", "mei", "jun", "jul", "aug", "sept", "okt", "nov", "dec"],
				dayNames: ["maandag", "dinsdag", "woensdag", "donderdag", "vrijdag", "zaterdag", "zondag"],
				shortDayNames: ["ma", "di", "wo", "do", "vr", "za", "zo"]
			}
		}
	};
	
	function setDate(y, m, dm, dw, h, min, s) {
		timeAndDate.year = y;
		timeAndDate.month = m;
		timeAndDate.dayMonth = dm;
		timeAndDate.dayWeek = dw;
		timeAndDate.hours = h;
		timeAndDate.minutes = min;
		timeAndDate.seconds = s;
	}
	
	function getShortDateString() {
		let order = prefs.get.dateAndTime.dateOrder;
		let lead = prefs.get.dateAndTime.dateLeadingZero;
		
		let d = lead ? ("0" + getDayNumber()).slice(-2) : getDayNumber();
		let m = lead ? ("0" + getMonthNumber()).slice(-2) : getMonthNumber();
		let y = getYearNumber();
		let s = prefs.get.dateAndTime.dateSeparator;
		
		let newArray = order.map(function(item) {
			if (item === 0) {
				return d;
			} else if (item === 1) {
				return m;
			} else if (item === 2) {
				return y;
			} else {
				return;
			}
		});
		
		return newArray.join(s);
	}
	
	function getTimeString() {
		let type = prefs.get.dateAndTime.clockType;
		let lead = prefs.get.dateAndTime.timeLeadingZero;
		let sep = prefs.get.dateAndTime.timeSeparator;
		
		let h = timeAndDate.hours;
		let m = timeAndDate.minutes;
		let ampm = "";
		
		if (h > 23 || h < 0) {
			h = 0;
		}
		
		if (type === 12) {
			ampm = h < 12 ? "am" : "pm";
			if (h > 12) {
				h -= 12;
			} else if (h < 1) {
				h = 12;
			}
		}
		
		if (lead === true) {
			h = ("0" + h).slice(-2);
			m = ("0" + m).slice(-2);
		}
		
		console.log(h + sep + m + " " + ampm);
		
		return h + sep + m + ampm;
	}
	
	function getPartOfDay() {
		let t = prefs.get.dateAndTime.partOfDayHours;
		let h = timeAndDate.hours;
		if (h < t.evening || h >= t.afternoon) {
			return 2;
		} else if (h >= t.morning && h < t.afternoon) {
			return 1;
		} else if (h >= t.evening && h < t.morning) {
			return 0;
		} else {
			throw "Can't find time of day";
		}
	}
		
	function getYearNumber() {
		return timeAndDate.year;
	}
	
	function getMonthName() {
		return timeAndDate.dateText[prefs.get.general.language].monthNames[timeAndDate.month];
	}
	
	function getShortMonthName() {
		return timeAndDate.dateText[prefs.get.general.language].shortMonthNames[timeAndDate.month];
	}
		
	function getMonthNumber() {
		return timeAndDate.month + 1;
	}
	
	function getDayName() {
		return timeAndDate.dateText[prefs.get.general.language].dayNames[timeAndDate.dayWeek];
	}
	
	function getShortDayName() {
		return timeAndDate.dateText[prefs.get.general.language].shortDayNames[timeAndDate.dayWeek];
	}
	
	function getDayNumber() {
		return timeAndDate.dayMonth;
	}
	
	var dateWidgetActive = false;
	var timeUntilMinute = 20;	
	
	var updateTimeTimeout;
	
	function startTimeout() {
		updateTimeTimeout = setTimeout(function() {
			updateTime();
			startTimeout();			
		}, timeUntilMinute);
	}
	
	function stopTimeout() {
		clearTimeout(updateTimeTimeout);
	}
	
	function updateTime() {
		console.log(this.date);
		
		var date = new Date();
		let h = date.getHours();
		let min = date.getMinutes();
		let s = date.getSeconds();
		let dw = date.getDay();
		let dm = date.getDate();
		let m = date.getMonth();
		let y = date.getFullYear();
		
		setDate(y, m, dm, dw, h, min, s);
		
		timeUntilMinute = (60 - s) * 1000;
		
		console.log(timeAndDate.hours + " : " + timeAndDate.minutes + " : " + timeAndDate.seconds);
		
		timeView.updateTime();
	}
	
	return {
		getMonthName: getMonthName,
		getShortMonthName: getShortMonthName,
		getDayName: getDayName,
		getShortDayName: getShortDayName,
		getShortDateString: getShortDateString,
		getTimeString: getTimeString,
		getPartOfDay: getPartOfDay,
		enableDateModule: function() {
			if (dateWidgetActive === false) {
				updateTime();
				dateWidgetActive = true;
				startTimeout();
			}			
		},
		disableDateModule: function() {
			if (dateWidgetActive === true) {
				dateWidgetActive = false;
				stopTimeout();
			}
		}
	};
	
})();

