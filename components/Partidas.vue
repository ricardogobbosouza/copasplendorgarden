<script setup lang="ts">
import calendario from '../data/calendario.json'
</script>

<template>
  <Box id="partidas" title="Partidas">
    <div class="flex flex-col divide-y gap-">
      <div v-for="item in calendario" class="py-6">
        <h3 class="text-center text-2xl font-bold italic mb-2">{{ item.data }}</h3>
        <table class="w-full">
          <tr v-for="partida in item.partidas">
            <td class="px-1 py-2 md:px-4 md:py-3 text-sm md:text-base">{{ partida.hora }}</td>
            <td class="px-1 py-2 md:px-4 md:py-3 text-sm md:text-xl text-right">{{ partida.equipe1 }}</td>
            <td class="px-1 py-2 md:px-4 md:py-3 font-bold text-sm md:text-lg text-center">
              <span v-if="partida.placar">{{ partida.placar[0] }} x {{ partida.placar[1] }}</span>
              <span v-else>-</span>
            </td>
            <td class="px-1 py-2 md:px-4 md:py-3 text-sm md:text-xl">{{ partida.equipe2 }}</td>
          </tr>
        </table>
      </div>
    </div>
  </Box>
</template>