import { defineType, defineField } from "sanity";

export default defineType({
    name: 'projetos',
    title: 'Projetos',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Project Title',
            type: 'string',
        }),
        defineField({
            name: 'description',
            title: 'Project Description',
            type: 'text',
        }),
        defineField({
            name: 'image1',
            title: 'Imagem 1',
            type: 'image',
            options: {
                hotspot: true,
            },
        }),
        defineField({
            name: 'image2',
            title: 'Imagem 2',
            type: 'image',
            options: {
                hotspot: true,
            },
        }),
        defineField({
            name: 'projectList',
            title: 'Lista de Projetos para o Carrossel',
            type: 'array',
            description: 'Selecione os projetos que aparecerão no carrossel da home page',
            of: [{
                type: 'reference',
                to: [{ type: 'projectPage' }]
            }],
        }),
        defineField({
            name: 'buttons',
            title: 'Solicitar orçamento',
            type: 'array',
            of: [{ type: 'buttons' }],
        })
    ],
});