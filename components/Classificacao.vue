<script setup lang="ts">
import equipes from '../data/equipes.json'

const classificacao = computed(() => {
  return equipes.map((equipe) => {
    return {
      equipe: equipe.nome,
      pts: 0,
      pj: 0,
      vit: 0,
      e: 0,
      der: 0,
      gm: 0,
      gc: 0,
      sg: 0,
    }
  }).sort((a, b) => a.pts < b.pts ? 1 : (a.pts > b.pts ? -1 : 0))
})
</script>
<template>
  <Box id="classificacao" title="Classificação">
    <table class="w-full">
      <thead>
        <tr>
          <th class="px-4 py-3 bg-zinc-100 text-left font-semibold">Equipes</th>
          <th class="px-4 py-3 bg-zinc-100 text-center font-semibold">Pts</th>
          <th class="px-4 py-3 bg-zinc-100 text-center font-semibold">PJ</th>
          <th class="px-4 py-3 bg-zinc-100 text-center font-semibold">VIT</th>
          <th class="px-4 py-3 bg-zinc-100 text-center font-semibold">E</th>
          <th class="px-4 py-3 bg-zinc-100 text-center font-semibold">DER</th>
          <th class="px-4 py-3 bg-zinc-100 text-center font-semibold">GM</th>
          <th class="px-4 py-3 bg-zinc-100 text-center font-semibold">GC</th>
          <th class="px-4 py-3 bg-zinc-100 text-center font-semibold">SG</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in classificacao">
          <td class="px-4 py-3">{{ item.equipe }}</td>
          <td class="px-4 py-3 text-center">{{ item.pts }}</td>
          <td class="px-4 py-3 text-center">{{ item.pj }}</td>
          <td class="px-4 py-3 text-center">{{ item.vit }}</td>
          <td class="px-4 py-3 text-center">{{ item.e }}</td>
          <td class="px-4 py-3 text-center">{{ item.der }}</td>
          <td class="px-4 py-3 text-center">{{ item.gm }}</td>
          <td class="px-4 py-3 text-center">{{ item.gc }}</td>
          <td class="px-4 py-3 text-center">{{ item.sg }}</td>
        </tr>
      </tbody>
    </table>
  </Box>
</template>