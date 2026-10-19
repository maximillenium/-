import { useEffect } from "react";
import { Info, Phone, CalendarCheck } from "lucide-react";
import { PageHero } from "@/components/site/Layout";
import { useBooking } from "@/components/site/BookingContext";

type Section = {
  title: string;
  rows: { name: string; price: string }[];
};

const SECTIONS: Section[] = [
  {
    title: "Консультации и диагностика",
    rows: [
      { name: "Консультация врача-стоматолога, доктора медицинских наук (д.м.н.)", price: "2 000" },
      { name: "Консультация врача-стоматолога, кандидата медицинских наук (к.м.н.)", price: "1 200" },
      { name: "Консультация врача-стоматолога терапевта", price: "1 000" },
      { name: "Консультация врача-стоматолога ортопеда, гнатолога", price: "1 000" },
      { name: "Консультация врача-стоматолога хирурга-имплантолога", price: "1 000" },
      { name: "Консультация врача-стоматолога ортодонта", price: "1 500" },
      { name: "Консультация врача-стоматолога пародонтолога", price: "1 000" },
      { name: "Консультация врача-стоматолога гигиениста", price: "1 000" },
      { name: "Консультация детского врача-стоматолога", price: "1 500" },
      { name: "Компьютерная 3D-томография челюстно-лицевой области (КТ)", price: "3 500" },
      { name: "Прицельный радиовизиографический снимок зуба", price: "600" },
    ],
  },
  {
    title: "Терапевтическое лечение и микроскопия",
    rows: [
      { name: "Лечение поверхностного кариеса с постановкой светоотверждаемой пломбы", price: "от 4 500" },
      { name: "Лечение среднего и глубокого кариеса (высокоэстетичный композит)", price: "от 6 000" },
      { name: "Художественная реставрация фронтального зуба", price: "от 9 500" },
      { name: "Эндодонтическое лечение 1-канального зуба под микроскопом", price: "от 8 000" },
      { name: "Эндодонтическое лечение 2-3-канального зуба под микроскопом", price: "от 14 000" },
      { name: "Перелечивание сложных корневых каналов с извлечением штифта/инструмента", price: "от 12 000" },
    ],
  },
  {
    title: "Профессиональная гигиена и пародонтология",
    rows: [
      { name: "Комплексная профессиональная гигиена полости рта (Air-Flow, ультразвук, фторирование)", price: "6 500" },
      { name: "Ультразвуковое снятие наддесневых и поддесневых зубных отложений (1 челюсть)", price: "3 000" },
      { name: "Глубокое фторирование и реминерализующая терапия", price: "2 500" },
      { name: "Кабинетное безопасное отбеливание зубов", price: "от 22 000" },
      { name: "Кюретаж пародонтальных карманов (1 сегмент)", price: "от 3 500" },
    ],
  },
  {
    title: "Хирургия и имплантация",
    rows: [
      { name: "Удаление простого зуба с анестезией", price: "от 3 500" },
      { name: "Сложное удаление ретинированного / дистопированного зуба мудрости", price: "от 7 500" },
      { name: "Установка дентального имплантата Straumann (Швейцария, премиум)", price: "от 48 000" },
      { name: "Установка дентального имплантата ведущих европейских систем", price: "от 32 000" },
      { name: "Синус-лифтинг закрытый (без учёта костнопластического материала)", price: "от 20 000" },
      { name: "Синус-лифтинг открытый (1 сторона)", price: "от 35 000" },
    ],
  },
  {
    title: "Ортопедия (протезирование) и виниры",
    rows: [
      { name: "Керамическая коронка на основе диоксида циркония (CAD/CAM)", price: "от 28 000" },
      { name: "Керамический винир E.max (высокоэстетичный)", price: "от 32 000" },
      { name: "Коронка из диоксида циркония на имплантате с индивидуальным абатментом", price: "от 38 000" },
      { name: "Временная коронка длительного ношения", price: "от 3 500" },
      { name: "Съемный бюгельный протез с замковыми креплениями", price: "от 45 000" },
    ],
  },
  {
    title: "Ортодонтия (исправление прикуса)",
    rows: [
      { name: "Диагностика и расчёт ортодонтического лечения (ТРГ, слепки, фотопротокол)", price: "7 000" },
      { name: "Лечение на металлической брекет-системе (1 челюсть)", price: "от 45 000" },
      { name: "Лечение на керамической эстетической брекет-системе (1 челюсть)", price: "от 65 000" },
      { name: "Ортодонтическое лечение прозрачными элайнерами (полный курс)", price: "от 180 000" },
    ],
  },
];

