<script setup lang="ts">
const form = reactive({
    nome: null,
    telefone: null,
    apartamento: null,
    foto: null,
    posicao: null,
    tamanho: 'M',
    nome_camisa: null,
    numero_camisa: null,
    premiacao: 'completo',
    uniforme: 'completo',
    arbitragem: 'completo',
})
</script>

<template>
    <Logo />
    <Box title="Inscreva-se">
        <div class="p-4">
            <label class="block mb-6">
                <span class="block mb-2 font-semibold">Nome e sobrenome</span>
                <input v-model="form.nome" placeholder="Digite seu nome e sobrenome" type="text" name="nome" class="border rounded border-gray-300 px-3 py-4 w-full block uppercase placeholder:normal-case" />
            </label>
            <div class="grid md:grid-cols-2 gap-x-6">
                <label class="block mb-6">
                    <span class="block mb-2 font-semibold">Telefone</span>
                    <input v-model="form.telefone" placeholder="Digite seu telefone" type="text" name="telefone" class="border rounded border-gray-300 px-3 py-4 w-full block" />
                </label>
                <label class="block mb-6">
                    <span class="block mb-2 font-semibold">Apartamento</span>
                    <input v-model="form.apartamento" placeholder="Digite o número do seu apartamento" type="text" name="apartamento" class="border rounded border-gray-300 px-3 py-4 w-full block" />
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
                    <select v-model="form.posicao" name="posicao" class="border rounded border-gray-300 px-3 py-4 w-full block">
                        <option>Selecione sua posição</option>
                        <option value="Atacante">Atacante</option>
                        <option value="Meio campo">Meio campo</option>
                        <option value="Zagueiro">Zagueiro</option>
                    </select>
                </label>
                <label class="block mb-6">
                    <span class="block mb-2 font-semibold">Tamanho do uniforme</span>
                    <select v-model="form.tamanho" name="tamanho" class="border rounded border-gray-300 px-3 py-4 w-full block">
                        <option value="P">P</option>
                        <option value="M">M</option>
                        <option value="G">G</option>
                        <option value="GG">GG</option>
                        <option value="XG">XG</option>
                    </select>
                </label>
                <label class="block mb-6">
                    <span class="block mb-2 font-semibold">Nome na camisa</span>
                    <input v-model="form.nome_camisa" type="text" name="nome_camisa" class="border rounded border-gray-300 px-3 py-4 w-full block" />
                </label>
                <label class="block mb-6">
                    <span class="block mb-2 font-semibold">Número na camisa</span>
                    <input v-model="form.numero_camisa" type="number" min="1" max="99" maxlength="2" name="numero_camisa" class="border rounded border-gray-300 px-3 py-4 w-full block" />
                </label>
            </div>
        </div>
    </Box>
    <Box title="Preferências">
        <div class="p-4">
            <p class="mb-6">
                Selecione suas preferências abaixo. 
                Gostaríamos de conhecer suas preferências para definir a taxa de inscrição mais adequada para todos.
            </p>

            <div class="block mb-6">
                <span class="block mb-2 font-semibold">Premiação</span>
                <label class="flex items-center gap-2 mb-2">
                    <input v-model="form.premiacao" type="radio" value="completo" name="premiacao" class="border rounded border-gray-300 scale-125" />
                    <span>Medalhas e troféus</span>
                </label>
                <label class="flex items-center gap-2 mb-2">
                    <input v-model="form.premiacao" type="radio" value="simples" name="premiacao" class="border rounded border-gray-300 scale-125" />
                    <span>Somente medalhas</span>
                </label>
            </div>

            <div class="block mb-6">
                <span class="block mb-2 font-semibold">Uniforme</span>
                <label class="flex items-center gap-2 mb-2">
                    <input v-model="form.uniforme" type="radio" value="completo" name="uniforme" class="border rounded border-gray-300 scale-125" />
                    <span>Camisa, shorts e meião</span>
                </label>
                <label class="flex items-center gap-2 mb-2">
                    <input v-model="form.uniforme" type="radio" value="simples" name="uniforme" class="border rounded border-gray-300 scale-125" />
                    <span>Somente camisa</span>
                </label>
            </div>

            <div class="block mb-6">
                <span class="block mb-2 font-semibold">Arbitragem</span>
                <label class="flex items-center gap-2 mb-2">
                    <input v-model="form.arbitragem" type="radio" value="completo" name="arbitragem" class="border rounded border-gray-300 scale-125" />
                    <span>2 juízes por jogo</span>
                </label>
                <label class="flex items-center gap-2 mb-2">
                    <input v-model="form.arbitragem" type="radio" value="simples" name="arbitragem" class="border rounded border-gray-300 scale-125" />
                    <span>1 juiz por jogo</span>
                </label>
            </div>
        </div>
    </Box>
    <button type="button" class="block w-full bg-blue-500 text-white px-3 py-4 rounded text-lg hover:opacity-90 shadow">
        Enviar
    </button>
    <Patrocinadores />
</template>