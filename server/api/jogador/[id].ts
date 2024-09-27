import type { SupabaseClient } from '@supabase/supabase-js'
import { serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
  const supabase = await serverSupabaseClient(event)
  const id = getRouterParam(event, 'id')
  const foto = await cachedJogagdorFoto(supabase, id).catch(() => '')

  return foto
})

export const cachedJogagdorFoto = defineCachedFunction(async (supabase: SupabaseClient, id?: string) => {
  const { data } = await supabase.from('jogadores')
    .select('id, foto')
    .eq('id', id)
    .limit(1)
    .maybeSingle()
  
  return data.foto
}, {
  maxAge: 60 * 60 * 24,
  name: 'jogagdorFoto',
  getKey: (id: string) => id
})