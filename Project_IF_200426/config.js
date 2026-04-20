/**
 * config.js - Configuração Centralizada do Sistema
 * Altere aqui para customizar o sistema
 */

const CONFIG = {
  // ======== IDENTIFICAÇÃO DA EMPRESA ========
  EMPRESA: {
    nome: "IF Compressores",
    slogan: "Sistema de Gestão",
    cor_primaria: "#c40000",
    cor_secundaria: "#ff6b35",
    email_suporte: "suporte@ifcompressores.com",
    telefone_suporte: "(xx) 9xxxx-xxxx",
    website: "https://ifcompressores.com"
  },

  // ======== CONFIGURAÇÃO DO SISTEMA ========
  SISTEMA: {
    versao: "2.1",
    nome_completo: "IF Compressores - Sistema de Gestão de Manutenção",
    ambiente: "produção", // "desenvolvimento" ou "produção"
    modo_debug: false // true para ver logs no console
  },

  // ======== LIMITES E VALIDAÇÕES ========
  LIMITES: {
    max_fotos_por_manutencao: 5,
    max_tamanho_foto_mb: 5,
    max_largura_imagem_px: 1200,
    qualidade_imagem: 0.8, // 0-1
    max_caracteres_descricao: 5000,
    max_caracteres_peças: 2000
  },

  // ======== TIPOS DE SERVIÇO ========
  TIPOS_SERVICO: [
    { id: "preventiva", label: "Preventiva", icon: "✅", cor: "#2ecc71" },
    { id: "corretiva", label: "Corretiva", icon: "🔴", cor: "#e74c3c" },
    { id: "preditiva", label: "Preditiva", icon: "📊", cor: "#3498db" },
    { id: "revisao", label: "Revisão Geral", icon: "🔄", cor: "#f39c12" },
    { id: "oleo", label: "Troca de Óleo", icon: "🛢️", cor: "#95a5a6" },
    { id: "filtro", label: "Troca de Filtro", icon: "🔩", cor: "#34495e" }
  ],

  // ======== CAMPOS DO EQUIPAMENTO ========
  CAMPOS_EQUIPAMENTO: [
    { id: "tipo", label: "Tipo", obrigatorio: true, placeholder: "Ex: Parafuso, Pistão..." },
    { id: "marca", label: "Marca", obrigatorio: true, placeholder: "Ex: Schulz, Atlas Copco..." },
    { id: "modelo", label: "Modelo", obrigatorio: true, placeholder: "Ex: SRP 3010" },
    { id: "serie", label: "Número de Série", obrigatorio: true, placeholder: "Ex: 001, SRP-042, SC2024-001", destaque: true },
    { id: "potencia", label: "Potência (CV/kW)", obrigatorio: false, placeholder: "Ex: 10 CV" },
    { id: "pressao", label: "Pressão (bar/psi)", obrigatorio: false, placeholder: "Ex: 10 bar" },
    { id: "vazao", label: "Vazão (m³/min)", obrigatorio: false, placeholder: "Ex: 1.6 m³/min" },
    { id: "tensao", label: "Tensão (V)", obrigatorio: false, placeholder: "Ex: 220V / 380V" },
    { id: "horimetro", label: "Horímetro Inicial (h)", obrigatorio: false, tipo: "number", placeholder: "Ex: 0" },
    { id: "cliente", label: "Cliente", obrigatorio: false, placeholder: "Nome do cliente" },
    { id: "cidade", label: "Cidade", obrigatorio: false, placeholder: "Cidade — UF" }
  ],

  // ======== CAMPOS DA MANUTENÇÃO ========
  CAMPOS_MANUTENCAO: [
    { id: "compressor_id", label: "Número de Série", obrigatorio: true, placeholder: "Ex: 001, SRP-042..." },
    { id: "horimetro", label: "Novo Horímetro (h)", obrigatorio: true, tipo: "number", placeholder: "Ex: 1250" },
    { id: "data_manutencao", label: "Data da Manutenção", obrigatorio: false, tipo: "date" },
    { id: "tipo_servico", label: "Tipo de Serviço", obrigatorio: false },
    { id: "descricao", label: "O que foi feito?", obrigatorio: true, tipo: "textarea", placeholder: "Descreva detalhadamente...", linhas: 5 },
    { id: "pecas", label: "Peças Substituídas", obrigatorio: false, tipo: "textarea", placeholder: "Liste as peças trocadas...", linhas: 3 }
  ],

  // ======== CONFIGURAÇÃO PDF ========
  PDF: {
    tamanho_papel: "a4",
    orientacao: "portrait",
    margens_mm: 10,
    qualidade_imagem: 0.98,
    escala: 2,
    compressao: true
  },

  // ======== CORES DO SISTEMA ========
  CORES: {
    primaria: "#c40000",
    primaria_escura: "#8a0000",
    primaria_clara: "#e53935",
    fundo_escuro: "#0a0a0a",
    fundo_cinza: "#1e1e1e",
    texto_claro: "#f5f5f5",
    sucesso: "#2ecc71",
    aviso: "#f39c12",
    erro: "#e74c3c",
    info: "#3498db"
  },

  // ======== NOTIFICAÇÕES (TOAST) ========
  NOTIFICACOES: {
    duracao_ms: 3000,
    posicao: "bottom-right",
    animacao: "slideIn"
  },

  // ======== RESPONSIVIDADE ========
  BREAKPOINTS: {
    mobile: 600,
    tablet: 768,
    desktop: 1025
  },

  // ======== STORAGE ========
  STORAGE: {
    bucket: "if-manutencoes",
    pasta_equipamentos: "equipamentos",
    pasta_manutencoes: "manutencoes",
    pasta_capas: "capas"
  },

  // ======== SUPABASE ========
  SUPABASE: {
    // Altere aqui com suas credenciais Supabase
    url: "https://sjaqdhchefiwcmswyrit.supabase.co",
    anonKey: "sb_publishable_sS0G0QoH5bvuwqxMUZrP3w_fkUCfbqE"
  },

  // ======== PÁGINAS ========
  PAGINAS: {
    login: "login.html",
    dashboard: "dashboard.html",
    cadastro: "index.html",
    manutencao: "manutencao.html",
    historico: "historico.html",
    visualizacao: "visualizacao.html",
    qrcode: "qrcode.html"
  },

  // ======== VALIDAÇÕES ========
  VALIDACOES: {
    email_regex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    senha_minimo_caracteres: 8,
    numero_serie_minimo: 1,
    numero_serie_maximo: 50
  },

  // ======== LOGS ========
  LOG_NIVEL: "info", // "debug", "info", "warn", "error"

  // Função auxiliar para log
  log: function(mensagem, tipo = "info", dados = null) {
    if (this.SISTEMA.modo_debug || tipo !== "debug") {
      const timestamp = new Date().toLocaleTimeString("pt-BR");
      const emoji = {
        debug: "🔍",
        info: "ℹ️",
        warn: "⚠️",
        error: "❌",
        success: "✅"
      }[tipo] || "📝";
      
      console.log(`${emoji} [${timestamp}] ${mensagem}`, dados || "");
    }
  },

  // Função para obter nome da empresa
  getNomEmpresa: function() {
    return this.EMPRESA.nome;
  },

  // Função para obter cor primária
  getCorPrimaria: function() {
    return this.CORES.primaria;
  },

  // Função para validar tamanho de arquivo
  validarTamanhoArquivo: function(file) {
    const tamanho_mb = file.size / (1024 * 1024);
    return tamanho_mb <= this.LIMITES.max_tamanho_foto_mb;
  },

  // Função para verificar se está em mobile
  isMobile: function() {
    return window.innerWidth <= this.BREAKPOINTS.mobile;
  },

  // Função para verificar se está em tablet
  isTablet: function() {
    return window.innerWidth > this.BREAKPOINTS.mobile && 
               window.innerWidth <= this.BREAKPOINTS.tablet;
  },

  // Função para verificar se está em desktop
  isDesktop: function() {
    return window.innerWidth >= this.BREAKPOINTS.desktop;
  }
};

// Exportar para uso global
window.CONFIG = CONFIG;

// Log de inicialização
CONFIG.log(`Sistema ${CONFIG.SISTEMA.nome_completo} v${CONFIG.SISTEMA.versao} iniciado`, "success");
