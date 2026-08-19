import { client } from "@/sanity/lib/client";
import { groq } from "next-sanity";

// Busca os capítulos mais recentes para a homepage
export async function getRecentChapters(limit = 3) {
  return client.fetch(
    groq`*[_type == "chapter"] | order(chapterNumber desc) [0...$limit] {
      _id,
      title,
      chapterNumber,
      volume,
      "slug": slug.current,
      publishedAt
    }`,
    { limit },
  );
}

// Busca todos os capítulos para o índice
export async function getAllChapters() {
  return client.fetch(
    groq`*[_type == "chapter"] | order(chapterNumber asc) {
      _id,
      title,
      chapterNumber,
      volume,
      "slug": slug.current,
      publishedAt
    }`,
  );
}

// Busca um capítulo pelo slug para o leitor
export async function getChapterBySlug(slug: string) {
  return client.fetch(
    groq`*[_type == "chapter" && slug.current == $slug][0] {
      _id,
      title,
      chapterNumber,
      volume,
      content,
      publishedAt,
      "prevChapter": *[_type == "chapter" && chapterNumber == ^.chapterNumber - 1][0].slug.current,
      "nextChapter": *[_type == "chapter" && chapterNumber == ^.chapterNumber + 1][0].slug.current
    }`,
    { slug },
  );
}

// Busca as notícias mais recentes para a homepage
export async function getRecentNews(limit = 2) {
  return client.fetch(
    groq`*[_type == "news"] | order(publishedAt desc) [0...$limit] {
      _id,
      title,
      tag,
      excerpt,
      "slug": slug.current,
      publishedAt
    }`,
    { limit },
  );
}

// Busca todas as notícias
export async function getAllNews() {
  return client.fetch(
    groq`*[_type == "news"] | order(publishedAt desc) {
      _id,
      title,
      tag,
      excerpt,
      "slug": slug.current,
      publishedAt
    }`,
  );
}

// Busca dados da página universo
export async function getUniverseData() {
  return Promise.all([
    client.fetch(groq`*[_type == "character"] | order(order asc) {
      _id,
      name,
      role,
      description
    }`),
    client.fetch(groq`*[_type == "author"] {
      _id,
      name,
      role,
      bio
    }`),
    client.fetch(groq`*[_type == "trivia"] | order(order asc) {
      _id,
      title,
      content
    }`),
  ]);
}
