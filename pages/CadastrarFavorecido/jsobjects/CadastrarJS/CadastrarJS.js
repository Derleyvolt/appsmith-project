export default {
	cadastrar: async () => {
			await CadastroAPI.run({ FavorecidoDados : {'nome' : Input1.text, 'cpf' : Input2.text, 'cnpj': Input3.text} }).then(res => {
					showAlert(res);
			}).catch( () => {
					showAlert("Erro ao criar favorecido");
			})
	}
}