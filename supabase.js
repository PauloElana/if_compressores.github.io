const SUPABASE_URL = "https://sjaqdhchefiwcmswyrit.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...";
const BUCKET_PADRAO = "if-manutencoes";

const db = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
window.db = db;

// Upload da imagem e retorno da URL pública
async function uploadImagemEquipamento(file) {
  if (!file) return null;

  const timestamp = Date.now();
  const nomeArquivo = `equipamentos/${timestamp}_${file.name}`;

  const { data, error } = await db.storage
    .from(BUCKET_PADRAO)
    .upload(nomeArquivo, file);

  if (error) {
    console.error("Erro no upload:", error.message);
    return null;
  }

  const { data: urlData } = db.storage
    .from(BUCKET_PADRAO)
    .getPublicUrl(nomeArquivo);

  return urlData.publicUrl;
}
