<script setup lang="ts">
import equipes from '../data/equipes.json'
import calendario from '../data/calendario.json'

const classificacao = computed(() => {
  const partidas = calendario[0].partidas

  return equipes.map((equipe) => {
    let golsFeitos = 0
    let golsSofridos = 0

    const placar1 = partidas.find(p => p.equipe1 === equipe.nome)
    if (placar1) {
      golsFeitos = placar1.placar[0]
      golsSofridos = placar1.placar[1]
    }

    const placar2 = partidas.find(p => p.equipe2 === equipe.nome)
    if (placar2) {
      golsFeitos = placar2.placar[1]
      golsSofridos = placar2.placar[0]
    }

    return {
      equipe: equipe.nome,
      pts: golsFeitos > golsSofridos ? 3 : (golsFeitos === golsSofridos ? 1 : 0),
      pj: 1,
      vit: golsFeitos > golsSofridos ? 1 : 0,
      e: golsFeitos === golsSofridos ? 1 : 0,
      der: golsFeitos < golsSofridos ? 1 : 0,
      gm: golsFeitos,
      gc: golsSofridos,
      sg: golsFeitos - golsSofridos,
    }
  })
  .sort((a, b) => a.pts < b.pts ? 1 : (a.pts > b.pts ? -1 : 0))
  .sort((a, b) => a.sg < b.sg ? 1 : (a.sg > b.sg ? -1 : 0))
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