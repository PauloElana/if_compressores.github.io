// Configuração do Supabase
const SUPABASE_URL = "https://sjaqdhchefiwcmswyrit.supabase.co";

// ⚠️ Use a chave ANON PUBLIC do painel Supabase (Settings → API → Project API keys → anon public)
// Essa é a chave que você colou anteriormente (eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...)
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
const BUCKET_PADRAO = "if-manutencoes"; // nome do bucket exatamente como está no painel

// Inicializa o cliente Supabase
const db = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
window.db = db;

// Função para upload da imagem e retorno da URL pública
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
