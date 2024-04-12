<template>
    <div
		class="fixed top-0 bottom-0 left-0 right-0 flex justify-center items-center bg-[#00000059] z-10"
		v-if="modal"
		@click.self="hideModal"
	>
		<slot :hideModal="hideModal"></slot>
	</div>
</template>

<script>

export default {
	name: 'v-modal',
	props: {
		defaultShow: {
			type: [Boolean, null],
			default: undefined
		},
		show: {
			type: Boolean,
			default: false
		},
	},
	data() {
		const _modal = this.defaultShow ?? this.show;
		return {
			modal: _modal
		}
	},
	methods: {
		hideModal() {
			this.modal = false;
			this.$emit('hideModal')
		}
	},
	watch: {
		show(bool) {
			this.modal = bool
		}
	}
}

</script>
