import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Home, Phone } from "lucide-react";

export function NotFoundPage() {
  useEffect(() => {
    document.title = "404 — Страница не найдена | Центр БиоСтоматологии";
  }, []);

  return (
    <div className="flex min-h-[60vh] items-center justify-center bg-background px-4 py-16">
      <div className="max-w-md text-center">
        <span className="text-[11px] font-semibold uppercase tracking-[0.3em] text-[var(--gold)]">
          Ошибка 404
        </span>
        <h1 className="mt-2 text-7xl font-bold font-serif text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Страница не найдена</h2>
        <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
          Запрашиваемая страница перемещена или никогда не существовала. Перейдите на главную страницу или свяжитесь с нами.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            to="/"
            className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-sm bg-[var(--gold)] px-6 py-3 text-sm font-medium text-[var(--gold-foreground)] transition-opacity hover:opacity-90 shadow-sm"
          >
            <Home className="h-4 w-4" />
            На главную
          </Link>
          <a
            href="tel:+74996734401"
            className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-sm border border-border bg-card px-5 py-3 text-sm font-medium text-foreground transition hover:border-[var(--gold)]"
          >
            <Phone className="h-4 w-4 text-[var(--gold)]" />
            +7 (499) 673-44-01
          </a>
        </div>
      </div>
    </div>
  );
}
