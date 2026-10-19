import { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Phone, Menu, X, Mail, MapPin, Clock } from "lucide-react";
import logoImg from "@/assets/logo.png";
import { useBooking } from "@/components/site/BookingContext";

const NAV_LINKS = [
  { label: "Главная", to: "/" },
  { label: "Услуги", to: "/services" },
  { label: "Цены", to: "/prices" },
  { label: "О клинике", to: "/about" },
  { label: "Контакты", to: "/contacts" },
];

export function Logo() {
  return (
    <Link to="/" className="inline-flex items-center gap-3">
      <img
        src={logoImg}
        alt="Центр БиоСтоматологии"
        width={160}
        height={42}
        className="h-9 w-auto object-contain sm:h-10"
      />
    </Link>
  );
}

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const booking = useBooking();
  const location = useLocation();

  useEffect(() => {
    setOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location.pathname]);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/80 bg-background/95 backdrop-blur-md transition-all">
      <div className="mx-auto flex h-20 max-w-[1240px] items-center justify-between px-4 sm:px-6">
        <Logo />

        <nav className="hidden items-center gap-7 lg:flex">
          {NAV_LINKS.map(({ label, to }) => (
            <NavLink
              key={to}
              to={to}
              end={to === "/"}
              className={({ isActive }) =>
                `text-sm font-medium transition-colors hover:text-[var(--gold)] ${
                  isActive ? "text-[var(--gold)] font-semibold" : "text-foreground/80"
                }`
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-3 sm:gap-4">
          <a
            href="tel:+74996734401"
            className="hidden text-right xl:block transition-colors hover:text-[var(--gold)]"
          >
            <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
              <Phone className="h-4 w-4 text-[var(--gold)]" /> +7 (499) 673-44-01
            </div>
            <div className="text-[11px] text-muted-foreground">Пн–Сб с 9:00 до 21:00</div>
          </a>

          <a
            href="tel:+74996734401"
            aria-label="Позвонить в клинику"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[var(--gold)]/10 text-[var(--gold)] md:hidden transition-transform active:scale-95"
          >
            <Phone className="h-4 w-4" />
          </a>

          <button
            type="button"
            onClick={() => booking.open({ formType: "appointment" })}
            className="hidden sm:inline-flex items-center justify-center rounded-sm bg-[var(--gold)] px-5 py-2.5 text-sm font-medium text-[var(--gold-foreground)] transition-all hover:opacity-90 shadow-sm hover:shadow"
          >
            Записаться<span className="hidden md:inline">&nbsp;на приём</span>
          </button>

          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label="Открыть мобильное меню"
            className="inline-flex h-10 w-10 items-center justify-center rounded-sm border border-border text-foreground lg:hidden"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Мобильное меню */}
      {open && (
        <div
          className="fixed inset-0 z-[999] flex min-h-dvh w-screen flex-col overflow-hidden bg-background lg:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Меню навигации"
        >
          <div className="flex h-16 shrink-0 items-center justify-between border-b border-border bg-background px-4 shadow-sm">
            <Logo />
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Закрыть меню"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card text-foreground"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <nav className="flex-1 overflow-y-auto bg-background px-4 py-5">
            <div className="space-y-2">
              {NAV_LINKS.map(({ label, to }, index) => (
                <NavLink
                  key={to}
                  to={to}
                  end={to === "/"}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `flex min-h-14 items-center justify-between rounded-sm border bg-card px-4 text-base font-semibold shadow-sm transition-colors ${
                      isActive
                        ? "border-[var(--gold)] text-[var(--gold)]"
                        : "border-border text-foreground hover:border-[var(--gold)]/40"
                    }`
                  }
                >
                  <span className="flex items-center gap-3">
                    <span className="text-xs font-medium text-[var(--gold)]">
                      0{index + 1}
                    </span>
                    {label}
                  </span>
                  <span className="text-xl leading-none text-[var(--gold)]">→</span>
                </NavLink>
              ))}
            </div>
          </nav>

          <div className="shrink-0 space-y-3 border-t border-border bg-background px-4 py-5 shadow-[0_-8px_24px_rgba(0,0,0,0.06)]">
            <a
              href="tel:+74996734401"
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 rounded-sm border border-border bg-card p-3"
            >
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[var(--gold)]/10 text-[var(--gold)]">
                <Phone className="h-4 w-4" />
              </span>
              <span>
                <span className="block text-sm font-semibold text-foreground">
                  +7 (499) 673-44-01
                </span>
                <span className="block text-[11px] text-muted-foreground">
                  Пн–Сб с 9:00 до 21:00 (Вс — выходной)
                </span>
              </span>
            </a>

            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => {
                  setOpen(false);
                  booking.open({ formType: "appointment" });
                }}
                className="flex items-center justify-center rounded-sm bg-[var(--gold)] px-3 py-3 text-xs font-medium text-[var(--gold-foreground)] transition-opacity hover:opacity-90"
              >
                Записаться
              </button>
              <button
                type="button"
                onClick={() => {
                  setOpen(false);
                  booking.open({ formType: "callback" });
                }}
                className="flex items-center justify-center rounded-sm border border-border bg-card px-3 py-3 text-xs font-medium text-foreground transition-colors hover:border-[var(--gold)]"
              >
                Заказать звонок
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="bg-[var(--navy-deep)] text-white/80">
      <div className="mx-auto grid max-w-[1240px] gap-8 px-4 py-12 sm:gap-10 sm:px-6 sm:py-14 md:grid-cols-3">
        <div className="space-y-4 text-sm md:col-span-1">
          <Logo />
          <p className="text-xs leading-relaxed text-white/60">
            Центр стоматологии полного цикла у метро Марьина Роща в Москве. Лечение под микроскопом, швейцарская имплантация, ортодонтия и эстетика по международным протоколам.
          </p>
          <div className="text-xs text-white/50 space-y-1 pt-1">
            <div>Лицензия: № Л041-01137-77 / 77/00360298</div>
            <div>ООО «Центр БиоСтоматологии»</div>
          </div>
        </div>

        <div className="space-y-3 text-sm">
          <div className="font-serif text-base font-semibold text-white">Контакты и режим</div>
          <a href="tel:+74996734401" className="flex items-center gap-2 hover:text-[var(--gold)] transition-colors">
            <Phone className="h-4 w-4 text-[var(--gold)]" />
            <span>+7 (499) 673-44-01</span>
          </a>
          <a
            href="mailto:admin@cbstom.ru"
            className="flex items-center gap-2 hover:text-[var(--gold)] transition-colors"
          >
            <Mail className="h-4 w-4 text-[var(--gold)]" />
            <span>admin@cbstom.ru</span>
          </a>
          <a
            href="https://yandex.ru/maps/?rtext=~55.789760%2C37.614529&rtt=auto"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-start gap-2 hover:text-[var(--gold)] transition-colors"
          >
            <MapPin className="mt-0.5 h-4 w-4 text-[var(--gold)] shrink-0" />
            <span>127473, Москва, ул. Октябрьская, 36 (м. Марьина Роща, 5 мин. пешком)</span>
          </a>
          <div className="flex items-start gap-2 text-white/70">
            <Clock className="mt-0.5 h-4 w-4 text-[var(--gold)] shrink-0" />
            <span>Пн–Сб с 9:00 до 21:00, Воскресенье — выходной</span>
          </div>
        </div>

        <div className="space-y-3 text-sm">
          <div className="font-serif text-base font-semibold text-white">Разделы сайта</div>
          {NAV_LINKS.map(({ label, to }) => (
            <Link key={to} to={to} className="block text-white/70 hover:text-[var(--gold)] transition-colors">
              {label}
            </Link>
          ))}
          <div className="pt-2 space-y-1.5">
            <Link to="/prices" className="block text-xs text-[var(--gold)] hover:underline">
              Смотреть прейскурант цен →
            </Link>
            <Link to="/privacy-policy" className="block text-xs text-white/60 hover:text-[var(--gold)] transition-colors">
              Политика конфиденциальности
            </Link>
            <Link to="/consent" className="block text-xs text-white/60 hover:text-[var(--gold)] transition-colors">
              Согласие на обработку данных
            </Link>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-[1240px] px-4 pb-10 sm:px-6">
        <div className="relative overflow-hidden rounded-sm border border-white/10 shadow-lg">
          <iframe
            title="Центр Биостоматологии на Яндекс.Картах"
            src="https://yandex.ru/map-widget/v1/?ll=37.614529%2C55.789760&mode=search&oid=39640787211&ol=biz&z=17.28"
            className="h-[220px] w-full sm:h-[280px]"
            loading="lazy"
            allowFullScreen
          />
        </div>
      </div>

      <div className="border-t border-white/10 py-6 text-center text-xs text-white/50 px-4">
        <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 mb-2 text-white/70">
          <Link to="/privacy-policy" className="hover:text-[var(--gold)] transition-colors">
            Политика конфиденциальности
          </Link>
          <span className="text-white/20 hidden sm:inline">·</span>
          <Link to="/consent" className="hover:text-[var(--gold)] transition-colors">
            Согласие на обработку персональных данных
          </Link>
        </div>
        <div>
          © {new Date().getFullYear()} ООО «Центр БиоСтоматологии». Все права защищены. Сайт разработан для публикации на https://cbstom.ru/
        </div>
      </div>
    </footer>
  );
}

export function PageHero({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
}) {
  return (
    <section className="bg-background">
      <div className="mx-auto max-w-[1240px] px-4 pb-10 pt-10 sm:px-6 sm:pb-14 sm:pt-14">
        <div className="rounded-sm bg-[#eaf2fb] px-6 py-10 sm:px-10 sm:py-14 shadow-sm">
          <span className="text-[11px] font-semibold uppercase tracking-[0.3em] text-[var(--gold)]">
            {eyebrow}
          </span>
          <h1 className="mt-3 font-serif text-[26px] font-medium leading-tight text-foreground sm:text-3xl md:text-[42px]">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
              {subtitle}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
