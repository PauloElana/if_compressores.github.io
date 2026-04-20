/**
 * snippets.js - Códigos Reutilizáveis e Exemplos
 * Copie e adapte conforme necessário
 */

// ========== PADRÕES DE REQUISIÇÃO ==========

// Requisição GET simples
async function buscarDados(tabela) {
  const { data, error } = await window.db.from(tabela).select("*");
  if (error) {
    console.error("Erro ao buscar:", error);
    return null;
  }
  return data;
}

// Requisição com filtro
async function buscarComFiltro(tabela, campo, valor) {
  const { data, error } = await window.db
    .from(tabela)
    .select("*")
    .eq(campo, valor);
  if (error) throw error;
  return data;
}

// Requisição com paginação
async function buscarComPaginacao(tabela, pagina = 1, paginaSize = 10) {
  const inicio = (pagina - 1) * paginaSize;
  const { data, error } = await window.db
    .from(tabela)
    .select("*")
    .range(inicio, inicio + paginaSize - 1);
  if (error) throw error;
  return data;
}

// Requisição com ordenação
async function buscarOrdenado(tabela, campo, ascendente = true) {
  const { data, error } = await window.db
    .from(tabela)
    .select("*")
    .order(campo, { ascending: ascendente });
  if (error) throw error;
  return data;
}

// Contar registros
async function contarRegistros(tabela) {
  const { count, error } = await window.db
    .from(tabela)
    .select("*", { count: "exact", head: true });
  if (error) throw error;
  return count;
}

// ========== PADRÕES DE INSERT ==========

// Insert simples
async function inserirDados(tabela, dados) {
  const { error } = await window.db.from(tabela).insert([dados]);
  if (error) throw error;
  return true;
}

// Insert múltiplo
async function inserirMultiplo(tabela, dados) {
  const { error } = await window.db.from(tabela).insert(dados);
  if (error) throw error;
  return true;
}

// Insert com retorno
async function inserirComRetorno(tabela, dados) {
  const { data, error } = await window.db
    .from(tabela)
    .insert([dados])
    .select();
  if (error) throw error;
  return data[0];
}

// ========== PADRÕES DE UPDATE ==========

// Update simples
async function atualizarDados(tabela, id, dados) {
  const { error } = await window.db
    .from(tabela)
    .update(dados)
    .eq("id", id);
  if (error) throw error;
  return true;
}

// Update condicional
async function atualizarComCondicao(tabela, campo, valor, dados) {
  const { error } = await window.db
    .from(tabela)
    .update(dados)
    .eq(campo, valor);
  if (error) throw error;
  return true;
}

// ========== PADRÕES DE DELETE ==========

// Delete por ID
async function deletarPorID(tabela, id) {
  const { error } = await window.db
    .from(tabela)
    .delete()
    .eq("id", id);
  if (error) throw error;
  return true;
}

// Delete condicional
async function deletarComCondicao(tabela, campo, valor) {
  const { error } = await window.db
    .from(tabela)
    .delete()
    .eq(campo, valor);
  if (error) throw error;
  return true;
}

// ========== PADRÕES DE AUTENTICAÇÃO ==========

// Login
async function fazerLogin(email, senha) {
  const { data, error } = await window.db.auth.signInWithPassword({
    email: email,
    password: senha
  });
  if (error) throw error;
  return data;
}

// Logout
async function sair() {
  const { error } = await window.db.auth.signOut();
  if (error) throw error;
  window.location.href = "login.html";
}

// Registrar
async function registrarNovaContا(email, senha) {
  const { data, error } = await window.db.auth.signUp({
    email: email,
    password: senha
  });
  if (error) throw error;
  return data;
}

// Obter usuário atual
async function obterUsuarioAtual() {
  const { data } = await window.db.auth.getUser();
  return data.user;
}

// Reset de senha
async function resetarSenha(email) {
  const { error } = await window.db.auth.resetPasswordForEmail(email);
  if (error) throw error;
  return true;
}

// ========== PADRÕES DE UPLOAD ==========

// Upload simples
async function fazerUpload(bucket, caminhoArquivo, arquivo) {
  const { data, error } = await window.db.storage
    .from(bucket)
    .upload(caminhoArquivo, arquivo);
  if (error) throw error;
  return data;
}

