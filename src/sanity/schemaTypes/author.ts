import { defineField, defineType } from "sanity";

export const author = defineType({
  name: "author",
  title: "Autor",
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
      title: "Função",
      type: "string",
      options: {
        list: [
          { title: "Autor", value: "author" },
          { title: "Revisor", value: "editor" },
          { title: "Tradutor", value: "translator" },
          { title: "Ilustrador", value: "illustrator" },
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "bio",
      title: "Biografia",
      type: "text",
      rows: 4,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "avatar",
      title: "Foto",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
  ],
});
