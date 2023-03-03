export default {
	cadastrarMovimentacao: async () => {
			let desc = Input1.text;
		
			console.log(desc)
		
			await Api1.run({ movData : { 'descricao': desc } }).then( async () => {
					await showAlert('Sucesso');
			}).catch( async() => {
					await showAlert('Algum erro ocorreu');
			})
	}
}