class View {

	constructor(element) {
	
		this._element = element;
	}

	template() {

		throw new Error('O método _template deve ser implementando!');
	}

	update(model) {
	
		this._element.innerHTML = this.template(model);
	}
}