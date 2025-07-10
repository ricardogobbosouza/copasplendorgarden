<script setup lang="ts">
const supabase = useSupabaseClient()
const { data: campeonato } = await supabase.from('campeonatos')
  .select('id, nome, ano')
  .order('id', { ascending: false })
  .limit(1)
  .maybeSingle()
</script>

<template>
  <Box id="premiacao" title="Premiação">
    <div class="grid lg:grid-cols-2 gap-6 p-6">
      <div class="flex flex-col items-center justify-center gap-2">
        <img class="w-48 rounded-xl" :src="`/premiacao/${campeonato.ano}/campeao.jpeg`" alt="Melhor Goleiro" />
        <span class="text-lg">Campeão</span>
      </div>
      <div class="flex flex-col items-center justify-center gap-2">
        <img class="w-48 rounded-xl" :src="`/premiacao/${campeonato.ano}/vice-campeao.jpeg`" alt="Melhor Goleiro" />
        <span class="text-lg">Vice-Campeão</span>
      </div>
    </div>
    <div class="grid lg:grid-cols-3 gap-6 p-6">
      <div class="flex flex-col items-center justify-center gap-2">
        <img class="w-48 rounded-xl" :src="`/premiacao/${campeonato.ano}/melhor-goleiro.jpeg`" alt="Melhor Goleiro" />
        <span class="text-lg">Melhor Goleiro</span>
      </div>
      <div class="flex flex-col items-center justify-center gap-2">
        <img class="w-48 rounded-xl" :src="`/premiacao/${campeonato.ano}/melhor-jogador.jpeg`" alt="Melhor Jogador" />
        <span class="text-lg">Melhor Jogador</span>
      </div>
      <div class="flex flex-col items-center justify-center gap-2">
        <img class="w-48 rounded-xl" :src="`/premiacao/${campeonato.ano}/craque-da-galera.jpeg`" alt="Craque da Galera" />
        <span class="text-lg">Craque da Galera</span>
      </div>
    </div>
  </Box>
</template>