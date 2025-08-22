<script lang="ts" setup>
const supabase = useSupabaseClient()
const { data: campeonato } = await supabase.from('campeonatos')
  .select('id, nome, status')
  .order('id', { ascending: false })
  .limit(1)
  .maybeSingle()

const { data: equipes } = await supabase.from('equipes')
  .select()
  .eq('campeonato', campeonato.id)
  .order('nome', { ascending: true })

const { data: jogadoresRaw } = await supabase.from('jogadores')
  .select('id, nome, posicao, numero, equipe ( id, nome, imagem ), gols ( id, contra, penaltis )')
  .order('nome', { ascending: true })
  .eq('campeonato', campeonato.id)
  .neq('posicao', 'Goleiro')

const { data: goleirosRaw } = await supabase.from('jogadores')
  .select('id, nome')
  .order('nome', { ascending: true })
  .eq('campeonato', campeonato.id)
  .eq('posicao', 'Goleiro')

const { data: partidas } = await supabase.from('partidas')
  .select('id, status, equipe1 ( id, nome ), equipe2 ( id, nome ), goleiro1 ( id, nome ), goleiro2 ( id, nome ), gols ( id, equipe, jogador, contra, penaltis )')
  .neq('status', 'pendente')
  .eq('campeonato', campeonato.id)

const getGols = (gols, equipe1, equipe2) => {
  return gols.filter(gol => gol.equipe === equipe1.id).filter(gol => !gol.contra).filter(gol => !gol.penaltis).length
    + gols.filter(gol => gol.equipe === equipe2.id).filter(gol => gol.contra).filter(gol => !gol.penaltis).length
}

const goleiros = computed(() => {
  return goleirosRaw?.map((goleiro) => {
    const partida1 = partidas?.filter(p => p.goleiro1?.id === goleiro.id) || []
    const partida2 = partidas?.filter(p => p.goleiro2?.id === goleiro.id) || []
    let golsSofridos = 0

    partida1.forEach((partida) => {
      golsSofridos += getGols(partida.gols, partida.equipe2, partida.equipe1)
    })

    partida2.forEach((partida) => {
      golsSofridos += getGols(partida.gols, partida.equipe1, partida.equipe2)
    })

    return {
      id: goleiro.id,
      nome: goleiro.nome,
      partidas: partida1.length + partida2.length,
      golsSofridos
    }
  })
  .sort((a, b) => a.golsSofridos < b.golsSofridos ? 1 : (a.golsSofridos > b.golsSofridos ? -1 : 0))
  .sort((a, b) => a.partidas > b.partidas ? 1 : (a.partidas < b.partidas ? -1 : 0))
  .reverse()
})

const jogadores = computed(() => {
  return jogadoresRaw?.map((jogador) => {
    return {
      ...jogador,
      gols: jogador.gols.filter(g => !g.contra).length,
      golsContra: jogador.gols.filter(g => g.contra).length,
    }
  })
  .sort((a, b) => a.golsContra > b.golsContra ? 1 : (a.golsContra < b.golsContra ? -1 : 0))
  .sort((a, b) => a.gols < b.gols ? 1 : (a.gols > b.gols ? -1 : 0))
})
</script>

<template>
  <Box id="jogadores" title="Jogadores">
    <div class="divide-y">
      <h3 class="text-center text-2xl p-4">Goleiros</h3>
      <div
        v-for="goleiro in goleiros"
        :key="goleiro.id"
        class="flex items-center justify-between gap-2 p-4"
      >
        <div class="flex flex-col">
          <span class="uppercase">{{ goleiro.nome }}</span>
          <span class="text-sm">Jogos: {{ goleiro.partidas }}</span>
        </div>
        <div class="flex gap-2 items-center">
          <Icon name="emojione-monotone:soccer-ball" class="w-6 h-6 text-red-500" />
          <span class="text-lg font-semi-bold">{{ goleiro.golsSofridos }}</span>
        </div>
      </div>
    </div>

    <div v-for="equipe in equipes" :key="equipe.id" class="p-6">
      <div class="flex items-center gap-2 border-b p-4">
        <img class="w-12 h-12 object-contain" :src="equipe.imagem" />
        <span class="text-center text-2xl">{{ equipe.nome }}</span>
      </div>
      <div
        v-for="jogador in jogadores.filter(jogador => jogador.equipe?.id === equipe.id)"
        :key="jogador.id"
        class="flex items-center gap-2 p-4"
      >
        <div class="flex-1 flex items-center gap-2">
          <ClientOnly>
            <Foto
              class="w-12 h-12 object-contain"
              :id="jogador.id"
            />
          </ClientOnly>
          <div class="flex flex-col">
            <span class="uppercase">{{ jogador.nome }}</span>
            <span class="text-sm">Posição: {{ jogador.posicao }}</span>
            <span class="text-sm">Número: {{ jogador.numero }}</span>
          </div>
        </div>
        <div class="flex flex-col gap-2 items-center">
          <div class="flex gap-2 items-center">
            <Icon name="emojione-monotone:soccer-ball" class="w-6 h-6" />
            <span class="text-lg font-semi-bold">{{ jogador.gols }}</span>
          </div>
          <div class="flex gap-2 items-center">
            <Icon name="emojione-monotone:soccer-ball" class="w-6 h-6 text-red-500" />
            <span class="text-lg font-semi-bold">{{ jogador.golsContra }}</span>
          </div>
        </div>
      </div>
    </div>
  </Box>
</template>