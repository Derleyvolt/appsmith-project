export default {
	default_values: async () => {
		  let extrato = appsmith.store.extrato;
			
			let cur_date   = new Date(Date.now());
			let parsedDate = cur_date.toISOString();
			parsedDate     = parsedDate.substring(0, parsedDate.indexOf("T"));
			
			let id_projeto = appsmith.store.id_projeto_atual;
			
			extrato.push({ "tipo_mov" : "",
									   "id_projeto" : id_projeto,
									   "Rubrica" : "",
									   "Data"  : parsedDate,
									   "Valor" : "",
									   "Favorecido": "",
									   "Documento": "",
										 "Tag": "",
									   "dataDocumento" : "",	
										 "dataPagamento" : "",	
									   "obs": ""})
			
			await storeValue("extrato", extrato)
	}
}