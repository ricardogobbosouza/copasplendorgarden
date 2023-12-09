<script lang="ts" setup>
import _ from 'lodash'
const supabase = useSupabaseClient()
const { data: partidasRaw } = await supabase.from('partidas')
  .select('id, status, title, data, hora, equipe1 ( id, nome ), equipe2 ( id, nome ), gols ( id, equipe, contra, penaltis )')
  .order('data', { ascending: true })
  .order('hora', { ascending: true })
const calendario = _.groupBy(partidasRaw, 'data')

const getGols = (gols, equipe1, equipe2, penaltis) => {
  return gols.filter(gol => gol.equipe === equipe1.id).filter(gol => !gol.contra).filter(gol => gol.penaltis === penaltis).length
    + gols.filter(gol => gol.equipe === equipe2.id).filter(gol => gol.contra).filter(gol => gol.penaltis == penaltis).length
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
              <div v-if="partida.status !== 'pendente'">
                {{ getGols(partida.gols, partida.equipe1, partida.equipe2, false) }}
                x
                {{ getGols(partida.gols, partida.equipe2, partida.equipe1, false) }}
              </div>
              <div v-else>
                -
              </div>
              <di class="text-xs" v-if="getGols(partida.gols, partida.equipe1, partida.equipe2, true) || getGols(partida.gols, partida.equipe2, partida.equipe1, true)">
                {{ getGols(partida.gols, partida.equipe1, partida.equipe2, true) }}
                x
                {{ getGols(partida.gols, partida.equipe2, partida.equipe1, true) }}
              </di>
            </td>
            <td class="px-1 py-2 md:px-4 md:py-3 text-sm md:text-xl">{{ partida.equipe2.nome }}</td>
          </tr>
        </table>
      </div>
    </div>
  </Box>
</template>