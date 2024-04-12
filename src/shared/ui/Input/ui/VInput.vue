<template>
	<div v-if="inlineContainer">
		<label class="inline-flex items-center gap-2 bg-body-color !text-sidebar-text-color h-9 px-2.5 rounded-md truncate">
			<slot name="left-icon"></slot>
			<input
				:type="type"
				:inputmode="inputmode"
				class="!font-normal bg-body-color !text-color outline-none border-none"
				:placeholder="placeholder"

				:value="modelValue"
				:autofocus="autofocus"
				:readonly="readonly"

				@input="handleInput"
				@focus="handleFocus"
				@blur="handleBlur"
			/>
			<slot name="right-icon"></slot>
		</label>
	</div>
	<label v-else class="inline-flex items-center gap-2 bg-body-color !text-sidebar-text-color h-9 px-2.5 rounded-md truncate">
		<slot name="left-icon"></slot>
		<input
			:type="type"
			:inputmode="inputmode"
			class="!font-normal bg-body-color !text-color outline-none border-none"
			:placeholder="placeholder"

			:value="modelValue"
			:autofocus="autofocus"
			:readonly="readonly"

			@input="handleInput"
			@focus="handleFocus"
			@blur="handleBlur"
		/>
		<slot name="right-icon"></slot>
	</label>
</template>

<script>

export default {
    name: 'v-input',
	props: {
		type: {
			type: String,
			default: 'text',
		},
		inputmode: {
			type: String,
			default: 'text',
		},
		placeholder: {
			type: [String, Number],
			default: ''
		},
		inlineContainer: {
			type: Boolean,
			default: false
		},
		modelValue: {
			type: [String, Number],
		},
		autofocus: {
			type: Boolean,
			default: false,
		},
		readonly: {
			type: Boolean,
			default: false,
		},
	},
	emits: ['update:modelValue'],
	methods: {
		handleInput(event) {
			this.$emit('update:modelValue', event.target.value)
		},
		handleFocus(...args) {
			this.$emit('focus', ...args)
		},
		handleBlur(...args) {
			this.$emit('blur', ...args)
		},
	}
}

</script>
