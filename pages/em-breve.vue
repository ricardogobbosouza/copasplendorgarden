<script setup lang="ts">
const supabase = useSupabaseClient()
const { data: campeonato } = await supabase.from('campeonatos')
  .select('id, nome, status')
  .order('id', { ascending: false })
  .limit(1)
  .maybeSingle()

if (campeonato.status !== 'em-breve') {
  await navigateTo('/')
}
</script>

<template>
  <Logo />
  <Box class="text-center">
    Em breve
  </Box>
</template>