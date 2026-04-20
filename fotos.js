/**
 * utils-fotos.js - Upload e Otimização de Imagens
 * CORRIGIDO: Sem referências a funções indefinidas
 */

// ========== CONVERSOR PARA BASE64 ==========
async function converterParaBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(new Error("Erro ao ler arquivo"));
    reader.readAsDataURL(file);
  });
}

// ========== OTIMIZAÇÃO DE IMAGEM ==========
async function otimizarImagem(file) {
  const maxWidth = 1200;
  const quality = 0.8;

  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;

        if (width > maxWidth) {
          height = (height * maxWidth) / width;
          width = maxWidth;
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);

        canvas.toBlob((blob) => {
          resolve(new File([blob], file.name, { type: 'image/jpeg' }));
        }, 'image/jpeg', quality);
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  });
}

// ========== UPLOAD OTIMIZADO ==========
async function uploadOtimizado(db, file, pasta = 'manutencoes') {
  try {
    const imagemPronta = await otimizarImagem(file);
    const timestamp = Date.now();
    const random = Math.random().toString(36).substr(2, 9);
    const nomeArquivo = `${pasta}/${timestamp}_${random}.jpg`;

    const { data, error } = await db.storage
      .from("if-manutencoes")
      .upload(nomeArquivo, imagemPronta);

    if (error) throw error;

    const { data: { publicUrl } } = db.storage
      .from("if-manutencoes")
      .getPublicUrl(data.path);
    return publicUrl;

  } catch (e) {
    console.error('❌ Erro no upload:', e.message);
    return null;
  }
}

// ========== MELHORIAS MOBILE ==========
function aplicarMelhoriasTouch() {
  const isMobile = window.innerWidth <= 768;
  
  if (isMobile) {
    document.querySelectorAll('button, .btn, input, textarea, select').forEach(el => {
      el.style.minHeight = '48px';
      if(el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
        el.style.fontSize = '16px';
      }
    });

    document.querySelectorAll('.btn, .service-btn').forEach(btn => {
      btn.addEventListener('touchstart', () => btn.style.transform = 'scale(0.98)', { passive: true });
      btn.addEventListener('touchend', () => btn.style.transform = 'scale(1)', { passive: true });
    });
  }
}

// ========== INICIALIZAÇÃO ==========
document.addEventListener('DOMContentLoaded', () => {
  aplicarMelhoriasTouch();
  window.addEventListener('resize', aplicarMelhoriasTouch, { passive: true });
});

// Meta viewport
if (!document.querySelector('meta[name="viewport"]')) {
  const meta = document.createElement('meta');
  meta.name = 'viewport';
  meta.content = 'width=device-width, initial-scale=1, maximum-scale=5, user-scalable=yes';
  document.head.appendChild(meta);
}
