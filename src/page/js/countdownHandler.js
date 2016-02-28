const countdownHandler = function () {    
    const _second = 1000;
    const _minute = _second * 60;
    const _hour = _minute * 60;
    const _day = _hour * 24;

    const normalizeTime = (time) => {
        if(time < 10) {
            return "0" + time;
        } else {
            return time;
        }
    };

    const getRemainingTime = (countDownTo) => {
        if(countDownTo === undefined) {
            return "";
        }

        const now = new Date();
        const distance = countDownTo - now;
        if (distance < 0) {
            return 'EXPIRED!';
        }

        let days = Math.floor(distance / _day);
        let hours = Math.floor((distance % _day) / _hour);
        hours = normalizeTime(hours);

        let minutes = Math.floor((distance % _hour) / _minute);
        minutes = normalizeTime(minutes);

        let seconds = Math.floor((distance % _minute) / _second);
        seconds = normalizeTime(seconds);

        if(days > 0) {
        	return days + "d " + hours + ":" + minutes + ":" + seconds;	
        } else {
        	return hours + ":" + minutes + ":" + seconds;	
        }
    }

    return { getRemainingTime };
};

export default countdownHandler;
