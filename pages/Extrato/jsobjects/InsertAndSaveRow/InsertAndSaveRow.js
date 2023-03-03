export default {
		// converte o objecto do appsmith pro objecto que será salvo no db (as keys têm nomes diferentes)
		ParseJSON: (e) => {
				//const { id, Data: data, Favorecido : id_favorecido, Rubrica : id_rubrica	 } = e;
			
				return {
					"id"               : e.id,
					"data"						 : e.Data,
					"id_favorecido"    : e.Favorecido,
					"id_rubrica" 			 : e.Rubrica,
					"tags" 					   : e.Tag.split(','),
					"valor" 					 : e.Valor,
					"id_projeto" 			 : e.id_projeto,
					"observacao" 			 : e.obs,
					"id_movimentacao"  : e.tipo_mov,
					"data_documento"   : e.dataDocumento,
					"data_pagamento"   : e.dataPagamento
				}
		},
	
		UpdateAndSave: async () => {
				let data = Table1.tableData.map((e) => e);
				
				data[Table1.triggeredRowIndex] = Table1.tableData[Table1.triggeredRowIndex];
			
				let e;
			
				//if(!Boolean(Table1.updatedRow.id)) {
				//		e = data[Table1.triggeredRowIndex];
				//} else {
				//		e = Table1.updatedRow;
						//e.Tag = data[Table1.triggeredRowIndex].Tag;
				//}
			
				//console.log(Table1.updatedRow);
			
				if(!!Table1.updatedRow.id_projeto) {
						await showAlert('teste');
						e = Table1.updatedRow;
				} else {
						e = data[Table1.triggeredRowIndex];
				}
			
				//e = Table1.updatedRow.id || data[Table1.triggeredRowIndex];
			
				//console.log(e);
			
				let parsedObj = {
					"data"						 : e.Data,
					"id_favorecido"    : parseInt(e.Favorecido.substr(0, e.Favorecido.indexOf(' '))),
					"id_rubrica" 			 : e.Rubrica.substr(0, e.Rubrica.indexOf(" ")),
					"tags" 					   : e.Tag.length > 0 ? e.Tag.split(',') : [],
					"valor" 					 : e.Valor,
					"id_projeto" 			 : e.id_projeto,
					"observacao" 			 : e.obs,
					"id_movimentacao"  : e.tipo_mov,
					"data_documento"   : e.dataDocumento,
					"data_pagamento"   : e.dataPagamento,
				}
				
				if(e.id != undefined) {
								await storeValue("id_lancamento", e.id);
								console.log(parsedObj);
								await AtualizarLancamentoAPI.run({ ExtratoDados : parsedObj}).then(async (res) => {
								data[Table1.triggeredRowIndex] = e;
								await storeValue('favorecido_id', res.id_favorecido);
								var {cpf, cnpj} = await ObterFavorecidoAPI.run();
								data[Table1.triggeredRowIndex].Documento = cpf.length > 0 ? cpf : cnpj;  
								await storeValue("updateIndex", []);
								await storeValue("extrato", data);
								await showAlert("Sucesso");
						}).catch( async () => {
								await showAlert("Algum erro ocorreu na atualização dos dados");
						})
				} else {
								console.log(parsedObj);
								await CriarLancamentoAPI.run({ ExtratoDados : parsedObj}).then(async (res) => {
										data[Table1.triggeredRowIndex]    = e;
										data[Table1.triggeredRowIndex].id = res.id;
										await storeValue('favorecido_id', res.id_favorecido);
										var {cpf, cnpj} = await ObterFavorecidoAPI.run();
										data[Table1.triggeredRowIndex].Documento = cpf.length > 0 ? cpf : cnpj;  
										await storeValue("updateIndex", []);
										await storeValue("extrato", data);
										await showAlert("Sucesso");
						}).catch( async () => {
										await showAlert("Algum erro ocorreu na criação dos dados");
						})
				}
		}
}