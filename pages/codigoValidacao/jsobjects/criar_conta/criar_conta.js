export default {
	create_account: async () => {
			let codigo     = Input1.text;
		  let email      = appsmith.store.userEmail;
		  let password   = appsmith.store.userPassword;
		  let username   = appsmith.store.userName;
		  let cpf        = appsmith.store.userCPF;
			
			await cadastro_api.run({ userdata : { 'email' : email, 'password' : password, 'username': username, 'codigo': codigo, 'documento': cpf } }).
			then( async () => 
					 await showAlert("Usuário cadastrado com sucesso")
					).
			catch( async () => {
				await showAlert("Ocorreu algum erro")
			})
	}
}