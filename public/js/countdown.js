function toDateSpan(date) {

		var secs = Math.floor(date/1000%60);
		var mins = Math.floor(date/1000/60%60);
		var hrs = Math.floor(date/1000/60/60%24);
		var days = Math.floor(date/1000/60/60/24);
		return {
			secs, mins, hrs, days, raw: date
		};
}

function Countdown(element, deadline) {
	var that = this;
	this.deadline = deadline;
	this.elements = {
	days:  element.getElementsByClassName('days')[0],
	hrs: element.getElementsByClassName('hours')[0],
	mins: element.getElementsByClassName('minutes')[0],
	secs: element.getElementsByClassName('seconds')[0]
	}
	this.interval = null;
	this.current = {secs: 0, mins: 0, hrs: 0, days: 0};
	this.next = {secs: 0, mins: 0, hrs: 0, days: 0};
	// this.setCounter(this.current);


}



Countdown.prototype.getRemaining = 	function () {
		left = this.deadline - Date.now();
		return toDateSpan(left);

	};

Countdown.prototype.stop = function() {
	clearInterval(this.interval);
};

Countdown.prototype.start = function () {
	left = this.getRemaining();
	if (left.raw > 0 ) {
		this.updateCounter();
		this.interval = setInterval(this.updateCounter.bind(this), 1000);
	}
	else this.setCounter({secs: 0, mins: 0, hrs: 0, days:0});
}
Countdown.prototype.updateCounter = function() {
		var next = this.next = this.getRemaining();
		var current = this.current;
		// use current and next to avoid reading and writing to DOM excessively.
		for (key in next) {
			if (!next.hasOwnProperty(key) || key == 'raw') continue;
			// make changes to current and to the DOM if necessary
			if(current[key] != next[key])
				current[key] = next[key];

				this.elements[key].innerHTML = current[key] < 10 ? "0"+ current[key]: current[key];
		}
		if (current.raw <= 0) {
			clearInterval(this.interval);
			this.setCounter({secs: 0, mins: 0, hrs: 0, days:0});
		}

		}

Countdown.prototype.setCounter = function(value) {
	this.elements['secs'].innerHTML = value.secs < 10 ? "0"+ value.secs : value.secs;
	this.elements['mins'].innerHTML = value.mins < 10 ? "0"+ value.mins : value.mins;
	this.elements['hrs'].innerHTML = value.hrs < 10 ? "0"+ value.hrs : value.hrs;
	this.elements['days'].innerHTML = value.days < 10 ? "0"+ value.days : value.days;


}

