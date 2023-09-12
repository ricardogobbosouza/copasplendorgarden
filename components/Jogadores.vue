<script setup lang="ts">
import jogadores from '../data/jogadores.json'
import equipes from '../data/equipes.json'

const getEquipeImage = (name: string) => {
  return equipes.find((equipe) => equipe.name === name)
}
</script>

<template>
  <Box id="jogadores" title="Jogadores">
    <div class="divide-y">
      <div
        v-for="jogador in jogadores.sort((a, b) => a.gols < b.gols ? 1 : (a.gols > b.gols ? -1 : 0))"
        class="flex items-center justify-between gap-2 p-4"
      >
        <div class="flex items-center gap-2">
          <img
            v-if="jogador.equipe && getEquipeImage(jogador.equipe)"
            class="w-12 h-12 object-contain"
            :src="getEquipeImage(jogador.equipe)?.image"
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