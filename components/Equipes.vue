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
</script>

<template>
  <Box id="equipes" title="Equipes">
    <div class="grid md:grid-cols-2 gap-10 p-6">
      <div v-for="equipe in equipes" :key="equipe.id" class="flex items-center gap-2">
        <img class="w-12 h-12 object-contain" :src="equipe.imagem" />
        <span>{{ equipe.nome }}</span>
      </div>
    </div>
  </Box>
</template>