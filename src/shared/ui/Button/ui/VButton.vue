<template>
	<button
		class="flex justify-center items-center gap-2 h-10 bg-[#3259E8] rounded-lg transition-all duration-200"
		:class="{
			'bg-[#879ceb]': disabled
		}"
		:disabled="disabled"
	>
		<slot name="left-icon"></slot>
		<slot>
			<span v-if="text">{{ text }}</span>
		</slot>
		<slot name="right-icon"></slot>
	</button>
</template>

<script>

export default {
	name: 'v-button',
	props: {
		text: {
			type: String,
			default: undefined
		},
		disabled: {
			type: Boolean,
			default: false
		},
	}
}

</script>
