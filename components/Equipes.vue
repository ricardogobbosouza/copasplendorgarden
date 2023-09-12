<script setup lang="ts">
import equipes from '../data/equipes.json'
</script>

<template>
  <Box id="equipes" title="Equipes">
    <div class="grid md:grid-cols-2 gap-10 p-6">
      <div v-for="equipe in equipes.sort((a, b) => a.nome.localeCompare(b.nome))" class="flex items-center gap-2">
        <img class="w-12 h-12 object-contain" :src="equipe.imagem" />
        <span>{{ equipe.nome }}</span>
      </div>
    </div>
  </Box>
</template>