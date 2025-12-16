const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const outDir = path.join(__dirname, '..', 'out');

console.log('🖼️  Convertendo imagens para WebP...\n');

if (!fs.existsSync(outDir)) {
    console.error('❌ Erro: Pasta "out" não encontrada!');
    process.exit(1);
}

async function convertImagesToWebP(dir) {
    const files = fs.readdirSync(dir);
    let convertedCount = 0;

    for (const file of files) {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);

        if (stat.isDirectory()) {
            // Recursivamente processar subdiretórios
            const subDirConverted = await convertImagesToWebP(filePath);
            convertedCount += subDirConverted;
        } else {
            const ext = path.extname(file).toLowerCase();

            // Converter apenas PNG e JPG
            if (['.png', '.jpg', '.jpeg'].includes(ext)) {
                try {
                    const webpPath = filePath.replace(/\.(png|jpg|jpeg)$/i, '.webp');

                    await sharp(filePath)
                        .webp({ quality: 85 })
                        .toFile(webpPath);

                    console.log(`✅ ${file} → ${path.basename(webpPath)}`);
                    convertedCount++;

                    // Opcional: remover arquivo original para economizar espaço
                    // fs.unlinkSync(filePath);
                } catch (error) {
                    console.error(`❌ Erro ao converter ${file}:`, error.message);
                }
            }
        }
    }

    return convertedCount;
}

async function updateHTMLReferences() {
    console.log('\n📝 Atualizando referências HTML...\n');

    const htmlFiles = [];

    function findHTMLFiles(dir) {
        const files = fs.readdirSync(dir);

        for (const file of files) {
            const filePath = path.join(dir, file);
            const stat = fs.statSync(filePath);

            if (stat.isDirectory()) {
                findHTMLFiles(filePath);
            } else if (file.endsWith('.html')) {
                htmlFiles.push(filePath);
            }
        }
    }

    findHTMLFiles(outDir);

    for (const htmlFile of htmlFiles) {
        let content = fs.readFileSync(htmlFile, 'utf-8');
        let updated = false;

        // Substituir referências de imagens por WebP
        const replacements = [
            { pattern: /\.png/g, replacement: '.webp' },
            { pattern: /\.jpg/g, replacement: '.webp' },
            { pattern: /\.jpeg/g, replacement: '.webp' },
        ];

        for (const { pattern, replacement } of replacements) {
            if (pattern.test(content)) {
                content = content.replace(pattern, replacement);
                updated = true;
            }
        }

        if (updated) {
            fs.writeFileSync(htmlFile, content, 'utf-8');
            console.log(`✅ Atualizado: ${path.basename(htmlFile)}`);
        }
    }
}

async function main() {
    try {
        const count = await convertImagesToWebP(outDir);
        console.log(`\n✅ ${count} imagens convertidas para WebP!`);

        await updateHTMLReferences();

        console.log('\n🎉 Conversão concluída com sucesso!\n');
    } catch (error) {
        console.error('❌ Erro durante conversão:', error);
        process.exit(1);
    }
}

main();
