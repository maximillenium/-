import { useState, useEffect } from "react";
import { PageHero } from "@/components/site/Layout";
import { SERVICES, type Service } from "@/lib/services-data";
import { ServiceDetailDialog } from "@/components/site/ServiceDetailDialog";
import { useBooking } from "@/components/site/BookingContext";
import { Phone, CheckCircle2 } from "lucide-react";

export function ServicesPage() {
  const [active, setActive] = useState<Service | null>(null);
  const booking = useBooking();

  useEffect(() => {
    document.title = "Услуги и направления — Центр БиоСтоматологии в Москве";
  }, []);

  return (
    <>
      <PageHero
        eyebrow="Услуги клиники"
        title={
          <>
            Полный спектр стоматологической помощи —<br />
            от чистки до сложного протезирования
          </>
        }
        subtitle="В клинике работают врачи всех стоматологических специальностей. Мы проводим лечение по международным протоколам с использованием передового цифрового оборудования и нетоксичных биосовместимых материалов."
      />

      <section className="bg-surface py-12 sm:py-20">
        <div className="mx-auto max-w-[1240px] px-4 sm:px-6">
          <div className="grid gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
            {SERVICES.map((s) => (
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
                  <h3 className="font-serif text-lg font-semibold text-foreground group-hover:text-[var(--gold)] transition-colors">
                    {s.t}
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{s.short}</p>
                  <div className="mt-4 flex items-center justify-between pt-2 border-t border-border/50">
                    <span className="text-xs font-medium text-[var(--gold)] group-hover:underline">
                      Подробнее об услуге →
                    </span>
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Баннер консультации */}
          <div className="mt-14 rounded-sm border border-border bg-[var(--navy-deep)] p-8 text-white sm:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-md">
            <div className="max-w-2xl">
              <div className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[var(--gold)]">
                Консультация и диагностика
              </div>
              <h3 className="mt-2 font-serif text-xl sm:text-2xl font-medium text-white">
                Не уверены, какая процедура вам требуется?
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-white/70 leading-relaxed">
                Запишитесь на первичный приём. Врач проведёт осмотр, компьютерную диагностику и составит индивидуальный пошаговый план лечения с прозрачной фиксацией стоимости.
              </p>
              <div className="mt-4 flex flex-wrap gap-4 text-xs text-white/80">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-[var(--gold)]" /> Безболезненный осмотр
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-[var(--gold)]" /> Детальный 3D-снимок
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-[var(--gold)]" /> Честная смета
                </span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto shrink-0">
              <button
                type="button"
                onClick={() => booking.open({ formType: "appointment" })}
                className="inline-flex items-center justify-center gap-2 rounded-sm bg-[var(--gold)] px-6 py-3.5 text-sm font-medium text-[var(--gold-foreground)] transition-opacity hover:opacity-90 shadow-sm"
              >
                <Phone className="h-4 w-4" />
                Записаться на консультацию
              </button>
            </div>
          </div>
        </div>
      </section>

      <ServiceDetailDialog service={active} onClose={() => setActive(null)} />
    </>
  );
}
