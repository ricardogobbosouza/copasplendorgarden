<script lang="ts" setup>
const supabase = useSupabaseClient()
const { data: partidaEmAndamento } = await supabase.from('partidas')
  .select('id, status, data, hora, equipe1 ( id, nome ), equipe2 ( id, nome ), gols ( id, equipe, jogador, contra )')
  .eq('status', 'em-andamento')
  .maybeSingle()

const getGols = (gols, equipe1, equipe2) => {
  return gols.filter(gol => gol.equipe === equipe1.id).filter(gol => !gol.contra).length
    + gols.filter(gol => gol.equipe === equipe2.id).filter(gol => gol.contra).length
}

const { data: partidas } = await supabase.from('partidas')
  .select('id, status, data, hora, equipe1 ( id, nome ), equipe2 ( id, nome )')
  .eq('status', 'pendente')
  .eq('data', `${new Date().getFullYear()}-${new Date().getMonth()}-${new Date().getDay()}`)
  .order('data', { ascending: true })
  .order('hora', { ascending: true })

const { data: goleiros } = await supabase.from('jogadores')
  .select('id, nome')
  .order('nome', { ascending: true })
  .eq('posicao', 'Goleiro')

const { data: jogadores } = await supabase.from('jogadores')
  .select('id, nome, posicao, numero, equipe ( id, nome, imagem )')
  .order('nome', { ascending: true })
  .neq('posicao', 'Goleiro')

const partidaAtual = ref(partidaEmAndamento)
const partida = ref(partidas?.at(0));
const goleiro1 = ref('');
const goleiro2 = ref('');
const jogador1 = ref('');
const jogador2 = ref('');

const iniciarPartida = async () => {
  if (!goleiro1.value || !goleiro2.value || !partida.value) {
    return
  }

  const { data } = await supabase
    .from('partidas')
    .update({
      goleiro1: goleiro1.value.id,
      goleiro2: goleiro2.value.id,
      status: 'em-andamento'
    })
    .eq('id', partida.value.id)
    .select('id, status, data, hora, equipe1 ( id, nome ), equipe2 ( id, nome ), gols ( id, equipe, jogador, contra )')
    .single()

    partidaAtual.value = data
}

const gol = async (jogador, contra = false) => {
  if (!partidaAtual.value || !jogador) {
    return
  }

  await supabase
    .from('gols')
    .insert({
      partida: partidaAtual.value.id,
      equipe: jogador.equipe.id,
      jogador: jogador.id,
      contra,
    })

  jogador1.value = ''
  jogador2.value = ''

  const { data } = await supabase.from('partidas')
    .select('id, status, data, hora, equipe1 ( id, nome ), equipe2 ( id, nome ), gols ( id, equipe, jogador, contra )')
    .eq('status', 'em-andamento')
    .maybeSingle()

  partidaAtual.value = data
}

const encerrar = async () => {
  if (!partidaAtual.value || !window.confirm('Deseja realmente encerrar essa partida?')) {
    return
  }

  await supabase
    .from('partidas')
    .update({
      status: 'encerrada'
    })
    .eq('id', partidaAtual.value.id)

    partidaAtual.value = null

    window.location.reload()
}
</script>

