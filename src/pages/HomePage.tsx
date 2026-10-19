import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  ChevronLeft,
  ChevronRight,
  Quote,
  Microscope,
  Award,
  Users,
  ShieldCheck,
  Check,
  ExternalLink,
  CalendarCheck,
} from "lucide-react";

import hero from "@/assets/hero.jpg";
import chiefDoctor from "@/assets/chief-doctor.png";
import consultationPhoto from "@/assets/clinic-consultation.jpg";

import docSimakova from "@/assets/doctors/simakova.jpg";
import docKirienko from "@/assets/doctors/kirienko.png";
import docGajduk from "@/assets/doctors/gajduk.jpg";
import docDmitriev from "@/assets/doctors/dmitriev.jpg";
import docErgesheva from "@/assets/doctors/ergesheva.jpg";
import docStrandstrem from "@/assets/doctors/strandstrem.jpg";
import docLazareva from "@/assets/doctors/lazareva.jpg";
import docNagornaya from "@/assets/doctors/nagornaya.png";
import docTabakova from "@/assets/doctors/tabakova.jpg";
import docSaribekyan from "@/assets/doctors/saribekyan.jpg";
import docUhova from "@/assets/doctors/uhova.jpg";

import { SERVICES, type Service } from "@/lib/services-data";
import { ServiceDetailDialog } from "@/components/site/ServiceDetailDialog";
import { useBooking } from "@/components/site/BookingContext";

import reviewerKonstantin from "@/assets/reviewers/reviewer-4.jpg";
import reviewerIndira from "@/assets/reviewers/reviewer-5.jpg";
import reviewerAnastasia from "@/assets/reviewers/reviewer-6.jpg";

import c1b from "@/assets/case1-before.jpg";
import c1a from "@/assets/case1-after.jpg";
import c2b from "@/assets/case2-before.jpg";
import c2a from "@/assets/case2-after.jpg";
import c3b from "@/assets/case3-before.jpg";
import c3a from "@/assets/case3-after.jpg";
import c4b from "@/assets/case4-before.jpg";
import c4a from "@/assets/case4-after.jpg";
import c5b from "@/assets/case5-before.jpg";
import c5a from "@/assets/case5-after.jpg";
import c6b from "@/assets/case6-before.jpg";
import c6a from "@/assets/case6-after.jpg";

