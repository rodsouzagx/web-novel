import { getTranslations } from "next-intl/server";
import { getRecentChapters, getRecentNews } from "@/lib/sanity/queries";

export const revalidate = 60;

export default async function HomePage() {
  const t = await getTranslations("home");
  const [recentChapters, recentNews] = await Promise.all([getRecentChapters(3), getRecentNews(2)]);

  return (
    <main className="min-h-screen">
      <section className="flex flex-col items-center text-center px-5 py-12 border-b border-zinc-200 dark:border-zinc-800">
        <div className="w-24 h-36 bg-indigo-600 rounded-lg flex items-end p-2 mb-5">
          <span className="text-white text-xs font-medium leading-tight">Epopeia do Fim</span>
        </div>
        <h1 className="text-2xl font-medium mb-2">Epopeia do Fim</h1>
        <p className="text-sm text-zinc-500 max-w-sm mb-5 leading-relaxed">
          Uma web novel épica de fantasia. Acompanhe a jornada de seus personagens em um mundo à
          beira do colapso.
        </p>
        <div className="flex gap-3">
          <a href="/pt/capitulos" className="bg-indigo-600 text-white text-sm px-4 py-2 rounded-lg">
            {t("read_now")}
          </a>
          <a
            href="/pt/universo"
            className="border border-zinc-300 dark:border-zinc-700 text-sm px-4 py-2 rounded-lg"
          >
            {t("universe")}
          </a>
        </div>
      </section>

      <section className="px-5 py-6 border-b border-zinc-200 dark:border-zinc-800">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xs font-medium text-zinc-500 uppercase tracking-widest">
            {t("recent_chapters")}
          </h2>
          <a href="/pt/capitulos" className="text-xs text-indigo-500">
            {t("see_all")} →
          </a>
        </div>
        <div className="flex flex-col gap-2">
          {recentChapters.length === 0 ? (
            <p className="text-sm text-zinc-500">Nenhum capítulo publicado ainda.</p>
          ) : (
            recentChapters.map((chapter: any) => (
              <a
                key={chapter._id}
                href={`/pt/capitulos/${chapter.slug}`}
                className="flex items-center justify-between p-3 bg-zinc-50 dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700"
              >
                <div>
                  <div className="text-xs text-indigo-500 font-medium mb-1">
                    capítulo {chapter.chapterNumber}
                  </div>
                  <div className="text-sm font-medium">{chapter.title}</div>
                </div>
                <span className="text-zinc-400">›</span>
              </a>
            ))
          )}
        </div>
      </section>

      <section className="px-5 py-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xs font-medium text-zinc-500 uppercase tracking-widest">
            {t("latest_news")}
          </h2>
          <a href="/pt/noticias" className="text-xs text-indigo-500">
            {t("see_all")} →
          </a>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {recentNews.length === 0 ? (
            <p className="text-sm text-zinc-500 col-span-2">Nenhuma notícia publicada ainda.</p>
          ) : (
            recentNews.map((news: any) => (
              <div
                key={news._id}
                className="p-3 border border-zinc-200 dark:border-zinc-800 rounded-lg"
              >
                <span className="text-xs bg-indigo-50 dark:bg-indigo-950 text-indigo-600 px-2 py-0.5 rounded-full">
                  {news.tag}
                </span>
                <h3 className="text-xs font-medium mt-2 leading-snug">{news.title}</h3>
                <p className="text-xs text-zinc-500 mt-1 leading-relaxed">{news.excerpt}</p>
              </div>
            ))
          )}
        </div>
      </section>
    </main>
  );
}
