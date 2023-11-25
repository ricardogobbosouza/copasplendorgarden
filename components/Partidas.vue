<script lang="ts" setup>
import _ from 'lodash'
const supabase = useSupabaseClient()
const { data: partidasRaw } = await supabase.from('partidas')
  .select('id, status, data, hora, equipe1 ( id, nome ), equipe2 ( id, nome ), gols ( id, equipe, contra )')
  .order('data', { ascending: true })
  .order('hora', { ascending: true })
const calendario = _.groupBy(partidasRaw, 'data')

const finais = [
  {
    "data": "03/12 - Semi Finais",
    "partidas":
    [
      { "hora": "09:00hs", "equipe1": "1º Colocado", "equipe2": "Vencedor (Jogo Repescagem 1)", "placar": null },
      { "hora": "10:00hs", "equipe1": "2º Colocado", "equipe2": "Vencedor (Jogo Repescagem 2)", "placar": null }
    ]
  },

  {
    "data": "10/12 - Finais",
    "partidas":
    [
      { "hora": "09:00hs", "equipe1": "Perdedor Jogo 3", "equipe2": "Perdedor Jogo 4", "placar": null },
      { "hora": "10:00hs", "equipe1": "Vencedor Jogo 3", "equipe2": "Vencedor Jogo 4", "placar": null }
    ]
  }
]

const getGols = (gols, equipe1, equipe2) => {
  return gols.filter(gol => gol.equipe === equipe1.id).filter(gol => !gol.contra).length
    + gols.filter(gol => gol.equipe === equipe2.id).filter(gol => gol.contra).length
}
</script>

<template>
  <Box id="partidas" title="Partidas">
    <div class="flex flex-col divide-y gap-">
      <div v-for="(partidas, data) in calendario" :key="data" class="py-6">
        <h3 class="text-center text-2xl font-bold italic mb-2">
          {{ data.substr(8, 2) }} / {{ data.substr(5, 2) }}
          {{ partidas[0] && partidas[0].title ? ` - ${partidas[0].title}` : '' }}
        </h3>
        <table class="w-full">
          <tr v-for="partida in partidas" :key="partida.id">
            <td class="px-1 py-2 md:x-4 md:py-3 text-sm md:text-base">{{ partida.hora.substr(0, 5) }}</td>
            <td class="px-1 py-2 md:px-4 md:py-3 text-sm md:text-xl text-right">{{ partida.equipe1.nome }}</td>
            <td class="px-1 py-2 md:px-4 md:py-3 font-bold text-sm md:text-lg text-center">
              <span v-if="partida.status !== 'pendente'">
                {{ getGols(partida.gols, partida.equipe1, partida.equipe2) }}
                x
                {{ getGols(partida.gols, partida.equipe2, partida.equipe1) }}
              </span>
              <span v-else>
                -
              </span>
            </td>
            <td class="px-1 py-2 md:px-4 md:py-3 text-sm md:text-xl">{{ partida.equipe2.nome }}</td>
          </tr>
        </table>
      </div>

      <div v-for="final in finais" class="py-6" :key="final.data">
        <h3 class="text-center text-2xl font-bold italic mb-2">
          {{ final.data }}
        </h3>
        <table class="w-full">
          <tr v-for="partida in final.partidas" :key="`${final.data}${partida.hora}`">
            <td class="px-1 py-2 md:x-4 md:py-3 text-sm md:text-base">{{ partida.hora }}</td>
            <td class="px-1 py-2 md:px-4 md:py-3 text-sm md:text-xl text-right">{{ partida.equipe1 }}</td>
            <td class="px-1 py-2 md:px-4 md:py-3 font-bold text-sm md:text-lg text-center">
              -
            </td>
            <td class="px-1 py-2 md:px-4 md:py-3 text-sm md:text-xl">{{ partida.equipe2 }}</td>
          </tr>
        </table>
      </div>
    </div>
  </Box>
</template>