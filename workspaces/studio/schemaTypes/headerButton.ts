import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'headerButton',
  title: 'Botão do Header',
  type: 'object',
  fields: [
    defineField({
      name: 'buttonText',
      title: 'Texto do Botão',
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
      name: 'buttonUrl',
      title: 'URL do Botão',
      type: 'url',
      validation: Rule =>
        Rule.uri({
          scheme: ['http', 'https', 'mailto', 'tel'],
        }),
    }),
  ],
})
