import { $api } from "@/shared/api/api";

export function fetchMyProfile() {
	$api.get('/profile')
		.then(res => {
			console.log(res)
		})
		.catch(err => console.log(err))
}
