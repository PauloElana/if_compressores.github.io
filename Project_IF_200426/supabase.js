/**
 * supabase-melhorado.js
 * Cliente Supabase com funcionalidades robustas de upload de imagens
 * ✅ CORRIGIDO: URLs públicas funcionam corretamente
 */

const SUPABASE_URL = "https://sjaqdhchefiwcmswyrit.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNqYXFkaGNoZWZpd2Ntc3d5cml0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzEwMzA3MDgsImV4cCI6MjA4NjYwNjcwOH0.GIrYgBe1pzdTArkREayXTCRFEHmGwBWctu6uaWiNC9o";
const BUCKET_PADRAO = "if-manutencoes";

const db = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
window.db = db;

/**
 * Construir URL pública correta do Supabase
 * @param {string} caminhoArquivo - Caminho relativo do arquivo
 * @param {string} bucket - Nome do bucket
 * @returns {string} - URL pública completa
 */
function construirUrlPublica(caminhoArquivo, bucket = BUCKET_PADRAO) {
  return `${SUPABASE_URL}/storage/v1/object/public/${bucket}/${caminhoArquivo}`;
}

/**
 * Upload de imagem otimizado para Supabase
 * @param {File} file - Arquivo de imagem
 * @param {string} bucket - Nome do bucket (padrão: "if-manutencoes")
 * @param {string} pasta - Pasta dentro do bucket (padrão: "equipamentos")
 * @returns {Promise<string|null>} - URL pública da imagem ou null se erro
 */
async function uploadImagemEquipamento(file, bucket = BUCKET_PADRAO, pasta = "equipamentos") {
  try {
    if (!file) {
      console.warn("❌ Nenhum arquivo fornecido");
      return null;
    }

    // Validar tipo de arquivo
    if (!file.type.startsWith("image/")) {
      console.warn("❌ Arquivo não é uma imagem");
      return null;
    }

    // Otimizar imagem antes do upload
    const imagemOtimizada = await otimizarImagem(file);
    
    // Gerar nome único para o arquivo
    const timestamp = Date.now();
    const random = Math.random().toString(36).substr(2, 9);
    const nomeArquivo = `${pasta}/${timestamp}_${random}.jpg`;

    console.log("📤 Iniciando upload:", nomeArquivo);

    // Fazer upload
    const { data: uploadData, error: uploadError } = await db.storage
      .from(bucket)
      .upload(nomeArquivo, imagemOtimizada, {
        cacheControl: "3600",
        upsert: false
      });

    if (uploadError) {
      console.error("❌ Erro no upload:", uploadError.message);
      return null;
    }

    // Construir URL pública corretamente
    const publicUrl = construirUrlPublica(uploadData.path, bucket);
    console.log("✅ Imagem enviada com sucesso:", publicUrl);
    
    return publicUrl;

  } catch (error) {
    console.error("❌ Erro ao fazer upload:", error.message);
    return null;
  }
}

/**
 * Upload de imagem de manutenção
 * @param {File} file - Arquivo de imagem
 * @returns {Promise<string|null>} - URL pública da imagem
 */
async function uploadImagemManutencao(file) {
  return uploadImagemEquipamento(file, BUCKET_PADRAO, "manutencoes");
}

/**
 * Otimização de imagem (redimensionamento e compressão)
 * @param {File} file - Arquivo original
 * @param {number} maxWidth - Largura máxima em pixels (padrão: 1200)
 * @param {number} quality - Qualidade JPEG de 0 a 1 (padrão: 0.8)
 * @returns {Promise<File>} - Arquivo otimizado
 */
async function otimizarImagem(file, maxWidth = 1200, quality = 0.8) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (e) => {
      const img = new Image();
      
      img.onload = () => {
        const canvas = document.createElement("canvas");
        let width = img.width;
        let height = img.height;

        // Redimensionar se necessário
        if (width > maxWidth) {
          height = (height * maxWidth) / width;
          width = maxWidth;
        }

        canvas.width = width;
        canvas.height = height;
        
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, width, height);

        canvas.toBlob(
          (blob) => {
            const nomeArquivo = file.name.split(".")[0] + ".jpg";
            const imagemOtimizada = new File([blob], nomeArquivo, {
              type: "image/jpeg",
              lastModified: Date.now()
            });
            resolve(imagemOtimizada);
          },
          "image/jpeg",
          quality
        );
      };

      img.onerror = () => {
        reject(new Error("Erro ao carregar imagem"));
      };

      img.src = e.target.result;
    };

    reader.onerror = () => {
      reject(new Error("Erro ao ler arquivo"));
    };

    reader.readAsDataURL(file);
  });
}

/**
 * Converter arquivo para Base64
 * @param {File} file - Arquivo a converter
 * @returns {Promise<string>} - String Base64
 */
async function converterParaBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(new Error("Erro ao ler arquivo"));
    reader.readAsDataURL(file);
  });
}

/**
 * Deletar imagem do Supabase
 * @param {string} caminhoArquivo - Caminho do arquivo a deletar
 * @param {string} bucket - Nome do bucket (padrão: "if-manutencoes")
 * @returns {Promise<boolean>} - true se deletado, false se erro
 */
async function deletarImagem(caminhoArquivo, bucket = BUCKET_PADRAO) {
  try {
    if (!caminhoArquivo) return false;

    const { error } = await db.storage
      .from(bucket)
      .remove([caminhoArquivo]);

    if (error) {
      console.warn("⚠️ Erro ao deletar imagem:", error.message);
      return false;
    }

    console.log("✅ Imagem deletada:", caminhoArquivo);
    return true;

  } catch (error) {
    console.error("❌ Erro ao deletar:", error.message);
    return false;
  }
}

/**
 * Aplicar melhorias de toque para mobile
 */
function aplicarMelhoriasTouch() {
  const isMobile = window.innerWidth <= 768;
  
  if (isMobile) {
    document.querySelectorAll("button, .btn, input, textarea, select").forEach(el => {
      el.style.minHeight = "48px";
      if (el.tagName === "INPUT" || el.tagName === "TEXTAREA") {
        el.style.fontSize = "16px";
      }
    });

    document.querySelectorAll(".btn, .service-btn").forEach(btn => {
      btn.addEventListener("touchstart", () => {
        btn.style.transform = "scale(0.98)";
      }, { passive: true });
      
      btn.addEventListener("touchend", () => {
        btn.style.transform = "scale(1)";
      }, { passive: true });
    });
  }
}

// Inicializar melhorias de toque
document.addEventListener("DOMContentLoaded", () => {
  aplicarMelhoriasTouch();
  window.addEventListener("resize", aplicarMelhoriasTouch, { passive: true });
});

// Meta viewport
if (!document.querySelector('meta[name="viewport"]')) {
  const meta = document.createElement("meta");
  meta.name = "viewport";
  meta.content = "width=device-width, initial-scale=1, maximum-scale=5, user-scalable=yes";
  document.head.appendChild(meta);
}