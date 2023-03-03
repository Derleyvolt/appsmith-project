export default {
	create_account: async () => {
			let email    = cadastro_email.text.toLowerCase()
			let password = cadastro_senha.text
			let username = nome_usuario.text;
			let cpf      = documento.text;
		
			await storeValue('userEmail',    email);
			await storeValue('userPassword', password);
			await storeValue('userName',     username);
			await storeValue('userCPF',      cpf);
			
			await validarEmailAPI.run( { email: { 'email': email } } ).then( async () => {
					await showAlert('Será enviado um código para o seu email');
					await navigateTo('codigoValidacao');
			}).catch( async() => {
					await showAlert('Algum erro ocorreu');
			});
	}
}