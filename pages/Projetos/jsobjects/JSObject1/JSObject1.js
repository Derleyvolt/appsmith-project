export default {
	parseJSON : (extrato) => {
				var data = appsmith.store.rubricas2;
				var rubrica_desc;
			
				data.some((e, idx) => {
						if(e.label.indexOf(extrato.id_rubrica) != -1) {
								rubrica_desc = data[idx].label;
								return true;
						}
				});
			
				var {cpf, cnpj, nome, id : id_fav} = appsmith.store.AllFavorecidos.find(e => e.id == extrato.id_favorecido);
		
				return {
								"id"						: extrato.id,
								"tipo_mov" 			: extrato.id_movimentacao,
								"id_projeto" 		: extrato.id_projeto,
								"Rubrica" 			: rubrica_desc,
								"Data"  				: extrato.data,
								"Valor" 				: extrato.valor,
								"Favorecido"		: id_fav + ' - ' + nome,
					      "Documento"   	: cpf.length > 0 ? cpf : cnpj,
								"Tag" 					: extrato.tags.join(),
								"obs"						: extrato.observacao,
								"dataDocumento"	: extrato.data_documento,
								"dataPagamento"	: extrato.data_pagamento,
				}
	},
	
	carregar_extrato: async () => {
			await storeValue("id_projeto_atual", Table1.triggeredRow.id);
		
			await ObterExtratosAPI.run().then( async (res) => {
					console.log(res);
				
					if (res == undefined) {
							await storeValue("extrato", [])
					} else {			
							let toModel = [];
							
							res.forEach((e) => {
									toModel.push(JSObject1.parseJSON(e));
							});
						
							await storeValue("extrato", toModel);
					}
				
					navigateTo('Extrato');
			} ).catch( async (res) => {
					await showAlert(res.toString());
					await showAlert("Erro ao carregar extratos");
			})
		
			return appsmith.store.extrato;
	},
	updateProjeto: async () => {
			const { id, dataFinal } = Table1.tableData[Table1.triggeredRowIndex];
			await storeValue('updateProjetoDate', id);
			await UpdateProjetoAPI.run({ projetoDataFinal : {
					data_final: dataFinal
			} }).then(async () => {
					await showAlert('Sucesso');
			}).catch(async () => {
					await showAlert('Sucesso');
			})
	}
}