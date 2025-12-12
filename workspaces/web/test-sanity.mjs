// Script de teste para verificar dados do Sanity
// Execute com: node test-sanity.mjs

import { createClient } from '@sanity/client';

const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'seu-project-id',
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
    apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01',
    useCdn: false,
});

const query = `
*[_type == "siteSettings"][0]{
  footerText,
  "logoUrl": logo.asset->url,
  headerButtons[]{
    buttonText,
    anchorLink,
    buttonUrl
  }
}
`;

try {
    const result = await client.fetch(query);
    console.log('=== DADOS DO SANITY ===');
    console.log(JSON.stringify(result, null, 2));
    console.log('\n=== HEADER BUTTONS ===');
    console.log(JSON.stringify(result.headerButtons, null, 2));
} catch (error) {
    console.error('Erro ao buscar dados:', error);
}
