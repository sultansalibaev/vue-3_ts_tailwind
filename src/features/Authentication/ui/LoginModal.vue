<template>
	<v-modal v-bind="$props" @hide-modal="$emit('hideModal', $event)">
		<template #default="{ hideModal }">
			<div class="flex flex-col gap-3 bg-block-color p-5 rounded-md w-80 relative">
				<i class="fa-solid fa-xmark absolute right-5 top-3 text-lg cursor-pointer" @click.stop="hideModal"></i>
				<h5>Login</h5>
				<v-input placeholder="Enter mail" @update:modelValue="console.log($event)" v-model="user.email">
					<template #left-icon>
						<i class="fa-solid fa-envelope"></i>
					</template>
				</v-input>
				<v-input placeholder="Enter password" v-model="user.password">
					<template #left-icon>
						<!--						<i class="fa-solid fa-unlock-keyhole"></i>-->
						<i class='bx bxs-lock-open text-[18px]'></i>
					</template>
				</v-input>
				<v-button text="Login" :disabled="!filled" @click="onLogin"/>
			</div>
		</template>
	</v-modal>
</template>

<script>

import VInput from "@/shared/ui/Input/ui/VInput.vue";
import VButton from "@/shared/ui/Button/ui/VButton.vue";
import { filled, user } from "../model/slice/loginSlice";
import { loginByEmail } from "../model/services/loginByEmail/loginByEmail";

export default {
	name: 'login-modal',
	components: { VButton, VInput },
	setup: () => ({
		user,
		filled,
		loginByEmail
	}),
	methods: {
		onLogin() {
			if (!this.filled) return;
			this.loginByEmail(this.user)
		}
	},
}

</script>
