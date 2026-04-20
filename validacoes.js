/**
 * validacoes.js - Sistema de Validações Centralizado
 */

class Validador {
  // Validar email
  static validarEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }

  // Validar senha
  static validarSenha(senha) {
    if (senha.length < 8) return false;
    const temMaiuscula = /[A-Z]/.test(senha);
    const temMinuscula = /[a-z]/.test(senha);
    const temNumero = /[0-9]/.test(senha);
    return temMaiuscula && temMinuscula && temNumero;
  }

  // Validar número de série
  static validarNumeroSerie(serie) {
    if (!serie) return false;
    if (serie.length > 50) return false;
    return /^[a-zA-Z0-9\-_]+$/.test(serie);
  }

  // Validar horímetro
  static validarHorimetro(horimetro) {
    const valor = parseFloat(horimetro);
    return !isNaN(valor) && valor >= 0;
  }

  // Validar se arquivo é imagem
  static validarImagem(file) {
    const tiposPermitidos = ["image/jpeg", "image/png", "image/gif", "image/webp"];
    return tiposPermitidos.includes(file.type);
  }

  // Validar tamanho de arquivo
  static validarTamanhoArquivo(file, maxMB = 5) {
    const tamanhoMB = file.size / (1024 * 1024);
    return tamanhoMB <= maxMB;
  }

  // Validar quantidade de fotos
  static validarQuantidadeFotos(files, max = 5) {
    return files.length <= max;
  }

  // Validar descrição
  static validarDescricao(descricao, maxCaracteres = 5000) {
    if (!descricao || descricao.trim().length === 0) return false;
    if (descricao.length > maxCaracteres) return false;
    return true;
  }

  // Validar data
  static validarData(data) {
    try {
      const d = new Date(data);
      return d instanceof Date && !isNaN(d);
    } catch (e) {
      return false;
    }
  }

  // Validar se data é no passado ou hoje
  static validarDataNaoFutura(data) {
    const d = new Date(data);
    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);
    return d <= hoje;
  }

  // Validar campos obrigatórios
  static validarObrigatorios(campos) {
    const erros = [];
    
    for (const [nome, valor] of Object.entries(campos)) {
      if (valor === null || valor === undefined || valor === "") {
        erros.push(`${nome} é obrigatório`);
      }
    }

    return {
      valido: erros.length === 0,
      erros: erros
    };
  }

  // Validar equipamento completo
  static validarEquipamento(dados) {
    const erros = [];

    // Campos obrigatórios
    if (!dados.tipo) erros.push("Tipo de compressor é obrigatório");
    if (!dados.marca) erros.push("Marca é obrigatória");
    if (!dados.modelo) erros.push("Modelo é obrigatório");
    if (!dados.serie) erros.push("Número de série é obrigatório");

    // Validações específicas
    if (dados.serie && !this.validarNumeroSerie(dados.serie)) {
      erros.push("Número de série inválido (letras, números, -, _ apenas)");
    }

    if (dados.horimetro && !this.validarHorimetro(dados.horimetro)) {
      erros.push("Horímetro deve ser um número positivo");
    }

    return {
      valido: erros.length === 0,
      erros: erros
    };
  }

  // Validar manutenção completa
  static validarManutencao(dados) {
    const erros = [];

    // Campos obrigatórios
    if (!dados.compressor_id) erros.push("Número de série do compressor é obrigatório");
    if (!dados.descricao) erros.push("Descrição do serviço é obrigatória");
    if (!dados.horimetro) erros.push("Novo horímetro é obrigatório");

    // Validações específicas
    if (dados.compressor_id && !this.validarNumeroSerie(dados.compressor_id)) {
      erros.push("Número de série inválido");
    }

    if (dados.horimetro && !this.validarHorimetro(dados.horimetro)) {
      erros.push("Horímetro deve ser um número positivo");
    }

    if (dados.descricao && !this.validarDescricao(dados.descricao)) {
      erros.push("Descrição inválida (1-5000 caracteres)");
    }

    if (dados.data_manutencao && !this.validarData(dados.data_manutencao)) {
      erros.push("Data inválida");
    }

    if (dados.data_manutencao && !this.validarDataNaoFutura(dados.data_manutencao)) {
      erros.push("Data não pode ser no futuro");
    }

    return {
      valido: erros.length === 0,
      erros: erros
    };
  }

  // Validar fotos
  static validarFotos(files) {
    const erros = [];

    if (!files || files.length === 0) {
      return { valido: true, erros: [] }; // Fotos são opcionais
    }

    if (!this.validarQuantidadeFotos(files)) {
      erros.push(`Máximo 5 fotos permitidas`);
    }

    for (let i = 0; i < files.length; i++) {
      const file = files[i];

      if (!this.validarImagem(file)) {
        erros.push(`Foto ${i + 1}: Formato inválido (JPG, PNG, GIF, WEBP)`);
      }

      if (!this.validarTamanhoArquivo(file)) {
        erros.push(`Foto ${i + 1}: Arquivo muito grande (máx 5MB)`);
      }
    }

    return {
      valido: erros.length === 0,
      erros: erros
    };
  }

  // Validar conexão com banco
  static validarConexaoBanco(db) {
    return db !== null && db !== undefined;
  }

  // Validar autenticação
  static async validarAutenticacao(db) {
    try {
      const { data } = await db.auth.getSession();
      return !!data.session;
    } catch (e) {
      return false;
    }
  }

  // Mensagem de erro formatada
  static formatarErros(erros) {
    if (erros.length === 0) return "";
    if (erros.length === 1) return erros[0];
    return "Erros:\n" + erros.map((e, i) => `${i + 1}. ${e}`).join("\n");
  }
}

// Exportar para uso global
window.Validador = Validador;

console.log("✅ Sistema de Validações carregado");
