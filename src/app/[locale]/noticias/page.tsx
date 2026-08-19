import { getTranslations } from "next-intl/server";
import { getAllNews } from "@/lib/sanity/queries";

export const revalidate = 60;

const tagLabels: Record<string, string> = {
  announcement: "anúncio",
  chapter: "capítulo",
  translation: "tradução",
  art: "arte",
};

const tagColors: Record<string, string> = {
  announcement: "bg-indigo-50 dark:bg-indigo-950 text-indigo-600",
  chapter: "bg-green-50 dark:bg-green-950 text-green-600",
  translation: "bg-blue-50 dark:bg-blue-950 text-blue-600",
  art: "bg-pink-50 dark:bg-pink-950 text-pink-600",
};

export default async function NewsPage() {
  const news = await getAllNews();

  return (
    <main className="min-h-screen">
      <div className="px-5 py-6 border-b border-zinc-200 dark:border-zinc-800">
        <h1 className="text-xl font-medium mb-1">Notícias & Atualizações</h1>
        <p className="text-sm text-zinc-500">Fique por dentro de tudo sobre Epopeia do Fim</p>
      </div>

      <div className="flex flex-col divide-y divide-zinc-100 dark:divide-zinc-900">
        {news.length === 0 ? (
          <div className="px-5 py-12 text-center">
            <p className="text-sm text-zinc-500">Nenhuma notícia publicada ainda.</p>
          </div>
        ) : (
          news.map((item: any) => (
            <div key={item._id} className="px-5 py-5">
              <span
                className={`text-xs px-2 py-0.5 rounded-full font-medium ${tagColors[item.tag] || "bg-zinc-100 text-zinc-600"}`}
              >
                {tagLabels[item.tag] || item.tag}
              </span>
              <h2 className="text-sm font-medium mt-2 mb-1">{item.title}</h2>
              <p className="text-sm text-zinc-500 leading-relaxed">{item.excerpt}</p>
              <span className="text-xs text-zinc-400 mt-2 block">
                {new Date(item.publishedAt).toLocaleDateString("pt-BR", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </span>
            </div>
          ))
        )}
      </div>
    </main>
  );
}
