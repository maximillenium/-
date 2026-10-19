import { useState, useEffect } from "react";
import { Phone, User, MessageSquare, Check, AlertCircle, Loader2, Stethoscope, Sparkles } from "lucide-react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

const DOCTORS = [
  "Симакова Татьяна Геннадьевна (д.м.н.)",
  "Кириенко Виктория Викторовна (Главный врач, к.м.н.)",
  "Гайдук Игорь Викторович (Хирург-имплантолог, к.м.н.)",
  "Дмитриев Игорь Анатольевич (Ортопед, гнатолог)",
  "Ергешева Елена Валентиновна (Терапевт, к.м.н.)",
  "Страндстрем Илья Михайлович (Ортопед, к.м.н.)",
  "Лазарева Анастасия Андреевна (Стоматолог-хирург)",
  "Нагорная Надежда Николаевна (Хирург-имплантолог)",
  "Табакова Инна Александровна (Стоматолог-хирург)",
  "Сарибекян Рузана Аветиковна (Стоматолог-ортодонт)",
  "Ухова Екатерина Юрьевна (Стоматолог-терапевт)",
];

const SERVICES = [
  "Терапевтическая стоматология (лечение кариеса)",
  "Имплантация и синус-лифтинг (Straumann)",
  "Ортопедическая стоматология (коронки, вкладки)",
  "Ортодонтия (брекеты и элайнеры)",
  "Хирургическая стоматология (удаление, пластика)",
  "Профессиональная гигиена и чистка зубов",
  "Детская стоматология",
  "Гнатология и дисфункция ВНЧС",
  "Эстетическая стоматология и виниры",
  "Пародонтология и лечение дёсен",
  "Диагностика состава слюны",
  "Лечение каналов под микроскопом",
  "Компьютерная 3D-томография (КТ)",
  "Консультация и составление плана лечения",
];

// Автоформатирование российского телефонного номера
function formatPhoneNumber(value: string): string {
  const digits = value.replace(/\D/g, "");
  if (!digits) return "";

  let result = "+7";
  let rest = digits;

  if (digits[0] === "7" || digits[0] === "8") {
    rest = digits.slice(1);
  }

  if (rest.length > 0) {
    result += " (" + rest.substring(0, 3);
  }
  if (rest.length >= 3) {
    result += ") " + rest.substring(3, 6);
  }
  if (rest.length >= 6) {
    result += "-" + rest.substring(6, 8);
  }
  if (rest.length >= 8) {
    result += "-" + rest.substring(8, 10);
  }

  return result;
}

