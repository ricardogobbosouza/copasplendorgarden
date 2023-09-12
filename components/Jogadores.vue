<script setup lang="ts">
import jogadores from '../data/jogadores.json'
</script>

<template>
  <Box id="jogadores" title="Jogadores">
    <div class="divide-y">
      <div
        v-for="jogador in jogadores.sort((a, b) => a.gols < b.gols ? 1 : (a.gols > b.gols ? -1 : 0))"
        class="flex items-center justify-between gap-2 p-4"
      >
        <div class="flex items-center gap-2">
          <Icon name="ic:person" class="w-10 h-10" />
          <div class="flex flex-col">
            <span class="uppercase">{{ jogador.nome }}</span>
            <span class="text-sm">Posição: {{ jogador.posicao }}</span>
            <span class="text-sm">Equipe: {{ jogador.equipe }}</span>
          </div>
        </div>
        <div class="flex gap-2 items-center">
          <Icon name="emojione-monotone:soccer-ball" class="w-6 h-6" />
          <span class="text-lg font-semi-bold">{{ jogador.gols }}</span>
        </div>
      </div>
    </div>
  </Box>
</template>