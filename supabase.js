const SUPABASE_URL = "https://sjaqdhchefiwcmswyrit.supabase.co";
// ⚠️ Certifique-se de usar a chave ANON correta do painel Supabase (Settings → API → Project API keys → anon)
const SUPABASE_ANON_KEY = "sb_publishable_sS0G0QoH5bvuwqxMUZrP3w_fkUCfbqE";
const BUCKET_PADRAO = "if_manutencoes";

// Inicializa o cliente Supabase
const db = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
window.db = db;

// Upload da imagem e retorno da URL pública
async function uploadImagemEquipamento(file) {
  if (!file) return null;

  const timestamp = Date.now();
  const nomeArquivo = `equipamentos/${timestamp}_${file.name}`;

  // Faz upload para o bucket
  const { data, error } = await db.storage
    .from(BUCKET_PADRAO)
    .upload(nomeArquivo, file);

  if (error) {
    console.error("Erro no upload:", error.message);
    return null;
  }

  // Gera URL pública
  const { data: urlData } = db.storage
    .from(BUCKET_PADRAO)
    .getPublicUrl(nomeArquivo);

  return urlData.publicUrl;
}
