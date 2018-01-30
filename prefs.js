/*jshint browser: true, devel: true, esversion: 6 */

var prefs = (function() {
	let general = {
		language: "nl",
		name: "Michael"
	};
	
	let generalOptions = {
		language: ["nl", "en"],
		name: {
			maxLength: 20
		}
	};
	
	let dateAndTime = {
		partOfDayHours: {
			morning: 11,
			afternoon: 18,
			evening: 5
		},
		clockType: 24,
		timeLeadingZero: true,
		dateLeadingZero: true,
		dateSeparator: "-",
		timeSeparator: ":",
		dateOrder: [1,2,3]
	};
	
	let dateAndTimeOptions = {
		
	};
	
	return {
		get: {
			general: general,
			dateAndTime: dateAndTime
		},
		getOptions: {
			general: generalOptions,
			dateAndTime: dateAndTimeOptions
		},
		set: {
			general: {
				language: function(n) {					
					general.language = generalOptions.language[n];
				},
				name: function(str) {
					if (typeof str !== "string") {
						throw "Error! Dit is geen 'string'.";
					}
					
					let trim = str.trim();
					let endStr = trim.substr(0,generalOptions.name.maxLength);
					general.name = endStr;
				}
			}
		}
	};
	
})();