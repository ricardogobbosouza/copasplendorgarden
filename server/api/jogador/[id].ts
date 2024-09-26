import { serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
  const supabase = await serverSupabaseClient(event)

  const { data } = await supabase.from('jogadores')
    .select('id, foto')
    .eq('id', getRouterParam(event, 'id'))
    .limit(1)
    .maybeSingle()
  
  if (data) {
    return data.foto
  }
})