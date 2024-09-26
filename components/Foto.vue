<script setup lang="ts">
const props = defineProps(['id'])
const { data } = await useFetch(`/api/jogador/${props.id}`)
</script>

<template>
  <img
    class="w-20 h-20 object-cover rounded-lg"
    :src="data"
  />
</template>