export function BookingDialog({
  open,
  onOpenChange,
  initialService,
  initialDoctor,
  initialType = "appointment",
}: {
  open: boolean;
  onOpenChange: (o: boolean) => void;
  initialService?: string;
  initialDoctor?: string;
  initialType?: "appointment" | "callback";
}) {
  const [formType, setFormType] = useState<"appointment" | "callback">("appointment");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [service, setService] = useState("");
  const [doctor, setDoctor] = useState("");
  const [comment, setComment] = useState("");
  const [agree, setAgree] = useState(false);
  const [honeypot, setHoneypot] = useState(""); // Антиспам ловушка

  const [errors, setErrors] = useState<{
    name?: string;
    phone?: string;
    agree?: string;
    server?: string;
  }>({});

  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (open) {
      setFormType(initialType || "appointment");
      setService(initialService || "");
      setDoctor(initialDoctor || "");
      setAgree(false);
      setErrors({});
      setDone(false);
    }
  }, [open, initialService, initialDoctor, initialType]);

  const reset = () => {
    setName("");
    setPhone("");
    setService("");
    setDoctor("");
    setComment("");
    setAgree(false);
    setHoneypot("");
    setErrors({});
    setDone(false);
  };

  const handleChange = (o: boolean) => {
    if (!o) reset();
    onOpenChange(o);
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    const formatted = formatPhoneNumber(raw);
    setPhone(formatted);
    if (errors.phone) setErrors((prev) => ({ ...prev, phone: undefined }));
  };

  const validate = () => {
    const newErrors: typeof errors = {};

    const trimmedName = name.trim();
    if (!trimmedName) {
      newErrors.name = "Пожалуйста, введите ваше имя";
    } else if (trimmedName.length < 2) {
      newErrors.name = "Имя должно содержать не менее 2 букв";
    }

    const digits = phone.replace(/\D/g, "");
    if (!phone.trim()) {
      newErrors.phone = "Пожалуйста, укажите контактный телефон";
    } else if (digits.length < 10) {
      newErrors.phone = "Укажите полный номер телефона (10 цифр)";
    }

    if (!agree) {
      newErrors.agree = "Необходимо согласие на обработку персональных данных";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    setSubmitting(true);
    setErrors((prev) => ({ ...prev, server: undefined }));

    const payload = {
      name: name.trim(),
      phone: phone.trim(),
      service: service.trim() || undefined,
      doctor: doctor.trim() || undefined,
      comment: comment.trim() || undefined,
      formType: formType === "appointment" ? "Запись на приём" : "Заказ обратного звонка",
      consent: true,
      sourceUrl: typeof window !== "undefined" ? window.location.href : "https://cbstom.ru/",
      honeypot: honeypot || undefined,
    };

    try {
      // На Beget обработчик расположен в /api/sendmail.php; для Node.js также поддерживается /api/sendmail
      let res: Response | null = null;

      try {
        res = await fetch("/api/sendmail.php", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      } catch (err) {
        // Fallback для среды Node.js
        res = await fetch("/api/sendmail", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      }

      if (res && res.status === 404) {
        res = await fetch("/api/sendmail", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      }

      const data = await res.json().catch(() => ({ success: res.ok }));

      if (res.ok && data.success !== false) {
        setDone(true);
        toast.success("Заявка успешно отправлена!", {
          description: "Администратор клиники перезвонит вам в ближайшее рабочее время.",
        });
      } else {
        const errorMsg = data.error || data.message || "Ошибка отправки заявки. Пожалуйста, позвоните нам: +7 (499) 673-44-01";
        setErrors((prev) => ({ ...prev, server: errorMsg }));
        toast.error("Не удалось отправить заявку", {
          description: errorMsg,
        });
      }
    } catch (err: unknown) {
      console.error("Submission error:", err);
      const msg = "Сбой соединения. Пожалуйста, позвоните напрямую в клинику: +7 (499) 673-44-01";
      setErrors((prev) => ({ ...prev, server: msg }));
      toast.error("Ошибка сети", { description: msg });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleChange}>
      <DialogContent className="max-h-[92vh] w-[calc(100vw-2rem)] max-w-lg overflow-y-auto rounded-sm p-6 sm:p-7">
        {done ? (
          <div className="flex flex-col items-center py-6 text-center">
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-[var(--gold)]/15 text-[var(--gold)] shadow-inner">
              <Check className="h-8 w-8 stroke-[2.5]" />
            </span>
            <DialogTitle className="mt-5 font-serif text-2xl font-medium text-foreground">
              Спасибо! Ваша заявка принята
            </DialogTitle>
            <DialogDescription className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Заявка направлена администраторам Центра БиоСтоматологии. Мы свяжемся с вами
              по номеру <strong className="text-foreground">{phone}</strong> для согласования
              удобного дня и времени визита.
            </DialogDescription>

            <div className="mt-6 w-full rounded-sm border border-border bg-surface p-4 text-left text-xs text-muted-foreground space-y-1">
              <div><strong>Режим работы:</strong> Пн–Сб с 9:00 до 21:00 (Вс — выходной)</div>
              <div><strong>Адрес:</strong> Москва, ул. Октябрьская, 36 (м. Марьина Роща)</div>
              <div><strong>Срочные вопросы:</strong> <a href="tel:+74996734401" className="text-[var(--gold)] font-medium hover:underline">+7 (499) 673-44-01</a></div>
            </div>

            <button
              type="button"
              onClick={() => handleChange(false)}
              className="mt-6 inline-flex w-full sm:w-auto items-center justify-center rounded-sm bg-[var(--gold)] px-8 py-3 text-sm font-medium text-[var(--gold-foreground)] transition-opacity hover:opacity-90 shadow-sm"
            >
              Отлично, понятно
            </button>
          </div>
        ) : (
          <>
            <DialogHeader className="text-left">
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[var(--gold)]">
                  Центр БиоСтоматологии
                </span>
              </div>
              <DialogTitle className="mt-1 font-serif text-2xl font-medium text-foreground sm:text-3xl">
                {formType === "appointment" ? "Запись на приём" : "Заказ обратного звонка"}
              </DialogTitle>
              <DialogDescription className="mt-1.5 text-xs text-muted-foreground leading-relaxed">
                Оставьте контактные данные — администратор свяжется с вами, ответит на вопросы и подберёт удобное время.
              </DialogDescription>
            </DialogHeader>

            {/* Переключатель формы */}
            <div className="mt-3 flex rounded-sm border border-border bg-surface p-1">
              <button
                type="button"
                onClick={() => setFormType("appointment")}
                className={`flex-1 rounded-sm py-2 text-xs font-medium transition-colors ${
                  formType === "appointment"
                    ? "bg-card text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Записаться на приём
              </button>
              <button
                type="button"
                onClick={() => setFormType("callback")}
                className={`flex-1 rounded-sm py-2 text-xs font-medium transition-colors ${
                  formType === "callback"
                    ? "bg-card text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Заказать звонок
              </button>
            </div>

            {errors.server && (
              <div className="mt-3 flex items-start gap-2 rounded-sm border border-destructive/40 bg-destructive/10 p-3 text-xs text-destructive">
                <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
                <span>{errors.server}</span>
              </div>
            )}

            <form onSubmit={onSubmit} className="mt-4 space-y-3.5" noValidate>
              {/* Скрытое антиспам поле (honeypot) */}
              <input
                type="text"
                name="website"
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
                tabIndex={-1}
                autoComplete="off"
                style={{ display: "none" }}
                aria-hidden="true"
              />

              {/* Имя */}
              <FormField
                label="Ваше имя"
                required
                icon={<User className="h-4 w-4" />}
                error={errors.name}
              >
                <input
                  type="text"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    if (errors.name) setErrors((prev) => ({ ...prev, name: undefined }));
                  }}
                  maxLength={80}
                  placeholder="Иван"
                  className="w-full bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground/60"
                />
              </FormField>

              {/* Телефон */}
              <FormField
                label="Номер телефона"
                required
                icon={<Phone className="h-4 w-4" />}
                error={errors.phone}
              >
                <input
                  type="tel"
                  value={phone}
                  onChange={handlePhoneChange}
                  maxLength={22}
                  placeholder="+7 (___) ___-__-__"
                  className="w-full bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground/60 font-mono sm:font-sans"
                />
              </FormField>

              {/* Выбор услуги (для приёма) */}
              {formType === "appointment" && (
                <FormField
                  label="Интересующая услуга (необязательно)"
                  icon={<Sparkles className="h-4 w-4" />}
                >
                  <select
                    value={service}
                    onChange={(e) => setService(e.target.value)}
                    className="w-full bg-transparent text-sm text-foreground outline-none cursor-pointer"
                  >
                    <option value="" className="bg-card text-foreground">
                      — Выберите услугу или оставьте пустым —
                    </option>
                    {SERVICES.map((s) => (
                      <option key={s} value={s} className="bg-card text-foreground">
                        {s}
                      </option>
                    ))}
                  </select>
                </FormField>
              )}

              {/* Выбор врача (для приёма) */}
              {formType === "appointment" && (
                <FormField
                  label="Желаемый специалист (необязательно)"
                  icon={<Stethoscope className="h-4 w-4" />}
                >
                  <select
                    value={doctor}
                    onChange={(e) => setDoctor(e.target.value)}
                    className="w-full bg-transparent text-sm text-foreground outline-none cursor-pointer"
                  >
                    <option value="" className="bg-card text-foreground">
                      — Любой свободный специалист клиники —
                    </option>
                    {DOCTORS.map((d) => (
                      <option key={d} value={d} className="bg-card text-foreground">
                        {d}
                      </option>
                    ))}
                  </select>
                </FormField>
              )}

              {/* Комментарий */}
              <FormField
                label="Комментарий или пожелания"
                icon={<MessageSquare className="h-4 w-4" />}
              >
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  maxLength={500}
                  rows={2}
                  placeholder="Например: удобна первая половина дня, острая боль или консультация"
                  className="w-full resize-none bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground/60"
                />
              </FormField>

              {/* Согласие на обработку персональных данных */}
              <div className="pt-1.5">
                <label className="flex items-start gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={agree}
                    onChange={(e) => {
                      setAgree(e.target.checked);
                      if (errors.agree) setErrors((prev) => ({ ...prev, agree: undefined }));
                    }}
                    className="mt-0.5 h-4 w-4 rounded border-border accent-[var(--gold)] cursor-pointer"
                  />
                  <span className="text-[11px] leading-relaxed text-muted-foreground select-none">
                    Я подтверждаю, что ознакомлен(а) с{" "}
                    <a
                      href="/privacy-policy"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[var(--gold)] underline hover:text-foreground font-medium"
                    >
                      Политикой конфиденциальности
                    </a>{" "}
                    и даю своё{" "}
                    <a
                      href="/consent"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[var(--gold)] underline hover:text-foreground font-medium"
                    >
                      согласие на обработку персональных данных
                    </a>{" "}
                    в соответствии с 152-ФЗ.
                  </span>
                </label>
                {errors.agree && (
                  <span className="mt-1 block text-[11px] text-destructive">{errors.agree}</span>
                )}
              </div>

              {/* Кнопка отправки */}
              <button
                type="submit"
                disabled={submitting}
                className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-sm bg-[var(--gold)] px-6 py-3.5 text-sm font-medium text-[var(--gold-foreground)] transition-all hover:opacity-90 disabled:opacity-60 shadow-sm cursor-pointer"
              >
                {submitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>Отправка заявки…</span>
                  </>
                ) : (
                  <span>
                    {formType === "appointment" ? "Записаться на консультацию" : "Заказать обратный звонок"}
                  </span>
                )}
              </button>

              <div className="text-center pt-1">
                <span className="text-[11px] text-muted-foreground">
                  Или свяжитесь напрямую:{" "}
                  <a href="tel:+74996734401" className="font-semibold text-foreground hover:text-[var(--gold)]">
                    +7 (499) 673-44-01
                  </a>
                </span>
              </div>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}

function FormField({
  label,
  required,
  icon,
  error,
  children,
}: {
  label: string;
  required?: boolean;
  icon: React.ReactNode;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs font-medium text-foreground">
        {label} {required && <span className="text-destructive">*</span>}
      </span>
      <span
        className={`flex items-start gap-2.5 rounded-sm border bg-card px-3 py-2.5 transition-colors focus-within:border-[var(--gold)] focus-within:ring-1 focus-within:ring-[var(--gold)] ${
          error ? "border-destructive bg-destructive/5" : "border-border"
        }`}
      >
        <span className="mt-0.5 text-muted-foreground/70 shrink-0">{icon}</span>
        {children}
      </span>
      {error && <span className="mt-1 block text-[11px] text-destructive">{error}</span>}
    </label>
  );
}
