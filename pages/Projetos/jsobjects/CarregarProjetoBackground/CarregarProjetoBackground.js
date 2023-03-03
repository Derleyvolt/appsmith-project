export default {
	CarregarProjetos: async () => {
			var data =  await ObterProjetosAPI.run().catch(res => {
					showAlert(res)
			})
			
			var tableData = []
			
			console.log(data.length)
			
			for(var i = 0; i < data.length; i++) {
					var doc = data[i].cpf_coordenador.length > 0 ? data[i].cpf_coordenador : data[i].cnpj_coordenador;
					tableData.push({ id : data[i].id, titulo : data[i].titulo, coordenador : data[i].nome_coordenador , 
													 documento : doc, tarefa : '', vigenciaInicial: data[i].data_inicial, vigenciaFinal: data[i].data_final});
			}
		
			console.log(tableData)
			
			await storeValue("ProjetosTable", tableData);
	}
}