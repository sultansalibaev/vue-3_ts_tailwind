import { $api } from "@/shared/api/api";
import { LoginSchema } from "../../types/loginSchema";

export function loginByEmail(user: LoginSchema) {
	$api.post('/auth/login', user)
		.then(response => {
			console.log('/auth/login', response)
		})
		.catch(error => console.log(error))
}
