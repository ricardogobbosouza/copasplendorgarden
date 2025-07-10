<script setup lang="ts">
const fotos = import.meta.glob('@/public/fotos/2025/*.jpeg')
const videos = import.meta.glob('@/public/videos/2025/*.mp4')
</script>

<template>
  <Box id="fotos-e-videos" title="Fotos e Vídeos" v-if="fotos.length || videos.length">
    <div class="grid lg:grid-cols-2 gap-6 p-6" v-if="fotos.length">
      <img v-for="foto in fotos"
        class="rounded-xl"
        :src="foto.name.replace('public/', '')"
        :key="foto.name"
        alt=""
      />
    </div>
    <div class="grid gap-6 p-6" v-if="videos.length">
      <video
        v-for="video in videos"
        class="rounded-xl w-full aspect-video"
        controls
        :key="video.name"
      >
        <source
          :src="video.name.replace('public/', '')"
          type="video/mp4"
        >
      </video>
    </div>
  </Box>
</template>