export default {
	LoadPage: async () => {
			let data_favorecido 	 = await LoadFavorecidosAPI.run().catch(() => { showAlert("Erro na requisição dos dados de favorecidos") })
			let data_movimentacao  = await ObterMovimentacoesAPI.run().catch(() => { showAlert("Erro na requisição dos dados de movimentacão") })
			let data_rubrica       = await ObterRubricasAPI.run().catch(() => { showAlert("Erro na requisição dos dados de rubricas") })
			let data_tag 					 = await ObterTAGsAPI.run().catch(() => { showAlert("Erro na requisição dos dados das TAGs") })
			
			let lista_favorecidos   = []
			let lista_movimentacao  = []
			let lista_rubrica 			= []
			let lista_rubrica2 			= []
			let lista_tag 					= []
			
			await storeValue('AllFavorecidos', data_favorecido);
			await storeValue('AllMovimentacoes', data_movimentacao);
			
			for(let e of data_favorecido) {
					var data = e.id + ' - ' + e.nome;
					lista_favorecidos.push({'label': data, 'value': data});
			}
			
			for(let e of data_movimentacao) {
					lista_movimentacao.push({'label': e['descricao'], 'value': e['descricao']})
			}
			
			for(let e of data_rubrica) {
					lista_rubrica.push({'label': e['descricao'], 'value': e['id']})
					lista_rubrica2.push({'label': e.id + ' - ' + e['descricao'], 'value': e.id + ' - ' + e['descricao']})
			}
			
			for(let e of data_tag) {
					lista_tag.push({'label': e['descricao'], 'value': e['descricao']})
			}
			
			console.log(lista_favorecidos)
		
			await storeValue("favorecidos",   lista_favorecidos)
			await storeValue("movimentacoes", lista_movimentacao)
			await storeValue("rubricas",      lista_rubrica)
			await storeValue("rubricas2",     lista_rubrica2)
			await storeValue("tags",  	      lista_tag)
			
			await showAlert("Tudo carregado")
	}
}