<script setup lang="ts">
const supabase = useSupabaseClient()
const { data: campeonato } = await supabase.from('campeonatos')
  .select('id, nome, ano')
  .order('id', { ascending: false })
  .limit(1)
  .maybeSingle()
</script>

<template>
  <Box id="patrocinadores" title="Patrocinadores">
    <div class="grid lg:grid-cols-2 gap-6 p-6">
      <img class="w-full rounded-xl" :src="`/patrocinadores/${campeonato.ano}/1.jpg`" alt="" />
      <div class="flex flex-col gap-6 justify-center items-center">
        <img class="rounded-xl" :src="`/patrocinadores/${campeonato.ano}/2.jpg`" alt="" />
        <div class="flex justify-between gap-6">
          <img class="max-w-24 rounded-xl" :src="`/patrocinadores/${campeonato.ano}/3.jpg`" alt="" />
          <img class="max-w-24 rounded-xl" :src="`/patrocinadores/${campeonato.ano}/4.jpg`" alt="" />
        </div>
      </div>
    </div>
  </Box>
</template>