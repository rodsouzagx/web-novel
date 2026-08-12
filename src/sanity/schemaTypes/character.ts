import { defineField, defineType } from "sanity";

export const character = defineType({
  name: "character",
  title: "Personagem",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Nome",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "role",
      title: "Papel na História",
      type: "string",
      options: {
        list: [
          { title: "Protagonista", value: "protagonist" },
          { title: "Antagonista", value: "antagonist" },
          { title: "Aliado", value: "ally" },
          { title: "Coadjuvante", value: "supporting" },
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "description",
      title: "Descrição",
      type: "text",
      rows: 4,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "image",
      title: "Imagem",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "order",
      title: "Ordem de Exibição",
      type: "number",
    }),
  ],
});
