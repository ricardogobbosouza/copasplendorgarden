<script setup lang="ts">
const supabase = useSupabaseClient()
const { data: equipes } = await supabase.from('equipes')
  .select()
  .order('nome', { ascending: true })

const { data: partidas } = await supabase.from('partidas')
  .select('id, status, equipe1 ( id, nome ), equipe2 ( id, nome ), gols ( id, equipe, contra )')
  .neq('status', 'pendente')

const getGols = (gols, equipe1, equipe2) => {
  return gols.filter(gol => gol.equipe === equipe1.id).filter(gol => !gol.contra).length
    + gols.filter(gol => gol.equipe === equipe2.id).filter(gol => gol.contra).length
}

const classificacao = computed(() => {
  return equipes.map((equipe) => {
    let pts = 0
    let pj = 0
    let vit = 0
    let e = 0
    let der = 0
    let gm = 0
    let gc = 0
    let sg = 0

    partidas.forEach(partida => {
      const equipe1 = partida.equipe1.id === equipe.id
      const equipe2 = partida.equipe2.id === equipe.id

      if (!(equipe1 || equipe2)) {
        return
      }

      const gols1 = getGols(partida.gols, partida.equipe1, partida.equipe2)
      const gols2 = getGols(partida.gols, partida.equipe2, partida.equipe1)

      let golsFeitos = equipe1 ? gols1 : gols2
      let golsSofridos = equipe2 ? gols1 : gols2

      pts += golsFeitos > golsSofridos ? 3 : (golsFeitos === golsSofridos ? 1 : 0),
      pj++;
      vit += golsFeitos > golsSofridos ? 1 : 0
      e += golsFeitos === golsSofridos ? 1 : 0
      der += golsFeitos < golsSofridos ? 1 : 0
      gm += golsFeitos,
      gc += golsSofridos,
      sg += golsFeitos - golsSofridos
    })

    return {
      equipe,
      pts,
      pj,
      vit,
      e,
      der,
      gm,
      gc,
      sg,
    }
  })
  .sort((a, b) => a.pts < b.pts ? 1 : (a.pts > b.pts ? -1 : 0))
  .sort((a, b) => a.gm < b.gm ? 1 : (a.gm > b.gm ? -1 : 0))
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
        <tr v-for="item in classificacao" :key="item.equipe.nome">
          <td class="px-4 py-3">{{ item.equipe.nome }}</td>
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