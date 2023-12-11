import moment from "moment";

export const dateInDays = (end, start = moment(),numbers) => {
	end = moment(end)
	const duration =  moment.duration(moment(end).diff(moment(start)));
	//Get Days
	const months = Math.floor(duration.asMonths()); // .asDays returns float but we are interested in full days only
	const monthsFormatted = months ? `${months}months ` : ""; // if no full days then do not display it at all
	//Get Days
	const days = Math.floor(duration.asDays()); // .asDays returns float but we are interested in full days only
	const daysFormatted = days ? `${days}d ` : ""; // if no full days then do not display it at all
	//Get Hours
	const hours = duration.hours();
	const hoursFormatted = `${hours}h `;
	//Get Minutes
	const minutes = duration.minutes();
	const minutesFormatted = `${minutes}m`;
	if(numbers==1){
		return [(days.toString().length==1?`0${days}`:days), (hours.toString().length==1?`0${hours}`:hours), (minutes.toString().length==1?`0${minutes}`:minutes),(duration.seconds().toString().length==1?`0${duration.seconds()}`:duration.seconds())]
	}
	return [monthsFormatted, daysFormatted, hoursFormatted, minutesFormatted].join("");
};