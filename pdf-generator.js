/**
 * Gerador de PDF Profissional para Manutenção de Compressores - VERSÃO CORRIGIDA
 * Suporta: dados completos, fotos inline, melhor formatação
 */

async function gerarPDFManutencao(dadosManutencao, equipamento) {
  try {
    console.log("🔄 Iniciando geração de PDF...", dadosManutencao);
    
    const element = document.createElement('div');
    element.id = 'pdf-content';
    
    // Construir HTML com dados garantidos
    const htmlContent = construirHTMLPDF(dadosManutencao, equipamento);
    element.innerHTML = htmlContent;
    document.body.appendChild(element);

    const opt = {
      margin: 10,
      filename: `Manutencao_${dadosManutencao.compressor_id}_${new Date().toLocaleDateString('pt-BR').replace(/\//g, '-')}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { 
        scale: 2, 
        useCORS: true, 
        allowTaint: true,
        backgroundColor: '#ffffff'
      },
      jsPDF: { 
        orientation: 'portrait', 
        unit: 'mm', 
        format: 'a4',
        compress: true
      }
    };

    await html2pdf().set(opt).from(element).save();
    document.body.removeChild(element);
    
    console.log("✅ PDF gerado com sucesso!");
    return true;
  } catch (error) {
    console.error('❌ Erro ao gerar PDF:', error);
    alert('Erro ao gerar PDF: ' + error.message);
    return false;
  }
}

function construirHTMLPDF(dados, equipamento) {
  // Validações e conversões seguras
  const dataObj = dados.data_manutencao ? new Date(dados.data_manutencao) : new Date();
  const dataFormatada = dataObj.toLocaleDateString('pt-BR');
  const horaFormatada = new Date().toLocaleTimeString('pt-BR');

  // Garantir que equipamento tem dados
  const equip = equipamento || {};
  
  // Processar fotos seguramente
  let fotosHTML = '';
  const fotos = Array.isArray(dados.fotos_urls) ? dados.fotos_urls : [];
  
  if (fotos.length > 0) {
    fotosHTML = `
      <div style="margin: 25px 0; padding-top: 20px; border-top: 2px solid #ddd; page-break-inside: avoid;">
        <h3 style="color: #fff; background: #c40000; padding: 10px 12px; margin: 0 0 15px 0; font-size: 13px; text-transform: uppercase; letter-spacing: 1px; border-radius: 3px;">📸 FOTOS DA MANUTENÇÃO</h3>
        <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px;">
    `;
    
    fotos.slice(0, 5).forEach((foto, idx) => {
      if (typeof foto === 'string' && foto.startsWith('data:image')) {
        fotosHTML += `
          <div style="border: 1px solid #ddd; padding: 8px; border-radius: 4px; background: #f9f9f9; text-align: center; page-break-inside: avoid;">
            <img src="${foto}" style="max-width: 100%; max-height: 120px; object-fit: contain; border-radius: 3px;">
            <p style="margin: 5px 0 0 0; font-size: 10px; color: #666;">Foto ${idx + 1}</p>
          </div>
        `;
      }
    });
    
    fotosHTML += '</div></div>';
  }

  // Foto de capa
  let fotoCapaHTML = '';
  if (dados.cover_photo_url && typeof dados.cover_photo_url === 'string' && dados.cover_photo_url.startsWith('data:image')) {
    fotoCapaHTML = `
      <div style="text-align: center; margin-bottom: 20px; padding: 15px; background: #f5f5f5; border-radius: 4px; page-break-inside: avoid;">
        <img src="${dados.cover_photo_url}" style="max-width: 180px; max-height: 180px; object-fit: contain; border-radius: 6px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
        <p style="margin: 10px 0 0 0; font-size: 11px; color: #999;">Foto do Equipamento</p>
      </div>
    `;
  }

  // Calcular diferença de horímetro
  const horimetroAnterior = parseFloat(equip.horimetro) || 0;
  const horimetroNovo = parseFloat(dados.horimetro) || 0;
  const diferenca = (horimetroNovo - horimetroAnterior).toFixed(1);

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Segoe UI', Tahoma, Arial, sans-serif; color: #333; line-height: 1.6; }
        .container { max-width: 210mm; margin: 0 auto; padding: 0; }
        h1, h2, h3 { margin: 0; }
        table { width: 100%; border-collapse: collapse; margin-bottom: 15px; }
        td { padding: 8px; border: 1px solid #ddd; }
        .header-red { background: #c40000; color: white; font-weight: bold; }
        .background-gray { background: #f9f9f9; }
        .page-break { page-break-after: always; }
      </style>
    </head>
    <body>
      <div class="container">
        <!-- CABEÇALHO -->
        <div style="text-align: center; margin-bottom: 25px; padding-bottom: 15px; border-bottom: 3px solid #c40000;">
          <h1 style="color: #c40000; font-size: 28px; letter-spacing: 2px; margin-bottom: 5px;">IF COMPRESSORES</h1>
          <p style="color: #666; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Sistema de Gestão de Manutenção</p>
        </div>

        <!-- TÍTULO -->
        <div style="text-align: center; margin-bottom: 20px;">
          <h2 style="color: #c40000; font-size: 20px; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 5px;">RELATÓRIO DE MANUTENÇÃO</h2>
          <p style="color: #999; font-size: 11px;">Emitido em ${dataFormatada} às ${horaFormatada}</p>
        </div>

        <!-- FOTO DE CAPA -->
        ${fotoCapaHTML}

        <!-- IDENTIFICAÇÃO DO EQUIPAMENTO -->
        <h3 style="color: #fff; background: #c40000; padding: 8px 12px; margin: 15px 0 10px 0; font-size: 13px; text-transform: uppercase; letter-spacing: 1px; border-radius: 2px;">📋 IDENTIFICAÇÃO DO EQUIPAMENTO</h3>
        <table>
          <tr>
            <td class="header-red" style="width: 25%;">Série:</td>
            <td class="background-gray" style="width: 25%;">${dados.compressor_id || 'N/A'}</td>
            <td class="header-red" style="width: 25%;">Marca:</td>
            <td class="background-gray" style="width: 25%;">${equip.marca || 'N/A'}</td>
          </tr>
          <tr>
            <td class="header-red">Modelo:</td>
            <td>${equip.modelo || 'N/A'}</td>
            <td class="header-red">Tipo:</td>
            <td>${equip.tipo || 'N/A'}</td>
          </tr>
          <tr>
            <td class="header-red" class="background-gray">Cliente:</td>
            <td class="background-gray">${equip.cliente || 'N/A'}</td>
            <td class="header-red" class="background-gray">Localização:</td>
            <td class="background-gray">${equip.cidade || 'N/A'}</td>
          </tr>
          <tr>
            <td class="header-red">Potência:</td>
            <td>${equip.potencia || 'N/A'}</td>
            <td class="header-red">Pressão:</td>
            <td>${equip.pressao || 'N/A'}</td>
          </tr>
          <tr>
            <td class="header-red" class="background-gray">Vazão:</td>
            <td class="background-gray">${equip.vazao || 'N/A'}</td>
            <td class="header-red" class="background-gray">Tensão:</td>
            <td class="background-gray">${equip.tensao || 'N/A'}</td>
          </tr>
        </table>

        <!-- HORÍMETRO -->
        <h3 style="color: #fff; background: #c40000; padding: 8px 12px; margin: 15px 0 10px 0; font-size: 13px; text-transform: uppercase; letter-spacing: 1px; border-radius: 2px;">⏱️ HORÍMETRO</h3>
        <table>
          <tr>
            <td class="header-red" class="background-gray" style="width: 50%;">Horímetro Anterior:</td>
            <td class="background-gray" style="font-size: 16px; font-weight: bold; color: #c40000;">${horimetroAnterior} h</td>
          </tr>
          <tr>
            <td class="header-red">Horímetro Novo:</td>
            <td style="font-size: 16px; font-weight: bold; color: #c40000;">${horimetroNovo} h</td>
          </tr>
          <tr>
            <td class="header-red" class="background-gray">Diferença:</td>
            <td class="background-gray" style="font-size: 14px; font-weight: bold; color: #2ecc71;">${diferenca} h</td>
          </tr>
        </table>

        <!-- SERVIÇO REALIZADO -->
        <h3 style="color: #fff; background: #c40000; padding: 8px 12px; margin: 15px 0 10px 0; font-size: 13px; text-transform: uppercase; letter-spacing: 1px; border-radius: 2px;">🔧 SERVIÇO REALIZADO</h3>
        <table>
          <tr>
            <td class="header-red" class="background-gray" style="width: 30%;">Tipo de Serviço:</td>
            <td class="background-gray"><span style="background: #c40000; color: white; padding: 3px 8px; border-radius: 3px; display: inline-block; font-weight: bold;">${dados.tipo_servico || 'Não especificado'}</span></td>
          </tr>
          <tr>
            <td class="header-red">Data da Manutenção:</td>
            <td>${dataFormatada}</td>
          </tr>
        </table>

        <!-- DESCRIÇÃO -->
        <h3 style="color: #fff; background: #c40000; padding: 8px 12px; margin: 15px 0 10px 0; font-size: 13px; text-transform: uppercase; letter-spacing: 1px; border-radius: 2px;">📝 DESCRIÇÃO DO SERVIÇO</h3>
        <div style="background: #f9f9f9; border: 1px solid #ddd; padding: 12px; border-radius: 3px; font-size: 12px; line-height: 1.6; min-height: 60px; white-space: pre-wrap; word-wrap: break-word;">
          ${(dados.descricao || '').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/\n/g, '<br>')}
        </div>

        <!-- PEÇAS (SE HOUVER) -->
        ${dados.pecas ? `
        <h3 style="color: #fff; background: #c40000; padding: 8px 12px; margin: 15px 0 10px 0; font-size: 13px; text-transform: uppercase; letter-spacing: 1px; border-radius: 2px;">⚙️ PEÇAS SUBSTITUÍDAS</h3>
        <div style="background: #f9f9f9; border: 1px solid #ddd; padding: 12px; border-radius: 3px; font-size: 12px; line-height: 1.6; min-height: 40px; white-space: pre-wrap; word-wrap: break-word;">
          ${(dados.pecas || '').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/\n/g, '<br>')}
        </div>
        ` : ''}

        <!-- FOTOS -->
        ${fotosHTML}

        <!-- RODAPÉ -->
        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; text-align: center; font-size: 10px; color: #999;">
          <p style="margin: 5px 0;">Este relatório foi gerado automaticamente pelo Sistema IF Compressores</p>
          <p style="margin: 0;">Documento oficial da manutenção realizada</p>
          <p style="margin: 20px 0 0 0; color: #ccc;">__________________________________</p>
          <p style="margin: 5px 0 0 0; font-size: 9px;">Assinatura do Técnico</p>
          <p style="margin: 15px 0 0 0; font-size: 9px; color: #bbb;">Gerado em ${new Date().toLocaleString('pt-BR')}</p>
        </div>
      </div>
    </body>
    </html>
  `;
}

/**
 * Gera PDF com QR Code integrado
 */
async function gerarPDFComQRCode(equipamento, qrCodeDataUrl) {
  try {
    const element = document.createElement('div');
    element.id = 'pdf-qr-content';
    element.innerHTML = `
      <div style="font-family: Arial, sans-serif; text-align: center; padding: 40px; background: white;">
        <h1 style="color: #c40000; margin-bottom: 30px; font-size: 28px;">IF COMPRESSORES</h1>
        
        <h2 style="margin-bottom: 30px; font-size: 20px;">Código QR do Equipamento</h2>
        
        <div style="margin-bottom: 30px;">
          <img src="${qrCodeDataUrl}" alt="QR Code" style="width: 250px; height: 250px; border: 3px solid #c40000; padding: 15px; background: white;">
        </div>
        
        <div style="text-align: left; max-width: 500px; margin: 0 auto; border: 2px solid #c40000; padding: 25px; border-radius: 8px; background: #f9f9f9;">
          <h3 style="color: #c40000; margin-bottom: 15px; font-size: 16px;">Informações do Equipamento</h3>
          <p style="margin: 8px 0;"><strong>Série:</strong> ${equipamento.id || 'N/A'}</p>
          <p style="margin: 8px 0;"><strong>Marca:</strong> ${equipamento.marca || 'N/A'}</p>
          <p style="margin: 8px 0;"><strong>Modelo:</strong> ${equipamento.modelo || 'N/A'}</p>
          <p style="margin: 8px 0;"><strong>Tipo:</strong> ${equipamento.tipo || 'N/A'}</p>
          <p style="margin: 8px 0;"><strong>Cliente:</strong> ${equipamento.cliente || 'N/A'}</p>
          <p style="margin: 8px 0;"><strong>Localização:</strong> ${equipamento.cidade || 'N/A'}</p>
        </div>
      </div>
    `;
    document.body.appendChild(element);

    const opt = {
      margin: 10,
      filename: `QRCode_${equipamento.id}_${new Date().getTime()}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true, allowTaint: true },
      jsPDF: { orientation: 'portrait', unit: 'mm', format: 'a4' }
    };

    await html2pdf().set(opt).from(element).save();
    document.body.removeChild(element);
    
    return true;
  } catch (error) {
    console.error('Erro ao gerar PDF com QR:', error);
    return false;
  }
}
