import { computed, reactive, ref } from "vue";

export const user = reactive(ref({
	email: 'in7678523@gmail.com',
	password: '123456789',
}));

export const filled = computed(() => {
	return Object.values(user.value).every(Boolean)
})
