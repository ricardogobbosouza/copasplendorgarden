<script lang="ts" setup>
useHead({
  title: '5ª Copa Splendor Garden',
  link: [
    { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
  ]
})
</script>

<template>
  <div class="bg-zinc-700 min-h-screen bg-no-repeat bg-cover bg-fixed bg-[url(/bg.jpg)]">
    <div class="w-full h-full bg-black/30 p-4 md:p-6 lg:p-10 min-h-screen">
      <div class="container mx-auto max-w-2xl text-white">
        <Menu />
        <Logo />
        <Campeao />
        <Partidas />
        <Classificacao />
        <Equipes />
        <Jogadores />
        <Premiacao />
        <FotosVideos />
      </div>
    </div>
  </div>
</template>