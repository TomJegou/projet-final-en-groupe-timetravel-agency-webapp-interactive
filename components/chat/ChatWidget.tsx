"use client";

import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { MessageCircle, X, Send, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

const QUICK_PROMPTS = [
  "Quelle destination me conseilles-tu pour un premier voyage ?",
  "Comment se passe concrètement un départ temporel ?",
  "Le Crétacé est-il dangereux pour les voyageurs ?",
  "Quelle est la philosophie de l'agence ?",
];

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const { messages, sendMessage, status, error } = useChat({
    transport: new DefaultChatTransport({ api: "/api/chat" }),
  });

  const isLoading = status === "submitted" || status === "streaming";

  useEffect(() => {
    if (open && inputRef.current) {
      inputRef.current.focus();
    }
  }, [open]);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, isLoading]);

  const handleSubmit = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || isLoading) return;
    sendMessage({ text: trimmed });
    setInput("");
  };

  return (
    <>
      <motion.button
        type="button"
        onClick={() => setOpen((v) => !v)}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.6,
          delay: 1,
          ease: [0.22, 1, 0.36, 1],
        }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label={open ? "Fermer le concierge" : "Ouvrir le concierge"}
        className={cn(
          "fixed bottom-6 right-6 z-40 flex h-14 items-center gap-3 rounded-full px-5 shadow-glow transition-colors duration-500",
          open
            ? "bg-ink-veil text-ivory border border-gold/30"
            : "bg-gold text-ink hover:bg-gold-bright",
        )}
      >
        <AnimatePresence mode="wait">
          {open ? (
            <motion.span
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <X className="h-5 w-5" strokeWidth={1.5} />
            </motion.span>
          ) : (
            <motion.span
              key="open"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <MessageCircle className="h-5 w-5" strokeWidth={1.5} />
            </motion.span>
          )}
        </AnimatePresence>
        <span className="hidden text-[10px] uppercase tracking-[0.3em] sm:inline">
          {open ? "Fermer" : "Concierge"}
        </span>
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.96 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="fixed bottom-24 right-6 z-40 flex h-[min(80vh,640px)] w-[calc(100vw-3rem)] flex-col overflow-hidden rounded-3xl glass shadow-card sm:w-[400px]"
          >
            {/* Header */}
            <div className="flex items-center gap-3 border-b border-gold/10 px-5 py-4">
              <span className="flex h-9 w-9 items-center justify-center rounded-full border border-gold/30 bg-ink-soft">
                <Sparkles className="h-4 w-4 text-gold" strokeWidth={1.4} />
              </span>
              <div className="flex flex-col leading-tight">
                <span className="font-serif text-base text-ivory">
                  Aldébaran
                </span>
                <span className="text-[10px] uppercase tracking-[0.3em] text-gold-dim">
                  Concierge temporel
                </span>
              </div>
            </div>

            {/* Messages */}
            <div
              ref={scrollRef}
              className="flex-1 space-y-4 overflow-y-auto px-5 py-6"
            >
              {messages.length === 0 ? (
                <Welcome onPick={handleSubmit} />
              ) : (
                messages.map((m) => <Message key={m.id} message={m} />)
              )}

              {isLoading &&
                messages[messages.length - 1]?.role === "user" && (
                  <Typing />
                )}

              {error && (
                <div className="rounded-2xl border border-red-500/30 bg-red-950/30 px-4 py-3 text-xs text-red-200">
                  Une erreur est survenue : {error.message}
                </div>
              )}
            </div>

            {/* Input */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit(input);
              }}
              className="border-t border-gold/10 bg-ink-soft/40 p-4"
            >
              <div className="flex items-end gap-2 rounded-2xl border border-gold/20 bg-ink p-2 transition-colors focus-within:border-gold/50">
                <textarea
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleSubmit(input);
                    }
                  }}
                  rows={1}
                  placeholder="Posez une question…"
                  className="flex-1 resize-none bg-transparent px-3 py-2 text-sm text-ivory placeholder:text-ivory-mute focus:outline-none"
                  disabled={isLoading}
                />
                <button
                  type="submit"
                  disabled={isLoading || !input.trim()}
                  aria-label="Envoyer"
                  className="flex h-10 w-10 items-center justify-center rounded-xl bg-gold text-ink transition-all duration-300 hover:bg-gold-bright disabled:opacity-30"
                >
                  <Send className="h-4 w-4" strokeWidth={1.5} />
                </button>
              </div>
              <p className="mt-2 px-1 text-[9px] uppercase tracking-[0.25em] text-ivory-mute">
                Mistral · Réponses indicatives
              </p>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function Welcome({ onPick }: { onPick: (text: string) => void }) {
  return (
    <div className="space-y-5 py-2">
      <div className="rounded-2xl border border-hairline bg-ink-soft/60 px-4 py-3">
        <p className="font-serif text-base text-ivory">
          Bienvenue. Je suis Aldébaran, votre concierge temporel.
        </p>
        <p className="mt-2 text-sm text-ivory-mute">
          Posez-moi vos questions sur nos trois destinations, ou laissez-moi
          vous guider vers l&apos;époque qui vous correspond.
        </p>
      </div>
      <div className="space-y-2">
        <p className="text-[10px] uppercase tracking-[0.3em] text-gold-dim">
          Suggestions
        </p>
        {QUICK_PROMPTS.map((prompt) => (
          <button
            key={prompt}
            type="button"
            onClick={() => onPick(prompt)}
            className="block w-full rounded-xl border border-hairline bg-ink-soft/40 px-3 py-2.5 text-left text-xs text-ivory-dim transition-colors hover:border-gold/40 hover:bg-ink-soft hover:text-ivory"
          >
            {prompt}
          </button>
        ))}
      </div>
    </div>
  );
}

function Message({
  message,
}: {
  message: ReturnType<typeof useChat>["messages"][number];
}) {
  const isUser = message.role === "user";
  const text = message.parts
    .map((p) => (p.type === "text" ? p.text : ""))
    .join("");

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className={cn("flex", isUser ? "justify-end" : "justify-start")}
    >
      <div
        className={cn(
          "max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed",
          isUser
            ? "bg-gold text-ink"
            : "border border-hairline bg-ink-soft/60 text-ivory-dim",
        )}
      >
        {text || (
          <span className="italic text-ivory-mute">
            (réponse en cours…)
          </span>
        )}
      </div>
    </motion.div>
  );
}

function Typing() {
  return (
    <div className="flex justify-start">
      <div className="flex items-center gap-1.5 rounded-2xl border border-hairline bg-ink-soft/60 px-4 py-3">
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            animate={{ opacity: [0.3, 1, 0.3], y: [0, -2, 0] }}
            transition={{
              duration: 1.2,
              repeat: Infinity,
              delay: i * 0.15,
              ease: "easeInOut",
            }}
            className="h-1.5 w-1.5 rounded-full bg-gold"
          />
        ))}
      </div>
    </div>
  );
}