<template>
  <div class="bg-zinc-700 min-h-screen bg-no-repeat bg-cover bg-fixed bg-[url(/bg.jpg)]">
    <div class="w-full h-full bg-black/30 p-4 md:p-6 lg:p-10 min-h-screen">
      <div class="container mx-auto max-w-2xl text-white">
        <div v-if="partidaAtual">
          <Box :title="`${partidaAtual.equipe1.nome} - ${getGols(partidaAtual.gols, partidaAtual.equipe1, partidaAtual.equipe2)}`">
            <div class="p-4 space-y-6">
              <select v-model="jogador1" class="block w-full py-3 px-2 rounded-lg border-2">
                <option value="">Selecione</option>
                <option v-for="jogador in jogadores?.filter(jogador => jogador.equipe.id === partidaAtual.equipe1.id)" :key="jogador.id" :value="jogador">
                  ({{ jogador.numero }}) {{ jogador.nome }}
                </option>
              </select>
              <div class="flex items-center gap-6">
                <button
                  class="block w-full px-2 py-3 bg-green-500 text-white rounded-lg flex items-center justify-center gap-4"
                  @click="gol(jogador1, false)"
                >
                  <Icon name="emojione-monotone:soccer-ball" class="w-6 h-6" />
                  <span>Gol</span>
                </button>
                <button
                  class="block w-full px-2 py-3 text-red-500 rounded-lg flex items-center justify-center gap-4"
                  @click="gol(jogador1, true)"
                >
                  <Icon name="emojione-monotone:soccer-ball" class="w-6 h-6" />
                  <span>Gol contra</span>
                </button>
              </div>
            </div>
          </Box>
          <Box :title="`${partidaAtual.equipe2.nome} - ${getGols(partidaAtual.gols, partidaAtual.equipe2, partidaAtual.equipe1)}`">
            <div class="p-4 space-y-6">
              <select v-model="jogador2" class="block w-full py-3 px-2 rounded-lg border-2">
                <option value="">Selecione</option>
                <option v-for="jogador in jogadores?.filter(jogador => jogador.equipe.id === partidaAtual.equipe2.id)" :key="jogador.id" :value="jogador">
                  ({{ jogador.numero }}) {{ jogador.nome }}
                </option>
              </select>
              <div class="flex items-center gap-6">
                <button
                  class="block w-full px-2 py-3 bg-green-500 text-white rounded-lg flex items-center justify-center gap-4"
                  @click="gol(jogador2, false)"
                >
                  <Icon name="emojione-monotone:soccer-ball" class="w-6 h-6" />
                  <span>Gol</span>
                </button>
                <button
                  class="block w-full px-2 py-3 text-red-500 rounded-lg flex items-center justify-center gap-4"
                  @click="gol(jogador2, true)"
                >
                  <Icon name="emojione-monotone:soccer-ball" class="w-6 h-6" />
                  <span>Gol contra</span>
                </button>
              </div>
            </div>
          </Box>
          <Box>
            <button
              @click="encerrar()"
              class="block text-center px-2 py-3 w-full text-white bg-red-500 rounded-lg uppercase"
            >
              Encerrar partida
            </button>
          </Box>
        </div>

        <Box title="Iniciar partida" v-else-if="partidas?.length">
          <form @submit.prevent="iniciarPartida" class="p-4 space-y-6">
            <div>
              <label class="font-semibold block mb-1">Partida</label>
              <select v-model="partida" class="block w-full py-3 px-2 rounded-lg border-2">
                <option value="">Selecione</option>
                <option v-for="partida in partidas" :key="partida.id" :value="partida">
                  {{ partida.hora }} -
                  {{ partida.equipe1.nome }}
                  X
                  {{ partida.equipe2.nome }}
                </option>
              </select>
            </div>
            <div v-if="partida">
              <label class="font-semibold block mb-1">Goleiro do {{ partida.equipe1.nome }}</label>
              <select v-model="goleiro1" class="block w-full py-3 px-2 rounded-lg border-2">
                <option value="">Selecione</option>
                <option v-for="goleiro in goleiros" :key="goleiro.id" :value="goleiro">
                  {{ goleiro.nome }}
                </option>
              </select>
            </div>
            <div v-if="partida">
              <label class="font-semibold block mb-1">Goleiro do {{ partida.equipe2.nome }}</label>
              <select v-model="goleiro2" class="block w-full py-3 px-2 rounded-lg border-2">
                <option value="">Selecione</option>
                <option v-for="goleiro in goleiros" :key="goleiro.id" :value="goleiro">
                  {{ goleiro.nome }}
                </option>
              </select>
            </div>
            <button
              type="submit"
              class="block text-center px-2 py-3 w-full text-white bg-green-500 rounded-lg uppercase disabled:bg-gray-200 disabled:cursor-not-allowed"
              :disabled="!(partida && goleiro1 && goleiro2)">
              Começar
            </button>
          </form>
        </Box>

        <Box title="Jogos encerrados" v-else>
          <p class="text-center m-6">Por hoje é isso!</p>
        </Box>
      </div>
    </div>
  </div>
</template>