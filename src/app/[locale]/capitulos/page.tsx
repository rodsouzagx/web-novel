import { getTranslations } from "next-intl/server";
import { getAllChapters } from "@/lib/sanity/queries";

export const revalidate = 60;

export default async function ChaptersPage() {
  const t = await getTranslations("home");
  const chapters = await getAllChapters();

  // Agrupa capítulos por volume
  const byVolume = chapters.reduce((acc: any, chapter: any) => {
    const vol = chapter.volume || 1;
    if (!acc[vol]) acc[vol] = [];
    acc[vol].push(chapter);
    return acc;
  }, {});

  return (
    <main className="min-h-screen">
      <div className="px-5 py-6 border-b border-zinc-200 dark:border-zinc-800">
        <h1 className="text-xl font-medium mb-1">Capítulos</h1>
        <p className="text-sm text-zinc-500">{chapters.length} capítulos publicados</p>
      </div>

      {Object.entries(byVolume).map(([volume, volumeChapters]: any) => (
        <div key={volume} className="border-b border-zinc-200 dark:border-zinc-800">
          <div className="px-5 py-3">
            <span className="text-xs font-medium text-zinc-500 uppercase tracking-widest">
              volume {volume}
            </span>
          </div>
          <div className="flex flex-col">
            {volumeChapters.map((chapter: any) => (
              <a
                key={chapter._id}
                href={`/pt/capitulos/${chapter.slug}`}
                className="flex items-center justify-between px-5 py-3 border-t border-zinc-100 dark:border-zinc-900 hover:bg-zinc-50 dark:hover:bg-zinc-900"
              >
                <div>
                  <div className="text-xs text-indigo-500 font-medium mb-0.5">
                    capítulo {chapter.chapterNumber}
                  </div>
                  <div className="text-sm font-medium">{chapter.title}</div>
                </div>
                <span className="text-zinc-400">›</span>
              </a>
            ))}
          </div>
        </div>
      ))}

      {chapters.length === 0 && (
        <div className="px-5 py-12 text-center">
          <p className="text-sm text-zinc-500">Nenhum capítulo publicado ainda.</p>
        </div>
      )}
    </main>
  );
}
