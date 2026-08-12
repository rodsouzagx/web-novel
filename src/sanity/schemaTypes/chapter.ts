import { defineField, defineType } from "sanity";

export const chapter = defineType({
  name: "chapter",
  title: "Capítulo",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Título",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug (URL)",
      type: "slug",
      options: {
        source: "title",
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "chapterNumber",
      title: "Número do Capítulo",
      type: "number",
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: "volume",
      title: "Volume",
      type: "number",
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: "content",
      title: "Conteúdo",
      type: "array",
      of: [{ type: "block" }],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "publishedAt",
      title: "Data de Publicação",
      type: "datetime",
    }),
  ],
  orderings: [
    {
      title: "Número do Capítulo",
      name: "chapterNumberAsc",
      by: [{ field: "chapterNumber", direction: "asc" }],
    },
  ],
});