export function PricesPage() {
  const booking = useBooking();

  useEffect(() => {
    document.title = "Цены на стоматологические услуги — Центр БиоСтоматологии в Москве";
  }, []);

  return (
    <>
      <PageHero
        eyebrow="Прейскурант клиники"
        title={
          <>
            Прозрачные цены
            <br />на стоматологические услуги
          </>
        }
        subtitle="Окончательная стоимость лечения определяется после очной консультации и цифровой диагностики. Уважаемые пациенты, с полным подробным прейскурантом вы также можете ознакомиться в регистратуре клиники."
      />

      <section className="bg-surface py-12 sm:py-20">
        <div className="mx-auto max-w-[1040px] px-4 sm:px-6">
          <div className="space-y-10 sm:space-y-12">
            {SECTIONS.map((s) => (
              <div key={s.title}>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-border pb-3">
                  <h2 className="font-serif text-xl font-medium text-foreground sm:text-2xl">
                    {s.title}
                  </h2>
                  <button
                    type="button"
                    onClick={() => booking.open({ service: s.title, formType: "appointment" })}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-[var(--gold)] hover:underline self-start sm:self-auto cursor-pointer"
                  >
                    <CalendarCheck className="h-3.5 w-3.5" />
                    Записаться по разделу
                  </button>
                </div>

                <div className="mt-4 overflow-hidden rounded-sm border border-border bg-card shadow-sm">
                  <table className="w-full text-sm">
                    <tbody>
                      {s.rows.map((r, i) => (
                        <tr
                          key={r.name}
                          className={`transition-colors hover:bg-surface/80 ${
                            i % 2 === 1 ? "bg-surface/40" : undefined
                          }`}
                        >
                          <td className="px-4 py-3.5 text-foreground sm:px-6 sm:py-4 leading-snug">
                            {r.name}
                          </td>
                          <td className="whitespace-nowrap px-4 py-3.5 text-right font-serif text-base font-semibold text-foreground sm:px-6 sm:py-4">
                            {r.price} <span className="text-xs text-muted-foreground font-sans">₽</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 rounded-sm border border-border bg-card p-5 sm:p-6 shadow-sm">
            <div className="flex items-start gap-3">
              <Info className="mt-0.5 h-5 w-5 shrink-0 text-[var(--gold)]" />
              <p className="text-xs leading-relaxed text-muted-foreground sm:text-sm">
                Администрация старается своевременно обновлять размещённый на сайте прейскурант, но во избежание возможных недоразумений просим уточнять актуальную стоимость услуг на день обращения у администраторов регистратуры. Размещённая информация носит ознакомительный характер и в соответствии со ст. 437 ГК РФ не является публичной офертой.
              </p>
            </div>
          </div>

          <div className="mt-10 flex flex-col items-stretch gap-4 rounded-sm bg-[var(--navy-deep)] p-6 text-white sm:flex-row sm:items-center sm:justify-between sm:p-8 shadow-md">
            <div>
              <div className="font-serif text-lg font-semibold sm:text-xl text-white">
                Не нашли нужную позицию или процедуру?
              </div>
              <p className="mt-1 text-xs text-white/70 sm:text-sm">
                Позвоните нам — администратор подробно проконсультирует по прайсу и подберёт удобное время приёма.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 shrink-0">
              <button
                type="button"
                onClick={() => booking.open({ formType: "appointment" })}
                className="inline-flex items-center justify-center gap-2 rounded-sm bg-[var(--gold)] px-6 py-3 text-sm font-medium text-[var(--gold-foreground)] transition-opacity hover:opacity-90 shadow-sm"
              >
                Записаться на приём
              </button>
              <a
                href="tel:+74996734401"
                className="inline-flex items-center justify-center gap-2 rounded-sm border border-white/20 bg-white/5 px-5 py-3 text-sm font-medium text-white transition hover:bg-white/10"
              >
                <Phone className="h-4 w-4 text-[var(--gold)]" />
                +7 (499) 673-44-01
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
