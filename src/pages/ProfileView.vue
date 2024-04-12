<template>
	<div class="flex h-full w-full">
		<VSidebar/>
		<section class="p-[20px_50px] flex-grow">
			<h4 class="mb-3.5">Profile</h4>
			<div class="flex gap-3.5">
				<div class="bg-block-color p-[20px] rounded-md size-[200px] min-w-[200px]">
					<v-skeleton class="w-full h-full rounded-full"/>
				</div>
				<div class="flex flex-col w-full">
					<div class="bg-block-color flex flex-col gap-3 p-5 rounded-md">
						<v-skeleton class="w-[200px] h-[25px]"/>

						<v-input :placeholder="text" class="max-w-64"  v-for="text in inputs" :key="text"/>
					</div>
				</div>
			</div>
		</section>
	</div>
</template>

<script lang="ts">
import { VSidebar } from "@/widgets/Sidebar"
import VInput from "@/shared/ui/Input/ui/VInput.vue";

export default {
	name: 'HomeView',
	components: {
		VInput,
		VSidebar,
	},
	data: () => ({
		inputs: [
			'Ваше имя',
			'Ваше фамилия',
			'Ваше возраст',
			'Город',
			'Введите имя пользователя',
			'Введите ссылку на аватар',
		]
	})
}

</script>
