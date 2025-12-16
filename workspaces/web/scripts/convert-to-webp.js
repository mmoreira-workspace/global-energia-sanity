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

        // Substituir APENAS referências LOCAIS de imagens por WebP
        // NÃO substituir URLs do Sanity CDN (cdn.sanity.io)
        const replacements = [
            {
                pattern: /(?<!cdn\.sanity\.io[^"']*)(\.png)(?![^<]*cdn\.sanity\.io)/gi,
                replacement: '.webp'
            },
            {
                pattern: /(?<!cdn\.sanity\.io[^"']*)(\.jpg)(?![^<]*cdn\.sanity\.io)/gi,
                replacement: '.webp'
            },
            {
                pattern: /(?<!cdn\.sanity\.io[^"']*)(\.jpeg)(?![^<]*cdn\.sanity\.io)/gi,
                replacement: '.webp'
            },
        ];

        for (const { pattern, replacement } of replacements) {
            // Substituir apenas referências que NÃO contenham cdn.sanity.io
            content = content.replace(pattern, (match, ext, offset) => {
                // Pegar contexto ao redor (50 chars antes e depois)
                const context = content.substring(Math.max(0, offset - 50), Math.min(content.length, offset + 50));

                // Se o contexto contém cdn.sanity.io, NÃO substituir
                if (context.includes('cdn.sanity.io')) {
                    return match;
                }

                updated = true;
                return replacement;
            });
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
