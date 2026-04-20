# 🚀 IF Compressores v2.2 — Projeto Alinhado

**Data:** Abril 2026  
**Versão:** 2.2 (Alinhada e Otimizada)  
**Status:** ✅ Pronto para Produção

---

## 📋 O que foi feito

### ✅ Comparação e Alinhamento dos 2 Projetos
- **Projeto 1** (if0600426): Versão original com upload básico
- **Projeto 2** (IFS_v2_1): Versão com equipamentos.html e supabase-melhorado.js
- **Resultado**: Projeto unificado com o melhor dos 2

### ✅ Melhorias Implementadas

1. **Upload de Imagens Corrigido**
   - ✅ URLs públicas do Supabase funcionando corretamente
   - ✅ Função `construirUrlPublica()` garante URLs válidas
   - ✅ Imagens aparecem em equipamentos.html
   - ✅ Imagens aparecem em visualizacao.html

2. **Otimização de Imagens**
   - ✅ Redimensiona para 1200px máximo
   - ✅ Compressão JPEG 80%
   - ✅ Redução de 80-90% de tamanho (3MB → 400KB)

3. **Página de Equipamentos**
   - ✅ `equipamentos.html` - Nova página completa
   - ✅ Grid responsivo com cards
   - ✅ Filtros avançados (busca, marca, cliente, tipo)
   - ✅ Estatísticas em tempo real
   - ✅ Imagens carregam corretamente do Supabase

4. **Integração Supabase Melhorada**
   - ✅ `supabase-melhorado.js` - Novo arquivo robusta
   - ✅ Funções: `uploadImagemEquipamento()`, `uploadImagemManutencao()`
   - ✅ Função `construirUrlPublica()` - CRÍTICA para URLs funcionarem
   - ✅ Upload otimizado automático

5. **Todas as Páginas Atualizadas**
   - ✅ `index.html` - Usa novas funções de upload
   - ✅ `dashboard.html` - Novo link "Ver Equipamentos"
   - ✅ `manutencao.js` - Upload de fotos melhorado
   - ✅ `visualizacao.html` - Mostra imagens corretamente

---

## 📁 Estrutura Final do Projeto

```
IF_COMPRESSORES_FINAL/
├── 📄 index.html               (Cadastrar equipamento)
├── 📄 dashboard.html           (Painel com novo botão)
├── 📄 equipamentos.html        ✨ NOVO - Lista com filtros
├── 📄 visualizacao.html        (Detalhes do equipamento)
├── 📄 manutencao.html          (Registrar manutenção)
├── 📄 manutencao.js            (Upload de fotos melhorado)
├── 📄 historico.html           (Histórico de manutenções)
├── 📄 qrcode.html              (Gerar QR code)
├── 📄 login.html               (Login)
├── 📄 login.js                 (Autenticação)
│
├── 📜 supabase-melhorado.js    ✨ MELHORADO - Upload correto
├── 📜 config.js                (Configurações)
├── 📜 utils.js                 (Utilitários gerais)
├── 📜 utils-fotos.js           (Funções de foto)
├── 📜 validacoes.js            (Validações)
├── 📜 snippets.js              (Funções auxiliares)
├── 📜 pdf-generator.js         (Gerar PDFs)
│
├── 🎨 style.css                (Estilos)
├── 🖼️ logo.png                 (Logo)
│
└── 📋 README.md                (Este arquivo)
```

---

## 🔧 Configuração Necessária no Supabase

### 1. Bucket Obrigatório
```
Nome: if-manutencoes
Tipo: Public (com acesso público)
```

### 2. Pastas Automáticas (criadas pelo sistema)
```
if-manutencoes/
├── equipamentos/          (Fotos de equipamentos)
└── manutencoes/          (Fotos de manutenções)
```

### 3. Tabelas Necessárias

