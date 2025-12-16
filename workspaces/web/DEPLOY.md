# 🚀 Deploy para Hostinger Business

Este guia explica como fazer deploy do site Next.js na Hostinger Business usando Static Export.

## 📋 Pré-requisitos

- Node.js instalado localmente
- Acesso ao painel da Hostinger
- Domínio configurado na Hostinger

## 🔧 Como Funciona

Este projeto usa **Static Export** do Next.js, que converte todo o site em arquivos HTML/CSS/JS estáticos compatíveis com a hospedagem compartilhada da Hostinger.

### ⚠️ Importante Saber

- ✅ Site funcionará normalmente com dados do Sanity
- 🔄 Conteúdo do Sanity é "congelado" no momento do build
- 📦 Para atualizar o site com novos dados do Sanity = Novo build + Upload

## 🚀 Processo de Deploy (Simplificado)

### 1️⃣ Gerar Build para Hostinger

Execute um único comando:

```bash
npm run deploy-hostinger
```

Esse comando fará:
- ✅ Build do Next.js em modo estático
- ✅ Criação automática do arquivo ZIP
- ✅ Arquivo salvo como `hostinger-deploy-YYYY-MM-DD.zip`

### 2️⃣ Upload na Hostinger

**Via File Manager (Recomendado)**:

1. Acesse o **hPanel** da Hostinger
2. Vá em **Arquivos** → **Gerenciador de Arquivos**
3. Navegue até a pasta `public_html`
4. **Importante**: Delete TODOS os arquivos antigos dentro de `public_html`
5. Clique em **Upload de Arquivos**
6. Selecione o arquivo `hostinger-deploy-YYYY-MM-DD.zip`
7. Após upload, clique com botão direito no ZIP → **Extrair**
8. Selecione extrair para `public_html`
9. Delete o arquivo ZIP após extrair

**Via FTP** (Alternativa):

1. Use um cliente FTP como FileZilla
2. Credenciais em: hPanel → **Arquivos** → **Contas FTP**
3. Conecte ao servidor
4. Navegue até `/public_html`
5. Delete arquivos antigos
6. Extraia o conteúdo do ZIP **localmente** primeiro
7. Faça upload de TODOS os arquivos da pasta `out/`

### 3️⃣ Configurar .htaccess (Opcional)

Se as rotas não funcionarem corretamente, crie/edite o arquivo `.htaccess` dentro de `public_html`:

```apache
# Habilitar rewrite
RewriteEngine On

# Redirecionar para HTTPS (recomendado)
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]

# Servir index.html para rotas sem extensão
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^([^\.]+)$ $1.html [NC,L]

# Cache de arquivos estáticos
<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType image/jpg "access plus 1 year"
  ExpiresByType image/jpeg "access plus 1 year"
  ExpiresByType image/png "access plus 1 year"
  ExpiresByType image/webp "access plus 1 year"
  ExpiresByType video/mp4 "access plus 1 year"
  ExpiresByType text/css "access plus 1 month"
  ExpiresByType application/javascript "access plus 1 month"
</IfModule>
```

## 🔄 Atualizar Site com Novo Conteúdo do Sanity

Sempre que o conteúdo for atualizado no Sanity:

```bash
npm run deploy-hostinger
```

Depois, faça upload do novo ZIP na Hostinger (repita o processo do passo 2).

## ✅ Verificação Pós-Deploy

Após o deploy, verifique:

- [ ] Site abre no navegador sem erros
- [ ] Todas as páginas funcionam (home, /projects)
- [ ] Imagens e vídeos carregam corretamente
- [ ] Links e botões funcionam
- [ ] Smooth scroll funciona nos links âncora
- [ ] Site responsivo funciona (mobile/desktop)
- [ ] Google Analytics está rastreando (se configurado)

## 🐛 Solução de Problemas

### Erro 404 nas páginas
- Adicione o `.htaccess` conforme instruções acima

### Imagens não carregam
- Verifique se os arquivos da pasta `_next/static/` foram todos enviados
- Verifique permissões dos arquivos (devem ser 644)

### Site em branco
- Verifique o console do navegador (F12) para erros
- Certifique-se que extraiu o ZIP corretamente na pasta `public_html`

### Mudanças no Sanity não aparecem
- Lembre-se: precisa fazer novo build (`npm run deploy-hostinger`) e upload

## 📞 Suporte

- Documentação Next.js Static Export: https://nextjs.org/docs/app/building-your-application/deploying/static-exports
- Suporte Hostinger: https://www.hostinger.com.br/tutoriais/
