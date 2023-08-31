<template>
  <Box title="Classificação">
    <table class="w-full">
      <thead>
        <tr>
          <th class="px-4 py-3 bg-zinc-100 text-left font-semibold">Equipes</th>
          <th class="px-4 py-3 bg-zinc-100 text-center font-semibold">Pts</th>
          <th class="px-4 py-3 bg-zinc-100 text-center font-semibold">PJ</th>
          <th class="px-4 py-3 bg-zinc-100 text-center font-semibold">VIT</th>
          <th class="px-4 py-3 bg-zinc-100 text-center font-semibold">E</th>
          <th class="px-4 py-3 bg-zinc-100 text-center font-semibold">DER</th>
          <th class="px-4 py-3 bg-zinc-100 text-center font-semibold">GM</th>
          <th class="px-4 py-3 bg-zinc-100 text-center font-semibold">GC</th>
          <th class="px-4 py-3 bg-zinc-100 text-center font-semibold">SG</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="i in 6">
          <td class="px-4 py-3">Equipe</td>
          <td class="px-4 py-3 text-center">10</td>
          <td class="px-4 py-3 text-center">21</td>
          <td class="px-4 py-3 text-center">16</td>
          <td class="px-4 py-3 text-center">3</td>
          <td class="px-4 py-3 text-center">2</td>
          <td class="px-4 py-3 text-center">10</td>
          <td class="px-4 py-3 text-center">5</td>
          <td class="px-4 py-3 text-center">5</td>
        </tr>
      </tbody>
    </table>
  </Box>
</template>