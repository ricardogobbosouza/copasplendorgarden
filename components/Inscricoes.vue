<script lang="ts" setup>
const supabase = useSupabaseClient()
const { data: campeonato } = await supabase.from('campeonatos')
  .select('id, nome, status')
  .order('id', { ascending: false })
  .limit(1)
  .maybeSingle()

const { data: inscricoes } = await supabase.from('jogadores')
  .select('id, nome, posicao, numero')
  .order('nome', { ascending: true })
  .neq('posicao', 'Goleiro')
  .eq('campeonato', campeonato.id)
</script>

<template>
  <Box id="inscricioes" :title="`Inscrições - Total: ${inscricoes.length}`">
    <div class="divide-y">
      <div
        v-for="inscricao in inscricoes"
        :key="inscricao.id"
        class="flex items-center gap-2 p-4"
      >
        <div class="flex-1 flex items-center gap-4">
          <Foto
            class="w-12 h-12 object-contain"
            :id="inscricao.id"
          />
          <div class="flex flex-col">
            <span class="uppercase">{{ inscricao.nome }}</span>
            <span class="text-sm">Posição: {{ inscricao.posicao }}</span>
            <span class="text-sm">Número: {{ inscricao.numero }}</span>
          </div>
        </div>
      </div>
    </div>
  </Box>
</template>