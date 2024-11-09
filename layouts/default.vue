<script lang="ts" setup>
const supabase = useSupabaseClient()
const { data: campeonato } = await supabase.from('campeonatos')
  .select('id, nome')
  .order('id', { ascending: false })
  .limit(1)
  .maybeSingle()

useHead({
  title: campeonato.nome,
  link: [
    { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
  ]
})
</script>

<template>
  <div class="bg-zinc-700 min-h-screen bg-no-repeat bg-cover bg-fixed bg-[url(/bg.jpg)]">
    <div class="w-full h-full bg-black/30 p-4 md:p-6 lg:p-10 min-h-screen">
      <div class="container mx-auto max-w-3xl text-white">
        <slot />
      </div>
    </div>
  </div>
</template>