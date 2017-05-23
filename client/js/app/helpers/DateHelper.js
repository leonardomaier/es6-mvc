class DateHelper {

	constructor() {}

	static dateToString(date) {
		return 	date.getDate() 
			+ '/' + (date.getMonth() + 1)
			+ '/' + date.getFullYear();
	}


	static textToDate(text) {
		return new Date(...text.split('-').map((item, index) => item - index % 2));
	}
}