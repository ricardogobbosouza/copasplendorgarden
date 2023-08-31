<template>
  <Box title="Jogadores">
    <div class="divide-y">
      <div v-for="i in 10" class="flex items-center justify-between gap-2 p-4">
        <div class="flex items-center gap-2">
          <Icon name="ic:person" class="w-10 h-10" />
          <div class="flex flex-col">
            <span class="uppercase">Jogador A</span>
            <span class="text-sm">Posição: Atacante</span>
            <span class="text-sm">Equipe: Atacante</span>
          </div>
        </div>
        <div class="flex gap-2 items-center">
          <Icon name="emojione-monotone:soccer-ball" class="w-6 h-6" />
          <span class="text-lg font-semi-bold">10</span>
        </div>
      </div>
    </div>
  </Box>
</template>