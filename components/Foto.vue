<script setup lang="ts">
const props = defineProps(['id'])
const { data, error, refresh } = await useFetch(`/api/jogadorfoto/${props.id}`)

if (error.value) {
  setTimeout(refresh, 3000)
}
</script>

<template>
  <img
    v-if="data"
    class="w-20 h-20 object-cover rounded-lg"
    :src="data"
  />
</template>