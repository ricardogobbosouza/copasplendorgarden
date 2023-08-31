<template>
  <Box title="Equipes">
    <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-10 p-6">
      <div v-for="i in 6" class="flex items-center justify-center gap-2">
        <Icon name="ic:person" class="w-10 h-10" />
        <span>Equipe A</span>
      </div>
    </div>
  </Box>
</template>