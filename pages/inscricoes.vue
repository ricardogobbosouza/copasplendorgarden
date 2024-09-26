<script setup lang="ts">
const supabase = useSupabaseClient()
const { data: campeonato } = await supabase.from('campeonatos')
  .select('id, nome, status')
  .order('id', { ascending: false })
  .limit(1)
  .maybeSingle()

if (campeonato.status !== 'inscricoes') {
  await navigateTo('/')
}
</script>

<template>
  <Inscricoes />
</template>