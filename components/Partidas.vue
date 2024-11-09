<script lang="ts" setup>
import _ from 'lodash'
const supabase = useSupabaseClient()
const { data: campeonato } = await supabase.from('campeonatos')
  .select('id, nome, status')
  .order('id', { ascending: false })
  .limit(1)
  .maybeSingle()

  const { data: partidasRaw } = await supabase.from('partidas')
  .select('id, status, title, data, hora, tipo, equipe1 ( id, nome ), equipe2 ( id, nome ), gols ( id, equipe, contra, penaltis )')
  .eq('campeonato', campeonato.id)
  .order('data', { ascending: true })
  .order('hora', { ascending: true })
const calendario = _.groupBy(partidasRaw, 'data')

const getGols = (gols, equipe1, equipe2, penaltis) => {
  return gols.filter(gol => gol.equipe === equipe1.id).filter(gol => !gol.contra).filter(gol => gol.penaltis === penaltis).length
    + gols.filter(gol => gol.equipe === equipe2.id).filter(gol => gol.contra).filter(gol => gol.penaltis == penaltis).length
}

const equipe1Nome = (partida) => {
  if (partida.equipe1) {
    return partida.equipe1.nome
  }

  if (partida.tipo === 'semifinal-1x4') {
    return '1º colocado'
  }

  if (partida.tipo === 'semifinal-2x3') {
    return '2º colocado'
  }

  if (partida.tipo === 'final-1x2') {
    return 'Vencedor da semifinal 1'
  }

  if (partida.tipo === 'final-3x4') {
    return 'Perdedor da semifinal 1'
  }

  return '---'
}

const equipe2Nome = (partida) => {
  if (partida.equipe2) {
    return partida.equipe2.nome
  }

  if (partida.tipo === 'semifinal-1x4') {
    return '4º colocado'
  }

  if (partida.tipo === 'semifinal-2x3') {
    return '3º colocado'
  }

  if (partida.tipo === 'final-1x2') {
    return 'Vencedor da semifinal 2'
  }

  if (partida.tipo === 'final-3x4') {
    return 'Perdedor da semifinal 2'
  }

  return '---'
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
            <td class="px-1 py-2 md:px-4 md:py-3 text-sm md:text-xl text-right">{{ equipe1Nome(partida) }}</td>
            <td class="px-1 py-2 md:px-4 md:py-3 font-bold text-sm md:text-lg text-center">
              <div v-if="partida.status !== 'pendente'">
                {{ getGols(partida.gols, partida.equipe1, partida.equipe2, false) }}
                x
                {{ getGols(partida.gols, partida.equipe2, partida.equipe1, false) }}
              </div>
              <div v-else>
                -
              </div>
              <div class="text-xs" v-if="getGols(partida.gols, partida.equipe1, partida.equipe2, true) || getGols(partida.gols, partida.equipe2, partida.equipe1, true)">
                {{ getGols(partida.gols, partida.equipe1, partida.equipe2, true) }}
                x
                {{ getGols(partida.gols, partida.equipe2, partida.equipe1, true) }}
              </div>
            </td>
            <td class="px-1 py-2 md:px-4 md:py-3 text-sm md:text-xl">{{ equipe2Nome(partida) }}</td>
          </tr>
        </table>
      </div>
    </div>
  </Box>
</template>