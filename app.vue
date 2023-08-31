<script lang="ts" setup>
useHead({
  title: '5ª Copa Splendor Garden'
})
</script>

<template>
  <div class="bg-zinc-700 min-h-screen bg-no-repeat bg-cover bg-fixed bg-[url(/bg.jpg)]">
    <div class="w-full h-full bg-black/30 p-4 md:p-6 lg:p-10">
      <div class="container mx-auto max-w-2xl text-white">
        <Menu />
        <Logo />
        <Partidas />
        <Classificacao />
        <Equipes />
        <Jogadores />
        <Patrocinadores />
      </div>
    </div>
  </div>
</template>