export default {
	cadastrar_rubrica: async (info) => {
			return await CadastroRubricaAPI.run({ rubricaDados : { "id" : info.id, "descricao" : info.descricao } }).then(async () => {
					await showAlert("Rubrica cadastrada");
					return true;
			}).catch( async () => {
					await showAlert("Erro ao criar rubrica");
					return false;
			})
	},
	verificar_validade_id: async (param) => {
			var id = parseInt(param.replaceAll('.', ''));
			await storeValue('parsed_id', id)
			return await VerificarDisponibilidadeAPI.run().then(() => {
					return true;
			}).catch(() => {
					return false;
			})
	},
	carregar_rubricas: async () => {
			let data_rubrica  = await ObterRubricasAPI.run().catch(() => { showAlert("Erro na requisição dos dados de rubricas") })
		
			await storeValue("rubricas_2", data_rubrica)
			await showAlert("Tudo carregado")
	},
	salvar_rubrica: async () => {
			if(Table1.isAddRowInProgress) {
					if(Table1.newRow.id.match(/^[1-3].[0-3].[0-3]$/)) {
							if(await Funcs.verificar_validade_id(Table1.newRow.id)) {
									var data = Table1.tableData;
									if(data) {
											data.push(Table1.newRow);
									} else {
											data = [Table1.newRow]
									}
									
									if(await Funcs.cadastrar_rubrica(Table1.newRow)) {
											await storeValue('rubricas_2', data);
									}			
							} else {
									await showAlert('O id da rubrica já existe')
							}
					} else {
							await showAlert('O id da rubrica nao está no formato correto');
					}
			}
	}
}