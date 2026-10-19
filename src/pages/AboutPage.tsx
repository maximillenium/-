import { useEffect } from "react";
import { Check, Microscope, ShieldCheck, Users, Award, GraduationCap, HeartHandshake, Stethoscope } from "lucide-react";
import { PageHero } from "@/components/site/Layout";
import { useBooking } from "@/components/site/BookingContext";
import chiefDoctor from "@/assets/chief-doctor.png";
import hero from "@/assets/hero.jpg";

export function AboutPage() {
  const booking = useBooking();

  useEffect(() => {
    document.title = "О клинике — Центр БиоСтоматологии в Москве";
  }, []);

  const stats = [
    { icon: Award, t: "С 2008 года", d: "успешной практической работы" },
    { icon: Users, t: "20 000+", d: "довольных постоянных пациентов" },
    { icon: GraduationCap, t: "Учёные степени", d: "у ведущих врачей клиники" },
    { icon: HeartHandshake, t: "Семейный подход", d: "лечим взрослых и детей" },
  ];

  const values = [
    {
      icon: Stethoscope,
      t: "Коллегиальный подход",
      d: "Сложные клинические случаи разбираются на консилиуме врачей различных специализаций для выбора наилучшей тактики.",
    },
    {
      icon: Microscope,
      t: "Лечение под микроскопом",
      d: "Оптика ведущих мировых брендов позволяет спасать зубы даже в самых безнадёжных ситуациях и находить скрытые каналы.",
    },
    {
      icon: ShieldCheck,
      t: "Биосовместимые материалы",
      d: "Мы используем безопасные композиты, гипоаллергенный диоксид циркония и оригинальные швейцарские имплантаты.",
    },
    {
      icon: Users,
      t: "Забота и честность",
      d: "Мы подробно объясняем каждый этап, фиксируем стоимость до начала манипуляций и не навязываем лишние процедуры.",
    },
  ];

  return (
    <>
      <PageHero
        eyebrow="О клинике"
        title={
          <>
            Стоматология экспертного уровня
            <br />с академическими традициями
          </>
        }
        subtitle="Клиника создана в 2008 году профессорско-преподавательским составом стоматологических факультетов Москвы. Многолетний опыт практической, учебной и научной работы позволяет нам оказывать высокопрофессиональную помощь пациентам любого возраста и с любой сложностью патологии."
      />

      {/* Факты */}
      <section className="mx-auto -mt-6 max-w-[1240px] px-4 sm:px-6 md:-mt-12 relative z-10">
        <div className="grid grid-cols-1 gap-px overflow-hidden rounded-sm border border-border bg-border shadow-xl sm:grid-cols-2 lg:grid-cols-4">
          {stats.map(({ icon: Icon, t, d }) => (
            <div key={t} className="flex items-center gap-4 bg-card px-5 py-5 sm:px-6 sm:py-7">
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

      {/* История и Главный врач */}
      <section className="bg-background py-16 sm:py-24">
        <div className="mx-auto grid max-w-[1240px] gap-10 px-4 sm:px-6 md:grid-cols-2 md:gap-14 items-center">
          <div className="overflow-hidden rounded-sm bg-[#eaf2fb] shadow-sm">
            <img
              src={chiefDoctor}
              alt="Главный врач — Симакова Татьяна Геннадьевна"
              className="h-[360px] w-full object-cover object-center sm:h-[520px]"
            />
          </div>
          <div>
            <span className="text-[11px] font-semibold uppercase tracking-[0.3em] text-[var(--gold)]">
              Наша история
            </span>
            <h2 className="mt-3 font-serif text-2xl font-medium leading-tight text-foreground sm:text-3xl md:text-4xl">
              Клиника, которой доверяют
              <br />с 2008 года
            </h2>
            <div className="mt-6 space-y-4 text-sm leading-relaxed text-muted-foreground">
              <p>
                В Центре БиоСтоматологии работают врачи всех основных направлений: гигиенисты, терапевты, хирурги-имплантологи, ортопеды, гнатологи, ортодонты и детские стоматологи.
              </p>
              <p>
                Многие наши специалисты имеют учёные степени кандидатов и докторов медицинских наук, высшую квалификационную категорию, регулярно участвуют в международных симпозиумах и делятся опытом с коллегами.
              </p>
              <p>
                Мы оказываем полный спектр стоматологической помощи и являемся семейной клиникой: к нам приходят целыми поколениями, доверяя здоровье зубов детей, родителей, бабушек и дедушек.
              </p>
              <p>
                Генеральный директор, доктор медицинских наук{" "}
                <span className="font-semibold text-foreground">Симакова Татьяна Геннадьевна</span>, лично курирует работу клиники, качество протоколов и внедрение передовых методик.
              </p>
            </div>
            <div className="mt-8">
              <button
                type="button"
                onClick={() => booking.open({ formType: "appointment" })}
                className="inline-flex items-center justify-center rounded-sm bg-[var(--gold)] px-7 py-3 text-sm font-medium text-[var(--gold-foreground)] transition-opacity hover:opacity-90 shadow-sm"
              >
                Записаться на консультацию
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Принципы */}
      <section className="bg-surface py-16 sm:py-24">
        <div className="mx-auto max-w-[1240px] px-4 sm:px-6">
          <div className="text-center">
            <span className="text-[11px] font-semibold uppercase tracking-[0.3em] text-[var(--gold)]">
              Наши принципы
            </span>
            <h2 className="mt-3 font-serif text-2xl font-medium text-foreground sm:text-3xl md:text-4xl">
              На чём строится наша безупречная репутация
            </h2>
          </div>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
            {values.map(({ icon: Icon, t, d }) => (
              <div
                key={t}
                className="rounded-sm border border-border bg-card p-6 transition duration-300 hover:border-[var(--gold)]/50 hover:shadow-lg"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full border border-[var(--gold)]/30 text-[var(--gold)]">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mt-5 font-serif text-lg font-semibold text-foreground">{t}</h3>
                <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Технологии */}
      <section className="bg-background py-16 sm:py-24">
        <div className="mx-auto grid max-w-[1240px] items-center gap-10 px-4 sm:px-6 md:grid-cols-2 md:gap-12">
          <div>
            <span className="text-[11px] font-semibold uppercase tracking-[0.3em] text-[var(--gold)]">
              Технологии
            </span>
            <h2 className="mt-3 font-serif text-2xl font-medium leading-tight text-foreground sm:text-3xl md:text-4xl">
              Цифровые стандарты
              <br />в каждом этапе лечения
            </h2>
            <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
              Вкладки, виниры, искусственные коронки и другие зубные протезы изготавливаются в современных зуботехнических лабораториях или прямо в клинике на 3D-принтерах методом фрезерования (CAD/CAM) из нетоксичных материалов на основе диоксида циркония, дисиликата лития и композитной керамики.
            </p>
            <ul className="mt-7 space-y-3">
              {[
                "Лечение каналов под операционным микроскопом с 25-кратным увеличением",
                "3D-диагностика на компьютерном томографе высокой чёткости с минимальной дозой облучения",
                "Компьютерная и инфильтрационная анестезия — лечение проходит абсолютно без боли",
                "CAD/CAM-протезирование и сканирование без неприятных слепочных масс",
                "Многоступенчатая стерилизация инструментов по международным программам АнтиСПИД и АнтиГепатит",
              ].map((p) => (
                <li key={p} className="flex items-start gap-3 text-sm text-foreground">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[var(--gold)]/15 text-[var(--gold)]">
                    <Check className="h-3 w-3" />
                  </span>
                  <span>{p}</span>
                </li>
              ))}
            </ul>
            <button
              type="button"
              onClick={() => booking.open({ formType: "appointment" })}
              className="mt-8 inline-flex w-full items-center justify-center rounded-sm bg-[var(--gold)] px-7 py-3 text-sm font-medium text-[var(--gold-foreground)] transition-opacity hover:opacity-90 sm:w-auto shadow-sm"
            >
              Записаться на консультацию
            </button>
          </div>
          <div className="overflow-hidden rounded-sm shadow-md">
            <img
              src={hero}
              alt="Современное оборудование клиники Центр БиоСтоматологии"
              loading="lazy"
              className="h-[300px] w-full object-cover sm:h-[460px]"
            />
          </div>
        </div>
      </section>
    </>
  );
}
