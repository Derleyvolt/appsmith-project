export default {
		send_credentials: async (email, password) => {			
				let access = await getLoginToken.run({ userdata : {'email' : email, 'password' : password} }).catch( async () => {
						await showAlert("Login ou senha incorretos")
						return undefined
				})
				
				if(access) {
						return access;
				}
			
				return undefined
		}	
}