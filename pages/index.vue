<script setup lang="ts">
const supabase = useSupabaseClient()
const { data: campeonato } = await supabase.from('campeonatos')
  .select('id, nome, status')
  .order('id', { ascending: false })
  .limit(1)
  .maybeSingle()

if (campeonato.status === 'inscricao') {
  await navigateTo('/cadastre-se')
}
</script>

<template>
  <Menu />
  <Logo />
  <Campeao />
  <Partidas />
  <Classificacao />
  <Equipes />
  <Jogadores />
  <Premiacao />
  <FotosVideos />
</template>