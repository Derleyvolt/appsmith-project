export default {
	cadastrar_TAG: async () => {
			await CadastroTAGAPI.run({ tagDados : {"descricao" : Input1.text} }).then(() => {
				showAlert("TAG cadastrada")
				navigateTo("Projetos")
			}).catch( () => {
							showAlert("Erro ao criar TAG")
			})
	}
}