import { defineField, defineType } from "sanity";

export const trivia = defineType({
  name: "trivia",
  title: "Curiosidade",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Título",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "content",
      title: "Conteúdo",
      type: "text",
      rows: 4,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "order",
      title: "Ordem de Exibição",
      type: "number",
    }),
  ],
});
