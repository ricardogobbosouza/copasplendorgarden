<script setup lang="ts">
const supabase = useSupabaseClient()
const { data: campeonato } = await supabase.from('campeonatos')
  .select('id, nome, ano')
  .order('id', { ascending: false })
  .limit(1)
  .maybeSingle()

const showElement = ref(true)

onMounted(() => {
  setTimeout(() => {
    showElement.value = false
  }, 10000)
})
</script>

<template>
  <Box id="patrocinadores" title="Patrocinadores">
    <div class="grid gap-6 p-6">
        <img class="col-span-2 object-cover w-full rounded-xl" :src="`/patrocinadores/${campeonato.ano}/1.jpg`" alt="" />
        <img class="row-span-2 object-cover w-full h-full rounded-xl" :src="`/patrocinadores/${campeonato.ano}/2.jpg`" alt="" />
        <img class="object-cover w-full h-40 rounded-xl" :src="`/patrocinadores/${campeonato.ano}/3.jpg`" alt="" />
        <img class="object-cover w-full h-40 rrounded-xl" :src="`/patrocinadores/${campeonato.ano}/4.jpg`" alt="" />
      </div>
  </Box>

  <div class="fixed inset-0 z-10 flex items-center justify-center" v-if="showElement">
    <div class="absolute inset-0 bg-black opacity-100"></div>
    <div class="relative z-20 m-4">
      <Box title="Patrocinadores">
        <div class="flex flex-col gap-6 p-6 items-center">
          <img class="object-contain h-48 rounded-xl" :src="`/patrocinadores/${campeonato.ano}/1.jpg`" alt="" />
          <img class="object-contain h-28 rounded-xl" :src="`/patrocinadores/${campeonato.ano}/2.jpg`" alt="" />
          <img class="object-contain h-20 rounded-xl" :src="`/patrocinadores/${campeonato.ano}/3.jpg`" alt="" />
          <img class="object-contain h-20 rounded-xl" :src="`/patrocinadores/${campeonato.ano}/4.jpg`" alt="" />
        </div>
      </Box>
    </div>
  </div>
</template>