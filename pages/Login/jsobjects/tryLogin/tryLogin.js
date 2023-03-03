export default {
	Login: async () => {
			// obtem os dados dos widgets
			let email    = Input1.text.toLowerCase();
			let password = Input2.text.toLowerCase();
			
			// envia a requisição referente ao login, envia o username e password pra API.
			// retorna o token ou um objeto vazio.
			let res = await getToken.send_credentials(email, password);
		
			console.log(email, password);
			
			// se obteve sucesso no login, os dados do token são salvos
			if(res.hasOwnProperty('access')) {
					let {id} = await ObterIdAPI.run({ userdata : {'email' : email, 'password' : password} });
					await storeValue('access_token',  res.access);
					await storeValue('refresh_token', res.refresh);
					await storeValue('user_id', id);
					await navigateTo("Projetos");
			}
	}
}