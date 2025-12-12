import { defineField } from "sanity";

export default ({
    name: 'buttons',
    title: 'Buttons',
    type: 'object',
    fields: [
        defineField({
            name: 'buttonText',
            title: 'Texto do Botao',
            type: 'string',
        }),
        defineField({
            name: 'anchorLink',
            title: 'Link para Seção (Anchor)',
            type: 'string',
            description: 'Selecione uma seção da página ou digite um ID customizado',
            options: {
                list: [
                    { title: 'Sobre Nós', value: '#sobre-nos' },
                    { title: 'Projetos', value: '#projetos' },
                    { title: 'FAQ', value: '#faq' },
                ],
            },
        }),
        defineField({
            name: 'internalLink',
            title: 'Pagina Interna',
            type: 'reference',
            to: [{ type: 'projectPage' }]
        }),
        defineField({
            name: 'buttonUrl',
            title: 'Pagina Externa (link)',
            type: 'url',

        }),
    ],
    // preview: {
    //     select: {
    //         title: 'buttonText',
    //         internal: 'internalLink.title',
    //         external: 'externalUrl',
    //     },
    //     prepare({ title, internal, external }: { title: string; internal?: string; external?: string }) {
    //         return {
    //             title: `${title} → ${internal || external}`,
    //         };
    //     },
    // },
});