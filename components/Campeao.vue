<script lang="ts" setup>
const supabase = useSupabaseClient()

const { data: partida1e2 } = await supabase.from('partidas')
  .select('id, status, equipe1 ( id, nome, imagem ), equipe2 ( id, nome, imagem ), gols ( id, equipe, contra, penaltis )')
  .eq('tipo', 'final-1-e-2')
  .maybeSingle()

const { data: partida3e4 } = await supabase.from('partidas')
  .select('id, status, equipe1 ( id, nome, imagem ), equipe2 ( id, nome, imagem ), gols ( id, equipe, contra, penaltis )')
  .eq('tipo', 'final-3-e-4')
  .maybeSingle()

const getGols = (gols, equipe1, equipe2, penaltis) => {
  return gols.filter(gol => gol.equipe === equipe1.id).filter(gol => !gol.contra).filter(gol => gol.penaltis === penaltis).length
    + gols.filter(gol => gol.equipe === equipe2.id).filter(gol => gol.contra).filter(gol => gol.penaltis == penaltis).length
}

const vencedor = (partida) => {
  const golsEquipe1 = getGols(partida.gols, partida.equipe1, partida.equipe2, false)
  const golsEquipe2 = getGols(partida.gols, partida.equipe2, partida.equipe1, false)

  if (golsEquipe1 > golsEquipe2) {
    return partida.equipe1
  }

  if (golsEquipe1 < golsEquipe2) {
    return partida.equipe2
  }

  const penaltisEquipe1 = getGols(partida.gols, partida.equipe1, partida.equipe2, true)
  const penaltisEquipe2 = getGols(partida.gols, partida.equipe2, partida.equipe1, true)

  return (penaltisEquipe1 > penaltisEquipe2)
    ? partida.equipe1
    : partida.equipe2
}

const perdedor = (partida) => {
  const equipe = vencedor(partida)

  return partida.equipe1 === equipe
    ? partida.equipe2
    : partida.equipe1
}
</script>

<template>
  <div id="campeao" v-if="partida1e2 && partida3e4">
    <div class="flex items-end justify-center gap-1">
      <div>
        <div class="bg-white rounded-full h-28 w-28 md:w-40 md:h-40 flex items-center justify-center">
          <img v-if="partida1e2.status === 'encerrada'" :src="perdedor(partida1e2).imagem" :alt="perdedor(partida1e2).nome" class="h-12 w-12 md:w-16 md:h-16 object-contain" />
          <img v-if="partida1e2.status !== 'encerrada'" :src="partida1e2.equipe1.imagem" :alt="partida1e2.equipe1.nome" class="h-12 w-12 md:w-16 md:h-16 object-contain" />
          <img v-if="partida1e2.status !== 'encerrada'" :src="partida1e2.equipe2.imagem" :alt="partida1e2.equipe2.nome" class="h-12 w-12 md:w-16 md:h-16 object-contain" />
        </div>
        <div class="text-center text-4xl m-1">2º</div>
      </div>
      <div>
        <div class="bg-white rounded-full h-28 w-28 md:w-40 md:h-40 flex items-center justify-center">
          <img v-if="partida1e2.status === 'encerrada'" :src="vencedor(partida1e2).imagem" :alt="vencedor(partida1e2).nome" class="h-12 w-12 md:w-16 md:h-16 object-contain" />
          <img v-if="partida1e2.status !== 'encerrada'" :src="partida1e2.equipe1.imagem" :alt="partida1e2.equipe1.nome" class="h-12 w-12 md:w-16 md:h-16 object-contain" />
          <img v-if="partida1e2.status !== 'encerrada'" :src="partida1e2.equipe2.imagem" :alt="partida1e2.equipe2.nome" class="h-12 w-12 md:w-16 md:h-16 object-contain" />
        </div>
        <div class="text-center text-6xl m-1 h-20">1º</div>
      </div>
      <div>
        <div class="bg-white rounded-full h-28 w-28 md:w-40 md:h-40 flex items-center justify-center">
          <img v-if="partida3e4.status === 'encerrada'" :src="vencedor(partida3e4).imagem" :alt="vencedor(partida3e4).nome" class="h-12 w-12 md:w-16 md:h-16 object-contain" />
          <img v-if="partida3e4.status !== 'encerrada'" :src="partida3e4.equipe1.imagem" :alt="partida3e4.equipe1.nome" class="h-12 w-12 md:w-16 md:h-16 object-contain" />
          <img v-if="partida3e4.status !== 'encerrada'" :src="partida3e4.equipe2.imagem" :alt="partida3e4.equipe2.nome" class="h-12 w-12 md:w-16 md:h-16 object-contain" />
        </div>
        <div class="text-center text-2xl m-1">3º</div>
      </div>
    </div>
  </div>
</template>