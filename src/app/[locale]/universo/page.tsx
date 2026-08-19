import { getUniverseData } from "@/lib/sanity/queries";

export const revalidate = 60;

const roleLabels: Record<string, string> = {
  protagonist: "protagonista",
  antagonist: "antagonista",
  ally: "aliado",
  supporting: "coadjuvante",
};

const authorRoleLabels: Record<string, string> = {
  author: "autor",
  editor: "revisão",
  translator: "tradução",
  illustrator: "ilustração",
};

export default async function UniversePage() {
  const [characters, authors, trivia] = await getUniverseData();

  return (
    <main className="min-h-screen">
      <div className="px-5 py-6 border-b border-zinc-200 dark:border-zinc-800">
        <h1 className="text-xl font-medium mb-1">Universo</h1>
        <p className="text-sm text-zinc-500">Conheça o mundo de Epopeia do Fim</p>
      </div>

      {/* SINOPSE */}
      <section className="px-5 py-6 border-b border-zinc-200 dark:border-zinc-800">
        <h2 className="text-xs font-medium text-zinc-500 uppercase tracking-widest mb-4">
          história
        </h2>
        <div className="border-l-2 border-indigo-500 pl-4">
          <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
            Uma história épica de fantasia onde o destino do mundo repousa nas mãos de poucos
            escolhidos. Acompanhe personagens complexos em uma jornada de descoberta, sacrifício e
            redenção.
          </p>
        </div>
      </section>

      {/* PERSONAGENS */}
      <section className="px-5 py-6 border-b border-zinc-200 dark:border-zinc-800">
        <h2 className="text-xs font-medium text-zinc-500 uppercase tracking-widest mb-4">
          personagens
        </h2>
        {characters.length === 0 ? (
          <p className="text-sm text-zinc-500">Nenhum personagem cadastrado ainda.</p>
        ) : (
          <div className="grid grid-cols-2 gap-3">
            {characters.map((char: any) => (
              <div
                key={char._id}
                className="p-3 border border-zinc-200 dark:border-zinc-800 rounded-lg"
              >
                <div className="w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-950 flex items-center justify-center text-indigo-600 font-medium text-sm mb-2">
                  {char.name[0]}
                </div>
                <span className="text-xs bg-indigo-50 dark:bg-indigo-950 text-indigo-600 px-2 py-0.5 rounded-full">
                  {roleLabels[char.role] || char.role}
                </span>
                <h3 className="text-sm font-medium mt-2 mb-1">{char.name}</h3>
                <p className="text-xs text-zinc-500 leading-relaxed">{char.description}</p>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* AUTORES */}
      <section className="px-5 py-6 border-b border-zinc-200 dark:border-zinc-800">
        <h2 className="text-xs font-medium text-zinc-500 uppercase tracking-widest mb-4">
          autores
        </h2>
        {authors.length === 0 ? (
          <p className="text-sm text-zinc-500">Nenhum autor cadastrado ainda.</p>
        ) : (
          <div className="flex flex-col gap-3">
            {authors.map((author: any) => (
              <div
                key={author._id}
                className="flex gap-3 p-3 border border-zinc-200 dark:border-zinc-800 rounded-lg"
              >
                <div className="w-12 h-12 rounded-full bg-indigo-100 dark:bg-indigo-950 flex items-center justify-center text-indigo-600 font-medium flex-shrink-0">
                  {author.name[0]}
                </div>
                <div>
                  <span className="text-xs bg-indigo-50 dark:bg-indigo-950 text-indigo-600 px-2 py-0.5 rounded-full">
                    {authorRoleLabels[author.role] || author.role}
                  </span>
                  <h3 className="text-sm font-medium mt-1 mb-1">{author.name}</h3>
                  <p className="text-xs text-zinc-500 leading-relaxed">{author.bio}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* CURIOSIDADES */}
      <section className="px-5 py-6">
        <h2 className="text-xs font-medium text-zinc-500 uppercase tracking-widest mb-4">
          curiosidades
        </h2>
        {trivia.length === 0 ? (
          <p className="text-sm text-zinc-500">Nenhuma curiosidade cadastrada ainda.</p>
        ) : (
          <div className="flex flex-col gap-3">
            {trivia.map((item: any, index: number) => (
              <div
                key={item._id}
                className="flex gap-3 p-3 border border-zinc-200 dark:border-zinc-800 rounded-lg"
              >
                <span className="text-2xl font-medium text-zinc-300 dark:text-zinc-700 flex-shrink-0 w-8">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="text-sm font-medium mb-1">{item.title}</h3>
                  <p className="text-xs text-zinc-500 leading-relaxed">{item.content}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
