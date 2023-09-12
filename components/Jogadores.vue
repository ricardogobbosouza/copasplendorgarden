<script setup lang="ts">
import jogadores from '../data/jogadores.json'
import equipes from '../data/equipes.json'

const getPlayers = () => {
  return jogadores
    .filter(jogador => jogador.equipe)
    .map(jogador => ({
      ...jogador,
      equipe: equipes.find((equipe) => equipe.nome === jogador.equipe)
    }))
    .sort((a, b) => a.nome.localeCompare(b.nome))
    .sort((a, b) => a.gols < b.gols ? 1 : (a.gols > b.gols ? -1 : 0));
}
</script>

<template>
  <Box id="jogadores" title="Jogadores">
    <div class="divide-y">
      <h3 class="text-center text-2xl p-4">Goleiros</h3>
      <div
        v-for="jogador in jogadores.filter(jogador => !jogador.equipe)"
        class="flex items-center justify-between gap-2 p-4"
      >
        <div class="flex flex-col">
          <span class="uppercase">{{ jogador.nome }}</span>
          <span class="text-sm">Posição: {{ jogador.posicao }}</span>
        </div>
        <div class="flex gap-2 items-center">
          <Icon name="emojione-monotone:soccer-ball" class="w-6 h-6" />
          <span class="text-lg font-semi-bold">{{ jogador.gols }}</span>
        </div>
      </div>
    </div>
    
    <div class="divide-y">
      <h3 class="text-center text-2xl p-4">Jogadores de linha</h3>
      <div
        v-for="jogador in getPlayers()"
        class="flex items-center justify-between gap-2 p-4"
      >
        <div class="flex items-center gap-2">
          <img
            class="w-12 h-12 object-contain"
            :src="jogador.equipe!.imagem"
          />
          <div class="flex flex-col">
            <span class="uppercase">{{ jogador.nome }}</span>
            <span class="text-sm">Posição: {{ jogador.posicao }}</span>
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