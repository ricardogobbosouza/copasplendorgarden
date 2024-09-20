<template>
    <Logo />
    <Box title="Inscreva-se">
        <div class="p-4">
            <label class="block mb-6">
                <span class="block mb-2 font-semibold">Nome e sobrenome</span>
                <input placeholder="Digite seu nome e sobrenome" type="text" name="nome" class="border rounded border-gray-300 px-3 py-4 w-full block uppercase placeholder:normal-case" />
            </label>
            <div class="grid md:grid-cols-2 gap-x-6">
                <label class="block mb-6">
                    <span class="block mb-2 font-semibold">Telefone</span>
                    <input placeholder="Digite seu telefone" type="text" name="telefone" class="border rounded border-gray-300 px-3 py-4 w-full block" />
                </label>
                <label class="block mb-6">
                    <span class="block mb-2 font-semibold">Apartamento</span>
                    <input placeholder="Digite o número do seu apartamento" type="text" name="apartamento" class="border rounded border-gray-300 px-3 py-4 w-full block" />
                </label>
            </div>
            <label class="block mb-6">
                <span class="block mb-2 font-semibold">Foto</span>
                <input type="file" accept="image/*" name="foto" class="border rounded border-gray-300 px-3 py-4 w-full block" />
            </label>
        </div>
    </Box>
    <Box title="Informações para equipe">
        <div class="p-4">
            <div class="grid md:grid-cols-2 gap-x-6">
                <label class="block mb-6">
                    <span class="block mb-2 font-semibold">Posição</span>
                    <select name="posicao" class="border rounded border-gray-300 px-3 py-4 w-full block">
                        <option>Selecione sua posição</option>
                        <option>Atacante</option>
                        <option>Meio campo</option>
                        <option>Zagueiro</option>
                    </select>
                </label>
                <label class="block mb-6">
                    <span class="block mb-2 font-semibold">Tamanho do uniforme</span>
                    <select name="tamanho" class="border rounded border-gray-300 px-3 py-4 w-full block">
                        <option>P</option>
                        <option>M</option>
                        <option>G</option>
                        <option>GG</option>
                    </select>
                </label>
                <label class="block mb-6">
                    <span class="block mb-2 font-semibold">Nome na camisa</span>
                    <input type="text" name="nome_camisa" class="border rounded border-gray-300 px-3 py-4 w-full block" />
                </label>
                <label class="block mb-6">
                    <span class="block mb-2 font-semibold">Número na camisa</span>
                    <input type="number" min="1" max="99" maxlength="2" name="numero_camisa" class="border rounded border-gray-300 px-3 py-4 w-full block" />
                </label>
            </div>
        </div>
    </Box>
    <Box title="Preferências">
        <div class="p-4">
            <p class="mb-6">Selecione suas preferências abaixo. A taxa de inscrição será definida com base na escolha mais votada.</p>

            <div class="block mb-6">
                <span class="block mb-2 font-semibold">Premiação</span>
                <label class="flex items-center gap-2 mb-2">
                    <input type="radio" value="completo" name="premiacao" class="border rounded border-gray-300 scale-125" />
                    <span>Medalhas e troféus (R$ 20,00)</span>
                </label>
                <label class="flex items-center gap-2 mb-2">
                    <input type="radio" value="simples" name="premiacao" class="border rounded border-gray-300 scale-125" />
                    <span>Somente medalhas (R$ 10,00)</span>
                </label>
            </div>

            <div class="block mb-6">
                <span class="block mb-2 font-semibold">Uniforme</span>
                <label class="flex items-center gap-2 mb-2">
                    <input type="radio" value="completo" name="uniforme" class="border rounded border-gray-300 scale-125" />
                    <span>Camisa, shorts e meião (R$ 100,00)</span>
                </label>
                <label class="flex items-center gap-2 mb-2">
                    <input type="radio" value="simples" name="uniforme" class="border rounded border-gray-300 scale-125" />
                    <span>Somente camisa (R$ 50,00)</span>
                </label>
            </div>

            <div class="block mb-6">
                <span class="block mb-2 font-semibold">Arbitragem</span>
                <label class="flex items-center gap-2 mb-2">
                    <input type="radio" value="completo" name="arbitragem" class="border rounded border-gray-300 scale-125" />
                    <span>2 juízes por jogo (R$ 20,00)</span>
                </label>
                <label class="flex items-center gap-2 mb-2">
                    <input type="radio" value="simples" name="arbitragem" class="border rounded border-gray-300 scale-125" />
                    <span>1 juiz por jogo (R$ 10,00)</span>
                </label>
            </div>
        </div>
    </Box>
    <button type="button" class="block w-full bg-blue-500 text-white px-3 py-4 rounded text-lg hover:opacity-90 shadow">
        Enviar
    </button>
    <Patrocinadores />
</template>