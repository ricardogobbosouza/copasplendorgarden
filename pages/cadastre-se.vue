<script setup lang="ts">
const supabase = useSupabaseClient()
const { data: campeonato } = await supabase.from('campeonatos')
  .select('id, nome')
  .order('id', { ascending: false })
  .limit(1)
  .maybeSingle()

const form = reactive({
    nome: null,
    telefone: null,
    apartamento: null,
    foto: null,
    posicao: '',
    tamanho: 'M',
    nome_camisa: null,
    numero: null,
    premiacao: 'completo',
    uniforme: 'completo',
    arbitragem: 'completo',
    festa: 'dentro',
    termos: null
})

const loading = ref(false)
const success = ref(false)

const submit = async () => {
    if (!form.termos) {
        return alert('Selecione os termos.')
    }

    if (!form.foto) {
        return alert('Selecione sua foto.')
    }

    loading.value = true

    try {
        await supabase
            .from('jogadores')
            .insert({
                campeonato: campeonato?.id,
                nome: form.nome,
                telefone: form.telefone,
                apartamento: form.apartamento,
                foto: form.foto,
                posicao: form.posicao,
                tamanho: form.tamanho,
                nome_camisa: form.nome_camisa,
                numero: form.numero,
                premiacao: form.premiacao,
                uniforme: form.uniforme,
                arbitragem: form.arbitragem,
                festa: form.festa
            })
        success.value = true
    } catch (e) {
        alert('Problemas na sua inscrição!')
    } finally {
        loading.value = false
    }
}

const onChangeFoto = (e: Event) => {
    const input = e.target as HTMLInputElement

    if (!input.files || !input.files.length) {
        return
    }

    var reader = new FileReader()
    reader.onload = () => form.foto = reader.result
    reader.readAsDataURL(input.files[0])
}
</script>

