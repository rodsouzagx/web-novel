import { getTranslations } from "next-intl/server";
import { getAllChapters, getChapterBySlug } from "@/lib/sanity/queries";
import { PortableText } from "@portabletext/react";
import { notFound } from "next/navigation";
import Comments from "@/components/reader/Comments";
import ShareButton from "@/components/reader/ShareButton";

export const revalidate = 60;

// Gera as páginas estáticas para cada capítulo
export async function generateStaticParams() {
  const chapters = await getAllChapters();
  return chapters.map((chapter: any) => ({
    slug: chapter.slug,
  }));
}

export default async function ChapterPage({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>;
}) {
  const { slug } = await params;
  const chapter = await getChapterBySlug(slug);

  if (!chapter) notFound();

  return (
    <main className="min-h-screen">
      {/* HEADER DO LEITOR */}
      <div className="sticky top-0 z-10 bg-white dark:bg-zinc-950 border-b border-zinc-200 dark:border-zinc-800 px-5 py-3 flex items-center gap-3">
        <a href="/pt/capitulos" className="text-zinc-400 hover:text-zinc-600 text-sm">
          ← voltar
        </a>
        <span className="text-sm font-medium truncate flex-1">
          Cap. {chapter.chapterNumber} · {chapter.title}
        </span>
      </div>

      {/* CONTEÚDO */}
      <div className="max-w-2xl mx-auto px-5 py-10">
        <div className="text-xs text-indigo-500 font-medium mb-1">
          capítulo {chapter.chapterNumber}
        </div>
        <h1 className="text-2xl font-medium mb-8">{chapter.title}</h1>

        <div className="prose prose-zinc dark:prose-invert max-w-none text-base leading-relaxed">
          <PortableText value={chapter.content} />
        </div>

        {/* COMPARTILHAR */}
        <div className="flex justify-end mt-8">
          <ShareButton title={chapter.title} chapterNumber={chapter.chapterNumber} />
        </div>

        {/* NAVEGAÇÃO */}
        <div className="flex justify-between items-center mt-4 pt-6 border-t border-zinc-200 dark:border-zinc-800"></div>
        {/* NAVEGAÇÃO */}
        <div className="flex justify-between items-center mt-12 pt-6 border-t border-zinc-200 dark:border-zinc-800">
          {chapter.prevChapter ? (
            <a
              href={`/pt/capitulos/${chapter.prevChapter}`}
              className="text-sm border border-zinc-300 dark:border-zinc-700 px-4 py-2 rounded-lg hover:bg-zinc-50 dark:hover:bg-zinc-900"
            >
              ← anterior
            </a>
          ) : (
            <div />
          )}
          {chapter.nextChapter ? (
            <a
              href={`/pt/capitulos/${chapter.nextChapter}`}
              className="text-sm bg-indigo-600 text-white px-4 py-2 rounded-lg"
            >
              próximo →
            </a>
          ) : (
            <span className="text-sm text-zinc-400">último capítulo</span>
          )}
        </div>

        {/* COMENTÁRIOS */}
        <Comments chapterId={chapter._id} />
      </div>
    </main>
  );
}
