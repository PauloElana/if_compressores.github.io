/**
 * utils.js - Funções Utilitárias Globais
 */

class Utils {
  // ======== FORMATAÇÃO ========

  // Formatar data para pt-BR
  static formatarData(data) {
    if (!data) return "N/A";
    try {
      const d = new Date(data);
      return d.toLocaleDateString("pt-BR", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit"
      });
    } catch (e) {
      return "N/A";
    }
  }

  // Formatar data e hora
  static formatarDataHora(data) {
    if (!data) return "N/A";
    try {
      const d = new Date(data);
      return d.toLocaleString("pt-BR", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit"
      });
    } catch (e) {
      return "N/A";
    }
  }

  // Formatar hora
  static formatarHora(data) {
    if (!data) return "N/A";
    try {
      const d = new Date(data);
      return d.toLocaleTimeString("pt-BR", {
        hour: "2-digit",
        minute: "2-digit"
      });
    } catch (e) {
      return "N/A";
    }
  }

  // Formatar número
  static formatarNumero(numero, casasDecimais = 2) {
    if (numero === null || numero === undefined) return "N/A";
    return parseFloat(numero).toFixed(casasDecimais).replace(".", ",");
  }

  // Formatar moeda
  static formatarMoeda(valor) {
    if (valor === null || valor === undefined) return "N/A";
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL"
    }).format(valor);
  }

  // Capitalizar primeira letra
  static capitalizarPrimeira(texto) {
    if (!texto) return "";
    return texto.charAt(0).toUpperCase() + texto.slice(1).toLowerCase();
  }

  // UPPERCASE
  static uppercase(texto) {
    if (!texto) return "";
    return texto.toUpperCase();
  }

  // lowercase
  static lowercase(texto) {
    if (!texto) return "";
    return texto.toLowerCase();
  }

  // Limpar espaços
  static limparEspacos(texto) {
    if (!texto) return "";
    return texto.trim().replace(/\s+/g, " ");
  }

  // ======== MANIPULAÇÃO DE DADOS ========

  // Clonar objeto
  static clonarObjeto(obj) {
    return JSON.parse(JSON.stringify(obj));
  }

  // Mesclar objetos
  static mesclarObjetos(obj1, obj2) {
    return { ...obj1, ...obj2 };
  }

  // Filtrar objeto
  static filtrarObjeto(obj, condicao) {
    return Object.keys(obj).reduce((acc, key) => {
      if (condicao(key, obj[key])) {
        acc[key] = obj[key];
      }
      return acc;
    }, {});
  }

  // Obter chaves do objeto
  static obterChaves(obj) {
    return Object.keys(obj);
  }

  // Obter valores do objeto
  static obterValores(obj) {
    return Object.values(obj);
  }

  // Verificar se objeto está vazio
  static objetoVazio(obj) {
    return Object.keys(obj).length === 0;
  }

  // ======== ARRAY ========

  // Remover duplicatas
  static removerDuplicatas(array) {
    return [...new Set(array)];
  }

  // Ordenar array
  static ordenarArray(array, campo = null, ordem = "asc") {
    const copia = [...array];
    return copia.sort((a, b) => {
      const valA = campo ? a[campo] : a;
      const valB = campo ? b[campo] : b;
      const resultado = valA > valB ? 1 : valA < valB ? -1 : 0;
      return ordem === "desc" ? -resultado : resultado;
    });
  }

  // Agrupar array
  static agruparArray(array, campo) {
    return array.reduce((acc, item) => {
      const chave = item[campo];
      if (!acc[chave]) acc[chave] = [];
      acc[chave].push(item);
      return acc;
    }, {});
  }

  // Mapear array
  static mapearArray(array, campo) {
    return array.map(item => item[campo]);
  }

  // ======== VALIDAÇÃO ========

  // Verificar tipo
  static verificarTipo(valor, tipo) {
    return typeof valor === tipo;
  }

  // É nulo ou undefined
  static ehNuloOuVazio(valor) {
    return valor === null || valor === undefined || valor === "";
  }

  // É número
  static ehNumero(valor) {
    return !isNaN(valor) && valor !== "";
  }

  // É positivo
  static ehPositivo(valor) {
    return this.ehNumero(valor) && parseFloat(valor) > 0;
  }

  // ======== STRING ========

  // Truncar string
  static truncarString(texto, caracteres = 50) {
    if (texto.length <= caracteres) return texto;
    return texto.substring(0, caracteres) + "...";
  }

  // Contar palavras
  static contarPalavras(texto) {
    if (!texto) return 0;
    return texto.trim().split(/\s+/).length;
  }

  // Contar caracteres (sem espaços)
  static contarCaracteres(texto) {
    if (!texto) return 0;
    return texto.replace(/\s/g, "").length;
  }

  // ======== LOCAL STORAGE ========

  // Salvar no localStorage
  static salvarLocal(chave, valor) {
    try {
      localStorage.setItem(chave, JSON.stringify(valor));
      return true;
    } catch (e) {
      console.error("Erro ao salvar localStorage:", e);
      return false;
    }
  }

  // Obter do localStorage
  static obterLocal(chave) {
    try {
      const valor = localStorage.getItem(chave);
      return valor ? JSON.parse(valor) : null;
    } catch (e) {
      console.error("Erro ao obter localStorage:", e);
      return null;
    }
  }

  // Remover do localStorage
  static removerLocal(chave) {
    try {
      localStorage.removeItem(chave);
      return true;
    } catch (e) {
      console.error("Erro ao remover localStorage:", e);
      return false;
    }
  }

  // Limpar localStorage
  static limparLocal() {
    try {
      localStorage.clear();
      return true;
    } catch (e) {
      console.error("Erro ao limpar localStorage:", e);
      return false;
    }
  }

  // ======== SESSION STORAGE ========

  // Salvar em sessão
  static salvarSessao(chave, valor) {
    try {
      sessionStorage.setItem(chave, JSON.stringify(valor));
      return true;
    } catch (e) {
      return false;
    }
  }

  // Obter de sessão
  static obterSessao(chave) {
    try {
      const valor = sessionStorage.getItem(chave);
      return valor ? JSON.parse(valor) : null;
    } catch (e) {
      return null;
    }
  }

  // ======== URL E QUERY ========

  // Obter parâmetro de URL
  static obterParametroURL(param) {
    const params = new URLSearchParams(window.location.search);
    return params.get(param);
  }

  // Obter todos os parâmetros
  static obterParametrosURL() {
    const params = new URLSearchParams(window.location.search);
    const obj = {};
    for (const [key, value] of params) {
      obj[key] = value;
    }
    return obj;
  }

  // Criar query string
  static criarQueryString(obj) {
    return new URLSearchParams(obj).toString();
  }

  // ======== DELAI ========

  // Esperar (async)
  static esperar(ms = 1000) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // ======== ID ========

  // Gerar ID único
  static gerarID() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }

  // Gerar UUID
  static gerarUUID() {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
      const r = Math.random() * 16 | 0;
      const v = c === "x" ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

  // ======== DISPOSITIVO ========

  // Verificar se está em mobile
  static ehMobile() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  }

  // Verificar se está em iOS
  static ehIOS() {
    return /iPad|iPhone|iPod/.test(navigator.userAgent);
  }

  // Verificar se está em Android
  static ehAndroid() {
    return /Android/.test(navigator.userAgent);
  }

  // ======== NAVEGADOR ========

  // Obter navegador
  static obterNavegador() {
    const ua = navigator.userAgent;
    if (ua.indexOf("Firefox") > -1) return "Firefox";
    if (ua.indexOf("Chrome") > -1) return "Chrome";
    if (ua.indexOf("Safari") > -1) return "Safari";
    if (ua.indexOf("Edge") > -1) return "Edge";
    return "Outro";
  }

  // ======== COOKIE ========

  // Definir cookie
  static definirCookie(nome, valor, dias = 7) {
    const data = new Date();
    data.setTime(data.getTime() + dias * 24 * 60 * 60 * 1000);
    const expires = "expires=" + data.toUTCString();
    document.cookie = nome + "=" + valor + ";" + expires + ";path=/";
  }

  // Obter cookie
  static obterCookie(nome) {
    const nomeEQ = nome + "=";
    const cookies = document.cookie.split(";");
    for (let i = 0; i < cookies.length; i++) {
      let cookie = cookies[i].trim();
      if (cookie.indexOf(nomeEQ) === 0) {
        return cookie.substring(nomeEQ.length);
      }
    }
    return null;
  }

  // ======== DOWNLOAD ========

  // Download arquivo
  static downloadArquivo(data, filename, tipo = "text/plain") {
    const blob = new Blob([data], { type: tipo });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  }
}

// Exportar para uso global
window.Utils = Utils;


console.log("✅ Utilitários globais carregados");