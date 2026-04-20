/**
 * manutencao.js - Gestão de Manutenções e Geração de PDF Técnico
 * Versão CORRIGIDA: SEM ERROS DE REFERÊNCIA
 */

// Verificar CONFIG assim que o script carrega
function validarConfig() {
    if (typeof window.CONFIG === 'undefined') {
        window.CONFIG = { 
            LIMITES: { max_fotos_por_manutencao: 5 },
            SISTEMA: { modo_debug: false }
        };
    }
}
validarConfig();

async function salvarManutencao() {
    const btnSalvar = document.querySelector('.btn-primary');
    if (btnSalvar) {
        btnSalvar.disabled = true;
        btnSalvar.textContent = '⏳ Processando...';
    }

    try {
        if (!window.db) throw new Error("Conexão com banco não inicializada.");

        // 1. Coleta de Dados
        const compressor_id = document.getElementById("compressor_id").value.trim();
        const descricao = document.getElementById("descricao").value.trim();
        const horimetroNovo = parseFloat(document.getElementById("horimetro").value);
        const tipo_servico = document.getElementById("tipo_servico")?.value || "Manutenção";
        const pecas = document.getElementById("pecas")?.value.trim() || "";
        const data_manutencao = document.getElementById("data_manutencao").value || new Date().toISOString().split('T')[0];

        if (!compressor_id || !descricao || isNaN(horimetroNovo)) {
            throw new Error("Preencha: Série, Descrição e Horímetro.");
        }

        // 2. Buscar Equipamento
        const { data: equip, error: equipErr } = await window.db
            .from("if-compressores")
            .select("*")
            .eq("id", compressor_id)
            .single();

        if (equipErr || !equip) {
            throw new Error(`Equipamento "${compressor_id}" não encontrado.`);
        }

        // 3. Processar Fotos
        const fotosFiles = document.getElementById("fotos")?.files || [];
        const maxFotos = 5;
        const fotosBase64 = [];
        const fotosUrls = [];

        for (let i = 0; i < Math.min(fotosFiles.length, maxFotos); i++) {
            const file = fotosFiles[i];
            try {
                if (file.size > 5 * 1024 * 1024) continue;

                const base64 = await converterParaBase64(file);
                fotosBase64.push(base64);

                if (window.db?.storage) {
                    try {
                        // Usar função melhorada de upload
                        const fotoUrl = await uploadImagemManutencao(file);
                        if (fotoUrl) {
                            fotosUrls.push(fotoUrl);
                        }
                    } catch (uploadErr) {
                        console.warn(`⚠️ Upload foto ${i+1} falhou`);
                    }
                }
            } catch (e) {
                console.warn(`⚠️ Erro foto ${i+1}`);
            }
        }

        // 4. Salvar Manutenção
        const { data: { user } } = await window.db.auth.getUser();
        const registro = {
            compressor_id,
            tecnico_id: user?.id || 'anonimo',
            descricao,
            horimetro: horimetroNovo,
            data_manutencao,
            tipo_servico,
            pecas: pecas || null,
            fotos_urls: fotosUrls.length > 0 ? JSON.stringify(fotosUrls) : null
        };

        const { error: insertErr } = await window.db
            .from("if-manutencoes")
            .insert([registro]);

        if (insertErr) throw new Error(`Erro ao salvar: ${insertErr.message}`);

        // 5. Atualizar Equipamento
        await window.db
            .from("if-compressores")
            .update({ horimetro: horimetroNovo })
            .eq("id", compressor_id)
            .catch(e => console.warn("⚠️ Horímetro não atualizado"));

        mostrarToast("✅ Manutenção salva!", "success");

        // 6. Gerar PDF
        if (typeof gerarPDFManutencao === 'function') {
            setTimeout(async () => {
                try {
                    const dadosComFotos = {
                        compressor_id,
                        descricao,
                        horimetro: horimetroNovo,
                        tipo_servico,
                        pecas,
                        data_manutencao,
                        fotos_urls: fotosBase64.length > 0 ? fotosBase64 : null
                    };
                    await gerarPDFManutencao(dadosComFotos, equip);
                } catch (e) {
                    console.warn("⚠️ PDF não gerado");
                }
            }, 300);
        }

        setTimeout(() => {
            window.location.href = `historico.html?id=${compressor_id}`;
        }, 2000);

    } catch (error) {
        console.error("❌ Erro:", error);
        mostrarToast(`❌ ${error.message}`, 'error');
    } finally {
        resetBtn(btnSalvar);
    }
}

function resetBtn(btn) {
    if (btn) {
        btn.disabled = false;
        btn.innerHTML = '💾 Salvar & Gerar PDF';
    }
}

function mostrarToast(msg, tipo = 'info') {
    const toast = document.createElement('div');
    toast.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: ${tipo === 'success' ? '#2ecc71' : tipo === 'error' ? '#e74c3c' : '#3498db'};
        color: white;
        padding: 15px 20px;
        border-radius: 6px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        z-index: 10000;
        font-weight: 500;
    `;
    toast.textContent = msg;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
}

async function converterParaBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = () => reject(new Error("Erro ao ler arquivo"));
        reader.readAsDataURL(file);
    });
}