// Upload com sobrescrita
async function fazerUploadSobrescrita(bucket, caminho, arquivo) {
  const { data, error } = await window.db.storage
    .from(bucket)
    .upload(caminho, arquivo, { upsert: true });
  if (error) throw error;
  return data;
}

// Obter URL pública
async function obterURLPublica(bucket, caminho) {
  const { data } = window.db.storage.from(bucket).getPublicUrl(caminho);
  return data.publicUrl;
}

// Download arquivo
async function baixarArquivo(bucket, caminho) {
  const { data, error } = await window.db.storage
    .from(bucket)
    .download(caminho);
  if (error) throw error;
  return data;
}

// Deletar arquivo
async function deletarArquivo(bucket, caminho) {
  const { error } = await window.db.storage.from(bucket).remove([caminho]);
  if (error) throw error;
  return true;
}

// ========== PADRÕES DE MANIPULAÇÃO DOM ==========

// Obter elemento com fallback
function obterElemento(id) {
  const el = document.getElementById(id);
  if (!el) console.warn(`Elemento #${id} não encontrado`);
  return el;
}

// Definir classes
function adicionarClasse(el, classe) {
  if (el) el.classList.add(classe);
}

function removerClasse(el, classe) {
  if (el) el.classList.remove(classe);
}

function alterniarClasse(el, classe) {
  if (el) el.classList.toggle(classe);
}

// Limpar conteúdo
function limparElemento(id) {
  const el = obterElemento(id);
  if (el) el.innerHTML = "";
}

// Inserir HTML
function inserirHTML(id, html) {
  const el = obterElemento(id);
  if (el) el.innerHTML = html;
}

// Obter valor de input
function obterValor(id) {
  const el = obterElemento(id);
  return el ? el.value : null;
}

// Definir valor de input
function definirValor(id, valor) {
  const el = obterElemento(id);
  if (el) el.value = valor;
}

// Mostrar/ocultar elemento
function mostrarElemento(id) {
  const el = obterElemento(id);
  if (el) el.style.display = "block";
}

function ocultarElemento(id) {
  const el = obterElemento(id);
  if (el) el.style.display = "none";
}

// ========== PADRÕES DE EVENTOS ==========

// Event listener com tratamento de erro
function adicionarEventoSeguro(seletor, evento, callback) {
  const els = document.querySelectorAll(seletor);
  els.forEach(el => {
    el.addEventListener(evento, (e) => {
      try {
        callback(e);
      } catch (erro) {
        console.error(`Erro no evento ${evento}:`, erro);
      }
    });
  });
}

// Delegação de eventos
function delegarEvento(contenedor, seletor, evento, callback) {
  const cont = document.querySelector(contenedor);
  if (!cont) return;
  
  cont.addEventListener(evento, (e) => {
    if (e.target.closest(seletor)) {
      callback(e);
    }
  });
}

// ========== PADRÕES ASSINCRONOS ==========

// Função com retry automático
async function comRetry(funcao, tentativas = 3, delay = 1000) {
  for (let i = 0; i < tentativas; i++) {
    try {
      return await funcao();
    } catch (erro) {
      if (i === tentativas - 1) throw erro;
      console.log(`Tentativa ${i + 1} falhou, aguardando ${delay}ms...`);
      await new Promise(r => setTimeout(r, delay));
    }
  }
}

// Promise.all com tratamento de erro
async function executarMultiplo(promessas) {
  try {
    return await Promise.all(promessas);
  } catch (erro) {
    console.error("Erro ao executar múltiplas operações:", erro);
    return null;
  }
}

// ========== PADRÕES DE FORMATAÇÃO ==========

// Formatar como moeda
function formatarMoeda(valor) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL"
  }).format(valor);
}

// Formatar como porcentagem
function formatarPorcentagem(valor) {
  return (valor * 100).toFixed(2) + "%";
}

// Formatar data
function formatarDataBR(data) {
  const d = new Date(data);
  return d.toLocaleDateString("pt-BR");
}

// Truncar texto
function truncarTexto(texto, caracteres = 50) {
  if (texto.length <= caracteres) return texto;
  return texto.substring(0, caracteres) + "...";
}

// ========== PADRÕES DE VALIDAÇÃO ==========

