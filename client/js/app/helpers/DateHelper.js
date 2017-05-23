class DateHelper {

	// Como os métodos são static, não é necessário instanciar, gerando assim um erro
	constructor() {
		throw new Error('Esta classe não pode ser instanciada');
	}

	static dateToString(date) {
		return `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`;
	}


	static textToDate(text) {
		
		if(!/\d{4}-\d{2}-\d{2}/.test(text)) 
			throw new Error('Data informada no formato inválido');

		return new Date(...text.split('-').map((item, index) => item - index % 2));
	}
}