import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'projectPage',
  title: 'Projeto de Energia Solar',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Título do Projeto',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Descrição',
      type: 'text',
    }),
    defineField({
      name: 'location',
      title: 'Localização',
      type: 'string',
    }),
    defineField({
      name: 'category',
      title: 'Categoria',
      type: 'string',
      options: {
        list: ['Residencial', 'Comercial', 'Industrial', 'Rural'],
        layout: 'radio',
      },
    }),
    defineField({
      name: 'mainImage',
      title: 'Imagem Principal',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'gallery',
      title: 'Galeria de Imagens',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
    }),
    defineField({
      name: 'date',
      title: 'Data do Projeto',
      type: 'datetime',
    }),
  ],
});
