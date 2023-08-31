<script lang="ts" setup>
defineProps(['title'])
</script>

<template>
  <div class="py-10">
    <h2 class="font-semibold text-lg lg:text-2xl uppercase text-center mb-6">
      {{ title }}
    </h2>
    <div class="bg-white rounded-xl md:p-4 lg:p-6 text-zinc-500 overflow-auto">
      <slot />
    </div>
  </div>
</template>