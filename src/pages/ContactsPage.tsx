import { useEffect } from "react";
import { Phone, Mail, MapPin, Clock, Navigation, CalendarCheck } from "lucide-react";
import { PageHero } from "@/components/site/Layout";
import { useBooking } from "@/components/site/BookingContext";

export function ContactsPage() {
  const booking = useBooking();

  useEffect(() => {
    document.title = "Контакты, адрес и схема проезда — Центр БиоСтоматологии (Москва)";
  }, []);

  const items = [
    {
      icon: Phone,
      label: "Телефон",
      value: "+7 (499) 673-44-01",
      href: "tel:+74996734401",
      note: "Звонок бесплатный по РФ",
    },
    {
      icon: Mail,
      label: "Электронная почта",
      value: "admin@cbstom.ru",
      href: "mailto:admin@cbstom.ru",
      note: "Для обращений и снимков",
    },
    {
      icon: MapPin,
      label: "Адрес клиники",
      value: "Москва, ул. Октябрьская, 36",
      href: "https://yandex.ru/maps/?rtext=~55.789760%2C37.614529&rtt=auto",
      note: "м. Марьина Роща (5 мин)",
    },
    {
      icon: Clock,
      label: "Часы приёма",
      value: "Пн–Сб: 9:00 – 21:00",
      note: "Воскресенье — выходной",
    },
  ];

  const requisites: [string, string][] = [
    ["Полное наименование организации", "Общество с ограниченной ответственностью «Центр БиоСтоматологии»"],
    ["Сокращенное наименование", "ООО «Центр БиоСтоматологии»"],
    ["Юридический адрес", "127473, г. Москва, ул. Октябрьская, д. 36"],
    ["Фактический и почтовый адрес", "127473, г. Москва, ул. Октябрьская, д. 36"],
    ["Генеральный директор", "Симакова Татьяна Геннадьевна"],
    ["ИНН", "9731066155"],
    ["КПП", "771501001"],
    ["ОГРН", "1207700219275"],
    ["ОКПО", "44620531"],
    ["ОКВЭД", "86.23 (Стоматологическая практика)"],
    ["Расчетный счет", "40702810038000171144"],
    ["Наименование банка", "ПАО «Сбербанк России» г. Москва"],
    ["Корреспондентский счет", "30101810400000000225"],
    ["БИК", "044525225"],
    ["Лицензия на медицинскую деятельность", "№ Л041-01137-77 / 77/00360298"],
  ];

  return (
    <>
      <PageHero
        eyebrow="Контакты"
        title={
          <>
            Клиника у метро
            <br />
            Марьина Роща
          </>
        }
        subtitle="Удобно добраться на метро или автомобиле. Находимся в 5 минутах пешком от станции метро Марьина Роща. Записаться можно по телефону или через форму обратной связи."
      />

      {/* Быстрые контакты */}
      <section className="bg-background py-12 sm:py-20">
        <div className="mx-auto max-w-[1240px] px-4 sm:px-6">
          <div className="grid gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
            {items.map(({ icon: Icon, label, value, href, note }) => {
              const inner = (
                <>
                  <div className="flex h-12 w-12 items-center justify-center rounded-full border border-[var(--gold)]/30 text-[var(--gold)]">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="mt-4 text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                    {label}
                  </div>
                  <div className="mt-1 font-serif text-base font-semibold leading-snug text-foreground">
                    {value}
                  </div>
                  {note && (
                    <div className="mt-1 text-xs text-muted-foreground">{note}</div>
                  )}
                </>
              );

              return href ? (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="rounded-sm border border-border bg-card p-6 transition duration-300 hover:border-[var(--gold)]/50 hover:shadow-md block"
                >
                  {inner}
                </a>
              ) : (
                <div key={label} className="rounded-sm border border-border bg-card p-6 shadow-sm">
                  {inner}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Как добраться и карта */}
      <section className="bg-surface py-12 sm:py-20">
        <div className="mx-auto grid max-w-[1240px] gap-10 px-4 sm:px-6 md:grid-cols-[1fr_1fr] md:gap-12 items-center">
          <div>
            <span className="text-[11px] font-semibold uppercase tracking-[0.3em] text-[var(--gold)]">
              Схема проезда
            </span>
            <h2 className="mt-3 font-serif text-2xl font-medium leading-tight text-foreground sm:text-3xl">
              От метро Марьина Роща —<br />всего 5 минут пешком
            </h2>
            <div className="mt-6 space-y-4 text-sm leading-relaxed text-muted-foreground">
              <p>
                <strong>Пешком:</strong> Последний вагон из центра (если едете по Люблинско-Дмитровской линии) или выход из БКЛ к улице Октябрьская (выход № 4).
              </p>
              <p>
                Выйдя на поверхность, следуйте до первого светофора, перейдите дорогу и двигайтесь прямо по улице Октябрьская до дома № 36.
              </p>
              <p>
                На фасаде здания размещена заметная вывеска <strong>«Центр БиоСтоматологии»</strong>. Вход со стороны улицы Октябрьская.
              </p>
              <p>
                <strong>На автомобиле:</strong> Удобный подъезд с ТТК (Сущёвский вал) и улицы Советской Армии. Вдоль улицы доступна городская парковка.
              </p>
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={() => booking.open({ formType: "appointment" })}
                className="inline-flex items-center justify-center gap-2 rounded-sm bg-[var(--gold)] px-6 py-3.5 text-sm font-medium text-[var(--gold-foreground)] transition-opacity hover:opacity-90 shadow-sm"
              >
                <CalendarCheck className="h-4 w-4" />
                Записаться на приём
              </button>
              <a
                href="https://yandex.ru/maps/?rtext=~55.789760%2C37.614529&rtt=auto"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-sm border border-border bg-card px-6 py-3.5 text-sm font-medium text-foreground transition hover:border-[var(--gold)]/50 hover:text-[var(--gold)]"
              >
                <Navigation className="h-4 w-4" />
                Построить маршрут в Яндекс Картах
              </a>
            </div>
          </div>

          <div className="overflow-hidden rounded-sm border border-border shadow-lg">
            <iframe
              title="Центр БиоСтоматологии на Яндекс.Картах"
              src="https://yandex.ru/map-widget/v1/?ll=37.614529%2C55.789760&mode=search&oid=39640787211&ol=biz&z=17.28"
              className="h-[360px] w-full sm:h-[440px]"
              loading="lazy"
              allowFullScreen
            />
          </div>
        </div>
      </section>

      {/* Реквизиты клиники */}
      <section className="bg-background py-12 sm:py-20">
        <div className="mx-auto max-w-[1040px] px-4 sm:px-6">
          <div className="text-center">
            <span className="text-[11px] font-semibold uppercase tracking-[0.3em] text-[var(--gold)]">
              Официальные данные
            </span>
            <h2 className="mt-3 font-serif text-2xl font-medium text-foreground sm:text-3xl">
              Реквизиты организации
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-muted-foreground">
              Юридические сведения и банковские реквизиты ООО «Центр БиоСтоматологии»
            </p>
          </div>

          <div className="mt-8 overflow-hidden rounded-sm border border-border bg-card shadow-sm">
            <dl className="divide-y divide-border">
              {requisites.map(([k, v]) => (
                <div
                  key={k}
                  className="grid grid-cols-1 gap-1 px-5 py-4 sm:grid-cols-[280px_1fr] sm:gap-6 sm:px-6 hover:bg-surface/50 transition-colors"
                >
                  <dt className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    {k}
                  </dt>
                  <dd className="text-sm text-foreground font-mono sm:font-sans">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>
    </>
  );
}
