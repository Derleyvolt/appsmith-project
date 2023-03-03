export default {
	Background: async () => {
			var favorecidos = await CarregarFavorecidosAPI.run().catch( async () => {
					await showAlert('Ocorreu algum erro ao carregar os favorecidos');
			});
			
			var select_data = [];
			
			for(var e of favorecidos) {
					select_data.push({ label : e.nome, value: e.id });
			}
			
			await storeValue('favorecidosCP', select_data);
	},
	
	CriarProjeto: async () => {
			const data_inicial = DatePicker1.selectedDate.substr(0, DatePicker1.selectedDate.indexOf('T'));
			const data_final   = DatePicker2.selectedDate.substr(0, DatePicker2.selectedDate.indexOf('T'));
		
		  console.log({ projetoDados : { titulo : Input1.text, contrato : Input2.text, num_sap : Input3.text,
																							     id_coordenador : Select1.selectedOptionValue, id_proponente : Select2.selectedOptionValue,
																							     id_usuario : appsmith.store.user_id,
																	 								 data_inicial: data_inicial,
																	 								 data_final:   data_final }});
		
			await CriarProjetoAPI.run({ projetoDados : { titulo : Input1.text, contrato : Input2.text, num_sap : Input3.text,
																							     id_coordenador : Select1.selectedOptionValue, id_proponente : Select2.selectedOptionValue,
																							     id_usuario : appsmith.store.user_id, 
																								   data_inicial: data_inicial,
																	 								 data_final:   data_final }}).then(async (res) => {
				await showAlert(res);
				navigateTo("Projetos");
			}).catch( async () => {
							await showAlert("Erro ao criar projeto");
			});
	}
}