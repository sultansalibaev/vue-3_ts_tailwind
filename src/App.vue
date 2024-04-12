<template>
  <router-view/>
</template>

<script>

import { fetchMyProfile } from "@/entities/Profile";

export default {
	setup: () => ({
		fetchMyProfile
	}),
	created() {
		this.fetchMyProfile()
	}
}

</script>

<style lang="scss">

#app {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}

</style>
