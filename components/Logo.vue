<script lang="ts" setup>
const supabase = useSupabaseClient()
const { data: campeonato } = await supabase.from('campeonatos')
  .select('id, nome')
  .order('id', { ascending: false })
  .limit(1)
  .maybeSingle()
</script>

<template>
  <h1 class="text-center text-3xl md:text-4xl lg:text-5xl py-16 text-white italic gap-4 flex flex-col lg:flex-row items-center">
    <Icon name="fxemoji:trophy" class="w-16 h-16" />
    <span>{{ campeonato.nome }}</span>
  </h1>
</template>