// Validar formulário
function validarFormulario(ids) {
  const erros = [];
  ids.forEach(id => {
    const valor = obterValor(id);
    if (!valor || valor.trim() === "") {
      erros.push(`Campo ${id} é obrigatório`);
    }
  });
  return { valido: erros.length === 0, erros };
}

// Validar email
function validarEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

// Validar telefone
function validarTelefone(telefone) {
  const regex = /^[0-9\(\)\-\s]+$/;
  return regex.test(telefone) && telefone.length >= 10;
}

// ========== PADRÕES DE CACHE ==========

// Cache em localStorage
const Cache = {
  set: (chave, valor, minutos = 60) => {
    const expira = Date.now() + minutos * 60 * 1000;
    localStorage.setItem(chave, JSON.stringify({ valor, expira }));
  },
  
  get: (chave) => {
    const item = localStorage.getItem(chave);
    if (!item) return null;
    
    const { valor, expira } = JSON.parse(item);
    if (Date.now() > expira) {
      localStorage.removeItem(chave);
      return null;
    }
    
    return valor;
  },
  
  remove: (chave) => localStorage.removeItem(chave),
  clear: () => localStorage.clear()
};

// ========== PADRÕES DE HTTP ==========

// Fetch com timeout
async function fetchComTimeout(url, opcoes = {}, timeoutMs = 5000) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);
  
  try {
    const response = await fetch(url, {
      ...opcoes,
      signal: controller.signal
    });
    return response;
  } finally {
    clearTimeout(timeout);
  }
}

// POST JSON
async function postJSON(url, dados) {
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dados)
  });
  return response.json();
}

// ========== PADRÕES DE NOTIFICAÇÃO ==========

// Alert customizado
function alerta(mensagem, tipo = "info") {
  const cores = {
    sucesso: "#2ecc71",
    erro: "#e74c3c",
    aviso: "#f39c12",
    info: "#3498db"
  };
  
  const alert = document.createElement("div");
  alert.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    padding: 15px 20px;
    background: ${cores[tipo] || cores.info};
    color: white;
    border-radius: 6px;
    z-index: 10000;
  `;
  alert.textContent = mensagem;
  document.body.appendChild(alert);
  
  setTimeout(() => alert.remove(), 3000);
}

// ========== PADRÕES DE PERFORMANCE ==========

// Debounce
function debounce(funcao, delay = 300) {
  let timeout;
  return function(...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => funcao(...args), delay);
  };
}

// Throttle
function throttle(funcao, limit = 300) {
  let ativar = true;
  return function(...args) {
    if (ativar) {
      funcao(...args);
      ativar = false;
      setTimeout(() => ativar = true, limit);
    }
  };
}

// Memoization
function memoizar(funcao) {
  const cache = {};
  return function(...args) {
    const chave = JSON.stringify(args);
    if (chave in cache) return cache[chave];
    const resultado = funcao(...args);
    cache[chave] = resultado;
    return resultado;
  };
}

// Exportar para uso global
window.Snippets = {
  // Requisições
  buscarDados, buscarComFiltro, buscarComPaginacao, buscarOrdenado, contarRegistros,
  // Insert
  inserirDados, inserirMultiplo, inserirComRetorno,
  // Update
  atualizarDados, atualizarComCondicao,
  // Delete
  deletarPorID, deletarComCondicao,
  // Auth
  fazerLogin, sair, registrarNovaContا, obterUsuarioAtual, resetarSenha,
  // Upload
  fazerUpload, fazerUploadSobrescrita, obterURLPublica, baixarArquivo, deletarArquivo,
  // DOM
  obterElemento, adicionarClasse, removerClasse, alterniarClasse, limparElemento,
  inserirHTML, obterValor, definirValor, mostrarElemento, ocultarElemento,
  // Eventos
  adicionarEventoSeguro, delegarEvento,
  // Async
  comRetry, executarMultiplo,
  // Formatação
  formatarMoeda, formatarPorcentagem, formatarDataBR, truncarTexto,
  // Validação
  validarFormulario, validarEmail, validarTelefone,
  // Cache
  Cache,
  // HTTP
  fetchComTimeout, postJSON,
  // Notificação
  alerta,
  // Performance
  debounce, throttle, memoizar
};

console.log("✅ Snippets carregados - use window.Snippets");