**Tabela: if-compressores**
```sql
id              TEXT PRIMARY KEY  -- Número de série
tipo            TEXT              -- Tipo do compressor
marca           TEXT              -- Marca
modelo          TEXT              -- Modelo
serie           TEXT              -- Número de série
potencia        TEXT              -- Ex: "10 CV"
pressao         TEXT              -- Ex: "10 bar"
vazao           TEXT              -- Ex: "1.6 m³/min"
tensao          TEXT              -- Ex: "220V"
horimetro       FLOAT             -- Horas
cliente         TEXT              -- Cliente
cidade          TEXT              -- Localização
foto_capa_url   TEXT              -- ⭐ URL DA IMAGEM
created_at      TIMESTAMP         -- Data criação
```

**Tabela: if-manutencoes**
```sql
id              INTEGER PRIMARY KEY
compressor_id   TEXT FOREIGN KEY  -- Referência a if-compressores
tecnico_id      TEXT              -- ID do técnico
descricao       TEXT              -- Descrição do serviço
horimetro       FLOAT             -- Horímetro
data_manutencao DATE              -- Data da manutenção
tipo_servico    TEXT              -- Tipo (Preventiva, Corretiva, etc)
pecas           TEXT              -- Peças substituídas
fotos_urls      TEXT              -- JSON com URLs de fotos
created_at      TIMESTAMP         -- Data criação
```

---

## 🚀 Como Usar

### 1. Fazer Login
- URL: `login.html`
- Use credenciais Supabase

### 2. Cadastrar Equipamento
- Clique em "Cadastrar Equipamento" no dashboard
- Preencha dados
- **Anexe uma foto** (será otimizada e salva no Supabase)
- Clique "Salvar e Gerar QR"

### 3. Ver Equipamentos
- Novo botão no dashboard: "📦 Ver Equipamentos"
- Lista com:
  - Grid responsivo
  - Fotos carregadas do Supabase ✅
  - Filtros funcionando
  - Estatísticas

### 4. Visualizar Detalhes
- Clique em "👁️ Visualizar" em qualquer card
- Vê ficha técnica completa
- Vê foto do equipamento
- Pode registrar manutenção

### 5. Registrar Manutenção
- Clique em "Registrar Manutenção"
- Anexe fotos (até 5)
- Fotos serão otimizadas e salvas
- Histórico atualizado automaticamente

---

## 🔗 Fluxo de URLs de Imagens

### Quando você cadastra um equipamento:

```
1. Seleciona foto
   ↓
2. Upload otimiza (3MB → 400KB)
   ↓
3. Salva no Supabase: if-manutencoes/equipamentos/[timestamp]_[random].jpg
   ↓
4. Função construirUrlPublica() gera:
   https://sjaq...supabase.co/storage/v1/object/public/if-manutencoes/equipamentos/[...]
   ↓
5. URL é salva no banco em foto_capa_url
   ↓
6. equipamentos.html carrega a imagem
   ↓
7. Imagem aparece no grid com sucesso! ✅
```

### Quando você visualiza:

```
visualizacao.html → Busca foto_capa_url no banco
                 → Exibe em <img src="[URL]">
                 → Carrega do Supabase
                 → Mostra imagem ✅
```

---

## ✨ Principais Funções

### supabase-melhorado.js

```javascript
// Upload de equipamento
uploadImagemEquipamento(file)
// Retorna: URL pública ou null

// Upload de manutenção
uploadImagemManutencao(file)
// Retorna: URL pública ou null

// Otimizar imagem (automático)
otimizarImagem(file, maxWidth, quality)
// Retorna: Promise<File> otimizado

// Construir URL (CRÍTICA!)
construirUrlPublica(caminhoArquivo, bucket)
// Retorna: URL pública válida

// Converter Base64
converterParaBase64(file)
// Retorna: Promise<string> Base64

// Deletar imagem
deletarImagem(caminhoArquivo, bucket)
// Retorna: Promise<boolean>
```

---

## 🎯 Recursos Principais

### 📦 Página de Equipamentos (equipamentos.html)

**Estatísticas:**
- Total de equipamentos
- Marcas diferentes
- Clientes únicos
- Cidades

