<script lang="ts" setup>
const supabase = useSupabaseClient()
const { data: campeonato } = await supabase.from('campeonatos')
  .select('id, nome, titulo')
  .order('id', { ascending: false })
  .limit(1)
  .maybeSingle()
</script>

<template>
  <div class="py-16 space-y-4">
    <h1 class="text-center text-3xl md:text-4xl lg:text-5xl text-white italic gap-4 flex flex-col lg:flex-row items-center justify-center">
      <Icon name="fxemoji:trophy" class="w-16 h-16" />
      <span>{{ campeonato.nome }}</span>
    </h1>
    <h2 class="text-center text-xl md:text-2xl lg:text-3xl text-white italic font-thin gap-4 flex flex-col lg:flex-row items-center justify-center">
      {{ campeonato.titulo }}
    </h2>
  </div>
</template>