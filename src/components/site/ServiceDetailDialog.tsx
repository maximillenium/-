import { Check, Phone, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { useBooking } from "@/components/site/BookingContext";
import type { Service } from "@/lib/services-data";

export function ServiceDetailDialog({
  service,
  onClose,
}: {
  service: Service | null;
  onClose: () => void;
}) {
  const booking = useBooking();

  return (
    <Dialog open={!!service} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-h-[90vh] w-[calc(100vw-2rem)] max-w-2xl overflow-y-auto rounded-sm p-0 sm:rounded-sm [&>button.absolute]:hidden">
        {service && (
          <>
            <div className="relative aspect-[16/9] w-full overflow-hidden bg-muted">
              <img src={service.img} alt={service.t} className="h-full w-full object-cover" />
              <button
                type="button"
                onClick={onClose}
                aria-label="Закрыть описание услуги"
                className="absolute right-3 top-3 z-10 inline-flex h-10 w-10 items-center justify-center rounded-full bg-background/90 text-foreground shadow-lg ring-1 ring-border transition hover:bg-background"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="px-6 pb-8 pt-6 sm:px-8">
              <DialogHeader className="text-left">
                <span className="text-[11px] font-semibold uppercase tracking-[0.3em] text-[var(--gold)]">
                  Направление стоматологии
                </span>
                <DialogTitle className="mt-2 font-serif text-2xl font-medium text-foreground sm:text-3xl">
                  {service.t}
                </DialogTitle>
                <DialogDescription className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {service.long}
                </DialogDescription>
              </DialogHeader>

              <div className="mt-6">
                <div className="text-xs font-semibold uppercase tracking-wider text-foreground mb-3">
                  Что входит в лечение:
                </div>
                <ul className="grid gap-3 sm:grid-cols-2">
                  {service.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-2.5 text-sm text-foreground">
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[var(--gold)]/15 text-[var(--gold)]">
                        <Check className="h-3 w-3" />
                      </span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-t border-border pt-6">
                <button
                  type="button"
                  onClick={() => {
                    const svcName = service.t;
                    onClose();
                    booking.open({ service: svcName, formType: "appointment" });
                  }}
                  className="inline-flex items-center justify-center gap-2 rounded-sm bg-[var(--gold)] px-6 py-3 text-sm font-medium text-[var(--gold-foreground)] transition-opacity hover:opacity-90 shadow-sm"
                >
                  <Phone className="h-4 w-4" />
                  Записаться на эту услугу
                </button>
                <span className="text-xs text-muted-foreground">
                  +7 (499) 673-44-01 · Пн–Сб с 9:00 до 21:00
                </span>
              </div>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