<template>
    <Logo />
    <Box v-if="success" title="Inscreva-se">
        <div class="p-4 text-center text-xl">
            Sua inscrição foi efetuada com sucesso!
        </div>
    </Box>
    <form v-else @submit.prevent="submit">
        <Box title="Inscreva-se">
            <div class="p-4">
                <label class="block mb-6">
                    <span class="block mb-2 font-semibold">Nome e sobrenome</span>
                    <input required v-model="form.nome" placeholder="Digite seu nome e sobrenome" type="text" name="nome" class="border rounded border-gray-300 px-3 py-4 w-full block uppercase placeholder:normal-case" />
                </label>
                <div class="grid md:grid-cols-2 gap-x-6">
                    <label class="block mb-6">
                        <span class="block mb-2 font-semibold">Telefone</span>
                        <input required v-model="form.telefone" placeholder="Digite seu telefone" type="text" name="telefone" class="border rounded border-gray-300 px-3 py-4 w-full block" />
                    </label>
                    <label class="block mb-6">
                        <span class="block mb-2 font-semibold">Apartamento</span>
                        <input required v-model="form.apartamento" placeholder="Digite o número do seu apartamento" type="text" name="apartamento" class="border rounded border-gray-300 px-3 py-4 w-full block" />
                    </label>
                </div>
                <label class="block mb-6">
                    <span class="block mb-2 font-semibold">Foto</span>
                    <div class="flex items-center gap-4">
                        <input @change="onChangeFoto" required type="file" accept="image/*" name="foto" class="flex-1 border rounded border-gray-300 px-3 py-4 w-full" />
                        <div class="w-16 text-6xl flex">
                            <img v-if="form.foto" :src="form.foto" class="rounded-lg" />
                            <Icon v-else name="mdi:user" />
                        </div>
                    </div>
                </label>
            </div>
        </Box>
        <Box title="Informações para equipe">
            <div class="p-4">
                <div class="grid md:grid-cols-2 gap-x-6">
                    <label class="block mb-6">
                        <span class="block mb-2 font-semibold">Posição</span>
                        <select required v-model="form.posicao" name="posicao" class="border rounded border-gray-300 px-3 py-4 w-full block">
                            <option value="">Selecione sua posição</option>
                            <option value="Atacante">Atacante</option>
                            <option value="Meio campo">Meio campo</option>
                            <option value="Zagueiro">Zagueiro</option>
                            <option value="Goleiro">Goleiro</option>
                        </select>
                    </label>
                    <label class="block mb-6">
                        <span class="block mb-2 font-semibold">Tamanho do uniforme</span>
                        <select required v-model="form.tamanho" name="tamanho" class="border rounded border-gray-300 px-3 py-4 w-full block">
                            <option value="P">P</option>
                            <option value="M">M</option>
                            <option value="G">G</option>
                            <option value="GG">GG</option>
                            <option value="XG">XG</option>
                        </select>
                    </label>
                    <label class="block mb-6">
                        <span class="block mb-2 font-semibold">Nome na camisa</span>
                        <input required v-model="form.nome_camisa" type="text" name="nome_camisa" class="border rounded border-gray-300 px-3 py-4 w-full block" />
                    </label>
                    <label class="block mb-6">
                        <span class="block mb-2 font-semibold">Número na camisa</span>
                        <input required v-model="form.numero" type="number" min="1" max="99" maxlength="2" name="numero" class="border rounded border-gray-300 px-3 py-4 w-full block" />
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
                        <input required v-model="form.premiacao" type="radio" value="completo" name="premiacao" class="border rounded border-gray-300 scale-125" />
                        <span>Medalhas e troféus</span>
                    </label>
                    <label class="flex items-center gap-2 mb-2">
                        <input required v-model="form.premiacao" type="radio" value="simples" name="premiacao" class="border rounded border-gray-300 scale-125" />
                        <span>Somente medalhas</span>
                    </label>
                </div>

                <div class="block mb-6">
                    <span class="block mb-2 font-semibold">Uniforme</span>
                    <label class="flex items-center gap-2 mb-2">
                        <input required v-model="form.uniforme" type="radio" value="completo" name="uniforme" class="border rounded border-gray-300 scale-125" />
                        <span>Camisa, shorts e meião</span>
                    </label>
                    <label class="flex items-center gap-2 mb-2">
                        <input required v-model="form.uniforme" type="radio" value="simples" name="uniforme" class="border rounded border-gray-300 scale-125" />
                        <span>Somente camisa</span>
                    </label>
                </div>

                <div class="block mb-6">
                    <span class="block mb-2 font-semibold">Arbitragem</span>
                    <label class="flex items-center gap-2 mb-2">
                        <input required v-model="form.arbitragem" type="radio" value="completo" name="arbitragem" class="border rounded border-gray-300 scale-125" />
                        <span>2 juízes por jogo</span>
                    </label>
                    <label class="flex items-center gap-2 mb-2">
                        <input required v-model="form.arbitragem" type="radio" value="simples" name="arbitragem" class="border rounded border-gray-300 scale-125" />
                        <span>1 juiz por jogo</span>
                    </label>
                </div>

                <div class="block mb-6">
                    <span class="block mb-2 font-semibold">Festa</span>
                    <label class="flex items-center gap-2 mb-2">
                        <input required v-model="form.festa" type="radio" value="dentro" name="festa" class="border rounded border-gray-300 scale-125" />
                        <span>No condomínio</span>
                    </label>
                    <label class="flex items-center gap-2 mb-2">
                        <input required v-model="form.festa" type="radio" value="fora" name="festa" class="border rounded border-gray-300 scale-125" />
                        <span>Fora do condomínio (Chácara)</span>
                    </label>
                    <label class="flex items-center gap-2 mb-2">
                        <input required v-model="form.festa" type="radio" value="bar" name="festa" class="border rounded border-gray-300 scale-125" />
                        <span>Barzinho (Quintal de Jorge)</span>
                    </label>
                    <label class="flex items-center gap-2 mb-2">
                        <input required v-model="form.festa" type="radio" value="sem" name="festa" class="border rounded border-gray-300 scale-125" />
                        <span>Sem festa</span>
                    </label>
                </div>
            </div>
        </Box>
        <Box>
            <div class="p-4">
                <label class="flex items-center gap-2 mb-4">
                    <input required v-model="form.termos" type="checkbox" value="1" name="termos" class="border rounded border-gray-300 scale-125" />
                    <span>
                        Li e aceito o termos descritos no 
                        <a class="text-blue-500 underline" target="_blank" href="/regulamento-6-copasplendorgarden.pdf">regulamento</a>
                    </span>
                </label>

                <button 
                    v-if="!loading"
                    :disabled="!form.termos"
                    type="submit" 
                    class="w-full bg-blue-500 text-white px-3 py-4 rounded text-lg shadow flex items-center justify-center gap-2 hover:opacity-90 disabled:cursor-not-allowed disabled:bg-gray-400"
                >
                    <Icon name="mdi:check" />
                    Enviar
                </button>
                <span 
                    v-else
                    class="w-full bg-blue-500 text-white px-3 py-4 rounded text-lg shadow flex items-center justify-center gap-2"
                >
                    <Icon name="mdi:loading" class="animate-spin" />
                    Enviando...
                </span>
            </div>
        </Box>
    </form>
    <Patrocinadores />
</template>