import { defineType, defineField } from "sanity";

export default defineType({
    name: 'sobreNos',
    title: 'Sobre Nós',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Título Sobre Nós',
            type: 'string',
            description: 'Ex: Sobre Nós',
        }),
        defineField({
            name: 'description',
            title: 'Descricao Sobre Nós',
            type: 'text',
        })
    ],
});