const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const outDir = path.join(__dirname, '..', 'out');
const timestamp = new Date().toISOString().split('T')[0];
const zipFileName = `hostinger-deploy-${timestamp}.zip`;
const zipPath = path.join(__dirname, '..', zipFileName);

console.log('📦 Criando arquivo ZIP para deploy na Hostinger...\n');

if (!fs.existsSync(outDir)) {
    console.error('❌ Erro: Pasta "out" não encontrada!');
    console.error('Execute "npm run build" primeiro.\n');
    process.exit(1);
}

try {
    if (fs.existsSync(zipPath)) {
        fs.unlinkSync(zipPath);
    }

    console.log('Compactando arquivos...');
    execSync(`cd out && zip -r ../${zipFileName} .`, { stdio: 'inherit' });

    console.log('\n✅ Deploy ZIP criado com sucesso!');
    console.log(`📁 Arquivo: ${zipFileName}`);
    console.log(`📍 Localização: ${zipPath}\n`);
    console.log('🚀 Próximos passos:');
    console.log('1. Faça login no painel da Hostinger');
    console.log('2. Vá em "Gerenciador de Arquivos"');
    console.log('3. Navegue até a pasta public_html');
    console.log('4. Faça upload do arquivo ZIP');
    console.log('5. Extraia o arquivo ZIP no servidor');
    console.log('6. Acesse seu domínio para verificar o site!\n');
} catch (error) {
    console.error('❌ Erro ao criar ZIP:', error.message);
    process.exit(1);
}
