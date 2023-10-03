<script setup lang="ts">
const fotos = import.meta.glob('@/public/fotos/*.jpeg')
</script>

<template>
  <Box id="fotos" title="Fotos">
    <div class="grid lg:grid-cols-2 gap-6 p-6">
      <img v-for="foto in fotos"
        class="rounded-xl"
        :src="foto.name.replace('public/', '')"
        :key="foto.name"
        alt=""
      />
    </div>
  </Box>
</template>