function Hero() {
  const booking = useBooking();
  return (
    <section className="relative bg-background">
      <div className="mx-auto max-w-[1240px] px-4 pt-6 sm:px-6 sm:pt-10">
        <div className="grid overflow-hidden rounded-sm bg-[#eaf2fb] md:grid-cols-[1.05fr_1fr] shadow-sm">
          <div className="order-2 px-6 py-10 sm:px-10 sm:py-14 md:order-1 md:py-16">
            <span className="text-[11px] font-semibold uppercase tracking-[0.3em] text-[var(--gold)]">
              Стоматология у м. Марьина Роща
            </span>
            <h1 className="mt-2 font-serif text-[26px] font-medium leading-[1.15] text-foreground sm:text-3xl md:text-[42px]">
              Восстанавливаем
              <br />
              здоровье зубов даже
              <br />
              в&nbsp;сложных случаях
            </h1>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground sm:mt-5">
              Используем лечение под микроскопом и европейский междисциплинарный подход для максимального результата и вашего комфорта.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:mt-7 sm:flex-row sm:items-center">
              <button
                type="button"
                onClick={() => booking.open({ formType: "appointment" })}
                className="inline-flex w-full items-center justify-center rounded-sm bg-[var(--gold)] px-7 py-3 text-sm font-medium text-[var(--gold-foreground)] transition-opacity hover:opacity-90 sm:w-auto shadow-sm"
              >
                Записаться на приём
              </button>
              <button
                type="button"
                onClick={() => booking.open({ formType: "callback" })}
                className="inline-flex w-full items-center justify-center rounded-sm border border-border bg-card px-5 py-3 text-sm font-medium text-foreground transition-colors hover:border-[var(--gold)] sm:w-auto"
              >
                Заказать звонок
              </button>
            </div>
            <div className="mt-8 grid grid-cols-1 gap-3 text-xs sm:mt-10 sm:grid-cols-3 sm:gap-4">
              {[
                ["Лицензия", "Л041-01137-77\n77/00360298"],
                ["Команда", "Врачи экспертного уровня"],
                ["Гарантия", "на все виды работ"],
              ].map(([t, d]) => (
                <div key={t} className="flex min-w-0 items-start gap-2">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-[var(--gold)]" />
                  <div>
                    <div className="font-semibold text-foreground">{t}</div>
                    <div className="break-words whitespace-pre-line text-muted-foreground">{d}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative order-1 min-h-[240px] sm:min-h-[300px] md:order-2 md:min-h-[340px]">
            <img
              src={hero}
              alt="Лечение зубов под микроскопом в Центре БиоСтоматологии"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function Why() {
  const items = [
    { icon: Award, t: "25+ лет", d: "успешной работы" },
    { icon: Users, t: "20 000+", d: "довольных пациентов" },
    { icon: Microscope, t: "Лечение под микроскопом", d: "точность и сохранение тканей" },
    { icon: ShieldCheck, t: "Сложные случаи", d: "наше призвание" },
  ];
  return (
    <section
      id="about"
      className="mx-auto mt-8 max-w-[1240px] px-4 sm:px-6 md:-mt-10 relative z-10"
    >
      <div className="grid grid-cols-1 gap-px overflow-hidden rounded-sm border border-border bg-border shadow-xl sm:grid-cols-2 lg:grid-cols-4">
        {items.map(({ icon: Icon, t, d }) => (
          <div
            key={t}
            className="flex flex-col items-center justify-center gap-3 text-center bg-card px-5 py-6 sm:flex-row sm:text-left sm:gap-4 sm:px-6 sm:py-7"
          >
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[var(--gold)]/30 text-[var(--gold)]">
              <Icon className="h-6 w-6" />
            </div>
            <div>
              <div className="font-serif text-lg font-semibold text-foreground leading-tight">
                {t}
              </div>
              <div className="mt-1 text-xs leading-snug text-muted-foreground">{d}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Services() {
  const items = SERVICES;
  const [expanded, setExpanded] = useState(false);
  const [active, setActive] = useState<Service | null>(null);
  const visible = expanded ? items : items.slice(0, 6);

  return (
    <section id="services" className="bg-surface py-16 sm:py-24">
      <div className="mx-auto max-w-[1240px] px-4 sm:px-6">
        <div className="text-center">
          <span className="text-[11px] font-semibold uppercase tracking-[0.3em] text-[var(--gold)]">
            Услуги
          </span>
          <h2 className="mt-3 font-serif text-2xl font-medium text-foreground sm:text-3xl md:text-4xl">
            Решения для вашей красоты и здоровья
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-xs sm:text-sm text-muted-foreground">
            Полный спектр амбулаторной стоматологической помощи — от точечной реставрации до комплексной тотальной реабилитации.
          </p>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
          {visible.map((s) => (
            <button
              key={s.t}
              type="button"
              onClick={() => setActive(s)}
              className="group flex flex-col overflow-hidden rounded-sm border border-border bg-card text-left transition duration-300 hover:border-[var(--gold)]/50 hover:shadow-lg cursor-pointer"
            >
              <div className="aspect-[16/10] overflow-hidden bg-muted">
                <img
                  src={s.img}
                  alt={s.t}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="flex flex-1 flex-col p-6">
                <h3 className="font-serif text-lg font-semibold text-foreground">{s.t}</h3>
                <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{s.short}</p>
                <span className="mt-4 inline-block text-xs font-medium text-[var(--gold)] group-hover:underline">
                  Подробнее об услуге →
                </span>
              </div>
            </button>
          ))}
        </div>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            type="button"
            onClick={() => setExpanded(!expanded)}
            className="inline-flex items-center justify-center rounded-sm border border-border bg-card px-6 py-2.5 text-xs sm:text-sm font-medium text-foreground transition hover:border-[var(--gold)]"
          >
            {expanded ? "Показать меньше" : `Показать все направления (${items.length})`}
          </button>
          <Link
            to="/services"
            className="inline-flex items-center justify-center rounded-sm bg-[var(--gold)] px-6 py-2.5 text-xs sm:text-sm font-medium text-[var(--gold-foreground)] transition-opacity hover:opacity-90 shadow-sm"
          >
            Каталог услуг с описанием →
          </Link>
        </div>
      </div>
      <ServiceDetailDialog service={active} onClose={() => setActive(null)} />
    </section>
  );
}

function Philosophy() {
  const points = [
    "Индивидуальный план лечения с привлечением консилиума специалистов",
    "Высокоточная диагностика с использованием цифрового томографа (3D КТ)",
    "Лечение каналов под микроскопом Leica и Zeiss с максимальным сохранением тканей",
    "Официальный партнер швейцарской системы имплантации Straumann",
    "Команда кандидатов и докторов медицинских наук со стажем от 15 лет",
    "Гарантия на все виды терапевтических и ортопедических работ",
  ];

  return (
    <section className="bg-background py-16 sm:py-24">
      <div className="mx-auto grid max-w-[1240px] items-center gap-10 px-4 sm:px-6 md:grid-cols-2 md:gap-12">
        <div>
          <div className="overflow-hidden rounded-sm bg-[#eaf2fb] shadow-sm">
            <img
              src={chiefDoctor}
              alt="Симакова Татьяна Геннадьевна"
              className="h-[360px] w-full object-cover object-center sm:h-[480px]"
            />
          </div>
          <div className="mt-4">
            <div className="font-serif text-lg font-semibold text-foreground">
              Симакова Татьяна Геннадьевна
            </div>
            <div className="mt-1 text-xs text-muted-foreground">
              Генеральный директор, доктор медицинских наук
            </div>
          </div>
        </div>

        <div>
          <span className="text-[11px] font-semibold uppercase tracking-[0.3em] text-[var(--gold)]">
            О клинике
          </span>
          <h2 className="mt-3 font-serif text-2xl font-medium leading-tight text-foreground sm:text-3xl md:text-4xl">
            Мы лечим не просто зубы —<br />
            мы возвращаем качество жизни
          </h2>
          <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
            Клиника создана в 2008 году преподавательским составом стоматологических факультетов Москвы. Мы бережно относимся к тканям зуба, исключаем необоснованное удаление и добиваемся безупречной естественной эстетики.
          </p>
          <ul className="mt-7 space-y-3">
            {points.map((p) => (
              <li key={p} className="flex items-start gap-3 text-sm text-foreground">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[var(--gold)]/15 text-[var(--gold)]">
                  <Check className="h-3 w-3" />
                </span>
                <span>{p}</span>
              </li>
            ))}
          </ul>
          <div className="mt-8">
            <Link
              to="/about"
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-[var(--gold)] hover:underline"
            >
              Подробнее об истории и принципах клиники →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function Results() {
  const cases = [
    {
      t: "Восстановление сильно разрушенных зубов",
      d: "Лечение каналов под микроскопом и безметалловая керамика",
      before: c1b,
      after: c1a,
    },
    {
      t: "Комплексная реставрация улыбки",
      d: "Эстетическое восстановление и керамические виниры",
      before: c2b,
      after: c2a,
    },
    {
      t: "Имплантация и протезирование",
      d: "Полное функциональное и эстетическое восстановление",
      before: c3b,
      after: c3a,
    },
    {
      t: "Бережное отбеливание зубов",
      d: "Безопасное кабинетное осветление на несколько тонов",
      before: c4b,
      after: c4a,
    },
    {
      t: "Лечение глубокого кариеса",
      d: "Художественная реставрация зоны улыбки",
      before: c5b,
      after: c5a,
    },
    {
      t: "Исправление прикуса",
      d: "Ортодонтическое лечение элайнерами и брекетами",
      before: c6b,
      after: c6a,
    },
  ];

  const [perView, setPerView] = useState(1);

  useEffect(() => {
    const onResize = () => setPerView(window.innerWidth >= 768 ? 2 : 1);
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const pages = Math.ceil(cases.length / perView);
  const [page, setPage] = useState(0);

  useEffect(() => {
    setPage(0);
  }, [perView]);

  const prev = () => setPage((p) => (p - 1 + pages) % pages);
  const next = () => setPage((p) => (p + 1) % pages);
  const grouped = Array.from({ length: pages }, (_, i) =>
    cases.slice(i * perView, i * perView + perView),
  );

  return (
    <section className="bg-surface py-16 sm:py-24">
      <div className="mx-auto max-w-[1240px] px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <span className="text-[11px] font-semibold uppercase tracking-[0.3em] text-[var(--gold)]">
              Клинические случаи
            </span>
            <h2 className="mt-3 font-serif text-2xl font-medium text-foreground sm:text-3xl md:text-4xl">
              Результаты нашей работы
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-muted-foreground">
              Фотографии до и после лечения реальных пациентов Центра БиоСтоматологии.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={prev}
              aria-label="Предыдущий кейс"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-border bg-card text-foreground transition hover:border-[var(--gold)] hover:bg-[var(--gold)] hover:text-[var(--gold-foreground)]"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={next}
              aria-label="Следующий кейс"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-border bg-card text-foreground transition hover:border-[var(--gold)] hover:bg-[var(--gold)] hover:text-[var(--gold-foreground)]"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="mt-10 overflow-hidden">
          <div
            className="flex transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
            style={{ transform: `translateX(-${page * 100}%)` }}
          >
            {grouped.map((group, gi) => (
              <div key={gi} className="grid w-full shrink-0 gap-6 sm:grid-cols-2">
                {group.map((c) => (
                  <div
                    key={c.t}
                    className="overflow-hidden rounded-sm border border-border bg-card shadow-sm"
                  >
                    <div className="grid grid-cols-2 gap-1 bg-muted p-1">
                      <div className="relative aspect-[4/3] overflow-hidden">
                        <img
                          src={c.before}
                          alt={`${c.t} - До лечения`}
                          loading="lazy"
                          className="h-full w-full object-cover"
                        />
                        <span className="absolute bottom-2 left-2 rounded bg-black/70 px-2 py-0.5 text-[10px] font-medium text-white">
                          До
                        </span>
                      </div>
                      <div className="relative aspect-[4/3] overflow-hidden">
                        <img
                          src={c.after}
                          alt={`${c.t} - После лечения`}
                          loading="lazy"
                          className="h-full w-full object-cover"
                        />
                        <span className="absolute bottom-2 left-2 rounded bg-[var(--gold)] px-2 py-0.5 text-[10px] font-medium text-[var(--gold-foreground)]">
                          После
                        </span>
                      </div>
                    </div>
                    <div className="p-5">
                      <h3 className="font-serif text-base font-semibold text-foreground">{c.t}</h3>
                      <p className="mt-1 text-xs text-muted-foreground">{c.d}</p>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 flex items-center justify-center gap-2">
          {Array.from({ length: pages }).map((_, i) => (
            <button
              key={i}
              onClick={() => setPage(i)}
              aria-label={`Страница ${i + 1}`}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === page ? "w-8 bg-[var(--gold)]" : "w-3 bg-border hover:bg-foreground/40"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function Doctors() {
  const booking = useBooking();

  const docs = [
    {
      n: "Симакова Татьяна Геннадьевна",
      r: "Генеральный директор, доктор медицинских наук",
      img: docSimakova,
    },
    {
      n: "Кириенко Виктория Викторовна",
      r: "Главный врач, стоматолог-терапевт, кандидат медицинских наук",
      img: docKirienko,
    },
    {
      n: "Гайдук Игорь Викторович",
      r: "Стоматолог-хирург, имплантолог, кандидат медицинских наук, доцент",
      img: docGajduk,
    },
    { n: "Дмитриев Игорь Анатольевич", r: "Стоматолог-ортопед, гнатолог", img: docDmitriev },
    {
      n: "Ергешева Елена Валентиновна",
      r: "Стоматолог-терапевт, кандидат медицинских наук, доцент",
      img: docErgesheva,
    },
    {
      n: "Страндстрем Илья Михайлович",
      r: "Стоматолог-ортопед, гнатолог, кандидат медицинских наук",
      img: docStrandstrem,
    },
    { n: "Лазарева Анастасия Андреевна", r: "Стоматолог-хирург", img: docLazareva },
    { n: "Нагорная Надежда Николаевна", r: "Стоматолог-хирург, имплантолог", img: docNagornaya },
    { n: "Табакова Инна Александровна", r: "Стоматолог-хирург", img: docTabakova },
    { n: "Сарибекян Рузана Аветиковна", r: "Стоматолог-ортодонт", img: docSaribekyan },
    { n: "Ухова Екатерина Юрьевна", r: "Стоматолог-терапевт", img: docUhova },
  ];

  const [page, setPage] = useState(0);
  const [perView, setPerView] = useState(4);

  useEffect(() => {
    const calc = () => {
      const w = window.innerWidth;
      return w >= 1024 ? 4 : w >= 640 ? 2 : 1;
    };
    const onResize = () => setPerView(calc());
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const pages = Math.ceil(docs.length / perView);

  useEffect(() => {
    setPage(0);
  }, [perView]);

  const grouped = Array.from({ length: pages }, (_, i) =>
    docs.slice(i * perView, i * perView + perView),
  );

  const prev = () => setPage((p) => (p - 1 + pages) % pages);
  const next = () => setPage((p) => (p + 1) % pages);

  return (
    <section id="doctors" className="bg-background py-16 sm:py-24">
      <div className="mx-auto max-w-[1240px] px-4 sm:px-6">
        <div className="text-center">
          <span className="text-[11px] font-semibold uppercase tracking-[0.3em] text-[var(--gold)]">
            Наши специалисты
          </span>
          <h2 className="mt-3 font-serif text-2xl font-medium text-foreground sm:text-3xl md:text-4xl">
            Опыт, которому можно доверять
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-xs sm:text-sm text-muted-foreground">
            Большинство наших врачей имеют учёные степени, преподают в медицинских вузах и регулярно стажируются за рубежом.
          </p>
        </div>

        <div className="mt-8 flex items-center justify-center gap-3">
          <button
            onClick={prev}
            aria-label="Назад"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-border bg-card text-foreground transition hover:border-[var(--gold)] hover:bg-[var(--gold)] hover:text-[var(--gold-foreground)]"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={next}
            aria-label="Вперёд"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-border bg-card text-foreground transition hover:border-[var(--gold)] hover:bg-[var(--gold)] hover:text-[var(--gold-foreground)]"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        <div className="mt-8 overflow-hidden">
          <div
            className="flex transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
            style={{ transform: `translateX(-${page * 100}%)` }}
          >
            {grouped.map((group, gi) => (
              <div
                key={gi}
                className="grid w-full shrink-0 gap-5 px-1 sm:gap-6 sm:grid-cols-2 lg:grid-cols-4"
              >
                {group.map((d) => (
                  <div
                    key={d.n}
                    className="flex flex-col justify-between rounded-sm border border-border bg-card p-3.5 transition duration-300 hover:shadow-lg"
                  >
                    <div>
                      <div className="aspect-[4/5] overflow-hidden rounded-sm bg-muted">
                        <img
                          src={d.img}
                          alt={d.n}
                          loading="lazy"
                          className="h-full w-full object-cover object-top transition-transform duration-500 hover:scale-[1.03]"
                        />
                      </div>
                      <div className="px-2 pb-2 pt-4">
                        <div className="font-serif text-base font-semibold text-foreground">
                          {d.n}
                        </div>
                        <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{d.r}</p>
                      </div>
                    </div>
                    <div className="px-2 pt-3">
                      <button
                        type="button"
                        onClick={() => booking.open({ doctor: d.n, formType: "appointment" })}
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--gold)] hover:underline cursor-pointer"
                      >
                        <CalendarCheck className="h-3.5 w-3.5" />
                        Записаться к врачу →
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 flex items-center justify-center gap-2">
          {Array.from({ length: pages }).map((_, i) => (
            <button
              key={i}
              onClick={() => setPage(i)}
              aria-label={`Страница ${i + 1}`}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === page ? "w-8 bg-[var(--gold)]" : "w-4 bg-border hover:bg-foreground/40"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function Reviews() {
  const items = [
    {
      n: "Константин Лисецкий",
      r: "Отзыв на Яндекс Картах",
      a: reviewerKonstantin,
      t: "Огромная благодарность врачам и медперсоналу клиники!!! Внимательность. Доброжелательность. Профессионализм. Особый талант и умение услышать пациента! И подарить ему спокойствие и уверенность! Виктория Викторовна, Инна Александровна, Илья Михайлович, ещё раз огромное вам спасибо!!!",
      link: "https://yandex.ru/navi/org/39640787211/reviews?reviews%5BpublicId%5D=64uae2eu4d4j9ypzbv1ckc7eug&utm_source=my_review&si=rnvph04rc4vx14y12ee88t0j0r",
    },
    {
      n: "Индира У.",
      r: "Отзыв на Яндекс Картах",
      a: reviewerIndira,
      t: "Хочу сказать огромное спасибо стоматологу — хирургу имплантологу Нагорной Надежде Николаевне! Я очень боялась удалять зубы, но у врача лёгкая рука: удалила зуб мудрости быстро и безболезненно, врач очень вежливый, уколы делает совсем не больно! Так же мне доктор Нагорная установила имплантат — это выше всяких похвал! Теперь буду ходить только к этому врачу! Надежда Николаевна, спасибо Вам большое!!!",
      link: "https://yandex.ru/navi/org/39640787211/reviews?reviews%5BpublicId%5D=cynaqc21z2z18brbvutea1mx7r&utm_source=my_review&si=rnvph04rc4vx14y12ee88t0j0r",
    },
    {
      n: "Anastasia K.",
      r: "Отзыв на Яндекс Картах",
      a: reviewerAnastasia,
      t: "Здесь работает отличный коллектив профессионалов! Мы обращаемся уже тремя поколениями к Виктории Викторовне. Есть все узкие специалисты (пластика дёсен, пародонтолог, ортодонт, ортопед, и нами любимый стоматолог). Если не хочется переделывать по несколько раз одни и те же зубки, то лучше сразу обращаться сюда. Дорого, но надёжно.",
      link: "https://yandex.ru/navi/org/39640787211/reviews?reviews%5BpublicId%5D=kht5n5qtu76674371m7ay4huww&utm_source=my_review&si=rnvph04rc4vx14y12ee88t0j0r",
    },
  ];

  return (
    <section id="reviews" className="bg-[var(--navy-deep)] py-16 text-white sm:py-24">
      <div className="mx-auto max-w-[1240px] px-4 sm:px-6">
        <div className="text-center">
          <span className="text-[11px] font-semibold uppercase tracking-[0.3em] text-[var(--gold)]">
            Отзывы пациентов
          </span>
          <h2 className="mt-3 font-serif text-2xl font-medium sm:text-3xl md:text-4xl">
            Нас рекомендуют семьям и друзьям
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-white/60">
            Оценки и отзывы с независимых сервисов Яндекс.Карты и ПроДокторов
          </p>
        </div>

        <div className="mt-10 grid gap-5 sm:mt-12 sm:gap-6 md:grid-cols-3">
          {items.map((r) => (
            <div
              key={r.n}
              className="relative rounded-sm border border-white/10 bg-white/[0.04] p-7 backdrop-blur flex flex-col justify-between"
            >
              <div>
                <Quote className="h-7 w-7 text-[var(--gold)]" />
                <p className="mt-4 text-sm leading-relaxed text-white/85">{r.t}</p>
              </div>
              <a
                href={r.link}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 flex items-center gap-3 border-t border-white/10 pt-4 hover:text-[var(--gold)] transition-colors"
              >
                <img
                  src={r.a}
                  alt={r.n}
                  loading="lazy"
                  width={44}
                  height={44}
                  className="h-11 w-11 rounded-full object-cover"
                />
                <div>
                  <div className="font-serif text-sm font-semibold">{r.n}</div>
                  <div className="text-[11px] text-white/55">{r.r}</div>
                </div>
              </a>
            </div>
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <a
            href="https://yandex.ru/maps/-/CPwkf4NQ"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-sm border border-white/20 bg-white/5 px-6 py-2.5 text-sm font-medium text-white transition hover:border-[var(--gold)] hover:bg-[var(--gold)] hover:text-[var(--gold-foreground)]"
          >
            Смотреть все отзывы на Яндекс Картах <ExternalLink className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
}

function CTA() {
  const booking = useBooking();
  return (
    <section id="cta" className="bg-background py-14 sm:py-20">
      <div className="mx-auto grid max-w-[1240px] items-center gap-8 px-4 sm:px-6 md:grid-cols-[1fr_1fr] md:gap-12">
        <div>
          <span className="text-[11px] font-semibold uppercase tracking-[0.3em] text-[var(--gold)]">
            Первый шаг
          </span>
          <h2 className="mt-2 font-serif text-2xl font-medium leading-tight text-foreground sm:text-3xl md:text-4xl">
            Сделайте первый шаг
            <br />к здоровой улыбке уже сегодня
          </h2>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground">
            Оставьте заявку — администратор свяжется с вами, чтобы подобрать удобное время приёма и ответить на все интересующие вопросы.
          </p>
          <div className="mt-7 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:gap-4">
            <button
              type="button"
              onClick={() => booking.open({ formType: "appointment" })}
              className="inline-flex items-center justify-center rounded-sm bg-[var(--gold)] px-7 py-3.5 text-sm font-medium text-[var(--gold-foreground)] transition-opacity hover:opacity-90 shadow-sm"
            >
              Записаться на приём
            </button>
            <button
              type="button"
              onClick={() => booking.open({ formType: "callback" })}
              className="inline-flex items-center justify-center rounded-sm border border-border bg-card px-6 py-3.5 text-sm font-medium text-foreground transition-colors hover:border-[var(--gold)]"
            >
              Заказать звонок
            </button>
          </div>
          <div className="mt-5 text-xs text-muted-foreground">
            Или позвоните: <a href="tel:+74996734401" className="font-semibold text-foreground hover:text-[var(--gold)]">+7 (499) 673-44-01</a>
          </div>
        </div>

        <div className="overflow-hidden rounded-sm shadow-md">
          <img
            src={consultationPhoto}
            alt="Врач Центра БиоСтоматологии объясняет пациенту результаты диагностики"
            loading="lazy"
            width={1280}
            height={960}
            className="h-[240px] w-full object-cover sm:h-[300px] md:h-[360px]"
          />
        </div>
      </div>
    </section>
  );
}

export function HomePage() {
  return (
    <>
      <Hero />
      <Why />
      <Services />
      <Philosophy />
      <Results />
      <Doctors />
      <Reviews />
      <CTA />
    </>
  );
}
