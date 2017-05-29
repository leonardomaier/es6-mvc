class NegociacaoController {

	constructor() {

		let $ = document.querySelector.bind(document);

		this._inputData = $('#data');
		this._inputQuantidade = $('#quantidade');
		this._inputValor = $('#valor');

		this._listaNegociacoes = new Bind(
			new ListaNegociacoes(),
			new NegociacoesView($('#negociacoesView')),
			'adiciona', 'esvazia');

		this._mensagem = new Bind(
			new Mensagem(),
			new MensagemView($('#mensagemView')),
			'texto');
	}

	adiciona(event) {
		
		event.preventDefault();
		this._listaNegociacoes.adiciona(this._criaNegociacao());
		this._mensagem.texto = 'Negociação adicionada com sucesso!';
		this._limpaFormulario();
	}

	importaNegociacoes() {

		let service = new NegociacaoService();

		//Resolve o problema da ordem de execução das Promises
		Promise.all([
			service.obtemNegociacoesDaSemana(),
			service.obtemNegociacoesDaSemanaAnterior(),
			service.obtemNegociacoesDaSemanaRetrasada()]
		).then(negociacoes => {
			negociacoes
				.reduce((arrayFlat, array) => arrayFlat.concat(array), [])
				.forEach(negociacao => 	this._listaNegociacoes.adiciona(negociacao)); 

			this._mensagem.texto = 'Negociações importadas com sucesso';
		}).catch(erro => this._mensagem.texto = erro);

		/*

		Executam na ordem errada, pois o método é assíncrono

		service.obtemNegociacoesDaSemana()
			.then(negociacoes => {
				negociacoes.forEach(negociacao => this._listaNegociacoes.adiciona(negociacao));
				this._mensagem.texto = 'Negociações da semana obtidas com sucesso!';
			})
			.catch(erro => this._mensagem.texto = erro);

		service.obtemNegociacoesDaSemanaAnterior()
			.then(negociacoes => {
				negociacoes.forEach(negociacao => this._listaNegociacoes.adiciona(negociacao));
				this._mensagem.texto = 'Negociações da semana obtidas com sucesso!';
			})
			.catch(erro => this._mensagem.texto = erro);

		service.obtemNegociacoesDaSemanaRetrasada()
			.then(negociacoes => {
				negociacoes.forEach(negociacao => this._listaNegociacoes.adiciona(negociacao));
				this._mensagem.texto = 'Negociações da semana obtidas com sucesso!';
			})
			.catch(erro => this._mensagem.texto = erro);
		*/

		/*

		service.obtemNegociacoes((err, negociacoes) => {

			if (err) {
				
				this._mensagem.texto = 'Erro ao importar negociacoes';
				return;
			}

			negociacoes.forEach(negociacao => this._listaNegociacoes.adiciona(negociacao));
			this._mensagem.texto = 'Negociações importadas com sucesso';
		});

		*/

	}

	apaga() {

		this._listaNegociacoes.esvazia();
		this._mensagem.texto = 'Negociações apagadas com sucesso!';
	}

	_criaNegociacao() {
		return new Negociacao(
			DateHelper.textToDate(this._inputData.value),
			this._inputQuantidade.value,
			this._inputValor.value);
	}

	_limpaFormulario() {

		this._inputData.value = '';
		this._inputQuantidade.value = 1;
		this._inputValor.value = 0.0;

		this._inputData.focus();
	}
}