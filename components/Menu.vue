<template>
  <ul class="flex divide-x divide-zinc-700 items-center justify-center">
    <li>
      <a class="text-center font-light hover:underline tracking-widest px-2 lg:px-6 py-2 flex flex-col lg:flex-row items-center gap-2" href="#partidas">
        <Icon name="emojione-monotone:soccer-ball" />
        <span class="text-xs lg:text-base">Partidas</span>
      </a>
    </li>
    <li>
      <a class="text-center font-light hover:underline tracking-widest px-2 lg:px-6 py-2 flex flex-col lg:flex-row items-center gap-2" href="#classificacao">
        <Icon name="ic:outline-format-list-numbered" />
        <span class="text-xs lg:text-base">Classificação</span>
      </a>
    </li>
    <li>
      <a class="text-center font-light hover:underline tracking-widest px-2 lg:px-6 py-2 flex flex-col lg:flex-row items-center gap-2" href="#equipes">
        <Icon name="fluent:people-team-16-regular" />
        <span class="text-xs lg:text-base">Equipes</span>
      </a>
    </li>
    <li>
      <a class="text-center font-light hover:underline tracking-widest px-2 lg:px-6 py-2 flex flex-col lg:flex-row items-center gap-2" href="#jogadores">
        <Icon name="ic:person-outline" />
        <span class="text-xs lg:text-base">Jogadores</span>
      </a>
    </li>
    <li class="hidden lg:block">
      <a class="text-center font-light hover:underline tracking-widest px-2 lg:px-6 py-2 flex flex-col lg:flex-row items-center gap-2" href="#patrocinadores">
        <Icon name="material-symbols:attach-money-rounded" />
        <span class="text-xs lg:text-base">Patrocinadores</span>
      </a>
    </li>
  </ul>
</template>