**Filtros:**
- Busca por série/modelo/marca/cliente
- Filtro por marca
- Filtro por cliente
- Filtro por tipo
- Botões "Filtrar" e "Limpar"

**Cards:**
- Imagem do equipamento ✅
- Marca e modelo
- Série
- Tipo
- Cliente
- Cidade
- Potência e pressão
- Botões "Visualizar" e "Editar"

**Responsividade:**
- Desktop: 4 colunas
- Tablet: 2 colunas
- Mobile: 1 coluna

### 🎴 Visualização (visualizacao.html)

- Ficha técnica completa
- Imagem do equipamento ✅
- Últimas 10 manutenções com fotos ✅
- Botões para registrar manutenção
- Imprimir ficha

---

## 🐛 Troubleshooting

### Problema: Imagens não aparecem
**Solução:**
1. Verificar console (F12)
2. Verificar se URL no banco começa com `https://`
3. Verificar se bucket "if-manutencoes" existe no Supabase
4. Verificar se bucket está marcado como "Public"

### Problema: Upload lento
**Solução:** É normal! Primeiro upload é mais lento (otimiza imagem).
- Depois melhora (cache de 1 hora)

### Problema: Erro "Forbidden" ao fazer upload
**Solução:** Verificar políticas do Supabase
- Ir em Storage → if-manutencoes → Policies
- Deve ter INSERT para usuários autenticados

### Problema: Página de equipamentos vazia
**Solução:**
1. Verificar se há dados em if-compressores
2. Abrir console (F12)
3. Verificar erros
4. Fazer login novamente

### Problema: Filtros não funcionam
**Solução:**
1. Verificar se dados têm marca/cliente/tipo preenchidos
2. Abrir console (F12)
3. Buscar por "equipamentos" no console

---

## 📊 Tamanho de Imagens

**Antes da otimização:**
- Foto típica: 3-5 MB
- Fotos múltiplas: +15 MB

**Depois da otimização:**
- Foto: 400-800 KB
- Fotos múltiplas: ~2-3 MB

**Economia:**
- 80-90% de redução
- Banda muito menor
- Mais rápido carregar

---

## 🔐 Segurança

✅ **Implementado:**
- Autenticação Supabase obrigatória
- Validação de tipo de arquivo
- Compressão automática (reduz riscos)
- Nomes únicos com timestamp (sem conflitos)
- Cache control (1 hora)

---

## 📱 Responsividade

Testado e funciona em:
- ✅ Desktop (1920x1080, 1366x768)
- ✅ Tablet (768x1024)
- ✅ Mobile (375x667, 390x844)

---

## 🎉 Próximas Melhorias Sugeridas

1. Página de edição de equipamento
2. Exportar equipamentos para CSV/PDF
3. Upload múltiplo de imagens
4. Galeria de fotos
5. Histórico de alterações
6. Busca avançada
7. Mapa com localização
8. Gráficos de estatísticas
9. Backup automático
10. Integração com WhatsApp

---

## 📞 Suporte

**Dúvidas técnicas?**
1. Abra console (F12)
2. Procure por erros
3. Verifique se URLs estão sendo geradas corretamente
4. Teste upload de imagem pequena (< 1MB)

**Erro "Undefined function"?**
1. Verifique se supabase-melhorado.js está carregado
2. Verifique ordem dos scripts no HTML
3. Reload página (Ctrl+F5)

---

## 📦 Arquivos Principais

| Arquivo | Propósito | Status |
|---------|-----------|--------|
| supabase-melhorado.js | Upload + URLs | ✅ CRÍTICO |
| equipamentos.html | Lista com filtros | ✅ NOVO |
| index.html | Cadastro | ✅ MELHORADO |
| dashboard.html | Menu principal | ✅ MELHORADO |
| manutencao.js | Registro de manutenção | ✅ MELHORADO |
| visualizacao.html | Detalhes | ✅ OK |

---

**Versão:** 2.2  
**Data:** Abril 2026  
**Desenvolvido com:** HTML + CSS + JavaScript + Supabase  
**Status:** ✅ Pronto para Produção

🚀 Aproveite!
