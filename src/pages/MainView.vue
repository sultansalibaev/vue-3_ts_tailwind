<template>
  <div class="flex h-full w-full">
    <VSidebar/>
    <section class="p-[20px_50px] flex-grow">
          <h4>Dashboard Sidebar</h4>
          <div class="bg-block-color my-[14px] p-[20px] rounded-md max-w-[500px]">
              Своих домах переписывается свой до океана одна составитель повстречался мир он выйти злых лучше, безорфографичный.
              <v-skeleton class="w-[200px] h-[25px] mt-3"/>
          </div>
      </section>
  </div>
</template>

<script lang="ts">
import { VSidebar } from "@/widgets/Sidebar"

export default {
  name: 'HomeView',
  components: {
    VSidebar,
  }
}

</script>
