"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import type { User } from "@supabase/supabase-js";

interface Comment {
  id: string;
  content: string;
  created_at: string;
  profiles: {
    username: string | null;
  } | null;
}

interface CommentsProps {
  chapterId: string;
}

export default function Comments({ chapterId }: CommentsProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const supabase = createClient();

  useEffect(() => {
    // Busca usuário logado
    supabase.auth.getUser().then(({ data }) => setUser(data.user));

    // Busca comentários
    fetchComments();

    // Realtime — novos comentários aparecem automaticamente
    const channel = supabase
      .channel(`comments:${chapterId}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "comments",
          filter: `chapter_id=eq.${chapterId}`,
        },
        (payload) => {
          setComments((prev) => [...prev, payload.new as Comment]);
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [chapterId]);

  async function fetchComments() {
    const { data } = await supabase
      .from("comments")
      .select("id, content, created_at, profiles(username)")
      .eq("chapter_id", chapterId)
      .order("created_at", { ascending: true });

    if (data) setComments(data as unknown as Comment[]);
  }

  async function handleSubmit() {
    if (!content.trim() || !user) return;
    setLoading(true);

    await supabase.from("comments").insert({
      chapter_id: chapterId,
      user_id: user.id,
      content: content.trim(),
    });

    setContent("");
    setLoading(false);
  }

  async function handleDelete(commentId: string) {
    await supabase.from("comments").delete().eq("id", commentId);
    setComments((prev) => prev.filter((c) => c.id !== commentId));
  }

  return (
    <div className="mt-12 pt-8 border-t border-zinc-200 dark:border-zinc-800">
      <h2 className="text-sm font-medium mb-6">Comentários ({comments.length})</h2>

      {/* LISTA DE COMENTÁRIOS */}
      <div className="flex flex-col gap-4 mb-8">
        {comments.length === 0 ? (
          <p className="text-sm text-zinc-500">Nenhum comentário ainda. Seja o primeiro!</p>
        ) : (
          comments.map((comment) => (
            <div key={comment.id} className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-950 flex items-center justify-center text-indigo-600 text-xs font-medium flex-shrink-0">
                {(comment.profiles?.username ?? "U")[0].toUpperCase()}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-medium">
                    {comment.profiles?.username ?? "Usuário"}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-zinc-400">
                      {new Date(comment.created_at).toLocaleDateString("pt-BR")}
                    </span>
                    {user?.id && (
                      <button
                        onClick={() => handleDelete(comment.id)}
                        className="text-xs text-red-400 hover:text-red-600"
                      >
                        deletar
                      </button>
                    )}
                  </div>
                </div>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  {comment.content}
                </p>
              </div>
            </div>
          ))
        )}
      </div>

      {/* INPUT DE COMENTÁRIO */}
      {user ? (
        <div className="flex gap-3">
          <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-white text-xs font-medium flex-shrink-0">
            {user.email?.[0].toUpperCase()}
          </div>
          <div className="flex-1">
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Escreva um comentário..."
              rows={3}
              className="w-full text-sm px-3 py-2 border border-zinc-200 dark:border-zinc-800 rounded-lg bg-transparent resize-none focus:outline-none focus:border-indigo-400"
            />
            <div className="flex justify-end mt-2">
              <button
                onClick={handleSubmit}
                disabled={loading || !content.trim()}
                className="text-xs bg-indigo-600 text-white px-4 py-2 rounded-lg disabled:opacity-50"
              >
                {loading ? "enviando..." : "comentar"}
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center py-6 border border-zinc-200 dark:border-zinc-800 rounded-lg">
          <p className="text-sm text-zinc-500 mb-3">Faça login para deixar um comentário</p>
          <a href="/pt/login" className="text-xs bg-indigo-600 text-white px-4 py-2 rounded-lg">
            entrar
          </a>
        </div>
      )}
    </div>
  );
}
